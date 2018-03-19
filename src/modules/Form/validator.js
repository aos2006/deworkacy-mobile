import * as patterns from './patterns';

export default class Validator {
  constructor(type = '') {
    this.type = type;
    this.types = {
      email: val => patterns.emailPattern.test(val),
      number: val => {},
      tel: val => patterns.telPattern.test(val),
      date: val => {},
      time: val => {},
      notEmpty: val => val !== null && val !== undefined && val !== '',
      isChecked: val => val,
    };
  }
  validate({ type = this.type, val }) {
    const hasType = Object.prototype.hasOwnProperty.call(this.types, type);
    if (hasType) {
      return this.types[type](val);
    }

    throw new Error('Type does not exist');
  }
}
