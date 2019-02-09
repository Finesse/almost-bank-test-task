import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'
import appReducer from './reducers';
import appSaga from './sagas';
import * as actions from './actions';
import { SagasDependencies } from './types';

function createAppStore(dependencies: SagasDependencies) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(appReducer, composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  ));

  sagaMiddleware.run(appSaga, dependencies);

  return store;
}

export { createAppStore, actions };
