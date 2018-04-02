import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import FontAwesome from 'react-fontawesome';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Button.css';

const Button = ({ classes, onClick, children, theme, fullWidth, isLoading, ...rest }) => (
  <button
    onClick={onClick}
    className={cx([
      s.root,
      ([s[theme]]: true),
      {
        [s.fullWidth]: fullWidth,
      },
      classes.root,
    ])}
    {...rest}
  >
    {isLoading ? (
      <FontAwesome
        pulse
        name="spinner"
      />
    ) : children }
  </button>
);
Button.defaultProps = {
  classes: { root: '' },
  theme: '',
  fullWidth: false,
  isLoading: false,
};

Button.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }),
};
export default withStyles(s)(Button);
