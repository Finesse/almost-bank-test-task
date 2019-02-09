import { put } from 'redux-saga/effects';
import { test } from './actions';
import { SagasDependencies } from './types';

export default function* appSaga(dependencies: SagasDependencies) {
  yield put(test());
}
