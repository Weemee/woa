import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import AppReducer from './modules/app/reducer';
import AuthReducer from './modules/authentication/reducer';
import AccountReducer from './modules/account/reducer';
import CharacterReducer from './modules/session/character/reducer';
import SessionReducer from './modules/session/reducer';
import UtilsReducer from './modules/utils/reducer';
import ThemeReducer from './modules/theme/reducer';

const rootReducer = combineReducers({
	app: AppReducer,
	auth: AuthReducer,
	account: AccountReducer,
	character: CharacterReducer,
	session: SessionReducer,
	utils: UtilsReducer,
	theme: ThemeReducer,
	router: routerReducer,
});

export default rootReducer;
