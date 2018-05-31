import React from 'react';
import {compose, withProps} from 'recompose';
import cx from 'classnames';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Map.scss';
// const {MarkerClusterer} = require("react-google-maps/lib/components/addons/MarkerClusterer");
import mapStyles from './styles';

const MyMapComponent = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBmOrSKmMpi4m6L2ycqjWF8a6wRCcAYDdc&libraries=geometry,drawing,places',
    loadingElement: <div style={{height: '100%', backgroundColor: '#151B21', width: '100%'}}/>,
    containerElement: <div style={{height: '100%', backgroundColor: '#151B21', width: '100%'}}/>,
    mapElement: <div style={{height: '100%', backgroundColor: '#151B21', width: '100%'}}/>,
    disableDefaultUI: true,
  }),
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap
    scrollwheel={false}
    defaultZoom={17}
    defaultHeading={0}
    heading={0}
    center={props.defaultCenter}
    defaultOptions={{
      styles: mapStyles,
      disableDefaultUI: true,
    }}>
    {props.markers.map(marker => (
      <Marker
        {...marker}
        key={marker.id}
        position={marker.position}
        icon="marker.svg"
      />
    ))}
  </GoogleMap>
));

class MyFancyComponent extends React.PureComponent {
  state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({isMarkerShown: true});
    }, 3000);
  }

  handleMarkerClick = () => {
    this.setState({isMarkerShown: false});
    this.delayedShowMarker();
  }

  render() {
    return (
      <div
        className={cx([
        s.root,
        'app-map',
        this.props.classes.root,
      ])}>
        <MyMapComponent
          markers={this.props.markers}
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
          defaultCenter={this.props.defaultCenter}
        />
      </div>
    );
  }
}


MyFancyComponent.defaultProps = {
  classes: {root: ''},
  markers: [
    {
      id: 1,
      position: {lat: 55.740991, lng: 37.608957}
    },
    {
      id: 2,
      position: {lat: 55.742177, lng: 37.615501}
    },
    {
      id: 3,
      position: {lat: 55.766284, lng: 37.604382}
    }
  ],
}
export default withStyles(s)(MyFancyComponent);

