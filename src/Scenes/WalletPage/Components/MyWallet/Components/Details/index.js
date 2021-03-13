import * as React from 'react';
import './style.css';
import { Icon } from 'react-fa';
import HDWallet from './Components'
import {useState} from "react";
import CryptoOrders from "./Components/CryptoOrders";

function Details () {
    const [display, setDisplay] = useState(1)

    return (
      <div className="details">
        <div className="detailTab">
          <ul>
            <li className={(display===1)?"active":""} onClick={()=>setDisplay(1)}><a ><Icon name="key" /> Keys</a></li>
            <li className={(display===2)?"active":""} onClick={()=>setDisplay(2)}><a ><Icon name="bar-chart" /> Crypto Orders</a></li>
          </ul>
        </div>
        <div className="detailBody">
            {
                (display === 1)?<HDWallet/> : <CryptoOrders/>
            }
        </div>
      </div>
    );
}

export default Details;