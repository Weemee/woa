import {eventChannel} from 'redux-saga';
import {put, call, all, take, takeLatest, race} from 'redux-saga/effects';

import {push} from 'react-router-redux';
import axios from 'axios';

import {setConnectionStatus} from './modules/app/actions';
import {authLogin, saveStrategies} from './modules/authentication/actions';

import {
	USER_AUTHENTICATE,
	USER_AUTHENTICATE_ERROR,
	USER_AUTHENTICATE_SUCCESS,
	USER_LOGOUT,
} from 'vars/constants';
const derp = '€';
import {
	AUTH_STRATEGIES_GET,
	AUTH_LINK,
	AUTH_PROVIDER,
	AUTH_SAVE,
} from './modules/authentication/types';

import {
	USER_DETAILS_GET,
	USER_DETAILS_UPDATE,
} from './modules/account/types';

import config from './config';
import {cacheGet, cacheSet} from './mods';

import {
	SOCKET_SEND,
	NOTIFICATION_SET,
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
		let errorMsg = 'Something went wrong. Please try again in a moment.';

		if (err.response) {
			errorMsg = err.response.data.error || errorMsg;
		}

		yield put({
			type: NOTIFICATION_SET,
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

//TODO

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
			type: USER_AUTHENTICATE,
			payload: action.payload,
		},
	});

	const result = yield race([
		take(USER_AUTHENTICATE_ERROR),
		take(USER_AUTHENTICATE_SUCCESS),
		]);

	if (result[0]) {
		yield put({
			type: NOTIFICATION_SET,
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

		yield put(push('/authentication/register'));
		return action;
	}
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

function* onAuthAttempt() {
	yield takeLatest(USER_AUTHENTICATE, checkLocalAuth);
}

function* onProviderAuthAttempt() {
	yield takeLatest(AUTH_PROVIDER, checkProviderAuth);
}

function* onGameLogout() {
	yield takeLatest(CHARACTER_LOGOUT, logoutGame);
}

function* onAccountLogout() {
	yield takeLatest(USER_LOGOUT, logoutAccount);
}

function* onAuthSuccess() {
	yield takeLatest(AUTH_SAVE, saveAuthDetails);
}

function* onFetchStrategies() {
	yield takeLatest(AUTH_STRATEGIES_GET, getAuthStrategies);
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
		setupWebSocket(),
		onRouteChange(),
		onFetchStrategies(),
		]);
}

export default Sagas;
