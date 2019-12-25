import React, { Component } from "react";
import "./RegisterResult.scss";
import { Button, Row, Col, Select, Result } from "antd";

const { Option } = Select;

class RegisterResult extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="register-result-container">
        <Result
          status="success"
          title="Tạo tài khoản thành công!"
          subTitle="Bạn đã có thể dùng tài khoản vừa tạo để đăng nhập, chúc bạn một ngày vui vẻ ^.^"
          extra={[
            <Button type="primary" key="console">
              Đăng nhập
            </Button>,
          ]}
        />
      </div>
    );
  }
}

export default RegisterResult;
