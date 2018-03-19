
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import FontAwesome from 'react-fontawesome';
import cx from 'classnames';
import CardLabel from 'components/CardLabel/CardLabel';
import AddToCard from 'components/AddToCard';
import s from './Card.css';

class Card extends PureComponent {
  state = {
    visibleAddTo: false,
  }

  toggleVisibleAddTo = () => {
    if(this.props.labelType !== 'stock') {
      this.setState({
        visibleAddTo: !this.state.visibleAddTo,
      })
    }
  }

  render() {
    const {
      name,
      price,
      brand,
      labelType,
      labelTxt,
    } = this.props;

    return (
      <div
        className={s.root}
        onMouseEnter={this.toggleVisibleAddTo}
        onMouseLeave={this.toggleVisibleAddTo}
      >
        <div className={s.inner}>
          <AddToCard
            visible={this.state.visibleAddTo}
          />
          <header className={s.header}>
            <CardLabel
              type={labelType}>
              {labelTxt}
            </CardLabel>
            <FontAwesome
              name="heart"
              className={s.like}
            />
          </header>
        </div>
        <footer className={cx([
          s.footer,
          {
            [s.disabled]: labelType === 'stock',
          }
        ])}>
          <div className={s.footerHeader}>
        <span>
          {name}
        </span>
            <span>
          {price}
        </span>
          </div>
          <div className={s.brand}>
            {brand}
          </div>
        </footer>
      </div>
    )
  }
}

Card.propTypes = {
  price: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  labelTxt: PropTypes.string.isRequired,
  labelType: PropTypes.string.isRequired,
}

export default withStyles(s)(Card);
