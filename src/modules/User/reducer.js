import { createReducer, taggedReducer } from 'modules/utils';
import * as types from './actionTypes';
import Api from 'modules/Api';

export const defaultState = {
  id: null,
  isActive: false,
  register: {
    isLoading: false,
    errors: {
      name: null,
      phone: null,
      email: null,
      password: null,
    },
    fields: {
      name: null,
      phone: null,
      email: null,
      password: null,
    },
  },
};

const create = (state, action) => {
  const { payload } = action;
  return state
    .setIn(['register', 'isLoading'], false)
    .setIn(['register', 'errors'], {});
};

const fail = (state, action) => {
  const { payload } = action;
  return state
    .setIn(['register', 'isLoading'], false)
    .setIn(['register', 'errors'], payload.data);
}

const start = (state, action) => {
  const { payload } = action;
  return state
    .setIn(['register', 'isLoading'], true)
    .setIn(['register', 'errors'], {});
}


export default createReducer(defaultState, {
  [Api.types.REQUEST_FAIL]: taggedReducer(fail, types.REGISTER),
  [Api.types.REQUEST_SUCCESS]: taggedReducer(create, types.REGISTER),
  [Api.types.REQUEST_START]: taggedReducer(start, types.REGISTER),
});
