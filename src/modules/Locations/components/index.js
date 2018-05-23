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

class Locations extends PureComponent {
  handleChange = i => this.props.locationChange(i);

  render() {
    return (
      <div className={cx([
        s.root,
      ])}>
        <div className={s.map}>
          <div className={s.header}>
            <SectionHeader title="Локации"/>
          </div>
          <Map
            defaultCenter={this.props.position}
          />
          <div className={s.list}>
            <List
              activeLocation={this.props.activeLocation}
              onLocationChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => {
  const activeLocation = state[types.NAME].activeLocation;
  console.log(activeLocation);
  return {
    activeLocation,
    position: state[types.NAME].entities[`${activeLocation}`].position,
  }
}, { locationChange: actions.locationChange })(withStyles(s)(Locations));
