import { ExchangeRatesBase } from '../types';
import OpenExchangeRates from './OpenExchangeRates';

export type RatesSource = () => Promise<ExchangeRatesBase>;

export function makeOpenExchangeRatesSource(appID: string): RatesSource {
  const client = new OpenExchangeRates(appID);

  return async () => {
    const response = await client.latest();
    return {
      baseCurrency: response.base,
      rates: response.rates,
    };
  };
}
