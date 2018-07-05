import {
	GET_DESIGNER,
	SET_DESIGNER,
} from './types';

export function getDesigner(design) {
	return {
		type: GET_DESIGNER,
		payload: design,
	};
}

export function setDesigner(design) {
	return {
		type: SET_DESIGNER,
		payload: design,
	};
}