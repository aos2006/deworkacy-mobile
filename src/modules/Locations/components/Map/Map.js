import React from 'react';
import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import { compose, withProps, lifecycle } from 'recompose';
import { checkingApp } from 'modules/utils';
import cx from 'classnames';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Map.scss';
import globalS from './globalStyles/index.scss';
import mapStyles from './styles';
import LazyLoad from 'react-lazyload';

const MyMapComponent = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAXyNGX1Uh6UrhcskvMhLCMFz7o_h7AJIk&libraries=geometry,drawing,places',
    loadingElement: (
      <div
        style={{ height: '100%', backgroundColor: '#151B21', width: '100%' }}
      />
    ),
    containerElement: (
      <div
        style={{ height: '100%', backgroundColor: '#151B21', width: '100%' }}
      />
    ),
    mapElement: (
      <div
        style={{ height: '110%', backgroundColor: '#151B21', width: '100%' }}
      />
    ),
    disableDefaultUI: true,
  }),
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap
    defaultZoom={14}
    defaultHeading={0}
    heading={0}
    center={props.defaultCenter}
    defaultOptions={{
      styles: mapStyles,
      disableDefaultUI: true,
    }}
  >
    {props.markers.map(marker => (
      <MarkerWithLabel
        {...marker}
        key={marker.id}
        position={marker.position}
        defaultIcon="marker.svg"
        labelAnchor={new google.maps.Point(50, 0)}
        labelStyle={{ paddingTop: '10px' }}
        icon="marker.svg"
        onClick={ev => {
          const center = `${marker.position.lat}, ${marker.position.lng}`;
          const isIos = !!navigator.platform.match(/iPhone|iPod|iPad/);
          let appWindow;
          try {
            appWindow = window.open(
              isIos ? `maps://maps.google.com/maps?daddr=${center}` : `comgooglemaps://?center=${center}`,
              '_blank',
            );
          } catch(e) {
            appWindow.location = `https://www.google.com/maps/search/?api=1&query=${center}`;
          }
        }}
      >
        <span className={s.label}>Построить маршрут</span>
      </MarkerWithLabel>
    ))}
  </GoogleMap>
));

class MyFancyComponent extends React.PureComponent {
  state = {
    isMarkerShown: false,
  };

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  };

  render() {
    return (
      <div className={cx([s.root, 'app-map', this.props.classes.root])}>
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
  classes: { root: '' },
  markers: [
    {
      id: 1,
      position: { lat: 55.740991, lng: 37.608957 },
    },
    {
      id: 2,
      position: { lat: 55.742177, lng: 37.615501 },
    },
    {
      id: 3,
      position: { lat: 55.766284, lng: 37.604382 },
    },
  ],
};
export default withStyles(globalS, s)(MyFancyComponent);
