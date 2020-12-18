import React, {Component} from "react";

class AssetContracts extends Component{
    images = [
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
    ];
    render(){
        return(
            <div
                role="tabpanel"
                hidden={this.props.value !== 2}
                id={'simple-tabpanel-0'}
                aria-labelledby={`simple-tab-0`}
                style={{paddingTop:"1%"}}
                className="adminDashboard"
            >
                <h1>Asset contracts</h1>
            </div>
        )
    }
}
export default AssetContracts