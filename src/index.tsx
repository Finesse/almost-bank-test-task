import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { createAppStore } from './redux';
import { floatRatesComRatesSource } from './services/exchangeRatesSource';
import { App } from './view/containers';

const appStore = createAppStore({
  fetchExchangeRates: floatRatesComRatesSource
});

ReactDOM.render(
  <Provider store={appStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
