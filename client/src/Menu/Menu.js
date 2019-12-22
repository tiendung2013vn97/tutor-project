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
      current: "mail"
    };
  }

  //render
  render() {
    return (
      <Menu
        onClick={this.handleClick.bind(this)}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="mail">
          <Icon type="mail" />
          Navigation One
        </Menu.Item>
        <Menu.Item key="app" disabled>
          <Icon type="appstore" />
          Navigation Two
        </Menu.Item>
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="setting" />
              Navigation Three - Submenu
            </span>
          }
        >
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <a
            href="https://ant.design"
            target="_blank"
            rel="noopener noreferrer"
          >
            Navigation Four - Link
          </a>
        </Menu.Item>
      </Menu>
    );
  }

  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };
}

export default MainMenu;