import {
	SERVER_EVENT,
	ADMIN_EVENT,
} from 'libs/constants';

export function newEvent(type, message, ignore =[]) {
	return {
		type: SERVER_EVENT,
		payload: {
			type,
			message,
			ignore,
		},
	};
}

export function adminEvent(message) {
	return {
		 type: ADMIN_EVENT,
		 payload: message,
	};
}
