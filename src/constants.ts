if (!process.env.REACT_APP_OPEN_EXCHANGE_RATES_APP_ID) {
  throw new Error('The REACT_APP_OPEN_EXCHANGE_RATES_APP_ID environment variable is not defined.'
    + ' If you run a test, maybe you should make a .env.test.local file.');
}

export const openExchangeRatesAppId = process.env.REACT_APP_OPEN_EXCHANGE_RATES_APP_ID;
