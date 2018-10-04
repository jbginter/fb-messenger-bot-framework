require('dotenv').load();

const CLIENT_OPTIONS = {
	method: 'POST',
	uri: `https://graph.facebook.com/v${process.env.FB_GRAPH_VERSION}/me/messages`,
	qs: {
		access_token: process.env.FB_PAGE_ACCESS_TOKEN
	},
	body: {
		recipient: {
			id: null
		},
		message: null
	},
	json: true
};

const MESSAGE_TYPES = {
	text: 'text',
	echo: 'echo',
	postback: 'postback',
	callback: 'callback',
	attachment: 'attachment'
};

const NODE_POINTERS = {
	intro: 'intro',
	menu: 'main-menu'
};

const USER_PREFIX = 'user:';

module.exports = {
	CLIENT_OPTIONS,
	MESSAGE_TYPES,
	NODE_POINTERS,
	USER_PREFIX
};
