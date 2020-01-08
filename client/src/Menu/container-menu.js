import React, {Component} from "react";
import {connect} from "react-redux";
import Menu from "./Menu";
import config from "../config";
import axios from "axios";
import {updateSkillTag} from '../SkillTag/action-skillTag'
import {updateAccountInfo} from "../Account/action-account";
import {getUserInfo} from "../Api/UserApi";

class MenuContainer extends Component {
    //constructor
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {account} = this.props;
        if (account.username === null) {
            getUserInfo()
                .then(res => {
                    if (res && res.status === 200) {
                        this.props.updateAccountInfo(res.data)
                    }
                })
        }
    }

    //render
    render() {
        return <Menu {...this.props} />;
    }
}

//map state to props
function mapStateToProps(state) {
    return {
        account: state.account,
        skillTags: state.skillTag.skillTags
    };
}

//map dispatch to props
function mapDispatchToProps(dispatch) {
    return {
        updateSkillTag(skillTags) {
            return dispatch(updateSkillTag(skillTags))
        },

        updateAccountInfo(e) {
            return dispatch(updateAccountInfo(e))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
