import React, { Component } from "react";
import { hashHistory, Link } from "react-router";
import "./portal.less";
import { message } from "antd";
import textBottom from "../../images/img/textBottom.png";
import hjg1 from "../../images/img/user.png";
import bottomleft from "../../images/img/bottomleft.png";
import bottomright from "../../images/img/bottomright.png";
import topleft from "../../images/img/topleft.png";
import topright from "../../images/img/topright.png";
import Cookies from "js-cookie";
import { tongzhiTongbao } from 'actions/common'
import { connect } from 'react-redux'
@connect(
  (state, props) => ({
    config: state.config,
  })
)
export default class portal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: [
        { sort: "指挥行动合成区" },
        { sort: "反恐维稳合成区" },
        { sort: "技术支撑合成区" },
        { sort: "公共服务合成区" },
        { sort: "综合保障合成区" },
        { sort: "案事件研判合成区" }
      ],
      policeTypeName: "",
      name: ""
    };
  }

  componentWillMount() {
    let zoneName = Cookies.get("zoneName");
    let newData = this.state.Data.filter(function(item, i) {
      return item.sort !== zoneName;
    });
    newData.push({ sort: zoneName });
    this.setState({
      Data: newData,
      policeTypeName: Cookies.get("policeTypeName"),
      name: Cookies.get("name")
    });
    this.props.dispatch(
      tongzhiTongbao({ pageIndex: 1, pageSize: 1 }, res => {
        // if (res.data.cmsList.length > 0) {
        //   this.setState({
        //     message: res.data.cmsList
        //   });
        // } else {
        //   this.setState({
        //     message: []
        //   });
        // }
      })
    );
  }

  loginPage = () => {
    // if(Cookies.get('authCode')&&(Cookies.get('authCode').indexOf('hczhRole') !== -1)){
    //     hashHistory.push('/master')
    // }else{
    hashHistory.push("/home");
    // }
  };
  clearCookie() {
    let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (let i = keys.length; i--; )
        document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
    }
  }

  closeWindow() {
    // message.success('该用户已注销，即将关闭页面',3);
    hashHistory.push('/offline');
    this.clearCookie();
    // hashHistory.push("/login");
    // window.open('/#/rightAside',"about:blank","_self").close();
    // window.location.href = '/#/rightAside';
    // setTimeout(()=>{
       
    // },3000)
  }

  render() {
    return (
      <div className="portal">
        <div className="portalTop">
          <div className="portalTopTittle">
            <span>太原市公安局大数据合成研判作战平台</span>
            <img src={textBottom} alt="" />
          </div>
          <div className="portalMiddle">
            <div className="portalMiddleMain">
              <div className="portalIcon1 shrink">
                <div className="portalText">{this.state.Data[0].sort}</div>
              </div>
              <div className="portalIcon2 shrink">
                <div className="portalText ">{this.state.Data[1].sort}</div>
              </div>
              <div className="portalIcon3 shrink">
                <div className="portalText">{this.state.Data[2].sort}</div>
              </div>
              <div className="portalIcon4 shrink">
                <div className="portalText">{this.state.Data[3].sort}</div>
              </div>
              <div className="portalIcon5 shrink">
                <div className="portalText">{this.state.Data[4].sort}</div>
              </div>
              <div className="portalIcon6">
                <div className="portalText">{this.state.Data[5].sort}</div>
              </div>
            </div>
          </div>
          <div className="portalRightBorder">
            <div className="portalRight">
              <div className="portalRightMain">
                <button
                  className="closeWindow"
                  onClick={this.closeWindow.bind(this)}
                >
                  注销
                </button>
                <div className="portalRightImg">
                  <img src={hjg1} alt="pic" />
                </div>
                <div className="portalRightText1">
                  <div className="portalRightT">
                    {this.state.policeTypeName}
                  </div>
                </div>
                <div className="portalRightText2">
                  <div className="portalRightT">{this.state.name}</div>
                </div>
                <div className="portalRightButton" onClick={this.loginPage}>
                  <button>进入页面</button>
                </div>
              </div>
            </div>
            <div className="portalRightIconTL">
              <img src={topleft} alt="" />
            </div>
            <div className="portalRightIconTR">
              <img src={topright} alt="" />
            </div>
            <div className="portalRightIconBL">
              <img src={bottomleft} alt="" />
            </div>
            <div className="portalRightIconBR">
              <img src={bottomright} alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
