import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ServiceFeatures.css';
import Container from 'components/Container';
import Plan from './icons/plan.svg';

const ServiceFeatures = ({ list, classes }) => (
  <Container>
    <ul className={cx([
      s.root,
      classes.root,
    ])}>
      {list.map(item => {
        return (
          <li className={s.item}>
            <span className={s.icon}>{item.icon}</span>
            <span className={s.title}>{item.title}</span>
            <p>{item.descr}</p>
          </li>
        )
      })}
    </ul>
  </Container>
);

ServiceFeatures.defaultProps = {
  classes: { root: '' },
  list: [
    {
      title: 'Free shipping',
      descr: 'Free Shipping for all US Order',
      icon: <Plan />,
    },
    {
      title: 'Free shipping',
      descr: 'Free Shipping for all US Order',
      icon: <Plan />,
    },
    {
      title: 'Free shipping',
      descr: 'Free Shipping for all US Order',
      icon: <Plan />,
    },
    {
      title: 'Free shipping',
      descr: 'Free Shipping for all US Order',
      icon: <Plan />,
    },
  ],
};
export default withStyles(s)(ServiceFeatures);
