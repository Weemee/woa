import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import AppReducer from './modules/app/reducer';
import AuthReducer from './modules/authentication/reducer';
import AccountReducer from './modules/account/reducer';
import CharacterReducer from './modules/session/character/reducer';
import SessionReducer from './modules/session/reducer';
import ServerReducer from './modules/session/server/reducer';
import UtilsReducer from './modules/utils/reducer';
import ThemeReducer from './modules/theme/reducer';
import PlayerReducer from './modules/session/players/reducer';

const rootReducer = combineReducers({
	app: AppReducer,
	auth: AuthReducer,
	account: AccountReducer,
	character: CharacterReducer,
	playerUI: PlayerReducer,
	session: SessionReducer,
	server: ServerReducer,
	utils: UtilsReducer,
	theme: ThemeReducer,
	router: routerReducer,
});

export default rootReducer;
