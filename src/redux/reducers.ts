import { ReduxState, Action } from './types';
import initialState from './initialState';

export default function apprRducer(state: ReduxState = initialState, action: Action) {
  return state;
}
