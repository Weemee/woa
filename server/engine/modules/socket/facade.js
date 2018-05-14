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
	constructor(Server, session)
	{
		super(Server, session);

		this.Server = Server;

		this.clients = {};

		this.session = session;

		this.io = io(session);

		this.timers = {};

		this.onDisconnect = this.onDisconnect.bind(this);
		this.clearTimer = this.clearTimer.bind(this);
	}

	get(userID) {
		const socket = this.clients[userID];

		if (!socket) {
			throw new Error(`No socket found for account: ${userID}`);
		}

		return socket;
	}

	listen()
	{
		this.io.on('connection', this.onConnection.bind(this));

		this.session.listen(this.Server.config.app.serverPort);

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
		console.log('Socket::logOutSession');


		try {
			socket = this.get(userID);
		} catch (err) {
			return;
		}

		console.log('Socket::logOutSession, disconnecting...');
		await this.onDisconnect(socket, true);

		this.dispatchToSocket(socket, {
			type: CHARACTER_REMOTE_LOGOUT,
			payload: {},
		});
	}

	add(socket) {
		console.log('Socket::add');
		this.clients[socket.account.userID] = socket;
	}

	remove(userID) {
		console.log('Socket::remove');
		delete this.clients[userID];
	}

	clearTimer(userID) {
		console.log('Socket::clearTimer, clearing timer...' + userID);
		if (this.timers[userID]) {
			clearTimeout(this.timers[userID]);
			delete this.timers[userID];
			console.log('Socket::clearTimer, timer cleared!');
			return true;
		}
		console.log('Socket::clearTimer, no timer to clear.');
		return false;
	}

	async onDisconnect(socket, forced = false, accountLogout = false) {
		const account = socket.account ? {...socket.account} : null;
		console.log('Socket::onDisconnect\n');

		console.log(socket.account);

		//If the account is logged in, set a timer for when we remove them from the server.
		if (account) {
			// leave the server channel for server-wide events
			socket.leave('server');

			if (accountLogout) {
				console.log('Socket::onDisconnect, accountLogout!');
				socket.account = null;
			}

			if (forced) {
				console.log('Socket::onDisconnect, forced!');
				return this.emit('disconnect', account);
			}


			console.log('Socket::onDisconnect, no forced!\n');
			//Temp save, then save as timed out
			try {
				if (!this.Server.characterFacade.get(account.userID)) {
					console.log('Socket::onDisconnect, no character with: ' + account.userID);
					return;
				}

				await this.Server.characterFacade.save(account.userID);
			} catch (err) {
				this.Server.onError(err);
			}

			console.log('Socket::onDisconnect, start timer! ' + account.userID);
			this.timers[account.userID] = setTimeout(() =>{
				this.emit('disconnect', account);
			}, this.Server.config.server.logoutTimer);
			console.log('Socket::onDisconnect, timer: ' + this.timers[account.userID]);
		}
	}

	onClientDispatch(socket, action) {
		//Make sure the actions has an action type and payload.
		console.log('Socket::onClientDispatch');
		if (!action || !action.type) {
			console.log('Socket::onClientDispatch, no action or action.type!');
			action.type = null;
		}

		if (!action.payload) {
			console.log('Socket::onClientDispatch, no payload!');
			action.payload = {};
		}

		this.Server.log.info('New action', {type: action.type});
		//Make sure actions have the right composition
		if (!action.type) {
			console.log('Socket::onClientDispatch, wrong action.type!');
			return;
		}

		//None authenticated dispatches
		if (!socket.account && action.type !== ACCOUNT_AUTHENTICATE) {
			console.log('Socket::onClientDispatch, no auth, dispatching???');
			return;
		}

		if ([ACCOUNT_LOGOUT, CHARACTER_LOGOUT].includes(action.type)) {
			console.log('Socket::onClientDispatch, ACCOUNT_LOGOUT, CHARACTER_LOGOUT: ' + action.type);
			this.onDisconnect(socket, false, action.type === ACCOUNT_LOGOUT);
		}
		//Send the dispatch with listeners
		this.emit('dispatch', socket, action);
	}

	dispatchToSocket(socket, action) {
		console.log('Socket::dispatchToSocket, socket: ' + socket + ' & action: ' + action);
		socket.emit('dispatch', action);
	}

	dispatchToUser(userID, action) {
		console.log('Socket::dispatchToUser, userID: ' + userID + ' & action: ' + action);
		if (!this.clients[userID]) {
			console.log('Socket::dispatchToUser, no account...');
			return;
		}

		this.clients[userID].emit('dispatch', action);
	}

	dispatchToRoom(roomID, action) {
		console.log('Socket::dispatchToRoom, roomID: ' + roomID + ' & action: ' + action);
		if (!roomID) {
			throw new Error('Missing roomID in SocketManager::dispatchToRoom');
		}

		this.io.sockets.in(roomID).emit('dispatch', action);
	}

	dispatchToServer(action) {
		console.log('Socket::dispatchToServer, action: ' + action);
		this.io.emit('dispatch', action);
	}

	userJoinRoom(userID, roomID) {
		console.log('Socket::userJoinRoom, userID: ' + userID + ' & roomID: ' + roomID);
		const socket = this.get(userID);
		socket.join(roomID);
	}

	userLeaveRoom(userID, roomID) {
		console.log('Socket::userLeaveRoom, userID: ' + userID + ' & roomID: ' + roomID);
		const socket = this.get(userID);
		socket.leave(roomID);
	}

}
