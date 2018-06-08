import jwt from 'jsonwebtoken';

// account specific imports
import {
	ACCOUNT_AUTHENTICATE,
	ACCOUNT_AUTHENTICATE_ERROR,
	ACCOUNT_AUTHENTICATE_SUCCESS,
} from 'libs/constants';

import db from 'libs/db';

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

	setLastCharPlayed(userID, charID) {
		console.log('\nAccountID: ', userID, ' & charID: ', charID, '\n');

		const updated = db.accountObject.update({
			lastCharPlayed: charID,
		},
		{
			where:
			{
				id:
				{
					[db.Op.like]: [userID],
				}
			}
		}).catch(err => {
			if(err) {
				return err;
			}
		});

		return updated;
	}

	removeLastCharPlayed(userID) {
		console.log('\nAccountID: ', userID, '\n');

		const updated = db.accountObject.update({
			lastCharPlayed: null,
		},
		{
			where:
			{
				id:
				{
					[db.Op.like]: [userID],
				}
			}
		}).catch(err => {
			if(err) {
				return err;
			}
		});

		return updated;
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

			let account;
			let userID;

			try {
				account = await db.accountObject.findOne({where: {id: decoded.id, sessionToken: decoded.sessionToken}});

				if (!account) {
					return this.Server.socketFacade.dispatchToSocket(socket, {
						type: ACCOUNT_AUTHENTICATE_ERROR,
						payload: 'Invalid authentication token. Please try again.',
					});
				}

				// Bug? typeof issues with account/character
				userID = account.dataValues.id.toString();
			} catch (err) {
				this.Server.onError(err, socket);
			}

			try {
				// Logout any other session(s) if found
				await this.Server.socketFacade.logoutOutSession(socket, userID);
			} catch (err) {
				this.Server.onError(err, socket);
			}

			// Add the authenticated account to the socket object
			socket.account = {
				userID,
			};

			// Add the socket to the list of active clients
			this.Server.socketFacade.add(socket);

			const serverMaps = this.Server.serverMapFacade.getList();

			return this.Server.socketFacade.dispatchToSocket(socket, {
				type: ACCOUNT_AUTHENTICATE_SUCCESS,
				payload: {
					gameData: {
						servers: serverMaps,
					},
				},
			});
		});
	}
}
