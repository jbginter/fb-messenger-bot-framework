/*
	This is to setup custom functions to be run to send custom messages. Format must be a way FB can understand, feel free to use the messaging function to build them out if you want to use the format I've setup

	Also set this up so a customResponse must be sent as a payload. A user can't type the name of a customResponse and gain access to it. This prevents unwanted issues that could possibly occur

*/

const customResponse = {
	'response': (resp) => {
		return {
			messageData: {
				text: `Payload: ${resp}`
			}
		};
	},
	'whatsTheTime': (resp) => {
		const date = new Date(Date.now());
		return {
			messageData: {
				text: date
			}
		};
	}
};

module.exports = customResponse;
