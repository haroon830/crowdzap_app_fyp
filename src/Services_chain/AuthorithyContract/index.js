import {Wallet} from "Services/Wallet";
import {
    processingCreatePoll, createPollSucceed,  createPollError,
    processingVotePoll, votePollSucceed, votePollError,
    processingPollProcess, pollProcessSucceed,pollProcessError,
    loadingPolls, setPolls, pollsError
} from "Redux/AuthorithyContract";
import {LCDClient} from "Config/LCDClient";
import CONSTANTS from "Config/constants";

export const createNewPoll = (pollType, amount) => (dispatch) => {
    ++pollType
    let client  = Wallet.getInstance().account
    let msgTran =[
        {
            "type": "relcontractors/create_vote_poll",
            "value": {
                "poll_type": pollType.toString(),
                "amount": amount.toString(),
                "owner_voter_poll": client.address,
            }
        }
    ]
    let fee=  {
        "amount": [],
        "gas": "200000"
    }

    dispatch((processingCreatePoll()))
    console.log(msgTran)
    client.signerCosmosClient.signAndBroadcast(msgTran,fee).then((res)=>{
        dispatch(createPollSucceed(res.transactionHash))
        console.log(res)
    }).catch((err)=>{
        dispatch(createPollError(err))
        console.log(err)
    })
}

export const votePoll = (pollId, vote, responseCB) => {
    let client  = Wallet.getInstance().account
    let msgTran =[
        {
            "type": "relcontractors/vote_poll",
            "value": {
                "poll_id": pollId.toString(),
                "vote": vote.toString() || '0',
                "voter": client.address.toString()
            }
        }]
    let fee=  {
        "amount": [],
        "gas": "200000"
    }

    client.signerCosmosClient.signAndBroadcast(msgTran,fee).then((res)=>{
        responseCB(res)
    }).catch((err)=>{
        responseCB(err)
    })
}

export const processPoll = (pollId) => {
    let client  = Wallet.getInstance().account
    let msgTran =[
        {
            "type": "relcontractors/process_poll",
            "value": {
                "poll_id": pollId.toString(),
                "transactor": client.address.toString()
            }
        }]
    let fee=  {
        "amount": [],
        "gas": "200000"
    }

    client.signerCosmosClient.signAndBroadcast(msgTran,fee).then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    })
}

export const getPolls = () => (dispatch) =>{
    dispatch(loadingPolls())
    LCDClient.get(CONSTANTS.CHAIN_API_URLS.GET_POLLS).then((res)=>{
        //Todo : extract data from res and send it to store
        console.log(res)
        dispatch(setPolls(res.result))
    }).catch((err)=>{
        console.log(err)
        dispatch(pollsError(err))
    })
}

export const updateRelContractAddress = () => (dispatch) => {
    let client  = Wallet.getInstance().account
    let msgTran =[
        {
            "type": "relcontractors/update_relcontractor_address",
            "value": {
                "rel_contractor_address": client.address,
                "new_rel_contractor_address": client.address
            }
        }]
    let fee=  {
        "amount": [],
        "gas": "200000"
    }

    //dispatch((processingCreatePoll()))
    client.signerCosmosClient.signAndBroadcast(msgTran,fee).then((res)=>{
        console.log(res)
        //dispatch(createPollSucceed())
    }).catch((err)=>{
        //dispatch(createPollError(err))
        console.log(err)
    })
}