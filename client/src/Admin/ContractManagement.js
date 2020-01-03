import React from 'react'
import {connect} from 'react-redux'
import {Table, Button, message, Switch, Pagination, Spin} from 'antd';
import {Link} from 'react-router-dom'
import axios from "axios";
import {URL} from "../config";
import {getContract} from "./action-admin";


class ContractManagement extends React.Component {

    state = {
        current: 1
    }

    getContracts = (pageNo, pageSize) => {
        const api = axios.create({baseURL: URL});
        return api.get("admin/contracts", {
            params: {
                offset: (pageNo - 1) * 10,
                limit: pageSize
            },
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("token")
            }
        }).then(res => {
            console.log("res", res)
            this.props.getContract(res.data)
        })
    }

    componentWillMount() {
        this.getContracts(1, 10)
    }

    onChange = (e) => {
        console.log(e)
        this.setState({
            current: e
        })
        this.getContracts(e, 10)
    }

    handleChangeStatus = (row) => {
        if (!row)
            return null;
        const api = axios.create({baseURL: URL});
        return api.post("admin/skill-tags/change-status", {
            params: {
                id: row.id
            },
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("token")
            }
        }).then(res => {
            console.log("res", res)
            this.props.getSkill(res.data)
        })
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
        if (this.props.contracts)
            return (
                <div style={{
                    padding: '5px 16px'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                    }}>
                        <h1>Contracts management</h1>
                    </div>
                    {this.renderTable(this.props.contracts)}
                </div>
            )
        return <Spin size="large" style={{display: 'flex', justifyContent: 'center'}}/>
    }
}

//map state to props
function

mapStateToProps(state) {
    return {
        contracts: state.admin.contracts
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

        getContract(e) {
            return dispatch(getContract(e));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps())(ContractManagement)