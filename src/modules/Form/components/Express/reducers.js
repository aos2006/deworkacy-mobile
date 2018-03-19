import { baseValidates } from '../../validates';

export const defaultState = {
  isLoading: false,
  isCompleted: false,
  orderType: {
    val: 1,
    error: null,
  },
  person: {
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
  person: {
    change: [],
    blur: [{ type: 'notEmpty', error: 'Не может быть пустым' }],
    submit: [{ type: 'notEmpty', error: 'Необходимо ввести ваше имя' }],
  },
  acceptedRules: {
    change: [],
    submit: [{ type: 'isChecked', error: 'Необходимо принять условия'}],
  },
  orderType: {
    change: [],
    submit: [],
  },
};

export const resetedState = {
  isLoading: false,
  isCompleted: false,
  orderType: {
    val: 1,
    error: null,
  },
  person: {
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
