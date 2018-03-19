import { updateField } from './utils';
import { defaultState } from './components/Simple/reducers';
import * as baseTypes from './actionTypes';
import * as types from './components/Simple/actionTypes';
import { taggedReducer, createReducer } from 'modules/utils';
import { validates } from './components/Programm/reducers';

export const fieldChange = validates => (state, action) => {
  const { type, payload } = action;
  return updateField(state, payload.val, payload.name, validates[payload.name].change);
};

export const fieldBlur = validates => (state, action) => {
  const { type, payload } = action;
  return updateField(state, payload.val, payload.name, validates[payload.name].blur);
}

export const clearInput = (state, action) => {
  const { type, payload } = action;

  return state.setIn([payload.name, 'error'], null);
}

export const formSubmit = (state, action) => {
  return state;
}


const submitStart = (state) => {
  return state.setIn(['isLoading'], true);
}

const submitSuccess = (state) => {
  return state
    .setIn(['isLoading'], false)
    .setIn(['isCompleted'], true);
}

const formReset = (resetedState) => (state) => {
  return state.merge(resetedState);
}


const fieldValidate = validates => (state, action) => {
  const { payload } = action;
  const { val, name } = payload;
  if (validates[name]) {
    return updateField(state, val, name, validates[name].submit);
  }

  return state;
}


export default (tag, actionsSettings) => createReducer(defaultState, {
  [baseTypes.FIELD_CHANGE]: taggedReducer(fieldChange(actionsSettings.validates), tag),
  [baseTypes.CLEAR_INPUT]: taggedReducer(clearInput, tag),
  [baseTypes.FIELD_BLUR]: taggedReducer(fieldBlur(actionsSettings.validates), tag),
  [baseTypes.FORM_SUBMIT]: taggedReducer(formSubmit, tag),
  [baseTypes.FIELD_VALIDATE]: taggedReducer(fieldValidate(actionsSettings.validates), tag),
  [baseTypes.FORM_SUBMIT_START]: taggedReducer(submitStart, tag),
  [baseTypes.FORM_SUBMIT_SUCCESS]: taggedReducer(submitSuccess, tag),
  [baseTypes.FORM_RESET]: taggedReducer(formReset(actionsSettings.resetedState), tag),
});
