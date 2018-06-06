
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './SocialList.scss';
import { checkingApp } from "modules/utils"
// import Vk from './icons/vk.svg';
// import Fb from './icons/fb.svg';
// import Inst from './icons/inst.svg';
const linkClick = (fn, href, fallback) => ev => {
  ev.preventDefault();
  fn(href, fallback)
}
const SocialList = props => (
  <ul className={cx([
    s.root,
    props.className,
  ])}>
    <li className={s.label}>
      В социальных сетях
    </li>
    {[
      {
        id: 88,
        icon: 'fb.svg',
        href: 'https://facebook.com/Deworkacy',
        fallback: 'https://facebook.com/Deworkacy',
      },
      {
        id: 77,
        icon: 'vk.svg',
        fallback: 'https://vk.com/deworkacy',
        href: 'vk://vk.com/deworkacy',
      },
      {
        id: 28,
        fallback: 'https://instagram.com/deworkacy',
        icon: 'inst.svg',
        href: 'instagram://user?username=deworkacy',
      }
    ].map(item => (
      <li className={s.item} key={item.id}>
        <a href={item.href} className={s.social} target="_blank" >
          <img src={item.icon} alt="" />
        </a>
      </li>
    ))}
  </ul>
);

export default withStyles(s)(SocialList);
