import Promise from 'bluebird';
import child_process from 'child_process';

import SocketFacade from './modules/socket/facade';
import CharacterFacade from './modules/character/facade';
import UserFacade from './modules/account/facade';
import InputFacade from './modules/input/facade';
import ServerMapFacade from './modules/serverMap/facade';
import TimerFacade from './modules/timer/facade';
import ThemeFacade from './modules/theme/facade';

import {newEvent} from './actions';

class Server {

	constructor(server, config, log, autoIni = true) {

		this.config = config;

		if (process.env.NODE_ENV === 'development') {
			Promise.longStackTraces();
		}

		this.log = log;
		this.version = config.server.version;

		this.timers = [];

		this.socketFacade = new SocketFacade(this, server);
		this.userFacade = new UserFacade(this);
		this.characterFacade = new CharacterFacade(this);
		this.inputFacade = new InputFacade(this);
		this.serverMapFacade = new ServerMapFacade(this);
		this.timerFacade = new TimerFacade(this);
		this.themeFacade = new ThemeFacade(this);

		if (autoIni) {
			this.init();
		}
	}

	async init() {
		this.version = this.config.server.serverVersion;
		console.log(this.version);

		await this.inputFacade.init();
		await this.characterFacade.init();
		await this.serverMapFacade.init();
		await this.themeFacade.init();

		this.setupServerTimers();

		this.socketFacade.listen();
	}

	async onTimer(timerName) {
		this.log.info(`Running timer ${timerName}`);

		switch (timerName) {
		case 'autosave':
			// NOTE: if you want to add anything to the auto save, do it here
			return this.characterFacade.saveAll();
		}
	}

	onError(err, account) {
		this.log.error(err);

		if(!account) {
			return;
		}

		if(typeof account === 'string') {
			this.eventToUser(account, 'error', 'Something went wrong account! Please try again in a moment.');
		} else {
			this.eventToSocket(account, 'error', 'Something went wrong socket. Please try again in a moment.');
		}
	}

	setupServerTimers() {
		this.timers = this.config.server.serverTimers.filter((timer) => timer.enabled).map((timer) => {
			return {
				name: timer.name,
				timer: setInterval(this.onTimer.bind(this), timer.frequency, timer.name),
			};
		});
	}

	eventToUser(userID, type, message) {
		this.log.debug('account event', {userID, type, message});
		this.socketFacade.dispatchToUser(userID, newEvent(type, message));
	}

	eventToSocket(socket, type, message) {
		this.log.debug('Socket event', {socket: (socket.account || null), type, message});
		this.socketFacade.dispatchToSocket(socket, newEvent(type, message));
	}

	eventToRoom(room, type, message, ignore) {
		this.log.debug('Room event', {room, type, message, ignore});
		this.socketFacade.dispatchToRoom(room, newEvent(type, message, ignore));
	}

	eventToServer(type, message, ignore) {
		this.log.debug('Server event', {type, message, ignore});
		this.socketFacade.dispatchToRoom('server', newEvent(type, message, ignore));
	}

	shutdown() {
		this.Server.log.info('Received shutdown signal, Running shutdown procedure');
		return this.characterFacade.saveAll();
	}
}

exports.Server = Server;
