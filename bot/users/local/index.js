const fs = require('fs');
const _ = require('lodash');
const {NODE_POINTERS} = require('../../../constants');

const local = {
	get: (uniqueID, userInfo) => {
		return new Promise((resolve, reject) => {
			fs.readFile('./bot/users/local/db.json', 'utf-8', (err, data) => {
				if (err) return reject(err);

				let userData = JSON.parse(data);
				const findUser = _.findIndex(userData.users, { id: uniqueID });

				if (findUser === -1) {
					userData.users.push({
						id: uniqueID,
						node: NODE_POINTERS.intro
					});
					userInfo.id = uniqueID;
					userInfo.new = true;
					userInfo.node = NODE_POINTERS.intro;
				} else {
					userInfo.id = uniqueID;
					userInfo.new = false;
					userInfo.node = userData.users[findUser].node;
				}

				fs.writeFile('./bot/users/local/db.json', JSON.stringify(userData), 'utf-8', (err) => {
					if (err) return reject(err);
					resolve(userInfo);
				});
			});
		});
	},
	update: (node, uniqueID) => {
		return new Promise((resolve, reject) => {
			fs.readFile('./bot/users/local/db.json', 'utf-8', (err, data) => {
				if (err) return reject(err);

				let userData = JSON.parse(data);
				const findUser = _.findIndex(userData.users, { id: uniqueID });

				if (findUser === -1) {
					console.log('user not found!');
				} else {
					userData.users[findUser].node = node;
					fs.writeFile('./bot/users/local/db.json', JSON.stringify(userData), 'utf-8', (err) => {
						if (err) return reject(err);
						resolve('user updated');
					});
				}
			});
		});
	},
	delete: (uniqueID) => {
		return new Promise((resolve, reject) => {
			fs.readFile('./bot/users/local/db.json', 'utf-8', (err, data) => {
				if (err) return reject(err);

				let userData = JSON.parse(data);
				const findUser = _.findIndex(userData.users, { id: uniqueID });

				if (findUser === -1) {
					console.log('user not found!');
				} else {
					userData.users.splice(findUser, 1);
					fs.writeFile('./bot/users/local/db.json', JSON.stringify(userData), 'utf-8', (err) => {
						if (err) return reject(err);
						resolve('user deleted');
					});
				}
			});
		});
	}
};

module.exports = local;
