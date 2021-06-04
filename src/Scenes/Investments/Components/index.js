import React, {useState} from 'react';
import './style.css';
import { useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import {Icon} from "react-fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins, faCaretDown} from '@fortawesome/free-solid-svg-icons'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from "@material-ui/core/Typography";
import SelectComponent from "Components/SelectComponent";
import Alert from "Components/Common/Alert";
import Loader from 'react-loader-spinner';
import {transferBasicTokens} from "Services_chain/Contracts"

export default function InvestmentRecord (props){
    const classes = useStyles();

    const locked = useSelector((state)=> state.wallet.walletLocked)
    const user = useSelector(state => state.auth.user)

    const [transfered, setTransfered] = useState(false)
    const [processing, setTried] = useState(false)
    const [error, setError] = useState(false)

    const [selectedAccount, setSelectedAccount] = useState(0)

    const transferToken = (e)=>{
      e.preventDefault()
      let transfer = {
        investmentId: props.data._id,
        to : props.contacts[selectedAccount].address,
        toId: props.contacts[selectedAccount].contactId,
        senderName: user.name,
        contractAddress: props.data.contractAddress,
        amount: props.data.amount
      }
      transferBasicTokens(transfer, responsehandler)
    }

    const responsehandler = (msg, data)=>{
      if(msg === ""){
        setTransfered(true)
      }else{
        setError(true)
      }
    }

    const getContactsUI = ()=>{
      let contacts = []
      props.contacts.forEach((value, index)=>{
        contacts.push(value.name +" ("+ value.email+")")
      })
      return(
        <>
        <div className="input-group form-group">
          <span className="input-group-addon">Account</span>
          <SelectComponent listItem={contacts} setValue={setSelectedAccount}/>          
        </div>
        <div className="button-group form-group">
          <button className="btn btn-green" onClick={(e)=>transferToken(e)} disabled={locked} >Send Token</button>
        </div> 
       </>
      )
    }

    return(
      <>
      <Accordion className="investRecord">          
          <AccordionSummary
          expandIcon={<FontAwesomeIcon icon={faCaretDown} color="#0eaaa6"/> }
          aria-controls="panel1a-content"
          id="panel1a-header"
          >
          <div className={classes.column}>
              <Typography className={classes.heading}>Contract Address</Typography>
          </div>
          <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>{props.data.contractAddress}</Typography>
          </div>
          </AccordionSummary>
          <AccordionDetails>
              <FontAwesomeIcon style={{margin:"5px"}} icon={faCoins} color="#0eaaa6"/>
              <Typography variant="h6">
                  Amount {props.data.amount}
              </Typography>
          </AccordionDetails>
          <AccordionDetails>
              <Typography variant="body1">
                  Invested On {new Date(props.data.createdAt).toDateString()}
              </Typography>            
          </AccordionDetails>
          <AccordionDetails style={{paddingBottom:"3%"}}>            
            <div className={classes.column, classes.helper}>
              <Loader type="ThreeDots" color="#00A9A4" height={40} width={60} visible={processing}/>
              <Alert show={(error)?true: false} class="danger" message="Token transfered failed"  clearer={()=> setError(false)}/> 
              <Alert show={(transfered)?true: false} class="success" message="Token transfered successfully" clearer={()=> setTransfered(false)} /> 
              <Typography variant="body1">
                Select your contact to  send all tokens to:
                <br/>
                <br />
                {
                  getContactsUI()
                }
              </Typography>
            </div>
          </AccordionDetails>        
      </Accordion>
      <br/>
      </>
    )
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor:'#0eaaa6'
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightRegular,
  },
  secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
  },
  column: {
      flexBasis: '33.33%',
    },
  helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2),
    },
}));