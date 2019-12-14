import React, { Component } from "react";
import { Tabs, Row, Col, Card, Button } from "antd";
import "./Admin.scss";
import Register from '../Account/CreateAdminAccount/container-register'

const { TabPane } = Tabs;

class Student extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Row style={{marginTop:"20px",marginBottom:"20px"}}>
        <Col span={1}></Col>
        <Col span={8}>
          <Card title="Tạo mới account">
            <Register/>
          </Card>
        </Col>
        <Col span={1}></Col>
        <Col span={12}>
          <Card title={"Danh sách tài khoản admin"}>
            <Card title="Admin 1:">
              <div>Username: admin1</div>
              <div>Họ và tên: Nguyễn Quá Cố</div>
              <div>Role: root</div>
              ...
              <br />
              <br />
              <Button type="danger">Xóa tài khoản</Button>
              <span> </span>
              <Button type="danger">Thay đổi quyền</Button>
            </Card>
            ...
          </Card>
        </Col>
        <Col span={2}></Col>
      </Row>
    );
  }

  callback(key) {
    console.log(key);
  }
}

export default Student;
