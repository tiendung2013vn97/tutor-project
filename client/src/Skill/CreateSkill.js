import React from 'react';
import {Form, Input, Icon, Button, Modal, Card, Row, Col, Select, message} from 'antd'
import {getSkillTags} from "../SkillTag/api-skilltag";
import {updateSkillTag} from "../SkillTag/action-skillTag";
import {addSkill} from "./api-skill";

const FormItem = Form.Item;
const {Option} = Select;
const {TextArea} = Input;

class CreateSkill extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            skillTags: null,
            name: null,
            cost: null,
            note: null
        };
    }

    componentDidMount() {
        this.getSkills();
    }

    getSkills() {
        return getSkillTags(1, 1000)
            .then(res => {
                if (res && res.status === 200) {
                    this.setState({
                        skillTags: res.data
                    })
                }
            })
    }

    handleChangeName = e => {
        console.log(e)
        this.setState({
            name: e
        })
    }

    handleChangeCost = e => {
        this.setState({
            name: e.target.value
        })
    }

    handleChangeNote = e => {
        this.setState({
            note: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                addSkill(values).then(res => {
                    if (res && res.data.status !== "fail") {
                        message.success("Thêm kỹ năng thành công")
                    }
                    else
                        message.error("Lỗi")
                }).catch(e => {
                    message.error("Lỗi")
                })
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form
        return (
            <div className="box-register-container">
                <h1>Thêm Kỹ Năng</h1>
                <Card className="box-register" hoverable>
                    <Row>
                        <Col span={12} offset={6}>

                            <Form>
                                <FormItem
                                    label="Tên Kỹ Năng"
                                    style={{marginBottom: '24px'}}
                                    hasFeedback
                                >
                                    {getFieldDecorator('skillTagId', {
                                        rules: [{
                                            required: true, message: 'Vui lòng nhập tên kỹ năng',
                                        },],
                                    })(
                                        <Select
                                            showSearch
                                            style={{width: 200}}
                                            placeholder="Chọn kỹ năng"
                                            optionFilterProp="children"
                                            onChange={this.handleChangeName}
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {
                                                this.state.skillTags &&
                                                this.state.skillTags.rows.map((value, index) => {
                                                    return <Option key={value.id}>{value.name}</Option>
                                                })
                                            }
                                            <Option value="jack">Jack</Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem
                                    label='Giá trên giờ(Vnd)'
                                    style={{marginBottom: '24px'}}
                                    hasFeedback
                                >
                                    {getFieldDecorator('costPerHour', {
                                        rules: [
                                            {
                                                required: true, message: 'Vui lòng nhập giá trên giờ',
                                            }],
                                    })(
                                        <Input onChange={this.handleChangeCost} type={"number"}
                                               placeholder='Giá trên giờ'/>
                                    )}
                                </FormItem>

                                <FormItem
                                    label='Mô tả'
                                    style={{marginBottom: '24px'}}
                                    hasFeedback
                                >
                                    {getFieldDecorator('note', {
                                        initialValue: "",

                                    })(
                                        <TextArea onChange={this.handleChangeNote} row={3}
                                                  placeholder='Mô tả'/>
                                    )}
                                </FormItem>
                                <div className="save-button">
                                    <Button type="primary"
                                            onClick={this.handleSubmit}>Lưu</Button>
                                </div>
                            </Form>

                        </Col>
                    </Row>
                </Card>
            </div>

        )
    }
}

CreateSkill = Form.create({})(CreateSkill)
export default CreateSkill
