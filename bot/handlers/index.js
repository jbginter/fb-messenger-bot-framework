const getFlowType = require('../core/getFlowType');
const messaging = require('../messaging');
const Filters = require('../core/filters');
const customResponse = require('../core/customResponse');
const User = require('../users');

module.exports  = (message, user, env, Flow) => {
	// Setup filtering/globals/message to send here
	if (message.content.postback) {
		return postbackBuilder(message.content.postback.payload, user, env, Flow);
	} else if (message.content.message) {
		if (message.content.message.quick_reply) {
			return postbackBuilder(message.content.message.quick_reply.payload, user, env, Flow);
		}
		if (message.content.message.attachments) {
			//immediately send error message if attachment is sent
			return sendErrorMessage(user, Flow);
		}
		if (message.content.message.text) {
			const text = message.content.message.text;
			// lets filter first, map second, error handle last
			for (let Filter in Filters) {
				if (Filters[Filter](text, Flow, user, env)) {
					const filtered = Filters[Filter](text, Flow, user, env);
					const flowType = getFlowType(filtered);
					return messaging[flowType](filtered);
				}
			}
			return sendErrorMessage(user, Flow);
		}
		// fallback: not sure what was sent, send generic error
		return sendErrorMessage(user, Flow);
	}
};

function postbackBuilder(postback, user, env, Flow) {
	if (postback.includes(':')) {
		const payload = postback.split(':')[1];
		const flowType = getFlowType(Flow[payload]);

		// What to do if invalid flow type?
		if (flowType) {
			User.update(payload, user.id, env);
			return messaging[flowType](Flow[payload]);
		}
	} else if (customResponse[postback]) {
		return customResponse[postback](postback);
	} else {
		return sendErrorMessage(user, Flow);
	}
}

function sendErrorMessage(user, Flow) {
	const errorIndex = Math.floor(Math.random() * Flow.errors.length);
	let errorMessage = {
		messageData: { text: Flow.errors[errorIndex].res }
	};

	// return user to last node sent
	errorMessage.next = user.node;

	return errorMessage;
}
