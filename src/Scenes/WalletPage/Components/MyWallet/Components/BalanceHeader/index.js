import * as React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {faCoins} from "@fortawesome/free-solid-svg-icons";
import Loader from 'react-loader-spinner'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSyncAlt} from "@fortawesome/free-solid-svg-icons"
import {useEffect} from "react";
import {getAccountsData} from "Services_chain/Wallet";
import Alert from "Components/Common/Alert";
import {clearError} from "Redux/Wallet";

function BalanceHeader(){
    const dispatch = useDispatch()
    const tried = useSelector((state)=> state.wallet.triedAccountData)
    const loading = useSelector((state)=> state.wallet.loadAccountData)
    const accountsData = useSelector((state)=> state.wallet.accountsData)
    const accountsDataError = useSelector((state)=> state.wallet.accountDataError)
    const locked  = useSelector((state) => state.wallet.walletLocked)
    const addresses = useSelector((state)=> state.wallet.addresses)

    useEffect(()=>{
        if(!tried && !locked){
            dispatch(getAccountsData(addresses))
        }
    })

    const refreshAccountData = ()=>{
        dispatch(getAccountsData(addresses))
    }

    return (
      <div className="balanceHeader">
        <div className="balanceType">
          <ul>
            <li className="active">REL</li>
          </ul>
        </div>
        <div className="refresh">
            <ul>
                <li className="active" onClick={refreshAccountData}>
                    <FontAwesomeIcon icon={faSyncAlt}  color="white"/>  Refresh
                </li>
            </ul>
        </div>
          <div className="load">
              {
                  (loading === true)?
                      <Loader type="ThreeDots" color="white" height={40} width={50} visible={true}/>
                      :
                      <></>
              }
              <Alert show={(accountsDataError != null)?true: false} class="danger" message={"Failed to fetch accounts data"} clearer={()=>dispatch(clearError())}/>
          </div>
        <div className="bnContainer">
            <span className="balanceText">TOTAL BALANCE</span><br />
            {
                (loading === true)?
                    <span className="balanceNumber"><FontAwesomeIcon icon={faCoins} size="sm"/>  0.0</span>
                    :
                    (locked === true || (tried && accountsData.data.length < 1) )?
                        <span className="balanceNumber"><FontAwesomeIcon icon={faCoins} size="sm"/>  0.0</span>
                        :
                        <span className="balanceNumber"><FontAwesomeIcon icon={faCoins} size="sm"/>  {accountsData.balance}</span>
            }
        </div>
        <div className="balanceActions">
          <ul className="actions">
            <li><Link to="/wallet/send"><span>Send Money</span></Link></li>
            <li><Link to="/wallet/request"><span>Request Money</span></Link></li>
            <li><span>Add Money</span></li>
          </ul>
        </div>
      </div>
    );
}

export default BalanceHeader;