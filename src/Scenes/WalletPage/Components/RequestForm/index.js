import * as React from 'react';
import './style.css';
import SelectComponent from 'Components/SelectComponent';
import {useHistory}  from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {useState} from "react";
import Alert from "Components/Common/Alert";
import {buyCryptoOrder} from "Services/CryptoOrder";
import {addCryptoOrderError} from "Redux/CryptoOrder";
import Loader from "react-loader-spinner";

function RequestForm(){
  const history = useHistory()
  const processing = useSelector((state)=> state.cryptoOrders.processingOrder)
  const processingError = useSelector((state)=> state.cryptoOrders.processingError)
  const walletObj = useSelector((state)=> state.wallet.walletObj)
  const locked = useSelector((state)=> state.wallet.walletLocked)
  const [amount, setAmount] = useState(0)
  const [transactionId, setTransactionId] = useState("")
  const [node, setNode] = useState("Abdul Node")
  const [cryptoType , setCryptoType] = useState("BTC")
  const dispatch = useDispatch()
  const method = [
    'BTC',
    'ETHER',
  ];
  const nodes = [
    'Abdul Waheed',
    'Haroon Munir',
    'Abdullah Nadeem'
  ];

  const placeCryptoOrder = (e)=>{
    e.preventDefault()
    if (amount > 0 && transactionId.length > 8){
      let order = {
        clientAddress: walletObj.account.walletObj.address,
        amount: amount,
        nodeName: nodes[node] || "Abdul Node",
        fiatCurrencyTranId:transactionId,
        cryptoType: method[cryptoType] || "BTC"
      }
      dispatch(buyCryptoOrder(order))
    }
    else{
      dispatch(addCryptoOrderError("Invalid data"))
    }
  }
    return (
      <div>
        <div className="dashboardTitle">
          <h3>Request Form</h3>
        </div>
        <div className="depositForm panel panel-default">
          <Loader type="Dots" color="#00A9A4" height={60} width={60} visible={processing}/>
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
            <Alert class="danger" show={locked} message="Wallet must be unlocked, before any operation!!" clearButton={true}/>
            <Alert class="danger" show={(processingError)?true: false} message="Failed to place order" clearButton={true}/>
            <div className="input-group form-group">
              <span className="input-group-addon">Amount</span>
              <input type="number" onChange={(e)=>setAmount(e.target.value)} className="form-control" placeholder="Amount" />
            </div>
            <div className="input-group form-group">
              <span className="input-group-addon">Method</span>
              <SelectComponent listItem={method} setValue={setCryptoType}/>
            </div>
            <div className="input-group form-group">
              <span className="input-group-addon">Transaction ID</span>
              <input type="text" className="form-control" onChange={(e)=>setTransactionId(e.target.value)} placeholder="Transaction Hash" />
            </div>
            <div className="input-group form-group">
              <span className="input-group-addon">Rel Vendor</span>
              <SelectComponent on listItem={nodes} setValue={setNode}/>
            </div>
            <div className="button-group form-group">
              <div className="btn btn-white" onClick={(e) => history.goBack()}>{'<< Back'}</div>
              <button className="btn btn-green" onClick={placeCryptoOrder} disabled={locked} >Buy</button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default RequestForm;