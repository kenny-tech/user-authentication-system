import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { Router, Switch } from 'react-router-dom';
import History from './history';
import Routes from './routes';
import { AUTH_USER } from './actions/types';

import rootReducer from './reducers';

import registerServiceWorker from './serviceWorker';

/*
// UNCOMMENT IT FOR PRODUCTION
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);
*/

/* COMMENT IT OUT FOR PRODUCTION */
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(reduxThunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )  
);
//

const token = localStorage.getItem('token');
// if we have a token, consider the  user to be signed in
if (token) {
    // update application state
    store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={History}>
            <Switch>
                <Routes />
            </Switch>
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
