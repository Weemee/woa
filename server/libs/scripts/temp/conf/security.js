import {dotEnv} from '../config';

export default {
	passwordSecurity: {
		rounds: dotEnv('SECURITY_PASSWORD_ROUNDS', 10),
		minimumLength: dotEnv('SECURITY_PASSWORD_MINIMUM_LENGTH', 8),
	},
	certificate: {
		cert: dotEnv('SECURITY_CERTIFICATE_CERT', ''),
		key: dotEnv('SECURITY_CERTIFICATE_KEY', ''),
		ca: dotEnv('SECURITY_CERTIFICATE_CA', ''),
  	},
};
