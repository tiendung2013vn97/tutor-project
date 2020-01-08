import React, {Component} from "react";
import {Link, Switch, Route} from "react-router-dom";
import {Tabs, Row, Col, Card, Button, Menu, Icon} from "antd";

import "./Admin.scss";

const {SubMenu} = Menu;
const {TabPane} = Tabs;

class Student extends Component {
    constructor(props) {
        super(props);
    }

    menuBar = () => {
        return (
            <Menu
                onClick={this.handleClick}
                style={{width: 256}}
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["1"]}
                mode="inline"
            >
                <Menu.Item key="1">
                    <Link to="/manage/users">Users</Link>
                </Menu.Item>

                <Menu.Item key="2">
                    <Link to="/manage/skill-tags">Skills</Link>
                </Menu.Item>

                <Menu.Item key="3">
                    <Link to="/manage/contracts">Contracts</Link>
                </Menu.Item>

                <Menu.Item key="4">
                    <Link to="/manage/student-report">Student's Report</Link>
                </Menu.Item>
            </Menu>
        );
    };

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
        // return (

        //   <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
        //     <Col span={1}></Col>
        //     <Col span={8}>
        //       <Card title="Tạo mới account">
        //         <Register />
        //       </Card>
        //     </Col>
        //     <Col span={1}></Col>
        //     <Col span={12}>
        //       <Card title={"Danh sách tài khoản admin"}>
        //         <Card title="Admin 1:">
        //           <div>Username: admin1</div>
        //           <div>Họ và tên: Nguyễn Quá Cố</div>
        //           <div>Role: root</div>
        //           ...
        //           <br />
        //           <br />
        //           <Button type="danger">Xóa tài khoản</Button>
        //           <span> </span>
        //           <Button type="danger">Thay đổi quyền</Button>
        //         </Card>
        //         ...
        //       </Card>
        //     </Col>
        //     <Col span={2}></Col>
        //   </Row>
        // );
    }

    callback(key) {
        console.log(key);
    }
}

export default Student;
