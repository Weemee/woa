import passport from 'passport';
import uuid from 'uuid/v4';
import jwt from 'jsonwebtoken';

import * as localAuth from './strategies/local';
import oauthSetup from './strategies/oauth';

import db from '../models';

function output(req, res, output) {
	const redirect = req.params.provider ? true : false;
	const errorUrl = `${req.app.get('config').app.clientURL}/authentication?error=`;

	if (redirect) {
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
		return authenticateProvider(req, res);
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
			req.app.get('customLogger').error(err);

			return output(req, res, {
				status: 400,
				error: 'Invalid authentication method.',
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
		console.log('First');
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

		db.user.findOne({
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
			req.user = userDetails;
			next()
		}).catch(err => {
			return output(req, res, {
				status: 401,
				message: 'Invalid authorisation token third.',
			});
		});
	});
}

export function onAuth(req, res, data, redirect) {
	const token = jwt.sign({
		id: data.user.dataValues.id || null,
		sessionToken: data.user.dataValues.sessionToken,
		identity: data.identity.id || null,
	}, req.app.get('config').protocol.signingSecret, {expiresIn: '1h'});

	if(redirect) {
		return res.redirect(`${req.app.get('config').app.clientURL}/authentication?token=${token}`);
	}

	// send JWT back to client
	output(req, res, {
		status: 200,
		authToken: token,
	});
}

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
