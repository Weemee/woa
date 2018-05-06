import {CHARACTER_DESTINATION} from 'libs/constants';

export function changeLocation(destination) {
	return {
		type: CHARACTER_DESTINATION,
		payload: destination,
	};
}
