/**
 * Created by lpsh0王艳新 on 2017/10/26.
 */
import React, { Component } from "react";
import "./multiDetermine.css";
import { connect } from "react-redux";
import ChartPieSun from "./component/chartPieSun";
import TimeLine from "../common/timeLine";
import ChartPieRipple from "./component/chartPieRipple";
import ChartBarStrip from "./component/chartBarStrip";
import ChartMap from "./component/chartMap";
import { Radio } from "antd";
import ChartBarMan from "./component/chartBarMan";
import ChartLineSingle from "./component/chartLineSingle";
import ChartBarThread from "./component/chartBarThread";
import {
  getPieByLocation,
  getLineByTime,
  getTopByCounty,
  getPieByClassify,
  getColumnByAge,
  getTopByEthnicity,
  getTopByLosses,
  getPieBySex,
  getPieByCarType,
  getMapByCounty,
  getCaseTypeList
} from "actions/multiDetermine";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@connect((state, props) => ({
  config: state.config
}))
export default class MultiDetermine extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      beginTime: new Date().getFullYear().toString(),
      endTime: new Date().getFullYear().toString(),
      address: "太原市",
      addressCode: undefined,
      caseType: undefined,
      originalAddress: "",
      radioSelect: 0,
      chartLeft1: [],
      chartLeft2: [],
      chartLeft3: [],
      chartMap: [],
      chartRight1: [],
      chartRight2: [],
      chartRight3: [],
      chartRight4: [],
      chartRight5: [],
      chartRight6: [],
      allOrSingle: true,
      radioGroup: [],
      titleList: [
        [
          "发案地点占比情况",
          "案件高发时间段情况",
          "案件高发区情况排名",
          "发案地点占比情况",
          "案件嫌疑人年龄情况",
          "案件嫌疑人民族情况排名"
        ],
        [
          "交通违章地点占比情况",
          "交通违章高发时间段情况",
          "各区县高发区情况排名",
          "交通违章分类占比情况",
          "交通违章人员年龄情况",
          "交通违章人员性别情况"
        ],
        [
          "交通事故地点占比情况",
          "交通事故高发时间段情况",
          "各区县高发区情况排名",
          "交通事故分类占比情况",
          "交通事故涉案车辆情况",
          "交通事故损伤人员及经济损失情况"
        ]
      ],
      titles: [],
      timeFormat: "month",
      geo: null,
      chartTitle: "",
      showOrFalse: ["block", "none", "block", "none", "none"]
    };
  }

  ChartLeft1() {
    let params = {
      beginTime: this.state.beginTime,
      endTime: this.state.endTime
    };
    if (this.state.addressCode != undefined) {
      params.areaCode = this.state.addressCode;
    }
    if (this.state.caseType != undefined) {
      params.caseType = this.state.caseType;
    }
    this.props.dispatch(
      getPieByLocation(params, res => {
        this.setState({
          chartLeft1: res.data.list
        });
      })
    );
  }

  ChartLeft2() {
    let params = {
      beginTime: this.state.beginTime,
      endTime: this.state.endTime
    };
    if (this.state.addressCode != undefined) {
      params.areaCode = this.state.addressCode;
    }
    if (this.state.caseType != undefined) {
      params.caseType = this.state.caseType;
    }
    this.props.dispatch(
      getLineByTime(params, res => {
        this.setState({
          chartLeft2: res.data.list
        });
      })
    );
  }

  ChartLeft3() {
    let params = {
      beginTime: this.state.beginTime,
      endTime: this.state.endTime
    };
    if (this.state.addressCode != undefined) {
      params.areaCode = this.state.addressCode;
    }
    if (this.state.caseType != undefined) {
      params.caseType = this.state.caseType;
    }
    this.props.dispatch(
      getTopByCounty(params, res => {
        this.setState({
          chartLeft3: res.data.list
        });
      })
    );
  }

  ChartRight1() {
    let params = {
      beginTime: this.state.beginTime,
      endTime: this.state.endTime
    };
    if (this.state.addressCode != undefined) {
      params.areaCode = this.state.addressCode;
    }
    if (this.state.caseType != undefined) {
      params.caseType = this.state.caseType;
    }
    this.props.dispatch(
      getPieByClassify(params, res => {
        this.setState({
          chartRight1: res.data.list
        });
      })
    );
  }

  ChartRight2() {
    let params = {
      beginTime: this.state.beginTime,
      endTime: this.state.endTime
    };
    if (this.state.addressCode != undefined) {
      params.areaCode = this.state.addressCode;
    }
    if (this.state.caseType != undefined) {
      params.caseType = this.state.caseType;
    }
    this.props.dispatch(
      getColumnByAge(params, res => {
        this.setState({
          chartRight2: res.data
        });
      })
    );
  }

  ChartRight3() {
    let params = {
      beginTime: this.state.beginTime,
      endTime: this.state.endTime
    };
    if (this.state.addressCode != undefined) {
      params.areaCode = this.state.addressCode;
    }
    if (this.state.caseType != undefined) {
      params.caseType = this.state.caseType;
    }
    this.props.dispatch(
      getTopByEthnicity(params, res => {
        this.setState({
          chartRight3: res.data.list
        });
      })
    );
  }

  ChartRight4() {
    let params = {
      beginTime: this.state.beginTime,
      endTime: this.state.endTime
    };
    if (this.state.addressCode != undefined) {
      params.areaCode = this.state.addressCode;
    }
    if (this.state.caseType != undefined) {
      params.caseType = this.state.caseType;
    }
    this.props.dispatch(
      getTopByLosses(params, res => {
        this.setState({
          chartRight4: res.data.list
        });
      })
    );
  }

  ChartRight5() {
    let params = {
      beginTime: this.state.beginTime,
      endTime: this.state.endTime
    };
    if (this.state.addressCode != undefined) {
      params.areaCode = this.state.addressCode;
    }
    if (this.state.caseType != undefined) {
      params.caseType = this.state.caseType;
    }
    this.props.dispatch(
      getPieBySex(params, res => {
        let cacheData = [];
        res.data.list.forEach((elem, index) => {
          cacheData.push({
            name: elem.userSex,
            value: parseInt(elem.count)
          });
        });
        this.setState({
          chartRight5: cacheData
        });
      })
    );
  }

  ChartRight6() {
    let params = {
      beginTime: this.state.beginTime,
      endTime: this.state.endTime
    };
    if (this.state.addressCode != undefined) {
      params.areaCode = this.state.addressCode;
    }
    if (this.state.caseType != undefined) {
      params.caseType = this.state.caseType;
    }
    this.props.dispatch(
      getPieByCarType(params, res => {
        let cacheData = [];
        res.data.list.forEach((elem, index) => {
          cacheData.push({
            name: elem.carTypeName,
            value: parseInt(elem.count)
          });
        });
        this.setState({
          chartRight6: cacheData
        });
      })
    );
  }

  ChartMap() {
    let params = {
      beginTime: this.state.beginTime,
      endTime: this.state.endTime
    };
    if (this.state.addressCode != undefined) {
      params.areaCode = this.state.addressCode;
    }
    if (this.state.caseType != undefined) {
      params.caseType = this.state.caseType;
    }
    this.props.dispatch(
      getMapByCounty(params, res => {
        this.setState({
          chartMap: res.data.list
        });
      })
    );
  }

  refreshAll() {
    this.ChartLeft1();
    this.ChartLeft2();
    this.ChartLeft3();
    // this.ChartLeft5();
    // this.ChartLeft6();
    this.ChartRight1();
    this.ChartRight2();
    this.ChartRight3();
    // this.ChartRight4();
    // this.ChartRight5();
    // this.ChartRight6();
    this.ChartMap();
  }

  componentWillMount() {
    let params = {
      beginTime: this.state.beginTime,
      endTime: this.state.endTime
    };
    this.props.dispatch(
      getMapByCounty(params, res => {
        this.state.address = res.data.geoList[0]["NAME"];
        this.setState(
          {
            originalAddress: res.data.geoList[0]["NAME"],
            geo: res.data.geoList[0],
            countyCode: res.data.countyList,
            titles: this.state.titleList[0]
            // radioGroup:res.lis
          },
          () => {
            this.refreshAll();
          }
        );
      })
    );

    this.props.dispatch(
      getCaseTypeList({}, res => {
        this.setState({
          radioGroup: res.data.list
        });
      })
    );
  }

  ChangeRadio(index) {
    let showCache = ["block", "none", "block", "none", "none"];
    let titleIndex = 0;
    if (index == "1006") {
      showCache = ["block", "none", "none", "none", "block"];
      titleIndex = 1;
    } else if (index == "1007") {
      showCache = ["none", "block", "none", "block", "none"];
      titleIndex = 2;
    }
    this.setState(
      {
        caseType: index == 0 ? undefined : index,
        showOrFalse: showCache,
        titles: this.state.titleList[titleIndex]
      },
      () => {
        this.refreshAll();
      }
    );
  }

  time(newState) {
    //接收传回来的时间改变后的数据
    let time = newState.split("|");
    let timeFormat = "";
    if (time[0].length == 4 && time[0] != time[1]) {
      //传入参数为年份时
      timeFormat = "year";
    } else if (
      (time[0].length == 4 && time[1] == time[0]) ||
      (time[0].length == 6 && time[1] != time[0])
    ) {
      //传入参数为年份时
      timeFormat = "month";
    } else if (
      (time[0].length == 6 && time[1] == time[0]) ||
      (time[0].length == 8 && time[1] != time[0])
    ) {
      //传入参数为月份时
      timeFormat = "day";
    } else if (time[0].length == 8 && time[1] == time[0]) {
      //传入参数为日时
      timeFormat = "hour";
    }
    this.setState(
      {
        beginTime: time[0],
        endTime: time[1],
        timeFormat: timeFormat
      },
      () => {
        this.refreshAll();
      }
    );
  }

  // returnHome() {
  //   this.setState(
  //     {
  //       address: this.state.originalAddress,
  //       allOrSingle: true
  //     },
  //     () => {
  //       this.refreshAll();
  //     }
  //   );
  //   $("#homeBtn")
  //     .delay(400)
  //     .slideUp();
  //   $(".center-panel")
  //     .delay(400)
  //     .slideDown();
  // }

  mapCallback(newState) {
    //接收传回来的时间改变后的数据
    let codeNum = "";
    this.state.countyCode.forEach((elem, index) => {
      if (elem.countyName == newState[0]) {
        codeNum = elem.countyCode;
      } else {
        codeNum = undefined;
      }
    });
    this.setState(
      {
        address: newState[1] ? this.state.originalAddress : newState[0],
        allOrSingle: newState[1],
        addressCode: codeNum
      },
      () => {
        this.refreshAll();
      }
    );
    // if (newState[1]) {
    //   $("#homeBtn")
    //     .delay(400)
    //     .slideUp();
    //   $(".center-panel")
    //     .delay(400)
    //     .slideDown();
    // } else {
    //   $("#homeBtn")
    //     .delay(400)
    //     .slideDown();
    //   $(".center-panel")
    //     .delay(400)
    //     .slideUp();
    // }
  }

  render() {
    return (
      <div className="container-fluid multiDetermine">
        {/* <div className="home-bt" id="homeBtn" onClick={this.returnHome.bind(this)}> */}
        {/*<img src={homeBt}/>*/}
        {/* <span>返回主页</span></div> */}
        <div className="text-center">
          <span className="header-title" id="headerAddress">
            {this.state.address}
          </span>
          <span className="header-title">综合分析</span>
        </div>

        <div className="all_echart">
          <div className="left">
            <div className="mul_chart_box" id="optionL1">
              <ChartPieSun
                data={this.state.chartLeft1}
                address={this.state.address}
                title={this.state.titles[0]}
              />
            </div>
            <div className="mul_chart_box" id="optionL2">
              <ChartLineSingle
                data={this.state.chartLeft2}
                address={this.state.address}
                title={this.state.titles[1]}
                timeStyle={this.state.timeFormat}
              />
            </div>
            <div className="mul_chart_box" id="optionL5">
              <ChartBarStrip
                data={this.state.chartLeft3}
                address={this.state.address}
                title={this.state.titles[2]}
              />
            </div>
          </div>
          <div className="middle">
            <RadioGroup
              onChange={e => this.ChangeRadio(e.target.value)}
              defaultValue="0"
              className="all_radio_group"
            >
              <Radio key="0" value="0" className="">
                综合分析
              </Radio>
              {this.state.radioGroup.map((item, index) => {
                return (
                  <Radio key={item.caseType} value={item.caseType} className="">
                    {item.caseTypeName}
                  </Radio>
                );
              })}
            </RadioGroup>

            <ChartMap
              data={this.state.chartMap}
              status={this.state.allOrSingle}
              geo={this.state.geo}
              radioSelect={this.state.radioSelect}
              callbackData={this.mapCallback.bind(this)}
              className="chart-map"
              id="chartMap"
              address={this.state.address}
            />
          </div>
          <div className="right">
            <div className="mul_chart_box" id="optionR1">
              <ChartPieRipple
                data={this.state.chartRight1}
                address={this.state.address}
                title={this.state.titles[3]}
              />
            </div>

            <div
              className="mul_chart_box"
              id="optionR2"
              style={{ display: this.state.showOrFalse[0] }}
            >
              <ChartBarThread
                data={this.state.chartRight2}
                address={this.state.address}
                timeStyle={this.state.timeFormat}
                title={this.state.titles[4]}
              />
            </div>
            {/*  <div className="chart_box" id="optionR6" style={{display:this.state.showOrFalse[1]}}>
                            <ChartPieDial data={this.state.chartRight6} title={this.state.titles[4]} midTitle='涉案车辆总计'
                                          address={this.state.address}/>
                        </div>*/}

            <div
              className="mul_chart_box"
              id="optionR3"
              style={{ display: this.state.showOrFalse[2] }}
            >
              <ChartBarMan
                data={this.state.chartRight3}
                title={this.state.titles[5]}
                address={this.state.address}
                lossFlag=""
              />
            </div>

            {/*  <div className="chart_box" id="optionR3" style={{display:this.state.showOrFalse[3]}}>
                            <ChartBarMan data={this.state.chartRight4} title={this.state.titles[5]}
                                         address={this.state.address} lossFlag = 'true'/>
                        </div>*/}
            {/* <div className="chart_box" id="optionR5" style={{display:this.state.showOrFalse[4]}}>
                            <ChartPieDial data={this.state.chartRight5} title={this.state.titles[5]} midTitle='违章人数总计'
                                          address={this.state.address}/>
                        </div>*/}
          </div>
        </div>
        <TimeLine getTime={this.time.bind(this)} />
      </div>
    );
  }
}
