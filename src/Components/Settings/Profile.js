import React, {Component} from "react";

class KYC extends Component{
    render(){
        return(
            <div 
            role="tabpanel"
            hidden={this.props.value !== 1}
            id={'simple-tabpanel-1'}
            aria-labelledby={`simple-tab-1`}
            >
                <h1>KYC Zindabad and go for it</h1>
            </div>
        )
    }
}

export default KYC