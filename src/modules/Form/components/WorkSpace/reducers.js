import { baseValidates } from '../../validates';

export const defaultState = {
  isLoading: false,
  isCompleted: false,
  space: {
    val: undefined,
    error: null,
  },
  loc: {
    val: undefined,
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
  space: {
    change: [],
    submit: [{ type: 'notEmpty', error: 'Необходимо выбрать место' }],
  },
  loc: {
    change: [],
    submit: [{ type: 'notEmpty', error: 'Необходимо выбрать локацию' }],
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
  space: {
    val: undefined,
    error: null,
  },
  loc: {
    val: undefined,
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

