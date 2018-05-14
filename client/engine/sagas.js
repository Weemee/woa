import {eventChannel} from 'redux-saga';
import {put, call, all, take, takeLatest, race} from 'redux-saga/effects';

import {push} from 'react-router-redux';
import axios from 'axios';

import {saveAccountDetails} from './modules/account/actions';
import {setConnectionStatus} from './modules/app/actions';
import {authLogin, saveStrategies} from './modules/authentication/actions';

import {
	ACCOUNT_AUTHENTICATE,
	ACCOUNT_AUTHENTICATE_ERROR,
	ACCOUNT_AUTHENTICATE_SUCCESS,
	ACCOUNT_LOGOUT,
	CHARACTER_LOGOUT,
	SET_NOTES,
} from 'libs/constants';

import {
	AUTH_STRATEGIES_GET,
	AUTH_LINK,
	AUTH_PROVIDER,
	AUTH_SAVE,
	AUTH_SIGNUP,
} from './modules/authentication/types';

import {
	ACCOUNT_DETAILS_GET,
	ACCOUNT_DETAILS_UPDATE,
	ACCOUNT_DETAILS_DELETE,
} from './modules/account/types';

import config from './config';
import {cacheGet, cacheSet} from './mods';

import {
	SOCKET_SEND,
	NOTIFICATION_CLEAR,
} from './modules/app/types';

function* doAPICall(endpoint, data, method = 'get', additionalHeaders = null) {
	try {
		yield put({
			type: NOTIFICATION_CLEAR,
			payload: null,
		});

		const request = axios.create({
			baseURL: `${config.api.host}/api/`,
			timeout: 10000,
			headers: additionalHeaders,
		});

		return yield call(request[method], `${endpoint}`, data);
	} catch (err) {
		let errorMsg = 'Something went wrong! Please try again in a moment.' + err;

		if (err.response) {
			errorMsg = err.response.data.error || errorMsg;
		}

		yield put({
			type: SET_NOTES,
			payload: {
				message: errorMsg,
				type: 'error',
			},
		});
	}
}

function* setupWebSocket() {
	while (true) {
		yield take('SOCKET_CONNECT');
		const socket = io(config.socket.host, {
			reconnect: true,
		});
		const socketChannel = yield call(watchMessages, socket);

		const {cancel} = yield race({
			task: [call(externalListener, socketChannel), call(internalListener, socket)],
			cancel: take('STOP_WEBSOCKET'),
		});

		if (cancel) {
			socketChannel.close();
		}
	}
}

function watchMessages(socket) {
	return eventChannel((emit) => {
		socket
		.on('connect', () => {
			emit(setConnectionStatus(true, 'Connected'));
		})
		.on('reconnect', () => {
			emit(setConnectionStatus(true, 'Reconnected'));
		})
		.on('connect_timeout', () => {
			emit(setConnectionStatus(false, 'Connection Timed Out - Reconnecting'));
		})
		.on('disconnect', () => {
			emit(setConnectionStatus(false, 'Connection Closed - Reconnecting'));
		})
		.on('dispatch', (action) => {
			emit(action);
		});

		return () => {
			socket.close();
		};
	});
}

function* internalListener(socket) {
	while (true) {
		const action = yield take(SOCKET_SEND);
		socket.emit('dispatch', action.payload);
	}
}

function* externalListener(channel) {
	while (true) {
		let action = yield take(channel);

		yield put(action);
	}
}

function* saveAuthDetails(action) {
	yield put({
		type: SOCKET_SEND,
		payload: {
			type: ACCOUNT_AUTHENTICATE,
			payload: action.payload,
		},
	});

	const result = yield race([
		take(ACCOUNT_AUTHENTICATE_ERROR),
		take(ACCOUNT_AUTHENTICATE_SUCCESS),
	]);

	if (result[0]) {
		yield put({
			type: SET_NOTES,
			payload: {
				message: result[0].payload,
				type: 'error',
			},
		});
		yield logoutAccount();
		return result[0];
	}

	localStorage.setItem('authToken', action.payload);

	yield put.resolve({
		...result[1],
		payload: {
			...result[1].payload,
			authToken: action.payload,
		},
	});
	yield put(push('/account'));
}

function* logoutAccount(action = null) {
	localStorage.removeItem('authToken');

	if (action) {
		yield put({
			type: SOCKET_SEND,
			payload: action,
		});

		yield put(push('/authentication/logout'));
		return action;
	}
}

function* logoutSession(action) {
	yield put({
		type: SOCKET_SEND,
		payload: action,
	});
	return action;
}

function* checkLocalAuth(action) {
	const data = {
		username: action.payload.username,
		password: action.payload.password,
		method: 'local',
	};

	const response = yield call(doAPICall, 'authentication', data, 'post');

	if (!response) {
		return;
	}

	yield put(authLogin(response.data.authToken));
}

function* authSignUp(action) {
	const data = {
		username: action.payload.username,
		email: action.payload.email,
		password: action.payload.password,
		passwordConfirm: action.payload.passwordConfirm,
		method: 'local',
	};

	const response = yield call(doAPICall, 'account', data, 'post');

	if(!response) {
		return;
	}

	yield put({
		type: SET_NOTES,
		payload: {
			message: response.data.message,
			type: 'success',
		},
	});
}

function* getAuthStrategies(action) {
	let authList = cacheGet('strategies');

	if (!authList) {
		const response = yield call(doAPICall, 'authentication', {});

		if (!response) {
			return;
		}

		authList = response.data.authlist;
		cacheSet('strategies', authList);
	}

	yield put(saveStrategies(authList));
}

function* getAccountDetials(action) {
	const response = yield call(doAPICall, `account/${action.payload.userID}`, null, 'get', {
		Authorization: `Bearer ${action.payload.authToken}`,
	});

	if(!response) {
		return;
	}

	yield put(saveAccountDetails(response.data.account));
}

function* onAuthAttempt() {
	yield takeLatest(ACCOUNT_AUTHENTICATE, checkLocalAuth);
}

function* onProviderAuthAttempt() {
	yield takeLatest(AUTH_PROVIDER, checkProviderAuth);
}

function* onSessionLogout() {
	yield takeLatest(CHARACTER_LOGOUT, logoutSession);
}

function* onAccountLogout() {
	yield takeLatest(ACCOUNT_LOGOUT, logoutAccount);
}

function* onAuthSuccess() {
	yield takeLatest(AUTH_SAVE, saveAuthDetails);
}

function* onSignUpAttempt() {
	yield takeLatest(AUTH_SIGNUP, authSignUp);
}

function* onFetchStrategies() {
	yield takeLatest(AUTH_STRATEGIES_GET, getAuthStrategies);
}

function* onFetchAccountDetials() {
	yield takeLatest(ACCOUNT_DETAILS_GET, getAccountDetials);
}

function* routeChanged() {
	yield put({
		type: NOTIFICATION_CLEAR,
		payload: null,
	});
}

function* onRouteChange() {
	yield takeLatest('@@router/LOCATION_CHANGE', routeChanged);
}

function* Sagas() {
	yield all([
		onAuthSuccess(),
		onAccountLogout(),
		onAuthAttempt(),
		onSignUpAttempt(),
		onSessionLogout(),
		setupWebSocket(),
		onRouteChange(),
		onFetchStrategies(),
		onFetchAccountDetials(),
	]);
}

export default Sagas;
