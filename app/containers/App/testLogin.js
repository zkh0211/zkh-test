
import React, {Component} from 'react';
import './login/login.less';
import { message , Checkbox } from 'antd'
import { connect } from 'react-redux'
import { hashHistory, Link } from 'react-router'
import { fetchLogin, fetchToken } from 'actions/common'
import Cookies from 'js-cookie';
import DlyPng from '../../images/login/loginBackground.png'

// import {Checkbox} from 'antd'
// import Particles from 'react-particles-js';
import 'buffer';
// import Key from '../../../images/login/keyback.png'


@connect(
    (state, props) => ({
      config: state.config,
    })
  )
export default class TestLogin extends Component {

    constructor(...args) {
        super(...args);
        this.state = {
            inputUserName: '',
            inputUserPassword: '',
            userNameChecked: false,
            userPasswordChecked: false,
            userMessageError: 'none',

        } 
    }

    login() {
        // window.location.href= global.$GLOBALCONFIG.$keyIsRight;
       
        let username = this.refs.userName.value;
        let password = this.refs.userPassword.value;
       
        let values = {"username": username, "password": password};//指挥中心 发起人
       

        if (username !== '' && password !== '') {
            this.props.dispatch(fetchToken(values, (res) => {
                if (res.status === 200) {
                    Cookies.set('token', res.data, {expires: 1 / 24});//將返回的token保存到cookie里
                    this.props.dispatch(fetchLogin({token:res.data}, (result) => {
                            Cookies.set('deptName', result.data['deptName'], {expires: 1 / 24});
                            Cookies.set('deptLevel', result.data['deptLevel'], {expires: 1 / 24});
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
                    }, (result) => {
                        message.warning('用户名或密码错误',3)
                        // this.setState({
                        //     loading: false,
                        // })
                    }))
                }else{
                  message.warning('用户名或密码错误',3)
                }
            }, (res) => {
                message.warning('用户名或密码错误',3)
                
                // this.setState({
                //     loading: false,
                // })
            }))
           
        } else {
            message.error('账号或者密码错误',3)
            // this.setState({
            //     userMessageError: 'block'
            // })
        }



    }

    loginByKey(e) {
        if (e.keyCode === 13) {
            this.login();
        }
    }
    changeUsername(e){
        this.setState({
            inputUserName:e.target.value
        })
    }
    changePassword(e){
        this.setState({
            inputUserPassword:e.target.value
        })
    }

    userNameChange(event) {
        this.setState({
            inputUserName: event.target.value,
            userMessageError: 'none'
        })
    }
    passwordChange(event) {
        this.setState({
            inputUserPassword: event.target.value
        })
    }

    rememberUserName() {
        this.setState({
            userNameChecked: this.state.userNameChecked === true ? false : true
        }, () => {
            if (this.state.userNameChecked) {
                let inputUserName = this.refs.userName.value;
                Cookies.set('inputUserName', inputUserName, {expires: 1 / 24})
            } else {
                Cookies.remove('inputUserName');
            }
        });
    }

    rememberUserPassword() {
        this.setState({
            userPasswordChecked: this.state.userPasswordChecked === false ? true : false
        }, () => {
            if (this.state.userPasswordChecked) {
                let inputUserPassword = this.refs.userPassword.value;
                let passwordInput =  new Buffer(inputUserPassword).toString('base64');
                Cookies.set('pa', passwordInput, {expires: 1 / 24});
            } else {
                Cookies.remove('inputUserPassword');
            }
        })
    }
    // getUrlParam(name) {
    //     let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //     let r = window.location.search.substr(1).match(reg);
    //     if (r != null) return unescape(r[2]); return null;
    // }

    componentWillMount() {
        if (Cookies.get('inputUserName')) {
            this.setState({
                inputUserName: Cookies.get('inputUserName'),
                userNameChecked: true
            })
        }
        if (Cookies.get('pa')) {
            let pa = Cookies.get('pa');
            let b = new Buffer(pa, 'base64');
            let passwords = b.toString();
            this.setState({
                inputUserPassword: passwords,
                userPasswordChecked: true
            })
        }
    }

    render() {
        return <div className="login-con">
            <div className="dly">
                <div className="img">
                    <img src={DlyPng} alt="pic"/>
                </div>
              {/*  <div className="particles-js">
                    <Particles params={{
                        "particles": {
                            "number": {
                                "value": 16,
                                "density": {
                                    "enable": true,
                                    "value_area": 500
                                }
                            },
                            "color": {
                                "value": "#ffffff"
                            },
                            "shape": {
                                "type": "circle",
                                "stroke": {
                                    "width": 0,
                                    "color": "#000000"
                                },
                                "polygon": {
                                    "nb_sides": 5
                                },
                                "image": {
                                    "src": "img/github.svg",
                                    "width": 100,
                                    "height": 100
                                }
                            },
                            "opacity": {
                                "value": 0.2,
                                "random": false,
                                "anim": {
                                    "enable": false,
                                    "speed": 1,
                                    "opacity_min": 0.1,
                                    "sync": false
                                }
                            },
                            "size": {
                                "value": 5,
                                "random": true,
                                "anim": {
                                    "enable": false,
                                    "speed": 40,
                                    "size_min": 0.1,
                                    "sync": false
                                }
                            },
                            "line_linked": {
                                "enable": true,
                                "distance": 150,
                                "color": "#ffffff",
                                "opacity": 0.4,
                                "width": 1
                            },
                            "move": {
                                "enable": true,
                                "speed": 3,
                                "direction": "none",
                                "random": false,
                                "straight": false,
                                "out_mode": "out",
                                "attract": {
                                    "enable": false,
                                    "rotateX": 600,
                                    "rotateY": 1200
                                }
                            }
                        },
                        "interactivity": {
                            "detect_on": "canvas",
                            "events": {
                                "onhover": {
                                    "enable": false,
                                    "mode": "repulse"
                                },
                                "onclick": {
                                    "enable": true,
                                    "mode": "push"
                                },
                                "resize": true
                            },
                            "modes": {
                                "grab": {
                                    "distance": 400,
                                    "line_linked": {
                                        "opacity": 1
                                    }
                                },
                                "bubble": {
                                    "distance": 400,
                                    "size": 40,
                                    "duration": 2,
                                    "opacity": 8,
                                    "speed": 3
                                },
                                "repulse": {
                                    "distance": 200
                                },
                                "push": {
                                    "particles_nb": 4
                                },
                                "remove": {
                                    "particles_nb": 2
                                }
                            }
                        },
                        "retina_detect": true
                        /*       "config_demo": {
                         "hide_card": false,
                         "background_color": "#b61924",
                         "background_image": "",
                         "background_position": "50% 50%",
                         "background_repeat": "no-repeat",
                         "background_size": "cover"
                         }
                    } }/>
                </div>*/}
                <div className="mywindow">
                    <div className="dlq">
                        <div className="dlck">
                            <p><span></span>太原市公安局大数据合成研判作战平台</p>
                        </div>
                        <div className="dlck2">
                            <span className="yhdl">用户登录</span>
                            <div className="bigCircuit" id="bigCircuit"></div>
                            <div className="dlxx">
                                 {/*<img src={Key} alt="pic" width="100%" height="100%"/>*/}
                               <input type="text" className="itxt" name="username" tabIndex="1"
                                       ref="userName"  onChange={this.changeUsername.bind(this)}
                                       autoComplete="off" placeholder="请输入用户名" value={this.state.inputUserName}
                                        />
                                <input type="password"  ref="userPassword" name="password" className="itxt"
                                      onChange={this.changePassword.bind(this)}
                                       tabIndex="2" autoComplete="off" placeholder="请输入密码" value={this.state.inputUserPassword}
                                        onKeyDown={this.loginByKey.bind(this)}/>

                                <div className="warns">
                                    <div className="warns-checkbox">
                                        <Checkbox checked={this.state.userNameChecked}
                                                  onChange={this.rememberUserName.bind(this)}>记住用户名</Checkbox>
                                        <Checkbox checked={this.state.userPasswordChecked}
                                                  onChange={this.rememberUserPassword.bind(this)}>记住密码</Checkbox>
                                    </div>
                                    <div style={{display: this.state.userMessageError}} className="warns-tip"><p>
                                        您输入的账户名或者密码错误！</p></div>
                                </div>
                                 {/*<input type="text" id="j_captcha_response" name="j_captcha_response"
                                 style={{visibility: 'show'}} className="itxt itxt-error" tabIndex="3"
                                 autoComplete="off" placeholder="验证码"/>*/}
                                <div className="clear"></div>
                               {/* <div className="warns">
                                    <div style={{display: this.state.userMessageError}} className="warns-tip"><p>
                                        警员key证书有问题，请重新更换警员key！</p></div>
                                </div>*/}
                            </div>
                            <div className="dlancon" onClick={this.login.bind(this)}>
                                <button className="denglu" id="submit" style={{"border": "none"}}>登录</button>
                                <div className="clear"></div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*</div>*/}
            </div>
            {/*</div>*/}
        </div>
    }
}