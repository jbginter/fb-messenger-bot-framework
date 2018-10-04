const {MESSAGE_TYPES} = require('../../constants');

const getMessageUser = (requestBody) => {

	const currentEvent = requestBody.entry[0].messaging[0];
	const messageType = getMessageType(currentEvent);

	return {
		message: {
			content: currentEvent,
			type: messageType
		},
		user: currentEvent.sender.id
	};
};

function getMessageType(currentEvent) {
	let type = null;

	if (currentEvent.message) {
		if (currentEvent.message.sticker_id || currentEvent.message.attachments) {
			type = MESSAGE_TYPES.attachment;
		} else if (currentEvent.message.is_echo) {
			type = MESSAGE_TYPES.echo;
		} else if (currentEvent.message.quick_reply) {
			type = MESSAGE_TYPES.postback;
		} else if (currentEvent.message.text) {
			type = MESSAGE_TYPES.text;
		}
	} else if (currentEvent.postback) {
		type = MESSAGE_TYPES.postback;
	}
	return type;
}

module.exports = getMessageUser;
