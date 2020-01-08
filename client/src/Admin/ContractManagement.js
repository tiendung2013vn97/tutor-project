import React from 'react'
import {connect} from 'react-redux'
import {Table, Button, message, Switch, Pagination, Spin} from 'antd';
import {Link} from 'react-router-dom'
import {URL} from "../config";
import {getContract} from "./action-admin";
import Axios from "../Api";
import * as contractStatus from '../Constants/contractStatus'
import {milisecondToDateString, translateContractStatus} from "../Commons/commonFunction";

class ContractManagement extends React.Component {

    state = {
        current: 1
    }

    getContracts = (pageNo, pageSize) => {
        return Axios.get("contract", {
            params: {
                offset: (pageNo - 1) * 10,
                limit: pageSize
            },
        }).then(res => {
            this.props.getContract(res.data)
        })
    }

    componentDidMount() {
        this.getContracts(1, 10)
    }

    onChange = (e) => {
        this.setState({
            current: e
        })
        this.getContracts(e, 10)
    }

    handleChangeStatus = (row) => {
        if (!row)
            return null;
        return Axios.post("/change-status", {
            params: {
                id: row.id
            }
        }).then(res => {
            this.props.getSkill(res.data)
        })
    }

    renderStatus(e) {
        return translateContractStatus(e)
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
                title: 'Tổng số giờ',
                dataIndex: 'totalHours',
                key: 'totalHours',
            },
            {
                title: 'Ngày tạo',
                dataIndex: 'createDt',
                key: 'createDt',
                render: (text) => {
                    return milisecondToDateString(text)
                }
            },
            {
                title: 'Ngày bắt đầu',
                dataIndex: 'startDt',
                key: 'startDt',
                render: (text) => {
                    return milisecondToDateString(text)
                }
            },
            {
                title: 'Ngày kết thúc',
                dataIndex: 'toDt',
                key: 'toDt',
                render: (text) => {
                    return milisecondToDateString(text)
                }
            },
            {
                title: 'Trạng thái',
                dataIndex: 'status',
                render: (text) => {
                    return this.renderStatus(text)
                }
            },
            {
                title: 'Đánh giá',
                dataIndex: 'rate',
                render: (text) => {
                    if (text < 0)
                        return "Chưa đánh giá"
                    return text
                }
            },
            //
            // {
            //     title: 'Actived',
            //     dataIndex: 'isActived',
            //     render: (text, row, index) => {
            //         return <Switch
            //             unCheckedChildren=""
            //             checkedChildren=""
            //             checked={text}
            //             onChange={() => this.handleChangeStatus(row, text)}
            //             style={{marginTop: 16}}
            //         />
            //     }
            // },
            {
                title: 'Tác vụ',
                render: (text, row, index) => {
                    return (
                        <Button onClick={() => this.showContractDetail(row)} size={"small"} type="danger" ghost>Chi
                            tiết</Button>
                    )
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

    showContractDetail(row) {
        this.props.history.push(`/manage/contracts/${row.id}`);
    }

    handleChangeStatus = (row, checked) => {
        if (!row)
            return null;
        if (checked)
            this.deActive(row);
        if (!checked)
            this.active(row);
    }

    active = (row) => {
        if (!row)
            return null;
        return Axios.put("skill-tag/active/" + row.id).then(res => {
            if (res && res.data.status !== "fail") {
                this.getSkills(this.state.current, 10);
            } else {
                message.error(res.data.msg);
            }
        }).catch(e => {
            message.error("Lỗi");
        })
    }

    deActive = (row) => {
        if (!row)
            return null;
        return Axios.delete("skill-tag/" + row.id).then(res => {
            if (res && res.data.status !== "fail") {
                this.getSkills(this.state.current, 10);
            } else {
                message.error(res.data.msg);
            }
        }).catch(e => {
            message.error("Lỗi");
        })
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
                        <h1>Quản lý hợp đồng</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContractManagement)