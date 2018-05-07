import {CHARACTER_REMOTE_LOGOUT} from 'libs/constants';

const defaultState = {
	open: false,
};

export default function(state = defaultState, action) {
	switch (action.type) {
		case CHARACTER_REMOTE_LOGOUT:
		return defaultState;
	}

	return state;
}
