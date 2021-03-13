import React, {useState} from "react";
import {useDispatch} from 'react-redux'
import {Wallet} from "Services/Wallet";
import {storeNewAddress} from 'Services/Wallet'
import {loadingAddresses, setWallet, changeLockStatus ,walletErrorOccur} from "Redux/Wallet";
import Alert from "Components/Common/Alert";


export default function NewWallet() {
    const [keyTag, setKeyTag] = useState("Account 1")
    const [password, setPassword] = useState("")
    const [alertMsg, setAlertMsg] = useState(null)
    const dispatch = useDispatch()

    //create new wallet,
    //store it in DB(API request)
    //set walletObj into redux
    const createWallet = ()=> {
        if(password !== "" && password.length > 8) {
            dispatch(loadingAddresses()) //to show processing
            createInstance().then(async (res) => {
                let wallet = Wallet.getInstance()
                if (wallet != null) {
                    console.log(wallet)
                    let [account] = await wallet.account.walletObj.getAccounts()
                    let newAddress = {
                        keyTag: keyTag,
                        address: account.address,
                        index: wallet.index || 0
                    }
                    dispatch(storeNewAddress(newAddress))
                    dispatch(setWallet(Wallet.getInstance()))
                    dispatch(changeLockStatus())
                    alert("Save this mnemonics for recovery : \n"+Wallet.getInstance().account.walletObj.mnemonic)
                }
            }).catch((err) => {
                dispatch(walletErrorOccur(err))
                console.log(err)
            })
        }else{
            setAlertMsg("Password must be greater than 8, in length")
        }
    }

    const createInstance = async ()=>{
        await Wallet.init(null, null,password, keyTag, 0)
    }

    return(
        <div className="jumbotron">
            <Alert show={(alertMsg!= null)?true: false} class="danger" message={alertMsg} clearer={()=>setAlertMsg(null)}/>
            <h2>Welcome</h2>
            <div className="row form-group">
                <div className="col-xs-12 col-sm-6 col-md-6">
                    <h4>Key Tag</h4>
                    <input type="text" onChange={(e)=>{setKeyTag(e.target.value)}} className="form-control" />
                </div>
            </div>
            <div className="row form-group">
                <div className="col-xs-12 col-sm-6 col-md-6">
                    <h4>Password</h4>
                    <input type="text" onChange={(e)=>{setPassword(e.target.value)}} className="form-control" />
                </div>
            </div>
            <button className="btn btn-green btn-lg" onClick={createWallet}>Create Wallet</button>
        </div>
    )
}