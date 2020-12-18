import React, {Component} from "react";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Keys from './Keys'
import Overview from './Overview'
import SendAndBuy from './Buy&Send'

class WalletMain extends Component{
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
    render(){
        return(
            <>
            <Paper>
                <Tabs
                    indicatorColor="primary"
                    value= {this.state.value}
                    onChange={this.handleChange}
                    className="mainSettingPanel"
                >
                    <Tab label="Overview" {...this.a11yProps(0)}/>
                    <Tab label="Keys" {...this.a11yProps(1)}/>
                    <Tab label="Order Crypto"{...this.a11yProps(2)}/>
                </Tabs>
            </Paper>
            <Overview value = {this.state.value}/>
            <Keys value = {this.state.value}/>
            <SendAndBuy value = {this.state.value}/>
            </>
        )
    }
}

export default WalletMain