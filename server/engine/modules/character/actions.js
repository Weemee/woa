import {CHARACTER_JOINED_SERVER} from 'libs/constants';

export function joinedServer(character) {
	return {
		type: CHARACTER_JOINED_SERVER,
		payload: character,
	};
}
