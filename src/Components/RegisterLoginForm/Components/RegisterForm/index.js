import * as React from 'react';
import './style.css';
import { Icon } from 'react-fa';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import {connect} from 'react-redux'
import {registerUser} from 'Services/User'
import {clearError} from "Redux/User";
import {withRouter} from "react-router-dom";
import Alert from 'Components/Common/Alert'


class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verifyCode: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      isActiveForm: false,
      isLoading: false
    }
    this.handleChangeForm = this.handleChangeForm.bind(this)
  }
  submitRegister = (e) => {
    e.preventDefault();
    const registerData = {
      name: this.state.name,
      password: this.state.password,
      email: this.state.email,
    };
    this.props.registerUser(registerData)
  }

  handleChangeForm = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.id] : e.target.value
    })
  }
  registerForm() {
    return (
      <form role="form" onSubmit={this.submitRegister}>
        <div className="form-group">
          <div className="btn-group-justified">
            <a href="explore.html" className="btn btn-lg btn-facebook">
              <Icon name="facebook" className="pull-left" />
              <span>Sign In with Facebook</span>
            </a>
          </div>
        </div>
        <div className="form-group">
          <div className="btn-group-justified">
            <a href="explore.html" className="btn btn-lg btn-google">
              <Icon name="google" className="pull-left" />
              <span>Sign In with Google</span>
            </a>
          </div>
        </div>
        <div className="signOr">OR</div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            id="name"
            className="form-control"
            value={this.state.name}
            onChange={this.handleChangeForm}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            className="form-control"
            value={this.state.email}
            onChange={this.handleChangeForm}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="form-control"
            value={this.state.password}
            onChange={this.handleChangeForm}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            className="form-control"
            value={this.state.confirmPassword}
            onChange={this.handleChangeForm}
          />
        </div>
        <div className="form-group">
          <div className="btn-group-justified">
            <button type="submit" disabled={(this.props.processing)?true: false} className="btn btn-lg btn-green isThemeBtn">Sign Up</button>
          </div>
        </div>
        <p className="help-block">
          <span>Already a member? </span>
          <a
            href="#"
            className="modal-su text-green isThemeText text-red"
            onClick={this.props.openLoginForm}
          >
            Sign In
          </a>
        </p>
      </form>
    );
  }
  activeForm() {
    return (
      <form role="form" onSubmit={this.submitActive}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Verify Code"
            className="form-control"
            value={this.state.verifyCode}
            onChange={(e) => { this.changeFormData('verifyCode', e.currentTarget.value); }}
          />
        </div>
        <div className="form-group">
          <div className="btn-group-justified">
            <button type="submit" className="btn btn-lg btn-green isThemeBtn">Verify</button>
          </div>
        </div>
      </form>
    );
  }
  render() {
    return (
      <div
        className={'registerForm slimScroll modal fade' + (this.props.active ? ' in' : '')}
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                {this.state.isActiveForm ? 'Verify your account' : 'Sign up'}
              </h4>
            </div>
            <div className="modal-body">
              <Alert show={this.props.registered} class='success' clearer={this.props.clearError}  message='Account created successfully,now sign in!.'/>
              <Alert show={this.props.error} class='danger' clearer={this.props.clearError} message='Failed to create account.'/>
              <div style={{marginLeft: '40%'}}>
                <Loader
                    type="Bars"
                    color="#00A9A4"
                    height={40}
                    width={60}
                    visible={this.props.processing}
                />
              </div>
              {this.state.isActiveForm ? this.activeForm() : this.registerForm()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  registered: state.auth.registered,
  processing: state.auth.regProcessing,
  error: state.auth.regError,
});

export default connect(
    mapStateToProps,
    { registerUser, clearError}
)( withRouter(RegisterForm));