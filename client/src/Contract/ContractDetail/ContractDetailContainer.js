import React from 'react'
import {connect} from 'react-redux'
import {Spin} from 'antd'
import ContractDetail from './ContractDetail'
import Axios from "../../Api";
import {getSkillTagById} from "../../SkillTag/api-skilltag";

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
        if (id)
            this.getDetail(id)
    }

    getDetail(id) {
        return Axios.get(`contract/by-id/${id}`
        ).then(res => {
            if (res && res.status === 200) {
                console.log("contract", res)
                this.setState({
                    contract: res.data
                })
                this.getSkillTag(res.data.skillId)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    getSkillTag(id) {
        return getSkillTagById(id).then(res => {
            if(res && res.status===200)
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