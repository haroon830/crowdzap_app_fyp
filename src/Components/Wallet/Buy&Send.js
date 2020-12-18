import React, {Component} from "react";
import {CustomPaper} from "../Common/CusomPaper"
import {CssTextField} from "../Common/CustomOutLinedInput"
import {Typography, Button, Grid, Zoom} from '@material-ui/core'
import Sell from './Components/Sell'
import Buy from './Components/Buy'

class SendAndBuy extends Component{
    constructor(props){
        super(props)
        this.state={
            operationType: 'SEND',
            operationDesc: "Send REL Coins to another account"
        }
        this.buttonStyle = {background:"#fbfbfb", color:"#2f3339"}
        this.handleFormChange = this.handleFormChange.bind(this)
        this.changeActionType = this.changeActionType.bind(this)
    }
    changeActionType(event){
        if(event === "SEND"){
            this.setState({
                operationType:"SEND",
                operationDesc:"Send REL Coins to another account"
            })
        }else{
            this.setState({
                operationType:"BUY",
                operationDesc:"Buy REL Coins"
            })
        }
    }
    handleFormChange(event){
        this.setState({
            [event.target.id] : event.target.value
        })
        
    }
    render(){
        return(
            <div 
            role="tabpanel"
            hidden={this.props.value !== 2}
            id={'simple-tabpanel-1'}
            aria-labelledby={`simple-tab-1`}
            className="buy_send"
            >
                <div>
                      
                    <Typography gutterBottom variant="h5" component="h2">
                        Hello, send and buy coins here.
                        <Button className="actionTypeBtn" onClick={()=>this.changeActionType("BUY")}  style={(this.state.operationType === "BUY")?this.buttonStyle:{}}>BUY</Button>
                        <Button className="actionTypeBtn" onClick={()=>this.changeActionType("SEND")}  style={(this.state.operationType === "SEND")?this.buttonStyle:{}}>SEND</Button>                                    
                    </Typography>
                    <Typography gutterBottom variant="body1">
                        {this.state.operationDesc}
                    </Typography>
                              
                </div>
                <Buy showStatus={this.state.operationType}/>
                <Sell showStatus={this.state.operationType}/>
            </div>
        )
    }
}

export default SendAndBuy