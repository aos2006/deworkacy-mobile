import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import CardLabel from 'components/CardLabel';
import s from './AccentProducts.css';

class AccentProducts extends React.PureComponent {
  render() {
    const { list, classes } = this.props;
    return (
      <div className={cx([s.root, classes.root])}>
        <div className={s.item}>
          <div className={cx([s.product, s.productSmall])}>
            <span className={s.name}>{list[0].name}</span>
            <span className={s.price}>
              <span>$</span>
              {list[0].price}
            </span>
          </div>
          <div className={cx([s.product, s.productSmall])}>
            <span className={s.name}>{list[1].name}</span>
            <span className={s.price}>
              <span>$</span>
              {list[1].price}
            </span>
          </div>
        </div>
        <div className={s.item}>
          <div className={cx([s.product, s.productBig])}>
            <span className={s.name}>{list[2].name}</span>
            <span className={s.price}>
              <span>$</span> {list[2].price}
            </span>
          </div>
        </div>
        <div className={s.item}>
          <div className={cx([s.product, s.productBig])}>
            <CardLabel
              type="tape"
            >
              Hot
            </CardLabel>
            <span className={s.name}>{list[3].name}</span>
            <span className={s.price}>
              <span>$</span>
              {list[3].price}
            </span>
          </div>
        </div>
        <div className={s.item}>
          <div className={cx([s.product, s.productSmall, s.right])}>
            <span className={s.name}>{list[4].name}</span>
            <span className={s.price}>
              <span>$</span>
              {list[4].price}
            </span>
          </div>
          <div className={cx([s.product, s.productSmall, s.right])}>
            <span className={s.name}>{list[5].name}</span>
            <span className={s.price}>
              <span>$</span>
              {list[5].price}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

AccentProducts.defaultProps = {
  classes: { root: '' },
  list: [
    { name: 'Exco 4 8ft Matte Black', price: '24.00' },
    { name: 'Exco 4 8ft Matte Black', price: '24.00' },
    { name: 'Exco 4 8ft Matte Black', price: '24.00' },
    { name: 'Exco 4 8ft Matte Black', price: '24.00' },
    { name: 'Exco 4 8ft Matte Black', price: '24.00' },
    { name: 'Exco 4 8ft Matte Black', price: '24.00' },
  ],
};

export default withStyles(s)(AccentProducts);
