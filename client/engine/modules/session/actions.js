import {
	CHARACTER_LOGOUT,
	ACCOUNT_INPUT,
} from 'vars/constants';

import {socketSend} from '../app/actions';

export function newInput(input) {
	return socketSend({
		type: ACCOUNT_INPUT,
		payload: input,
	});
}

export function gameLogout(input) {
	return {
		type: CHARACTER_LOGOUT,
		payload: null,
	};
}