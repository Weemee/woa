import {dotEnv} from '../config';

export default {
	clientURL: dotEnv('APP_CLIENT_URL', 'http://localhost:8193'),
	serverPort: dotEnv('APP_SERVER_PORT', 8082),
};
