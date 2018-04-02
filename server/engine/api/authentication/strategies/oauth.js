//import UserModel from '../../models/user';
//import IdentityModel from '../../models/identity';

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
    /*IdentityModel.findOne({provider: escape(profile.provider), providerId: escape(profile.id)}, async (err, identity) => {
        if (err) {
            logger.error(err);
            return cb('Something went wrong, please try again in a moment.');
        }

        if (!identity) {
            try {
                identity = await createIdentity(profile.provider, profile.id);
            } catch (err) {
                logger.error(err);
                return cb('Something went wrong, please try again in a moment.');
            }
        }

        if (!identity.userId) {
            return cb(null, {
                identity,
                user: {},
            });
        }

        // load the user data, associated with the identity
        UserModel.findOne({_id: escape(identity.userId)}, {_id: 1, session_token: 1}, async (err, user) => {
            if (err) {
                logger.error(err);
                return cb('Something went wrong, please try again in a moment.');
            }

            // if the user was deleted, create a new user
            if (!user) {
                user = await createNewUser(identity);

                if (!user) {
                    return cb('Something went wrong, please try again in a moment.');
                }
            }

            return cb(null, {
                identity,
                user: user.toObject(),
            });
        });
    });*/

    return cb(null, {
    	identity, 
    	user: {},
    });
}