require('babel-core/register');
require('babel-polyfill');
require('dotenv').config();

import fs from 'fs';
import http from 'http';

import express from 'express';
import Promise from 'bluebird';

import API from './api';
import db from './api/models';
import Log from './modules/log';

//control that we have a config file
if(!fs.existsSync(`${__dirname}/../config.json`))
{
	console.error('Error: No config file found.');
	process.exit();
}

//control data folder for data
if (!fs.existsSync(`${__dirname}/data`)) {
    console.error('ERROR: No data folder found.');
    process.exit();
}

let config = require(`${__dirname}/../config.json`);

const Server = require('./server').Server;
const app = express();

Promise.promisifyAll(db.sequelize);
db.sequelize.authenticate().then(
	() =>
	{
		let webServer;
		webServer = http.createServer(app);

		const customLogger = new Log(
		{
			level: (process.env.NODE_ENV === 'development' ? 'info' : 'error'),
			debugFile: './server.debug.log',
			infoFile: './server.info.log',
			warnFile: './server.warn.log',
			errorFile: './server.error.log',
		});

		app.set('customLogger', customLogger);

		const gameServer = new Server(webServer, config, customLogger);
		const restServer = new API(app, config);

		process.on('SIGTERM', async function()
		{
			await gameServer.shutdown();
			process.exit();
		});
		console.log('Connection has been established successfully.');
	},
	(err) =>
	{
    	return console.error('Unable to connect to the database:', err);
	}
);