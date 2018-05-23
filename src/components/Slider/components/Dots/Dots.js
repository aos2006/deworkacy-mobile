import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Dots.scss';

class Dots extends PureComponent {
  handleClick = (i, fn) => () => fn(i);

  generateDots(count) {
    const box = [];
    for (let i = 0; i < count; i++) {
      box.push(<li key={i} className={cx([
        s.item,
        {
          [s.active]: this.props.activeIndex === i
        }
      ])} onClick={this.handleClick(i, this.props.onClick)} />)
    }
    return box;
  }

  render() {
    return (
      <ul className={cx([
        s.root,
        this.props.className,
      ])}>
        {this.generateDots(this.props.count)}
      </ul>
    )
  }
}

export default withStyles(s)(Dots);
