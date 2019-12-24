import React from 'react'
import {connect} from 'react-redux';
import axios from 'axios'
import {Table, Switch, Button, Pagination} from 'antd';
import {Link} from 'react-router-dom'
import {URL} from "../config"
import {getUserList} from "./action-admin";

class UsersManagement extends React.Component {
    state = {
        current: 1
    }
    getUsers = (pageNo, pageSize) => {
        const api = axios.create({baseURL: URL});
        return api.get("admin/users", {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("token")
            }
        }).then(res => {
            console.log(res)
        })
    }

    componentWillMount() {
        this.getUsers()
    }

    onChange = (e) => {
        console.log(e)
        this.setState({
            current: e
        })
        this.getUsers(e, 10)
    }

    renderTable(data) {

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                render: (text, row, index) => {
                    return <Link to="/manage/users/id">{text}</Link>
                }
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: 'Enable',
                dataIndex: 'enable',
                render: () => {
                    return <Switch
                        unCheckedChildren="disabled"
                        checkedChildren="anabled"
                        checked={true}
                        onChange={this.handleDisable}
                        style={{marginTop: 16}}
                    />
                }
            },
        ];

        return <div>
            <Table dataSource={data} columns={columns}/>
            <br/>
            <Pagination current={this.state.current} onChange={this.onChange} total={50}/>
        </div>

    }

    render() {
        console.log(this.props)
        const dataSource = [
            {
                key: '1',
                name: 'Mike',
                age: 32,
                address: '10 Downing Street',
            },
            {
                key: '2',
                name: 'John',
                age: 42,
                address: '10 Downing Street',
            },
        ];

        return (
            <div style={{
                padding: '5px 16px'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                }}>
                    <h1>Users management</h1>
                    <Button style={{
                        marginLeft: '5px',
                        marginTop: '5px'
                    }} type="primary" onClick={() => this.handleDelete()}>New</Button>
                </div>
                {this.renderTable(this.props.users)}

            </div>
        )
    }
}

//map state to props
function

mapStateToProps(state) {
    return {
        users: state.admin.users
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

        getUserList(e) {
            return dispatch(getUserList(e));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)

(
    UsersManagement
)
;
