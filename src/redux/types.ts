import { Action } from 'redux';
import { RatesSource } from '../services/exchangeRatesSource';

export interface ReduxState {

}

export interface SagasDependencies {
  fetchExchangeRates: RatesSource;
}

export type TestAction = Action<'TEST'>;

export type Action = TestAction;
