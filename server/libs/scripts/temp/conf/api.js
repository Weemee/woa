import {dotEnv} from '../config';

export default {
	restURL: dotEnv('API_URL', 'http://localhost'),
	restPort: dotEnv('API_PORT', 8084),
};
