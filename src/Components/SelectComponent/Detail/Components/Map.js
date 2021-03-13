import React, {Component} from "react";

class MapComp extends Component{

    render(){
        return(
            <div
                role="tabpanel"
                hidden={this.props.value !== 1}
                id={'simple-tabpanel-0'}
                aria-labelledby={`simple-tab-0`}
                className="listedPropDetail"
            >
            </div>
        )
    }
}

export default MapComp