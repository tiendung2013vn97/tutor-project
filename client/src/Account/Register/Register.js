import React, { Component } from "react";
import "./Register.scss";
import { Button, Row, Col, Select } from "antd";

const { Option } = Select;

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {
      gender: "male",
      type:"teacher"
    };
  }

  render() {
    return (
      <div className="sign-up-page">
        <div className="sign-up-page_main">
          <div className="form">
            <Row>
              <Col span={11}>
                <div className="row-input required">
                  <span className='label'> Họ và tên: </span>
                  <input id="fullname_val" placeholder="Nguyễn Tiến Dũng" />
                </div>
                <div className="row-input required">
                  <span className='label'> Username:</span>
                  <input id="username2_val" placeholder="dung123" />
                </div>
                <div className="row-input required">
                  <span className='label'> Password: </span>
                  <input type="password" id="password2_val" />
                </div>
              </Col>
              <Col span={11} style={{ marginLeft: 20 }}>
                <div className="row-input required">
                  <span className='label'> Email: </span>
                  <input
                    type="email"
                    id="email_val"
                    placeholder="abc@gmail.com"
                  />
                </div>
                <div className="row-input required">
                  <span className='label'> Tuổi: </span>
                  <input type="number" id="age_val" placeholder="22" />
                </div>
                <div className="row-input required">
                  <span className='label'> Giới tính: </span>
                  <Select
                    defaultValue={this.state.gender}
                    onChange={this.handleGenderChange.bind(this)}
                    style={{width:"100%",fontSize:"1.2rem"}}
                    size="large"
                  >
                    <Option value="male">Nam</Option>
                    <Option value="female">Nữ</Option>
                  </Select>
                </div>
               
              </Col>
            </Row>
            <Row>
            <div className="row-input required">
                  <span className='label'> Bạn đang có nhu cầu: </span>
                  <Select
                    defaultValue={this.state.type}
                    onChange={this.handleTypeChange.bind(this)}
                    style={{width:"100%",fontSize:"1.2rem",height:"40px"}}
                    size="large"
                  >
                    <Option value="teacher">Tìm người học</Option>
                    <Option value="student">Tìm người dạy</Option>
                  </Select>
                </div>
            </Row>
            <br/>
          </div>

          <div className="btn-signup" onClick={this.handleSignUp}>
            Sign up
          </div>
        </div>
      </div>
    );
  }

  /** handleSignUp
    handle user click button sign up
  */
  handleSignUp() {
    let username = document.getElementById("username2_val").value;
    let password = document.getElementById("password2_val").value;
    let email = document.getElementById("email_val").value;
    let fullname = document.getElementById("fullname_val").value;
    let age = document.getElementById("age_val").value;
    let gender = this.state.gender;
    let type=this.state.type

    let userInformation = {
      username,
      password,
      email,
      fullname,
      age,
      gender,
      type
    };
    console.log("user", userInformation);
    this.props.signUp(userInformation);
    //let btnSignUp=document.getElementsByClassName('btn-signup')[0];
  }

  handleGenderChange(gender) {
    this.setState({ ...this.state, gender });
  }

  handleTypeChange(type) {
    this.setState({ ...this.state, type });
  }
}

export default Register;
