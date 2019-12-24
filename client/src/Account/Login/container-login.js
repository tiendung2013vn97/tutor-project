import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  showAlertNotify,
  showSuccessNotify,
  showFailNotify
} from "../../Notify/action-notify";
import SignIn from "./Login";
import { updateAccountInfo } from "../action-account";
import config from "../../config";
import { changeStatus } from "../../Loading/action-loading";

class SignInContainer extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  //render
  render() {
    return <SignIn login={this.login} />;
  }

  login(userInformation) {
    this.props.changeLoadingStatus(true);
    const api = axios.create({ baseURL: config.URL });
    api
      .post("/public-user/login", userInformation)
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
              );break;
            }

            default: {
               this.props.showFailNotify(res.data.msg);break
            }
          }

          return this.props.changeLoadingStatus(false);
        }

        let user = res.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", res.data.token);
        this.props.storeAccountInfo(user);
        this.props.changeLoadingStatus(false);
      })
      .catch(err => {
        this.props.showAlertNotify("" + err);
        this.props.changeLoadingStatus(false);
      });
  }
}

//map state to props
function mapStateToProps(state) {
  return {};
}

//map dispatch to props
function mapDispatchToProps(dispatch) {
  return {
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

    changeLoadingStatus(status) {
      return dispatch(changeStatus(status));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);
