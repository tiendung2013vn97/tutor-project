import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'antd';
import {Link} from 'react-router-dom'


class StudentReport extends React.Component {

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
        ];
        return (
            <div style={{
                padding: '5px 16px'
            }}>
                <h1>Student's Report</h1>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        )
    }
}

export default StudentReport