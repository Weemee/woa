import http from 'http';

import dotenv from 'dotenv';
import express from 'express';

import API from './api';
import db from 'libs/db';
import Logger from './modules/log';

import {buildConfig} from 'libs/config';
const dotEnvLoaded = dotenv.config();

if(dotEnvLoaded.error) {
	throw new Error(dotEnvLoaded.result.error);
}

let config = buildConfig();

const Server = require('./server').Server;
const app = express();

db.sequelize.authenticate().then(
	() =>
	{
		let webServer;
		let webServerAPI;

		webServer = http.createServer(app);
		webServerAPI = http.createServer(app);

		const log = new Logger(
		{
			level: (process.env.NODE_ENV === 'development' ? 'info' : 'error'),
			debugFile: `${__dirname}/../logs/debug.log`,
			infoFile: `${__dirname}/../logs/info.log`,
			warnFile: `${__dirname}/../logs/warn.log`,
			errorFile: `${__dirname}/../logs/error.log`,
		});

		app.set('log', log);

		const gameServer = new Server(webServer, config, log);
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
