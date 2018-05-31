import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './RadioGroup.scss';
import { Radio } from 'antd';

const Group = Radio.Group;

const RadioGroup = (props) => (
  <Group {...props} defaultValue={props.defaultValue} value={props.value} onChange={props.onChange}>
    {props.children}
  </Group>
);

RadioGroup.defaultProps = {
  label: '',
  type: 'text',
  error: null,
  mask: null,
  handlers: {},
};

export default withStyles(s)(RadioGroup);
