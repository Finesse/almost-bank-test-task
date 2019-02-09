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
  balance: {
    [currency: string]: number;
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

export interface ConvertAction extends Action<'CONVERT'> {
  sellCurrency: string;
  sellAmount?: number; // Either sell or buy amount must be set, but not both
  buyCurrency: string;
  buyAmount?: number;
}

export type Action =
  UpdateExchangeRatesAction | UpdateExchangeRatesSuccessAction | UpdateExchangeRatesFailAction | ConvertAction;
