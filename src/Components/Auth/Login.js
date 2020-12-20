import React from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loggedUser, loginUser } from "../../services/Auth";
import Grid from "@material-ui/core/Grid";
import image from '../../Assets/lime-bank-employee.png';
import {Button, Paper} from "@material-ui/core";
import CustomInput from "../Common/CustomInput";
import Facebook from "./Facebook";
import Google from "./Google"

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
      addClass: true,
      buttonText: "Register"
    };

    this.informParent = this.informParent.bind(this)
  }

  componentDidMount() {
    this.setState({ buttonText: "Register" })
    // this.props.auth.isAuthenticated
    // this.rightSide.classList.add("left");
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/home"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter

  };

  toggle() {
    this.setState({ buttonText: "" })
    this.setState({ addClass: !this.state.addClass });
  }

  informParent = response => {
    //this.props.history.push('/dashboard');
    console.log(response)
    this.props.loggedUser(response.data)
  };

  render() {
    const { errors } = this.state;
    let rightClass = [""];
    if (this.state.addClass) {
      rightClass.push('right-side right');
    }
    else {
      rightClass.push('right-side left');
      setTimeout(() => { this.props.history.push("/Register"); }, 500);
    }
    return (
        <Grid container spacing={1} direction={"row"} style={{backgroundColor: "white"}}>
          <Grid item xs={12} sm={5} md={6}>
            <img src={image} className="bg_image"/>
          </Grid>
          <Grid item xs={12} sm={7} md={6}>
              <Grid container spacing={0} direction={"row"}>
                <Grid item xs={12} sm={2} md={2}>
                </Grid>
                <Grid item xs={12} sm={9} md={8}>
                  <div className="root_panel">
                  <Paper elevation={10}  className="panel">
                    <div className ="txt">
                      <span className="h1">Let's Begin</span>
                      <br/>
                      <span className="h2">Login an account to continue</span>
                    </div>
                    <form  noValidate autoComplete="off" className="form">                
                      <CustomInput
                        id="email"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          onChange:this.onChange,
                          autoFocus:true,
                          helperText:"Enter Email Address.",
                          required:true,
                        }}
                        labelText="Email address" />
                      <CustomInput
                        id="password"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          autoFill:true,
                          type: "password",
                          onChange:this.onChange,
                          helperText:"Enter Password",
                          required:true,
                        }}
                        labelText="Password"/>
                      <div className="submit">
                        <Button className="submit_btn" onClick={this.onSubmit}>Let's GO</Button>
                      </div>
                    </form>
                    <hr/>
                    <div className="social_icons">
                      <Facebook informParent={this.informParent}/>                  
                      <Google informParent={this.informParent}/>
                    </div>
                  </Paper>
                    </div>
                </Grid>
              </Grid>
          </Grid>
        </Grid>
    );
  }
}

const useStyles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});


export default connect(
  mapStateToProps,
  { loginUser, loggedUser }
)(Login);
