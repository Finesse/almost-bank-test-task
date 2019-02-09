import { takeLeading, call, put, fork, delay } from 'redux-saga/effects';
import * as actions from './actions';
import { SagasDependencies, UpdateExchangeRatesAction } from './types';
import { ExchangeRatesBase } from '../types';
import { exchangeRatesUpdateInterval } from '../constants';

const updateExchangeRatesType: UpdateExchangeRatesAction['type'] = 'UPDATE_EXCHANGE_RATES';

export default function* appSaga(dependencies: SagasDependencies) {
  yield takeLeading(updateExchangeRatesType, updateExchangeRatesSaga, dependencies);
  yield fork(autoupdateExchangeRatesSaga);
}

export function* updateExchangeRatesSaga({ fetchExchangeRates }: SagasDependencies, _: UpdateExchangeRatesAction) {
  try {
    const rates: ExchangeRatesBase = yield call(fetchExchangeRates);
    yield put(actions.updateExchangeRatesSuccess(rates));
  } catch (error) {
    yield put(actions.updateExchangeRatesFail(error.message));
  }
}

export function* autoupdateExchangeRatesSaga() {
  while (true) {
    yield put(actions.updateExchangeRates());
    yield delay(exchangeRatesUpdateInterval);
  }
}
