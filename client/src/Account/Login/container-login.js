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
    const api = axios.create({ baseURL: config.URL });
    api
      .post("/public-user/login", userInformation)
      .then(res => {
        if (res.data.statusCode === 400) {
          this.props.showFailNotify(
            "Username hoặc password không hợp lệ! Vui lòng kiểm tra lại!"
          );
        }

        let user = res.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", res.data.token);
        this.props.storeAccountInfo(user);
      })
      .catch(err => {
        this.props.showAlertNotify("" + err);
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
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);
