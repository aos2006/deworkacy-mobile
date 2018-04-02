import * as types from './actionTypes';


export const getRegisterField = name => state => {
  const r = state[types.NAME];
  return r['register']['fields'][name];
}

