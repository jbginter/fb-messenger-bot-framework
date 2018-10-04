const mysql = require('promise-mysql');
const {env} = process;

const config = {
	host: env.DB_HOST,
	user: env.DB_USER,
	password: env.DB_PASSWORD,
	database: env.DB_NAME
};

module.exports = () => {
	if (env.NODE_ENV === 'production') {
		return mysql.createConnection(config).then(() => {
			console.log('Analytics database connected');
		}).catch(err => {
			console.log('Analytics DB error:', err);
		});
	} else {
		console.log('NODE_ENV is not set to production, analytics will not be posted');
		return false;
	}
};
