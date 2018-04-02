import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';

import createHistory from 'history/createBrowserHistory';
import {Route} from 'react-router';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';

const history = createHistory();
const middleware = routerMiddleware(history);

import reducers from './reducers';
import App from './modules/app';
import sagas from './sagas';

//CSS
import './styles/merged.scss';

//@test

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
            <App/>
        </ConnectedRouter>
    </Provider>,
    document.querySelector('#root')
);
