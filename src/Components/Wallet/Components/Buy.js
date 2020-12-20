import React, {Component} from "react";
import {CustomPaper} from "../../Common/CusomPaper"
import {CssTextField} from "../../Common/CustomOutLinedInput"
import {Typography, Button, Grid} from '@material-ui/core'

import {placeCryptoOrder} from '../../../services/Wallet'
import {connect} from 'react-redux'

class Buy extends Component{
    constructor(props){
        super(props)
        this.state={
            address:this.props.keys[0].address,
            nodeName:"",
            faitCurrencyTrn:"",
            amount:0
        }
        this.handleFormChange = this.handleFormChange.bind(this)
        this.placeOrder = this.placeOrder.bind(this)
    }
    handleFormChange(event){
        this.setState({
            [event.target.id] : event.target.value
        })        
    }

    //TODO::: VAlidate address "by creating seprate method that will be used through out application"
    placeOrder(event){
        event.preventDefault()
        if(
            this.state.address === "" ||
            this.state.nodeName === "" ||
            this.state.faitCurrencyTrn==="" ||
            this.state.amount === 0){
                alert("All fields must be provided")
        }else{
            let order = {
                "clientAddress": this.state.address,
                "amount": this.state.amount,
                "nodeName": this.state.nodeName,
                "fiatCurrencyTranId": this.state.faitCurrencyTrn,
                "transactionId": "chain hash from relchain"
            }
            this.props.placeCryptoOrder(order)
        }
        
    }
    render(){   
    
        return(
                <CustomPaper elevation={8} className="panel" style={{display:(this.props.showStatus === 'BUY')?'':'none'}}>
                    <CssTextField  id="address" onChange={this.handleFormChange} fullWidth  variant="outlined" value={this.props.keys[0].address} autoFocus='true' label="Account Address"/>
                    <Typography gutterBottom variant="body2" required component="h2" style={{paddingTop:'0%',paddingLeft:'2%'}}>
                      *Please enter only know REL address, otherwise funds will be lost
                    </Typography>

                    <Grid container spacing={1} direction={"row"} style={{marginTop:"7%"}}>
                        <Grid item xs={8} sm={6} md={6}>
                            <CssTextField  id="nodeName" required onChange={this.handleFormChange} fullWidth  variant="outlined" placeholder="Enter Node name to place order" label="Node Name"/>  
                        </Grid>
                        <Grid item xs={8} sm={6} md={6}>
                            <CssTextField  id="faitCurrencyTrn"  required onChange={this.handleFormChange} fullWidth  variant="outlined" placeholder="Enter Paypal transaction id" label="Papal Transcation"/>                   
                        </Grid>
                    </Grid>    
                    <Grid container spacing={1} direction={"row"} style={{marginTop:"7%"}}>
                                <Grid item xs={8} sm={4} md={4}>                  
                                    <CssTextField  id="amount" required onChange={this.handleFormChange} fullWidth variant="outlined" placeholder="0" label="Amount"/>
                                </Grid>
                                <Grid item xs={8} sm={4} md={4}>
                                    <Typography variant="body2" style={{paddingLeft:'10%'}}>
                                        Balance(REL)
                                    </Typography>
                                    <Typography variant="h5" style={{paddingLeft:'10%', color:'#f46b48'}}>
                                        0.000   
                                    </Typography>
                                </Grid>
                                <Grid item xs={8} sm={4} md={4}>                        
                                    <div className="submit" type="submit">
                                        <Button className="submit_btn" onClick={this.placeOrder}>Buy</Button>
                                    </div>  
                                </Grid>
                    </Grid>
                </CustomPaper>
        )
    }
}  
const mapStateToProps = state => ({
    keys: state.wallet.addresses
});
export default connect(
    mapStateToProps,
    {placeCryptoOrder}
)(Buy)