/**
 * Created by GTR on 2017/11/21.
 */

import React, {Component} from 'react';
import { hashHistory } from 'react-router'
// import './login.css';
import {connect} from 'react-redux'
import 'jquery';
// import Request from '../../api/request';
// import GlobalData from '../../util/globalData';
import Cookies from 'js-cookie';
// import 'buffer';
// import fetch from '../common/fetch'
import './freeLogin.css'
import {message} from 'antd'
import {
    keyLogin,
    fetchLogin,
     fetchToken
}from 'actions/common'

@connect(
    (state, props) => ({ 
        config: state.config,
      
     })
  )
export default class FreeLogin extends Component {

    componentWillMount(){
        let reg = new RegExp("(^|&)key=([^&]*)(&|$)");
        // let r = window.location.search.substr(1).match(reg);
        let r = window.location.hash.split("?")[1].match(reg)
        // console.log(window.location.hash.split("?")[1])
        if(r != null){
            let urlValue = unescape(r[2]);
            if (urlValue === 'xinxiqiang') {
                let values = {"username": 'sjzhz', "password": '123456'};
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
                // Request.post({
                //     url: GlobalData.login,
                //     data: data
                // }).then((res) => {
                //     if (res.status === 200) {
                //         if (res.data) {
                //             Cookies.set('token', res.data, {expires: 1 / 24}); //將返回的token保存到cookie里
                //             this.props.history.push({pathname: '/index'})//登录成功后跳转到首页
                //         }
                //     } else {
                //         // message.error('账号或者密码错误',3)
                //         this.setState({
                //             userMessageError: 'block'
                //         })
                //     }
                // })
            } else {
                //警员key登录
                this.props.dispatch(keyLogin({"key":urlValue},(res)=>{
                    if (res.status === 200) {
                        if (res.data) {
                            Cookies.set('token', res.data, {expires: 1 / 24}); //將返回的token保存到cookie里
                            hashHistory.push('/portal');
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
                            }))
                        }
                    } else {
                         message.error('证书认证失败',3);
                         hashHistory.push('/login');
                       /* this.setState({
                            userMessageError: 'block'
                        })*/
                    }
                }))
                // fetch({
                //     url: GlobalData.keyLogin,
                //     method:'POST',
                //     data: {"key":urlValue}
                // }).then((res) => {
                //     if (res.status === 200) {
                //         if (res.data) {
                //             Cookies.set('token', res.data, {expires: 1 / 24}); //將返回的token保存到cookie里
                //             this.props.history.push({pathname: '/index'})//登录成功后跳转到首页
                //         }
                //     } else {
                //          message.error('证书认证失败',3);
                //         this.props.history.push('/login');
                //        /* this.setState({
                //             userMessageError: 'block'
                //         })*/
                //     }
                // })
            }
        }

    }
    render(){
        return <div style={{backgroundColor:"#031e3b",padding:"0", margin:"0", width:"100%", height:"100%",position:"fixed",top:"0", left:"0", color:"white"}}>

            <div className="lds-css ng-scope">
                <div className="lds-spin">
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    }
}