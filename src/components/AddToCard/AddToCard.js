import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './AddToCard.css';
import FontAwesome from 'react-fontawesome';

const AddToCard = ({ handleClick, visible }) => (
  <div
    className={cx([
      s.root,
      {
        [s.visible]: visible,
      },
    ])}
    onClick={handleClick}
  >
    <FontAwesome name="shopping-cart" className={s.icon} />
    <span className={s.label}>Add to Cart</span>
  </div>
);

AddToCard.defaultProps = {
  handleClick: () => {},
};
export default withStyles(s)(AddToCard);
