import React from "react";
import {Row, Col, Upload, message, Icon, Tabs, Card, Button, Form, Input, Select} from "antd";
import {getLocations} from "../../Location/api-location";
import {URL} from "../../config";

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
        //     location: {
        //         city: null,
        //         district: null
        //     },
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
                        <Icon type="camera"/>
                        Upload Avatar
                    </p>
                </a>
            </Upload>
        );
    }

    renderProfile = (user) => {
        if (user) {
            const {locations} = this.state;

            let cityList = locations.map(lo => lo.city);
            cityList = cityList.filter((city, index) => {
                return !cityList.slice(0, index).includes(city);
            });
            let cityComboBox = [];
            let districtComboBox = [];
            if (locations.length != 0) {
                let districtList = locations
                    .filter(lo => user.location.city === lo.city)
                    .map(lo => lo.district);

                cityList.forEach(city => {
                    cityComboBox.push(<Option value={city}>{city}</Option>);
                });

                console.log("list", districtList)
                districtList.forEach(district => {
                    districtComboBox.push(<Option value={district}>{district}</Option>);
                });
            }

            return (
                <div className="box-register-container">
                    <Card className="box-register" hoverable>
                        <Row>
                            <Col span={4}>
                                <img style={{
                                    height: "200px",
                                    width: "200px"
                                }}
                                     src={require("../../assets/imgs/defaultAvatar.jpg")} alt="defaultavatar"/>
                                {this.renderUpload()}
                            </Col>
                            <Col span={2}/>
                            <Col span={18}>
                                <Form>
                                    <Row>
                                        <Col span={11}>
                                            <Form.Item label="Username" hasFeedback>
                                                <Input
                                                    onChange={this.handleChangeUsername}
                                                    value={user.username}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={2}/>
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
                                        <Col span={2}/>
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
                                    <Row>
                                        <Col span={11}>
                                            <Form.Item label="Tỉnh/Thành phố" hasFeedback>
                                                <Select
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
                                                    value={user.intro}
                                                    onChange={this.handleChangeIntro}
                                                    placeholder="Giới thiệu"
                                                    autoSize={{minRows: 3, maxRows: 5}}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Form.Item>
                                        <Button loading={this.props.isLoadingUpdateProfile}
                                                onClick={() => this.handleUpdateProfile()} type="primary"
                                                htmlType="submit">
                                            Lưu
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </Card>
                </div>
            );
        }
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
