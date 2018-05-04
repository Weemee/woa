import {
	MOUSE_POS,
} from './types';

const defaultState = {
	mousePos: {
		x: null,
		y: null,
	},
};

export default function(state = defaultState, action) {
	switch (action.type) {
		case MOUSE_POS:
		return {
			mousePos: action.payload,
		};
	}

	return state;
}
