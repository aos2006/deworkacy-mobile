import * as types from './actionTypes';

export const fieldChange = ({ name, formName, val }) => {
  return {
    type: types.FIELD_CHANGE,
    name: formName,
    payload: { name, val },
  };
}


export const clearInput = ({ name, formName }) => {
  return {
    type: types.CLEAR_INPUT,
    name: formName,
    payload: { name },
  };
}

export const fieldBlur = ({ name, formName, val }) => {
  return {
    type: types.FIELD_BLUR,
    name: formName,
    payload: { name, val },
  };
}

export const formSubmit = ({ formName }) => {
  return {
    type: types.FORM_SUBMIT,
    name: formName,
  }
}

export const formReset = ({ formName }) => {
  return {
    type: types.FORM_RESET,
    name: formName,
  }
}


export default { fieldChange, clearInput, formReset };
