import { baseValidates } from '../../validates';

export const defaultState = {
  isLoading: false,
  isCompleted: false,
  person: {
    val: '',
    error: null,
  },
  email: {
    val: '',
    error: null,
  },
  role: {
    val: 1,
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
  role: {
    change: [],
    blur: [],
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
  person: {
    val: '',
    error: null,
  },
  tel: {
    val: '',
    error: null,
  },
  role: {
    val: 1,
    error: null,
  },
  acceptedRules: {
    val: false,
    error: null,
  },
};
