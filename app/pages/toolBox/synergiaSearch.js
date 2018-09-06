import React, { Component } from "react";
import { connect } from "react-redux";
import "./synergiaSearch.less";
import { Form,Input,Button,DatePicker,Col } from "antd";
import moment from 'moment';
const FormItem = Form.Item
const TextArea =Input.TextArea
const dateFormat = 'YYYY年MM月DD日';
@Form.create({})
@connect((state, props) => ({ config: state.config }))
export default class synergiaSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            // console.log('Received values of form: ', values);
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }
    validateToPhoneNumber= (rule, value, callback) => {
        const form = this.props.form;
        if (/^\d+$/.test(value)) {
            callback()
        } else {
            callback('电话号码是数字')
        }
    }
    render(){
        const {getFieldDecorator}=this.props.form;
        let day=moment().format('D');
        let year=moment().format('Y');
        let mouth=moment().format('M');
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 16},
    }
        return(
            <div className='synergiaSearch'>
                <Form className='synergiaSearchForm' onSubmit={this.handleSubmit}>
                    <div className='fujian'><span>附件:</span><span></span></div>
                    <h2 className='tableTitle'>太原市公安局合成情报信息协查函</h2>
                    <table border='1' className='synergiaSearchTable'>
                        {/*<caption><h3>太原市公安局合成情报信息协查函</h3></caption>*/}
                        <tbody>
                            <tr className='headerThree searchUnit'><td colSpan='4' align='center'>并公（情报）查 <span>{this.props.name}</span>[2018]<span></span>号</td></tr>
                            <tr className='headerThree'>
                                <td colSpan='4'bgcolor='#fafafa'></td>
                            </tr>
                            <tr className='headerThree'>
                                <td>
                                    填表单位:
                                </td>
                                <td colSpan='3' className='textRight'>
                                    <Col span={18}>
                                        <FormItem>
                                            {getFieldDecorator('tabulationUnit', {
                                                // rules: [{ required: true, message: 'Please input your username!' }],
                                            })(
                                                <Input/>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col span={6} style={{textAlign:'center',lineHeight:'2rem'}}>
                                        {year}年{mouth}月{day}日
                                    </Col>
                                </td>
                            </tr>
                            <tr>
                                <td className="biaotou">案件名称</td>
                                <td width='20%'>
                                    <FormItem>
                                        {getFieldDecorator('caseName', {
                                            // rules: [{ required: true, message: 'Please input your username!' }],
                                        })(
                                            <Input size='large'/>
                                        )}
                                    </FormItem>
                                </td>
                                <td className="biaotou">案件编号</td>
                                <td>
                                    <FormItem>
                                        {getFieldDecorator('caseNumber', {
                                            // rules: [{ required: true, message: 'Please input your username!' }],
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </td>
                            </tr>
                            <tr>
                                <td className="biaotou" rowSpan='3'>查询内容和查询需求</td>
                                <td colSpan='3' rowSpan='3'>
                                    <FormItem>
                                        {getFieldDecorator('searchConentRequire', {
                                            // rules: [{ required: true, message: 'Please input your username!' }],
                                        })(
                                            <TextArea rows={7}/>
                                        )}
                                    </FormItem>
                                </td>
                            </tr>
                            <tr></tr>
                            <tr></tr>
                            <tr>
                                <td className="biaotou">查询单位民警</td>
                                <td>
                                    <FormItem
                                        label='姓名'
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('cxdwmjName', {
                                            // rules: [{ required: true, message: 'Please input your username!' }],
                                        })(
                                            <Input size='large'/>
                                        )}
                                    </FormItem>
                                </td>
                                <td>
                                    <FormItem
                                        label='警号'
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('cxdwmjPoliceNumber', {
                                            // rules: [{ required: true, message: 'Please input your username!' }],
                                        })(
                                            <Input size='large'/>
                                        )}
                                    </FormItem>
                                </td>
                                <td>
                                    <FormItem
                                        label='联系电话'
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('cxdwmjPhoneNumber', {
                                            rules: [{ validator: this.validateToPhoneNumber,}],
                                            // rules: [{ required: true, message: 'Please input your username!' }],
                                        })(
                                            <Input size='large'/>
                                        )}
                                    </FormItem>
                                </td>
                            </tr>
                            <tr>
                                <td className="biaotou">分局民警</td>
                                <td>
                                    <FormItem
                                        label='姓名'
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('fjmjName', {
                                            // rules: [{ required: true, message: 'Please input your username!' }],
                                        })(
                                            <Input size='large'/>
                                        )}
                                    </FormItem>
                                </td>
                                <td>
                                    <FormItem
                                        label='警号'
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('fjmjPoliceNumber', {
                                            // rules: [{ required: true, message: 'Please input your username!' }],
                                        })(
                                            <Input size='large'/>
                                        )}
                                    </FormItem>
                                </td>
                                <td>
                                    <FormItem
                                        label='联系电话'
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('fjmjPhoneNumber', {
                                            rules: [{ validator: this.validateToPhoneNumber,}],
                                            // rules: [{ required: true, message: 'Please input your username!' }],
                                        })(
                                            <Input size='large'/>
                                        )}
                                    </FormItem>
                                </td>
                            </tr>
                            <tr>
                                <td className="biaotou">市局民警</td>
                                <td>
                                    <FormItem
                                        label='姓名'
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('sjmjName', {
                                            // rules: [{ required: true, message: 'Please input your username!' }],
                                        })(
                                            <Input size='large'/>
                                        )}
                                    </FormItem>
                                </td>
                                <td>
                                    <FormItem
                                        label='警号'
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('sjmjPoliceNumber', {
                                            // rules: [{ required: true, message: 'Please input your username!' }],
                                        })(
                                            <Input size='large'/>
                                        )}
                                    </FormItem>
                                </td>
                                <td>
                                    <FormItem
                                        label='联系电话'
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('sjmjPhoneNumber', {
                                            rules: [{ validator: this.validateToPhoneNumber,}],
                                        })(
                                            <Input size='large'/>
                                        )}
                                    </FormItem>
                                </td>
                            </tr>
                            <tr>
                                <td  rowSpan='3' className="biaotou">查询单位分管领导审批</td>
                                <td colSpan='3' className='textRight' valign='bottom' rowSpan='2' style={{fontSize:'1.55rem'}}>
                                    <FormItem>
                                        {getFieldDecorator('cxdwfgldApproval', {
                                            // rules: [{ required: true, message: 'Please input your username!' }],
                                        })(
                                            <TextArea rows={4}/>
                                        )}
                                    </FormItem>
                                    （签字并盖章）
                                </td>
                            </tr>
                            <tr></tr>
                            <tr className='headerThree'>
                                <td colSpan='3' className='textRight'>
                                    <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
                                </td>
                            </tr>
                            <tr>
                                <td rowSpan='3' className="biaotou">市局领导审批</td>
                                <td colSpan='3' className='textRight' style={{fontSize:'1.55rem'}}valign='bottom' rowSpan='2'>
                                    <FormItem>
                                        {getFieldDecorator('sjldApproval', {
                                            // rules: [{ required: true, message: 'Please input your username!' }],
                                        })(
                                            <TextArea rows={5}/>
                                        )}
                                    </FormItem>
                                    （签字并盖章）
                                </td>
                            </tr>
                            <tr></tr>
                            <tr className='headerThree'>
                                <td colSpan='3' className='textRight'>
                                    <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
                                </td>
                            </tr>
                            <tr>
                                <td className ="biaotou" rowSpan='2'>反馈情况</td>
                                <td colSpan='3' rowSpan='2'>
                                    <FormItem>
                                        {getFieldDecorator('feedbackContent', {
                                            // rules: [{ required: true, message: 'Please input your username!' }],
                                        })(
                                            <TextArea rows={5}/>
                                        )}
                                    </FormItem>
                                </td>
                            </tr>
                            <tr></tr>
                            <tr bgColor='#fafafa'>
                                <td className="biaotou">备注</td>
                                <td colSpan='3'>
                                    1.本表按要求填写完整作为查询申请依据；<br/>
                                    2.分局情报民警由联络人填写； <br/>
                                    3.“编号”、市局情报民警由市局情报信息中心填写。
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <Col className='formBtn'>
                            <button htmltype="submit" className='button'>提交</button>
                            <button onClick={this.handleReset} className='button'>清空</button>
                        </Col>
                        <div className='clearBoth'></div>
                    </div>
                </Form>
            </div>
        )
    }
}
