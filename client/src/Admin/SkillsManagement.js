import React from 'react'
import { connect } from 'react-redux'
import { Table, Button, Icon, message } from 'antd';
import { Link } from 'react-router-dom'


class SkillsManagement extends React.Component {


    handleDelete(index) {
        message.success("Delete successfull" + index)
    }
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
                    return <Link to="/asd">{text}</Link>
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
                title: 'Actions',
                key: 'action',
                render: (text, row, index) => {
                    return (
                        <Button shape="circle" icon="delete" ghost type="danger" onClick={() => this.handleDelete(index)} />
                    )
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
                    <h1>Skills management</h1>
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

export default SkillsManagement