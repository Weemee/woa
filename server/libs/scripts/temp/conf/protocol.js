import {dotEnv} from '../config';

export default {
	signingSecret: dotEnv('PROTOCOL_SIGNING_SECRET', ''),
};
