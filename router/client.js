const {CLIENT_OPTIONS} = require('../constants');
const requestPromise = require('request-promise');

const Client = {
	request(recipientId, messageData) {
		CLIENT_OPTIONS.body.recipient.id = recipientId;
		CLIENT_OPTIONS.body.message = messageData;

		return requestPromise(CLIENT_OPTIONS);
	}
};

module.exports = Client;
