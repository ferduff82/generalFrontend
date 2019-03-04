
import React from 'react';
 
class MapContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstMarkerState: {},
      secondMarkerState: {}
    };
  }

  componentDidMount() {

    const self = this;

    function timeOutCall() {

      /* Get inital coords when ready */

      let dataLat = (self.props.mapContainerData.mr) ? self.props.mapContainerData.mr.geo.lat : 0,
          dataLong = (self.props.mapContainerData.mr) ? self.props.mapContainerData.mr.geo.lon : 0;

      self.setState({
        firstMarkerState: {lat: dataLat, lng: dataLong},
        secondMarkerState: {lat: -34.622579, lng: -58.441264}
      });

      /* Call interval to get position change */

    } setTimeout(timeOutCall, 1000);
  }

  render() {
    return (
      <div>
        <iframe frameBorder="0" className="iframe-styles"
src="https://www.google.com/maps/embed/v1/directions?origin=-34.5549108,-58.467122&destination=-34.5516776,-58.4548592&key=AIzaSyBexD8Iv8DROSjaOTKMetx6zOrJHIscsTw&zoom=14" allowFullScreen></iframe>
      </div>
    )
  }
}

export default MapContainer