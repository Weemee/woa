import {
	ACCOUNT_AUTHENTICATE,
	ACCOUNT_LOGOUT,
} from 'libs/constants';

import {
	AUTH_STRATEGIES_SAVE,
	AUTH_STRATEGIES_GET,
	AUTH_LINK,
	AUTH_SAVE,
	AUTH_SIGNUP,
	AUTH_PROVIDER,
} from './types';

export function saveStrategies(strategies) {
	return {
		type: AUTH_STRATEGIES_SAVE,
		payload: strategies,
	};
}

export function getStrategies() {
	return {
		type: AUTH_STRATEGIES_GET,
		payload: null,
	};
}

export function linkProvider(authToken, providerToken) {
	return {
		type: AUTH_LINK,
		payload: {
			authToken,
			providerToken,
		},
	};
}

export function authLogout() {
	return {
		type: ACCOUNT_LOGOUT,
		payload: {},
	};
}

export function authLogin(jwt) {
	return {
		type: AUTH_SAVE,
		payload: jwt,
	};
}

export function authLocal(username, password) {
	return {
		type: ACCOUNT_AUTHENTICATE,
		payload: {
			username,
			password,
		},
	};
}

export function authProvider(providerToken) {
	return {
		type: AUTH_PROVIDER,
		payload: {
			providerToken,
		},
	};
}

export function authSignUp(username, email, password, passwordConfirm) {
	return {
		type: AUTH_SIGNUP,
		payload: {
			username,
			email,
			password,
			passwordConfirm
		},
	};
}
