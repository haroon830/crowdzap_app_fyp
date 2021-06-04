import * as React from 'react';
import PollInfo from "./Components/Poll";
import Alert from "Components/Common/Alert";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getPolls} from "Services_chain/AuthorithyContract";
import {clearError} from "Redux/AuthorithyContract";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt} from '@fortawesome/free-solid-svg-icons'
import Loader from "react-loader-spinner";


function Polls(){
    const locked = useSelector((state)=> state.wallet.walletLocked)
    const tried = useSelector(state => state.authorityContract.tried)
    const loading  = useSelector(state => state.authorityContract.loadingPolls)
    const polls  = useSelector(state => state.authorityContract.polls)
    const pollsError  = useSelector(state => state.authorityContract.loadingPollsError)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(!tried){
            dispatch(getPolls())
        }
    })
    return (
        <div>
            <div>
            {(loading)?
                <Loader type="ThreeDots" color="#00A9A4" height={40} width={50} visible={true}/>
                :
                <div className="refresh">
                <ul>
                    <li className="active" style={{borderColor:"#0eaaa6" ,color:"#0eaaa6"}} onClick={()=> dispatch(getPolls())}>
                        <FontAwesomeIcon icon={faSyncAlt} color="#0eaaa6"/>  Refresh
                    </li>
                </ul>                
                </div>
            }
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <div className="agentsResult">
                {
                    <Alert class="danger" show={locked} message="Wallet must be unlocked, before any operation!!" clearButton={true}/>
                }            
                {(!pollsError)?
                    (polls.length === 0)?
                        <h5>There are no polls yet</h5>
                        :
                        polls.map((item, index) => {
                            return (
                                <div key={index}>
                                    <PollInfo data={item} />
                                </div>
                            );
                        })
                    :
                    <Alert class="danger" message="Failed to load polls" show={(pollsError)?true:false} clearButton={()=>dispatch(clearError())}/>
                }
            </div>
            </div>
    );
}

export default Polls;