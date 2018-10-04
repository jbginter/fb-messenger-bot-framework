const attachment = (obj) => {

	let message = obj.url;

	if (typeof message === 'object') {
		message = obj.url[Math.floor(Math.random() * obj.url.length)];
	}

	let formattedMessage = {
		messageData: {
			attachment: {
				type: obj.src,
				payload: {
					url: message
				}
			}
		}
	};

	if (obj.next) formattedMessage.next = obj.next;

	return formattedMessage;
};

module.exports = attachment;
