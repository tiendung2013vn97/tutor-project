import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { changeStatus } from "../../../Loading/action-loading";
import {
  showAlertNotify,
  showSuccessNotify,
  showFailNotify
} from "../../../Notify/action-notify";
import RegisterResult from "./RegisterResult";
import config from "../../../config";
import { withRouter } from "react-router";

class RegisterContainer extends Component {
  //constructor
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  //render
  render() {
    return <RegisterResult />;
  }
  getRegisterResult(emailToken) {
    this.props.changeLoadingStatus(true);
    const api = axios.create({ baseURL: config.URL });
    api
      .get("/public-user/verify-email?emailToken=" + emailToken)
      .then(res => {
        if (res.data.status === "fail") {
          switch (res.data.code) {
            case "USERNAME_EXISTED": {
              this.props.showFailNotify(res.data.msg);
              break;
            }
            case "EMAIL_EXISTED": {
              this.props.showFailNotify(res.data.msg);
              break;
            }
            default: {
              this.props.showFailNotify(res.data.msg);
              break;
            }
          }
          return this.props.changeLoadingStatus(false);
        }
        this.props.showSuccessNotify(res.data.msg);
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

    changeLoadingStatus(status) {
      return dispatch(changeStatus(status));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
