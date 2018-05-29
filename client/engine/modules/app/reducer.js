import {
	CONNECTION_STATUS,
	CONNECTION_SOCKET,
	NOTIFICATION_CLEAR,
	SET_LOADING,
} from './types';

import {
	ACCOUNT_LOGOUT,
	SET_NOTES,
	CLEAR_LOADING,
} from 'libs/constants';

const defaultState = {
	connected: false,
	connectedEvent: false,
	socket: null,
	notes: null,
	loading: null,
};

export default function(state = defaultState, action) {
	switch (action.type) {
		case CONNECTION_STATUS:
			return {
				...state,
				...action.payload,
			};

		case CONNECTION_SOCKET:
			return {
				...state,
				socket: action.payload,
			};

		case SET_NOTES:
			return {
				...state,
				notes: action.payload,
				loading: null,
			};

		case NOTIFICATION_CLEAR:
			return {
				...state,
				notes: null,
			};

		case SET_LOADING:
			return {
				...state,
				loading: action.payload,
			};
		
		case CLEAR_LOADING:
			return {
				...state,
				loading: null,
			};
		case ACCOUNT_LOGOUT:
	}

	return state;
}
