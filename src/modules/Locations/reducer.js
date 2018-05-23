import {createReducer, taggedReducer} from 'modules/utils';
import * as types from './actionTypes';

export const defaultState = {
  activeLocation: 0,
  entities: {
    0: {
      position: {lat: 55.740991, lng: 37.608957}
    },
    1: {
      position: {lat: 55.742177, lng: 37.615501}
    },
    2: {
      position: {lat: 55.766284, lng: 37.604382}
    }
  }
};

const locationChange = (state, action) => {
  const { payload } = action;
  return state.set('activeLocation', payload.id);
};

export default createReducer(defaultState, {
  [types.LOCATION_CHANGE]: locationChange,
})
