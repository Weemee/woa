import {GET_THEME, SET_THEME, SET_CUSTOM_THEME} from './types';

export function getTheme() {
	return {
		'type': GET_THEME,
		'payload': null,
	};
}

export function setTheme(name) {
	return {
		'type': SET_THEME,
		'payload': name,
	};
}

export function setCustomTheme(name) {
	return {
		'type': SET_CUSTOM_THEME,
		'payload': name,
	};
}
