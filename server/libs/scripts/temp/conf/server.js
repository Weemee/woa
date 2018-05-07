import {dotEnv} from '../config';

export default {
	logoutTimer: dotEnv('SERVER_LOGOUT_TIMER', 10000),
	serverVersion: dotEnv('SERVER_VERSION', '0.0.72'),
	serverTimers: {
		name: 'autosave',
		enabled: dotEnv('SERVER_TIMERS_AUTOSAVE', true),
		frequency: dotEnv('SERVER_TIMERS_FREQUENCY', 10000),
	},
};
