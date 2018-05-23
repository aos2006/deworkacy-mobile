
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Slider.scss';
import Slick from "react-slick";
import Dots from './components/Dots/Dots';

class Slider extends PureComponent {
  state = {
    activeIndex: 0,
  }
  calculateItemsLength = (list, settings) => {
    if (settings.rows) {
      return list.length / (settings.rows * settings.slidesPerRow);
    }

    return list.length;
  }

  settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => this.setState({
      activeIndex: next,
    })
  };

  render() {
    return (
     <div className={cx([
       s.root,
       this.props.className,
     ])}>
       <Slick {...Object.assign({}, this.settings, this.props.settings)} ref={node => this.slider = node}>
         {this.props.children}
       </Slick>
       {this.props.settings.customDots && <Dots
         onClick={i => this.slider.slickGoTo(i)}
         activeIndex={this.state.activeIndex}
         className={this.props.dotsClass}
         count={this.calculateItemsLength(this.props.children, this.props.settings)}
       />}
     </div>
    )
  }
}
Slider.defaultProps = {
  settings: {
    customDots: true,
  }
}
export default withStyles(s)(Slider);
