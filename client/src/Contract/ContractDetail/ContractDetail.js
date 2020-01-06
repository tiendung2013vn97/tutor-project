import React from 'react';
import {Card, Col, Row} from "antd";
import {Link} from "react-router-dom";
import {milisecondToDateString, translateContractStatus} from "../../Commons/commonFunction";

class ContractDetail extends React.Component {

    renderDetail(data) {
        return (
            <div>
                <Card hoverable>
                    <Row>
                        <Col span={4}>
                            <strong>Người dạy:</strong>
                        </Col>
                        <Col>
                            <Link to={`/manage/users/${data.teacherId}`}>{data.teacherId}</Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <strong>Người học:</strong>
                        </Col>
                        <Col>
                            <Link to={`/manage/users/${data.studentId}`}>{data.studentId}</Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <strong>Tổng giờ thuê:</strong>
                        </Col>
                        <Col>
                            {data.totalHours}
                        </Col>
                    </Row>
                    <Row>
                    <Col span={4}>
                        <strong>Giá thuê:</strong>
                    </Col>
                    <Col>
                        <span style={{
                            background: 'yellow'
                        }}>Chưa GET</span>

                    </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <strong>Ngày tạo hợp đồng:</strong>
                        </Col>
                        <Col>
                            {milisecondToDateString(data.createDt)}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <strong>Ngày bắt đầu:</strong>
                        </Col>
                        <Col>
                            {milisecondToDateString(data.startDt)}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <strong>Ngày kết thúc:</strong>
                        </Col>
                        <Col>
                            {milisecondToDateString(data.toDt)}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <strong>Trạng thái hợp đồng:</strong>
                        </Col>
                        <Col span={20}>
                            {translateContractStatus(data.status)}
                        </Col>
                    </Row>

                    <Row>
                        <Col span={4}>
                            <strong>Chi tiết hợp đồng:</strong>
                        </Col>
                        <Col span={20}>
                            {data.detail}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <strong>Kỹ năng:</strong>
                        </Col>
                        <Col span={20}>
                            {this.props.skillTagName}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <strong>Đánh giá</strong>
                        </Col>
                        <Col span={20}>
                            {data.rate}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <strong>Đánh giá của người học</strong>
                        </Col>
                        <Col span={20}>
                            {data.studentComment}
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }

    render() {
        return (
            this.renderDetail(this.props.contract)
        )
    }
}

export default ContractDetail