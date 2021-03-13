import { useDispatch, useSelector } from "react-redux";
import React, {useEffect, useState} from "react";

import Key from "./Key";
import NewWallet from "./NewWallet";
import {getAddresses ,Wallet} from "Services/Wallet";
import LocalStore from "Config/localStore";
import {changeLockStatus, clearError, setWallet, walletErrorOccur} from "Redux/Wallet";
import Loader from "react-loader-spinner";
import AddNewKey from "./AddKey";
import Alert from "Components/Common/Alert";
import {Secp256k1HdWallet} from "@cosmjs/launchpad";

const store = new LocalStore()
/*
let trans = {
    "type": "cosmos-sdk/StdTx",
    "value": {
        "msg": [
            {
                "type": "cosmos-sdk/MsgSend",
                "value": {
                    "from_address": "cosmos167n2fd2qwzazthe8gpccv3ewj3f03kz3hw3ncr",
                    "to_address": "cosmos1wmu2f8ltan58y8cmd45t6tze0kyc3gmvz2kjr8",
                    "amount": [
                        {
                            "denom": "nametoken",
                            "amount": "10"
                        }
                    ]
                }
            }

        ],
        "fee": {
            "amount": [],
            "gas": "200000"
        },
        "signatures": null,
        "memo": ""
    }
}

let mnemoics = "ski comic comfort sort peace cross know champion midnight empty fresh waste"
const lcdApi = "http://localhost:1318";

 */
// …
function HDWallet (){
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState(null)
    const [importedMnemonicsError, setImportedMnemonicsError] = useState(null)
    const [serializedData, setSerializedData] = useState(store.getSerializedWallet() || null)

    const keys = useSelector((state)=> state.wallet.addresses)
    const error = useSelector((state)=> state.wallet.error)
    const tried = useSelector((state)=> state.wallet.tried)
    const loading = useSelector((state) => state.wallet.loading)
    const lockStatus = useSelector((state) => state.wallet.walletLocked)
    const walletError = useSelector((state) => state.wallet.walletError)
    const [importedMnemonics, setImportedMnemonics] = useState("")
    const dispatch  = useDispatch()

    useEffect(()=>{
        //if there is no error and haven't tried, http request yet to do
        if(error === null && loading === false){
            //request to fetch keys from API
            if(!tried){
                dispatch(getAddresses())
            }

        }

    })

    //take serialized
    const createInstance = async (serializedWallet)=>{
        await Wallet.init(serializedWallet, null,password,keys[0].keyTag, 0)
    }

    const unlockWallet = () =>{
        //If there are keys than wallet object created
        if(password && password.length > 8) {
            console.log("creating wallet object")
            //if wallet created successfully, set it into store
            let serializedWallet = store.getSerializedWallet()
            createInstance(serializedWallet).then((res) => {
                if (Wallet.getInstance() != null) {
                    dispatch(setWallet(Wallet.getInstance()))
                    dispatch(changeLockStatus())
                }
            }).catch((err) => {
                dispatch(walletErrorOccur(err))
                console.log(err)
            })
        }else{
            setPasswordError(true)
        }
    }

    const importWallet  = async () =>{
        if(importedMnemonics.length === 71 && password.length > 8){
            const wallet = await Secp256k1HdWallet.fromMnemonic(
                // your mnemonic here 👇
                importedMnemonics
            );
            let serialize = await wallet.serialize(password)
            store.setSerializedWallet(serialize)
            setSerializedData(serialize)
        }else{
            setImportedMnemonicsError("Invalid Mnemonics")
        }
    }
    return(
        <div>
            {
                (tried)?
                    (keys.length > 0)?
                        (!serializedData)?
                            [
                                <Alert show={true} class="info" message="Failed to find serialized wallet data" />,
                                <Alert show={(importedMnemonicsError)?true: false} class="error" message={importedMnemonics} />,
                                <div className="row form-group" >
                                    <div className="col-xs-12 col-sm-8 col-md-8">
                                        <h4>Enter Mnemonics</h4>
                                        <input type="text" onChange={(e)=>{setImportedMnemonics(e.target.value)}} className="form-control" />
                                    </div>
                                </div>,
                                <div className="row form-group" >
                                    <div className="col-xs-12 col-sm-8 col-md-8">
                                        <h4>Password</h4>
                                        <input type="text" onChange={(e)=>{setPassword(e.target.value)}} className="form-control" />
                                    </div>
                                </div>,
                                <button className="btn btn-green btn-lg"
                                        style={{marginBottom:"2%", marginLeft:'10px'}}
                                        onClick={importWallet}
                                >Import Wallet</button>
                            ]
                            :
                            (lockStatus)?
                                <div style={{display:"revert"}}>
                                <Alert show={(walletError!= null)?true: false} class="danger" message="Failed to unlock wallet" clearer={()=>dispatch(clearError())}/>
                                <Alert show={(passwordError!= null)?true: false} class="danger" message="Wrong password" clearer={()=>setPasswordError(null)}/>
                                <div className="row form-group" >
                                    <div className="col-xs-12 col-sm-8 col-md-8">
                                        <h4>Password</h4>
                                        <input type="text" onChange={(e)=>{setPassword(e.target.value)}} className="form-control" />
                                    </div>
                                </div>
                                <button className="btn btn-green btn-lg"
                                        style={{marginBottom:"2%", marginLeft:'10px'}}
                                        onClick={unlockWallet}
                                >
                                    Unlock Wallet</button>,
                                </div>
                                :
                                [
                                    <AddNewKey newKeyIndex = {keys.length}/>,
                                    (keys.map((value, index)=>(
                                        <Key tag={value.keyTag} address ={value.address} index={index}/>
                                    )))
                                ]
                        :
                        <NewWallet/>
                    :
                    <Loader
                        type="Grid" color="#00A9A4" height={60} width={60} visible={loading}
                    />
            }
        </div>
    )
}

export default HDWallet


/*
{"type":"secp256k1wallet-v1","kdf":{"algorithm":"argon2id","params":{"outputLength":32,"opsLimit":20,"memLimitKib":12288}},"encryption":{"algorithm":"xchacha20poly1305-ietf"},"data":"YnG2wqAIqI1Uy9NmGV6O3UcZBlXS73SvQK7tXOgn0jaDd29rUaEfc8FasretKBZY9lYmSv1jSGdgUhs+OEk0U3muwf6ObeyutnuUCIof4eXYXmhEcDArGdMsRakBm52Ri+kpl6zl7U9EvHXF1Xzxrl57QcbXCczOSQkvanrugUaJGTzlJuBqSeBeQQenCwXsZNhd/CnkVdVxj+DggTY1MNr4RKYQuROCsMVMjfKbIkq1xIghEnLOBfwaLPhJPxCO"}
 */