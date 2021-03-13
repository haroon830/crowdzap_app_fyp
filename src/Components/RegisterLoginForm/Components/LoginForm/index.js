import * as React from 'react';
import './style.css';
import { Icon } from 'react-fa';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { loginUser, loggedUser} from 'Services/User';
import {clearError} from "Redux/User";
import Alert from 'Components/Common/Alert'
import {connect} from "react-redux"
import {withRouter} from 'react-router-dom'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remember: false,
      email: '',
      password: '',
      errors: this.props.error//Used if there exist any error on LoginProcess
    };
    this.informParent = this.informParent.bind(this)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.isAuthenticated){
      this.props.history.push("/search")
    }
  }

  signIn = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }

  toggleRemember = (e) => {
    this.setState({
      remember: e.currentTarget.checked
    });
  }
  changeTextData = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  informParent = response => {
    //this.props.history.push('/dashboard');
    console.log(response)
    this.props.loggedUser(response.data)
  };

  render() {
    return (
      <div className={'loginForm modal slimScroll fade' + (this.props.active ? ' in' : '')}>
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Sign In</h4>
            </div>
            <div className="modal-body">
              <Alert show={this.props.registered} class='success' clearer={this.props.clearError}  message='Account created successfully,now sign in!.'/>
              <Alert show={this.props.error} class='danger' clearer={this.props.clearError} message='Email or Password wrong.'/>
              <div style={{marginLeft: '40%'}}>
                <Loader type="Bars" color="#00A9A4" height={40} width={60} visible={this.props.processing}/>
              </div>
              <form role="loginForm form" onSubmit={this.signIn}>
                <div className="form-group">
                  <div className="btn-group-justified">
                    <div className="btn btn-lg btn-facebook">
                      <Icon name="facebook" className="pull-left" />
                      <span>Sign In with Facebook</span>
                    </div>
                  </div>

                </div>
                <div className="form-group">
                  <div className="btn-group-justified">
                    <div className="btn btn-lg btn-google">
                      <Icon name="google" className="pull-left" />
                      <span>Sign In with Google</span>
                    </div>
                  </div>
                </div>
                <div className="signOr">OR</div>
                <div className="form-group">
                  <input
                    type="text"
                    id="email"
                    placeholder="Email Address"
                    className="form-control"
                    onChange={this.changeTextData}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="form-control"
                    onChange={this.changeTextData}
                  />
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-xs-6">
                      <div className="checkbox custom-checkbox">
                        <label>
                          <input type="checkbox" checked={this.state.remember} onChange={this.toggleRemember} />
                          <Icon name="check" />
                          Remember me
                        </label>
                      </div>
                    </div>
                    <div className="col-xs-6 align-right">
                      <p className="help-block">
                        <a href="#" className="text-green isThemeText text-red">
                          Forgot password?
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="btn-group-justified">
                    <button type="submit" disabled={(this.props.processing)?true: false} className="btn btn-lg btn-green isThemeBtn btn-red">
                      Sign In
                    </button>
                  </div>
                </div>
                <p className="help-block">
                  <span>Don't have an account? </span>
                  <a
                    className="modal-su text-green isThemeText text-red"
                    onClick={this.props.openRegisterForm}
                  >
                    Sign Up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  registered : state.auth.registered,
  processing: state.auth.processing,
  error: state.auth.error,
});


export default connect(
    mapStateToProps,
    { loginUser, loggedUser, clearError}
)( withRouter(LoginForm));
