import {
	THEME_LIST,
	SET_THEME,
} from 'libs/constants';

import {
	SET_DESIGNER,
	GET_DESIGNER,
} from './types';

const defaultState = {
	selected: {
		name: 'blue',
	},
	list: [],
	designer: [],
};

export default function(state = defaultState, action) {
	switch (action.type) {
		case THEME_LIST:
			return {
				...state,
				list: action.payload,
		};

		case SET_THEME:
			return {
				...state,
				selected: action.payload,
				designer: action.payload,
		};

		case SET_DESIGNER:
			return {
				...state,
				designer: action.payload,
		};

		case GET_DESIGNER:
			return {
				designer: state.designer,
		};
	}

	return state;
}
