import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faSave} from '@fortawesome/free-solid-svg-icons'
import { Fab, Tooltip } from '@material-ui/core';
import {useSelector} from "react-redux";
import {Button,TextField} from '@material-ui/core';
import image from "assests/profile.svg"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(5),
            width: theme.spacing(80),
            height: theme.spacing(65),
        },
    },
}));

export default function UserProfile() {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState(null);
    const user = useSelector(state => state.auth.user)
    
    const save = () => {
        alert("Saved")
      }

    const handleChange = function loadFile(event) {
        if (event.target.files.length > 0) {
            const file = URL.createObjectURL(event.target.files[0]);
            setFile(file);
        }
    };

    const toggleNavigation = () => {
        setOpen(!open);
    }

    return (
        <>
        <div className="dashboardTitle">
            <h2>User Profile</h2>
        </div>
        <div style={{display:"flex"}}>
            <Paper elevation={3}  style={{backgroundColor:"#e7e7e7", borderRadius:10, marginLeft:"24%", marginTop:"3%", height:"auto", width:"20%"}}>
                    <div style={{marginLeft:"24%", marginTop:"5%", width: "60%"}}>
                        <br />
                        <input type="file" onChange={handleChange} id="upload" accept="image/*" style={{display: "none"}}/>
                        <Avatar id="avatar" src={file}
                                style={{
                                    marginTop:"25px",
                                    height:"170px",
                                    width:"170px",
                                    
                                }}
                                >
                                    <img src={image} alt="Profile Pic" width="100%" />
                        </Avatar>
                        <label htmlFor="upload">
                        <Tooltip title="Upload" aria-label="Upload" style={{marginRight:40}}>
                            <IconButton style={{color:"#b20000", marginLeft:10}} aria-label="upload picture" component="span">
                             <FontAwesomeIcon style={{margin:"5px"}} icon={faUpload} color="#0eaaa6"/>
                            </IconButton>
                        </Tooltip> 
                        </label>
                        <span style={{display:"inline-block"}}>

                            <Tooltip title="Save" aria-label="Save">
                                <IconButton style={{color:"#458728", marginLeft:26}}>
                                <FontAwesomeIcon style={{margin:"5px"}} icon={faSave} color="#0eaaa6"/>
                                </IconButton>
                            </Tooltip>  
                        </span>
                        <br />
                    </div>
                    <h3 style={{color:"#575050", textAlign:"center"}}>{(user)?user.name:""}</h3>
                </Paper>

            <Paper elevation={3}  style={{backgroundColor:"#0eaaa6",marginTop:"3%", height:"auto", width:6}}></Paper>
            
            <Paper elevation={3}  style={{backgroundColor:"#e7e7e7", borderRadius:10, marginTop:"3%", height:"auto", width:"34%"}}>
                <p style={{color: "#575050", fontSize:16, fontWeight:"bolder", margin:20, marginTop:60}}>Profile</p>
                <form>
                <TextField
                    fullWidth
                    label="Name"
                    name="Name"
                    style={{backgroundColor:"white", borderRadius:5, width:"58%", marginLeft:"4%"}}
                    // onChange={handleChange}
                    required
                    value={user.name}
                    variant="outlined"
                />
                <Button onClick={save} variant="contained" color="primary" style={{float:"right", marginRight:18, fontSize: 12, color: "#575050", padding: 10, borderRadius: 5, backgroundColor: "#0eaaa6" }}>
                    Update Name
                </Button>
                </form>
                <TextField
                    fullWidth
                    label="Email"
                    name="Email"
                    style={{backgroundColor:"white", borderRadius:5, width:"58%", marginLeft:"4%", marginTop:"2%"}}
                    // onChange={handleChange}
                    required
                    value={user.email}
                    variant="outlined"
                    disabled
                />
                <TextField
                    fullWidth
                    label="Role"
                    name="Role"
                    style={{backgroundColor:"white", borderRadius:5, width:"58%", marginLeft:"4%", marginTop:"2%"}}
                    // onChange={handleChange}
                    required
                    value={user.role}
                    variant="outlined"
                    disabled
                />
                <p style={{color: "#575050", fontSize:16, fontWeight:"bolder", margin:20}}> Change Password</p>
                <form>
                <TextField
                    fullWidth
                    label="Enter New Password"
                    name="Enter New Password"
                    style={{backgroundColor:"white", borderRadius:5, width:"58%", marginLeft:"4%"}}
                    // onChange={handleChange}
                    required
                    // value={user.name}
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    label="Confirm New Password"
                    name="Confirm New Password"
                    style={{backgroundColor:"white", borderRadius:5, width:"58%", marginLeft:"4%", marginTop:"2%"}}
                    // onChange={handleChange}
                    required
                    // value={user.name}
                    variant="outlined"
                />
                <Button onClick={save} variant="contained" color="primary" style={{marginTop:"2%", float:"right", marginRight:18, fontSize: 12, color: "#575050", padding: 10, borderRadius: 5, backgroundColor: "#0eaaa6" }}>
                    Update Password
                </Button>
                </form>
                <br/>
                <br/>
            </Paper>
        </div>
        </>        
    );
}