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
      type: "teacher",
      locationCity: "",
      locationDistrict: ""
    };
  }

  render() {
    let cityList = this.props.location.map(lo => lo.city);
    cityList = cityList.filter((city, index) => {
      return !cityList.slice(0, index).includes(city);
    });

    if (this.state.locationCity === "" && cityList[0]) {
      this.setState({
        ...this.state,
        locationCity: cityList[0],
        locationDistrict: this.props.location
          .filter(lo => lo.city === cityList[0])
          .map(lo => lo.district)[0]
      });
    }

    let districtList = this.props.location
      .filter(lo => lo.city === this.state.locationCity)
      .map(lo => lo.district);

    let cityComboBox = [];
    cityList.forEach(city => {
      cityComboBox.push(<Option value={city}>{city}</Option>);
    });

    let districtComboBox = [];
    districtList.forEach(district => {
      districtComboBox.push(<Option value={district}>{district}</Option>);
    });

    return (
      <div className="sign-up-page">
        <div className="sign-up-page_main">
          <div className="form">
            <Row className="row-input">
              <Col span={11}>
                <div className="row-input required">
                  <span className="label"> Họ và tên: </span>
                  <input id="fullname_val" placeholder="Nguyễn Tiến Dũng" />
                </div>
                <div className="row-input required">
                  <span className="label"> Username:</span>
                  <input id="username2_val" placeholder="dung123" />
                </div>
                <div className="row-input required">
                  <span className="label"> Password: </span>
                  <input type="password" id="password2_val" />
                </div>
              </Col>
              <Col span={11} style={{ marginLeft: 20 }}>
                <div className="row-input required">
                  <span className="label"> Email: </span>
                  <input
                    type="email"
                    id="email_val"
                    placeholder="abc@gmail.com"
                  />
                </div>
                <div className="row-input required">
                  <span className="label"> Tuổi: </span>
                  <input type="number" id="age_val" placeholder="22" />
                </div>
                <div className="row-input required">
                  <span className="label"> Giới tính: </span>
                  <Select
                    defaultValue={this.state.gender}
                    onChange={this.handleGenderChange.bind(this)}
                    style={{ width: "100%", fontSize: "1.2rem" }}
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
                <div>
                  <span className="label"> Nơi ở: </span>
                </div>
                <Row>
                  <Col span={11}>
                    <span>Tỉnh/Thành phố</span>
                    <Select
                      defaultValue={this.state.locationCity}
                      value={this.state.locationCity}
                      onChange={this.handleCityChange.bind(this)}
                      style={{
                        width: "100%",
                        fontSize: "1.2rem",
                        height: "40px"
                      }}
                      size="large"
                    >
                      {cityComboBox}
                    </Select>
                  </Col>
                  <Col span={11} style={{ marginLeft: 20 }}>
                    <span>Quận/Huyện</span>
                    <Select
                      value={this.state.locationDistrict}
                      onChange={this.handleDistrictChange.bind(this)}
                      style={{
                        width: "100%",
                        fontSize: "1.2rem",
                        height: "40px"
                      }}
                      size="large"
                    >
                      {districtComboBox}
                    </Select>
                  </Col>
                </Row>
              </div>
            </Row>

            <Row>
              <div className="row-input required">
                <span className="label"> Bạn đang có nhu cầu: </span>
                <Select
                  defaultValue={this.state.type}
                  onChange={this.handleTypeChange.bind(this)}
                  style={{ width: "100%", fontSize: "1.2rem", height: "40px" }}
                  size="large"
                >
                  <Option value="teacher">Tìm người học</Option>
                  <Option value="student">Tìm người dạy</Option>
                </Select>
              </div>
            </Row>
            <br />
          </div>

          <div className="btn-signup" onClick={this.handleSignUp}>
            Đăng kí
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
    let type = this.state.type;

    let locationId = -1;
    if (!this.state.locationCity || !this.state.locationDistrict) {
      return alert("Vui lòng đợi dữ liệu location được tải hoàn tất!");
    } else {
      locationId = this.props.location.filter(
        lo =>
          lo.city === this.state.locationCity &&
          lo.district === this.state.locationDistrict
      )[0].id;
    }

    let userInformation = {
      username,
      password,
      email,
      fullname,
      age,
      gender,
      type,
      locationId
    };
    this.props.signUp(userInformation);
    //let btnSignUp=document.getElementsByClassName('btn-signup')[0];
  }

  handleGenderChange(gender) {
    this.setState({ ...this.state, gender });
  }

  handleTypeChange(type) {
    this.setState({ ...this.state, type });
  }

  handleCityChange(locationCity) {
    let locationDistrict = this.props.location.filter(
      lo => lo.city === locationCity
    )[0].district;

    this.setState({
      ...this.state,
      locationCity,
      locationDistrict
    });
  }

  handleDistrictChange(locationDistrict) {
    this.setState({ ...this.state.locationCity, locationDistrict });
  }
}

export default Register;
