import {dotEnv} from '../config';

export default {
	passwordSecurity: {
		rounds: dotEnv('SECURITY_PASSWORD_ROUNDS', 10),
		minimumLength: dotEnv('SECURITY_PASSWORD_MINIMUM_LENGTH', 8),
	},
};
