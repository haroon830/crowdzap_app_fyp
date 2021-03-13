import * as React from 'react';
import PollInfo from "./Components/Poll";
import Alert from "Components/Common/Alert";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getPolls} from "Services_chain/AuthorithyContract";
import {clearError} from "Redux/AuthorithyContract";
import Loader from "react-loader-spinner";


function Polls(){
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
        <ul className="agentsResult">
            {(loading)?
                <Loader type="ThreeDots" color="#00A9A4" height={40} width={50} visible={true}/>
                :
                ""
            }
            {(!pollsError)?
                (polls.length === 0)?
                    <h5>There are no polls yet</h5>
                    :
                    polls.map((item, index) => {
                        return (
                            <li key={index}>
                                <PollInfo avatar={item.avatar} name={item.name} title={item.title} address={item.address} />
                            </li>
                        );
                    })
                :
                <Alert class="danger" message="Failed to load polls" show={(pollsError)?true:false} clearButton={()=>dispatch(clearError())}/>
            }
        </ul>
    );
}

export default Polls;