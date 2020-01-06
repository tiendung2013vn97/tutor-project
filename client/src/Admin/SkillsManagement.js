import React from 'react'
import {connect} from 'react-redux'
import {Table, Button, Icon, message, Switch, Pagination, Spin} from 'antd';
import {Link} from 'react-router-dom'
import axios from "axios";
import {URL} from "../config";
import {getSkill} from "./action-admin";
import Axios from "../Api";
class SkillsManagement extends React.Component {

    state = {
        current: 1
    }

    getSkills = (pageNo, pageSize) => {
        const api = axios.create({baseURL: URL});
        return api.get("admin/skill-tags", {
            params: {
                offset: (pageNo - 1) * 10,
                limit: pageSize
            },
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("token")
            }
        }).then(res => {
            this.props.getSkill(res.data)
        })
    }

    componentWillMount() {
        this.getSkills(1, 10)
    }

    onChange = (e) => {
        this.setState({
            current: e
        })
        this.getSkills(e, 10)
    }

    handleChangeStatus = (row) => {
        if (!row)
            return null;
        return Axios.get("admin/skill-tags/change-status", {
            params: {
                id: row.id
            }
        }).then(res => {
            this.getSkills(this.state.current, 10)
        })
    }


    renderTable(data) {
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
                render: (text, row, index) => {
                    return <Switch
                        unCheckedChildren="disabled"
                        checkedChildren="anabled"
                        checked={text}
                        onChange={() => this.handleChangeStatus(row)}
                        style={{marginTop: 16}}
                    />
                }
            },
        ];

        return <div>
            <Table
                dataSource={data.rows}
                columns={columns}
                pagination={false}
            />
            <br/>
            <Pagination current={this.state.current} onChange={this.onChange} total={data.count}/>
        </div>

    }

    render() {
        if (this.props.skillTag)
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
        return <Spin size="large" style={{display: 'flex', justifyContent: 'center'}}/>
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
