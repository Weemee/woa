import {
	THEME_LIST,
	SET_THEME,
} from 'libs/constants';

const defaultState = {
	selected: 'blue',
	list: [],
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
				selected: action.payload,
				list: state.list
		};
	}

	return state;
}
