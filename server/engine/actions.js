import {
	SERVER_EVENT,
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