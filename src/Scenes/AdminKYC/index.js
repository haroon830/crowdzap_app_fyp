import React, {useEffect} from 'react';
import './style.css';
import Dashboard from 'Components/DashboardLayout';
import KYCRequest from './Components';

class AdminKYCPage extends React.Component{    
  render() {
    return (
      <div className="searchPage">
        <Dashboard>
          <div className="dashboardTitle">
            <h3>KYC REQUESTS</h3>
          </div>
          <div className="details">
            <KYCRequest />
          </div>
        </Dashboard>
      </div>
    );
  }
}

export default AdminKYCPage;