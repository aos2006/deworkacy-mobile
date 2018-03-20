import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Header.css';

const Header = ({
  title,
               }) => (
                 <header className={s.root}>
                   <h3 className={s.title}>
                     {title}
                   </h3>
                   <span className={s.devider} />
                 </header>
);

Header.defaultProps = {
  title: '',
};
export default withStyles(s)(Header);
