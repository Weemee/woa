import {CHARACTER_DESTINATION} from 'vars/constants';

export function changeLocation(destination) {
	return {
		type: CHARACTER_DESTINATION,
		payload: destination,
	};
}