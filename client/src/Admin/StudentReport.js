import React from 'react'
import {connect} from 'react-redux'
import {Table, Button, message, Switch, Pagination, Spin} from 'antd';
import {Link} from 'react-router-dom'
import axios from "axios";
import {URL} from "../config";
import {getStudentReport} from "./action-admin";


class StudentReport extends React.Component {

    state = {
        current: 1
    }

    getStudentReports = (pageNo, pageSize) => {
        const api = axios.create({baseURL: URL});
        return api.get("admin/student-report", {
            params: {
                offset: (pageNo - 1) * 10,
                limit: pageSize
            },
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("token")
            }
        }).then(res => {
            this.props.getStudentReport(res.data)
        })
    }

    componentWillMount() {
        this.getStudentReports(1, 10)
    }

    onChange = (e) => {
        this.setState({
            current: e
        })
        this.getStudentReports(e, 10)
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
            // {
            //     title: 'Active',
            //     dataIndex: 'isActived',
            //     render: (text, row, index) => {
            //         return <Switch
            //             unCheckedChildren="disabled"
            //             checkedChildren="anabled"
            //             checked={text}
            //             onChange={() => this.handleChangeStatus(row)}
            //             style={{marginTop: 16}}
            //         />
            //     }
            // },
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
        if (this.props.studentReports)
            return (
                <div style={{
                    padding: '5px 16px'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                    }}>
                        <h1>Student Reports</h1>
                    </div>
                    {this.renderTable(this.props.studentReports)}
                </div>
            )
        return <Spin size="large" style={{display: 'flex', justifyContent: 'center'}}/>
    }
}

//map state to props
function

mapStateToProps(state) {
    return {
        studentReports: state.admin.studentReports
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

        getStudentReport(e) {
            return dispatch(getStudentReport(e));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps())(StudentReport)