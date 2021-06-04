import React, {Component} from "react";
import GoogleMapReact from 'google-map-react';
import Marker from 'Components/InputMap/Components/Marker';


class MapComp extends Component{
    constructor(props) {
        super(props);
        this.state = {
            center:  {lat: this.props.data.geoLocation.lat, lng: this.props.data.geoLocation.long }
        }
    }

    render(){
        return(
            <div
            role="tabpanel"
            hidden={this.props.value !== 1}
            id={'simple-tabpanel-0'}
            aria-labelledby={`simple-tab-0`}
            style={{paddingTop:"1%"}}
            >
                <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    center= {this.state.center}
                    zoom= {15}
                    onChange={this.onMapChange}
                    bootstrapURLKeys={{
                        key: 'AIzaSyAIzLQ2mPeFCSvf4qMTZwN5KyIUBpAexuc'
                    }}
                >
                     <Marker
                        lat={this.state.center.lat}
                        lng={this.state.center.lng}
                        
                    />
                </GoogleMapReact>
                </div>
            </div>
        )
    }
}

export default MapComp
