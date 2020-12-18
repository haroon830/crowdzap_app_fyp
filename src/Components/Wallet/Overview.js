import { Grid, Button } from "@material-ui/core";
import { connect } from "react-redux";
import React, {Component} from "react";
import {processKyc} from '../../services/Setting'
import Balance from "./Components/Balance";
import ActiveAccount from "./Components/ActiveAccount";
import RecentTransactions from "./Components/RecentTransactions"

class Overview extends Component{

    render(){
        return(
            <div 
            role="tabpanel"
            hidden={this.props.value !== 0}
            id={'simple-tabpanel-0'}
            aria-labelledby={`simple-tab-0`}
            className="kycMain"
            >
                <Grid container spacing={1} direction={"row"}>                
                    <Grid item xs={12} sm={8} md={8}>                        
                        <ActiveAccount/>
                        <br/>
                    </Grid> 
                    <Grid item xs={12} sm={4} md={4}>
                        <Balance/>
                    </Grid> 
                </Grid>         

            </div>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.setting.kycPassed,
});
export default connect(
    mapStateToProps,
    { processKyc}
)(Overview)