import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import AppReducer from './modules/app/reducer';
import AuthReducer from './modules/authentication/reducer';
import AccountReducer from './modules/account/reducer';
import UtilsReducer from './modules/utils/reducer';

const rootReducer = combineReducers({
	app: AppReducer,
	auth: AuthReducer,
    account: AccountReducer,
	utils: UtilsReducer,
	router: routerReducer,
});

export default rootReducer;
