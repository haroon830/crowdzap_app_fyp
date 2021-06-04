import React, {useState, useEffect} from 'react';
import './style.css';
import Dashboard from "Components/DashboardLayout";
import {useSelector} from "react-redux"
import InvestmentRecord from './Components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSyncAlt} from '@fortawesome/free-solid-svg-icons'
import {getUserInvestments} from "Services/InvestmentPortfolio"
import {getUserContacts} from "Services/User"
import Loader from 'react-loader-spinner';
import Alert from "Components/Common/Alert";

function InvestmentsManagment (){
    const [records, setRecords] = useState([])
    const [tried, setTried] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [contacts, setContacts] = useState([])
    const [errorContact, setErrorContact] = useState(null)

    const locked = useSelector((state)=> state.wallet.walletLocked)

    useEffect(()=>{
        setLoading(true)
        getUserInvestments(responseInvestmentsHandler)
        getUserContacts(responseContactHandler)
    }, [])

    const refresh = ()=>{
        setLoading(true)
        getUserInvestments(responseInvestmentsHandler)
        getUserContacts(responseContactHandler)
    }
    const responseInvestmentsHandler = (msg, data)=>{
        setLoading(false)
        setTried(true)
        if(msg == ""){
            setRecords(data)
        }else{
            setError(msg)
        }
    }

    const responseContactHandler = (msg, data)=>{
        if(msg == ""){
            setContacts(data)
        }else{
            setErrorContact(msg)
        }
    }

    const getRecordsUI = ()=>{
        //if no reccord founded
        if(tried && !error && records.length === 0){
            return(<Alert show="true" class="info" message="No Investment founded"/>)
        }else{
            return(
                records.map((value, index)=>(
                    <InvestmentRecord index={index} data ={value} contacts={contacts}/>
                ))
            )
        }
    }

    return (
        <div className="walletPage">
             <Dashboard>
                    <div className="dashboardTitle">
                        <h3>INVESTMENTS</h3>
                    </div>
                    <div className="details mianInvestment">                
                        <Loader type="Dots" color="#00A9A4" height={60} width={60} visible={loading}/>                                        
                        <Alert show={(error)?true:false} class="danger" message={error} />    
                        <Alert show={(locked)?true:false} class="danger" message="Unlock wallet before before any operation" />       
                        <Alert show={(errorContact)?true:false} class="info" message={error} clearer={()=>setErrorContact(null)} />   
                        { !loading &&
                            <div className="refresh" style={{float:"left"}}>
                                <ul>
                                    <li className="active" style={{borderColor:"#0eaaa6" ,color:"#0eaaa6"}} onClick={refresh}>
                                        <FontAwesomeIcon icon={faSyncAlt} color="#0eaaa6"/>  Refresh
                                    </li>
                                </ul>               
                            </div>
                        }                        
                        <br/>
                        <br/>
                        <br/>
                        {
                            getRecordsUI()
                        }
                    </div>
            </Dashboard>
        </div>
    )
}

export default InvestmentsManagment;