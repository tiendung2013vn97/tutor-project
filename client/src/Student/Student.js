import React, { Component } from "react";
import { Layout, Row, Col, Card, Checkbox, Button } from "antd";

const { Header, Footer, Content } = Layout;
const CheckboxGroup = Checkbox.Group;

const plainOptions = [
  "Quận 1",
  "Quận 2",
  "Quận 3",
  "Quận 4",
  "Quận 5",
  "Quận 6",
  "Quận 7",
  "Quận 8"
];
const defaultCheckedList = ["Quận 3", "Quận 4"];

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false
    };
  }
  render() {
    return (
      <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Col span={1}></Col>
        <Col span={4}>
          <Card title="Tìm giáo viên theo khu vực">
            <div>
              <div style={{ borderBottom: "1px solid #E9E9E9" }}>
                <Checkbox
                  indeterminate={this.state.indeterminate}
                  onChange={this.onCheckAllChange.bind(this)}
                  checked={this.state.checkAll}
                >
                  Check all
                </Checkbox>
              </div>
              <br />
              <CheckboxGroup
                options={plainOptions}
                value={this.state.checkedList}
                onChange={this.onChange.bind(this)}
              />
            </div>
          </Card>
          <br />
          <Card title="Các tiêu chí khác:">...</Card>
          <br />
          <Button type="primary">Tìm kiếm</Button>
        </Col>
        <Col span={1}></Col>
        <Col span={16}>
          <Card title="Các khóa học hiện tại của bạn:">
            <Card title="Khóa học 1:">
              <div>Giáo viên: Nguyễn Kim Đồng</div>
              <div>Ngày bắt đầu học: 21/5/2017</div>
              <div>Lệ phí học/tháng: 500,000VNĐ</div>
              ...
            </Card>
            ...
          </Card>
          <br />
          <Card title="Danh sách người dạy phù hợp kết quả tìm kiếm:">
            <Card title="Giáo viên 1:">
              <div>Họ và tên: Nguyễn Kim Đồng</div>
              <div>Trình độ: Đại học</div>
              ...
            </Card>
            ...
          </Card>
        </Col>
        <Col span={2}></Col>
      </Row>
    );
  }
  onChange = checkedList => {
    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length
    });
  };
  onCheckAllChange = e => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked
    });
  };
}

export default Student;
