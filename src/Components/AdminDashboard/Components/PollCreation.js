import React, {Component} from "react";
import {Button, Grid, Typography} from "@material-ui/core";
import {CssTextField} from "../../Common/CustomOutLinedInput";

class PollCreation extends Component{
    constructor(props){
        super(props)
        this.state={
            docType:"buyCrypto",
            docDesc:"Upload ID Card"
        }
        this.docButtonStyle = {background:"#fbfbfb", color:"#2f3339"}
        //binding func
        this.changeDocType = this.changeDocType.bind(this)
    }

    changeDocType(event){
        if(event === "buyCrypto"){
            this.setState({
                docType:"buyCrypto",
                docDesc:"Upload ID Card"
            })
        }else{
            this.setState({
                docType:"mintCrypto",
                docDesc:"Upload Driving License"
            })
        }
    }
    render(){
        return(
            <div
                role="tabpanel"
                hidden={this.props.value !== 1}
                id={'simple-tabpanel-0'}
                aria-labelledby={`simple-tab-0`}
                className="adminDashboard"
            >
                <Grid container spacing={1} direction={"row"}>
                    <Grid item xs={12} sm={10} md={10}>
                        <div class="pollTypes">
                            <Typography variant="h4">Create Poll</Typography>
                            <Typography variant="subtitle1" className="subHeading">Poll Type</Typography>
                            <Grid container spacing={0} direction={"row"}>
                                <Grid item xs={6} sm={4} md={4}>
                                    <Button className="docTypeBtn" onClick={()=>this.changeDocType("buyCrypto")} style={(this.state.docType === "buyCrypto")?this.docButtonStyle:{}}>Get Crypto</Button>
                                </Grid>
                                <Grid item xs={6} sm={4} md={4}>
                                    <Button className="docTypeBtn" onClick={()=>this.changeDocType("mintCrypto")} style={(this.state.docType === "mintCrypto")?this.docButtonStyle:{}}>Mint Crypto</Button>
                                </Grid>
                            </Grid>
                            <div className="numFields">
                                <Grid container spacing={1} direction={"row"}>

                                    <Grid item xs={8} sm={8} md={6}>
                                        <span className="fieldLabel"><p >Start Date</p></span>
                                        <CssTextField  id="custom-css-standard-input"   type="datetime-local" variant="outlined" placeholder="34202-8850535-1" autoFocus='true'/>
                                    </Grid>
                                    <Grid item xs={8} sm={8} md={6}>
                                        <span className="fieldLabel"><p>Expiry Date</p></span>
                                        <CssTextField  id="custom-css-standard-input"  variant="outlined" type="datetime-local" label="" />
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </Grid>
                </Grid>

            </div>
        )
    }
}

export default PollCreation