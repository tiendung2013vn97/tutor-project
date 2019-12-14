import React, { Component } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import { Button, Row, Col, Select } from "antd";
const { Option } = Select;

class SignIn extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.state={
        type:"teacher"
    }
  }

  //render
  render() {
    return (
      <div className="login-page">
        <div className="login-page_main">
          <div className="form-login">
            <div className="row-input required">
              <span className="label"> Username:</span>
              <input type="text" id="username_val" />
            </div>
            <div className="row-input required">
              <span className="label"> Password: </span>
              <input type="password" id="password_val" />
            </div>
          </div>
          <div className="btn-login" onClick={this.handleLogin}>
            Sign in
          </div>
        </div>
      </div>
    );
  }

  /** handleLogin
    handle user click button send
  */
  handleLogin() {
    let username = document.getElementById("username_val").value;
    let password = document.getElementById("password_val").value;

    let userInformation = {
      username: username,
      password: password
    };
    this.props.login(userInformation);
  }
  
  handleTypeChange(type) {
    this.setState({ ...this.state, type });
  }
}

export default SignIn;
