import * as React from 'react';
import './style.css';

function PollInfo(props){

        return (
            <div className="agentInfoContainer">
                <div className="avatar">
                    <img src={props.avatar} alt="avatar" />
                </div>
                <div className="info">
                    <div className="name">{props.name}</div>
                    <div className="title">{props.title}</div>
                    <div className="address">{props.address}</div>
                </div>
                <div className="ops">
                    <a href="#" className="btn btn-icon btn-round btn-o btn-magenta btn-sm">
                        <span className="fa fa-envelope-o"/>
                    </a>
                    <a href="#" className="btn btn-icon btn-round btn-o btn-red btn-sm">
                        <span className="fa fa-heart-o"/>
                    </a>
                </div>
            </div>
        );
}

export default PollInfo;