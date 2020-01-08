import React from 'react'
import {connect} from 'react-redux';
import axios from 'axios'
import {Table, Switch, Button, Pagination, Spin, message} from 'antd';
import {Link} from 'react-router-dom'
import {URL} from "../config"
import {getUserList} from "./action-admin";
import Axios from '../Api/index'

class UsersManagement extends React.Component {
    state = {
        current: 1
    }
    getUsers = (pageNo, pageSize) => {
        const api = axios.create({baseURL: URL});
        return api.get("admin/users", {
            params: {
                offset: (pageNo - 1) * 10,
                limit: pageSize
            },
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("token")
            }
        }).then(res => {
            this.props.getUserList(res.data)
        })
    }

    componentWillMount() {
        this.getUsers(1, 10);
    }

    onChange = (e) => {
        this.setState({
            current: e
        })
        this.getUsers(e, 10)
    }

    renderTable(data) {
        if (!data)
            return null
        const columns = [
            {
                title: 'Họ tên',
                dataIndex: 'fullname',
                render: (text, row, index) => {
                    return <Link to={`/user/${row.username}`}>{text}</Link>
                }
            },
            {
                title: 'Username',
                dataIndex: 'username',
                key: 'username',
            },

            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Tuổi',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: 'Giới tính',
                dataIndex: 'gender',
                key: 'gender',
            },
            {
                title: 'Actived',
                dataIndex: 'isActived',
                render: (text, row, index) => {
                    return <Switch
                        unCheckedChildren=""
                        checkedChildren=""
                        checked={text}
                        onChange={() => this.handleChangeStatus(row, text)}
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

    handleChangeStatus(row, checked) {
        if (!row)
            return null;
        if (checked)
            this.deActive(row);
        if (!checked)
            this.active(row);
    }

    deActive(row) {
        if (!row)
            return null;

        return Axios.delete("admin/" + row.username)
            .then(res => {
                if (res && res.data.status !== "fail") {
                    this.getUsers(this.state.current, 10);
                } else {
                    message.error(res.data.msg);
                }
            }).catch(e => {
                message.error("Lỗi");
            })
    }

    active(row) {
        if (!row)
            return null;
        return Axios.put("admin/active/" + row.username)
            .then(res => {
                if (res && res.data.status !== "fail") {
                    this.getUsers(this.state.current, 10);
                } else {
                    message.error(res.data.msg);
                }
            }).catch(e => {
                message.error("Lỗi");
            })
    }

    handleCreateUser() {
        this.props.history.push("/manage/create-user");
    }

    render() {
        if (this.props.users)
            return (
                <div style={{
                    padding: '5px 16px'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                    }}>
                        <h1>Quản lý người dùng</h1>
                        {/*<Button style={{*/}
                        {/*    marginLeft: '5px',*/}
                        {/*    marginTop: '5px'*/}
                        {/*}} type="primary" onClick={() => this.handleCreateUser()}>New</Button>*/}
                    </div>
                    {this.renderTable(this.props.users)}

                </div>
            )
        return <Spin size="large" style={{display: 'flex', justifyContent: 'center'}}/>
    }
}

//map state to props
function mapStateToProps(state) {
    return {
        users: state.admin.users,
        account: state.account
    };
}

//map dispatch to props
function mapDispatchToProps(dispatch) {
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

        getUserList(e) {
            return dispatch(getUserList(e));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersManagement);
