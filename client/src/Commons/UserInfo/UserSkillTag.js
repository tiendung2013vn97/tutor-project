import React from 'react';
import {Form, Input, Icon, Button, Modal, Card, Row, Col, Select, message} from 'antd'
import {getSkillTags} from "../../SkillTag/api-skilltag";
import {getSkillByTeacherId} from "../../Skill/api-skill";
import Axios from "../../Api";

const FormItem = Form.Item;
const {Option} = Select;
const {TextArea} = Input;

class UserSkillTag extends React.Component {
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
        this.getSkills(this.props.userDetail.username);
    }

    getSkills(id) {
        return getSkillByTeacherId(id)
            .then(res => {
                console.log(res.data)
                if (res && res.data.status !=="fail") {
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
                Axios.post("study-request/"+values.id).then(res => {
                    if (res && res.data.status !== "fail") {
                        message.success("Gửi yêu cầu thành công")
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
                <Card className="box-register" hoverable>
                    <Row>
                        <Col span={12} offset={6}>

                            <Form>
                                <FormItem
                                    label="Tên Kỹ Năng"
                                    style={{marginBottom: '24px'}}
                                    hasFeedback
                                >
                                    {getFieldDecorator('id', {
                                        rules: [{
                                            required: true, message: 'Vui lòng chọn kỹ năng',
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
                                                    return <Option key={value.id}>{value.skill_tag.name}| {value.costPerHour} Vnd</Option>
                                                })
                                            }
                                        </Select>
                                    )}
                                </FormItem>
                                <div className="save-button">
                                    <Button type="primary"
                                            onClick={this.handleSubmit}>Gửi</Button>
                                </div>
                            </Form>

                        </Col>
                    </Row>
                </Card>
            </div>

        )
    }
}

UserSkillTag = Form.create({})(UserSkillTag)
export default UserSkillTag
