import {
	SERVER_DETAILS,
	CHARACTER_JOINED_SERVER,
	CHARACTER_LEFT_SERVER,
	CHARACTER_LOGOUT,
	CHARACTER_REMOTE_LOGOUT,
} from 'libs/constants';

const defaultState = {
	description: '',
	players: [],
};

export default function(state = defaultState, action) {
	let players;

	switch(action.type) {
		case SERVER_DETAILS:
			return {
				...action.payload,
			};

		case CHARACTER_JOINED_SERVER:
			players = [...state.players];

			if (players.find((account) => account.accountID === action.payload.accountID)) {
				return state;
			}

			players.push(action.payload);
			return {
				...state,
				players,
			};

		case CHARACTER_LEFT_SERVER:
			players = [...state.players];
			players = players.filter((account) => account.accountID !== action.payload);
			return {
				...state,
				players,
			};

		case CHARACTER_LOGOUT:
			return defaultState;

		case CHARACTER_REMOTE_LOGOUT:
	}

	return state;
}
