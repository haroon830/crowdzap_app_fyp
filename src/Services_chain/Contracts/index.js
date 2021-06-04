import {Wallet} from "Services/Wallet";
import {Secp256k1HdWallet} from "@cosmjs/launchpad";
import {newInvestment, transferInvestment} from "Services/InvestmentPortfolio";

export const createBasicContract = async (data, callback) => {
    try{
        let chainResponse = await createBasicContractInChain(data)
        console.log(chainResponse)
        if(chainResponse){

        }
    }catch (e) {
        callback("ERROR")
        console.log(e)
    }
}

export const buyBasicTokens =  (data, callBack) => {
    buyBasicTokensInChain(data).then((res)=>{
        if(res.transactionHash){            
            newInvestment(res.transactionHash, data, callBack)
        }else{
            console.log(res)
            callBack("PROCESSING_FAILED", "")
        }
    }).catch((err)=>{
        callBack("PROCESSING_FAILED","")
        console.log(err)
    })
}


export const transferBasicTokens =  (data, callBack) => {
    transferBasicTokensInChain(data).then((res)=>{
        if(res.transactionHash){    
            console.log(res)        
            transferInvestment(res.transactionHash, data, callBack)
        }else{
            console.log(res)
            callBack("PROCESSING_FAILED", "")
        }
    }).catch((err)=>{
        callBack("PROCESSING_FAILED","")
        console.log(err)
    })
}

export const createBasicContractInChain = async (data) => {

    let client  = Wallet.getInstance().account
    let msgTran =[
        {
            "type": "smartcontracts/create_basic_contract",
            "value": {
                "contract_address": data.contractAddress,
                "creator": client.address.toString(),
                "title": data.title.toString(),
                "total_supply" : data.totalSupply.toString(),
                "token_price": data.tokenPrice.toString(),
                "start_date": new Date().toISOString(),
                "end_date": data.endDate
                //"2021-01-26T16:04:27.4609868Z"
            }
        }]
    console.log(msgTran)    
    let fee=  {
        "amount": [],
        "gas": "200000"
    }
    return client.signerCosmosClient.signAndBroadcast(msgTran,fee)
}


export const buyBasicTokensInChain =  (data) => {
    let client  = Wallet.getInstance().account
    let msgTran =[
        {
            "type": "smartcontracts/invest_basic_contract",
            "value": {
                "contract_address": data.contractAddress,
                "amount": data.amount.toString(),
                "investor": client.address.toString()
            }
        }]
    console.log(msgTran)    
    let fee=  {
        "amount": [],
        "gas": "200000"
    }

   return client.signerCosmosClient.signAndBroadcast(msgTran,fee)
}


export const transferBasicTokensInChain =  (data) => {
    let client  = Wallet.getInstance().account
    let msgTran =[
        {
            "type": "smartcontracts/transfer_basic_contract",
            "value": {
                "contract_address": data.contractAddress.toString(),
                "to": data.to.toString(),
                "from": client.address.toString(),
                "amount":data.amount.toString()
            }
        }]
    console.log(msgTran)    
    let fee=  {
        "amount": [],
        "gas": "200000"
    }

    return client.signerCosmosClient.signAndBroadcast(msgTran,fee)
}