
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './SocialList.scss';
import Vk from './icons/vk.svg';
import Fb from './icons/fb.svg';
import Inst from './icons/inst.svg';

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
        icon: <Fb />,
        href: '#',
      },
      {
        id: 77,
        icon: <Vk />,
        href: '#',
      },
      {
        id: 28,
        icon: <Inst />,
        href: '#',
      }
    ].map(item => (
      <li className={s.item} key={item.id}>
        <a href={item.href} className={s.social}>
          {item.icon}
        </a>
      </li>
    ))}
  </ul>
);

export default withStyles(s)(SocialList);
