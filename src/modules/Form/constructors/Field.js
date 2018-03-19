import { Map } from 'immutable';
import Validator from '../validator';

export class Field {
  constructor({ name, val, error }) {
    this.instanceName = 'Field';
    this.val = val;
    this.error = error;
    this.isValid = true;
    this.validate = (
      { val, type },
      onValid = () => this,
      onError = () => this,
    ) => {
      const isValid = new Validator().validate({ val, type });
      return isValid ? new Field(onValid(this)) : new Field(onError(this));
    };

    this.getValue = () => val;

    this.getError = () => error;

    this.set = (key, newVal) => {
      const { val, error, isValid } = this;
      return new Field({ val, error, isValid, [key]: newVal });
    };
  }
}

export default Field;
