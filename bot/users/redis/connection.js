const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

require('dotenv').load();

const config = {
	port: process.env.REDIS_PORT,
	host: process.env.REDIS_HOST,
	password: process.env.REDIS_PASSWORD
};

module.exports = () => {
	const client = redis.createClient(config);

	client
		.on('error', function(err) {
			console.log(`Error connecting to Redis: ${err}`);
		})
		.on('ready', function() {
			console.log('Redis Connected Successfully');
		});

	return client;
};
