import * as types from '../../actionTypes';
import * as localTypes from './actionTypes';
import * as constants from './constants';

export const formSubmit = () => ({
  type: types.FORM_SUBMIT,
  name: localTypes.NAME,
  url: constants.api,
  payload: {
    fields: [
      {
        bodyKey: 'contactName',
        fieldName: 'person',
      },
      {
        bodyKey: 'phone',
        fieldName: 'tel',
      },
      {
        fieldName: 'acceptedRules',
      },
    ]
  }
})
