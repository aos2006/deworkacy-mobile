import * as types from './actionTypes';
import normalizer from './schema';
import { createReducer } from 'modules/utils';

const defaultState = {
  isLoading: false,
  ids: [],
  events: {},
  days: {},
};

const fetchStart = (state, action) => state.set('isLoading', true);

const fetchSuccess = (state, action) => {
  if(!action.payload.events) {
    return state
      .set('isLoading', false)
      .set('ids', [])
      .set('events', [])
      .set('days', []);
  }
  const normalized = normalizer(action.payload.events);
  return state
    .set('isLoading', false)
    .set('ids', normalized.result)
    .set('events', normalized.events)
    .set('days', normalized.days);
}

export default createReducer(defaultState, {
  [types.fetch_events_success]: fetchSuccess,
  [types.fetch_events]: fetchStart,
});

