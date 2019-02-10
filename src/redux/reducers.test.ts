import deepFreeze from 'deep-freeze';
import appReducer from './reducers';
import * as actions from './actions';
import initialState from './initialState';
import { ReduxState } from './types';

describe('reducers', () => {
  it('handles UPDATE_EXCHANGE_RATES', () => {
    // deepFreeze is used to make sure the reducer doesn't mutate the state
    expect(appReducer(deepFreeze(initialState), actions.updateExchangeRates()).exchangeRates)
      .toEqual({
        ...initialState.exchangeRates,
        areUpdating: true,
        updateError: undefined
      });
  });

  it('handles UPDATE_EXCHANGE_RATES_SUCCESS', () => {
    const state: ReduxState = deepFreeze({
      ...initialState,
      exchangeRates: {
        ...initialState.exchangeRates,
        areUpdating: true,
        updateError: 'test error',
        data: {
          baseCurrency: 'USD',
          rates: {
            EUR: 1.2
          }
        },
        lastUpdateDate: 13242
      }
    });

    const newState = appReducer(state, actions.updateExchangeRatesSuccess(deepFreeze({
      baseCurrency: 'EUR',
      rates: {
        USD: 0.64,
        GBP: 1.12
      }
    })));

    expect(newState.exchangeRates.lastUpdateDate).toBeGreaterThan(Date.now() - 10000);
    expect(newState).toEqual({
      ...state,
      exchangeRates: {
        ...state.exchangeRates,
        areUpdating: false,
        updateError: undefined,
        data: {
          baseCurrency: 'EUR',
          rates: {
            USD: 0.64,
            GBP: 1.12
          }
        },
        lastUpdateDate: newState.exchangeRates.lastUpdateDate
      }
    });
  });

  it('handles UPDATE_EXCHANGE_RATES_FAIL', () => {
    const state: ReduxState = deepFreeze({
      ...initialState,
      exchangeRates: {
        ...initialState.exchangeRates,
        areUpdating: true,
        updateError: undefined,
        data: {
          baseCurrency: 'USD',
          rates: {
            EUR: 1.2
          }
        },
        lastUpdateDate: 13242
      }
    });

    expect(appReducer(state, actions.updateExchangeRatesFail('testing')))
      .toEqual({
        ...state,
        exchangeRates: {
          ...state.exchangeRates,
          areUpdating: false,
          updateError: 'testing'
        }
      });
  });

  describe('EXCHANGE action', () => {
    const state: ReduxState = deepFreeze({
      ...initialState,
      exchangeRates: {
        ...initialState.exchangeRates,
        data: {
          baseCurrency: 'EUR',
          rates: {
            USD: 1.2334,
            GBP: 0.8922,
            HKD: 7.34
          }
        }
      },
      balance: {
        USD: 100,
        EUR: 200,
        GBP: 0.1,
        RUB: 1500
      }
    });

    it('handles sell', () => {
      expect(appReducer(state, actions.exchange('USD', 10, 'EUR', undefined)))
        .toEqual({
          ...state,
          balance: {
            ...state.balance,
            USD: 90,
            EUR: 208.11
          }
        });
    });

    it('handles buy', () => {
      expect(appReducer(state, actions.exchange('USD', undefined, 'EUR', 50)))
        .toEqual({
          ...state,
          balance: {
            ...state.balance,
            USD: 38.33,
            EUR: 250
          }
        });
    });

    it('handles same sell and buy currencies', () => {
      expect(appReducer(state, actions.exchange('USD', 1, 'USD', undefined))).toEqual(state);
    });

    it('handles missing currency', () => {
      expect(appReducer(state, actions.exchange('RUB', 500, 'GBP', undefined))).toEqual(state);
    });

    it('handles missing balance', () => {
      expect(appReducer(state, actions.exchange('EUR', 45.13, 'HKD', undefined)))
        .toEqual({
          ...state,
          balance: {
            ...state.balance,
            EUR: 154.87,
            HKD: 331.25
          }
        });
    });

    it('is OK with JavaScript math', () => {
      expect(appReducer(state, actions.exchange('USD', undefined, 'GBP', 0.2))) // Causes a 0.1 + 0.2 case
        .toEqual({
          ...state,
          balance: {
            ...state.balance,
            USD: 99.72,
            GBP: 0.3
          }
        });
    });
  });
});
