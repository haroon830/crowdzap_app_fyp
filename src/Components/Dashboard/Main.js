import React, {Component} from "react";
import ListedItems from './ListedItems'

class DashboardMain extends Component{
    render(){
        return(
            <div className="mainMarketPlace">
                <ListedItems></ListedItems>
            </div>
            
        )
    }
}

export default DashboardMain