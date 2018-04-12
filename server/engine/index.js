import fs from 'fs';
import http from 'http';

import dotenv from 'dotenv';
import express from 'express';
import Promise from 'bluebird';

import API from './api';
import db from './api/models';
import Log from './modules/log';

import {buildConfig} from '../libs/config';
const dotEnvLoaded = dotenv.config();

if(dotEnvLoaded.error) {
	throw new Error(dotEnvLoaded.result.error);
}

let config = buildConfig();

const Server = require('./server').Server;
const app = express();

Promise.promisifyAll(db);
db.sequelize.authenticate().then(
	() =>
	{
		let webServer;
		let webServerAPI;

		webServer = http.createServer(app);
		webServerAPI = http.createServer(app);

		const customLogger = new Log(
		{
			level: (process.env.NODE_ENV === 'development' ? 'info' : 'error'),
			debugFile: `${__dirname}/../logs/debug.log`,
			infoFile: `${__dirname}/../logs/info.log`,
			warnFile: `${__dirname}/../logs/warn.log`,
			errorFile: `${__dirname}/../logs/error.log`,
		});

		app.set('customLogger', customLogger);

		const gameServer = new Server(webServer, config, customLogger);
		const restServer = new API(app, webServerAPI, config);

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
