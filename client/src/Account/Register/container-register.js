import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { changeStatus } from "../../Loading/action-loading";
import {
  showAlertNotify,
  showSuccessNotify,
  showFailNotify
} from "../../Notify/action-notify";
import Register from "./Register";
import config from "../../config";
import { updateLocation } from "../../Location/action-location";

class RegisterContainer extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
  }

  componentDidMount() {
    this.props.getLocation();
  }

  //render
  render() {
    return <Register signUp={this.signUp} location={this.props.location} />;
  }
  signUp(userInformation) {
    this.props.changeLoadingStatus(true);
    const api = axios.create({ baseURL: config.URL });
    api
      .post("/public-user/register", userInformation)
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
  return {
    location: state.location.location
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
    },

    changeLoadingStatus(status) {
      return dispatch(changeStatus(status));
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
export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
