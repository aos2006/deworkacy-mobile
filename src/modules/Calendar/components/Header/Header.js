
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Header.scss';
import Title from 'components/Title';
import Right from './icons/right.svg';
import Left from './icons/left.svg';

const Header = props => (
  <div className={cx([
    s.root,
    props.className,
  ])}>
    <Title type="h2" classes={{ root: s.title }}>
      {props.title}
    </Title>
    <div className={s.switchers}>
      <Left className={s.left} onClick={props.handlePrev} />
      <Right className={s.right} onClick={props.handleNext} />
    </div>
  </div>
);

export default withStyles(s)(Header)
