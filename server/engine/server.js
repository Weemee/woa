import Promise from 'bluebird';
import child_process from 'child_process';

import SocketFacade from './modules/socket/facade';
import UserFacade from './modules/user/facade';

class Server {
	constructor(server, config, log, autoIni = true){
		this.config = config;

		if(process.env.NODE_ENV === 'development'){
			Promise.longStackTraces();
		}

		this.log = log;
		this.version = '';

        this.timers = [];

		this.socketFacade = new SocketFacade(this, server);
        this.userFacade = new UserFacade(this);

		if(autoIni){
			this.init();
		}
	}

	async init(){
		this.version = child_process.execSync('git rev-parse --short=7 HEAD').toString().trim();

        this.setupServerTimers();

		this.socketFacade.listen();
	}

    async onTimer(timerName) {
        this.log.debug(`Running timer ${timerName}`);

        switch (timerName) {
            case 'autosave':
                // NOTE: if you want to add anything to the auto save, do it here
                //return this.characterManager.saveAll();
                return;
       }
    }

	onError(err, user) {
        this.log.error(err);

        if (!user) {
            return;
        }

        if (typeof user === 'string') {
            this.eventToUser(user, 'error', 'Something went wrong. Please try again in a moment.');
        } else {
            this.eventToSocket(user, 'error', 'Something went wrong. Please try again in a moment.');
        }
    }

    setupServerTimers() {
        this.timers = this.config.server.timers.filter((timer) => timer.enabled).map((timer) => {
            return {
                name: timer.name,
                timer: setInterval(this.onTimer.bind(this), timer.interval, timer.name),
            };
        });
    }

    eventToUser(user_id, type, message) {
        this.log.debug('User Event', {user_id, type, message});
        this.socketManager.dispatchToUser(user_id, newEvent(type, message));
    }

    eventToSocket(socket, type, message) {
        this.log.debug('Socket Event', {socket: (socket.user || null), type, message});
        this.socketManager.dispatchToSocket(socket, newEvent(type, message));
    }

    shutdown() {
        this.Server.log.info('Received shutdown signal, Running shutdown procedure');
    }
}

exports.Server = Server;