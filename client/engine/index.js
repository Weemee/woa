import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';

import createHistory from 'history/createBrowserHistory';
import {Route} from 'react-router';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';

const history = createHistory();
const middleware = routerMiddleware(history);

import reducers from './reducers';
import App from './modules/app';
import sagas from './sagas';
import ErrorBoundary from './errors';

//CSS
import './styles/merged.scss';

const sagaMiddleware = createSagaMiddleware();
let store;

if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	store = createStore(
		reducers,
		composeEnhancers(
			applyMiddleware(sagaMiddleware, middleware)
		)
	);
} else {
	const createStoreWithMiddleware = applyMiddleware(sagaMiddleware, middleware)(createStore);
	store = createStoreWithMiddleware(reducers);
}

sagaMiddleware.run(sagas);

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<ErrorBoundary>
				<App/>
			</ErrorBoundary>
		</ConnectedRouter>
	</Provider>,
document.querySelector('#root')
);
