import {
	CHARACTER_ONLINE,
	CHARACTER_OFFLINE,
	CHARACTER_LOGIN,
	CHARACTER_LOGOUT,
	CHARACTER_REMOTE_LOGOUT,
	ACCOUNT_AUTHENTICATE_SUCCESS,
} from 'libs/constants';

const defualtState = {
	players: [],
};

export default function(state = defualtState, action) {
	let players;

	switch(action.type) {
		case CHARACTER_LOGIN:

		case ACCOUNT_AUTHENTICATE_SUCCESS:
			return {
				...state,
				...action.payload.gameData,
			};

		case CHARACTER_ONLINE:
			players = state.players.filter((user) => user.userID !== action.payload.userID);
			players.push(action.payload);

			return {
				...state,
				players,
			};

		case CHARACTER_OFFLINE:
			players = state.players.filter((user) => user.userID !== action.payload.userID);

			return {
				...state,
				players,
			};

		case CHARACTER_REMOTE_LOGOUT:
		case CHARACTER_LOGOUT:
			return defualtState;
	}

	return state;
}
