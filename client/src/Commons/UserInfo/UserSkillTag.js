import React from 'react';
import { Form, Input, Icon, Button, Modal, Card } from 'antd'
const FormItem = Form.Item;
class UserSkillTag extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Change password")
                // this.props.changePassword({
                //     newPassword: values.password,
                //     oldPassword: values.oldpassword
                // })
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div className="box-register-container">
                <Card className="box-register" hoverable>
                    <Form>
                        <FormItem
                            label="Current password"
                            style={{ marginBottom: '24px' }}
                            hasFeedback
                        >
                            {getFieldDecorator('oldpassword', {
                                rules: [{
                                    required: true, message: 'Please input current password',
                                },],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password"
                                       placeholder='Current password' />
                            )}
                        </FormItem>
                        <FormItem
                            label='New password'
                            style={{ marginBottom: '24px' }}
                            hasFeedback
                        >
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: 'Please input new password',
                                }, {
                                    validator: (rule, value, callback) => this.checkConfirm(rule, value, callback),
                                }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password"
                                       placeholder='New password' />
                            )}
                        </FormItem>
                        <FormItem
                            label="Confirm new password"
                            style={{ marginBottom: '24px' }}
                            hasFeedback>
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: 'Please confirm new password',
                                }, {
                                    validator: (rule, value, callback) => this.checkPassword(rule, value, callback),
                                }],
                            })(
                                <Input type="password" prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                                       onBlur={(e) => this.handleConfirmBlur(e)}
                                       placeholder='Confirm new password' />
                            )}
                        </FormItem>
                        <div className="save-button">
                            <Button loading={this.props.isLoadingUpdateAccount} type="primary" onClick={(e) => this.handleSubmit(e)} >Save</Button>
                        </div>
                    </Form>
                </Card>
            </div>

        )
    }
}
UserSkillTag = Form.create({})(UserSkillTag)
export default UserSkillTag
