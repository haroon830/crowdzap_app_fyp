import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import {getCryptoOrders} from "Services/CryptoOrder";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheckSquare, faSpinner, faMinusSquare, faSyncAlt} from '@fortawesome/free-solid-svg-icons'
import 'font-awesome/css/font-awesome.min.css';
import {processCryptoOrder} from "Services_chain/TransferCrypto";
import Alert from "Components/Common/Alert";

function CryptoOrders(){
    const cryptoOrders = useSelector((state)=> state.cryptoOrders.cryptoOrders)
    const loading  = useSelector((state)=> state.cryptoOrders.loadingOrders)
    const tried  = useSelector((state)=> state.cryptoOrders.tried)
    const user = useSelector((state) => state.auth.user)


    //admin related
    const locked = useSelector((state)=> state.wallet.walletLocked)
    const [processingState, setProcessingState] = useState("NO_PROCESSING")
    const [txHash, setTxHash] = useState("")

    const dispatch = useDispatch()

    useEffect(()=>{
        if(!tried){
            dispatch(getCryptoOrders(queryForOrder()))
        }
    })

    const refreshOrders =()=>{
        setTxHash(txHash)
        setProcessingState("")
        dispatch(getCryptoOrders(queryForOrder()))
    }

    //TODO ::: Replace it with specific user
    const queryForOrder = () => {
        let query = {
            param:"",
            value:""
        }
        if(user.role === "admin"){
            query.param = "nodeName" // for admin user
            query.value = user.name
        }else{
            query.param = "_id" //for normal user
            query.value = user._id
        }
        return query
    }

    //Admin Related
    const processOrder = (order) =>{
        setProcessingState("PROCESSING")
        processCryptoOrder(order.clientAddress, order.amount, order._id,handleResponse)
    }

    const handleResponse = (status, txHash)=>{
        setTxHash(txHash)
        setProcessingState(status)
    }

    return (
        <div>
            {
                (user.role === "admin") && <Alert class="danger" show={locked} message="Wallet must be unlocked, before any operation!!" clearButton={true}/>
            }
            <Loader type="Dots" color="#00A9A4" height={60} width={60} visible={(processingState === "PROCESSING")?true:false}/>
            <Alert class="danger" show={(processingState === "PROCESSING_FAILED")?true: false} message="Failed to transfer rel coin" clearButton={true}/>
            <Alert class="success" show={(processingState === "PROCESSING_SUCCEED")?true: false} message={"Transaction Hash "+txHash} clearButton={true}/>
            <button className="btn btn-green" onClick={refreshOrders}>
                <FontAwesomeIcon icon={faSyncAlt}  color="white"/> Refresh
            </button>
            <br/>
            <br/>
            <table class="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>Vendor Node</th>
                    <th>Amount</th>
                    <th>Order Date</th>
                    <th>Transaction Hash</th>
                    <th>Status</th>
                    {(user.role === "admin")?<th>Operation</th>:<></>}
                </tr>
                </thead>
                <tbody>
                {
                    (loading === true)?
                        <Loader
                            type="ThreeDots" color="#00A9A4" height={40} width={50} visible={loading}
                        />
                        :
                        (cryptoOrders.length > 0)?
                            cryptoOrders.map((value, index) =>(
                                <tr>
                                    <td>{value.nodeName}</td>
                                    <td>{value.amount}</td>
                                    <td>{new Date(value.orderTime).toDateString()}</td>
                                    <td>{value.transactionId || "---"}</td>
                                    <td>{(value.processed === 0) ?
                                        <FontAwesomeIcon icon={faCheckSquare} size="lg"  color="green" />
                                        :
                                        (value.processed === 1) ?
                                            <FontAwesomeIcon icon={faSpinner} size="lg" color="green" spin  />
                                            :
                                            <FontAwesomeIcon icon={faMinusSquare} size="lg" color="red"/>
                                    }
                                    </td>
                                    {(user.role === "admin")?
                                        <td>
                                            <button
                                                className="btn-green btn"
                                                disabled={value.processed !== 1}
                                                onClick={() => processOrder(value)}
                                            >
                                                Send
                                            </button>
                                        </td>
                                        :
                                        <></>
                                    }
                                </tr>
                                )
                            )
                            :
                            <tr>
                                <td>No Orders Yet</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                {(user.role === "admin")?<td></td>:<></>}
                            </tr>
                }
                </tbody>
            </table>
        </div>
    )
}
export default CryptoOrders

/*
0 for processed
1 for waiting or need to be processed
2... failed
 */