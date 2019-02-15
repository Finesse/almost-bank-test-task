import { ExchangeRatesBase, RatesSource } from '../types';

interface FloatRatesComResponse {
  [currency: string]: {
    code: string;
    alphaCode: string;
    numericCode: number;
    name: string;
    rate: number; // How much base units the currency costs
    date: string; // E.g. Fri, 15 Feb 2019 12:00:01 GMT
    inverseRate: number;
  };
}

/**
 * Gets exchange rates from the FloatRates.com website
 */
export const floatRatesComRatesSource: RatesSource = async () => {
  const response = await fetch('https://www.floatrates.com/daily/usd.json');
  if (response.status < 200 || response.status >= 300) {
    throw new Error(response.body && response.body.toString() || 'Unknown error in a FloatRates.com client');
  }

  const responseData: FloatRatesComResponse = await response.json();
  const rates: ExchangeRatesBase['rates'] = {};

  for (const { code, rate } of Object.values(responseData)) {
    rates[code] = rate;
  }

  return { baseCurrency: 'USD', rates };
};
