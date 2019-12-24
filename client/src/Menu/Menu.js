import React, { Component } from "react";
import { Redirect } from "react-router-dom";
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
      collapsed:false
    };
  }

  //render
  render() {
    return (
      <div style={{ width: 256,position:"fixed",top:0,zIndex:"9999" }}>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="light"
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="home">
            <Icon type="home" />
            <span>Trang chủ</span>
          </Menu.Item>
          <Menu.Item key="user">
            <Icon type="user" />
            <span>Quản lí người dùng</span>
          </Menu.Item>
          <Menu.Item key="skillTag">
            <Icon type="tag" />
            <span>Quản lí kĩ năng</span>
          </Menu.Item>
          <Menu.Item key="studyRequest">
            <Icon type="audit" />
            <span>Quản lí đơn xin học</span>
          </Menu.Item>
          <Menu.Item key="contract">
            <Icon type="audit" />
            <span>Quản lí hợp đồng</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>Navigation One</span>
              </span>
            }
          >
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="appstore" />
                <span>Navigation Two</span>
              </span>
            }
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>
    );
  }

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
