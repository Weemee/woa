import passport from 'passport';
import uuid from 'uuid/v4';
import jwt from 'jsonwebtoken';
import base32 from 'thirty-two';

import * as localAuth from './strategies/local';
import oauthSetup from './strategies/oauth';

import db from 'libs/db';

function output(req, res, output, forceRedirect = false) {
	const redirect = req.params.provider ? true : false;
	const errorUrl = `${req.app.get('config').app.clientURL}/authentication?${output.status > 203 ? 'error' : 'success'}=`;

	if (redirect || forceRedirect) {
		return res.redirect(`${errorUrl}${output.error || output.message}`);
	}

	res.status(output.status || 200).json(output);
}

export function loadStrategies(passport, logger, config) {
	config.authentication.providers.forEach((provider) => {
		let callbackUrl = `${config.api.restURL}${[80, 443].includes(config.api.restPort) ? '' : `:${config.api.port}`}/api/authentication/provider/${provider.id}/callback`;

		if (provider.enabled) {
				// if its the local auth provider, we have to use a separate strategy from OAuth.
				if (provider.id === 'local') {
					return localAuth.setup(passport, logger);
				}

				try {
					oauthSetup(
						passport,
						{
							...provider,
							callbackUrl,
						},
						logger
						);
				} catch (err) {
					logger.error(err);
				}
			}
		});
}

export function authenticate(req, res, next) {
	// check if we are authenticating a provider token
	if(req.body.providerToken) {
		//return authenticateProvider(req, res);
	}

	// continue with account authentication
	let method = (req.body.method || req.params.provider) + ''.toLowerCase();

	if(!method) {
		return output(req, res, {
			status: 400,
			error: 'Invalid authentication method.',
		});
	}

	const provider = req.app.get('config').authentication.providers.find((obj) => obj.id === method);

	if(!provider) {
		return output(req, res, {
			status: 400,
			error: 'Invalid authentication method.',
		});
	}

	return passport.authenticate(provider.id, Object.assign({session: false}, {scope: provider.scope || null}), (err, userDetails, info, status) => {
		if(err) {
			if (typeof err !== 'string') {
				req.app.get('log').error(err);
			}

			return output(req, res, {
				status: 400,
				error: (typeof err === 'string' ? err : 'Invalid authentication method.'),
			});
		}

		if(userDetails) {
			return onAuth(req, res, userDetails, method !== 'local');
		}

		return output(req, res, {
			status: status || 400,
			error: err || info.message,
		});
	})(req, res, next);
}

export function isAuthenticated(req, res, next) {
	const token = req.headers['authorization'];

	if(!token) {
		return output(req, res, {
			status: 401,
			message: 'Invalid authorisation token first.',
		});
	}

	jwt.verify(token.replace('Bearer ', ''), req.app.get('config').protocol.signingSecret, (err, decoded) => {
		if (err) {
			return output(req, res, {
				status: 401,
				message: 'Invalid authorisation token second.',
			});
		}
		if (req.params.userID) {
			if (req.params.userID !== decoded.id) {
				return output(req, res, {
					status: 401,
					message: 'Invalid authorisation token third.',
				});
			}
		}

		db.accountObject.findOne({
		where:
		{
			[db.Op.and]: [
			{
				id:
				{
					[db.Op.like]: [decoded.id]
				}
			},
			{
				sessionToken:
				{
					[db.Op.like]: [decoded.sessionToken]
				}
			}]
		},
		}).then(result => {
			const userDetails = result;
			userDetails.password = userDetails.password ? true : false;
			req.account = userDetails;
			next();
		}).catch(err => {
			return output(req, res, {
				status: 401,
				message: 'Invalid authorisation token third.',
			});
		});
	});
}

export function onAuth(req, res, data, redirect) {
	const config = req.app.get('config');

	const token = jwt.sign({
		id: data.account.dataValues.id || null,
		sessionToken: data.account.dataValues.sessionToken,
		identity: data.identity.id || null,
		lastCharPlayed: data.account.dataValues.lastCharPlayed,
	}, req.app.get('config').protocol.signingSecret, {expiresIn: '1h'});

	//Move this if statement to account action
	if(!data.account.dataValues.keyToken) {
		console.log('No keyToken seen');
		const key = randomKey(10);
		const encodedKey = base32.encode(key);
		authenticateOpt(encodedKey);
	}

	if(redirect) {
		return res.redirect(`${req.app.get('config').app.clientURL}/authentication?token=${token}`);
	}

	// send JWT back to client
	output(req, res, {
		status: 200,
		authToken: token,
	});
}

//Move this to opt facade
function randomKey(len){
  var buf = []
    , chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    , charlen = chars.length;

  for (var i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Until here

export function getAuthList(req, res) {
	const config = req.app.get('config');
	const providers = config.authentication.providers.filter((provider) => provider.enabled);
	const authlist = providers.map((provider) => {
		return {
			id: provider.id,
			name: provider.name,
			authUrl: `${config.api.restURL}${[80, 443].includes(config.api.post) ? '' : `:${config.api.restPort}`}/api/authentication/provider/${provider.id}`,
		};
	});

	output(req, res, {
		status: 200,
		authlist,
	});
}

export function getAuthOpt(req, res, next) {

}

export function authenticateOpt(req, res) {
	console.log(req);
	return null;
}
