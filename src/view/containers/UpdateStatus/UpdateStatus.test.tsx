import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { ReduxState } from '../../../redux/types';
import initialState from '../../../redux/initialState';
import UpdateStatusContainer from './UpdateStatus';

describe('<UpdateStatusContainer />', () => {
  it('renders', () => {
    const mockState: ReduxState = {
      ...initialState,
      exchangeRates: {
        ...initialState.exchangeRates,
        areUpdating: true,
        lastUpdateDate: 1983748932,
        updateError: 'Test'
      }
    };

    const wrapper = mount(
      <Provider store={createMockStore(mockState)}>
        <UpdateStatusContainer className="stylish" />
      </Provider>
    );

    const component = wrapper.childAt(0).childAt(0);
    expect(component.name()).toEqual('UpdateStatus');
    expect(component.prop('className')).toEqual('stylish');
    expect(component.prop('updating')).toEqual(true);
    expect(component.prop('lastUpdateDate')).toEqual(1983748932);
    expect(component.prop('error')).toEqual('Test');
  });
});
