import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Button.scss';
import customSpin from './antdTheme/index.scss';
import { Spin } from 'antd';
import spinStyles from 'antd/lib/spin/style/index.css';



const handleClick = (fn, isLoading, isDisabled) => ev => isLoading || isDisabled ? null : fn(ev);

const Button = ({ classes, onClick, children, theme, fullWidth, isLoading, href, ...rest }) => (
  href ? (
    <a
      href={href}
      onClick={handleClick(onClick, isLoading, false)}
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
      {isLoading ? <Spin className={cx([
        'custom-spin',
        s.spin,
      ])} size="small"/> : children}
    </a>
  ) : (
    <button
      onClick={handleClick(onClick, isLoading, false)}
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
      {isLoading ? <Spin className={cx([
        'custom-spin',
        s.spin,
      ])} size="small"/> : children}
    </button>
  )
)
Button.defaultProps = {
  classes: { root: '' },
  theme: '',
  fullWidth: false,
  isLoading: false,
  onClick: () => {},
};

Button.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }),
};
export default withStyles(spinStyles, customSpin, s)(Button);
