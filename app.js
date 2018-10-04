'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router');
const Bot = require('./bot');
const chalk = require('colors');
let consoleLog;

const envPath = function() {
	switch(process.env.NODE_ENV) {
		case 'staging':
			consoleLog = '*** Using '+ chalk.green('Staging') +' ENV \n';
			return {path: './.env_staging'};
		case 'production':
			consoleLog = '*** Using '+ chalk.green('Production') +' ENV \n';
			return {path: './.env_prod'};
		default:
			consoleLog = '*** Using '+ chalk.green('Development') +' ENV \n';
			return {path: './.env'};
	}
};

require('dotenv').config(envPath());

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.urlencoded({extended: false}))
	.use(bodyParser.json())
	.use(router);

app.listen(app.get('port'), () => {
	consoleLog += '*** running on port: ' + chalk.green(app.get('port')) + '\n';
	consoleLog += '*** Using FB Graph version: ' + chalk.green(process.env.FB_GRAPH_VERSION);
	console.log(consoleLog);
});

app.post('/webhook', (req, res) => {
	Bot.receive(req.body);
	res.sendStatus(200);
});
