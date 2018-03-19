import { createReducer, taggedReducer } from 'modules/utils';
import { baseValidates } from '../../validates';

export const defaultState = {
  isLoading: false,
  isCompleted: false,
  location: {
    val: 1,
    error: null,
  },
  person: {
    val: '',
    error: null,
  },
  email: {
    val: '',
    error: null,
  },
  tel: {
    val: '',
    error: null,
  },
  personQuantity: {
    val: 1,
    error: null,
  },
  additionalServices: {
    val: [],
    error: null,
  },
  acceptedRules: {
    val: false,
    error: null,
  },
};

export const validates = {
  ...baseValidates,
  location: {
    change: [],
    submit: [],
  },
  person: {
    change: [],
    blur: [{ type: 'notEmpty', error: 'Не может быть пустым' }],
    submit: [{ type: 'notEmpty', error: 'Необходимо ввести ваше имя' }],
  },
  additionalServices: {
    change: [],
    submit: [],
  },
  personQuantity: {
    change: [],
    submit: [],
  },
  acceptedRules: {
    change: [],
    submit: [{ type: 'isChecked', error: 'Необходимо принять условия'}],
  }
};

export const resetedState = {
  isLoading: false,
  isCompleted: false,
  location: {
    val: 1,
    error: null,
  },
  person: {
    val: '',
    error: null,
  },
  email: {
    val: '',
    error: null,
  },
  tel: {
    val: '',
    error: null,
  },
  personQuantity: {
    val: 1,
    error: null,
  },
  additionalServices: {
    val: [],
    error: null,
  },
  acceptedRules: {
    val: false,
    error: null,
  },
}
