import { makeOpenExchangeRatesSource } from './exchangeRatesSource';
import { openExchangeRatesAppId } from '../constants';

describe('exchangeRatesSource', () => {
  describe('Open Exchange Rates', () => {
    it('receives exchange rates', async () => {
      const fetchRates = makeOpenExchangeRatesSource(openExchangeRatesAppId!);
      const rates = await fetchRates();
      expect(rates.baseCurrency).toBeTruthy();
      expect(rates.rates).toHaveProperty('USD');
      expect(rates.rates).toHaveProperty('EUR');
      expect(rates.rates).toHaveProperty('GBP');
      for (const rate of Object.values(rates.rates)) {
        expect(typeof rate).toBe('number');
        expect(rate).not.toBeNaN();
      }
    });

    it('handles wrong app ID', async done => {
      const fetchRates = makeOpenExchangeRatesSource(`wrong-key-${Math.random()}`);

      try {
        await fetchRates();
        done.fail(new Error('No exception was thrown'));
      } catch (error) {
        expect(error.message).toMatch(/Invalid App ID provided/i);
      }

      done();
    });
  });
});
