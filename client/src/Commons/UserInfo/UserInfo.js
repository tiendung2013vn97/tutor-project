import React from "react";
// import "../assets/stylesheet/_global.less"
import { Row, Col, Upload, message, Icon, Tabs, Card, Button, Form, Input } from "antd";
import { URL } from "../../config.js";
import UserAccount from "./UserAccount.js";
const TabPane = Tabs.TabPane;
class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImage: ""
        };
    }
    renderUpload(updateProfile, profile) {
        return (
            <Upload
                {...{
                    name: "file",
                    action: URL + "user/avatar/upload",
                    onChange(info) {
                        if (info.file.status !== "uploading") {

                        }

                        if (info.file.status === "done") {
                            updateProfile({
                                name: profile.name,
                                profile_picture_url: info.file.response.link
                            });
                            message.success("Success");
                        } else if (info.file.status === "error") {
                            message.error("Error");
                        }
                    }
                }}
            >
                <a className="change-profile-picture">
                    <p>
                        <Icon type="camera" />
                        Upload Avatar
                     </p>
                </a>
            </Upload>
        );
    }
    renderProfile = () => {
        return (
            <div className="box-register-container">
                <Card className="box-register" hoverable>
                    <Form>
                        <Form.Item label="Username" hasFeedback>
                            <Input
                                onChange={this.props.handleUsernameChange}
                                value={this.props.username} />
                        </Form.Item>
                        <Form.Item label="E-mail">
                            <Input
                                onChange={this.props.handleEmailChange}
                                value={this.props.email} />
                        </Form.Item>
                        <Form.Item>
                            <Button loading={this.props.isLoadingUpdateProfile} onClick={() => this.props.handleUpdateProfile()} type="primary" htmlType="submit">
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    };

    render() {
        // const { profile } = this.props
        return (
            <div className="page-container">
                <div className="container">
                    <Row className="profile" >
                        <Col offset={1} span={2}>
                            <img style={{
                                height:"200px",
                                width: "200px"
                            }} 
                            src={require("./a.jpg")} alt="defaultavatar"/>
                            {this.renderUpload()}
                        </Col>

                        <Col offset={3} span={8} md={18} sm={18} xs={24}>
                            <Tabs defaultActiveKey="1" onChange={this.callback}>
                                <TabPane
                                    tab={
                                        <span>
                                            <Icon type="pie-chart" />
                                            Profile
                                        </span>
                                    }
                                    key="1"
                                >
                                    {/* {profile && this.renderProfile()} */}
                                    {this.renderProfile()}
                                </TabPane>
                                <TabPane
                                    tab={
                                        <span>
                                            <Icon type="desktop" />
                                            Account
                                        </span>
                                    }
                                    key="2"
                                >
                                    <UserAccount {...this.props} />
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

UserInfo = Form.create({})(UserInfo);

export default UserInfo;
