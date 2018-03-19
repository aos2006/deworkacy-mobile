import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Button.css';

const Button = ({
  classes,
  onClick,
  children,
}) => (
  <button
    onClick={onClick}
    className={cx(
      [
        s.root,
        classes.root,
      ],
    )}>
    {children}
  </button>
);
Button.defaultProps = {
  classes: { root: '' },
};

Button.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }),
};
export default withStyles(s)(Button);
