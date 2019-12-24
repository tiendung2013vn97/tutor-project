import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Register from "../Account/Register/container-register";
import Login from "../Account/Login/container-login";
import "./Home.scss";
import Bg from "../assets/imgs/bg.jpg";
import Bg2 from "../assets/imgs/bg2.jpg";
import Logo from "../assets/imgs/logo.png";
import Profile1 from "../assets/imgs/profile1.png";
import Profile2 from "../assets/imgs/profile2.png";
import Profile3 from "../assets/imgs/profile3.jpg";
import Profile4 from "../assets/imgs/profile4.png";
import Profile5 from "../assets/imgs/profile5.jpg";
import Student from "../Student/Student";
import Teacher from "../Teacher/Teacher";
import Admin from "../Admin/Admin";
import LoggedIcon from "../assets/imgs/loggedIcon.png";
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
  Layout
} from "antd";
const { TabPane } = Tabs;

const { Header, Footer, Content } = Layout;

class Home extends Component {
  //constructor
  constructor(props) {
    super(props);
  }

  //render
  render() {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
    }

    let mainTitle = [];
    mainTitle.push(
      <div style={{ marginLeft: 50 }}>
        <h3 style={{ color: "white", fontStyle: "italic" }}>
          Bạn tự tin vào khả năng giảng dạy của mình trong 1 lĩnh vực, bạn muốn
          kiếm thêm tiền nhờ việc giảng dạy ?<br />
          <br />
          Bạn đang có nhu cầu học hỏi ,muốn tìm kiếm giáo viên với giá cả hợp
          lí, chất lượng đạt chuẩn ?<br />
          <br />
        </h3>
        <h2 style={{ color: "white", fontStyle: "italic" }}>
          ---ADDODA---
          <br />
          Nơi sẽ đáp ứng tất cả điều đó cho bạn, với cách thức dễ dàng, an toàn
          hàng đầu.
        </h2>
      </div>
    );

    let introPage = [];
    introPage.push();

    let remarkPerson = [];
    remarkPerson.push(
      <Row gutter={8}>
        <Col span={8}>
          <Card title={ <Rate disabled defaultValue={4} />} className='remark-person-card' bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title"className='remark-person-card' bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title"className='remark-person-card' bordered={false}>
            Card content
          </Card>
        </Col>

      </Row>
    );

    let pageNotLogin = [];
    pageNotLogin.push(
      <Row>
        <Row>
          <Col span={17}>
            <Carousel autoplay id="slide_banner">
              <div>
                <img src={Bg} className="bg_home" />
              </div>
              <div>
                <img src={Bg2} className="bg_home" />
              </div>
            </Carousel>

            <div className="main-title">{mainTitle}</div>
          </Col>
          <Col span={1}></Col>
          <Col span={6}>
            <Tabs defaultActiveKey="2" className="tab-view">
              <TabPane
                tab={
                  <span style={{ fontSize: "1.2rem" }}>
                    <Icon type="user" />
                    Sign In
                  </span>
                }
                key="login"
              >
                <Login />
              </TabPane>
              <TabPane
                tab={
                  <span style={{ fontSize: "1.2rem" }}>
                    <Icon type="user-add" />
                    Sign up
                  </span>
                }
                key="register"
              >
                <Register />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Divider
            style={{ fontSize: "1.5rem", fontStyle: "italic" }}
            orientation="left"
          >
            Người dạy tiêu biểu của tháng 12
          </Divider>
        </Row>
        <Row className="list-profile">
          <Col span={2}></Col>
          <Col span={4}>
            <Card
              style={{ width: 300 }}
              cover={
                <div className="panel-item">
                  <Rate disabled defaultValue={4} />
                  <img src={Profile1} />
                </div>
              }
              actions={[<div> See detail</div>]}
            ></Card>
          </Col>
          <Col span={4}>
            <Card
              style={{ width: 300 }}
              cover={
                <div className="panel-item">
                  <Rate disabled defaultValue={4} />
                  <img src={Profile2} />
                </div>
              }
              actions={[<div> See detail</div>]}
            ></Card>
          </Col>
          <Col span={4}>
            <Card
              style={{ width: 300 }}
              cover={
                <div className="panel-item">
                  <Rate disabled defaultValue={5} />
                  <img src={Profile3} />
                </div>
              }
              actions={[<div> See detail</div>]}
            ></Card>
          </Col>
          <Col span={4}>
            <Card
              style={{ width: 300 }}
              cover={
                <div className="panel-item">
                  <Rate disabled defaultValue={4} />
                  <img src={Profile4} />
                </div>
              }
              actions={[<div> See detail</div>]}
            ></Card>
          </Col>
          <Col span={4}>
            <Card
              style={{ width: 300 }}
              cover={
                <div className="panel-item">
                  <Rate disabled defaultValue={5} />
                  <img src={Profile5} />
                </div>
              }
              actions={[<div> See detail</div>]}
            ></Card>
          </Col>
          <Col span={2}></Col>
          <Row>{remarkPerson}</Row>
        </Row>
      </Row>
    );
    return (
      <div className="home-container">
        <br />
        {!user && pageNotLogin}
        <div className="middle-layout">
          <Layout>
            <Content>
              {user && user.type === "student" && (
                <Student account={this.props.account} />
              )}
              {user && user.type === "teacher" && (
                <Teacher account={this.props.account} />
              )}
              {user && user.type === "admin" && <Redirect to="/manage/users" />}
            </Content>
          </Layout>
        </div>
      </div>
    );
  }
}

export default Home;
