const db = require('./connection')();

const analytics = {
	getAll: () => {
		db.then(connection => {
			connection.query('SELECT * FROM facebook')
				.then(res => console.log(res));
		});
	},
	setUser: (user_id, current_node) => {
		const obj = {
			user_id: user_id,
			current_node: current_node
		};
		return db.then(conn => {
			conn.query('INSERT INTO facebook SET ?', obj);
		}).catch(err => {
			console.log('DB ERROR', err);
		});
	}
};

module.exports = analytics;
