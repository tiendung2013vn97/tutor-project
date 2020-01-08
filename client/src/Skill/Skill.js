import React from "react";
import Axios from "../Api";
import {Button, Pagination, Switch, Table, Popconfirm, message} from "antd";
import {deleteSkill} from "./api-skill";
import {Link} from 'react-router-dom'

class Skill extends React.Component {
    constructor(props) {
        super(props);
    }

    confirm(e) {
        this.handleDelete(e)
    }

    handleDelete = (row) => {
        if (!row)
            return null;
        return deleteSkill(row.id).then(res => {
            if (res && res.status === 200) {
                message.success("Xoá thành công")
                this.props.getSkills(this.props.current, 10)
            }
        }).catch(e => {
            message.error("Lỗi")
        })
    }

    handleEdit(row){
        localStorage.setItem("skill", JSON.stringify(row));
        this.props.history.push(`/skill/edit/${row.id}`)
    }

    renderTable(data) {
        if (data === null)
            return null
        const columns = [
            {
                title: 'Id',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: 'Tên',
                dataIndex: "skill_tag.name",
                key: 'name',
            },
            {
                title: 'Giá trên giờ',
                dataIndex: "costPerHour",
                key: 'costPerHour',
            },
            {
                title: 'Mô tả',
                dataIndex: 'note',
                key: 'note',
            },
            {
                title: 'Tác vụ',
                dataIndex: 'isActived',
                render: (text, row, index) => {
                    return <div style={{
                        display: 'flex'
                    }}>
                        <Popconfirm
                            title="Bạn có chắc muốn xóa kỹ năng này?"
                            onConfirm={() => this.confirm(row)}
                            okText="Xóa"
                            cancelText="Không"
                        >
                            <Button type={"danger"} size={"small"} ghost>Delete</Button>
                        </Popconfirm>
                        <div style={{
                            marginLeft: '4px'
                        }}>
                            <Button ghost type={"primary"} onClick={()=>this.handleEdit(row)} size={"small"}>Chỉnh sửa</Button>
                        </div>
                    </div>

                }
            },
        ];

        return <div>
            <Table
                dataSource={data.rows}
                columns={columns}
                pagination={false}
            />
            <br/>
            <Pagination current={this.props.current} onChange={this.props.handleChangePage} total={data.count}/>
        </div>

    }

    render() {
        console.log("table", this.props.skill)
        return (
            <div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                }}>
                    <h1>Quản lý kỹ năng</h1>
                    <Button style={{
                        marginLeft: '5px',
                        marginTop: '5px'
                    }} type="primary" onClick={this.props.handleCreate}>Tạo mới</Button>
                </div>
                {this.renderTable(this.props.skill)}
            </div>
        )
    }
}

export default Skill