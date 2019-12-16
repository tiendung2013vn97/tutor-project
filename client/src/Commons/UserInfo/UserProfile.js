import React from "react";
import { Row, Col, Upload, message, Icon, Tabs, Card, Button, Form, Input, Select } from "antd";
const { Option } = Select;
class UserProfile extends React.Component {
    state = {
        userState: {
            username: null,
            email: null,
            gender: null,
            fullname: null,
            age: null,
        }

    }
    componentWillMount() {
        let user = localStorage.getItem("user");
        if (user) {
            user = JSON.parse(user);
            this.setState({
                userState: user
            })
        }
    }

    handleChangeUsername = (e) => {
        const { userState } = this.state
        this.setState({
            userState: {
                ...userState,
                username: e.target.value
            }
        })
    }

    handleChangeFullName = (e) => {
        const { userState } = this.state
        this.setState({
            userState: {
                ...userState,
                fullname: e.target.value
            }
        })
    }

    handleChangeEmail = (e) => {
        const { userState } = this.state
        this.setState({
            userState: {
                ...userState,
                email: e.target.value
            }
        })
    }

    handleChangeGender = (e) => {
        const { userState } = this.state
        this.setState({
            userState: {
                ...userState,
                gender: e
            }
        })
    }

    handleChangeAge = (e) => {
        const { userState } = this.state
        this.setState({
            userState: {
                ...userState,
                age: e.target.value
            }
        })
    }

    handleUpdateProfile = () => {
        console.log("Update Profile")
        // this.props.updateUserProfile({
        //     username: this.state.username,
        //     email: this.state.email
        // }, this.props)
    }
    renderProfile = (user) => {
        if (user)
            return (
                <div className="box-register-container">
                    <Card className="box-register" hoverable>
                        <Form>
                            <Row>
                                <Col span={11}>
                                    <Form.Item label="Username" hasFeedback>
                                        <Input
                                            onChange={this.handleChangeUsername}
                                            value={user.username} />
                                    </Form.Item>
                                </Col>
                                <Col span={1} />
                                <Col span={11}>
                                    <Form.Item label="Fullname" hasFeedback>
                                        <Input
                                            onChange={this.handleChangeFullName}
                                            value={user.fullname} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={11}>
                                    <Form.Item label="E-mail">
                                        <Input
                                            onChange={this.handleChangeEmail}
                                            value={user.email} />
                                    </Form.Item>
                                </Col>
                                <Col span={1} />
                                <Col span={3}>
                                    <Form.Item label="Gender" hasFeedback>
                                        <Select defaultValue="male" style={{ width: 120 }} onChange={this.handleChangeGender}>
                                            <Option value="male">Male</Option>
                                            <Option value="female">Female</Option>
                                            <Option value="other">Other</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={1} />
                                <Col span={2}>
                                    <Form.Item label="Age" hasFeedback>
                                        <Input
                                            type="number"
                                            onChange={this.handleChangeAge}
                                            value={user.age} />
                                    </Form.Item>
                                </Col>
                            </Row>


                            <Form.Item>
                                <Button loading={this.props.isLoadingUpdateProfile} onClick={() => this.handleUpdateProfile()} type="primary" htmlType="submit">
                                    Save
                            </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            );
        return null;
    };
    render() {

        return (
            <div>
                {this.renderProfile(this.state.userState)}
            </div>
        )
    }
}
UserProfile = Form.create({})(UserProfile);
export default UserProfile;
