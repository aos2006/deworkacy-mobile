import * as types from './actionTypes';

export const locationChange = id => ({
  type: types.LOCATION_CHANGE,
  payload: { id }
})
