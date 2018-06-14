import {
	SET_LANGUAGE,
} from './types';

import {getMessage} from '../../mods';
import messages from './strings';

const defaultState = {
	lang: 'en-UK',
	messages: {},
};

defaultState.messages = getMessage(messages[defaultState.lang]);

export default function(state = defaultState, action) {
	switch (action.type) {
		case SET_LANGUAGE:
			return {
				...state,
				lang: action.payload,
				messages: getMessage(messages[action.payload]),
			};
	}
	return state;
}