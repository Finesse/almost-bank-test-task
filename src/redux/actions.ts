import * as Types from './types';
import { ExchangeRatesBase } from '../types';

export function updateExchangeRates(): Types.UpdateExchangeRatesAction {
  return { type: 'UPDATE_EXCHANGE_RATES' };
}

export function updateExchangeRatesSuccess(exchangeRates: ExchangeRatesBase): Types.UpdateExchangeRatesSuccessAction {
  return { type: 'UPDATE_EXCHANGE_RATES_SUCCESS', exchangeRates };
}

export function updateExchangeRatesFail(error: string): Types.UpdateExchangeRatesFailAction {
  return { type: 'UPDATE_EXCHANGE_RATES_FAIL', error };
}
