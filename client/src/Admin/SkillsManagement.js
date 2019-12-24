import React from 'react'
import {connect} from 'react-redux'
import {Table, Button, Icon, message, Switch, Pagination} from 'antd';
import {Link} from 'react-router-dom'
import axios from "axios";
import {URL} from "../config";
import {getSkill} from "./action-admin";

class SkillsManagement extends React.Component {

    state = {
        current: 1
    }

    getSkills = (pageNo, pageSize) => {
        const api = axios.create({baseURL: URL});
        return api.get("admin/skill-tags", {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("token")
            }
        }).then(res => {
            console.log("res", res)
            this.props.getSkill(res.data)
        })
    }

    componentWillMount() {
        this.getSkills()
    }

    onChange = (e) => {
        console.log(e)
        this.setState({
            current: e
        })
        this.getUsers(e, 10)
    }

    handleDelete(index) {
        message.success("Delete successfull" + index)
    }


    renderTable(data) {
        console.log("data", data)
        if (!data)
            return null
        const columns = [
            {
                title: 'Id',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: 'Tên',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Number used',
                dataIndex: 'numUsed',
                key: 'numUsed',
            },
            {
                title: 'Active',
                dataIndex: 'isActived',
                render: (text) => {
                    return <Switch
                        unCheckedChildren="disabled"
                        checkedChildren="anabled"
                        checked={text}
                        onChange={this.handleDisable}
                        style={{marginTop: 16}}
                    />
                }
            },
        ];

        return <div>
            <Table dataSource={data.rows} columns={columns}/>
            <br/>
            <Pagination current={this.state.current} onChange={this.onChange} total={50}/>
        </div>

    }

    render() {
        console.log(this.props)
        return (
            <div style={{
                padding: '5px 16px'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                }}>
                    <h1>Skills management</h1>
                    <Button style={{
                        marginLeft: '5px',
                        marginTop: '5px'
                    }} type="primary" onClick={() => this.handleDelete()}>New</Button>
                </div>
                {this.renderTable(this.props.skillTag)}
            </div>
        )
    }
}

//map state to props
function

mapStateToProps(state) {
    return {
        skillTag: state.admin.skills
    };
}

//map dispatch to props
function

mapDispatchToProps(dispatch) {
    return {
        //     //show alert dialog
        // showAlertNotify(msg) {
        //     return dispatch(showAlertNotify(msg));
        // },
        //
        // //show fail dialog
        // showFailNotify(msg) {
        //     return dispatch(showFailNotify(msg));
        // },
        //
        // //show alert dialog
        // showSuccessNotify(msg) {
        //     return dispatch(showSuccessNotify(msg));
        // },

        getSkill(e) {
            return dispatch(getSkill(e));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)

(
    SkillsManagement
)
;
