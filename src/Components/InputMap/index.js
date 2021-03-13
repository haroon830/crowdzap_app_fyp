import * as React from 'react';
import './style.css';
import { Icon } from 'react-fa';
import Marker from './Components/Marker';
import { reverseGeo, googleAPIKey } from '../../Services/Geo';
import { Coords } from 'google-map-react';

const GoogleMapReact = require('google-map-react').default;


class InputMap extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      center: {lat: 10.766748, lng: 106.705785},
      marker: {
        position: {lat: 10.766748, lng: 106.705785}
      },
      zoom: 14,
      draggable: true,
      address_detail: ''
    };
    this.addressDetail=null;
  }
  center = () => {
    return {
      lat: this.state.marker.position.lat,
      lng: this.state.marker.position.lng
    };
  }
  onMapChange = (newMapState) => {
    this.setState(newMapState);
  }
  toggleMap = () => {
    this.setState({
      isShow: !this.state.isShow
    });
  }
  onDragMarker = (childKey, childProps, mouse) => {
    this.setState({
      draggable: false,
      marker: {
        position: {
          lat: mouse.lat,
          lng: mouse.lng
        }
      }
    });
  }
  onDragendMarker = (childKey, childProps, mouse) => {
    this.setState({ draggable: true });
    reverseGeo(this.state.marker.position.lat, this.state.marker.position.lng).then(rs => {
      if (rs) {
        this.setState({
          address_detail: rs.results[0].formatted_address
        });
      }
    });
  }
  showMap = () => {
    if (this.state.isShow) {
      return (
        <div className="searchMap">
        <GoogleMapReact
          draggable={this.state.draggable}
          center={this.state.center}
          zoom={14}
          bootstrapURLKeys={{
            key: googleAPIKey
          }}
          onChildMouseDown={this.onDragMarker}
          onChildMouseUp={this.onDragendMarker}
          onChildMouseMove={this.onDragMarker}
          onChange={this.onMapChange}
        >
          <Marker
            lat={this.state.marker.position.lat}
            lng={this.state.marker.position.lng}
          />
        </GoogleMapReact>
      </div>
      );
    }
    return <div className="searchMap" />;
  }
  render() {
    return (
      <div className="inputMap">
        <div className="input-group">
          <input type="text" value={this.state.address_detail} name="" id="" className="form-control" />
          <span className="input-group-btn">
            <button className="btn btn-green" onClick={this.toggleMap}>
              <Icon name="map" />
            </button>
          </span>
        </div>
        <div className={`mapWrapper${this.state.isShow ? ' active' : ''}`} >
          {this.showMap()}
        </div>
      </div>
    );
  }
}

export default InputMap;