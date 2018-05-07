import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import contentFilter from 'content-filter';
import passport from 'passport';

import {
	loadStrategies,
	authenticate,
	getAuthList,
	isAuthenticated,
	getOtpAuth,
	autehnticateOtp,
} from './authentication';

import {
	createAccount,
	updateAccount,
	deleteAccount,
	getAccount,
} from './account';

export default function(app, webServerAPI, config) {
	app.set('config', config);
	app.use(bodyParser.json());
	app.use(helmet());
	app.use(passport.initialize());
	app.use(bodyParser.urlencoded({
		extended: true,
	}));

	app.use(contentFilter({
		methodList: ['GET', 'POST'],
	}));

	// Set needed headers for the application.
	app.use(function(req, res, next) {
		// Website you wish to allow to connect
		res.setHeader('Access-Control-Allow-Origin', '*');
		// Request methods you wish to allow
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
		// Request headers you wish to allow
		res.setHeader('Access-Control-Allow-Headers', 'Authorization, Accept, X-Requested-With, Content-Type');
		// Whether requests needs to include cookies in the requests sent to the API. We shouldn't use this unless we retained sessions etc. which we don't!
		res.setHeader('Access-Control-Allow-Credentials', false);
		// Pass to next middleware
		next();
	});

	loadStrategies(passport, app.get('log'), config);

	//API routes
	const routes = express.Router({
		caseSensitive: false,
	});

	//Account routes
	routes.route('/account')
		.post(createAccount);
	routes.route('/account/:userID')
		.get(isAuthenticated, getAccount)
		.delete(isAuthenticated, deleteAccount)
		.patch(isAuthenticated, updateAccount);

	// Authentication routes
	// user/password authentication
	routes.route('/authentication')
		.get(getAuthList)
		.post(authenticate);

	/*routes.route('/autehnticate/veritfyOtp')
		.get(getOtpAuth)
		.post(autehnticateOtp);*/

	// OAuth
	routes.route('/authentication/provider/:provider')
		.get(authenticate);
	routes.route('/authentication/provider/:provider/callback')
		.get(authenticate);


	app.use('/api', routes);

	webServerAPI.listen(config.api.restPort);
	console.log(`API listening on port ${config.api.restPort}`);
}
