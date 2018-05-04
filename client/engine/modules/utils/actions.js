import {MOUSE_POS} from './types';

export function setMousePos(x, y) {
	return {
		'type': MOUSE_POS,
		'payload': {
			x,
			y,
		},
	};
}
