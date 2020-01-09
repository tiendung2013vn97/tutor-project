import React from 'react';
import {Card, Col, Row, Button, message, Popconfirm} from "antd";
import {Link} from "react-router-dom";
import {milisecondToDateString, translateContractStatus} from "../../Commons/commonFunction";
import Axios from "../../Api";

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
                    <Popconfirm
                        title="Bạn có chắc muốn hủy hợp đồng"
                        onConfirm={() => this.confirm(data.id)}
                        okText="Xóa"
                        cancelText="Không"
                    >
                        <Button>Hủy hợp đồng</Button>
                    </Popconfirm>
                </Row>
            </Card>
        )
    }

    confirm(id) {
        this.cancel(id)
    }

    cancel = (id) => {
        return Axios.put("contract/cancle/" + id)
            .then(res => {
                if (res && res.data.status !== "fail") {
                    message.success("Đã hủy hợp đồng")
                } else
                    message.error("Lỗi")
            }).catch(e => {
                message.error("Lỗi")
            })
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