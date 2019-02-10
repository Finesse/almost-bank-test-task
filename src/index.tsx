import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { createAppStore } from './redux';
import { makeOpenExchangeRatesSource } from './services/exchangeRatesSource';
import { openExchangeRatesAppId } from './constants';
import './index.css';
import { App } from './view/containers';

const appStore = createAppStore({
  fetchExchangeRates: makeOpenExchangeRatesSource(openExchangeRatesAppId)
});

ReactDOM.render(
  <Provider store={appStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
