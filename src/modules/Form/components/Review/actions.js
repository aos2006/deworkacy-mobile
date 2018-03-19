import * as types from '../../actionTypes';
import * as localTypes from './actionTypes';
import * as constants from './constants';

export const formSubmit = () => ({
  type: types.FORM_SUBMIT,
  name: localTypes.NAME,
  url: constants.API,
  payload: {
    fields: [
      {
        fieldName: 'person',
      },
      {
        fieldName: 'comment',
      },
      {
        fieldName: 'companyName',
      },
      {
        fieldName: 'acceptedRules',
      },
    ]
  }
})
