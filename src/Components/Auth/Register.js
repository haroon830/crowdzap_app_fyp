import React from "react";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../services/Auth";
import Grid from "@material-ui/core/Grid";
import image from '../../Assets/lime-bank-employee.png';
import {Button, Paper, Checkbox} from "@material-ui/core";
import CustomInput from "../Common/CustomInput";
import Facebook from "./Facebook";
import Google from "./Google"

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      email: '',
      addClass: true,
      errors: {},
      buttonText: "Login"
    };


  }

  componentDidMount() {

    this.setState({ buttonText: "Login" })
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    this.props.registerUser(newUser, this.props.history);
    console.log(newUser);

  };

  toggle() {
    this.setState({ buttonText: "" })
    this.setState({ addClass: !this.state.addClass });
  }

  render() {
    const { errors } = this.state;
    let rightClass = [""];
    if (this.state.addClass) {
      rightClass.push('right-side left');
    }
    else {
      rightClass.push('right-side right');
      setTimeout(() => { this.props.history.push("/Login"); }, 500);

    }
    return (
      <Grid container spacing={1} direction={"row"}>
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
                  <span className="h2">Create an account to continue</span>
                </div>
                <form  noValidate autoComplete="off" className="form">
                  <CustomInput
                      id="name"
                      formControlProps={{
                          fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        onChange:this.onChange,
                        autoFocus:true,
                        helperText:"Enter Name.",
                        required:true,
                      }}
                      labelText="Full Name" />
                  <CustomInput
                      id="email"
                      formControlProps={{
                          fullWidth: true
                      }}
                      inputProps={{                  
                        type: "text",
                        onChange:this.onChange,
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
                      type: "password",
                      onChange:this.onChange,
                      helperText:"Enter Password",
                      required:true,
                    }}
                    labelText="Password"
                    />
                  <span className="terms">
                    <Checkbox required/>
                    <p>I accept <a>terms & conditions</a></p>
                  </span>
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));