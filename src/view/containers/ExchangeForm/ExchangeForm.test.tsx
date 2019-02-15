import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { ReduxState } from '../../../redux/types';
import initialState from '../../../redux/initialState';
import ExchangeFormContainer from './ExchangeForm';
import * as actions from '../../../redux/actions';

describe('<ExchangeFormContainer />', () => {
  const mockState: ReduxState = {
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
      HKD: 543.87
    }
  };

  it('displays loading state', () => {
    const state = {
      ...mockState,
      exchangeRates: {
        ...mockState.exchangeRates,
        areUpdating: true,
        updateError: undefined,
        data: undefined
      }
    };
    // Can't use `shallow` because of multiple bugs:
    // https://github.com/reactjs/rfcs/issues/71
    // https://github.com/airbnb/enzyme/issues/1647 
    const wrapper = mount(
      <Provider store={createMockStore(state)}>
        <ExchangeFormContainer className="foo" />
      </Provider>
    );
    
    const container = wrapper.childAt(0).childAt(0);
    expect(container.name()).toEqual('ExchangeFormContainer');
    expect(container.children()).toHaveLength(1);

    const form = container.childAt(0);
    expect(form.name()).toEqual('ExchangeForm');
    expect(form.prop('stage')).toEqual('loading');
    expect(form.prop('className')).toEqual('foo');
  });

  it('displays error state', () => {
    const state = {
      ...mockState,
      exchangeRates: {
        ...mockState.exchangeRates,
        areUpdating: false,
        updateError: 'no key',
        data: undefined
      }
    };
    const wrapper = mount(
      <Provider store={createMockStore(state)}>
        <ExchangeFormContainer className="foo" />
      </Provider>
    );
    const form = wrapper.childAt(0).childAt(0).childAt(0);
    expect(form.name()).toEqual('ExchangeForm');
    expect(form.prop('stage')).toEqual('error');
    expect(form.prop('error')).toEqual('no key');
    expect(form.prop('className')).toEqual('foo');
  });

  it('renders the balance', () => {
    const wrapper = mount(
      <Provider store={createMockStore(mockState)}>
        <ExchangeFormContainer className="bar" />
      </Provider>
    );
    
    const container = wrapper.childAt(0).childAt(0).childAt(0);
    expect(container.name()).toEqual('ExchangeFormLoadedContainer');
    expect(container.children()).toHaveLength(1);

    const form = container.childAt(0);
    expect(form.name()).toEqual('ExchangeForm');
    expect(form.prop('stage')).toEqual('ready');
    expect(form.prop('className')).toEqual('bar');
    expect(form.prop('sellCurrency')).toEqual('USD');
    expect(form.prop('buyCurrency')).toEqual('EUR');
    expect(form.prop('sellAmount')).toBeNull();
    expect(form.prop('buyAmount')).toBeNull();
    expect(form.prop('sellBalance')).toEqual(100);
    expect(form.prop('buyBalance')).toEqual(200);
    expect(form.prop('sellToBuyRatio')).toEqual(0.8108);
    expect(form.prop('buyToSellRatio')).toEqual(1.2334);
    expect(form.prop('canSubmit')).toEqual(false);
    expect(form.prop('error')).toBeFalsy();
  });

  it('changes an input amount when the opposite input is changed', () => {
    const wrapper = mount(
      <Provider store={createMockStore(mockState)}>
        <ExchangeFormContainer />
      </Provider>
    );
    const form = () => wrapper.childAt(0).childAt(0).childAt(0).childAt(0);

    act(() => {
      form().prop('onSellAmountChange')(10);
    });
    wrapper.update();
    expect(form().prop('sellAmount')).toEqual(10);
    expect(form().prop('buyAmount')).toEqual(8.11);
    expect(form().prop('canSubmit')).toEqual(true);

    act(() => {
      form().prop('onBuyAmountChange')(50);
    });
    wrapper.update();
    expect(form().prop('sellAmount')).toEqual(61.67);
    expect(form().prop('buyAmount')).toEqual(50);
    expect(form().prop('canSubmit')).toEqual(true);
  });

  it('doesn\'t allow to sell more than available on the balance', () => {
    const wrapper = mount(
      <Provider store={createMockStore(mockState)}>
        <ExchangeFormContainer />
      </Provider>
    );
    const form = () => wrapper.childAt(0).childAt(0).childAt(0).childAt(0);

    act(() => {
      form().prop('onSellAmountChange')(300);
    });
    wrapper.update();
    expect(form().prop('canSubmit')).toEqual(false);
    expect(form().prop('validationError')).toBeTruthy();
  });

  it('changes currencies', () => {
    const wrapper = mount(
      <Provider store={createMockStore(mockState)}>
        <ExchangeFormContainer />
      </Provider>
    );
    const form = () => wrapper.childAt(0).childAt(0).childAt(0).childAt(0);

    act(() => {
      form().prop('onBuyAmountFocus');
      form().prop('onBuyAmountChange')(10);
      form().prop('onSellCurrencySelect')('HKD');
    });
    wrapper.update();
    expect(form().prop('sellCurrency')).toEqual('HKD');
    expect(form().prop('buyCurrency')).toEqual('EUR');
    expect(form().prop('sellAmount')).toEqual(73.4);
    expect(form().prop('buyAmount')).toEqual(10);

    act(() => {
      form().prop('onBuyCurrencySelect')('GBP');
    });
    wrapper.update();
    expect(form().prop('sellCurrency')).toEqual('HKD');
    expect(form().prop('buyCurrency')).toEqual('GBP');
    expect(form().prop('sellAmount')).toEqual(82.27);
    expect(form().prop('buyAmount')).toEqual(10);
  });

  it('exchanges', () => {
    const store = createMockStore(mockState);
    const wrapper = mount(
      <Provider store={store}>
        <ExchangeFormContainer />
      </Provider>
    );
    const form = () => wrapper.childAt(0).childAt(0).childAt(0).childAt(0);

    act(() => {
      form().prop('onSellCurrencySelect')('GBP');
      form().prop('onBuyCurrencySelect')('USD');
      form().prop('onSellAmountChange')(40);
    });
    act(() => {
      form().prop('onSubmit')();
    });
    wrapper.update();
    expect(form().prop('sellCurrency')).toEqual('GBP');
    expect(form().prop('buyCurrency')).toEqual('USD');
    expect(form().prop('sellAmount')).toEqual(null);
    expect(form().prop('buyAmount')).toEqual(null);
    expect(store.getActions()).toEqual([actions.exchange('GBP', 40, 'USD', undefined)]);
  });
});
