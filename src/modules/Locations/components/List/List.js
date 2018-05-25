
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './List.scss';
import Slider from 'components/Slider';
import Item from './components/Item';
import globalS from './globalStyles/index.scss';

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
          className: cx([s.slider, 'locations-slider']),
        }}>
          {this.props.list.map((item, index) => (
            <Item
              from={index + 1}
              title={item.title}
              addr={item.address}
              to={this.props.list.length}
              key={item.id}
              isActive={index === this.props.activeLocation}
            />
          ))}
        </Slider>
      </div>
    )
  }
}

List.defaultProps = {
  list: [],
}
export default withStyles(globalS, s)(List);
