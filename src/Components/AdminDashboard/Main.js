import React, {Component} from 'react'
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Polls from "./Components/Polls";
import PollCreation from "./Components/PollCreation";
import AssetContracts from "./Components/AssetContracts";
import CryptoOrders from "./Components/CryptoOrders";

class AdminDashBoard extends Component{
    constructor(props){
        super(props);
        this.state={
            value:0
        }
        this.handleChange = this.handleChange.bind(this)
        this.a11yProps = this.a11yProps.bind(this)
    }
    handleChange(event, newValue){
        console.log(newValue)
        this.setState({
            value:newValue
        })
    };
    a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    render() {
        return(
            <>
                <Paper>
                    <Tabs
                        indicatorColor="primary"
                        value= {this.state.value}
                        onChange={this.handleChange}
                        className="mainSettingPanel"
                    >
                        <Tab label="Polls" {...this.a11yProps(0)}/>
                        <Tab label="Poll Creation"{...this.a11yProps(1)}/>
                        <Tab label="Asset Creation" {...this.a11yProps(2)}/>
                        <Tab label="Crypto Orders" {...this.a11yProps(3)}/>
                    </Tabs>
                </Paper>
                <Polls value = {this.state.value}/>
                <PollCreation value = {this.state.value}/>
                <AssetContracts value={this.state.value}/>
                <CryptoOrders value={this.state.value}/>
            </>
        )
    }
}

export default AdminDashBoard