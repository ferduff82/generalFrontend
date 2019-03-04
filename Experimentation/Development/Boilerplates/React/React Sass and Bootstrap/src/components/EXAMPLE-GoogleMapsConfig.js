
import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react';
 
class MapContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      routeCords: [],
      breadCrumbs: [],
      bounds: {},
      activeMarker: {},
      selectedPlace: {},
      firstMarkerState: {},
      secondMarkerState: {}
    };
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  componentDidMount() {

    const self = this;

    function timeOutCall() {

      /* Get inital coords when ready */

      let dataLat = (self.props.mapContainerData.mr) ? self.props.mapContainerData.mr.geo.lat : 0,
          dataLong = (self.props.mapContainerData.mr) ? self.props.mapContainerData.mr.geo.lon : 0;

      /* Determine Map Limit */
      
      const routeCords = [
        {lat: dataLat, lng: dataLong},
        {lat: -34.622579, lng: -58.441264}
      ];
  
      let bounds = new self.props.google.maps.LatLngBounds();
      for (let i = 0; i < routeCords.length; i++) {
        bounds.extend(routeCords[i]);
      }

      /* Set Map State */

      self.setState({
        firstMarkerState: {lat: dataLat, lng: dataLong},
        routeCords: routeCords,
        secondMarkerState: {lat: -34.622579, lng: -58.441264},
        bounds: bounds
      });

      /* Call interval to get position change */

    } setTimeout(timeOutCall, 1000);
  }

  render() {
    return (
      <Map google={this.props.google} zoom={20} bounds={this.state.bounds} onClick={this.onMapClicked}>
        <Polyline
          path={this.state.routeCords}
          strokeColor="#42a5f5"
          icon="lineSymbol"
          strokeOpacity={0.8}
          strokeWeight={4} />
        <Marker
          name={'SOMA'}
          position={this.state.firstMarkerState} 
          onClick={this.onMarkerClick}/>
        <Marker
          name={'Dolores park'}
          position={this.state.secondMarkerState} 
          onClick={this.onMarkerClick}/>
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBexD8Iv8DROSjaOTKMetx6zOrJHIscsTw')
})(MapContainer)
