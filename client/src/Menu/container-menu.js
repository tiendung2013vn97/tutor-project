import React, { Component } from "react";
import { connect } from "react-redux";
import Menu from "./Menu";
import config from "../config";
import axios from "axios";
import {updateSkillTag} from '../SkillTag/action-skillTag'

class MenuContainer extends Component {
  //constructor
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const api = axios.create({ baseURL: config.URL });
    api
      .get("/skill-tag/top")
      .then(res=>{
        this.props.updateSkillTag(res.data)
        console.log(res.data)
      }).catch(err=>{
          console.log(err+"")
      })
  }

  //render
  render() {
    return <Menu skillTags={this.props.skillTags} />;
  }
}

//map state to props
function mapStateToProps(state) {
  return {
    skillTags: state.skillTag.skillTags
  };
}

//map dispatch to props
function mapDispatchToProps(dispatch) {
  return {
    updateSkillTag(skillTags){
        return dispatch(updateSkillTag(skillTags))
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
