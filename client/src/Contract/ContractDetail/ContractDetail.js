import React from 'react';
import {Card, Col, Row, Button} from "antd";
import {Link} from "react-router-dom";
import {milisecondToDateString, translateContractStatus} from "../../Commons/commonFunction";

class ContractDetail extends React.Component {

    renderComplain(data) {
        return (
            <Card hoverable>
                <h2>Khiếu nạy</h2>
                <Row>
                    <Col span={8}>
                        <strong>Chi tiết:</strong>
                    </Col>
                    <Col>
                        {data.complainDetail}
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <strong>Giải quyết:</strong>
                    </Col>
                    <Col>
                        {data.resolveDetail}
                    </Col>
                </Row>
                <br/>
                <h2>Giải quyết khiếu nạy</h2>
                <Row>

                </Row>

            </Card>
        )
    }

    renderDetail(data) {
        return (
            <Card hoverable>
                <h2>Chi tiết hợp đồng</h2>
                <Row>
                    <Col span={8}>
                        <strong>Người dạy:</strong>
                    </Col>
                    <Col>
                        <Link to={`/user/${data.skill.teacherId}`}>{data.skill.teacherId}</Link>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <strong>Người học:</strong>
                    </Col>
                    <Col>
                        <Link to={`/user/${data.studentId}`}>{data.studentId}</Link>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <strong>Tổng giờ thuê:</strong>
                    </Col>
                    <Col>
                        {data.totalHours}
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <strong>Giá thuê:</strong>
                    </Col>
                    <Col>
                        <Col>
                            {data.costPerHour} Vnd
                        </Col>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <strong>Ngày tạo hợp đồng:</strong>
                    </Col>
                    <Col>
                        {milisecondToDateString(data.createDt)}
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <strong>Ngày bắt đầu:</strong>
                    </Col>
                    <Col>
                        {milisecondToDateString(data.startDt)}
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <strong>Ngày kết thúc:</strong>
                    </Col>
                    <Col>
                        {milisecondToDateString(data.toDt)}
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <strong>Trạng thái hợp đồng:</strong>
                    </Col>
                    <Col span={16}>
                        {translateContractStatus(data.status)}
                    </Col>
                </Row>

                <Row>
                    <Col span={8}>
                        <strong>Chi tiết hợp đồng:</strong>
                    </Col>
                    <Col span={16}>
                        {data.detail}
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <strong>Kỹ năng:</strong>
                    </Col>
                    <Col span={16}>
                        {this.props.skillTagName}
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <strong>Đánh giá</strong>
                    </Col>
                    <Col span={16}>
                        {data.rate}
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <strong>Đánh giá của người học</strong>
                    </Col>
                    <Col span={16}>
                        {data.studentComment}
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Button onClick={this.cancel}>Hủy hợp đồng</Button>
                </Row>
            </Card>
        )
    }

    render() {
        return (
            <Row>
                <Col span={12}>
                    {this.renderDetail(this.props.contract)}
                </Col>
                <Col span={12}>{this.renderComplain(this.props.contract)}</Col>
            </Row>
        )
    }
}

export default ContractDetail