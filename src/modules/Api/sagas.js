import { call, put, takeEvery } from 'redux-saga/effects';
import * as types from './constants';
import api from './actions';
// The watcher: watch actions and coordinate worker tasks
function getErrorData(data){
  return data.json().then(data => data);
}
function* fetch({ url, params, method = 'get', name = 'NOTHING_TYPE' }) {
  try {
    // yield put({ type: `${name}_${types.REQUEST_START}`, name });
    const resp = yield call(api[method.toLowerCase()], { url, params });
    yield put({
      type: types.REQUEST_SUCCESS,
      name,
      payload: {
        ...resp,
      },
    });
  } catch (error) {
    let data = yield call(getErrorData, error.resp);
    yield put({
      type: types.REQUEST_FAIL,
      name,
      payload: {
        statusText: error.resp.statusText,
        ok: error.resp.ok,
        status: error.resp.status,
        data,
      },
    });
  }
}

export default function* watchFetchRequests() {
  yield takeEvery(types.REQUEST_START, fetch);
}
