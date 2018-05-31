
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Checkbox.scss';
import { Checkbox } from 'antd';
import checkboxS from 'antd/lib/checkbox/style/index.css';
import antdTheme from './antdTheme/index.scss';

const AppCheckbox = props => (
  <div className={cx([
    s.root,
    props.className,
    {
      'isError': props.isError,
    }
  ])}>
    <Checkbox
      type="checkbox"
      onChange={props.onChange}
      checked={props.checked}
      onClick={props.onChange}
      classNAme='app-checkbox'>
      {props.children}
    </Checkbox>
  </div>
);

export default withStyles(checkboxS, antdTheme, s)(AppCheckbox);
