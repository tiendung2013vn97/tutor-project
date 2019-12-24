import React from "react";
import {Row, Col, Upload, message, Icon, Tabs, Card, Button, Form, Input, Select} from "antd";

const {Option} = Select;

class UserProfile extends React.Component {
    state = {
        userState: {
            username: null,
            fullname: null,
            email: null,
            age: null,
            gender: null,
            intro: null,
            money: null,
            // location: null,
            image: null
        },
        locationCity: "",
        locationDistrict: ""
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

    handleUpdateProfile = () => {
        console.log("Update Profile")
        // this.props.updateUserProfile({
        //     username: this.state.username,
        //     email: this.state.email
        // }, this.props)
    }


    handleCityChange(locationCity) {
        let locationDistrict = this.props.location.filter(
            lo => lo.city === locationCity
        )[0].district;

        this.setState({
            ...this.state,
            locationCity,
            locationDistrict
        });
    }

    handleDistrictChange(locationDistrict) {
        this.setState({...this.state.locationCity, locationDistrict});
    }
    renderProfile = (user) => {
        let cityList = this.props.location.map(lo => lo.city);
        cityList = cityList.filter((city, index) => {
            return !cityList.slice(0, index).includes(city);
        });

        if (this.state.locationCity === "") {
            this.setState({
                ...this.state,
                locationCity: cityList[0],
                locationDistrict: this.props.location
                    .filter(lo => lo.city === cityList[0])
                    .map(lo => lo.district)[0]
            });
        }

        let districtList = this.props.location
            .filter(lo => lo.city === this.state.locationCity)
            .map(lo => lo.district);

        let cityComboBox = [];
        cityList.forEach(city => {
            cityComboBox.push(<Option value={city}>{city}</Option>);
        });

        let districtComboBox = [];
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
                                            onChange={this.handleChangeUsername}
                                            value={user.username}/>
                                    </Form.Item>
                                </Col>
                                <Col span={1}/>
                                <Col span={11}>
                                    <Form.Item label="Họ tên" hasFeedback>
                                        <Input
                                            onChange={this.handleChangeFullName}
                                            value={user.fullname}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={11}>
                                    <Form.Item label="E-mail">
                                        <Input
                                            onChange={this.handleChangeEmail}
                                            value={user.email}/>
                                    </Form.Item>
                                </Col>
                                <Col span={1}/>
                                <Col span={3}>
                                    <Form.Item label="Giới tính" hasFeedback>
                                        <Select defaultValue="male" style={{width: 120}}
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
                                            type="number"
                                            onChange={this.handleChangeAge}
                                            value={user.age}/>
                                    </Form.Item>
                                </Col>

                            </Row>
                            <div>
                                <span className="label"> Nơi ở: </span>
                            </div>
                            <Row>
                                <Col span={11}>
                                    <span>Tỉnh/Thành phố</span>
                                    <Select
                                        defaultValue={this.state.locationCity}
                                        value={this.state.locationCity}
                                        onChange={this.handleCityChange.bind(this)}
                                    >
                                        {cityComboBox}
                                    </Select>
                                </Col>
                                <Col span={11} style={{marginLeft: 20}}>
                                    <span>Quận/Huyện</span>
                                    <Select
                                        value={this.state.locationDistrict}
                                        onChange={this.handleDistrictChange.bind(this)}
                                    >
                                        {districtComboBox}
                                    </Select>
                                </Col>
                            </Row>
                            <Form.Item>
                                <Button loading={this.props.isLoadingUpdateProfile}
                                        onClick={() => this.handleUpdateProfile()} type="primary" htmlType="submit">
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
