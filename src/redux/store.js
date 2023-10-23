import { createStore, applyMiddleware } from 'redux';
import { createRouterMiddleware } from '@lagunovsky/redux-react-router';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import rootSaga from './rootSaga';
// import { types as AppTypes } from './app/duck';
import { loginTypes } from './login/types.ts';

import rootReducer from './reducers';

const resetEnhancer = rootReducer => (state, action) => {
  if (action.type === loginTypes.DO_LOGOUT) {
    state = undefined;
  }
  return rootReducer(state, action);
};

const actionsBlacklist = [
  loginTypes.SAVE_LOGGED_USER,
  loginTypes.DO_LOGOUT,
  loginTypes.DO_LOGIN_REQUEST,
  loginTypes.DO_LOGIN_RESPONSE,
];

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = composeWithDevTools({ actionsBlacklist });

const enhancers = composeEnhancers(
  applyMiddleware(thunk, sagaMiddleware, createRouterMiddleware(history))
);

const store = createStore(resetEnhancer(rootReducer(history)), enhancers);

sagaMiddleware.run(rootSaga);

export default store;
