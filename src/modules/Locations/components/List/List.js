
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './List.scss';
import Slider from 'components/Slider';
import Item from './components/Item';
import globalS from './globalStyles/index.scss';
import Card from '../Card';

class List extends PureComponent {
  state = {
    activeIndex: 0,
  }

  handleToggle = (fn, i) => () => this.props.handleToggle(fn, i);

  render() {
    return (
      <div className={cx([
        s.root,
      ])}>
        <Slider
          settings={{
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
          {({ goToSlide }) => {
            return this.props.list.map((item, index) => (
              <div>
                <Item
                  id={index}
                  onClick={this.handleToggle(goToSlide, index)}
                  from={index + 1}
                  title={item.title}
                  addr={item.address}
                  to={this.props.list.length}
                  key={item.id}
                  isActive={index === this.props.activeLocation}
                />
              </div>
            ))

          }}
        </Slider>
      </div>
    )
  }
}

List.defaultProps = {
  list: [],
}
export default withStyles(globalS, s)(List);
