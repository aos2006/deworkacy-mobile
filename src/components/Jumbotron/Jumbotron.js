import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'components/Button';
import cx from 'classnames';
import s from './Jumbotron.css';

const Jumbotron = ({ title, descr, link, btn, classes }) => (
  <article className={cx([
    s.root,
    classes.root,
  ])}>
    <div className={s.inner}>
      <h2 className={s.title}>{title}</h2>
      <p className={s.descr}>{descr}</p>
      <a {...link} className={s.link}>{link.txt}</a>
      <Button {...btn}>{btn.label}</Button>
    </div>
  </article>
);

Jumbotron.defaultProps = {
  classes: { root: '' },
  title: 'Explore great apps for Productivity, including office for iPad',
  descr:
    'Start editing a phone on your iPad and finish it on your Macbook.Sync a Playlist from your iPhone to your Apple Watch.',
  link: {
    txt: 'Learn More about iPad Mini',
  },
  btn: {
    label: 'Buy Now',
    onClick: () => {},
  },
};

export default withStyles(s)(Jumbotron);
