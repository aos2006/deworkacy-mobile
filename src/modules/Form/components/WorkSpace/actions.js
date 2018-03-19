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
        fieldName: 'product',
      },
      {
        fieldName: 'loc',
      },
      {
        fieldName: 'tel',
      },
      {
        fieldName: 'email',
      },
      {
        fieldName: 'space',
      },
      {
        fieldName: 'person',
      },
      {
        fieldName: 'acceptedRules',
      },
    ]
  }
})
