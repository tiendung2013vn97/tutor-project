import React from 'react'
import { Row, Col, Icon } from 'antd'
import Logo from "../assets/imgs/logo.png";
import './Commons.scss'

class Footer extends React.Component {

    render() {
        return (
            <div>
                <Row id="footer">
                    <Col span={2}></Col>
                    <Col span={18} style={{ paddingTop: "20px" }}>
                        <img src={Logo} />

                        <Icon type="facebook" className="icon" />
                        <Icon type="instagram" className="icon" />
                        <Icon type="twitter" className="icon" />
                        <div className="text">Điều khoản và chính sách</div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Footer