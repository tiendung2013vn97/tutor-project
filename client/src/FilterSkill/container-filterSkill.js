import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  showAlertNotify,
  showSuccessNotify,
  showFailNotify
} from "../Notify/action-notify";
import FilterSkill from "./FilterSkill";
import config from "../config";
import Axios from "../Api";

class FilterSkillContainer extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.state = {
      skillTags: [],
      locations: [],
      skills: []
    };
  }

  componentDidMount() {
    Axios.get("/skill-tag")
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

        this.setState({ ...this.state, skillTags: res.data.rows });
      })
      .catch(err => {
        this.props.showAlertNotify("" + err);
      });

    Axios.get("/location")
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

        this.setState({ ...this.state, locations: res.data.data });
      })
      .catch(err => {
        this.props.showAlertNotify("" + err);
      });

    Axios.get("/skill")
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

        let data = res.data.rows.map(item => {
          return {
            skillName: item.skill_tag.name,
            teacherName: item.account.fullname,
            detail: item.note,
            costPerHour: item.costPerHour,
            id: item.id
          };
        });
        console.log("data", data);
        this.setState({ ...this.state, skills: data });
      })
      .catch(err => {
        this.props.showAlertNotify("" + err);
      });
  }
  //render
  render() {
    return (
      <FilterSkill
        location={this.state.locations}
        skillTags={this.state.skillTags}
        skills={this.state.skills}
      />
    );
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
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterSkillContainer);
