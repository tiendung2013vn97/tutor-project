import React from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { Row, Col, Dropdown, Menu } from 'antd'
import LoggedIcon from "../assets/imgs/loggedIcon.png";
import Logo from "../assets/imgs/logo.png";
import { logout } from '../Account/action-account';
import './Commons.scss'

class Header extends React.Component {
    toHome = () => {
        console.log(this.props)
    }

     headerMenu = (user) => {
        if(user){
            return (
                <Menu>
                    <Menu.Item>
                        <Link onClick={this.props.logout} to="/">
                            Logout
                        </Link>
                    </Menu.Item>
                </Menu>
            )
        }
        return null;
    }
    render() {
        let user = localStorage.getItem("user");
        if (user) {
            user = JSON.parse(user);
        }

        return (
            <div>
                <Row id="head_bar">
                    <Col span={2}></Col>
                    <Col span={19} style={{ float: "left" }}>
                        <img src={Logo} id="logo" onClick={this.toHome} />
                        <div id="slogan">
                            Nơi kết nối người dạy và người học, dù bạn ở bất cứ đâu
            </div>
                    </Col>
                    {user && (
                        <Col span={3} className="account-icon-area">
                            <Dropdown className="dropdown-account" overlay={()=>this.headerMenu(user)}>
                                <div>
                                    <img id="acount_icon" src={LoggedIcon} />
                                    {user.fullname}
                                </div>
                            </Dropdown>
                        </Col>
                    )}
                </Row>
            </div>
        )
    }
}


//map state to props
function mapStateToProps(state) {
    return {
        account: state.account
    };
}

//map dispatch to props
function mapDispatchToProps(dispatch) {
    return {
        logout() {
            return dispatch(logout());
        },
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
