import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, hashHistory } from "react-router";
import { Tabs, Table } from "antd";
import "jquery";
import $ from "jquery";
import "./home.less";
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
import xitonglianjie from "../../images/common/xitonglianjie.png";
import RenyuanZhanbi from "./components/homePie";
import YuJing from "./components/homeFullPie";
import YuJingDetail from "./components/homePieSingle";

import { tongzhiTongbao } from "../../actions/common";
import {
  getOrderByType,
  willAppointed,
  didAppointed,
  getSelectCountByStatus,
  selectCountByType,
  selectStatusCountByType,
  selectEmergencyByTime,
  selectCurrentFkyj,
  changeCaseTypeTab,
  getDirection,
  willDoCount,
  policePeopleList,
  pcsWillDoCount
} from "actions/masterAction";


const TabPane = Tabs.TabPane;

@connect((state, props) => ({
  config: state.config,
  willCount: state.willDoCountResponse,
  pcsWillDoCount:state.pcsWillDoCountResponse,
}))
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMaster:'1',
      todoColumns: [
        { title: "序号", dataIndex: "ROW_ID", key: "ROW_ID" },
        { title: "名称", dataIndex: "CASE_NAME", key: "CASE_NAME" },
        { title: "发起时间", dataIndex: "SUBMIT_DATE", key: "SUBMIT_DATE" }
      ],
      todoData1: [],
      otherData:[],
      message: [],
      deptName: Cookies.get('deptName'),
      deptLevel: Cookies.get('deptLevel'),
      tools: [
        { image: Guanxi, name: "关系图谱", links: "http://10.95.18.122:3000/login2?username=zhzx", img:'gxtp' },
        { image: Shumo, name: "数模空间", links: "http://10.95.18.161:7017/m2/#/login?userName=admin&userPassword=BE949C6275E71A4201DD6FDAE4DAC5CE", img:'gxtp' },
        {
          image: Renyuan,
          name: "人员档案模型",
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
          name: "案件档案模型",
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
      policeInformation:
        "太原市小店区林和街道2339号发生人质劫持事件太原市小店区林和街道2339号发生人质劫持事件太原市小店区林和街道2339号发生人质劫持事件太原" +
        "市小店区林和街道2339号发生人质劫持事件"
    };
  }

  componentWillMount() {
     if(Cookies.get('authCode').indexOf('hczhRole') !== -1){
      this.setState({
        isMaster:'1'
      },()=>{
        this.getDataList();
        this.getDetailTask();
      })
    }else{
      this.setState({
        isMaster:'0'
      },()=>{
        this.getDataList();
        this.getDetailTask();
      })
    }
    this.getRenyuanZhanbi();
    this.getTongzhi();
    this.getTodoList();


    this.getMajorAlarm();
    this.getEarlyWarning();

    this.getCaseTotal()
  }

  getCaseTotal(){

    if(this.state.deptLevel === '4'){
      this.props.dispatch(policePeopleList({"policeStation":this.state.deptName,"status":'1',"type":'',"pageNum":1,"pageSize":7},(res)=>{
        if(res.data){
          this.props.dispatch(pcsWillDoCount({count: res.data.total}))
        }else{
          this.props.dispatch(pcsWillDoCount({count: 0}))
        }
      
      }))
    }else{
      this.props.dispatch(getDirection({"status":'1',"branch":this.state.deptLevel === '2'?"":this.state.deptName,"page":1,"pageSize":7},(res)=>{
        if(res.data){
          this.props.dispatch(willDoCount({count: res.data.total}))
        }else{
          this.props.dispatch(willDoCount({count: 0}))
        }
        
        // console.log(res.data.total)
      }))
    }

  }

  componentDidUpdate(prevProps, prevState) {
    // componentDidMount(){
    if (prevState.message !== this.state.message) {
        let num = 0;
        let newsHeight = this.refs.xiaoxiList.offsetHeight / 2;
        this.times = setInterval(() => {
            this.refs.xiaoxiList.style.top = `${-num}px`
            num++;
            if (num > newsHeight) {
                num = 0;
            }
        }, 30);
        this.refs.xiaoxiList.onmouseover=() => {
            clearInterval(this.times);
        }
        this.refs.xiaoxiList.onmouseout=() => {
            clearInterval(this.times);
                    this.times = setInterval(() => {
               this.refs.xiaoxiList.style.top = `${-num}px`
                num++;
                if (num > newsHeight) {
                    num = 0;
                }
            }, 30);
        }

    }
  }
  componentWillUnmount() {
    clearInterval(this.times);
  }

  getDataList() {
    const { willCount, pcsWillDoCount } = this.props;
    this.props.dispatch(
      getSelectCountByStatus({ isMaster: this.state.isMaster }, res => {
       if (res.data) {
          this.setState(
            {
              caseType: [
                { taskName: "待办任务", sum:res.data.todo, taskType: "999" }
              ]
            },
            () => {
              this.props.dispatch(
                selectCountByType({ isMaster: this.state.isMaster }, result => {
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
      selectStatusCountByType({ isMaster: this.state.isMaster }, res => {
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
      getOrderByType({}, res => {
        // if (res.data['zdrzbqk'].length > 0) {
        this.setState({
          renyuanZhanbiData: res.data.list,

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
              taskSubType: "",
              isApprove: "1",
              isMaster: "1",
              taskStatus: "",
              page: 1,
              size: 6
            },
            res => {
                if (res.data) {
                    this.setState({
                        todoData1: res.data.list
                    },()=>{
                        let len=this.state.todoData1.length
                        if(len<6){
                            for(let i=0;i<6-len;i++){
                                this.state.todoData1.push({})
                            }
                            this.setState({})
                        }
                    });
                }
            }
          )
        );
      } else {
        this.props.dispatch(
          didAppointed(
            {
              taskSubType: "",
              isApprove: "1",
              isMaster: "0",
              taskStatus: "0",
              page: 1,
              size: 6
            },
            res => {
                if (res.data) {
                    this.setState({
                        todoData1: res.data.list
                    },()=>{
                      let len=this.state.todoData1.length
                        if(len<6){
                            for(let i=0;i<6-len;i++){
                                this.state.todoData1.push({})
                            }
                            this.setState({})
                        }
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
      tongzhiTongbao({ pageIndex: 1, pageSize: 15 }, res => {
        if (res.data.cmsList.length > 0) {
          this.setState({
            message: res.data.cmsList
          });
        } else {
          this.setState({
            message: []
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
    let img = e.currentTarget.getAttribute('data-img');
    if(img === 'gxtp'){
      window.open(link)
    }else{
        if(link === ''){
            window.open(link)
        }else{
            $(e.currentTarget).find("form").submit();
            // console.log(12313)
            // this.refs.form.submit();
        }
    }
  }

  newDetail = () => {
    hashHistory.push("/newsDetail");
  };
  goTodoTask(e) {
    let id = e.currentTarget.getAttribute("data-id");
    let state = e.currentTarget.getAttribute("data-state");
    let taskType = e.currentTarget.getAttribute('data-tasktype');
    if (Cookies.get("authCode")) {
      if (Cookies.get("authCode").indexOf("hczhRole") !== -1) {
        if (Cookies.get("deptLevel") == "4") {
          if(taskType === '1' ||taskType === '2' || taskType === '4' || taskType === '7'){
            hashHistory.push(`/pcszhzFankui/${id}/${state}/${taskType}`);
          }else{
            hashHistory.push(`/approve/${id}/${state}/1/${taskType}`);
          }

        } else {
          if(taskType === '1' ||taskType === '2' || taskType === '4' || taskType === '7'){
            hashHistory.push(`/assignTTT/${id}/${state}/1/${taskType}`);
          }else{
            hashHistory.push(`/assign/${id}/${state}/1/${taskType}`);
          }
          // hashHistory.push(`/assign/${id}/${state}/1`);

        }
      } else {
        // if(parseInt(Cookies.get('zoneId')) < 0){
          // if(taskType === '1' || taskType === '4' || taskType === '7'){
          //   hashHistory.push(`/downAnalysisForPolice/${id}/${state}`);
          // }else{
            hashHistory.push(`/analysisForPolice/${id}/${state}`);
          // }

        // }
      }
    }
  }

  goHomePage(e){
    let taskType = e.currentTarget.getAttribute('data-tasktype') ;
    let subType = '';
    if(Cookies.get('authCode').indexOf('hczhRole')!==-1){
      this.props.dispatch(changeCaseTypeTab({caseTypeId:taskType}));
      if(taskType === '999'){
        subType = '6'
      }else{
        subType = taskType
      }
      hashHistory.push(`/master/2/1/${subType}`)
    }else{
      this.props.dispatch(changeCaseTypeTab({caseTypeId:taskType}));
      hashHistory.push('/averagePolice/2')
    }

  }

  render() {
    const { willCount, pcsWillDoCount } = this.props;
    return (
      <div className="home-contain">
        <div className="home-top">
          <div className="top-left home-border">
            <div className="typeAndCount">
              {this.state.caseType.map((item, index) => {
                return (
                  <div key={index} className="caseCount" onClick={this.goHomePage.bind(this)} data-tasktype={item.taskType}>
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
                    {
                      item.taskType === '999'?(
                        this.state.deptLevel === '4'?(
                          <span className="count">{parseInt(item.sum)+(pcsWillDoCount.pcsWillDoCount&&parseInt(pcsWillDoCount.pcsWillDoCount.count))}</span>
                        ):(
                          <span className="count">{parseInt(item.sum)+(willCount.willDoCount&&parseInt(willCount.willDoCount.count))}</span>
                        )

                      ):(
                        this.state.deptLevel === '4'?(
                          <span className="count">{(item.taskType === '1'?(parseInt(item.sum)+(pcsWillDoCount.pcsWillDoCount&&parseInt(pcsWillDoCount.pcsWillDoCount.count))):item.sum)||0}</span>
                        ):(
                          <span className="count">{(item.taskType === '1'?(parseInt(item.sum)+(willCount.willDoCount&&parseInt(willCount.willDoCount.count))):item.sum)||0}</span>
                        )
                      )
                    }

                  </div>
                );
              })}
              <p className="clearBoth" />
            </div>
            <div className="caseBox">
              {this.state.todoData1.map((item, index) => {
                    return (

                        <div
                            className="caseList"
                            key={index}
                            onClick={this.goTodoTask.bind(this)}
                            data-id={item.ID}
                            data-state={item.STATE}
                            data-tasktype={item.TASK_TYPE}
                        >
                          <p className="caseTitle">
                            <a title={item.CASE_NAME ? item.CASE_NAME.substr(0, 15) : ""}>{item.CASE_NAME ? item.CASE_NAME.substr(0, 15) : ""}</a>
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
          <div className="top-middle home-border">
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
              <a href="/#/newsDetail">
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
            <div className="tm-news">
              <div className="xiaoxi-list" style={{ top: 0 }} ref="xiaoxiList">
                {this.state.message.map((elem, index) => {
                  return (
                    <Link
                      key={"tongzhi" + index}
                      to={{
                        pathname: "/newsDetail",
                        query: { id: elem.id, tab: elem.nodeId }
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
                {this.state.message.map((elem, index) => {
                  return (
                    <Link
                      key={"tongzhi2" + index}
                      to={{
                        pathname: "/newsDetail",
                        query: { id: elem.id, tab: elem.nodeId }
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
              </div>
            </div>
          </div>
          <p className="clearBoth" />
        </div>
        <div className="home-middle">
          <div className="middle-left home-border">
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
                    data-img={item.img && item.img}
                  >
                    <img src={item.image} alt="pic" />
                    <form action={item.links} method="post" target="_blank" ref='form'>
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
          <div className="middle-center home-border" style={{paddingTop: "2rem" }}>
            <div className="home-title" style={{ top: "2rem" }}>
              <p>系统链接</p>
            </div>
            <Tabs defaultActiveKey="1">
              <TabPane tab="<" key="1">
                {this.state.systemLink.map((item, index) => {
                  if (index < 6) {
                    return (
                      <a
                        key={"xitong" + index}
                        className={
                          index === 0 || index === 4
                            ? "systemLink blue"
                            : index === 1 || index === 5
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
                  if (index > 5) {
                    return (
                      <a
                        key={"xitong2" + index}
                        href={item.link}
                        target="_blank"
                        className={
                          index === 6|| index === 10
                            ? "systemLink blue"
                            : index === 7 || index === 11
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
          <div className="middle-right home-border">
            <div className="home-title">
              <p>预警防控</p>
            </div>
            <div className="echarts-content">
              <YuJing data={this.state.yujingData} />
            </div>
          </div>
          <p className="clearBoth" />
        </div>
        <div className="home-bottom home-border">
          <div className="bottom-left ">
            <div className="home-title" style={{ top: "1rem" }}>
              <p>任务类别</p>
            </div>
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
                    <span>{(ele.than * 100 + "").substr(0, 4) + "%"}</span>
                    <span>{ele.sum}</span>
                  </p>
                );
              })}
            </div>
          </div>
          <div className="bottom-right">
            <div className="echarts-content">
              <YuJingDetail
                data={this.state.detailTask["上级指令"]}
                title="上级指令"
              />
            </div>
            <div className="echarts-content">
              <YuJingDetail
                data={this.state.detailTask["110警情"]}
                title="110警情"
              />
            </div>
            <div className="echarts-content">
              <YuJingDetail
                data={this.state.detailTask["警综案件"]}
                title="警综案件"
              />
            </div>
            <div className="echarts-content">
              <YuJingDetail
                data={this.state.detailTask["普通情报"]}
                title="普通情报"
              />
            </div>
            <div className="echarts-content">
              <YuJingDetail
                data={this.state.detailTask["合成请求"]}
                title="合成请求"
              />
            </div>
            <div className="echarts-content">
              <YuJingDetail
                data={this.state.detailTask["上报文件"]}
                title="上报文件"
              />
            </div>
            <div className="echarts-content">
              <YuJingDetail
                  data={this.state.detailTask["反恐维稳"]}
                  title="反恐维稳"
              />
            </div>
          </div>
          <p className="clearBoth" />
        </div>
      </div>
    );
  }
}
