import LocalStrategy from 'passport-local';
import uuid from 'uuid/v4';
import crypto from 'crypto';

import db from '../../models';

let logger;

export default function setup(passport, details, loggerObj) {
	logger = loggerObj;
	const Strategy = require(`passport-${details.package}`).Strategy;
	const secret = process.env[`${details.id.toUpperCase()}_CLIENT_SECRET`] || null;

	if (!secret) {
		return logger.error(new Error(`The provider ${details.id} does not have a ${details.id.toUpperCase()}_CLIENT_SECRET defined.`));
	}

	//setup the stategies we want
	passport.use(new Strategy({
		clientID: details.clientID,
		clientSecret: secret,
		callbackURL: details.callbackUrl,
	}, Auth));
}

function Auth(accessToken, refreshToken, profile, cb) {
	return cb(null, {
		identity, 
		user: {},
	});
}