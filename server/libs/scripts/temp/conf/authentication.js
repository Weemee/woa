import {dotEnv} from '../config';

export default {
	providers: [
		{
			id: dotEnv('AUTHENTICATION_LOCAL_ID', 'local'),
			package: dotEnv('AUTHENTICATION_LOCAL_PACKAGE', 'local'),
			enabled: dotEnv('AUTHENTICATION_LOCAL_ENABLED', true),
			activationLink: dotEnv('AUTHENTICATION_LOCAL_ACTIVATION_LINK', false),
		},
	],
};
