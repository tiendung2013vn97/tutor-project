import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { logout } from '../Account/action-account';
import { updateAccountInfo } from "../Account/action-account"
import {
  showAlertNotify,
  showSuccessNotify,
  showFailNotify
} from "../Notify/action-notify";
import Home from "./Home";
import config from "../config";

class SignInContainer extends Component {
  //constructor
  constructor(props) {
    super(props);
  }

  componentDidMount(){
      let user=localStorage.getItem('user')
      if(user){
        this.props.storeAccountInfo(JSON.parse(user))
      }
  }

  //render
  render() {
    return <Home account={this.props.account} logout={this.props.logout}/>;
  }

  
}

//map state to props
function mapStateToProps(state) {
  return {
      account:state.account
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
      }

  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);