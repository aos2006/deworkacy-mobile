import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Input.css';

const renderErrors = (error) => {
  const isArray = Array.isArray(error);
  if (isArray) {
    return error.map(err => (
      <span className={s.error}>{err}</span>
    ))
  }

  return (<span className={s.error}>{error}</span>)
}
const Input = ({ label, type, value, handlers, error, ...rest }) => (
  <div className={s.root}>
    <span className={s.label}>{label}</span>
    {error ? renderErrors(error) : null}
    <input type={type} value={value} className={s.input} {...handlers} {...rest} />
  </div>
);

Input.defaultProps = {
  label: '',
  type: 'text',
  error: null,
  handlers: {},
};

export default withStyles(s)(Input);
