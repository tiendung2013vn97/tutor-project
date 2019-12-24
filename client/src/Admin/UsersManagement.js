import React from 'react'
import {connect} from 'react-redux';
import axios from 'axios'
import {Table, Switch, Button} from 'antd';
import {Link} from 'react-router-dom'
import {URL} from '../config'
import {getUserList} from "./action-admin";

class UsersManagement extends React.Component {

    getUsers = () => {
        return axios.request({
            method: 'GET',
            url: URL + "admin/users"
        }).then(res=>{
            console.log("res", res)
            this.props.getUserList(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }

    componentWillMount() {
        this.getUsers()
    }

    renderTable(data){

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

        return <Table dataSource={data} columns={columns}/>

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
function mapStateToProps(state) {
    return {
        users: state.adminReducer.users
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
