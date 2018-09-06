 /**
 * Created by GTR on 2017/9/12.
 */
import React, {Component} from 'react';
import { connect } from 'react-redux'
import './information.less';
import Cookies from 'js-cookie'
import BrokenLineLittle from "./component/brokenLineLittle";
import ShadowLine from './component/shadowLine';
import TimeLine from '../common/timeLine';
import {
    selectTotalTrend,
    selectAlarmReceive,
    selectAlarmHandle,
    selectAlarmFeedback
}from 'actions/informationAction'

@connect((state,props)=>{
    config: state.config
})
export default class InformationCenter extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
             beginTime: new Date().getFullYear().toString(),
             endTime: new Date().getFullYear().toString(),
            // beginTime: '20161010',
            // endTime: '20161031',
            data: [],
            gxjgdm: Cookies.get('gxjgdm'),
            // gxjgdm:'150104000000',

        }
    }

    time(newState) {//接收传回来的时间改变后的数据
        let time = newState.split('|');
        this.setState({
            beginTime: time[0],
            endTime: time[1]
        });
        this.selectTotalTrend();
        this.selectAlarmReceive();
        this.selectAlarmHandle();
        this.selectAlarmFeedback();
    }

    componentWillMount() {
        this.selectTotalTrend();
        this.selectAlarmReceive();
        this.selectAlarmHandle();
        this.selectAlarmFeedback();
    }

    selectTotalTrend() {
        this.props.dispatch(selectTotalTrend({gxjgdm: this.state.gxjgdm, beginTime: this.state.beginTime, endTime: this.state.endTime},(res)=>{
            if(res.status === 200){
                if(res.data.length>0){
                    let result = res['data'];
                    let xValue = [];
                    let cjjs = [];
                    let jjjs = [];
                    let yxjqjs = [];
                    let tl = [{name: '处警', icon: 'roundRect'}, {name: '接警', icon: 'roundRect'}, {
                        name: '反馈',
                        icon: 'roundRect'
                    }];
                    result.forEach((obj, index) => {
                        xValue.push(obj.tjrq);
                        cjjs.push(obj.cjjs);
                        jjjs.push(obj.jjjs);
                        yxjqjs.push(obj.yxjqjs);
                    });
                    let list = [{name: '处警', list: cjjs}, {name: '接警', list: jjjs}, {name: '反馈', list: yxjqjs}];
                    this.setState({
                        xValue: xValue,
                        data: list,
                        tl: tl
                    });
                }
            }
        }))
        

    }

    selectAlarmReceive() {
        // Request.post({
        this.props.dispatch(selectAlarmReceive({gxjgdm: this.state.gxjgdm, beginTime: this.state.beginTime, endTime: this.state.endTime},(res)=>{
            if(res.status === 200){
                if(res.data.codeSet.length>0){
                    let result = res['data'];
                    let alarmReceive = result['alarmReceive'];
                    let codeSet = result['codeSet'];

                    let xValuej = [];

                    alarmReceive.forEach((obj) => {
                        if (obj['mc2'] === codeSet[0]) {
                            xValuej.push(obj['tjrq'])
                        }
                    });


                    //图例
                    let codeSetj = codeSet.map((elem, index) => {
                        return {name: elem, icon: 'roundRect'}
                    });
                    //x轴
                    let Receivej = codeSet.map((elem, index) => {
                        let item = {
                            name: elem,
                            data: [],
                            type: 'line',
                            smooth: true,
                            symbol: 'none'
                        };
                        alarmReceive.forEach((obj) => {
                            if (obj['mc2'] === elem) {
                                item.data.push(obj['jjjs'])
                            }
                        });
                        return item
                    });
                    this.setState({
                        xValuej: xValuej,
                        dataj: Receivej,
                        tlj: codeSetj,
                    },()=>{
                    });
                }
            }
        }))
    }

    selectAlarmHandle() {
        this.props.dispatch(selectAlarmHandle({gxjgdm: this.state.gxjgdm, beginTime: this.state.beginTime, endTime: this.state.endTime},(res)=>{
            if(res.status === 200){
                if(res.data.codeSet.length>0){
                    let result = res['data'];
                    let alarmHandle = result['alarmHandle'];
                    let codeSet = result['codeSet'];
                    let xValuejc = [];

                    alarmHandle.forEach((obj) => {
                        if (obj['mc2'] === codeSet[0]) {
                            xValuejc.push(obj['tjrq'])
                        }
                    });

                    //图历
                    let codeSetjc = codeSet.map((elem, index) => {
                        return {name: elem, icon: 'roundRect'}
                    });
                    //x轴
                    let Receivejc = codeSet.map((elem, index) => {
                        let item = {
                            name: elem,
                            data: [],
                            type: 'line',
                            smooth: true,
                            symbol: 'none'
                        }
                        alarmHandle.forEach((obj) => {
                            if (obj['mc2'] === elem) {
                                item.data.push(obj['cjjs'])
                            }
                        })
                        return item
                    });
                    //console.log(Receivejc)
                    this.setState({
                        xValuejc: xValuejc,
                        datajc: Receivejc,
                        tljc: codeSetjc,
                    });
                }
            }
        }))
    }
    selectAlarmFeedback() {
        this.props.dispatch(selectAlarmFeedback({gxjgdm: this.state.gxjgdm, beginTime: this.state.beginTime, endTime: this.state.endTime},(res)=>{
            if(res.status === 200){
                if(res.data.codeSet.length>0){
                    let result = res['data'];
                    let alarmFeedback = result['alarmFeedback'];
                    let codeSet = result['codeSet'];
                    let xValuejcf = [];

                    alarmFeedback.forEach((obj) => {
                        if (obj['mc2'] === codeSet[0]) {
                            xValuejcf.push(obj['tjrq'])
                        }
                    });

                    //图历
                    let codeSetjcf = codeSet.map((elem, index) => {
                        return {name: elem, icon: 'roundRect'}
                    });
                    //x轴
                    let Receivejcf = codeSet.map((elem, index) => {
                        let item = {
                            name: elem,
                            data: [],
                            type: 'line',
                            smooth: true,
                            symbol: 'none'
                        };
                        alarmFeedback.forEach((obj) => {

                            if (obj['mc2'] === elem) {
                                item.data.push(obj['yxjqjs'])
                            }
                        });
                        return item
                    })
                    this.setState({
                        xValuejcf: xValuejcf,
                        datajcf: Receivejcf,
                        tljcf: codeSetjcf,
                    });
                }
            }
        }))
      
    }

    render() {
        return <div className="infomation-contain">
            <div className="info-contain">
                <div className="info-echarts">
                    <div className="info-echarts-con"><ShadowLine xValue={this.state.xValue} data={this.state.data} tl={this.state.tl} title="总趋势"/></div>
                    <div className="info-echarts-con"><BrokenLineLittle xValue={this.state.xValuej} dataj={this.state.dataj} tlj={this.state.tlj} title="110接警"/></div>
                    <div className="info-echarts-con"><BrokenLineLittle xValue={this.state.xValuejc} dataj={this.state.datajc} tlj={this.state.tljc} title="110处警"/></div>
                    <div className="info-echarts-con"><BrokenLineLittle xValue={this.state.xValuejcf} dataj={this.state.datajcf} tlj={this.state.tljcf} title="110反馈"/></div>
                    <div style={{clear: 'both'}}></div>
                </div>
            </div>
            <div className="timeLineCon"><TimeLine getTime={this.time.bind(this)}/></div>
        </div>
    }
}