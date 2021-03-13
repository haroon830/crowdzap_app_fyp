import {Wallet} from "Services/Wallet";
import {Secp256k1HdWallet} from "@cosmjs/launchpad";
import {newInvestment} from "../../Services/InvestmentPortfolio";

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
            callBack("PROCESSING_FAILED", "")
        }
    }).catch((err)=>{
        callBack("PROCESSING_FAILED","")
        console.log(err)
    })
}

const createBasicContractInChain = async (data) => {
    let contractWallet = await Secp256k1HdWallet.generate()
    const [{ address }] = await contractWallet.getAccounts();

    let client  = Wallet.getInstance().account
    let msgTran =[
        {
            "type": "smartcontracts/create_basic_contract",
            "value": {
                "contract_address": address.toString(),
                "creator": client.address.toString(),
                "title": data.title.toString(),
                "total_supply" : data.totalSupply.toString(),
                "token_price": data.tokenPrice.toString(),
                "start_date": data.start_date,
                "end_date": data.end_date
                //"2021-01-26T16:04:27.4609868Z"
            }
        }]
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
            "type": "smartcontracts/buy_basic_tokens",
            "value": {
                "contract_address": "cosmos144guy8hgaslrwt4hmgz66nw5ger0wgzu0avld9",
                "tokens": data.amount.toString(),
                "investor": client.address.toString()
            }
        }]
    let fee=  {
        "amount": [],
        "gas": "200000"
    }

    return client.signerCosmosClient.signAndBroadcast(msgTran,fee)
}