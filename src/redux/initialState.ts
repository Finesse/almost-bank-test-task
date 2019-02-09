import { ReduxState } from './types';
import { currencies, currencyAmountPrecision } from '../constants';

const precisionFactor = 10 ** currencyAmountPrecision;
const balance: ReduxState['balance'] = {};

// Give some money to new users
for (const currency of currencies) {
  const value = 100 + 9900 * Math.random();
  balance[currency] = Math.round(value * precisionFactor) / precisionFactor;
}

const initialState: ReduxState = {
  exchangeRates: {
    areUpdating: false
  },
  balance
};

export default initialState;
