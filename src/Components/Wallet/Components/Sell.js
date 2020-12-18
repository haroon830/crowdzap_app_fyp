import React, {Component} from "react";
import {CustomPaper} from "../../Common/CusomPaper"
import {CssTextField} from "../../Common/CustomOutLinedInput"
import {Typography, Button, Grid} from '@material-ui/core'

class Sell extends Component{
    handleFormChange(event){
        this.setState({
            [event.target.id] : event.target.value
        })
        
    }
    render(){    
        return(
            <CustomPaper elevation={8} className="panel" style={{display:(this.props.showStatus === 'SEND')?'':'none'}}>
                    <CssTextField  id="address" onChange={this.handleFormChange} fullWidth  variant="outlined" placeholder="Enter REL address" autoFocus='true' label="Recipent Address"/>
                    <Typography gutterBottom variant="body2" component="h2" style={{paddingTop:'0%',paddingLeft:'2%'}}>
                      *Please enter only know REL address, otherwise funds will be lost
                    </Typography>

                    <br/>
                    <br/> 
                    <br/>      
                    <CssTextField  id="name" onChange={this.handleFormChange} fullWidth  variant="outlined" placeholder="Enter a label for this address to add it into your addressbook" label="Label"/>                    
                      
                    <Grid container spacing={1} direction={"row"} style={{marginTop:"7%"}}>
                                <Grid item xs={8} sm={4} md={4}>                  
                                    <CssTextField  id="name" onChange={this.handleFormChange} fullWidth  variant="outlined" placeholder="0" label="Amount"/>
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
                                        <Button className="submit_btn" onClick={this.handleSubmit}>Sell</Button>
                                    </div>  
                                </Grid>
                    </Grid>
                </CustomPaper>
        )
    }
}  
  
export default Sell