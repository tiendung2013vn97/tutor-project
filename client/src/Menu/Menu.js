import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import "./Menu.scss";

import {
    Row,
    Col,
    Tabs,
    Icon,
    Carousel,
    Rate,
    Card,
    Divider,
    Button,
    Menu,
    Layout
} from "antd";

const { SubMenu } = Menu;

class MainMenu extends Component {
    //constructor
    constructor(props) {
        super(props);
        this.state = {
            current: "mail",
            collapsed: false,
            user: JSON.parse(localStorage.getItem("user"))
        };
    }

    adminMenu = () => {
        return <Menu
            defaultSelectedKeys={['home']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="light"
            inlineCollapsed={this.state.collapsed}
            // onClick={this.handleClickAdminMenu}
        >
            <Menu.Item key="home">
                <Link to={"/"}>
                    <Icon type="home" />
                    <span>Trang chủ</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="user">
                <Link to={"/manage/users"}>
                    <Icon type="user" />
                    <span>Quản lí người dùng</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="skillTag">
                <Link to={"/manage/skill-tags"}>
                    <Icon type="tag" />
                    <span>Quản lí kĩ năng</span>
                </Link>
            </Menu.Item>
            {/*<Menu.Item key="studyRequest">*/}
            {/*    <Icon type="audit"/>*/}
            {/*    <span>Quản lí đơn xin học</span>*/}
            {/*</Menu.Item>*/}
            <Menu.Item key="contract">
                <Link to={"/manage/contracts"}>
                    <Icon type="appstore" />
                    <span>Quản lí hợp đồng</span>
                </Link>
            </Menu.Item>
            <SubMenu
                key="info"
                title={
                    <span>
                        <Icon type="user" />
                        <span>Thông tin người dùng</span>
                    </span>
                }
            >
                <Menu.Item key="9">
                    <Link to={`/profile`}>Hồ sơ</Link>
                </Menu.Item>
                <Menu.Item key="10">
                    <Link to={`/account`}>Tài khoản</Link>
                </Menu.Item>
            </SubMenu>
        </Menu>
    }

    teacherMenu = () => {
        return <Menu
            defaultSelectedKeys={['home']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="light"
            inlineCollapsed={this.state.collapsed}
            // onClick={this.handleClickAdminMenu}
        >
            <Menu.Item key="home">
                <Link to={"/"}>
                    <Icon type="home" />
                    <span>Trang chủ</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="skill">
                <Link to={`/skill/${this.state.user.username}`}>
                    <Icon type="tag" />
                    <span>Quản lí kĩ năng</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="studyRequest">
                <Icon type="audit"/>
                <span>Quản lí đơn xin học</span>
            </Menu.Item>
            <Menu.Item key="contract">
                <Link to={"/manage/contracts"}>
                    <Icon type="appstore" />
                    <span>Quản lí hợp đồng</span>
                </Link>
            </Menu.Item>
            <SubMenu
                key="info"
                title={
                    <span>
                        <Icon type="user" />
                        <span>Thông tin người dùng</span>
                    </span>
                }
            >
                <Menu.Item key="9">
                    <Link to={`/profile`}>Hồ sơ</Link>
                </Menu.Item>
                <Menu.Item key="10">
                    <Link to={`/account`}>Tài khoản</Link>
                </Menu.Item>
            </SubMenu>
        </Menu>
    }



    render() {
        const {account}=this.props;
        if(account && account.username)
        return (
            <div style={{ width: 256 }}>
                {/*<Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>*/}
                {/*    <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />*/}
                {/*</Button>*/}
                {
                    (account.type === "admin"|| account.type==="root") &&
                    this.adminMenu()
                }
                {
                    account.type === "teacher" &&
                    this.teacherMenu()
                }
                {
                    account.type === "student" &&
                    this.teacherMenu()
                }
            </div>
        );
        return null;
    }

    handleClickAdminMenu = e => {
        console.log("click ", this.props);
        this.setState({
            current: e.key
        });
        switch (e.key) {
            case "home":
                break;
            case "user":
                // this.props.history.push("/manage/users")
                break;
        }
    };
    handleClick = e => {
        console.log("click ", e);
        this.setState({
            current: e.key
        });
    };

    toggleCollapsed = () => {
        this.setState({
            ...this.state,
            collapsed: !this.state.collapsed,
        });
    }
}

export default MainMenu;
