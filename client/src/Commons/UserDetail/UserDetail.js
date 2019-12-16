import React from "react";
// import "../assets/stylesheet/_global.less"
import { Row, Col, Upload, message, Icon, Tabs, Card, Button, Form, Input } from "antd";
import { URL } from "../../config.js";
const TabPane = Tabs.TabPane;
class UserDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImage: ""
        };
    }

    renderProfile = (user) => {
        if (user)
            return (
                <div className="box-register-container">
                    <Card className="box-register" hoverable>
                        <h1>{user.fullname}</h1>
                        <p><strong>Age:</strong> {user.age}</p>
                        <p><strong>Gender:</strong> {user.gender}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Type:</strong> {user.type}</p>
                        <p><strong>Description:</strong></p>
                    </Card>
                </div>
            );
        return null;
    };

    renderAvatar = (user) => {
        if (user && user.avatar) {
            return < img style={{
                height: "200px",
                width: "200px"
            }}
                src={user.avatar} alt="useravatar" />
        }
        return < img style={{
            height: "200px",
            width: "200px"
        }}
            src={require("../../assets/imgs/defaultAvatar.jpg")} alt="defaultavatar" />
    }
    render() {
        const { userDetail } = this.props
        return (
            <div className="page-container">
                <div className="container">
                    <Row className="profile" >
                        <Col offset={1} span={2}>
                            {this.renderAvatar(userDetail)}
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
                                    {/* {this.renderProfile(userDetail)} */}
                                    {this.renderProfile(JSON.parse(localStorage.getItem("user")))}
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

UserDetail = Form.create({})(UserDetail);

export default UserDetail;
