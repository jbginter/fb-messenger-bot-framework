const {NODE_POINTERS} = require('../../constants');
const local = require('./local');
const prod = require('./redis');

const User =  {
	get(uniqueID, env) {
		const userInfo = {
			id: null,
			new: null,
			node: null
		};
		if (!env) {
			return local.get(uniqueID, userInfo);
		} else {
			return prod.get(uniqueID).then(res => {
				//console.log(res);
				if (!res) {
					prod.newUser(uniqueID);
					userInfo.id = uniqueID;
					userInfo.new = true;
					userInfo.node = NODE_POINTERS.intro;
				} else {
					userInfo.id = uniqueID;
					userInfo.node = res.node;
				}
				return userInfo;
			});
		}
	},
	update(node, uniqueID, env) {
		return !env
			? local.update(node, uniqueID)
			: prod.update(node, uniqueID)
			;
	},
	delete(uniqueID, env) {
		return !env
			? local.delete(uniqueID)
			: prod.delete(uniqueID)
			;
	}
};

module.exports = User;
