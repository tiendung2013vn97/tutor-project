import React from 'react'
import { connect } from 'react-redux'
import { Table, Switch, Button } from 'antd';
import { Link } from 'react-router-dom'


class UsersManagement extends React.Component {

    render() {
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
                        style={{ marginTop: 16 }}
                    />
                }
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
                <Table dataSource={dataSource} columns={columns} />
            </div>
        )
    }
}

export default UsersManagement