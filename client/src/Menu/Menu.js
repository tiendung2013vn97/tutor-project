import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./Menu.scss";
import ComplainIcon from '../assets/imgs/complain.png'

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
      <div  className='main-menu'>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
        <Menu
        className="menu"
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
          <Menu.Item key="mange-user">
            <Icon type="user" />
            <span>Người dùng</span>
          </Menu.Item>
          <Menu.Item key="mange-skill-tag">
            <Icon type="tag" />
            <span>Kĩ năng</span>
          </Menu.Item>
          <Menu.Item key="mange-contract">
            <Icon type="audit" />
            <span>Hợp đồng</span>
          </Menu.Item>
          <Menu.Item key="mange-complain">
            <Icon type="frown" />
            <span>Khiếu nại</span>
          </Menu.Item>
          <Menu.Item key="mange-statistic">
            <Icon type="bar-chart" />
            <span>Thống kê</span>
          </Menu.Item>
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
