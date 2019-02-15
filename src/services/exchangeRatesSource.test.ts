import { floatRatesComRatesSource } from './exchangeRatesSource';

describe('exchangeRatesSource', () => {
  describe('Floatrates.com', () => {
    it('receives exchange rates', async () => {
      const rates = await floatRatesComRatesSource();
      expect(rates.baseCurrency).toEqual('USD');
      expect(rates.rates).toHaveProperty('EUR');
      expect(rates.rates).toHaveProperty('GBP');
      for (const rate of Object.values(rates.rates)) {
        expect(typeof rate).toBe('number');
        expect(rate).not.toBeNaN();
      }
    });
  });
});
