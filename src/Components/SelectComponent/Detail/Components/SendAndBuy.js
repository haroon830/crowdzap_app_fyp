import React, {useState} from "react";
import {useSelector} from "react-redux";
import {buyBasicTokens} from "Services_chain/Contracts";
import Alert from "../../../Common/Alert";
import Loader from "react-loader-spinner";

function Invest (props){
    const [amount, setAmount] = useState(0)
    const user = useSelector( state => state.auth.user)
    const walletObj = useSelector((state)=> state.wallet.walletObj)
    const locked = useSelector((state)=> state.wallet.walletLocked)
    const [processingState, setProcessingState] = useState("NO_PROCESSING")
    const [txHash, setTxHash] = useState("")

    const buyTokens = (e) => {
        e.preventDefault()
        let data = {
            amount : amount,
            contractAddress : ""
        }
        //TODO:: call method according to type of contract
        setProcessingState("PROCESSING")
        buyBasicTokens(data, responseHandler)
    }

    const responseHandler = (status, txHash) => {
        setProcessingState(status)
        setTxHash(txHash)
    }

    return(
        <div
            role="tabpanel"
            hidden={props.value !== 3}
            id={'simple-tabpanel-0'}
            aria-labelledby={`simple-tab-0`}
            className="listedPropDetail"
        >
            <div className="depositForm panel panel-default">
                {
                    (!locked)?
                        <div className="selectedAccount">
                            <h3>Selected Account</h3>
                            <h5>{walletObj.account.tag}</h5>
                            <h5>{walletObj.account.walletObj.address}</h5>
                        </div>
                        :
                        <></>
                }
                <form>
                    <Loader type="Dots" color="#00A9A4" height={60} width={60} visible={(processingState === "PROCESSING")?true:false}/>
                    <Alert
                        class="danger"
                        show={(processingState === "PROCESSING_FAILED")?true: false}
                        message="Failed to transfer rel coin"
                        clearer={
                            ()=>{
                                setProcessingState("NO_PROCESSING")
                                setTxHash("")
                            }
                        }
                    />
                    <Alert
                        class="success"
                        show={(processingState === "PROCESSING_SUCCEED")?true: false}
                        message={"Transaction Hash "+txHash}
                        clearer={
                            () => {
                                setProcessingState("NO_PROCESSING")
                                setTxHash("")
                            }
                        }
                    />
                    <Alert
                        class="danger"
                        show={locked}
                        message="Wallet must be unlocked, before any operation!!"
                        clearButton={true}
                    />

                    <div className="input-group form-group">
                        <span className="input-group-addon">Amount</span>
                        <input type="number" onChange={(e)=>setAmount(e.target.value)} className="form-control" placeholder="Amount" />
                    </div>
                    <div className="button-group form-group">
                        {console.log(user.role)}
                        <button
                            className="btn btn-green"
                            onClick={buyTokens}
                            disabled={
                                !!(locked || user.role === "admin")
                            }
                        >
                            Invest
                        </button>
                    </div>
                </form>
                </div>
        </div>
    )
}

export default Invest