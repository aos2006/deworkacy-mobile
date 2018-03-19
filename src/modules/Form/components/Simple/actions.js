import * as types from '../../actionTypes';
import * as localTypes from './actionTypes';
import * as constants from './server/constants';

export const formSubmit = () => ({
  type: types.FORM_SUBMIT,
  name: localTypes.NAME,
  url: constants.API,
  payload: {
    fields: [
      {
        fieldName: 'location',
      },
      {
        fieldName: 'additionalServices',
      },
      {
        fieldName: 'personQuantity',
      },
      {
        fieldName: 'tel',
      },
      {
        fieldName: 'email',
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
