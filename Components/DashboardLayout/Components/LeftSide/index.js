import * as React from 'react';
import './style.css';
import { Icon } from 'react-fa';
import { Link } from 'react-router-dom';


class LeftSide extends React.Component {
  render() {
    return (
      <div className={`leftSide slimScroll${this.props.isExpand ? ' expanded' : ' minimized'}`}>
        <nav className="leftNav scrollable bigNav">
          <ul>
            <li><Link to="/search">
              <Icon className="navIcon" name="compass" />
              <span className="navLabel">Search</span>
            </Link></li>
            <li><Link to="/investments_managment">
              <Icon className="navIcon" name="shield" />
              <span className="navLabel">Investments</span>
            </Link></li>
            <li><Link to="/new_property">
              <Icon className="navIcon" name="plus-circle" />
              <span className="navLabel">Add Property</span>
            </Link></li>
            <li><Link to="/property/mylisting">
              <Icon className="navIcon icon-home" name="home" />
              <span className="navLabel">Properties</span>
            </Link></li>
           <li>
                <Link to="/authorityContract">
                <Icon className="navIcon" name="circle-o" />
                <span className="navLabel">Contract</span>
                </Link>
            </li>
            <li>
                <Link to="/admin_kyc_request">
                <Icon className="navIcon" name="key" />
                <span className="navLabel">KYC Requests</span>
                </Link>
            </li>
            <li>
                <Link to="/contactus">
                <Icon className="navIcon" name="comments" />
                <span className="navLabel">Contact Us</span>
                </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default LeftSide;
