import * as React from 'react';
import './style.css';
import { Icon } from 'react-fa';
import { connect } from 'react-redux';
import RLForm from 'Components/RegisterLoginForm';
import UserMenu from 'Components/UserMenu';
import { Link } from 'react-router-dom';
import { getTranslation, SupportedLanguage } from 'Services/Geo';
import LanguageSelector from 'Components/LanguageSelector';

const mapStateToProps = (state) => ({
  lang: state.setting.lang,
  isLogin: state.auth.isAuthenticated
});


class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHandlerActive: false,
      isLogin: props.isLogin
    };
  }
  toggleHandler = () => {
    this.setState({
      isHandlerActive: !this.state.isHandlerActive
    });
  }
  updateFormStatus = (status) => {
    this.setState({
      rlFormStatus: status
    });
  }
  loginField = () => {
    if (this.state.isLogin) {
      return (
        <li className="userMenuLi">
          <div className="userMenuWrapper">
            <UserMenu />
          </div>
        </li>
      );
    }
    return [
      (
        <li key="0"><a href="#" onClick={() => this.updateFormStatus('register')}>
          {getTranslation(this.props.lang, 'Sign Up')}
        </a></li>
      ),
      (
        <li key="1"><a href="#" onClick={() => this.updateFormStatus('login')}>
          {getTranslation(this.props.lang, 'Sign In')}
        </a></li>
      )
    ];
  }
  render() {
    return (
      <div className="menuBar">
        <a href="/">
          <div className="homeLogo osLight">
            <Icon name="home" size="2x" /> 
            <span>CrowdZap</span>
          </div>
        </a>
        <a 
          href="#" 
          className={'homeNavHandler visible-xs' + (this.state.isHandlerActive ? ' active' : '')} 
          onClick={this.toggleHandler}
        >
          <Icon name="bars" />
        </a>
        <div className={'homeNav' + (this.state.isHandlerActive ? ' active' : '')} >
          <ul>
            <li className="moreOption">
              <Link to="/search?type=sale">{getTranslation(this.props.lang, 'MarketPlace')}</Link>
            </li>
            <li className="moreOption">
              <Link to="wallet">{getTranslation(this.props.lang, 'Wallet')}</Link>
            </li>
            <li className="moreOption">
              <Link to="/agent/search">{getTranslation(this.props.lang, 'Commercial')}</Link>
            </li>
            <li className="moreOption">
              <Link to="/projects">{getTranslation(this.props.lang, 'About')}</Link>
            </li>
            {this.loginField()}
            <li>
              <Link to="/search?type=sale"><div className="btn btn-green">
                {getTranslation(this.props.lang, 'View All Projects')}
              </div></Link>
            </li>
          </ul>
        </div>
        <RLForm 
          type={this.state.rlFormStatus} 
          openRegisterForm={() => this.updateFormStatus('register')} 
          openLoginForm={() => this.updateFormStatus('login')}
          close={() => this.updateFormStatus()}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(MenuBar);