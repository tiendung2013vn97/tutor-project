import React from 'react';
import {Form, Input, Icon, Button, Modal, Card, Row, Col, Select, message} from 'antd'
import {getSkillTags} from "../SkillTag/api-skilltag";
import {updateSkillTag} from "../SkillTag/action-skillTag";
import {addSkill, editSkill, getSkill} from "./api-skill";

const FormItem = Form.Item;
const {Option} = Select;
const {TextArea} = Input;

class EditSkill extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            skillTags: null,
            skill: {
                id: null,
                skill_tag:{
                    name: null
                },
                costPerHour: null,
                note: null
            },
            name: null,
            cost: null,
            note: null
        };
    }

    componentDidMount() {
        const skill = JSON.parse(localStorage.getItem("skill"));
        if (skill) {
            this.setState({
                skill: skill,
                cost: skill.costPerHour,
                note: skill.note
            })
        }
        this.getSkills();
        this.props.form.setFieldsValue({
            costPerHour: skill.costPerHour,
            note: skill.note,
        });
    }

    getSkill(id) {
        return getSkill(id)
            .then(res => {
                if (res && res.status === 200) {
                    this.setState({
                        skillTags: res.data
                    })
                }
            })
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
                editSkill(this.state.skill.id, values).then(res => {
                    if (res && res.status === 200) {
                        message.success("Chỉnh sửa kỹ năng thành công")
                    }
                }).catch(e => {
                    message.error("Lỗi")
                })
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form
        console.log(this.state.note)
        return (
            <div className="box-register-container">
                <h1>Chỉnh sửa Kỹ Năng</h1>
                <Card className="box-register" hoverable>
                    <Row>
                        <Col span={12} offset={6}>

                            <Form>
                                <h2>Kỹ Năng: {this.state.skill.skill_tag.name || ""}</h2>
                                <FormItem
                                    label='Giá trên giờ(Vnd)'
                                    style={{marginBottom: '24px'}}
                                    hasFeedback
                                >
                                    {getFieldDecorator('costPerHour', {
                                        rules: [{
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

EditSkill = Form.create({})(EditSkill)
export default EditSkill
