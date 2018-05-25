
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Rules.scss';
import Checkbox from '../Checkbox';

const Rules = props => (
  <div className={cx([
    s.root,
    props.className,
  ])}>
    <Checkbox
      {...props}
    >
      Я согласен на обработку персональных данных<br />
      Политика конфиденциальности
    </Checkbox>
  </div>
);

export default withStyles(s)(Rules)
