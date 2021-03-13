import * as React from 'react';
import './style.css';
import HouseDetailModel from "../SelectComponent/Detail";
import {useState} from "react";


function SingleHouse (props){
  const [modalStatus, setModalStatus] = useState(false)

    return (
      <div className="singleHouse">
        <a className="card" onClick={()=>setModalStatus(true)}>
          <div className="figure">
            <img src={props.data.mainImg} alt="image" />
            <div className="figCaption">
              <div>$1,550,000</div>
              <span className="icon-eye"> 200</span>
              <span className="icon-heart"> 54</span>
              <span className="icon-bubble"> 13</span>
            </div>
            <div className="figView"><span className="icon-eye" /></div>
            <div className="figType">FOR SALE</div>
          </div>
          <h2>{props.data.title}</h2>
          <div className="cardAddress"><span className="icon-pointer" />
            {props.data.location.city}, {props.data.location.country},
            </div>
          <ul className="cardFeat">
            <li><span className="fa fa-moon-o" /> {props.data.contractType}</li>
            <li><span className="icon-drop" /> {props.data.nodeName}</li>
            <li><span className="icon-frame" /> {new Date(props.data.endDate).toDateString()} Sq Ft</li>
          </ul>
        </a>
        <HouseDetailModel status={modalStatus} changeStatus={setModalStatus} data={props.data}/>
      </div>
    )
}

export default SingleHouse;