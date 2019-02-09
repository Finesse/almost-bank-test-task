import convertCurrency from './currencyConverter';
import { ExchangeRatesBase } from '../types';

describe('currencyConverter', () => {
  const exchangeRates: ExchangeRatesBase = {
    baseCurrency: 'USD',
    rates: {
      AED: 3.673181,
      AFN: 75.55,
      ALL: 109.5,
      AMD: 487.236715,
      ANG: 1.795605,
      AOA: 313.1475,
      ARS: 37.809833,
      AUD: 1.410812,
      AWG: 1.799996,
      AZN: 1.7025,
      BAM: 1.725386,
      BBD: 2,
      BDT: 83.867229,
      BGN: 1.725643,
      BHD: 0.377156,
      BIF: 1798.407722,
      USD: 1,
      NUL: 0
    }
  };

  it('converts in ordirary cases', () => {
    expect(convertCurrency(exchangeRates, 10, 'USD', 'AWG')).toEqual(18);
    expect(convertCurrency(exchangeRates, 100, 'USD', 'AMD')).toEqual(48723.67);
    expect(convertCurrency(exchangeRates, 14.84, 'BAM', 'AOA')).toEqual(2693.37);
    expect(convertCurrency(exchangeRates, -0.78, 'BHD', 'USD')).toEqual(-2.07);
    expect(convertCurrency(exchangeRates, 15.6, 'USD', 'USD')).toEqual(15.6);
    expect(convertCurrency(exchangeRates, 0, 'AUD', 'USD')).toEqual(0);
  });

  it('returns null when no route between currencies', () => {
    expect(convertCurrency(exchangeRates, 5, 'USD', 'FOF')).toBeNull();
    expect(convertCurrency(exchangeRates, 6, 'GOO', 'GLE')).toBeNull();
    expect(convertCurrency(exchangeRates, 7, 'ABC', 'AWG')).toBeNull();
  });

  it('handles zero rates', () => {
    expect(convertCurrency(exchangeRates, 15, 'BIF', 'NUL')).toEqual(0);
    expect(convertCurrency(exchangeRates, 15, 'NUL', 'BIF')).toBeNull();
  });
});
