import { createReducer, taggedReducer } from 'modules/utils';
import { baseValidates } from '../../validates';

export const defaultState = {
  isLoading: false,
  isCompleted: false,
  product: {
    val: 1,
    error: null,
  },
  comment: {
    val: '',
    error: null,
  },
  companyName: {
    val: '',
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
  acceptedRules: {
    val: false,
    error: null,
  },
};

export const validates = {
  ...baseValidates,
  product: {
    change: [],
    submit: [],
  },
  comment: {
    change: [],
    submit: [],
  },
  person: {
    change: [],
    blur: [{ type: 'notEmpty', error: 'Не может быть пустым' }],
    submit: [{ type: 'notEmpty', error: 'Необходимо ввести ваше имя' }],
  },
  acceptedRules: {
    change: [],
    submit: [{ type: 'isChecked', error: 'Необходимо принять условия'}],
  },
  companyName: {
    change: [],
    submit: [],
  }
};

export const resetedState = {
  isLoading: false,
  isCompleted: false,
  product: {
    val: 1,
    error: null,
  },
  comment: {
    val: '',
    error: null,
  },
  companyName: {
    val: '',
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
  acceptedRules: {
    val: false,
    error: null,
  },
};

