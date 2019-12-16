import React from "react";
// import "../assets/stylesheet/_global.less"
import { Row, Col, Upload, message, Icon, Tabs, Card, Button, Form, Input } from "antd";
import { URL } from "../../config.js";
import UserAccount from "./UserAccount.js";
import UserProfile from "./UserProfile.js";

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


    render() {
        // const { profile } = this.props
        return (
            <div className="page-container">
                <div className="container">
                    <Row className="profile" >
                        <Col offset={1} span={2}>
                            <img style={{
                                height: "200px",
                                width: "200px"
                            }}
                                src={require("../../assets/imgs/defaultAvatar.jpg")} alt="defaultavatar" />
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
                                    <UserProfile {...this.props} />
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


export default UserInfo;
