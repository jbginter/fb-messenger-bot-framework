const connection = require('./connection');
const analytics = require('../../analytics');
const {NODE_POINTERS, USER_PREFIX} = require('../../../constants');

if (process.env.NODE_ENV === 'production') {
	connection();
}

const user = {
	newUser: id => {
		analytics.setUser(id, NODE_POINTERS.intro);
		connection.hmsetAsync(`${USER_PREFIX}${id}`, {
			'node': NODE_POINTERS.intro
		});
	},
	get: id =>
		connection.hgetallAsync(`${USER_PREFIX}${id}`)
	,
	update: (node, id) => {
		analytics.setUser(id, node);
		connection.hmsetAsync(`${USER_PREFIX}${id}`, {
			'node': node
		});
	},
	delete: id =>
		connection.del(`${USER_PREFIX}${id}`, (err, res) => {
			if(err) {
				console.log(`Error deleting user: ${err}`);
			} else {
				console.log(`Deleted ${res} users`);
			}
		})
};

module.exports = user;
