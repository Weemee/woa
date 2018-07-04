import http from 'http';
import https from 'https';
import fs from 'fs';

import dotenv from 'dotenv';
import express from 'express';

import API from './api';
import db from 'libs/db';
import Logger from './modules/log';

import {buildConfig} from 'libs/config';
import { Server } from './server';
const dotEnvLoaded = dotenv.config();

if(dotEnvLoaded.error) {
	throw new Error(dotEnvLoaded.result.error);
}

let config = buildConfig();
const app = express();
const dev = true;

db.sequelize.authenticate().then(
	() =>
	{
		let webServer;
		let webServerAPI;

		if(config.security.certificate.key && !dev) {
			console.log('Found HTTPS config, starting HTTP services...');

			webServer = https.createServer({
				key: fs.readFileSync(config.security.certificate.key, 'utf8'),
            cert: fs.readFileSync(config.security.certificate.cert, 'utf8'),
            ca: [fs.readFileSync(config.security.certificate.ca, 'utf8'),],
			}, app);

			if(webServer) {
				console.log('HTTPS Server established!');
			} else {
				console.error('Failed establishing HTTPS Server, exiting...');
			}

			webServerAPI = https.createServer({
				key: fs.readFileSync(config.security.certificate.key, 'utf8'),
            cert: fs.readFileSync(config.security.certificate.cert, 'utf8'),
            ca: [fs.readFileSync(config.security.certificate.ca, 'utf8'),],
			}, app);

			if(webServerAPI) {
				console.log('HTTPS API Server established!');
			} else {
				console.error('Failed establishing HTTPS API Server, exiting...');
			}

		} else {
			console.log('Found HTTP config, starting HTTP services...');
			webServer = http.createServer(app);

			if(webServer) {
				console.log('HTTP Server established!');
			} else {
				console.error('Failed establishing HTTP Server, exiting...');
			}

			webServerAPI = http.createServer(app);

			if(webServerAPI) {
				console.log('HTTP API Server established!');
			} else {
				console.error('Failed establishing HTTP API Server, exiting...');
			}
		}

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
			await restServer.shutdown();
			process.exit();
		});

		console.log('Connection has been established successfully.');
	}, (err) => {
		return console.error('Unable to connect to the database:', err);
	}
);
