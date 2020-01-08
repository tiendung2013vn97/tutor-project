import React from "react";
import Skill from "./Skill";
import {connect} from "react-redux"
import Axios from "../Api";
import {getSkills} from "./api-skill";
import {updateSkill} from "./action-skill";

class SkillContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1
        }
    }

    componentDidMount() {
        this.getSkills(1, 10);
    }

    getSkills(pNo, pSize) {
        return getSkills(pNo, pSize).then(res => {
            console.log(res)
            if (res && res.status === 200) {
                this.props.updateSkill(res.data);
            }
        })
    }

    handleChangePage = e => {
        this.setState({
            current: e
        })
        this.getSkills(e, 10)
    }
    handleCreate = () => {
        this.props.history.push("/skill/create")
    }

    render() {
        return <Skill
            handleChangePage={this.handleChangePage}
            handleCreate={this.handleCreate}
            getSkills={(pNo, pSize) => this.getSkills(pNo, pSize)}
            {...this.state}
            {...this.props}
        />
    }
}

const mapStateToProps = state => {
    return {
        skill: state.skill.skills,
        account: state.account
    }
}
const mapDispatchToProps = dispatch => ({
    updateSkill: e => dispatch(updateSkill(e))
})
export default connect(mapStateToProps, mapDispatchToProps)(SkillContainer)