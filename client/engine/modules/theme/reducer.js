import {
	GET_THEME,
	SET_THEME,
	SET_CUSTOM_THEME,
} from './types';

const defaultState = {
	name: 'blue',
};

export default function(state = defaultState, action) {
	switch (action.type) {
		case GET_THEME:
			return {
				defaultState,
				themes,
		};

		case SET_THEME:
			return {
				name: action.payload
		};

		case SET_CUSTOM_THEME:
			return {
				name: action.payload,
		};
	}

	return state;
}
