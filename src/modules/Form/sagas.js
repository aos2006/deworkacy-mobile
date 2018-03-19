import { takeEvery, put, call, select} from 'redux-saga/effects';
import ApiModule from 'modules/Api';
import * as types from './actionTypes';
import { getState, getReqBody } from './selectors';
import { history } from 'kit/lib/routing';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function* validate(state, payload, name) {
  for (let i = 0; i < payload.fields.length; i++) {
    const { fieldName } = payload.fields[i];
    yield put({
      type: types.FIELD_VALIDATE,
      name,
      payload: { name: fieldName, val: state.getIn([fieldName, 'val']) },
    });
  }

}

function* formSubmit(action) {
  const { type, name, payload, url } = action;
  const state = yield select(s => getState(s, name));
  yield call(validate, state, payload, name);
  const updatedState = yield select(s => getState(s, name));

  let erroredFields = payload.fields.filter(item => !!updatedState.getIn([item.fieldName, 'error']));

  if (!erroredFields.length) {
    console.log(history.location.search);
    yield put({
      type: ApiModule.types.REQUEST_START,
      method: 'POST',
      name,
      url,
      params: {
        body: JSON.stringify({
          ...getReqBody(name, updatedState),
          miscData: {
            query: history.location.search,
          },
        }),
      },
    });

    yield put({
      type: types.FORM_SUBMIT_START,
      name,
    });

    yield call(delay, 1000);
    yield put({
      type: types.FORM_SUBMIT_SUCCESS,
      name,
    });
  }

}


export default function* () {
  yield takeEvery(types.FORM_SUBMIT, formSubmit);
}
