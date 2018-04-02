import {MOUSE_POS, MOUSE_MOVE} from './types';

export function setMousePos(x, y) {
    return {
        'type': MOUSE_POS,
        'payload': {
        	x,
        	y,
        },
    };
}