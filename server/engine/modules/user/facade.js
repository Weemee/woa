import jwt from 'jsonwebtoken';

// user specific imports
import {
	ACCOUNT_AUTHENTICATE,
	ACCOUNT_AUTHENTICATE_ERROR,
	ACCOUNT_AUTHENTICATE_SUCCESS,
} from 'libs/constants';

import db from '../../api/models';
const Op = db.Sequelize.Op;

export default class UserFacade {
	constructor(Server) {
		this.Server = Server;

		Server.socketFacade.on('dispatch', this.handleDispatch.bind(this));

		this.Server.log.info('UserFacade::constructor loaded');
	}

	handleDispatch(socket, action) {
		switch (action.type) {
			case ACCOUNT_AUTHENTICATE:
				return this.authenticate(socket, action);
		}

		return null;
	}

	async authenticate(socket, action) {
		if (!action.payload) {
			return;
		}

		jwt.verify(action.payload, this.Server.config.protocol.signingSecret, async (err, decoded) => {
			if (err) {
				return this.Server.socketFacade.dispatchToSocket(socket, {
					type: ACCOUNT_AUTHENTICATE_ERROR,
					payload: 'Invalid authentication token. Please try again.',
				});
			}

			let user;
			let userID;

			try {
				user = await db.user.findOne({where: {id: decoded.id, sessionToken: decoded.sessionToken}});

				if (!user) {
					return this.Server.socketFacade.dispatchToSocket(socket, {
						type: ACCOUNT_AUTHENTICATE_ERROR,
						payload: 'Invalid authentication token. Please try again.',
					});
				}

				userID = user.dataValues.id.toString();
			} catch (err) {
				this.Server.onError(err, socket);
			}

			try {
					 // logout any other session(s) if found
					 await this.Server.socketFacade.logoutOutSession(socket, userID);
					} catch (err) {
						this.Server.onError(err, socket);
					}

				// add the authenticated use to the socket object
				socket.user = {
					userID,
				};

				// add the socket to the list of active clients
				this.Server.socketFacade.add(socket);

				return this.Server.socketFacade.dispatchToSocket(socket, {
					type: ACCOUNT_AUTHENTICATE_SUCCESS,
					payload: {
					},
				});
			});
	}
}
