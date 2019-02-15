import { Action } from 'redux';
import { ExchangeRatesBase, BalanceDictionary, RatesSource } from '../types';

export interface ReduxState {
  exchangeRates: {
    areUpdating: boolean;
    updateError?: string;
    data?: ExchangeRatesBase;
    lastUpdateDate?: number; // Last successful update; unix ms
  };
  balance: BalanceDictionary;
}

export interface SagasDependencies {
  fetchExchangeRates: RatesSource;
}

export type UpdateExchangeRatesAction = Action<'UPDATE_EXCHANGE_RATES'>;

export interface UpdateExchangeRatesSuccessAction extends Action<'UPDATE_EXCHANGE_RATES_SUCCESS'> {
  exchangeRates: ExchangeRatesBase;
  date: number; // When the update was performed; unix ms
}

export interface UpdateExchangeRatesFailAction extends Action<'UPDATE_EXCHANGE_RATES_FAIL'> {
  error: string;
}

export interface ExchangeAction extends Action<'EXCHANGE'> {
  sellCurrency: string;
  sellAmount?: number; // Either sell or buy amount must be set, but not both
  buyCurrency: string;
  buyAmount?: number;
}

export type Action =
  UpdateExchangeRatesAction | UpdateExchangeRatesSuccessAction | UpdateExchangeRatesFailAction | ExchangeAction;
