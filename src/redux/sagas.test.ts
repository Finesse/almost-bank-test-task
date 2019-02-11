import { takeLeading, fork, call, put, delay } from 'redux-saga/effects';
import { exchangeRatesUpdateInterval } from '../constants';
import appSaga, { updateExchangeRatesSaga, autoupdateExchangeRatesSaga } from './sagas';
import { SagasDependencies } from './types';
import * as actions from './actions';
import { ExchangeRatesBase } from '../types';

describe('sagas', () => {
  describe('appSaga', () => {
    it('works', () => {
      const dependencies: any = { foo: 'bar' };
      const gen = appSaga(dependencies);

      expect(gen.next().value)
        .toEqual(takeLeading('UPDATE_EXCHANGE_RATES', updateExchangeRatesSaga, dependencies));

      expect(gen.next().value)
        .toEqual(fork(autoupdateExchangeRatesSaga));
      
      expect(gen.next().done).toEqual(true);
    });
  });

  describe('updateExchangeRatesSaga', () => {
    const mockExchangeRates: ExchangeRatesBase = {
      baseCurrency: 'USD',
      rates: {
        EUR: 1.3,
        GBP: 1.6,
        ARS: 37
      }
    };
    const dependencies: Partial<SagasDependencies> = {
      fetchExchangeRates: async () => mockExchangeRates
    };

    it('handles success', () => {
      const gen = updateExchangeRatesSaga(dependencies as any, actions.updateExchangeRates());
      
      expect(gen.next().value)
        .toEqual(call(dependencies.fetchExchangeRates!));

      expect(gen.next(mockExchangeRates).value)
        .toEqual(call([Date, 'now']));
      
      expect(gen.next(7654321).value)
        .toEqual(put(actions.updateExchangeRatesSuccess(mockExchangeRates, 7654321)));

      expect(gen.next().done).toEqual(true);
    });

    it('handles fail', () => {
      const gen = updateExchangeRatesSaga(dependencies as any, actions.updateExchangeRates());
      
      expect(gen.next().value)
        .toEqual(call(dependencies.fetchExchangeRates!));

      expect(gen.throw!(new Error('test error')).value)
        .toEqual(put(actions.updateExchangeRatesFail('test error')));

      expect(gen.next().done).toEqual(true);
    });
  });

  describe('autoupdateExchangeRatesSaga', () => {
    it('works', () => {
      const gen = autoupdateExchangeRatesSaga();

      for (let i = 0; i < 10; ++i) {
        expect(gen.next().value)
          .toEqual(put(actions.updateExchangeRates()));

        expect(gen.next().value)
          .toEqual(delay(exchangeRatesUpdateInterval));
      }

      // enough
    });
  });
});
