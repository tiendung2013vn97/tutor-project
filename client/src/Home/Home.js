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
import config from "../config";
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
          <marquee
            width="100%"
            direction="right"
            height="100px"
            scrollamount="5"
          >
            Nơi sẽ đáp ứng tất cả điều đó cho bạn, với cách thức dễ dàng, an
            toàn hàng đầu.
          </marquee>
        </h2>
      </div>
    );

    let introPage = [];
    introPage.push();

    let remarkPerson = [];
    if (this.props.remarkPersons.length) {
      let users = this.props.remarkPersons;
      remarkPerson.push(
        <div>
          <Row gutter={8}>
            <Col span={8}>
              <Card
                title={<Rate disabled defaultValue={users[0].rate} />}
                className="remark-person-card"
                bordered={false}
                height="400"
                actions={[<Icon type="eye" key="detail" />]}
              >
                <Row className="min-title">
                  <img
                    src={`${config.URL}public-user/image/${users[0].image}`}
                    className="remark-img"
                  />

                  <div>{users[0].fullname}</div>
                  <Divider className="intro-label">Giới thiệu</Divider>
                  <div className="intro"> {users[0].intro}</div>
                </Row>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                title={<Rate disabled defaultValue={users[1].rate} />}
                className="remark-person-card"
                bordered={false}
                height="400"
                actions={[<Icon type="eye" key="detail" />]}
              >
                <Row className="min-title">
                  <img
                    src={`${config.URL}public-user/image/${users[1].image}`}
                    className="remark-img"
                  />

                  <div>{users[1].fullname}</div>
                  <Divider className="intro-label">Giới thiệu</Divider>
                  <div className="intro"> {users[1].intro}</div>
                </Row>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                title={<Rate disabled defaultValue={users[2].rate} />}
                className="remark-person-card"
                bordered={false}
                height="400"
                actions={[<Icon type="eye" key="detail" />]}
              >
                <Row className="min-title">
                  <img
                    src={`${config.URL}public-user/image/${users[2].image}`}
                    className="remark-img"
                  />

                  <div>{users[2].fullname}</div>
                  <Divider className="intro-label">Giới thiệu</Divider>
                  <div className="intro"> {users[2].intro}</div>
                </Row>
              </Card>
            </Col>
          </Row>

          <br />
          <br />
          <div>
            <Row gutter={8}>
              <Col span={8}>
                <Card
                  title={<Rate disabled defaultValue={users[3].rate} />}
                  className="remark-person-card"
                  bordered={false}
                  height="400"
                  actions={[<Icon type="eye" key="detail" />]}
                >
                  <Row className="min-title">
                    <img
                      src={`${config.URL}public-user/image/${users[3].image}`}
                      className="remark-img"
                    />

                    <div>{users[0].fullname}</div>
                    <Divider className="intro-label">Giới thiệu</Divider>
                    <div className="intro"> {users[3].intro}</div>
                  </Row>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title={<Rate disabled defaultValue={users[4].rate} />}
                  className="remark-person-card"
                  bordered={false}
                  height="400"
                  actions={[<Icon type="eye" key="detail" />]}
                >
                  <Row className="min-title">
                    <img
                      src={`${config.URL}public-user/image/${users[4].image}`}
                      className="remark-img"
                    />

                    <div>{users[1].fullname}</div>
                    <Divider className="intro-label">Giới thiệu</Divider>
                    <div className="intro"> {users[4].intro}</div>
                  </Row>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title={<Rate disabled defaultValue={users[5].rate} />}
                  className="remark-person-card"
                  bordered={false}
                  height="400"
                  actions={[<Icon type="eye" key="detail" />]}
                >
                  <Row className="min-title">
                    <img
                      src={`${config.URL}public-user/image/${users[5].image}`}
                      className="remark-img"
                    />

                    <div>{users[2].fullname}</div>
                    <Divider className="intro-label">Giới thiệu</Divider>
                    <div className="intro"> {users[5].intro}</div>
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      );
    }

    let pageNotLogin = [];
    pageNotLogin.push(
      <Row>
        <Row>
          <Col span={24}>
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
        </Row>
        <br />
        <br />
        <Row>
          <Divider
            className="intro-label"
            style={{ fontSize: "1.5rem", fontStyle: "italic" }}
            orientation="left"
          >
            Người dạy tiêu biểu
          </Divider>
        </Row>
        <Row className="list-profile">
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
              {user && user.type === "admin" && <Admin />}
            </Content>
          </Layout>
        </div>
      </div>
    );
  }
}

export default Home;
