import {Wallet} from "Services/Wallet";
import {updateCryptoOrderStatus} from "Services/CryptoOrder";

export const processCryptoOrder = (recipientAddress, amount, orderId, callback) => {
    sendRelFromChain(recipientAddress, amount).then( (res) =>{
        if(res.transactionHash){
            updateCryptoOrderStatus(res.transactionHash, orderId ,callback)
        }else{
            callback("PROCESSING_FAILED", "")
        }
    }).catch((err)=>{
        callback("PROCESSING_FAILED", "")
        console.log(err)
    })
}

export const sendRelCoin = (recipientAddress, amount, callback) =>{
    sendRelFromChain().then((res)=>{
        if(res.transactionHash){
            callback("PROCESSING_SUCCEED", res.transactionHash)
        }else{
            callback("PROCESSING_FAILED", "")
        }
    }).catch((err)=>{
        callback("PROCESSING_FAILED", "")
        console.log(err)
    })
}

const sendRelFromChain = (recipientAddress, amount)=>{
    let client  = Wallet.getInstance().account
    let msgTran =[
        {
            "type": "cosmos-sdk/MsgSend",
            "value": {
                "from_address": client.address,
                "to_address": recipientAddress,
                "amount": [
                    {
                        "denom": "rel",
                        "amount": amount.toString()
                    }
                ]
            }
        }]
    let fee=  {
        "amount": [],
        "gas": "200000"
    }

    return client.signerCosmosClient.signAndBroadcast(msgTran,fee)
}