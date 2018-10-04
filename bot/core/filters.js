const User = require('../users');

/*
	ACCEPTED VALUES BELOW:
		@text - text the user sent
		@Flow - Contains all node values defined for the Bot
		@user - Current user state info
		@env - Current Environment being used for the Bot (dev/prod)
*/
const Filters = {
	help: (text, Flow) => {
		if (text.toLowerCase().includes('help')) {
			const message = Flow.help[Math.floor(Math.random() * Flow.help.length)];
			let formattedMessage = {
				message: message.res
			};
			if (message.next) formattedMessage.next = message.next;
			return formattedMessage;
		}
		return false;
	},
	restart: (text, Flow, user, env) => {
		if (text.toLowerCase() === 'restart') {
			const message = {
				message: 'Your user data and state have been deleted.'
			};

			User.delete(user.id, env);
			return message;
		}
		return false;
	},
	faq: (text, Flow) => {
		const hash = stripString(text);
		for (let faq of Flow.faqs) {
			if (typeof faq.q === 'object') {
				let faqMessage = null;
				faq.q.some(question => {
					if (hash === stripString(question)) {
						const answer = faq.a;
						faqMessage = {
							message: answer
						};
						return faqMessage;
					}
				});
				if (faqMessage) return faqMessage;
			} else if (hash === stripString(faq.q)) {
				const answer = faq.a;
				return {
					message: answer
				};
			}
		}
		return false;
	}
	// map: (text) => {
	// 	const hash = stripString(text);
	// 	let map = null;
	// 	const mapping = () => {
	// 		for (let map in mapper) {
	// 			if (typeof mapper[map] === 'object') {
	// 				console.log('map', map);
	// 				let faqMessage = null;
	// 				mapper[map].some(question => {
	// 					if (hash === stripString(question)) {
	// 						return true;
	// 					}
	// 				});
	// 				if (faqMessage) return faqMessage;
	// 			} else if (hash === stripString(mapper[map])) {
	// 				const answer = mapper[map];
	// 				console.log('map', map);
	// 				return {
	// 					message: answer
	// 				};
	// 			}			//console.log('mapper', mapper[map]);
	// 		}
	// 	};
	//
	// 	//if (mapping) return map;
	// 	return false;
	// }
};

module.exports = Filters;

function stripString(string) {
	return string.replace(/\W/g, '').toLowerCase();
}
