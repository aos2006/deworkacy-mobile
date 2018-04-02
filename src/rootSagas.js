import { all } from 'redux-saga/effects';
import Api from 'modules/Api';
import User from 'modules/User';

export default function* rootSaga() {
  yield all([
    Api.saga(),
    User.saga(),
  ])
}
