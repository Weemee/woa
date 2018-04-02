import io from 'socket.io';
import EventEmitter from 'events';

import {
    USER_AUTHENTICATE,
    USER_LOGOUT,
    CHARACTER_LOGOUT,
    CHARACTER_REMOTE_LOGOUT,
} from 'vars/constants';

export default class SocketFacade extends EventEmitter
{
	constructor(Server, server)
	{
		super(Server, server);

        this.clients = {};
		
		this.Server = Server;
		this.server = server;
		this.io = io(server);

        this.timers = {};

		this.onDisconnect = this.onDisconnect.bind(this);
        this.clearTimer = this.clearTimer.bind(this);
	}

    get(user_id) {
        const socket = this.clients[user_id];

        if (!socket) {
            throw new Error(`No socket found for user: ${user_id}`);
        }

        return socket;
    }

	listen()
	{
		this.io.on('connection', this.onConnection.bind(this));
		this.server.listen(this.Server.config.server.port);

		console.log(`Socket is listening on port ${this.Server.config.server.port}`);
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

	async logoutOutSession(newSocket, user_id) {
        let socket;

        try {
            socket = this.get(user_id);
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
        this.clients[socket.user.user_id] = socket;
    }

    remove(user_id) {
        delete this.clients[user_id];
    }

    clearTimer(user_id) {
        if (this.timers[user_id]) {
            clearTimeout(this.timers[user_id]);
            delete this.timers[user_id];
            return true;
        }

        return false;
    }

    async onDisconnect(socket, forced = false, accountLogout = false) {
        const user = socket.user ? {...socket.user} : null;

        // if the user is logged in, set a timer for when we remove them from the server.
        if (user) {
            this.Server.log.info('Socket disconnected', user);

            // leave the server channel for server-wide events
            socket.leave('server');

            /*if (accountLogout) {
                socket.user = null;
            }

            if (forced) {
                return this.emit('disconnect', user);
            }

            // save the character as it is right now,
            // once the timer hits, it will save once more.
            try {
                if (!this.Server.characterManager.get(user.user_id)) {
                    return;
                }

                await this.Server.characterManager.save(user.user_id);
            } catch (err) {
                this.Server.onError(err);
            }*/

            this.timers[user.user_id] = setTimeout(() =>{
                this.emit('disconnect', user);
            }, this.Server.config.server.logout_timer);
        }
    }

    onClientDispatch(socket, action) {
        // make sure the actions has an action type and payload.
        if (!action || !action.type) {
            action.type = null;
        }
        if (!action.payload) {
            action.payload = {};
        }

        this.Server.log.info('New action', {type: action.type});
        // Make sure actions have the right composition
        if (!action.type) {
            return;
        }

        // if the client is not authenticating, but sending dispatches without
        // being authenticated, ignore the request.
        if (!socket.user && action.type !== USER_AUTHENTICATE) {
            console.log("Returned sadface");
            return;
        }

        if ([USER_LOGOUT, CHARACTER_LOGOUT].includes(action.type)) {
            this.onDisconnect(socket, false, action.type === USER_LOGOUT);
        }

        // emit the dispatch, which managers listen for
        this.emit('dispatch', socket, action);
        console.log("Sent stuff");
    }

    dispatchToSocket(socket, action) {
        socket.emit('dispatch', action);
    }

    dispatchToUser(user_id, action) {
        if (!this.clients[user_id]) {
            return;
        }

        this.clients[user_id].emit('dispatch', action);
    }

    dispatchToRoom(roomId, action) {
        if (!roomId) {
            throw new Error('Missing roomID in SocketManager::dispatchToRoom');
        }

        this.io.sockets.in(roomId).emit('dispatch', action);
    }

    dispatchToServer(action) {
        this.io.emit('dispatch', action);
    }

    userJoinRoom(user_id, roomId) {
        const socket = this.get(user_id);
        socket.join(roomId);
    }

    userLeaveRoom(user_id, roomId) {
        const socket = this.get(user_id);
        socket.leave(roomId);
    }

}
