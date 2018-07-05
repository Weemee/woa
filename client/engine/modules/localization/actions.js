import {
	SET_LANGUAGE,
} from './types';

export function setLanguage(lang) {
	return {
		'type': SET_LANGUAGE,
		'payload': lang,
	};
}
