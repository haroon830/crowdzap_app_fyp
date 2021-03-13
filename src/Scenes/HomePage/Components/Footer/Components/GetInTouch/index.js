import * as React from 'react';
import './style.css';

class GetInTouch extends React.Component {
  
  render() {
    return (
      <div className="getInTouch col-xs-12 col-sm-6 col-md-3 col-lg-3">
        <div className="touchTitle osLight">
          {this.props.children}
        </div>
        <ul className="mainList">
          <li className="footer-phone"><span className="fa fa-phone"/> 0349 9577345</li>
          <li className="footer-address osLight">
            <p>Comsats University,</p>
            <p>Islamabad
            </p>
          </li>
          <li>
          <a href="#" className="btn btn-sm btn-icon btn-round btn-o btn-white">
            <span className="fa fa-facebook"/>
          </a> 
          <a href="#" className="btn btn-sm btn-icon btn-round btn-o btn-white">
            <span className="fa fa-twitter"/>
          </a> 
          <a href="#" className="btn btn-sm btn-icon btn-round btn-o btn-white">
            <span className="fa fa-google-plus"/>
          </a> 
          <a href="#" className="btn btn-sm btn-icon btn-round btn-o btn-white">
            <span className="fa fa-linkedin"/>
          </a> 
          </li>
        </ul>
      </div>
    );
  }
}

export default GetInTouch;