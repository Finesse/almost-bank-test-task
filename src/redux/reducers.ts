import { ReduxState, Action } from './types';
import initialState from './initialState';

export default function appReducer(state: ReduxState = initialState, action: Action) {
  return state;
}
