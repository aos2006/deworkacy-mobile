import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import MaskedInput from 'react-text-mask';
import s from './Input.scss';


const Input = ({ label, type, value, handlers, error, mask, ...rest }) => (
  <div className={s.root}>
    {mask ? (
      <MaskedInput
        placeholder={rest.placeholder}
        type={type}
        mask={mask}
        value={value}
        className={s.input}
        {...handlers}
        {...rest}
      />
    ) : (
      <input type={type} value={value} className={s.input} {...handlers} {...rest} />
    )}
  </div>
);

Input.defaultProps = {
  label: '',
  type: 'text',
  error: null,
  mask: null,
  handlers: {},
};

export default withStyles(s)(Input);
