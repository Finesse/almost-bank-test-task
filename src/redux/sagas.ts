import { put } from 'redux-saga/effects';
import { test } from './actions';

export default function* appSaga() {
  yield put(test());
}
