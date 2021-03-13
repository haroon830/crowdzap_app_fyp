import React, {useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import LocalStore from "Config/localStore";
import {Wallet} from "Services/Wallet";
import {changeLockStatus, clearError, setWallet, walletErrorOccur} from "Redux/Wallet";
import Alert from "../Alert";

function WalletUnlock(){
    const [password, setPassword] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const keys = useSelector((state)=> state.wallet.addresses)
    const walletError = useSelector((state) => state.wallet.walletError)
    const dispatch  = useDispatch()

    //take serialized
    const createInstance = async (serializedWallet)=>{
        await Wallet.init(serializedWallet, null,password,keys[0].keyTag, 0)
    }
    const unlockWallet = () =>{
        //If there are keys than wallet object created
        if(password && password.length > 8) {
            console.log("creating wallet object")
            //if wallet created successfully, set it into store
            let serializedWallet = new LocalStore().getSerializedWallet()
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
    const value = useState("")
    return (
        <>
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
        </>
    )
}
export default WalletUnlock