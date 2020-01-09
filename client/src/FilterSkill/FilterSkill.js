import React, { Component } from "react";
import "./FilterSkill.scss";
import { Link, Redirect } from "react-router-dom";
import { Button, Row, Col, Select, Divider, Table, Input, Icon } from "antd";
const { Option } = Select;

const columns = [
  {
    title: "Kĩ năng",
    dataIndex: "skillName",
    key: "skillName"
  },
  {
    title: "Giáo viên",
    dataIndex: "teacherName",
    key: "teacherName"
  },
  {
    title: "Mô tả",
    dataIndex: "detail",
    key: "detail"
  },
  {
    title: "Giá/giờ",
    dataIndex: "costPerHour",
    key: "costPerHouse"
  },
  {
    title: "",
    dataIndex: "id",
    key: "id",

    render: text => (
      <Link to={"/"} className="extra-link">
        <Icon type="read" style={{ fontSize: 30 }} />
      </Link>
    )
  }
];
class FilterSkill extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.state = {
      locationCity: "",
      locationDistrict: ""
    };
  }

  //render
  render() {
    let cityList = this.props.location.map(lo => lo.city);
    cityList = cityList.filter((city, index) => {
      return !cityList.slice(0, index).includes(city);
    });

    if (this.state.locationCity === "" && cityList[0]) {
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
    return (
      <div className="skill-tag-page">
        <Row>
          <Col span={1}></Col>
          <Col span={7}>
            <Divider>Địa chỉ giáo viên</Divider>
            <Row>
              <Col span={11}>
                <Select
                  defaultValue={this.state.locationCity}
                  value={this.state.locationCity}
                  onChange={this.handleCityChange.bind(this)}
                  style={{
                    width: "100%",
                    fontSize: "1.2rem",
                    height: "30px"
                  }}
                  size="small"
                >
                  {cityComboBox}
                </Select>
              </Col>
              <Col span={11} style={{ marginLeft: 20 }}>
                <Select
                  value={this.state.locationDistrict}
                  onChange={this.handleDistrictChange.bind(this)}
                  style={{
                    width: "100%",
                    fontSize: "1.2rem"
                  }}
                  size="small"
                >
                  {districtComboBox}
                </Select>
              </Col>
            </Row>

            <br />

            <Button type="primary">Tìm kiếm</Button>
          </Col>
          <Col span={7}>
            {" "}
            <Divider>Tên kỹ năng</Divider>
            <input type="text" id="skill_tag_name" />
          </Col>
          <Col span={7}>
            <Divider>Giá/giờ</Divider>
            <input type="number" id="cost_per_house_from" placeholder="Từ" />
            <br /> <br />
            <input type="number" id="cost_per_house_to" placeholder="Tới" />
          </Col>
          <Row>
            <Table columns={columns} dataSource={this.props.skills} />
          </Row>
        </Row>
      </div>
    );
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
    this.setState({ ...this.state.locationCity, locationDistrict });
  }
}

export default FilterSkill;
