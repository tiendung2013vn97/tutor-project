import React from 'react'
import {connect} from 'react-redux'
import {Table, Button, Icon, message, Switch, Pagination, Spin, Modal, Input, Form, Row, Col} from 'antd';
import {Link} from 'react-router-dom'
import axios from "axios";
import {URL} from "../config";
import {getSkill} from "./action-admin";
import Axios from "../Api";
import UserProfile from "../Commons/UserInfo/UserProfile";

class SkillsManagement extends React.Component {

    state = {
        current: 1,
        visible: false
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    getSkills = (pageNo, pageSize) => {
        const api = axios.create({baseURL: URL});
        return api.get("/skill-tag", {
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

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                return Axios.post("/skill-tag", values).then(res => {
                    if (res && res.data.status !== "fail") {
                        message.success("Tạo thành công")
                        this.setState({
                            visible: false,
                        });
                        this.getSkills(this.state.current, 10)
                    } else
                        message.error("Lỗi")
                }).catch(e => {
                    message.error("Lỗi")

                })
            }
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form

        if (this.props.skillTag)
            return (
                <div style={{
                    padding: '5px 16px'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                    }}>
                        <h1>Quản lý thẻ kỹ năng</h1>
                        <Button style={{
                            marginLeft: '5px',
                            marginTop: '5px'
                        }} type="primary" onClick={this.showModal}>Tạo mới</Button>
                        <Modal
                            title="Tạo mới thẻ kỹ năng"
                            visible={this.state.visible}
                            onOk={this.handleSubmit}
                            onCancel={this.handleCancel}
                        >
                            <Form>
                                <Form.Item label="Tên kỹ năng" hasFeedback>
                                    {getFieldDecorator('name', {
                                        rules: [{
                                            required: true, message: 'Vui lòng nhập tên thẻ',
                                        }],
                                    })(
                                        <Input/>
                                    )}
                                </Form.Item>
                            </Form>
                        </Modal>
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

SkillsManagement = Form.create({})(SkillsManagement);

export default connect(mapStateToProps, mapDispatchToProps)

(
    SkillsManagement
)
;
