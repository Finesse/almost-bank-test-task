import deepFreeze from 'deep-freeze';
import appReducer from './reducers';
import * as actions from './actions';
import initialState from './initialState';
import { ReduxState } from './types';

describe('reducers', () => {
  it('handles UPDATE_EXCHANGE_RATES', () => {
    expect(appReducer(deepFreeze(initialState), actions.updateExchangeRates()).exchangeRates)
      .toEqual({
        ...initialState.exchangeRates,
        areUpdating: true,
        updateError: undefined
      });
  });

  it('handles UPDATE_EXCHANGE_RATES_SUCCESS', () => {
    const state: ReduxState = {
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
    };

    const newState = appReducer(deepFreeze(state), actions.updateExchangeRatesSuccess({
      baseCurrency: 'EUR',
      rates: {
        USD: 0.64,
        GBP: 1.12
      }
    }));

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
    const state: ReduxState = {
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
    };

    expect(appReducer(deepFreeze(state), actions.updateExchangeRatesFail('testing')))
      .toEqual({
        ...state,
        exchangeRates: {
          ...state.exchangeRates,
          areUpdating: false,
          updateError: 'testing'
        }
      });
  });
});
