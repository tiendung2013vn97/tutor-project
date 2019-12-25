import "./PageNotFound.scss";
import React, { Component } from "react";
import { Result, Button } from "antd";

class PageNotFound extends Component {
  render() {
    return (
      <div className="page-not-found">
        <Result
          status="404"
          title="404"
          subTitle="Xin lỗi! Trang này không tồn tại!."
          extra={<Button type="primary">Về trang chủ</Button>}
        />
      </div>
    );
  }
}

export default PageNotFound;
