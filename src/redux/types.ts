import { Action } from 'redux';
import { RatesSource } from '../services/exchangeRatesSource';
import { ExchangeRatesBase } from '../types';

export interface ReduxState {
  exchangeRates: {
    areUpdating: boolean;
    updateError?: string;
    data?: ExchangeRatesBase;
    lastUpdateDate?: number; // Unix ms
  };
}

export interface SagasDependencies {
  fetchExchangeRates: RatesSource;
}

export type UpdateExchangeRatesAction = Action<'UPDATE_EXCHANGE_RATES'>;

export interface UpdateExchangeRatesSuccessAction extends Action<'UPDATE_EXCHANGE_RATES_SUCCESS'> {
  exchangeRates: ExchangeRatesBase;
}

export interface UpdateExchangeRatesFailAction extends Action<'UPDATE_EXCHANGE_RATES_FAIL'> {
  error: string;
}

export type Action =
  UpdateExchangeRatesAction | UpdateExchangeRatesSuccessAction | UpdateExchangeRatesFailAction;
