import React, {useState} from 'react';
import './style.css';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVoteYea, faPoll} from '@fortawesome/free-solid-svg-icons'
import { votePoll,processPoll } from 'Services_chain/AuthorithyContract';
import {useSelector} from "react-redux";
import Loader from "react-loader-spinner";
import Alert from "Components/Common/Alert";

function ListedPropInfo(props){
    const [processing, setProcessing] = useState(false)
    const [responseHash, setResponseHash] = useState("")
    const [resErrorMsg, setResErrorMsg] = useState("")

        return (
            <div className="agentInfoContainer">            
                <div className="avatar">
                    <FontAwesomeIcon icon={faPoll} size={"4x"}  color="#0eaaa6"/>  
                </div>
                <div className="info">
                <Loader type="ThreeDots" color="#00A9A4" height={40} width={50} visible={processing}/>
                <Alert class="success" show={responseHash !== ""? true: false} message={responseHash} clearer={()=>setResponseHash("")}/>
                <Alert class="danger" show={resErrorMsg !== ""? true: false} message={responseHash} clearer={()=>setResErrorMsg("")}/>
                    <div className="name">Status: {(!props.data.processed)?"Pending":"Processed"}</div>
                    <div className="title">Poll Type: {(props.data.type == 1)?"Mintint":"Distribution"}</div>
                    <div className="title">Total Casted Votes: {totalCastedVotes()}</div>
                    <div className="title">Poll Amount: {props.data.coins_amount.amount}</div>
                    <div className="address">Owner: {props.data.owner_voter_poll}</div>  
                    <div className="address">Positive Votes: {getVotesAddress(props.data.positive_votes_address)}</div>
                    <div className="address">Negative Votes: {getVotesAddress(props.data.negative_votes_address)}</div>
                </div>
                <div className="ops">
                    <Button variant="contained" color="#0eaaa6"
                         href="#contained-buttons"
                         disabled={(!props.data.processed)?false:true}
                         onClick={()=>vote(1)}
                    >
                        Vote
                        <FontAwesomeIcon icon={faVoteYea}  color="#0eaaa6"/>                   
                    </Button>
                    <Button variant="contained" color="#0eaaa6"
                        href="#contained-buttons"
                        disabled={(!props.data.processed)?false:true}
                        onClick={()=>vote(0)}
                    >
                        Cancel
                        <FontAwesomeIcon icon={faVoteYea}  color="#0eaaa6"/>                   
                    </Button>
                    <Button variant="contained" color="#0eaaa6"
                        href="#contained-buttons"
                        disabled={(!props.data.processed)?false:true}
                        onClick={()=>proPoll()}
                    >
                        Process Poll
                        <FontAwesomeIcon icon={faVoteYea}  color="#0eaaa6"/>                   
                    </Button>
                </div>
            </div>
        );
}

export default ListedPropInfo;