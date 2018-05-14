import jwt from 'jsonwebtoken';
import {
	ACCOUNT_AUTHENTICATE_SUCCESS,
	ACCOUNT_LOGOUT,
} from 'libs/constants';
import {ACCOUNT_DETAILS} from './types';

const defaultState = {
	authToken: null,
	loggedIn: false,
};

export default function(state = defaultState, action) {
	switch (action.type) {
		case ACCOUNT_LOGOUT:
		return defaultState;

		case ACCOUNT_DETAILS:
		return {
			...state,
			account: {
				...state.account,
				...action.payload,
			},
		};

		case ACCOUNT_AUTHENTICATE_SUCCESS:
		const decoded = jwt.decode(action.payload.authToken);

		return {
			authToken: action.payload.authToken,
			loggedIn: true,
			account: {
				identities: [],
				...decoded,
			},
		};
	}

	return state;
}
