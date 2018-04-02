import LocalStrategy from 'passport-local';
//import UserModel from '../../models/user';
import uuid from 'uuid/v4';
import crypto from 'crypto';

import db from '../../models';
const Op = db.Sequelize.Op;

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
            [Op.and]: [
            {
                usr:
                {
                    [Op.like]: [username]
                }
            },
            {
                password:
                {
                    [Op.like]: [password]
                }
            }]
        },
    }).then(async(test) =>
    {
        return done(null, {
            user: test,
            identity: {},
        });
    });
}