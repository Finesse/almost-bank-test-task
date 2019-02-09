import { combineReducers } from 'redux';
import { ReduxState, Action } from './types';
import initialState from './initialState';

function exchangeRatesReducer(
  state: ReduxState['exchangeRates'] = initialState.exchangeRates,
  action: Action
): ReduxState['exchangeRates'] {
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
        lastUpdateDate: Date.now()
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

export default combineReducers({
  exchangeRates: exchangeRatesReducer
});
