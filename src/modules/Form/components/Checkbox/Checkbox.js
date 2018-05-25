
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
  ])}>
    <Checkbox onChange={props.onChange} checked={props.checked} classNAme='app-checkbox'>
      {props.children}
    </Checkbox>
  </div>
);

export default withStyles(checkboxS, antdTheme, s)(AppCheckbox);
