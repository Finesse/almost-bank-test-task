import Big from 'big.js';
import convertCurrency from '../helpers/currencyConverter';
import { ReduxState, Action } from './types';
import initialState from './initialState';

export default function appReducer(state: ReduxState = initialState, action: Action): ReduxState {
  switch (action.type) {
    case 'EXCHANGE': {
      if (state.exchangeRates.data === undefined) {
        return state;
      }

      let { sellCurrency, sellAmount = null, buyCurrency, buyAmount = null } = action;
      if (sellCurrency === buyCurrency) {
        return state;
      }

      if (sellAmount !== null) {
        buyAmount = convertCurrency(state.exchangeRates.data, sellAmount, sellCurrency, buyCurrency);
        if (buyAmount === null) {
          return state;
        }
      } else if (buyAmount !== null) {
        sellAmount = convertCurrency(state.exchangeRates.data, buyAmount, buyCurrency, sellCurrency);
        if (sellAmount === null) {
          return state;
        }
      } else {
        throw new Error('Either sell or buy amount must be set');
      }

      // The available balance is not checked because it is done in the React components and it may be OK to put user in debt
      return {
        ...state,
        balance: {
          ...state.balance,
          [sellCurrency]: Number(Big(state.balance[sellCurrency] || 0).sub(sellAmount).toFixed()),
          [buyCurrency]: Number(Big(state.balance[buyCurrency] || 0).add(buyAmount).toFixed())
        }
      };
    }
    default:
      return {
        ...state,
        exchangeRates: exchangeRatesReducer(state.exchangeRates, action)
      };
  }
}

function exchangeRatesReducer(state: ReduxState['exchangeRates'], action: Action): ReduxState['exchangeRates'] {
  switch (action.type) {
    case 'UPDATE_EXCHANGE_RATES':
      return {
        ...state,
        areUpdating: true,
        updateError: undefined
      };
    case 'UPDATE_EXCHANGE_RATES_SUCCESS':
      return {
        ...state,
        areUpdating: false,
        updateError: undefined,
        data: action.exchangeRates,
        lastUpdateDate: action.date
      };
    case 'UPDATE_EXCHANGE_RATES_FAIL':
      return {
        ...state,
        areUpdating: false,
        updateError: action.error
      };
    default:
      return state;
  }
}
