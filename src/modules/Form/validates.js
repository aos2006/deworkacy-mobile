export const baseValidates = {
  email: {
    blur: [{ type: 'notEmpty', error: 'Не может быть пустым' }, {
      type: 'email',
      error: 'Некорректный email',
    }],
    change: [],
    submit: [{ type: 'notEmpty', error: 'Не может быть пустым' }, { type: 'email', error: 'Некорректный email' }],
  },
  tel: {
    blur: [{ type: 'notEmpty', error: 'Не может быть пустым' }, { type: 'tel', error: 'Некорректный телефон' }],
    change: [],
    submit: [{ type: 'notEmpty', error: 'Не может быть пустым' }, { type: 'tel', error: 'Некрректный телефон' }],
  }
}
