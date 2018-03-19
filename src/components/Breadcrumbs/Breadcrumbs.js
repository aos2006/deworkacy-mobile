import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Link from '../Link';
import Container from 'components/Container';
import FontAwesome from 'react-fontawesome';
import s from './Breadcrumbs.css';

const Breadcrumbs = ({ list }) => (
  <div className={s.root}>
    <Container>
      <ul className={s.list}>
        {list.map((item, i) => {
          if (i < list.length - 1) {
            return (
              <li className={s.item}>
                <Link to={item.to} className={s.link}>
                  {item.txt}
                </Link>
                <FontAwesome name="long-arrow-right" className={s.arrow} />
              </li>
            );
          }

          return (
            <li className={s.item}>
              <Link to={item.to} className={s.link}>
                {item.txt}
              </Link>
            </li>
          )
        })}
      </ul>
    </Container>
  </div>
);

export default withStyles(s)(Breadcrumbs);
