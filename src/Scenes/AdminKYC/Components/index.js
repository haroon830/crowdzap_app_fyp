import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import {useSelector} from "react-redux";
import {Button,TextField} from '@material-ui/core';
import pic from "assests/profile.svg"
import {getAllKYCRequests, processKYCRequest} from "Services/Setting"

import Loader from 'react-loader-spinner';
import Alert from "Components/Common/Alert";
import Chip from '@material-ui/core/Chip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faSpinner} from '@fortawesome/free-solid-svg-icons'
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor:"white", 
        borderRadius:10, 
        height:350,
    },
    textField: {
        backgroundColor:"white", 
        borderRadius:5, 
        width:"80%", 
        marginLeft:"4%", 
        marginTop:"4%"
    },
    btn: {
        float:"right",
        fontSize: 12, 
        color: "primary", 
        padding: 10, 
        borderRadius: 5,  
        marginTop:"5%", 
        marginRight:"4%"
    } 
}));

export default function KYCRequest() {
    const classes = useStyles();

    const [kycRequest, setKYCRequests] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [kycProcessRequestSucceed, setKycProcessRequestSucceed] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [processError, setProcessError] = useState(false)

    useEffect(()=>{
        setLoading(true)
        getAllKYCRequests(responseHandler)
    },[])

    const refresh = (e)=>{
        e.preventDefault()
        setLoading(true)
        getAllKYCRequests(responseHandler)
    }
    const responseHandler = (msg, data)=>{
        setLoading(false)
        if(msg == ""){
            setKYCRequests(data)
        }else{
            setError(msg)
        }
    }

    const processRequest = (request, status)=>{
        let data ={
            requestId: request._id,
            status: status
        }
        processKYCRequest(responseProcessKYCHandler, data)
    }

    const responseProcessKYCHandler = (msg)=>{
        setProcessing(false)
        if(msg == ""){
            setKycProcessRequestSucceed(true)
        }else{
            setProcessError(true)
        }
    }

    const getKycRequestsUI =()=>{
        console.log("called")
        return(
            kycRequest.map((value, key)=>(
                <div style={{display:"flex"}}>
                    <Paper className={classes.paper} elevation={3}  style={{marginLeft:"20%", marginTop:"3%", width:"20%"}}>
                        <br />
                        <Paper className={classes.paper} elevation={3} style={{width:"70%", height:"40%", margin:"auto"}}>
                            <img style={{borderRadius:10}} width="100%" height="100%" src={value.doc}/>
                        </Paper>
                        <br />
                        <Paper className={classes.paper} elevation={3} style={{width:"70%", height:"40%", margin:"auto"}}>
                            <img style={{borderRadius:10}} width="100%" height="100%" src={value.addressProof}/>
                        </Paper>
                        <br />
                    </Paper>

                    <Paper elevation={3}  style={{backgroundColor:"#0EAAA6",marginTop:"3%", width:6}}></Paper>
                    
                    <Paper className={classes.paper} elevation={3}  style={{marginTop:"3%", width:"40%"}}>
                     
                        
                        <div style={{margin:"4%"}}>
                            {
                                value.status === "rejected"?
                                    <Chip
                                    icon={<FontAwesomeIcon icon={faTimes}  color="#0eaaa6"/>}
                                    label="Rejected"                                
                                    color="rgb(220 20 60)"
                                    />
                                :
                                 value.status === "pending"?
                                    <Chip
                                    icon={<FontAwesomeIcon icon={faSpinner}  color="#0eaaa6"/>}
                                    label="Pending"                                
                                    color="rgb(173 152 7)"
                                    />
                                    : 
                                    <Chip
                                    icon={<FontAwesomeIcon icon={faCheck}  color="#0eaaa6"/>}
                                    label="Accepted"                                
                                    color="#0eaa28"
                                    backgroundColor="#0eaa28"
                                    />
                        }
                            
                        </div>
                        <div style={{margin:"7%"}}>
                            <Typography gutterBottom variant="h5" className="totalInvest">
                               Name : {value.name}
                            </Typography>
                            <Typography gutterBottom variant="body1" >
                                Identity Card Number : {value.number}  
                            </Typography>
                            <Typography gutterBottom variant="body1">
                                Card Expiry Date : {value.expiry} 
                            </Typography>
                        </div>
                        <br />                       
                        <Button 
                            className={classes.btn} 
                            onClick={()=> processRequest(value, "accepted")} 
                            variant="contained" 
                            color="primary" 
                            style={{ backgroundColor: "#0EAAA6"}}
                            >
                            Accept
                        </Button>
                        <Button 
                            className={classes.btn} 
                            onClick={()=> processRequest(value, "rejected")} 
                            variant="contained" 
                            color="primary" 
                            style={{ backgroundColor: "crimson"}}
                            >
                            Reject
                        </Button>
                    </Paper>
                </div>
            ))
        )
    }

    return (
        <div style={{marginTop:"2%"}}>                                                
            <Alert show={(error)?true:false} class="danger" message={error} clearer={()=>setError(null)} /> 
            <Loader type="Dots" color="#00A9A4" height={60} width={60} visible={loading}/>

            <Alert show={(processError)?true:false} class="danger" message={"Failed to proccess kyc request"} clearer={()=>setProcessError(false)} /> 
            <Alert show={(kycProcessRequestSucceed)?true:false} class="success" message={"Successfully proccess kyc request"} clearer={()=>setKycProcessRequestSucceed(false)} /> 
            <Loader type="Dots" color="#00A9A4" height={60} width={60} visible={processing}/>

            <button className="btn btn-green btn-lg"
                style={{marginBottom:"2%", marginLeft:'10px'}}
                onClick={(e)=>(refresh(e))}
            >
            Refresh
            </button>   
            {getKycRequestsUI()}
            <br/>
            <br/>
       </div>
    );
}