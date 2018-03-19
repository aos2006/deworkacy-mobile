import Validator from './validator';
const v = new Validator();

export const branchUpdate = (errCallback, successCallback, error, val) => {
  if(error) {
    return errCallback(error, val);
  }

  return successCallback(error, val);
}


export const validate = (list, val) => list.reduce((prev, current) => {
  const { type, error } = current;
  if (!list.length) return null;

  return v.validate({ type, val }) ? null : `${prev !== null ? `${prev} ` : ''}${error}`;
}, '');

export const updateField = (state, val, stateKey, validates) => {
  return branchUpdate(
    (e, val) => state.setIn([stateKey, 'error'], e),
    (e, val) => state
      .setIn([stateKey, 'val'], val)
      .setIn([stateKey, 'error'], null),
    validate(validates, val),
    val,
  );
}


