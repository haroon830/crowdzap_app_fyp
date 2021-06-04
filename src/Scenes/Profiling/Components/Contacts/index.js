import React, {useState, useEffect} from "react";
import Contact from "./Components"
import {useSelector} from "react-redux"
import './style.css'
import Paper from "@material-ui/core/Paper"
import Loader from 'react-loader-spinner';
import Alert from "Components/Common/Alert";
import {getUserContacts, addNewUserContacts} from "Services/User"

function UserContacts(props) {
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")

    const [addReqStatus, setAddReqStatus] = useState(null)
    const [addLoading, setAddLoading] = useState(false)
    const [addError, setAddError] = useState(null)
    
    useEffect(()=>{
        setLoading(true)
        getUserContacts(responseHandler)
    }, [])

    const refresh = (e)=>{
        e.preventDefault()
        setLoading(true)
        getUserContacts(responseHandler)
    }
    const responseHandler = (msg, data)=>{
        setLoading(false)
        if(msg == ""){
            setContacts(data)
        }else{
            setError(msg)
        }
    }
    
    const getContactsUI =()=>{
        return(contacts.map((value, index)=>(
            <Contact index={1} data={value}/>
        )))               
    }

    const addNewContact = (e)=>{
        e.preventDefault()
        let contact = {
            name: name,
            email: email,
            address, address,
        }
        setAddLoading(true)
        addNewUserContacts(contact, responseAddContactHandler)
    }

    const responseAddContactHandler = (msg)=>{
        console.log(msg)
        setAddLoading(false)
        if(msg == ""){
            setAddReqStatus(true)
        }else{
            setAddError(msg)
        }
    }

    return(
        <>
           <div className="dashboardTitle">
              <h3>Contacts</h3>
           </div>
           <div className="details mainContacts">
               <Paper style={{padding:"3%", paddingRight:"10%", paddingLeft:"10%", marginRight:"15%", marginLeft:"15%"}} elevation="3">
                <form>
                    <Loader type="Dots" color="#00A9A4" height={60} width={60} visible={addLoading}/>      
                    <Alert show={(addReqStatus)?true:false} class="success" message="Contact Added successfully" clearer={()=>setAddReqStatus(null)} />                                   
                    <Alert show={(addError)?true:false} class="danger" message={setAddError} clearer={()=>setAddError(null)} /> 
                    <div className="input-group form-group">
                        <span className="input-group-addon">Name</span>
                        <input type="text" onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="Name" />
                    </div>
                    <div className="input-group form-group">
                        <span className="input-group-addon">Email</span>
                        <input type="text" onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Email" />
                    </div>
                    <div className="input-group form-group">
                        <span className="input-group-addon">Address</span>
                        <input type="text" onChange={(e)=>setAddress(e.target.value)} className="form-control" placeholder="Address" />
                    </div>
                    <button className="btn btn-green btn-lg"
                            style={{marginBottom:"2%", marginLeft:'10px'}}
                            onClick={(e)=>addNewContact(e)}
                        >
                        Add New Contact
                        </button>
                </form>
                </Paper>
                <br/>
                <br/>
                <Loader type="Dots" color="#00A9A4" height={60} width={60} visible={loading}/>                                        
                <Alert show={(error)?true:false} class="danger" message={error} />   
                        <button className="btn btn-green btn-lg"
                            style={{marginBottom:"2%", marginLeft:'10px'}}
                            onClick={(e)=>(refresh(e))}
                        >
                        Refresh
                        </button>   
                {getContactsUI()}
           </div>
       </>
    )
}

export default UserContacts