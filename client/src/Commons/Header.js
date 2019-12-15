import React from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { Row, Col, Dropdown, Menu } from 'antd'
import LoggedIcon from "../assets/imgs/loggedIcon.png";
import Logo from "../assets/imgs/logo.png";
import { logout } from '../Account/action-account';
import './Commons.scss'

class Header extends React.Component {

    render() {
        let user = localStorage.getItem("user");
        if (user) {
            user = JSON.parse(user);
        }


        const headerMenu = (
            <Menu>
                {
                    user && user.type === 'admin' &&

                    <Menu.Item>
                        <Link to="/">
                            Dashboard
                        </Link>
                    </Menu.Item>
                }
                {
                    user && user.type === 'admin' &&
                    <Menu.Item>
                        <Link to="/manage/users">
                            Users management
                        </Link>
                    </Menu.Item>
                }
                {
                    user && user.type === 'admin' &&
                    <Menu.Item>
                        <Link to="/manage/skills">
                            Skills management
                        </Link>
                    </Menu.Item>
                }

                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                        Profile
                     </a>
                </Menu.Item>
                <Menu.Item>
                    <Link onClick={this.props.logout} to="/">
                        Logout
                    </Link>
                </Menu.Item>

            </Menu>
        );
        return (
            <div>
                <Row id="head_bar">
                    <Col span={2}></Col>
                    <Col span={19} style={{ float: "left" }}>
                        <img src={Logo} id="logo" />
                        <div id="slogan">
                            Nơi kết nối người dạy và người học, dù bạn ở bất cứ đâu
            </div>
                    </Col>
                    {user && (
                        <Col span={3} className="account-icon-area">
                            <Dropdown className="dropdown-account" overlay={headerMenu}>
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
            localStorage.clear();
            return dispatch(logout());
        },
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
