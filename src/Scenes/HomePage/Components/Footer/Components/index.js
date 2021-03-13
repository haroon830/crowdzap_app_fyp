import * as React from 'react';
import './style.css';

import ListComp from './ListComp';
import GetInTouch from './GetInTouch';
import Subscribe from './Subscribe';

class FooterContainer extends React.Component{
  listCompany =  [
    'Market Place',
    'Wallet',
    'Investment Management',
    'Blog',
    'Help',
    'Policies',
    'Terms & Privacy'
  ];
  render() {
    return (
      <div className="footerContainer">
        <div className="row">
            <ListComp list={this.listCompany}>Company</ListComp>
            <GetInTouch>Get in Touch</GetInTouch>
            <Subscribe>Subscribe to Our Newsletter</Subscribe>
        </div>
        <div className="footerCopyRight">
        Cubator Company<br/> © Powered By Blockchain
        </div>
      </div>
    );
  }
}

export default FooterContainer;