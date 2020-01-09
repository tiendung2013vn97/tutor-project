import React, { Component } from "react";
import "./ForgetPassword.scss";
import { Link } from "react-router-dom";
import { Button, Row, Col, Select } from "antd";
const { Option } = Select;

class ForgetPassword extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {
      type: "teacher"
    };
  }

  //render
  render() {
    return (
      <div className="login-page">
        <div className="login-page_main">
          <div className="form-login">
            <div className="row-input required">
              <span className="label"> Username:</span>
              <input type="text" id="username_val" placeholder="Username" />
            </div>
            <div className="row-input required">
              <span className="label"> Mật khẩu mới:</span>
              <input type="password" id="password_val" placeholder="password" />
            </div>
            <div className="row-input required">
              <span className="label"> Nhập lại:</span>
              <input
                type="password"
                id="password_val2"
                placeholder="password"
              />
            </div>
          </div>
          <div className="btn-login" onClick={this.submit}>
            Xác nhận
          </div>
          <br />
          <br />
        </div>
      </div>
    );
  }

  /** submit
    handle user click button send
  */
  submit() {
    let username = document.getElementById("username_val").value;
    let password = document.getElementById("password_val").value;
    let password2 = document.getElementById("password_val2").value;
    if (password === "") {
      return this.props.showAlertNotify("Vui lòng nhập mật khẩu");
    }

    if (password !== password2) {
      return this.props.showAlertNotify(
        "Mật khẩu nhập lại không giống nhau! Vui lòng nhập lại"
      );
    }

    let userInformation = {
      username: username,
      newPassword: password
    };
    this.props.submit(userInformation);
  }

  handleTypeChange(type) {
    this.setState({ ...this.state, type });
  }
}

export default ForgetPassword;
