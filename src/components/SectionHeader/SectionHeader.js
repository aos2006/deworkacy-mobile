
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './SectionHeader.scss';
import Title from 'components/Title';
import Phone from 'components/Phone';
import Burger from 'components/Burger';

const SectionHeader = props => (
  <div className={cx([
    s.root,
    props.className,
  ])}>
    <Title type="h2" classes={{root: s.title}}>
      {props.title}
    </Title>
   <div>
     <Phone className={s.phone}/>
     <Burger className={s.burger}/>
   </div>
  </div>
);

export default withStyles(s)(SectionHeader)
