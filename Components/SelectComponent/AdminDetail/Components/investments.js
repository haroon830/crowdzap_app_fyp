import React, {useEffect, useState} from "react"
import { makeStyles } from '@material-ui/core/styles';
import {getContracDetailFromChain} from "Services/ListProperty"
import Typography from "@material-ui/core/Typography";
import Alert from 'Components/Common/Alert'
import Loader from 'react-loader-spinner'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";
import { blue } from "@material-ui/core/colors";

export default function Investments(props){
    const classes = useStyles();

    const [contractChainDetail, setContractChainDetail] = useState(null)
    const [loading, setLoadingState] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(()=>{
        setLoadingState(true)
        getContracDetailFromChain(props.data.contractAddress, responseHandler)
    },[])

    const responseHandler = (msg, data)=>{
        setLoadingState(false)
        if(msg === ""){
            setContractChainDetail(data)
        }else{
            setErrorMessage(msg)
        }
    }

    const createInvestDetails = ()=>(
        contractChainDetail.basic_contract.registry.map((value, index)=>(
            <>
            <Accordion>
                <AccordionSummary
                expandIcon={<FontAwesomeIcon icon={faCaretDown} color="#0eaaa6"/> }
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <div className={classes.column}>
                    <Typography className={classes.heading}>Investor Address </Typography>
                </div>
                <div className={classes.column}>
                    <Typography className={classes.secondaryHeading}>{value.investor_address}</Typography>
                </div>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="h6">
                        Amount {value.owned_token}
                    </Typography>
                </AccordionDetails>
                <AccordionDetails>
                    <Typography variant="h6">
                        Invested On {new Date(value.invested_date).toDateString()}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <br/>
            </>
        )) 
    )


    const createAccord = ()=>{
        return(
        <Accordion>
            <AccordionSummary
            expandIcon={<FontAwesomeIcon icon={faCaretDown} color="#0eaaa6"/> }
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <div className={classes.column}>
                <Typography className={classes.heading}>Address</Typography>
            </div>
            <div className={classes.column}>
                <Typography className={classes.secondaryHeading}>---------------------</Typography>
            </div>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                -------------------------------------
            </Typography>
            </AccordionDetails>
        </Accordion>
        )
    }
    return (
        <div
        role="tabpanel"
        hidden={props.value !== 1}
        id={'simple-tabpanel-0'}
        aria-labelledby={`simple-tab-0`}
        className="listedPropDetail"
    >
        <Typography gutterBottom variant="h4" className="totalInvest">
            Investment Details
        </Typography>
        <Loader type="ThreeDots" color="rgb(14, 170, 166)" height={40} width={50} visible={loading}/>
        <Alert show={errorMessage? true: false} class='danger' clearer={()=> setErrorMessage(null)} message={errorMessage}/>
        {contractChainDetail &&
            <div>
                <Typography gutterBottom variant="h6" className="totalInvest">
                    Total Sold Tokens {contractChainDetail.basic_contract.basic_detail.sold_token}
                </Typography>
                <br/>
                <Typography gutterBottom variant="body1" className="totalInvest">
                    Investment Details
                </Typography>
                <br/>
                <div>
                    {createInvestDetails()}
                </div>
            </div>
        }
        { !contractChainDetail && createAccord()}
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor:blue
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
  }));