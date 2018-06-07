import React, { PureComponent } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import Map from './Map';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Locations.scss';
import List from './List';
import * as types from '../actionTypes';
import * as actions from '../actions';
import SectionHeader from 'components/SectionHeader';
import Card from './Card';
import SectionDevider from 'components/SectionDevider';
import LazyLoad from 'react-lazyload';

class Locations extends PureComponent {
  handleChange = i => this.props.locationChange(i);
  state = {
    clickedLocation: null,
  };

  handleClose = () =>
    this.setState({
      clickedLocation: null,
    });

  handleToggle = (fn, i) => {
    if (this.props.activeLocation !== i) {
      return fn(i);
    }

    this.setState({
      clickedLocation: i,
    });
  };

  handleGoTo = () => {
    this.handleClose();
    this.props.handleGoTo();
  };

  render() {
    return (
      <div>
        <div className={cx([s.root, 'section', 'section-auto-height'])}>
          <div className={s.map}>
            <div className={s.header}>
              <SectionHeader title="Локации" />
            </div>
            {this.props.locations.map((item, index) => (
              <Card
                keyy={item.id}
                handleClose={this.handleClose}
                handleGoTo={this.handleGoTo}
                presents={item.presentationLinks}
                show={this.state.clickedLocation === index}
                title={item.title}
                address={item.address}
                txt={item.information}
              />
            ))}
            <LazyLoad once offset={500} height="570px">
              <Map defaultCenter={this.props.position}/>
            </LazyLoad>
            <div className={cx([s.list, 'locations-list'])}>
              <List
                handleToggle={this.handleToggle}
                list={this.props.locations}
                activeLocation={this.props.activeLocation}
                onLocationChange={this.handleChange}
              />
            </div>
          </div>
        </div>
        <SectionDevider />
      </div>
    );
  }
}

export default connect(
  state => {
    const activeLocation = state[types.NAME].activeLocation;
    console.log(activeLocation);
    return {
      activeLocation,
      position: state[types.NAME].entities[`${activeLocation}`].position,
    };
  },
  { locationChange: actions.locationChange },
)(withStyles(s)(Locations));
