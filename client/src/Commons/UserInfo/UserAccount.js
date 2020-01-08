import React from 'react';
import {Form, Input, Icon, Button, Modal, Card, Row, Col, message} from 'antd'
import {editUserAccount} from "../../Account/api-account";
import {logout} from "../../Account/action-account";

const FormItem = Form.Item;

class UserAccount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.statusReset === 200) {
            Modal.success({
                title: 'Reset password successfully!',
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                editUserAccount(values.password).then(res => {
                    if (res && res.data.status !== "fail") {
                        message.success("Đổi mật khẩu thành công")
                        this.props.logout(this.props.history);
                    } else
                        message.error("Lỗi")
                }).catch(e => {
                    message.error("Lỗi")
                })
            }
        });
    }

    checkPassword(rule, value, callback) {
        const form = this.props.form
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback()
        }
    }

    handleConfirmBlur(e) {
        const value = e.target.value;
        this.setState({
            confirmDirty: this.state.confirmDirty || !!value
        });
    }

    checkConfirm(rule, value, callback) {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    render() {
        const {getFieldDecorator} = this.props.form
        return (
            <div className="box-register-container">
                <Card className="box-register" hoverable>
                    <Row>
                        <Col span={12} offset={6}>

                            <Form>
                                <FormItem
                                    label='New password'
                                    style={{marginBottom: '24px'}}
                                    hasFeedback
                                >
                                    {getFieldDecorator('password', {
                                        rules: [{
                                            required: true, message: 'Please input new password',
                                        }, {
                                            validator: (rule, value, callback) => this.checkConfirm(rule, value, callback),
                                        }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                               placeholder='New password'/>
                                    )}
                                </FormItem>
                                <FormItem
                                    label="Confirm new password"
                                    style={{marginBottom: '24px'}}
                                    hasFeedback>
                                    {getFieldDecorator('confirm', {
                                        rules: [{
                                            required: true, message: 'Please confirm new password',
                                        }, {
                                            validator: (rule, value, callback) => this.checkPassword(rule, value, callback),
                                        }],
                                    })(
                                        <Input type="password" prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                               onBlur={(e) => this.handleConfirmBlur(e)}
                                               placeholder='Confirm new password'/>
                                    )}
                                </FormItem>
                                <div className="save-button">
                                    <Button loading={this.props.isLoadingUpdateAccount} type="primary"
                                            onClick={(e) => this.handleSubmit(e)}>Save</Button>
                                </div>
                            </Form>

                        </Col>
                    </Row>
                </Card>
            </div>

        )
    }
}

UserAccount = Form.create({})(UserAccount)
export default UserAccount
