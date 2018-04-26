import { call, put, takeEvery } from 'redux-saga/effects';
import * as types from './actionTypes';
import Api from 'modules/Api';
import history from '../../history';
// The watcher: watch actions and coordinate worker tasks

function* watchRegister(action) {
  const { payload, name } = action;
  if (name === types.REGISTER || name === types.LOGIN) {
    history.push('/personal');
  }
}

export default function*() {
  yield takeEvery(Api.types.REQUEST_SUCCESS, watchRegister);
}
