
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Contacts.scss';

const Contacts = props => (
  <div className={cx([
    s.root,
    props.className,
  ])}>
    <a href="tel:+74951234535" className={cx([
      s.contact,
      s.tel,
    ])}>
      +7 (495) 123-45-35
    </a>
    <a href="mailto:apply@deworkacy.ru" className={cx([
      s.contact,
      s.mail,
    ])}>
      apply@deworkacy.ru
    </a>
  </div>
);

export default withStyles(s)(Contacts)
