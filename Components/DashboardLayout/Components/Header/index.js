import * as React from 'react';
import './style.css';

import { Icon } from 'react-fa';

import UserMenu from 'Components/UserMenu';
import NotifyMenu from './Components/NotifyMenu';
import SearchForm from './Components/SearchForm';
import { Link } from 'react-router-dom';



class Header extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div className="dashboardHeader">
        <div className="logo">
          <Link to="/">
            <Icon className="fa fa-home marker" name="home" />
            <span className="logoText">reales</span>
          </Link>
        </div>
        <a href="#" className="navHandler" onClick={(e) => this.props.clickToggle()}><Icon  name="bars" /></a>
        <div className="userMenuWrapper">
          <UserMenu />
        </div>
        <NotifyMenu />
        <div className="clearfix" />
      </div>
    );
  }
}

export default Header;