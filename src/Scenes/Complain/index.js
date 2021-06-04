import React, { Component, useState, useStyles } from 'react';
import Header from '../production/Header'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from '../production/theme';
import { Container, TextField, Grid } from '@material-ui/core';
//import {postComplain} from "../../Services/Users";
import {Link} from "react-router-dom";
import MainCard from "../Common/MainCard";
import pic from '../../assests/under C.svg'
import {Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import contact from "../../assests/contact.svg"
import { useSelector } from 'react-redux';

function Complain() {
  const [open , setOpen] = useState(false)
  const [subject , setSubject] = useState("")
  const [message , setMessage] = useState("")
  const [requestResponse, SetRequestResponse] = useState("")

  const user = useSelector(state => state.auth.user)

  const sendResponse = ()=>{
    let complain ={
      userRole: "user",
      userPicture: "image",
      userName:user.name,
      userId: user._id,
      description: message,
      title: subject,
      userEmail: user.email
    }
   // postComplain(complain, responseHandler)
  }

  const responseHandler = (msg)=>{
    SetRequestResponse(msg)
    {window.location.reload()}
  }
  

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
          <Header
            title={' Contact CoGIT'}
            openState={open}
            toggleNavigation={()=>setOpen(true)}
          />
          <div style={{width:"50%",marginTop:"5%", marginLeft  : '16%'}}>
            <h4 style={{color: "#b20000"}}>One Click Away</h4>
            <Paper elevation={3}  style={{backgroundColor:"silver", marginTop:"1%",height:"100%", float:"left", width:"30%", borderRadius:14}}>
              <div style={{ borderRadius:3, height:"48%", float:"left"}}>
                <img style={{marginTop:"4%"}} src={contact} alt="Logo" width="100%" height="100%"/>
              </div>
            </Paper>
          </div>
          <div style={{width:"50%", float:"left"}}>
          <Paper elevation={3}  style={{backgroundColor:"silver", borderRadius:10, marginLeft:"4%", marginTop:"1%", height:"450px"}}>
          <Container>
          {/* <h6>{requestResponse}</h6> */}
          <Grid>
                <form name="sentData" noValidate>
                <div className="field" style={{ paddingTop: 8, paddingBottom: 10, marginLeft: 20 }}>
                  <h4 style={{color: "#b20000"}}>Contact Us by sending us a message</h4>
                  <TextField
                    id="outlined-full-width"
                    fullWidth
                    margin="normal"
                    onChange={(e)=> setSubject(e.target.value)}
                    // InputLabelProps={{
                    //   shrink: true,
                    // }}
                    style = {{backgroundColor:"white",marginBottom: "2%", width:"80%", borderRadius:5}}
                    label="Subject"
                    type="text"
                    variant="outlined"
                    // style={{ width: 445, marginBottom: 40, marginTop: 20 }}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Description"
                    multiline
                    rowsMax={14}
                    rows="14"
                    onChange={(e)=> setMessage(e.target.value)}
                    style = {{backgroundColor:"white", borderRadius:5, marginBottom: "2%", width:"80%"}}
                    // value={value}
                    // onChange={handleChange}
                    variant="outlined"
                    />
                    {/* <input style={{fontSize:"medium"}} type="file" id="myFile" name="filename" /> */}
                <br />
                <div style ={{marginTop:"8%", float:"right", marginRight:0}}>
                  <Button
                   variant="contained" size="large" color="primary"
                   style={{fontSize:12,backgroundColor:"#b20000", marginBottom: "10px"}}
                   onClick={sendResponse}
                   >
                  Send
                </Button>
                  </div>
                </div>
                </form>
                </Grid>
          </Container>
          </Paper>
          </div>
      </MuiThemeProvider>
    );
}

export default Complain;

