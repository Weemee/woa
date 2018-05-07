import io from 'socket.io';
import EventEmitter from 'events';

import {
	ACCOUNT_AUTHENTICATE,
	ACCOUNT_LOGOUT,
	CHARACTER_LOGOUT,
	CHARACTER_REMOTE_LOGOUT,
} from 'libs/constants';

export default class SocketFacade extends EventEmitter
{
	constructor(Server, server)
	{
		super(Server, server);

		this.Server = Server;

		this.clients = {};

		this.server = server;

		this.io = io(server);

		this.timers = {};

		this.onDisconnect = this.onDisconnect.bind(this);
		this.clearTimer = this.clearTimer.bind(this);
	}

	get(userID) {
		const socket = this.clients[userID];

		if (!socket) {
			throw new Error(`No socket found for user: ${userID}`);
		}

		return socket;
	}

	listen()
	{
		this.io.on('connection', this.onConnection.bind(this));

		this.server.listen(this.Server.config.app.serverPort);

		console.log(`Socket is listening on port ${this.Server.config.app.serverPort}`);
	}

	onConnection(socket)
	{
		socket.on('dispatch', (action) => {
			this.onClientDispatch(socket, action);
		});

		socket.on('disconnect', () => {
			this.onDisconnect(socket);
		});
	}

	async logoutOutSession(newSocket, userID) {
		let socket;

		try {
			socket = this.get(userID);
		} catch (err) {
			return;
		}

		await this.onDisconnect(socket, true);

		this.dispatchToSocket(socket, {
			type: CHARACTER_REMOTE_LOGOUT,
			payload: {},
		});
	}

	add(socket) {
		this.clients[socket.user.userID] = socket;
	}

	remove(userID) {
		delete this.clients[userID];
	}

	clearTimer(userID) {
		if (this.timers[userID]) {
			clearTimeout(this.timers[userID]);
			delete this.timers[userID];
			return true;
		}

		return false;
	}

	async onDisconnect(socket, forced = false, accountLogout = false) {
		const user = socket.user ? {...socket.user} : null;

		//If the user is logged in, set a timer for when we remove them from the server.
		if (user) {
			this.Server.log.info('Socket disconnected', user);

			// leave the server channel for server-wide events
			socket.leave('server');

			if (accountLogout) {
				socket.user = null;
			}

			if (forced) {
				return this.emit('disconnect', user);
			}

			//Temp save, then save as timed out
			try {
				if (!this.Server.characterFacade.get(user.userID)) {
					return;
				}

				await this.Server.characterFacade.save(user.userID);
			} catch (err) {
				this.Server.onError(err);
			}

			this.timers[user.userID] = setTimeout(() =>{
				this.emit('disconnect', user);
			}, this.Server.config.server.logoutTimer);
		}
	}

	onClientDispatch(socket, action) {
		//Make sure the actions has an action type and payload.
		if (!action || !action.type) {
			action.type = null;
		}

		if (!action.payload) {
			action.payload = {};
		}

		this.Server.log.info('New action', {type: action.type});
		//Make sure actions have the right composition
		if (!action.type) {
			return;
		}

		//None authenticated dispatches
		if (!socket.user && action.type !== ACCOUNT_AUTHENTICATE) {
			return;
		}

		if ([ACCOUNT_LOGOUT, CHARACTER_LOGOUT].includes(action.type)) {
			this.onDisconnect(socket, false, action.type === ACCOUNT_LOGOUT);
		}
		//Send the dispatch with listeners
		this.emit('dispatch', socket, action);
	}

	dispatchToSocket(socket, action) {
		socket.emit('dispatch', action);
	}

	dispatchToUser(userID, action) {
		if (!this.clients[userID]) {
			return;
		}

		this.clients[userID].emit('dispatch', action);
	}

	dispatchToRoom(roomID, action) {
		if (!roomID) {
			throw new Error('Missing roomID in SocketManager::dispatchToRoom');
		}

		this.io.sockets.in(roomID).emit('dispatch', action);
	}

	dispatchToServer(action) {
		this.io.emit('dispatch', action);
	}

	userJoinRoom(userID, roomID) {
		const socket = this.get(userID);
		socket.join(roomID);
	}

	userLeaveRoom(userID, roomID) {
		const socket = this.get(userID);
		socket.leave(roomID);
	}

}
