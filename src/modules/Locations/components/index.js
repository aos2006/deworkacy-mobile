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

class Locations extends PureComponent {
  handleChange = i => this.props.locationChange(i);
  state = {
    clickedLocation: null,
  };

  handleClose = () =>
    this.setState({
      clickedLocation: null,
    });

  handleToggle = i =>
    this.setState({
      clickedLocation: i,
    });

  handleGoTo = () => {
    this.handleClose();
    this.props.handleGoTo();
  }

  render() {
    return (
      <div>
        <div className={cx([s.root, 'section'])}>
          <div className={s.map}>
            <div className={s.header}>
              <SectionHeader title="Локации"/>
            </div>
            <Card
              handleClose={this.handleClose}
              handleGoTo={this.handleGoTo}
              show={this.state.clickedLocation === 0}
              title={this.props.locations[0].title}
              address={this.props.locations[0].address}
              txt={this.props.locations[0].information}
            />
            <Card
              handleGoTo={this.handleGoTo}
              handleClose={this.handleClose}
              show={this.state.clickedLocation === 1}
              title={this.props.locations[1].title}
              address={this.props.locations[1].address}
              txt={this.props.locations[1].information}
            />
            <Card
              handleGoTo={this.handleGoTo}
              handleClose={this.handleClose}
              show={this.state.clickedLocation === 2}
              title={this.props.locations[2].title}
              address={this.props.locations[2].address}
              txt={this.props.locations[2].information}
            />
            <Map defaultCenter={this.props.position}/>
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
