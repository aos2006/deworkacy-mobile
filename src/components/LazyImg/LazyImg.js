
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LazyImg.scss';
import Loader from 'components/Loader';

class LazyImg extends Component {
  constructor(props) {
    super()
    this.state = {
      dataUrl: props.dataSrc,
      src: null,
      isLoaded: false,
    }
  }

  handleLoad = (ev) => {
    this.setState({
      isLoaded: true,
    })
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.startLoad && !this.state.src) {
      this.setState({
        src: this.props.dataSrc,
      })
    }
  }

  componentDidMount() {
    if (this.props.startLoad && !this.state.src) {
      this.setState({
        src: this.props.dataSrc,
      })
    }
    this.img.addEventListener('load', this.handleLoad);
  }

  componentWillUnmount() {
    this.img.removeEventListener('load', this.handleLoad);
  }

  render() {
    return (
      <div className={cx([
        s.root,
        this.props.className,
      ])}>
        {this.props.startLoad ? (
          this.state.isLoaded ? null : (<Loader hide={false} className={cx([
            s.loader,
            this.props.loaderClassName
          ])}/>)
        ) : null}
        <img src={this.state.src} ref={node => this.img = node} className={cx([
          s.img,
          {
            [s.fadeOut]: this.state.isLoaded,
          }
        ])} />
      </div>
    )
  }
}

LazyImg.defaultProps = {
  img: {},
  lazySettings: {},
};

export default withStyles(s)(LazyImg);
