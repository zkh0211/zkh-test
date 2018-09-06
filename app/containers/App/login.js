
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory, Link } from 'react-router'
import { Spin, message, Form, Icon, Input, Button, Row, Col } from 'antd'
import { fetchLogin, fetchToken } from 'actions/common'
import Cookies from 'js-cookie';
 
const FormItem = Form.Item

@connect(
  (state, props) => ({
    config: state.config,
    loginResponse: state.loginResponse,
  })
)
@Form.create({
  onFieldsChange(props, items) {
    // console.log(items)
    // props.cacheSearch(items);
  },
})

export default class Login extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props)
    this.state = {
      loading: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleChange = this.handleChange.bind(this)
    this.checkPass = this.checkPass.bind(this)
    this.checkName = this.checkName.bind(this)
    this.noop = this.noop.bind(this)
  }

  handleSubmit(e) {
    let _this = this;
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
          this.props.dispatch(fetchToken(values, (res) => {
              if (res.status === 200) {
                  Cookies.set('token', res.data, {expires: 1 / 24});//將返回的token保存到cookie里
                  _this.props.dispatch(fetchLogin({token:res.data}, (result) => {
                          Cookies.set('authCode', result.data['authCode'], {expires: 1 / 24});
                          Cookies.set('policeTypeName', result.data['policeTypeName'], {expires: 1 / 24});
                          Cookies.set('name', result.data['name'], {expires: 1 / 24});
                          Cookies.set('policeTypeId', result.data['policeTypeId'], {expires: 1 / 24});
                          Cookies.set('id', result.data['id'], {expires: 1 / 24});
                          Cookies.set('username', result.data['username'], {expires: 1 / 24});
                          Cookies.set('zoneId', result.data['zoneId'], {expires: 1 / 24});
                          Cookies.set('zoneName', result.data['zoneName'], {expires: 1 / 24});
                          Cookies.set('gxjgdm', result.data['gxjgdm'], {expires: 1 / 24});
                          hashHistory.push('/portal')
                      // }
                  }, (result) => {
                      // message.warning(result.msg)
                      this.setState({
                          loading: false,
                      })
                  }))
              }else{
                message.warning(res.msg)
              }
          }, (res) => {
              message.warning(res.msg)
              this.setState({
                  loading: false,
              })
          }))
      }
    })
  }


  checkName(rule, value, callback) {
   
    callback()
  }

  checkPass(rule, value, callback) {
    callback()
  }

  noop() {
    return false
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login">
        <div className="sy_top" />
        <div className="btmLogin">
          <div className="sy_bottom">
            <h1 id="PerformName">登录</h1>
            <Row className="ul-wrap">
              <Col span={24}>
                <Spin spinning={this.state.loading}>
                  <Form onSubmit={this.handleSubmit}>
                    <FormItem hasFeedback>
                      {getFieldDecorator('username', {
                        rules: [
                          { required: true, message: '请输入用户名' },
                          { validator: this.checkName }
                        ],
                      })(
                        <Input
                          prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                          placeholder="请输入用户名"
                          type="text"
                        />
                        )}
                    </FormItem>
                    <FormItem hasFeedback>
                      {getFieldDecorator('password', {
                        rules: [
                          { required: true, message: '请输入密码' }
                        ],
                      })(
                        <Input
                          prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                          placeholder="请输入密码"
                          type="password"
                        />
                        )}

                    </FormItem>
                    <FormItem>
                      <Button type="primary" htmlType="submit">登录</Button>
                      <Link to="/register">注册</Link>
                    </FormItem>
                  </Form>
                </Spin>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}
