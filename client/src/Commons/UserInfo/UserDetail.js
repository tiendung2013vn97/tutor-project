import React from "react";
import {Row, Col, Upload, message, Icon, Tabs, Card, Button, Form, Input, Select} from "antd";
import {getLocations} from "../../Location/api-location";

const {Option} = Select;
const {TextArea} = Input;

class UserDetail extends React.Component {
    state = {
        userState: null,
        locationCity: "",
        locationDistrict: "",
        locations: []
    }

    componentDidMount() {
        console.log("this.props", this.props)
        this.setState({
            userState: this.props.userDetail
        })
    }

    renderProfile = (user) => {
        if (user)
            return (
                <div>
                    <Card className="box-register" hoverable>
                            <Row>
                                <Col span={4}>
                                    <strong>Username:</strong>
                                </Col>
                                <Col>
                                    {user.username}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    <strong>Tên đầy đủ:</strong>
                                </Col>
                                <Col>
                                    {user.fullname}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    <strong>Email:</strong>
                                </Col>
                                <Col>
                                    {user.email}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    <strong>Giới tính:</strong>
                                </Col>
                                <Col>
                                    {user.gender}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    <strong>Tuổi:</strong>
                                </Col>
                                <Col>
                                    {user.age}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    <strong>Địa Chỉ:</strong>
                                </Col>
                                <Col>
                                    {user.location.district}, {user.location.city}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    <strong>Giới thiệu:</strong>
                                </Col>
                                <Col span={20}>
                                    {user.intro}
                                </Col>
                            </Row>
                    </Card>
                </div>
            );
        return null;
    };

    render() {
        if (this.state.userState)
            return (
                <div>
                    {this.renderProfile(this.state.userState)}
                </div>
            )
        return null
    }
}

UserDetail = Form.create({})(UserDetail);
export default UserDetail;
