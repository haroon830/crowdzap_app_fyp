import * as React from 'react';
import './style.css';
import MyWallet from './Components/MyWallet';
import SendForm from './Components/SendForm';
import RequestForm from './Components/RequestForm';
import Dashboard from 'Components/DashboardLayout';

class WalletPage extends React.Component {
  constructor(props) {
    super(props);
    this.WalletPageSection = {
      myWallet: (<MyWallet />),
      send: (<SendForm />),
      request: (<RequestForm />),
      notfound: (null)
    };
  }
  matchSection = () => {
    const walletAction = this.props.match.params.action;
    switch (walletAction) {
      case undefined: 
        return this.WalletPageSection.myWallet;
      case 'send':
        return this.WalletPageSection.send;
      case 'request': 
        return this.WalletPageSection.request;
      default:
        return this.WalletPageSection.notfound;
    }
  }
  render() {
    return (
      <div className="walletPage">
        <Dashboard>
          <div className="walletWrapper">
            {this.matchSection()}
          </div>
        </Dashboard>
      </div>
    );
  }
}

export default WalletPage;