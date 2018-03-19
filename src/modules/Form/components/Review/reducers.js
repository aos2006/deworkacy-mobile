import { baseValidates } from '../../validates';

export const defaultState = {
  isLoading: false,
  isCompleted: false,
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
  acceptedRules: {
    val: false,
    error: null,
  },
};

export const validates = {
  ...baseValidates,
  comment: {
    change: [],
    submit: [{ type: 'notEmpty', error: 'Не может быть пустым' }],
  },
  companyName: {
    change: [],
    submit: [{ type: 'notEmpty', error: 'Не может быть пустым' }],
  },
  person: {
    change: [],
    blur: [{ type: 'notEmpty', error: 'Не может быть пустым' }],
    submit: [{ type: 'notEmpty', error: 'Необходимо ввести ваше имя' }],
  },
  acceptedRules: {
    change: [],
    submit: [{ type: 'isChecked', error: 'Необходимо принять условия'}],
  }
};

export const resetedState = {
  isLoading: false,
  isCompleted: false,
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
  acceptedRules: {
    val: false,
    error: null,
  },
};

