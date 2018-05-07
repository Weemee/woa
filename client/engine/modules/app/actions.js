import {
	CONNECTION_STATUS,
	SOCKET_CONNECT,
	SOCKET_SEND,
	SET_LOADING,
	CLEAR_LOADING,
} from './types';

export function setConnectionStatus(connected, connectedEvent) {
	return {
		'type': CONNECTION_STATUS,
		'payload': {
			connected,
			connectedEvent,
		},
	};
}

export function socketConnect() {
	return {
		'type': SOCKET_CONNECT,
		'payload': null,
	};
}

export function socketSend(action) {
	return {
		'type': SOCKET_SEND,
		'payload': action,
	};
}

export function setLoading(messageToLoad) {
	return {
		type: SET_LOADING,
		payload: {
			message: messageToLoad,
		},
	};
}

export function clearLoading() {
	return {
		type: CLEAR_LOADING,
		payload: null,
	};
}
