import React from "react";
import Skill from "./Skill";
import {connect} from "react-redux"
import Axios from "../Api";
import {getSkills} from "./api-skill";
import {updateSkill} from "./action-skill";

class SkillContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let username = this.props.match.params.username;
        if (username)
            this.getSkills(username);
    }

    getSkills(username) {
        return getSkills(username).then(res => {
            if (res && res.status === 200) {
                this.props.updateSkill(res.data);
            }
        })
    }

    render() {
        console.log("prop", this.props.skill)
        return <Skill
            {...this.props}
        />
    }
}

const mapStateToProps = state => {
    return {
        skill: state.skill,
        account: state.account
    }
}
const mapDispatchToProps = dispatch => ({
    updateSkill: e => dispatch(updateSkill(e))
})
export default connect(mapStateToProps, mapDispatchToProps)(SkillContainer)