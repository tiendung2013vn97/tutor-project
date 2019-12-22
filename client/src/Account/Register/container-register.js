import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  showAlertNotify,
  showSuccessNotify,
  showFailNotify
} from "../../Notify/action-notify";
import Register from "./Register";
import config from "../../config";

class RegisterContainer extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
  }

  //render
  render() {
    return <Register signUp={this.signUp} location={this.props.location} />;
  }
  signUp(userInformation) {
    const api = axios.create({ baseURL: config.URL });
    api
      .post("user/register", userInformation)
      .then(res => {
        if (res.data.statusCode === 400) {
          this.props.showFailNotify(res.data.msg);
          return;
        }
        this.props.showSuccessNotify(
          "Sign up thành công! Bạn có thể đăng nhập!"
        );
      })
      .catch(err => {
        this.props.showAlertNotify("" + err);
      });
  }
}

//map state to props
function mapStateToProps(state) {
  return {
    location: state.location
  };
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
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
