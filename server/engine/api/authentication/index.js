import passport from 'passport';
import config from '../../../config.json';
import uuid from 'uuid/v4';
//import UserModel from '../models/user';
//import IdentityModel from '../models/identity';
import jwt from 'jsonwebtoken';

import * as localAuth from './strategies/local';
import oauthSetup from './strategies/oauth';

function output(req, res, output) {
    const redirect = req.params.provider ? true : false;
    const errorUrl = `${req.app.get('config').clientUrl}/auth?error=`;

    if (redirect) {
        return res.redirect(`${errorUrl}${output.error || output.message}`);
    }

    res.status(output.status || 200).json(output);
}

export function loadStrategies(passport, logger) {
    config.api.authentication.providers.forEach((provider) => {
        let callbackUrl = `${config.api.domain}${[80, 443].includes(config.api.post) ? '' : `:${config.api.port}`}/api/auth/provider/${provider.id}/callback`;

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
    if (req.body.providerToken) {
        return authenticateProvider(req, res);
    }

    // continue with account authentication
    let method = (req.body.method || req.params.provider) + ''.toLowerCase();

    if (!method) {
        return output(req, res, {
            status: 400,
            error: 'Invalid authentication method.',
        });
    }

    const provider = req.app.get('config').api.authentication.providers.find((obj) => obj.id === method);

    if (!provider) {
        return output(req, res, {
            status: 400,
            error: 'Invalid authentication method.',
        });
    }

    return passport.authenticate(provider.id, Object.assign({session: false}, {scope: provider.scope || null}), (err, userDetails, info, status) => {
        if (err) {
            req.app.get('customLogger').error(err);

            return output(req, res, {
                status: 400,
                error: 'Invalid authentication method.',
            });
        }

        if (userDetails) {
            return onAuth(req, res, userDetails, method !== 'local');
        }

        return output(req, res, {
            status: status || 400,
            error: err || info.message,
        });
    })(req, res, next);
}

export function onAuth(req, res, data, redirect) {
    let tok;
    if(!data.user.dataValues.sessionToken) {
        tok = uuid();
    }
    else
    {
        tok = data.user.dataValues.sessionToken;
    }
    const token = jwt.sign({
        id: data.user.dataValues.id || null,
        sessionToken: tok,
        //identity: data.identity.id || null,
    }, process.env.SIGNING_SECRET, {expiresIn: '1h'});

    if (redirect) {
        return res.redirect(`${req.app.get('config').clientUrl}/auth?token=${token}`);
    }

    // send JWT back to client
    output(req, res, {
        status: 200,
        authToken: token,
    });
}

export function getAuthList(req, res) {
    const providers = config.api.authentication.providers.filter((provider) => provider.enabled);
    const authlist = providers.map((provider) => {
        return {
            id: provider.id,
            name: provider.name,
            authUrl: `${config.api.domain}${[80, 443].includes(config.api.post) ? '' : `:${config.api.port}`}/api/authentication/provider/${provider.id}`,
        };
    });

    output(req, res, {
        status: 200,
        authlist,
    });
}