import LocalStrategy from 'passport-local';
import uuid from 'uuid/v4';
import crypto from 'crypto';

import db from '../../models';

let logger;

export function setup(passport, loggerObj) {
	logger = loggerObj;

	//setup the stategies we want
	passport.use(new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		failureFlash: false,
	}, Auth));
}

function Auth(username, password, done) {
	db.account.findOne({
		where:
		{
			usr:
			{
				[db.Op.like]: [username]
			}
		},
	}).then(async(result) => {
		if(!result) {
			return done('Invalid input combination.');
		}

		const check = await db.account.verifyHash(password, result.password);

		if(!check) {
			return done('Invalid hash.');
		}

		return done(null, {
			account: result,
			identity: {},
		});
	}).catch(err => {
		return done(err, {
			account: null,
			identity: {},
		});
	});
}
