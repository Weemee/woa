import {dotEnv} from '../config';

export default {
	logoutTimer: dotEnv('SERVER_LOGOUT_TIMER', 5000),
	serverVersion: dotEnv('SERVER_VERSION', '0.0.0'),
	serverTimers: {
		name: 'autosave',
		enabled: dotEnv('SERVER_TIMERS_AUTOSAVE', true),
		frequency: dotEnv('SERVER_TIMERS_FREQUENCY', 5000),
	},
};
