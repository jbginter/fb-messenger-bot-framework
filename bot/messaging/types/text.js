const textResponse = (obj) => {

	let message = obj.message;

	if (typeof message === 'object') {
		message = obj.message[Math.floor(Math.random() * obj.message.length)];
	}

	let formattedMessage = {
		messageData: {
			text: message
		}
	};

	if (obj.next) formattedMessage.next = obj.next;

	return formattedMessage;
};

module.exports = textResponse;
