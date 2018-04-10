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
	db.user.findOne({
		where:
		{
			[db.Op.and]: [
			{
				usr:
				{
					[db.Op.like]: [username]
				}
			},
			{
				password:
				{
					[db.Op.like]: [password]
				}
			}]
		},
	}).then(async(result) =>
	{
		return done(null, {
			user: result,
			identity: {},
		});
	});
}