import * as React from 'react';
import './style.css';
import RegisterForm from './Components/RegisterForm';
import LoginForm from './Components/LoginForm';


class RLForm extends React.Component {
  clickOutside = (e) => {
    const target = e.target;
    if (target.className.indexOf(this.props.type + 'Form') !== -1) {
      this.props.close();
    } 
  }
  render() {
    return (
      <div 
        className={'RLForm' + (this.props.type ? ' modal-open' : '')}
        onClick={this.clickOutside}
      >
        <RegisterForm active={this.props.type === 'register'} openLoginForm={this.props.openLoginForm}/>
        <LoginForm active={this.props.type === 'login'}  openRegisterForm={this.props.openRegisterForm}/>
        <div className={'modal-backdrop fade' + (this.props.type ? ' in' : '')}/>
      </div>
    );
  }
}

export default RLForm;