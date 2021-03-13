import * as React from 'react';
import './style.css';
import Loader from "react-loader-spinner";
import Alert from "Components/Common/Alert";
import SelectComponent from "Components/SelectComponent";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createNewPoll, updateRelContractAddress} from "Services_chain/AuthorithyContract";
import {createBasicContract} from "Services_chain/Contracts";

function CreateNewPoll (){
    const processingCreatePoll = useSelector((state)=> state.authorityContract.processingCreatePoll)
    const createPollError = useSelector((state)=> state.authorityContract.createPollError)
    const walletObj = useSelector((state)=> state.wallet.walletObj)
    const locked = useSelector((state)=> state.wallet.walletLocked)
    const dispatch = useDispatch()
    const [amount, setAmount] = useState(0)
    const [pollType, setPollType] = useState(0)
    const pollTypes = [
        'MINT REL COIN',
        'REQUEST COIN',
    ];

    const createPoll = (e)=>{
        e.preventDefault()
        dispatch(createNewPoll(pollType,amount))
    }
    const basicContract = (e)=>{
        e.preventDefault()
        dispatch(createBasicContract())
    }

    const updateContractor = (e)=>{
        e.preventDefault()
        dispatch(updateRelContractAddress())
    }
    return (
        <div>
            <div className="depositForm panel panel-default">
                <Loader type="Dots" color="#00A9A4" height={60} width={60} visible={processingCreatePoll}/>
                {
                    (!locked)?
                        <div className="selectedAccount">
                            <h3>Selected Account</h3>
                            <h5>{walletObj.account.tag}</h5>
                            <h5>{walletObj.account.walletObj.address}</h5>
                        </div>
                        :
                        <></>
                }
                <form>
                    <Alert class="danger" show={locked} message="Wallet must be unlocked, before any operation!!" clearButton={true}/>
                    <Alert class="danger" show={(createPollError)?true: false} message="Failed to create new poll" clearButton={true}/>
                    <div className="input-group form-group">
                        <span className="input-group-addon">Amount</span>
                        <input type="number" onChange={(e)=>setAmount(e.target.value)} className="form-control" placeholder="Amount" />
                    </div>
                    <div className="input-group form-group">
                        <span className="input-group-addon">Poll Type</span>
                        <SelectComponent on listItem={pollTypes} setValue={setPollType}/>
                    </div>
                    <div className="button-group form-group">
                        <button className="btn btn-green" onClick={createPoll} disabled={locked} >Create Poll</button>
                    </div>
                    <div className="button-group form-group">
                        <button className="btn btn-green" onClick={basicContract} disabled={locked} >Create Basic Contractor</button>
                    </div>
                    <div className="button-group form-group">
                        <button className="btn btn-green" onClick={updateContractor} disabled={locked} >Update Contractor</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateNewPoll;