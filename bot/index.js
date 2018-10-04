const Client = require('../router/client');
const getMessageUser = require('./core/getMessageUser');
const getFlowType = require('./core/getFlowType');
const User = require('./users');
const {NODE_POINTERS} = require('../constants');
const ogFlow = require('./flow');
const messaging = require('./messaging');
const handlers = require('./handlers');
const _ = require('lodash');

// DEV
const util = require('util');
const chalk = require('colors');

const Bot = {

	env: process.env.NODE_ENV === 'production' ? true : null,
	flow: null,

	config(data) {
		const _bot = this;
		if (data && typeof data === 'object') {
			_.forEach(data, (val, key) => {
				switch (key) {
					case 'flow':
						_bot.flow = Object.freeze(Object.assign(ogFlow, val));
						break;
					case 'env':
						val === ('prod' || 'production') || process.env.NODE_ENV === 'production'
							? this.env = true
							: console.log('[config] Environment in config unknown >>>'.magenta, 'using dev environment'.bgWhite.blue);
						break;
					default:
						console.log('!!! unrecognized config key sent, ignoring value !!! \noffending key value => '.yellow, key.red);
						break;
				}
			});
		}
	},

	receive(requestBody) {

		const {message, user} = getMessageUser(requestBody);
		const _bot = this;

		if (!_bot.flow) _bot.flow = Object.freeze(Object.assign({}, ogFlow)); // no config was set

		if (!message.type) return; // Invalid message type/FB responding from message sent

		User.get(user, _bot.env)
			.then(state => {

				//console.log(chalk.green('User State: ')+ util.inspect(state) +chalk.green('\nUser message: ') + util.inspect(message));

				if (state.new) {
					const flowType = getFlowType(_bot.flow[NODE_POINTERS.intro]);
					const messageToSend = messaging[flowType](_bot.flow[NODE_POINTERS.intro]);
					_bot.sendMessage(messageToSend, state);
				} else {
					_bot.handleEvent(message, state);
				}
			})
			.catch(err => {
				console.log(chalk.red('Error in receive: '), err);
			});
	},

	handleEvent(message, state) {
		const handledMessage = handlers(message, state, this.env, this.flow);
		this.sendMessage(handledMessage, state);
	},

	sendMessage(content, state) {
		const _bot = this;
		Client.request(state.id, content.messageData)
			.then(() => {
				if(content.next && _bot.flow[content.next]) {
					const flowType = getFlowType(_bot.flow[content.next]);
					_bot.sendMessage(messaging[flowType](_bot.flow[content.next]), state);
				}
			})
			.catch(err => {
				console.log(chalk.red('Error making request: ', err.message, ' UID: ' + state.id));
			});
	}

};

module.exports = Bot;
