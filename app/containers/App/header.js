import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'
import {  Button, Modal, message , notification } from 'antd'
import Logo from '../../images/common/u1963.png'
import User from '../../images/common/u1974.svg'
import Close from '../../images/common/u1973.png'
import Cookies from 'js-cookie'
import mpush from '../../utils/webSocKet'
import { Select } from 'antd';
// import { wsUrl,systemId } from  '../../actions/otherUrl'

import {
  getMenu,
  getMiji
}from 'actions/common'
import {
  getCaseType,
  changeCaseTypeTab,
  getSelectCountByStatus,
  isFeedBackZhiling,
  getDirectionSearch
} from 'actions/masterAction'

// const openNotification = () => {
//   notification.open({
//     message: '您有一条新的合成结果待办！',
//     //description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
//   });
// };
notification.config({
  placement: 'topRight',
  top: 53,
  duration: 5,
});

const Option = Select.Option;

const confirm = Modal.confirm

@connect(
  (state, props) => ({
    config: state.config,
    appointTab: state.tabAppointedTypeResponse
   })
)
export default class Header extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props)
    this.state = {
      deptLevel: Cookies.get('deptLevel'),
      policeTypeName:'',
      zoneName:'',
      menu:[
          {firstLine:{name:'合成作战',link:''} , secondLine:[{name:'档案管理',link:''}]}
      ],
      goDownNum:'',
      loading: false,
      menuId:'1',
      isMaster:'1'
    }
    this.handleLogout = this.handleLogout.bind(this)
  }

openNotification = (id,state,ticker) => {

  if(Cookies.get('authCode').indexOf('hczhRole')!==-1){

  }else if(Cookies.get('authCode').indexOf('hcRole')!==-1){
    notification.open({
      // message: mes?mes:'您有一条新的合成结果待办！',
      message: <div className="message-pop"><a href={`/#/analysisForPolice/${id}/2`}>{ticker}!</a></div>,
      //description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  }else if(parseInt(Cookies.get('zoneId')) < 0){
    notification.open({
      // message: mes?mes:'您有一条新的合成结果待办！',
      message: <div className="message-pop"><a href={`/#/analysisForPolice/${id}/2`}>{ticker}!</a></div>,
      //description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  }

};
componentDidMount(){
  this.props.dispatch(getDirectionSearch())
}
  // 登出
  handleLogout() {
    const { config } = this.props
    const self = this
    confirm({
      title: '提示',
      content: '确认退出登录吗？',
       okText:"确认",
      cancelText:"取消",
      onOk() {
        hashHistory.push('/login');
        mpush.close();
        self.clearCookie();
      },
    })



  }
  clearCookie() {
    let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (let i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
}


  clickMenu(e){
    let num = e.currentTarget.getAttribute('data-num');
    if(num === this.state.goDownNum){
      this.setState({
        goDownNum:'',
        menuId:"0"
      })
    }else{
      this.setState({
        goDownNum:num,
        menuId:"0"
      })
    }
  }

  shouldComponentUpdate(nextProps,nextState){
    let { appointTab } = this.props;
    // console.log('33333333333333333333')
    // console.log(appointTab)
    return true
  }

  componentWillMount(){
    let _this = this;
    // getMenu
    // this.openNotification();
    if(Cookies.get('authCode')&&Cookies.get('authCode').indexOf('hczhRole')!==-1){
      this.setState({
        isMaster:'1'
      })
    }else{
      this.setState({
        isMaster:'0'
      })
    }
    this.props.dispatch(getMenu({"parentId":33},(res)=>{
      this.setState({
        menu: res.data,
      },()=>{
        // console.log(this.state.menu)
      })
    }))
    this.setState({
      zoneName:Cookies.get('deptName'),
      policeTypeName:Cookies.get('policeTypeName')
    })

    this.props.dispatch(getMiji({},(res)=>{

    }))

    // if(Cookies.get('authCode').indexOf('hczhRole')!==-1){
    //   this.setState({
    //      role:'指挥长合成行动区',
    //      policeTypeName:Cookies.get('policeTypeName')
    //   })
    // }else  if(Cookies.get('authCode').indexOf('hcRole')!==-1){
    //   if(Cookies.get('zoneId')!==0){
    //       this.setState({
    //         role:'坐席合成行动区',
    //         policeTypeName:Cookies.get('policeTypeName')
    //       })
    //   }else{
    //     this.setState({
    //       role:'警种合成行动区',
    //       policeTypeName:Cookies.get('policeTypeName')
    //     })
    //   }
    // }
    // mpush.close();

    mpush.connect({
      url: global.$GLOBALCONFIG.$websocket,
      userId: `${global.$GLOBALCONFIG.$systemId}-${Cookies.get('username')}`,
      tags: '',
      deviceId: "system-001",
      osName: "web",
      osVersion: navigator.userAgent,
      clientVersion: "1.0",
      callbackResult:  function(result) {
        let status = 0;
        let { appointTab } = _this.props;
        let authCode = Cookies.get('authCode')

          let data = JSON.parse(result);
          // console.log(data);
          let mes = JSON.parse(data.content);
          // console.log(mes);
          let content = JSON.parse(mes.content);
          // console.log(content);

          if(mes.fromUser !== Cookies.get('username')){

            if (content.pushType === 1) {
              _this.openNotification(content.id,content.state,mes.ticker);
            } else if (content.pushType === 2) {

            }else if(content.pushType === 7){
              _this.props.dispatch(isFeedBackZhiling('getFeedBackFromPcs'))
            }
          }
          if(appointTab.appointeType){
            if(appointTab.appointeType.tab === '2'){
              if(authCode.indexOf('hczhRole')!== -1){
                status = '1';
              }else{
                status = '2';
              }
              _this.getCaseTypes(status,content.typeId);
              _this.props.dispatch(getSelectCountByStatus({isMaster:_this.state.isMaster},(res)=>{}))

            }else if(appointTab.appointeType.tab === '3'){
              status = '2';
              _this.getCaseTypes(status,content.typeId);
              _this.props.dispatch(getSelectCountByStatus({isMaster:_this.state.isMaster},(res)=>{}))
            }else{
              // status = '2'
            }
          }

          console.log('========接收反馈完毕======');

      },

      // offLine: function () {
      //     message.error('您已在其他设备上登录，请重新登录！', 2);
      //     // window.alert("已在别处登录");
      //     _this.clearCookie();
      //     sessionStorage.removeItem("buttons");
      //     window.setTimeout(() => {
      //         window.location.href = '/login'
      //     }, 2000)

      // }
  });

  }

  getCaseTypes(status,typeId){
    if(Cookies.get('authCode').indexOf('hczhRole')!==-1){
      this.props.dispatch(getCaseType({status:status,isMaster:'1',isApprove:'1',typeId:typeId},(res)=>{

      }))
    }else{
      this.props.dispatch(getCaseType({status:status,taskStatus:'0',isMaster:'0',isApprove:'',typeId:typeId},(res)=>{

      }))
    }
    this.props.dispatch(changeCaseTypeTab({caseTypeId:typeId}))
  }

  closeMenu(){

    this.setState({
      goDownNum:'',
      menuId:'1'
    })
    // if(Cookies.get('authCode')&&Cookies.get('authCode').indexOf('hczhRole')!==-1){
    //   hashHistory.push('/master')
    // }else{
      hashHistory.push('/home')

    // }


  }

  clickChildMenu(e){
    e.stopPropagation();
      let parentId = e.currentTarget.getAttribute('data-parentid');
      let href = e.currentTarget.getAttribute('data-href');
      this.setState({
        menuId : parentId,
        goDownNum:''
      },()=>{
        if(href.indexOf('http://') !== -1 || href.indexOf('https://') !== -1){
          window.open(href,"_self")
        }else{
          hashHistory.push(href);
        }

      })

  }
  changeOnMenu(e){
    let href = e.currentTarget.getAttribute('data-href');
    if(href !== ''){
      if(href.indexOf('http://') !== -1 || href.indexOf('https://') !== -1){
        window.open(href,"_self")
      }else{
        hashHistory.push(href);
      }
    }
  }

  render() {
    const username = Cookies.get('name');
    return (
      <div className="header-contain">
        <header id="navbar">
          <div id="navbar-container" className="boxed">
            <div className="navbar-header">
              <Link to={'/'} className="navbar-brand">
                <div className="brand-title">
                  <img src={Logo} alt="pic"/>
                  <span className="brand-area"> 太原市公安局</span>
                  <span className="brand-text">大数据合成研判作战中心</span>
                </div>
              </Link>
            </div>
            <div className="navbar-content clearfix">
              <div className="navbar-user userHover" onClick={this.handleLogout}>
                <img src={Close} alt="pic" style={{width:'1.2rem'}}/>
                <span>退出</span>
              </div>
              <div className="navbar-user">
                <img src={User} alt="pic"/>
                <span>欢迎您：{username}</span>
              </div>
              <div className="clearBoth"></div>
            </div>
            <div className="clearBoth"></div>
          </div>
        </header>

        <div className="menu-contain">
          <div className="breadLeader">
              <p>{this.state.zoneName} > <span>{this.state.policeTypeName}</span></p>
          </div>
          <div className="menu-content">
            <div className={this.state.menuId === '1'?'menu-item-back menu-item':'menu-item'} onClick={this.closeMenu.bind(this)}><p>首页</p> </div>
              {
                this.state.menu.length>0?(this.state.menu.map((item,index)=>{
                   return  <div key={index+'first'} onClick={this.clickMenu.bind(this)} data-num={index}  className={this.state.goDownNum === index.toString()|| parseInt(this.state.menuId) === item.id?'menu-item-back menu-item':'menu-item'}>
                                {/*<Link to={item.href?item.href:''}><p data-href={item.href?item.href:''} onClick={this.changeOnMenu.bind(this)}>{item.title}</p></Link>*/}
                                <p data-href={item.href?item.href:''} onClick={this.changeOnMenu.bind(this)}>{item.title}</p>
                                <div className={this.state.goDownNum === index.toString()?'showUl godown':'hideUl godown'}>
                                    {item.children?(item.children.map((elem,i)=>{
                                      if(this.state.deptLevel === '4'){
                                        if(elem.href !== '/directionList'){
                                          return <div key={i} onClick={this.clickChildMenu.bind(this)} data-parentid={elem.parentId} data-href={elem.href}><p>{elem.title}</p></div>
                                        }else{

                                        }
                                      }else{
                                        return <div key={i} onClick={this.clickChildMenu.bind(this)} data-parentid={elem.parentId} data-href={elem.href}><p>{elem.title}</p></div>
                                      }
                                    })):<div></div>  }
                                </div>
                                </div>
                }))
              :<div></div>
              }
          </div>
        </div>

        <div className="pop">

        </div>
  </div>
    )
  }
}
