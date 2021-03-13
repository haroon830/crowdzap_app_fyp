import { Grid, Button } from "@material-ui/core";
import { connect } from "react-redux";
import React, {Component} from "react";
import Fab from "@material-ui/core/Fab";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFileImage} from '@fortawesome/free-solid-svg-icons'
import {CssTextField} from "Components/Common/CustomInput"
import './style.css'
import {processKyc} from 'Services/Setting'

class KYC extends Component{
    constructor(props){
        super(props)
        this.state={
            docType:"ID",
            docDesc:"Upload ID Card",
            number:"",
            expiry:"",
            identityProof: null,
            addressPoof: null
        }
        this.docButtonStyle = {background:"#0EAAA6", color:"#2f3339"}
        //binding func
        this.changeDocType = this.changeDocType.bind(this)
        this.handleFormChange = this.handleFormChange.bind(this)
        this.handleUploadClick = this.handleUploadClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changeDocType(event){
        if(event === "ID"){
            this.setState({
                docType:"ID",
                docDesc:"Upload ID Card"
            })
        }else if(event === "Pass"){
            this.setState({
                docType:"Pass",
                docDesc:"Upload Passport"
            })
        }else{
            this.setState({
                docType:"DrvL",
                docDesc:"Upload Driving License"
            })
        }
    }

    handleFormChange(event){
        this.setState({
            [event.target.id] : event.target.value
        })
    }
    handleUploadClick(event){
        if(event.target.id === "contained-doc-file"){
            this.setState({ identityProof: event.target.files[0] });
        }else{
            this.setState({ addressProof: event.target.files[0] });
        }
    }

    handleSubmit(event){
        event.preventDefault()
        if(true/*this.validateinput()*/){
            let data = {
                ...this.state
            }
            this.props.processKyc(data)
        }
    }

    validateinput(){
        if(this.state.number === ""){
            console.log("Number must not be empty")
            return false
        }else if(this.state.expiry === ""){
            console.log("Expiry must not be empty")
            return false
        }else if(this.state.identityProof === null){
            console.log("Identity Image must not be empty")
            return false
        }else if(this.state.addressPoof === null){
            console.log("Address proof must not be empty")
            return false
        }
        return true
    }

    render(){
        return(
            <>
            <div className="dashboardTitle">
                <h2>KYC</h2>
            </div>
            <div style={{marginLeft:'2%'}}>
                <Grid container spacing={1} direction={"row"}>
                    <Grid item xs={12} sm={6} md={6}>
                        <div class="docTypes">
                            <h2>Required documents</h2>
                            {(this.props.user.kycStatus !== "") ?<h4 style={{color:'#f46b48'}}><br/> KYC STATUS : {this.props.user.kycStatus.toUpperCase() }</h4> : ""}
                            <p className="subHeading">KIND OF DOCUMENT</p>
                            <Grid container spacing={0} direction={"row"}>
                                <Grid item xs={4} sm={3} md={3}>
                                    <Button className="docTypeBtn" onClick={()=>this.changeDocType("ID")} style={(this.state.docType === "ID")?this.docButtonStyle:{}}>Id Card</Button>
                                </Grid>
                                <Grid item xs={4} sm={3} md={3}>
                                    <Button className="docTypeBtn" size="medium" onClick={()=>this.changeDocType("Pass")} style={(this.state.docType === "Pass")?this.docButtonStyle:{}}>Passport</Button>
                                </Grid>
                                <Grid item xs={4} sm={3} md={3}>
                                    <Button className="docTypeBtn" size="medium" onClick={()=>this.changeDocType("DrvL")} style={(this.state.docType === "DrvL")?this.docButtonStyle:{}}>Driving License</Button>
                                </Grid>
                            </Grid>
                            <div className="numFields">
                                <Grid container spacing={1} direction={"row"}>
                                    <Grid item xs={8} sm={5} md={5}>
                                        <CssTextField  id="number" onChange={this.handleFormChange}   variant="outlined" placeholder="34202-8850535-1" autoFocus='true' label="Number" />
                                    </Grid>
                                    <Grid item xs={8} sm={5} md={5}>
                                        <CssTextField id="expiry" onChange={this.handleFormChange}  variant="outlined" placeholder="MM/YY" label="Expiry Date" />
                                    </Grid>
                                </Grid>
                            </div>
                            <div className="hrDivder"></div>
                            <div className="uploadDoc">
                                <h3>{this.state.docDesc}</h3>
                                <p className="subHeading">We require both side of document</p>
                                <Grid container spacing={1} direction={"row"}>
                                    <Grid item xs={8} sm={10} md={10}>
                                        <div className="uploadDocBtn">
                                            <input
                                                accept="image/*"
                                                className="inputDoc"
                                                id="contained-doc-file"
                                                multiple
                                                style={{display:'none'}}
                                                type="file"
                                                onChange={this.handleUploadClick}
                                            />
                                            <label htmlFor="contained-doc-file">
                                                <Fab component="span" className="buttonDoc">
                                                    <FontAwesomeIcon icon={faFileImage} size="lg"  color="#0EAAA6" />
                                                </Fab>
                                            </label>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <div className="uploadDoc">
                            <h2>Proof of address</h2>
                            <h4>Upload documents</h4>
                            <p className="subHeading">Proof of address can be one of the following:</p>
                            <p className="subHeading">bank/credit card statement or utitlity bill.<a href="" style={{color:'#f46b48'}}>More</a></p>
                            <Grid container spacing={1} direction={"row"}>
                                <Grid item xs={8} sm={10} md={10}>
                                    <div className="uploadDocBtn">
                                        <input
                                            accept="image/*"
                                            className="inputDoc"
                                            id="contained-address-file"
                                            multiple
                                            style={{display:'none'}}
                                            type="file"
                                            onChange={this.handleUploadClick}
                                        />
                                        <label htmlFor="contained-address-file">
                                            <Fab component="span" className="buttonDoc">
                                                <FontAwesomeIcon icon={faFileImage} size="lg"  color="#0EAAA6" />
                                            </Fab>
                                        </label>
                                    </div>
                                    <div className="submit">
                                        <Button
                                            className="submit_btn"
                                            onClick={this.handleSubmit}
                                            disabled={(this.props.user.kycStatus !== "")?true:false}
                                        >Submit</Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
            </>
        )
    }
}
const mapStateToProps = state => ({
    user: state.auth.user
});
export default connect(
    mapStateToProps,
    { processKyc}
)(KYC)