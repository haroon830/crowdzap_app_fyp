import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {processAddNewAddress, setWallet, walletErrorOccur} from "Redux/Wallet";
import {storeNewAddress, Wallet} from "Services/Wallet";
import Alert from "Components/Common/Alert";
import Loader from "react-loader-spinner";

export default function AddNewKey(props) {
    const [keyTag, setKeyTag] = useState(null)
    const [alertMsg, setAlertMsg] = useState(null)
    const processing = useSelector((state)=> state.wallet.processAddingKey)
    const dispatch = useDispatch()

    const addNewAddress = async () => {
        if(keyTag) {
            dispatch(processAddNewAddress())//for showing loader
            let wallet = Wallet.getInstance()
            if (wallet != null) {
                console.log(typeof wallet.index)
                await wallet.selectAddAccount(keyTag, props.newKeyIndex)
                let [account] = await wallet.account.walletObj.getAccounts()
                let newAddress = {
                    keyTag: keyTag,
                    address: account.address,
                    index: props.newKeyIndex || 0
                }
                dispatch(storeNewAddress(newAddress))
                dispatch(setWallet(Wallet.getInstance()))
            } else {
                dispatch(walletErrorOccur("Wallet object not founded"))
                console.log()
            }
        }else {
            setAlertMsg("Key tag must be set")
        }
    }

    return(
        <div style={{display:"revert"}}>
            <Alert show={(alertMsg!= null)?true: false} class="danger" message={alertMsg} clearer={()=>setAlertMsg(null)}/>
            <Loader
                type="ThreeDots" color="#00A9A4" height={40} width={50} visible={processing}
            />
            <div className="row form-group" >
                <div className="col-xs-12 col-sm-8 col-md-8">
                    <h4>Key Tag</h4>
                    <input type="text" onChange={(e)=>{setKeyTag(e.target.value)}} className="form-control" />
                </div>
            </div>
            <button className="btn btn-green btn-lg"
                    style={{marginBottom:"2%", marginLeft:'10px'}}
                    onClick={addNewAddress}
                    disabled={(processing)?true: false}
            >
                Add Key</button>,
        </div>
    )
}
//