import * as React from 'react';
import './style.css';
import Dashboard from 'Components/DashboardLayout';
import SingleHouse from 'Components/SingleHouse';

const houseData = {
  name: 'Modern Residence in New York',
  address: ' 39 Remsen St, Brooklyn, NY 11201, USA',
  beds: 3,
  toilets: 2,
  square: 20,
  img: 'http://mariusn.com/themes/reales/images/prop/1-1.png'
};

class MyHousePage extends React.Component {
  render() {
    return (
        <Dashboard>
          <div className="dashboardTitle">
            <h3>Property ({this.props.match.params.id})</h3>
          </div>
          <div className="main">
            <div className="col-lg-6 col-md-6" >
              <SingleHouse data={houseData} />
            </div>
          </div>
        </Dashboard>
    );
  }
}

export default MyHousePage;