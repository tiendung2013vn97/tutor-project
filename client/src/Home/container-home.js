import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { logout } from "../Account/action-account";
import { updateAccountInfo } from "../Account/action-account";
import {
  showAlertNotify,
  showSuccessNotify,
  showFailNotify
} from "../Notify/action-notify";
import Home from "./Home";
import config from "../config";
import { updateLocation } from "../Location/action-location";
import Axios from "../Api";

class HomeContainer extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.state = {
      remarkPersons: []
    };
  }

  componentDidMount() {
    let user = localStorage.getItem("user");
    if (user) {
      this.props.storeAccountInfo(JSON.parse(user));
    }
    this.props.getLocation();
    Axios.get("/public-user/top-rate")
      .then(res => {
        if (res.data.status === "fail") {
          switch (res.data.code) {
            case "WRONG_USERNAME_OR_PASSWORD": {
              this.props.showFailNotify(
                "Username hoặc password không hợp lệ! Vui lòng kiểm tra lại!"
              );
              break;
            }
            case "ACCOUNT_IS_BLOCKED": {
              this.props.showAlertNotify(
                "Tài khoản này hiện đang bị khóa, vui lòng quay lại sau, hoặc liên hệ admin!"
              );
              break;
            }

            default: {
              this.props.showFailNotify(res.data.msg);
              break;
            }
          }
        }

        this.setState({ ...this.state, remarkPersons: res.data });
      })
      .catch(err => {
        this.props.showAlertNotify("" + err);
      });
  }

  //render
  render() {
    return (
      <Home
        account={this.props.account}
        logout={this.props.logout}
        remarkPersons={this.state.remarkPersons}
      />
    );
  }
}

//map state to props
function mapStateToProps(state) {
  return {
    account: state.account
  };
}

//map dispatch to props
function mapDispatchToProps(dispatch) {
  return {
    logout() {
      localStorage.clear();
      return dispatch(logout());
    },
    //show alert dialog
    showAlertNotify(msg) {
      return dispatch(showAlertNotify(msg));
    },

    //show fail dialog
    showFailNotify(msg) {
      return dispatch(showFailNotify(msg));
    },

    //show alert dialog
    showSuccessNotify(msg) {
      return dispatch(showSuccessNotify(msg));
    },
    storeAccountInfo(info) {
      return dispatch(updateAccountInfo(info));
    },
    getLocation() {
      const api = axios.create({ baseURL: config.URL });
      api
        .get("/location")
        .then(res => {
          return dispatch(updateLocation(res.data.data));
        })
        .catch(err => {
          return dispatch(showAlertNotify("" + err));
        });
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
