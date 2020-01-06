import React from "react";
import {Row, Col, Upload, message, Icon, Tabs, Card, Button, Form, Input, Select} from "antd";
import {getLocations} from "../../Location/api-location";

const {Option} = Select;
const {TextArea} = Input;

class UserProfile extends React.Component {
    state = {
        userState: null,
        // userState: {
        //     username: null,
        //     fullname: null,
        //     email: null,
        //     age: null,
        //     gender: null,
        //     intro: null,
        //     money: null,
        //     // location: null,
        //     image: null
        // },
        locationCity: "",
        locationDistrict: "",
        locations: []
    }

    componentDidMount() {
        this.setState({
            userState: this.props.userDetail
        })
        this.getLocation();
    }

    getLocation() {
        getLocations().then(res => {
            this.setState({
                locations: res.data.data,
            })
        })
    }

    handleChangeUsername = (e) => {
        const {userState} = this.state
        this.setState({
            userState: {
                ...userState,
                username: e.target.value
            }
        })
    }

    handleChangeFullName = (e) => {
        const {userState} = this.state
        this.setState({
            userState: {
                ...userState,
                fullname: e.target.value
            }
        })
    }

    handleChangeEmail = (e) => {
        const {userState} = this.state
        this.setState({
            userState: {
                ...userState,
                email: e.target.value
            }
        })
    }

    handleChangeGender = (e) => {
        const {userState} = this.state
        this.setState({
            userState: {
                ...userState,
                gender: e
            }
        })
    }

    handleChangeAge = (e) => {
        const {userState} = this.state
        this.setState({
            userState: {
                ...userState,
                age: e.target.value
            }
        })
    }

    handleChangeIntro = (e) => {
        const {userState} = this.state
        this.setState({
            userState: {
                ...userState,
                intro: e.target.value
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


    handleCityChange(locationCity) {
        const {userState} = this.state;
        let locationDistrict = this.state.locations.filter(
            lo => lo.city === locationCity
        )[0].district;
        this.setState({
            userState: {
                ...userState,
                location: {
                    ...userState.location,
                    city: locationCity,
                    district: locationDistrict
                }
            }
        })
    }

    handleDistrictChange(locationDistrict) {
        const {userState} = this.state;
        this.setState({
            userState: {
                ...userState,
                location: {
                    ...userState.location,
                    district: locationDistrict
                }
            }
        })
    }

    renderProfile = (user) => {
        let userState = JSON.parse(localStorage.getItem("user"));
        const readOnly = user.username !== userState.username;

        let cityList = this.state.locations.map(lo => lo.city);
        cityList = cityList.filter((city, index) => {
            return !cityList.slice(0, index).includes(city);
        });

        let districtList = this.state.locations
            .filter(lo => lo.city === this.state.userState.location.city)
            .map(lo => lo.district);

        let cityComboBox = [];
        cityList.forEach(city => {
            cityComboBox.push(<Option value={city}>{city}</Option>);
        });

        let districtComboBox = [];
        console.log("list", districtList)
        districtList.forEach(district => {
            districtComboBox.push(<Option value={district}>{district}</Option>);
        });
        if (user)
            return (
                <div className="box-register-container">
                    <Card className="box-register" hoverable>
                        <Form>
                            <Row>
                                <Col span={11}>
                                    <Form.Item label="Username" hasFeedback>
                                        <Input
                                            disabled={readOnly}
                                            onChange={this.handleChangeUsername}
                                            value={user.username}/>
                                    </Form.Item>
                                </Col>
                                <Col span={2}/>
                                <Col span={11}>
                                    <Form.Item label="Họ tên" hasFeedback>
                                        <Input
                                            disabled={readOnly}
                                            onChange={this.handleChangeFullName}
                                            value={user.fullname}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={11}>
                                    <Form.Item label="E-mail">
                                        <Input
                                            disabled={readOnly}
                                            onChange={this.handleChangeEmail}
                                            value={user.email}/>
                                    </Form.Item>
                                </Col>
                                <Col span={2}/>
                                <Col span={3}>
                                    <Form.Item label="Giới tính" hasFeedback>
                                        <Select disabled={readOnly} defaultValue="male" style={{width: 120}}
                                                onChange={this.handleChangeGender}>
                                            <Option value="male">Male</Option>
                                            <Option value="female">Female</Option>
                                            <Option value="other">Other</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={1}/>
                                <Col span={2}>
                                    <Form.Item label="Tuổi" hasFeedback>
                                        <Input
                                            disabled={readOnly}
                                            type="number"
                                            onChange={this.handleChangeAge}
                                            value={user.age}/>
                                    </Form.Item>
                                </Col>

                            </Row>
                            <Row>
                                <Col span={11}>
                                    <Form.Item label="Tỉnh/Thành phố" hasFeedback>
                                        <Select
                                            disabled={readOnly}
                                            value={user.location.city}
                                            onChange={this.handleCityChange.bind(this)}
                                        >
                                            {cityComboBox}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={2}/>
                                <Col span={11}>
                                    <Form.Item label="Quận/Huyện" hasFeedback>
                                        <Select
                                            disabled={readOnly}
                                            value={user.location.district}
                                            onChange={this.handleDistrictChange.bind(this)}
                                        >
                                            {districtComboBox}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Form.Item label="Giới thiệu" hasFeedback>
                                        <TextArea
                                            disabled={readOnly}
                                            value={user.intro}
                                            onChange={this.handleChangeIntro}
                                            placeholder="Giới thiệu"
                                            autoSize={{minRows: 3, maxRows: 5}}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                {
                                    !readOnly &&
                                    <Button loading={this.props.isLoadingUpdateProfile}
                                            onClick={() => this.handleUpdateProfile()} type="primary" htmlType="submit">
                                        Lưu
                                    </Button>
                                }
                            </Form.Item>
                        </Form>
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

UserProfile = Form.create({})(UserProfile);
export default UserProfile;
