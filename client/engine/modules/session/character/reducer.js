import {
	CHARACTER_LOGIN,
	CHARACTER_LOGOUT,
	CHARACTER_LIST,
	CHARACTER_UPDATE,
	CHARACTER_CREATE_SUCCESS,
} from 'vars/constants';

const defaultState = {
	selected: null,
	list: null,
};

export default function(state = defaultState, action) {
	switch (action.type) {
		case CHARACTER_LOGOUT:
			return defaultState;

		case CHARACTER_LIST:
			return {
				...state,
				list: action.payload,
			};
		case CHARACTER_LOGIN:
			return {
				...state,
				selected: action.payload.character,
			};
		case CHARACTER_CREATE_SUCCESS:
			return {
				...state,
				list: [
					...state.list,
					action.payload.character,
				],
			};
		case CHARACTER_UPDATE:
			return {
				...state,
				selected: {
					...state.selected,
					...action.payload,
				}
			};
	}

	return state;
}