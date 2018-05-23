import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Radio.scss';
import { Radio } from 'antd';
import radioStyles from 'antd/lib/radio/style/index.css';
import customTheme from './antdTheme/index.scss';


const CRadio = (props) => (
<div className={cx([
  s.root,
  props.className,
])}>
  <Radio {...props} className="custom-radio">
    {props.children}
  </Radio>
</div>
);

CRadio.defaultProps = {
  label: '',
};

export default withStyles(radioStyles, customTheme, s)(CRadio);
