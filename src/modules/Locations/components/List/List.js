
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './List.scss';
import Slider from 'components/Slider';
import Item from './components/Item';

class List extends PureComponent {
  state = {
    activeIndex: 0,
  }

  render() {
    return (
      <div className={cx([
        s.root,
      ])}>
        <Slider settings={{
          customDots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "30px",
          infinite: true,
          beforeChange: (current, next) => {},
          afterChange: current => this.props.onLocationChange(current),
          className: s.slider,
        }}>
          {[1, 2, 3].map((item, index) => (
            <Item
              from={item}
              to={3}
              key={index}
              isActive={index === this.props.activeLocation}
            />
          ))}
        </Slider>
      </div>
    )
  }
}

export default withStyles(s)(List);
