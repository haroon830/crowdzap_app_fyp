import * as React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { Icon } from 'react-fa';
import LocalStore from "../../Config/localStore";
import {connect} from "react-redux";
import {processKyc} from "../../Services/Setting";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook} from '@fortawesome/free-solid-svg-icons'

class UserMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
    this.wrapperRef = null
  }
  showToggle = () => {
    if (this.state.showMenu) {
      document.removeEventListener('click', this.handleClickOutside);
    } else {
      document.addEventListener('click', this.handleClickOutside);
    }
    this.setState({
      showMenu: !this.state.showMenu
    });
    
  }
  handleClickOutside = (e) => {
    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(e.target) &&
      this.state.showMenu
    ) {
      this.showToggle();
    }
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }
  logout = () => {
    /* Index code */
    let localStore = new LocalStore()
    localStore.clearToken()
    localStore.clearClientId()
    window.location.href = '/';
    /* End test code */
  }
  render() {
    return (
      <div 
        className={`userMenuContainer${this.state.showMenu ? ' open' : ''}`} 
        onClick={this.showToggle}
        ref={(div) => {this.wrapperRef = div; }}
      >
        <a href="#" className="userHandler dropdown-toggle" data-toggle="dropdown">
          <Icon name="user-o" /><span className="counter">5</span></a>
        <a href="#" className="headerUser dropdown-toggle" data-toggle="dropdown">
          <img className="avatar headerAvatar pull-left" src="http://mariusn.com/themes/reales/images/avatar-1.png" />
          <div className="userTop pull-left">
            <span className="headerUserName">{(this.props.user)?this.props.user.name:"Welcome"}</span>
            <Icon name="angle-down" />
          </div>
          <div className="clearfix" />
        </a>
        <div className="dropdown-menu pull-right userMenu" role="menu">
          <div className="mobAvatar">
            <img
              className="avatar mobAvatarImg"
              src="http://mariusn.com/themes/reales/images/avatar-1.png"
              alt="avatar"
            />
            <div className="mobAvatarName">{(this.props.user)?this.props.user.name:"Welcome"}</div>
          </div>
          <ul>
            <li><Link to="/wallet"><span className="walletIcon fa" />Wallet</Link></li>
            <li><Link to="/profiling/kyc"><Icon name="cog" />Kyc</Link></li>
            <li><Link to="/profiling"><Icon name="user" />Profile</Link></li>
            <li><Link to="/profiling/contacts"><FontAwesomeIcon icon={faAddressBook} size={"1x"}  />  Contacts</Link></li>
            <li><a href="#">
              <Icon name="bell-o" />
              Notifications
              <span className="badge pull-right bg-red">5</span>
            </a></li>
            <li className="divider" />
            <li><a href="#" onClick={this.logout}><Icon name="power-off" />Logout</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});
export default connect(
    mapStateToProps,
    { processKyc}
)(UserMenu)