import * as types from './actionTypes';
import Api from 'modules/Api';

export const register = ({ email, password, name, phone }) => ({
  type: Api.types.REQUEST_START,
  name: types.REGISTER,
  url: 'http://127.0.0.1:8000/user/',
  method: 'post',
  params: {
    body: {
      name,
      phone,
      email,
      password,
    }
  },
});
