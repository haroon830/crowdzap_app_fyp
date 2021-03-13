import * as React from 'react';
import './style.css';
import {Icon} from "react-fa";
import {useDispatch, useSelector} from "react-redux";
import {setWallet} from "Redux/Wallet";
import {Wallet} from "Services/Wallet";

export default function Key (props){
    const walletInstance = useSelector((state)=> state.wallet.walletObj)
    const dispatch = useDispatch()

    const checkSelected = (index) =>{
        if(walletInstance){
            if(walletInstance.index === index) return true
        }
        return false
    }

    const selectAccount = async () =>{
        if(walletInstance){
            await walletInstance.selectAddAccount(props.tag, props.index)
            dispatch(setWallet(Wallet.getInstance()))
        }
    }

    return (
      <div className={(checkSelected(props.index))?"agentInfoContainer selected":"agentInfoContainer"}  id={props.index}>
        <div className="avatar headerAvatar">
            <Icon name="key" />
        </div>
        <div className="info">
          <div className="name">{props.tag}</div>
          <div className="title">{props.address}</div>
            {
                (checkSelected(props.index))?
                    <div className="address">*Main selected account, all transaction will be performed with this account.</div>
                    :
                    <></>
            }
        </div>
        <div className="ops">
          <a href="#" title="Select Account" disabled={checkSelected(props.index)} onClick={selectAccount} className="btn btn-icon btn-round btn-o btn-red btn-sm">
            <span  title="Select Account" className="fa fa-heart-o"/>
          </a>
        </div>
      </div>
    );
}