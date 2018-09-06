import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'
import ChartPieSun from './component/chartPieSun';
import { Radio } from 'antd';
import './stateAnalysis.less'
import logo from '../../images/stateAnalysis/logo.png'
import arrowDown from '../../images/stateAnalysis/arrow-down.png'
import TimeLine from '../common/timeLine';
import ChartPieRipple from './component/chartPieRipple';
import ChartPieWheel from './component/chartPieWheel';
import ChartPieDial from './component/chartPieDial';
import ChartBarStrip from './component/chartBarStrip';
import ChartMap from './component/chartMap';
import ChartBarMan from './component/chartBarMan';
import ChartBarManRight from './component/chartBarManRight';
import ChartLineSingle from './component/chartLineSingle';
import ChartLineGreen from './component/chartLineGreen';
import ChartLinePurple from './component/chartLinePurple';
import ChartLineBlue from './component/chartLineBlue';
import ChartBarThread from './component/chartBarThread';
import {
    getConfig,
    jjqkbjRatio,
    ajlxRatio,
    zdrqk,
    afslpm,
    afslpmdj,
    affb,
    caseNumTrend,
    peoNumTrend,
    jqfb,
    peoHostel,
    peoNumTongHuan,
    jjNumTongHuan,
    caseNumTongHuan,
    zdjq,

} from 'actions/stateAnalysis';

const RadioGroup = Radio.Group;

@connect(
    (state, props) => ({
      config: state.config,
    })
)
export default class StateAnalysis extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      beginTime: new Date().getFullYear().toString(),
      endTime: new Date().getFullYear().toString(),
      address: '太原市',
      originalAddress: '',
      radioSelect: 0,
      chartLeft1: [],
      chartLeft2: [],
      chartLeft3: [],
      chartLeft4: [],
      chartLeft5: [],
      chartLeft6: [],
      chartMap: [],
      chartRight1: [],
      chartRight2: [],
      chartRight3: [],
      chartRight4: [],
      chartRight5: [],
      chartRight6: [],
      allOrSingle: true,
      radioGroup: [],
      timeFormat: 'month',
      geo: null,
      warningData: [],
      centerScrollNews: true,
      centerPanalHide: false,
    }
  }


    /* 接警情况和接报警分类占比*/
  ChartLeft1() {
    this.props.dispatch(jjqkbjRatio({ beginTime: this.state.beginTime, endTime: this.state.endTime, address: this.state.address }, res => {
      this.setState({
        chartLeft1: res.data['jjqkList'],
        chartLeft2: res.data['jjflList'],

      });
    }))
  }
  ChartLeft3() {
    this.props.dispatch(ajlxRatio({ beginTime: this.state.beginTime, endTime: this.state.endTime, address: this.state.address }, res => {
      this.setState({
        chartLeft3: res.data['list'],

      });
    }))
  }
  ChartLeft4() {
    this.props.dispatch(zdrqk({ beginTime: this.state.beginTime, endTime: this.state.endTime, address: this.state.address }, res => {
      this.setState({
        chartLeft4: res.data['zdrzbqk'],
      });
    }))
  }
  ChartLeft5() {
    this.props.dispatch(afslpm({ beginTime: this.state.beginTime, endTime: this.state.endTime, address: this.state.address }, res => {
      this.setState({
        chartLeft5: res.data['aflxpm'],

      });
    }))
  }
  ChartLeft6() {
    this.props.dispatch(zdrqk({ beginTime: this.state.beginTime, endTime: this.state.endTime, address: this.state.address }, res => {
      this.setState({
        chartLeft6: res.data['zdrfbqk'],
      });
    }))
  }
  ChartRight1() {
    this.props.dispatch(caseNumTrend({ beginTime: this.state.beginTime, endTime: this.state.endTime, address: this.state.address }, res => {
      this.setState({
        chartRight1: res.data['caseNumList'],

      });
    }))
  }
  ChartRight2() {
    const _this = this;
    this.props.dispatch(caseNumTongHuan({ beginTime: this.state.beginTime, endTime: this.state.endTime, address: this.state.address }, res => {
      res.data['tongList'].forEach((elem, index) => {
        res.data['tongList'][index].rate = _this.getYoy(res.data['tongList'][index]['sl'], res.data['tongList'][index]['prev_sl'])
      });
      res.data['huanList'].forEach((elem, index) => {
        res.data['huanList'][index].rate = _this.getYoy(res.data['huanList'][index]['sl'], res.data['huanList'][index]['prev_sl'])
      });
      this.setState({
        chartRight2: res.data,
      });
    }))
  }
  ChartRight3() {
    this.props.dispatch(peoNumTrend({ beginTime: this.state.beginTime, endTime: this.state.endTime, address: this.state.address }, res => {
      this.setState({
        chartRight3: res.data['peo'],

      });
    }))
  }
  ChartRight4() {
    const _this = this;
    this.props.dispatch(peoNumTongHuan({ beginTime: this.state.beginTime, endTime: this.state.endTime, address: this.state.address }, res => {
      res.data['tongList'].forEach((elem, index) => {
        res.data['tongList'][index].rate = _this.getYoy(res.data['tongList'][index]['sl'], res.data['tongList'][index]['prev_sl'])
      });
      res.data['huanList'].forEach((elem, index) => {
        res.data['huanList'][index].rate = _this.getYoy(res.data['huanList'][index]['sl'], res.data['huanList'][index]['prev_sl'])
      });
      this.setState({
        chartRight4: res.data,
      });
    }))
  }
  ChartRight5() {
    this.props.dispatch(peoHostel({ beginTime: this.state.beginTime, endTime: this.state.endTime, address: this.state.address }, res => {
      this.setState({
        chartRight5: res.data['peo'],

      });
    }))
  }
  ChartRight6() {
    const _this = this;
    this.props.dispatch(jjNumTongHuan({ beginTime: this.state.beginTime, endTime: this.state.endTime, address: this.state.address }, res => {
      res.data['tongList'].forEach((elem, index) => {
        res.data['tongList'][index].rate = _this.getYoy(res.data['tongList'][index]['sl'], res.data['tongList'][index]['prev_sl'])
      });
      res.data['huanList'].forEach((elem, index) => {
        res.data['huanList'][index].rate = _this.getYoy(res.data['huanList'][index]['sl'], res.data['huanList'][index]['prev_sl'])
      });
      this.setState({
        chartRight6: res.data,
      });
    }))
  }
  ChartMap() {
    this.props.dispatch(jqfb({ beginTime: this.state.beginTime, endTime: this.state.endTime, address: this.state.address, jqtslx: this.state.radioSelect }, res => {
      this.setState({
        chartMap: res.data,
      });
    }))
  }
  refreshAll() {
    this.ChartLeft1();
    this.ChartLeft3();
    this.ChartLeft4();
    this.ChartLeft5();
    this.ChartLeft6();
    this.ChartRight1();
    this.ChartRight2();
    this.ChartRight3();
    this.ChartRight4();
    this.ChartRight5();
    this.ChartRight6();
    this.ChartMap();
  }
  getYoy(cur, bef) { // 计算同比环比
    if (cur !== 0 && bef !== 0) {
      return Math.round(((cur - bef) / bef) * 10000) / 100.00;
    } else {
      return '0'
    }
  }
  componentWillMount() {
    this.props.dispatch(getConfig({}, res => {
            // console.log(res)
      this.state.address = res.data.geo.name;
      this.setState({
        originalAddress: res.data.geo.name,
        geo: res.data.geo,
        radioGroup: res.data.lis,
      }, () => {
        this.refreshAll();
      })
    })
        );

    this.props.dispatch(zdjq({}, res => {
      this.setState({
        warningData: res.data,
      });
    }))
  }

  ChangeRadio(index) {
    this.setState({
      radioSelect: parseInt(index),
    }, function () {
      this.ChartMap();
    })
  }
  time(newState) { // 接收传回来的时间改变后的数据
    const time = newState.split('|');
    let timeFormat = '';
    if (time[0].length === 4 && time[0] !== time[1]) { // 传入参数为年份时
      timeFormat = 'year'
    }
    else if ((time[0].length === 4 && time[1] === time[0]) || (time[0].length === 6 && time[1] !== time[0])) { // 传入参数为年份时
      timeFormat = 'month'
    }
        else if ((time[0].length === 6 && time[1] === time[0]) || (time[0].length === 8 && time[1] !== time[0])) { // 传入参数为月份时
          timeFormat = 'day'
        }
        else if (time[0].length === 8 && time[1] === time[0]) { // 传入参数为日时
          timeFormat = 'hour'
        }
    this.setState({
      beginTime: time[0],
      endTime: time[1],
      timeFormat: timeFormat,
    }, function () {
      this.refreshAll();
    })
  }
    // returnHome () {
    //     this.setState({
    //         address:this.state.originalAddress,
    //         allOrSingle:true
    //     },function () {
    //         this.refreshAll();
    //     });
    //     $('#homeBtn').delay(400).slideUp();
    //     $('.center-panel').delay(400).slideDown();
    // };
  showList() {
        // if($(".center-img").next().hasClass("hidden")){
        //     $(".center-img").next().removeClass("hidden").next().addClass("hidden");
        // }
        // else{
        //     $(".center-img").next().addClass("hidden").next().removeClass("hidden");
        // }
    this.setState({
      centerScrollNews: !this.state.centerScrollNews,
    })
  }

  mapCallback(newState) { // 接收传回来的时间改变后的数据
    this.setState({
      address: newState[1] ? this.state.originalAddress : newState[0],
      allOrSingle: newState[1],
    });
        // findDOMNode(this).getElementsByClassName("chart-map")[0].classList.remove("out");
    this.refreshAll();
    if (newState[1]) {
            // $('#homeBtn').delay(400).slideUp();
      this.setState({
        centerPanalHide: false,
      })
            // $('.center-panel').delay(400).slideDown();
    } else {
            // $('#homeBtn').delay(400).slideDown();
            // $('.center-panel').delay(400).slideUp();
      this.setState({
        centerPanalHide: true,
      })
            // console.log(this.state.centerPanalHide)
    }
  }

  render() {
    return (
    <div className="container-fluid ">
        {/* <div className="home-bt" id="homeBtn" onClick={this.returnHome.bind(this)}>*/}
            {/* /!*<img src={homeBt}/>*!/*/}
            {/* <span>返回主页</span></div>*/}
        <div className="text-center">
            <img src={logo} className="header-img" />
            <span className="header-title" id="headerAddress">{this.state.address}</span>
            <span className="header-title">公安警情案件重点人员态势分析</span>
        </div>
        <div className="all_echart">
            <div className="left">
                <div className="chart_box" id="optionL1">
                    <ChartPieSun data={this.state.chartLeft1} address={this.state.address} />
                </div>
                <div className="chart_box" id="optionL2">
                    <ChartPieRipple data={this.state.chartLeft2} address={this.state.address} />
                </div>
                <div className="chart_box" id="optionL3">
                    <ChartPieWheel data={this.state.chartLeft3} address={this.state.address} />
                </div>
                <div className="chart_box" id="optionL4">
                    <ChartPieDial data={this.state.chartLeft4} address={this.state.address} />
                </div>
                <div className="chart_box" id="optionL5">
                    <ChartBarStrip data={this.state.chartLeft5} address={this.state.address} />
                </div>
                <div className="chart_box" id="optionL6">
                    <ChartBarMan data={this.state.chartLeft6} title="重点人员地区分布情况" address={this.state.address} />
                </div>
            </div>
            <div className="middle">
                <div
                  className="center-panel"
                  style={{ display: this.state.centerPanalHide ? 'none' : 'block' }}
                    // className={this.state.centerPanalHide?'center-panel slideUp':'center-panel slideDown'}
                >

                    <div className="center-img" onClick={this.showList.bind(this)}><img src={arrowDown}id="centerImg" /></div>
                    <div className={this.state.centerScrollNews ? 'list hidden' : 'list'}>
                        <ul className="center-content ">
                            {this.state.warningData.map((item, index) => {
                              return (
                                        <li key={index}><span>{item.jqDescription}</span><span style={{ 'textAlign': 'right' }}>{item.time}</span></li>
                                    )
                            }
                            )}
                        </ul>
                    </div>
                    <div className={this.state.centerScrollNews ? 'scroll' : 'scroll hidden'} >
                        <ul className="center-content ">
                            {this.state.warningData.map((item, index) => {
                              return (
                                        <li key={index}><span>{item.jqDescription}</span><span style={{ 'textAlign': 'right' }}>{item.time}</span></li>
                                    )
                            }
                            )}
                        </ul>
                    </div>

                </div>
                <RadioGroup onChange={(e) => this.ChangeRadio(e.target.value)} defaultValue="0" className="all_radio_group">
                    {
                        this.state.radioGroup.map((item, index) => {
                          return (
                                <Radio key={item.id} value={item.params} className="">{item.text}</Radio>
                            )
                        })
                    }
                </RadioGroup>

                <ChartMap data={this.state.chartMap} status={this.state.allOrSingle} geo={this.state.geo}
                  radioSelect={this.state.radioSelect} callbackData={this.mapCallback.bind(this)}
                  className="chart-map" id="chartMap" address={this.state.address}
                />
            </div>
            <div className="right">
                <div className="chart_box" id="optionR1">
                    <ChartLineSingle data={this.state.chartRight1} address={this.state.address} timeStyle={this.state.timeFormat} />
                </div>
                <div className="chart_box" id="optionR2">
                    <ChartLineGreen data={this.state.chartRight2} address={this.state.address} timeStyle={this.state.timeFormat} />
                </div>
                <div className="chart_box" id="optionR3">
                    <ChartBarThread data={this.state.chartRight3} address={this.state.address} timeStyle={this.state.timeFormat} />
                </div>
                <div className="chart_box" id="optionR4">
                    <ChartLinePurple data={this.state.chartRight4} address={this.state.address} timeStyle={this.state.timeFormat} />
                </div>
                <div className="chart_box" id="optionR5">
                    <ChartBarManRight data={this.state.chartRight5} title="重点人员居住旅馆TOP排名情况" address={this.state.address} />
                </div>
                <div className="chart_box" id="optionR6">
                    <ChartLineBlue data={this.state.chartRight6} address={this.state.address} timeStyle={this.state.timeFormat} />
                </div>
            </div>
        </div>
        <TimeLine getTime={this.time.bind(this)} />

    </div>

    // <div id="chartPanel" className="panel panel-success chartPanel display-none">
    //     <div id="centerChart" style="width: 100%;height: 100%"></div>
    //     <div style="position: absolute;top:0;right: 0;">
    //     <span id="closeChartPanel" className="btn">关闭</span>
    //     </div>
    //     </div>
    )
  }


}
