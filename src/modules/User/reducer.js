import { createReducer, taggedReducer } from 'modules/utils';
import * as types from './actionTypes';
import Api from 'modules/Api';

export const defaultState = {
  id: null,
  isActive: false,
  email: null,
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
    .setIn(['register', 'errors'], {})
    .setIn(['email'], payload.email);
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

const reset = state => {
  return state
    .setIn(['register', 'errors'], {})
}

const loginStart = state => {
  return state.setIn(['login', 'isLoading'], true);
}

const login = (state, action) => {
  const { payload } = action;
  return state
    .setIn(['id'], payload.id)
    .setIn(['email'], payload.email)
    .setIn(['isActive'], true)
    .setIn(['login', 'isLoading'], false);
}

const loginFail = (state, action) => {
  const { payload } = action;
  return state
    .setIn(['login', 'errors'], payload.data.errors)
    .setIn(['login', 'isLoading'], false);
}


export const registerReducer = createReducer(defaultState, {
  [Api.types.REQUEST_FAIL]: taggedReducer(fail, types.REGISTER),
  [Api.types.REQUEST_SUCCESS]: taggedReducer(create, types.REGISTER),
  [Api.types.REQUEST_START]: taggedReducer(start, types.REGISTER),
  [types.RESET_ERRORS]: reset,
});

const loginState = {
  isLoading: false,
  success: false,
  errors: {
    email: null,
    password: null,
  }
}

export const loginReducer = createReducer(loginState, {
  [Api.types.REQUEST_START]: taggedReducer(loginStart, types.LOGIN),
  [Api.types.REQUEST_SUCCESS]: taggedReducer(login, types.LOGIN),
  [Api.types.REQUEST_FAIL]: taggedReducer(loginFail, types.LOGIN),
})
