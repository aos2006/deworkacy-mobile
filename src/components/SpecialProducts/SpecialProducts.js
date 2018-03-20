import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import FontAwesome from 'react-fontawesome';
import Container from 'components/Container';
import Link from 'components/Link';
import s from './SpecialProducts.css';

const SpecialProducts = ({ list, classes }) => (
  <Container>
    <ul className={cx([
      s.root,
      classes.root,
    ])}>
      {list.map(item => (
        <li className={s.item}>
          <h3 className={s.title}>{item.title}</h3>
          <p className={s.descr}>{item.descr}</p>
          <footer className={s.footer}>
            <FontAwesome name="play" className={s.icon}/>
            <Link to={item.to} className={s.link}>
              {item.link}
            </Link>
          </footer>
        </li>
      ))}
    </ul>
  </Container>
);

SpecialProducts.defaultProps = {
  classes: {
    root: ''
  },
  list: [
    {
      title: 'Formal Shoes',
      descr: 'Buying Guide',
      to: '/',
      link: 'Learn More',
    },
    {
      title: 'Formal Shoes',
      descr: 'Buying Guide',
      to: '/',
      link: 'Learn More',
    },
    {
      title: 'Formal Shoes',
      descr: 'Buying Guide',
      to: '/',
      link: 'Learn More',
    },
  ],
};
export default withStyles(s)(SpecialProducts);
