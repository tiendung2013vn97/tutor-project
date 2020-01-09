import React from 'react'
import {connect} from 'react-redux'
import {Spin} from 'antd'
import ContractDetail from './ContractDetail'
import axios from "axios";
import {getSkillTagById} from "../../SkillTag/api-skilltag";
import config from "../../config";

class ContractDetailContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contract: null,
            skillTagName: null
        };
    }


    componentDidMount() {
        console.log(this.props)
        const id = this.props.match.params.id
        console.log("id", id)
        // this.getDetail(id)
        const api = axios.create({ baseURL: config.URL });
        api.get("contract/by-id/" + id, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }
        ).then(res => {
            console.log("contract", res)
            if (res && res.data.status !== "fail") {
                this.setState({
                    contract: res.data
                })
                // this.getSkillTag(res.data.skillId)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    getDetail(id) {

    }

    getSkillTag(id) {
        return getSkillTagById(id).then(res => {
            if (res && res.status === 200)
                this.setState({
                    skillTagName: res.data.name
                })
        })
    }

    render() {
        if (this.state.contract) {
            return <ContractDetail
                {...this.props}
                {...this.state}
            />
        }
        return <Spin size="large" style={{display: 'flex', justifyContent: 'center'}}/>

    }
}


const mapStatetoProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => ({})
export default connect(mapStatetoProps, mapDispatchToProps)(ContractDetailContainer)