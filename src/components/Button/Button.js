import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Button.css';

const Button = ({
  classes,
  onClick,
  children,
  theme,
}) => (
  <button
    onClick={onClick}
    className={cx(
      [
        s.root,
        [s[theme]]: true,
        classes.root,
      ],
    )}>
    {children}
  </button>
);
Button.defaultProps = {
  classes: { root: '' },
  theme: '',
};

Button.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }),
};
export default withStyles(s)(Button);
