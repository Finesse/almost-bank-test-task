import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'
import appReducer from './reducers';
import appSaga from './sagas';
import * as actions from './actions';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(appReducer, composeWithDevTools(
  applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(appSaga);

export { store, actions };
