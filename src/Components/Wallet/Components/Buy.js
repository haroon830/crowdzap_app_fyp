import React, {Component} from "react";
import {CustomPaper} from "../../Common/CusomPaper"
import {CssTextField,CssSelectField} from "../../Common/CustomOutLinedInput"
import {Typography, Button, Grid, MenuItem} from '@material-ui/core'

class Buy extends Component{
    handleFormChange(event){
        this.setState({
            [event.target.id] : event.target.value
        })
        
    }
    render(){   
    
        return(
                <CustomPaper elevation={8} className="panel" style={{display:(this.props.showStatus === 'BUY')?'':'none'}}>
                    <CssTextField  id="address" onChange={this.handleFormChange} fullWidth  variant="outlined" placeholder="Enter REL address" autoFocus='true' label="Account Address"/>
                    <Typography gutterBottom variant="body2" component="h2" style={{paddingTop:'0%',paddingLeft:'2%'}}>
                      *Please enter only know REL address, otherwise funds will be lost
                    </Typography>

                    <Grid container spacing={1} direction={"row"} style={{marginTop:"7%"}}>
                        <Grid item xs={8} sm={6} md={6}>
                            <CssTextField  id="nodeName"  onChange={this.handleFormChange} fullWidth  variant="outlined" placeholder="Enter Node name to place order" label="Node Name"/>  
                        </Grid>
                        <Grid item xs={8} sm={6} md={6}>
                            <CssTextField  id="faitCurrencyTrn" type="select" onChange={this.handleFormChange} fullWidth  variant="outlined" placeholder="Enter Paypal transaction id" label="Papal Transcation"/>                   
                        </Grid>
                    </Grid>    
                    <Grid container spacing={1} direction={"row"} style={{marginTop:"7%"}}>
                                <Grid item xs={8} sm={4} md={4}>                  
                                    <CssTextField  id="name" onChange={this.handleFormChange} fullWidth variant="outlined" placeholder="0" label="Amount"/>
                                </Grid>
                                <Grid item xs={8} sm={4} md={4}>
                                    <Typography variant="body2" style={{paddingLeft:'10%'}}>
                                        Balance(REL)
                                    </Typography>
                                    <Typography variant="h5" style={{paddingLeft:'10%', color:'#f46b48'}}>
                                        24124   
                                    </Typography>
                                </Grid>
                                <Grid item xs={8} sm={4} md={4}>                        
                                    <div className="submit">
                                        <Button className="submit_btn" onClick={this.handleSubmit}>Buy</Button>
                                    </div>  
                                </Grid>
                    </Grid>
                </CustomPaper>
        )
    }
}  
  
export default Buy