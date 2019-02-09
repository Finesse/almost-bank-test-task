if (!process.env.REACT_APP_OPEN_EXCHANGE_RATES_APP_ID) {
  throw new Error('The REACT_APP_OPEN_EXCHANGE_RATES_APP_ID environment variable is not defined.'
    + ' If you run a test, maybe you should make a .env.test.local file.');
}

export const openExchangeRatesAppId = process.env.REACT_APP_OPEN_EXCHANGE_RATES_APP_ID;

// In milliseconds
export const exchangeRatesUpdateInterval = Number(process.env.REACT_APP_EXCHANGE_RATES_UPDATE_INTERVAL!);

export const currencies = [
  'USD',
  'EUR',
  'GBP',
  'AUD',
  'CAD',
  'CDF',
  'CNY',
  'CZK',
  'HKD',
  'JPY',
  'LBP',
  'NIO',
  'RON',
  'RUB',
  'SEK',
  'SZL',
  'UAH',
  'UYU',
  'VEF',
  'VUV',
  'XCD',
  'YER'
];

export const currencyAmountPrecision = 2;
