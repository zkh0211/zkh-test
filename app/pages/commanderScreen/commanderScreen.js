import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, hashHistory } from "react-router";
import { Tabs,  Pagination } from "antd";
import "jquery";
import $ from "jquery";
import "./commanderScreen.less";
import "echarts";
import Cookies from "js-cookie";
import Guanxi from "../../images/common/guanxi.png";
import Shumo from "../../images/common/shumo.png";
import Renyuan from "../../images/common/renyuan.png";
import AnjianChuanbing from "../../images/common/anjianchuanbing.png";
import Tuxiang from "../../images/common/tuxiang.png";
import Icon1 from "../../images/common/icon1.png";
import Icon2 from "../../images/common/icon2.png";
import Icon3 from "../../images/common/icon3.png";
import Icon4 from "../../images/common/icon4.png";
import Icon5 from "../../images/common/icon5.png";
import Icon6 from "../../images/common/icon6.png";
import Icon7 from "../../images/common/icon7.png";
import Icon8 from "../../images/common/icon8.png";
import Dangan from "../../images/common/dangan.png";
import blueArrow from "../../images/common/blueArrow.png";
import Logo from '../../images/common/u1963.png'
import xitonglianjie from "../../images/common/xitonglianjie.png";
import RenyuanZhanbi from "./components/homePie";
import YuJing from "./components/homeFullPie";
import YuJingDetail from "./components/homePieSingle";

import { tongzhiTongbao } from "../../actions/common";
import {
  willAppointed,
  getSelectCountByStatus,
  selectCountByType,
  selectEmergencyByTime,
  selectStatusCountByType,
  selectCurrentFkyj
} from "actions/screen";


const TabPane = Tabs.TabPane;

@connect((state, props) => ({
  config: state.config
}))
export default class CommanderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoColumns: [
        { title: "序号", dataIndex: "ROW_ID", key: "ROW_ID" },
        { title: "名称", dataIndex: "CASE_NAME", key: "CASE_NAME" },
        { title: "发起时间", dataIndex: "SUBMIT_DATE", key: "SUBMIT_DATE" }
      ],
      todoData1: [],
      message: [],
      tools: [
        { image: Guanxi, name: "关系图谱", links: "" },
        { image: Shumo, name: "数模空间", links: "" },
        {
          image: Renyuan,
          name: "档案模型",
          links: "http://10.95.94.67/pcsII/pcspublic/Zhcx?corename=peopleidx"
        },
        {
          image: AnjianChuanbing,
          name: "案件串并",
          links:
            "http://10.95.94.162:9029/criminalCaseAnalysis/views/homepage.jsp?username=tyga"
        },
        { image: Tuxiang, name: "图像增强", links: "" },
        {
          image: Dangan,
          name: "案件模型",
          links: "http://10.95.94.67/pcsII/pcspublic/Zhcx?corename=caseidx"
        }
      ],
      systemLink: [
        {
          name: "情报信息应用平台登录",
          link: "http://10.95.95.120:8080/DQB/loginJwy.do"
        },
        {
          name: "治安防控实战应用系统",
          link: "http://10.95.95.72:9088/tyrdm/pkiLogin2.action"
        },
        { name: "网安实战应用系统", link: "http://" },
        {
          name: "技侦实战应用系统",
          link: "http://10.95.95.110：7777/web/login.htm"
        },
        { name: "PGIS2地图", link: "http://10.95.95.103:7080/PGISMap" },
        {
          name: "信访维稳实战应用平台",
          link: "http://10.95.94.168/xfwwszpt/index.htm"
        },
        { name: "反恐综合实战应用平台", link: "http://10.95.95.88/fysp" },
        {
          name: "经侦情报实战应用平台",
          link: "http://10.95.94.239:8080/eicp/index.htm"
        },
        {
          name: "警务云人脸识别实战应用系统",
          link: "http://10.95.95.160/apollo-web/web/login!login4ThirdUrl.action"
        },
        {
          name: "食药环侦智能警务实战系统",
          link: "http://10.95.95.157:8081/ITAP/LCDLJK"
        },
        { name: "警务云布控系统", link: "http://10.95.94.109:8080/bms/" },
        {
          name: "刑事侦查实战应用平台",
          link: "http://10.95.95.191:9080/platform/login"
        }
      ],
      renyuanZhanbiData: [],
      tonghuanbiData: [],
      shuliangqushiData: [],
      yujingData: [],
      caseType: [],
      detailTask: {},
      currentPage:1,
      total:0,
      size:4,
      policeInformation:'',
    };
  }

  componentWillMount() {
    this.getRenyuanZhanbi();
    this.getTongzhi();
    this.getTodoList();
    this.getDetailTask();
    this.getDataList();
    this.getMajorAlarm();
    this.getEarlyWarning();
  }

  componentDidUpdate(prevProps, prevState) {
    // componentDidMount(){
    // if (prevState.message !== this.state.message) {
    //   let num = 0;
    //   let newsHeight = $(".xiaoxi-list")[0].offsetHeight / 2;
    //   this.times = setInterval(() => {
    //     $(".xiaoxi-list").css({ top: -num + "px" });
    //     num++;
    //     if (num > newsHeight) {
    //       num = 0;
    //     }
    //   }, 30);
    //
    //   $(".xiaoxi-list").hover(
    //     () => {
    //       clearInterval(this.times);
    //     },
    //     () => {
    //       clearInterval(this.times);
    //       this.times = setInterval(() => {
    //         $(".xiaoxi-list").css({ top: -num + "px" });
    //         num++;
    //         if (num > newsHeight) {
    //           num = 0;
    //         }
    //       }, 30);
    //     }
    //   );
    // }
  }

  getDataList() {
    this.props.dispatch(
      getSelectCountByStatus({ }, res => {
        if (res.data) {
          this.setState(
            {
              caseType: [
                { taskName: "待办任务", sum: res.data.sum, taskType: "999" }
              ]
            },
            () => {
              this.props.dispatch(
                selectCountByType({ }, result => {
                  if (result.data) {
                    result.data.map(
                      (item, index) => {
                        this.state.caseType.push(item);
                      },
                      () => {
                        this.setState({});
                      }
                    );
                    this.setState({});
                  }
                })
              );
            }
          );
        } else {
          this.setState({
            caseType: []
          });
        }
      })
    );
  }

  getDetailTask() {
    this.props.dispatch(
      selectStatusCountByType({} , res => {
        if (res.data) {
          this.setState({
            detailTask: res.data
          });
        }
      })
    );
  }
  getRenyuanZhanbi() {
    this.props.dispatch(
        selectCountByType({}, res => {
        // if (res.data['zdrzbqk'].length > 0) {
        this.setState({
          renyuanZhanbiData: res.data,

        });
        // }
      })
    );
  }
  getTodoList() {
    let auth = Cookies.get("authCode");
    if (auth) {
      if (auth.indexOf("hczhRole") !== -1) {
        this.props.dispatch(
          willAppointed(
            {
              page: 1,
              size: 4
            },
            res => {
              if (res.data) {
                this.setState({
                  todoData1: res.data.list
                });
              }
            }
          )
        );
      }
    }
  }

  getTongzhi() {
    this.props.dispatch(
      tongzhiTongbao({ pageIndex: this.state.currentPage, pageSize: this.state.size}, res => {
        if (res.data.cmsList.length > 0) {
          this.setState({
            message: res.data.cmsList,
              total:res.data.total,
          });
        } else {
          this.setState({
            message: [],
          });
        }
      })
    );
  }

    getMajorAlarm(){
        this.props.dispatch(selectEmergencyByTime({},(res)=>{
            if(res.data){
                this.setState({
                    policeInformation:res.data['CONTENT']
                })
            }

        }))
    }

    getEarlyWarning(){
        this.props.dispatch(selectCurrentFkyj({},(res)=>{
            if(res.data){
                this.setState({
                    yujingData:res.data
                })
            }
        }))
    }

  openWin(e) {
    let link = e.currentTarget.getAttribute("data-link");
    if (link !== "") {
      $(e.currentTarget)
        .find("form")
        .submit();
      // let newWindow = window.open(link);
      // let method = 'POST';
      // let cardId = Cookies.get('cardId');//人员身份证信息
      // let cardId = '140922198712080016';
      // if(link.indexOf('bms')!==-1){
      //     method = "GET"
      //     cardId = '';
      // }else{
      //     method = 'POST';
      //     cardId = '140922198712080016';
      // }
      // let html = `<html><head><body>
      //   <form action="${link}" method=${method} id="form">
      //     <input type="hidden" name="no" value=${cardId}/>
      //   </form>
      //   <script>
      //     document.getElementById("form").submit()
      //   </script>
      // </body></head></html>`
      // newWindow.document.write(html);
    }
  }

  newDetail = () => {
    hashHistory.push("/newsDetail");
  };
  goTodoTask(e) {
    let id = e.currentTarget.getAttribute("data-id");
    let state = e.currentTarget.getAttribute("data-state");
    if (Cookies.get("authCode")) {
      if (Cookies.get("authCode").indexOf("hczhRole") !== -1) {
        if (Cookies.get("deptLevel") == "4") {
          hashHistory.push(`/approve/${id}/${state}/1`);
        } else {
          hashHistory.push(`/assign/${id}/${state}/1`);
        }
      } else {
        // if(parseInt(Cookies.get('zoneId')) < 0){
        hashHistory.push(`/analysisForPolice/${id}/${state}`);
        // }
      }
    }
  }
  showTotal(total) {
        return `总共 ${total} 项目`;
    }


    render() {
    return (
      <div className="screen-contain">
        <div className="screen-title"><img src={Logo} alt=""/>太原市公安局大数据合成研判作战中心</div>
        <div className="home-top">
          <div className="top-left ">
            <div className="typeAndCount">
              {this.state.caseType.map((item, index) => {
                return (
                  <div key={index} className="caseCount home-border">
                    <img
                      src={
                        item.taskType === "999"
                          ? Icon1
                          : item.taskType === "1"
                            ? Icon2
                            : item.taskType === "2"
                              ? Icon3
                              : item.taskType === "3"
                                ? Icon4
                                : item.taskType === "4"
                                  ? Icon5
                                  : item.taskType === "5"
                                    ? Icon6
                                    : item.taskType === "6"
                                      ? Icon7
                                      : Icon8
                      }
                      alt=""
                    />
                    <span className="taskName">{item.taskName}</span>
                    <span className="count">{item.sum||0}</span>
                  </div>
                );
              })}

            </div>

          </div>
        </div>
        <div className="home-middle">
          <div className="middle-left">
            <div className="caseBox">
                {this.state.todoData1.map((item, index) => {
                    return (
                        <div
                            className="caseList home-border"
                            key={index}
                            onClick={this.goTodoTask.bind(this)}
                            data-id={item.ID}
                            data-state={item.STATE}
                        >
                          <p className="caseTitle">
                              {item.CASE_NAME ? item.CASE_NAME.substr(0, 15) : ""}
                          </p>
                          <p className="caseContent">
                            <span>发起时间：</span>
                            <span>{item.CASE_TIME}</span>
                          </p>
                          <p className="caseContent">
                            <span>发起人：</span>
                            <span>{item.NAME}</span>
                          </p>
                          <p className="caseContent">
                            <span>来源：</span>
                            <span>{item.FROM_NAME}</span>
                          </p>
                          <p className="caseType">
                            <span>•</span>
                              {item.TYPE_NAME}
                          </p>
                        </div>
                    );
                })}
              <p className="clearBoth" />
            </div>
          </div>

          <div className="middle-center home-border">
            <div className="policeSituation">
              <span className="alert">
                <i>i</i>
              </span>
              <span className="policeType">重大警情：</span>
                {this.state.policeInformation}
            </div>
            <div className="home-title">
              <p>通知通报</p>
            </div>
            <div className="home-img">
              {/*<a href="/#/newsDetail">*/}
                {/*<img*/}
                    {/*src={blueArrow}*/}
                    {/*style={{*/}
                        {/*width: "0.8rem",*/}
                        {/*marginRight: "0.5rem",*/}
                        {/*marginBottom: "0.1rem"*/}
                    {/*}}*/}
                    {/*alt=""*/}
                {/*/>{" "}*/}
                {/*查看更多*/}
              {/*</a>*/}
            </div>
            <div className="tm-news">
              <div className="xiaoxi-list" style={{ top: 0 }} ref="xiaoxiList">
                  {this.state.message.map((elem, index) => {
                      return (
                          <Link
                              key={"tongzhi" + index}
                              to={{
                                  pathname: "/newsDetail",
                                  query: { id: elem.id, tab: 1 }
                              }}
                          >
                            <div className="xiaoxi-item" onClick={this.newDetail}>
                              <div className="xiaoxi-date">
                                <p> {elem.crtTime && elem.crtTime.substr(0, 10)}</p>
                                <i />
                              </div>
                                {/*<div className="xiaoxi-text"><Link to={`/index/news/_`}>{elem.SUMMARY && (elem.SUMMARY.length > 24?(elem.SUMMARY.substr(0,24)+'...'):elem.SUMMARY)}</Link>*/}
                              <div className="xiaoxi-text">
                                  {elem.title &&
                                  (elem.title.length > 24
                                      ? elem.title.substr(0, 24) + "..."
                                      : elem.title)}
                              </div>
                            </div>
                          </Link>
                      );
                  })}
                   <Pagination  total={this.state.total} pageSize={this.state.size}  current={this.state.currentPage} showTotal={this.showTotal}   onChange={
                       (page) => {
                         this.setState({
                           currentPage:page
                       },()=>{
                           this.getTongzhi();
                       })

                       }

                   }/>
              </div>
            </div>
          </div>
          <div className="middle-right borderX1">
            <div className="home-title">
              <p>常用工具集</p>
            </div>
            <div className="home-img">
              <a href="/#/toolbox">
                <img
                  src={blueArrow}
                  style={{
                    width: "0.8rem",
                    marginRight: "0.5rem",
                    marginBottom: "0.1rem"
                  }}
                  alt=""
                />{" "}
                查看更多
              </a>
            </div>
            <div className="gongjuji-content">
              {this.state.tools.map((item, index) => {
                return (
                  <div
                    key={"tool" + index}
                    className={"color" + index}
                    onClick={this.openWin.bind(this)}
                    data-link={item.links && item.links}
                  >
                    <img src={item.image} alt="pic" />
                    <form action={item.links} method="post" target="_blank">
                      <input
                        type="hidden"
                        name="no"
                        value="14010219611229061X"
                      />
                      <input type="hidden" name="xm" value="侯建军" />
                    </form>
                    <span>{item.name}</span>
                  </div>
                );
              })}
              <p className="clearBoth" />
            </div>
          </div>
          <p className="clearBoth" />
        </div>
        <div className="home-bottom ">
          <div className="bottom-left borderX">
            <div className="home-title" style={{ top: "1rem" }}>
              <p>系统链接</p>
            </div>
            <Tabs defaultActiveKey="1">
              <TabPane tab="<" key="1">
                  {this.state.systemLink.map((item, index) => {
                      if (index < 3) {
                          return (
                              <a
                                  key={"xitong" + index}
                                  className={
                                      index === 0
                                          ? "systemLink blue"
                                          : index === 1
                                          ? "systemLink green"
                                          : "systemLink pink"
                                  }
                                  href={item.link}
                                  target="_blank"
                              >
                                <div>
                                  <img src={xitonglianjie} alt="" />{" "}
                                  <p>{item.name && item.name.substr(0, 12)}</p>{" "}
                                </div>
                              </a>
                          );
                      }
                  })}
              </TabPane>
              <TabPane tab=">" key="2">
                  {this.state.systemLink.map((item, index) => {
                      if (index > 2&&index<6) {
                          return (
                              <a
                                  key={"xitong2" + index}
                                  href={item.link}
                                  target="_blank"
                                  className={
                                      index === 3
                                          ? "systemLink blue"
                                          : index === 4
                                          ? "systemLink green"
                                          : "systemLink pink"
                                  }
                              >
                                <div>
                                    {" "}
                                  <img src={xitonglianjie} alt="" />
                                  <p>{item.name}</p>{" "}
                                </div>
                              </a>
                          );
                      }
                  })}
              </TabPane>
            </Tabs>
          </div>
          <div className="bottom-center borderX">
            <div className="home-title">
              <p>预警防控</p>
            </div>
            <div className="echarts-content">
              <YuJing data={this.state.yujingData} />
            </div>
          </div>
          <div className="bottom-right borderX2">
            <div className="home-title" style={{ top: "1rem" }}>
              <p>任务类别</p>
            </div>
            <div className="echart-left">
              <div className="echarts-content">
                <RenyuanZhanbi
                    data={this.state.renyuanZhanbiData}
                    subTitle={"任务总量"}
                />
              </div>
              <div className="detailList">
                  {this.state.renyuanZhanbiData.map((ele, index) => {
                      return (
                          <p key={index}>
                            <span>{(ele.than * 100 + "").substr(0, 5) + "%"}</span>
                            <span>{ele.sum}</span>
                          </p>
                      );
                  })}
              </div>
            </div>

            <div className="echart-right ">
              <div className="echarts-content">
                <YuJingDetail
                    data={this.state.detailTask}
                />
              </div>
            </div>
          </div>

          <p className="clearBoth" />
        </div>
      </div>
    );
  }
}
