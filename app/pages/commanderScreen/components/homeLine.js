import React, { Component } from 'react'
import { connect } from 'react-redux'
import echarts from 'echarts'
import Divider from 'antd/lib/divider';
import Pieback from '../../../images/common/pie-bg.png'

export default class Tonghuanbi extends Component {
    constructor (props) {
        super (props);
        this.state = {
            optionzdryslhbtb : {
                //id: 'optionR4',
                color: [' #2db7f5',  '#9a6be6'],
                // title: {
                //     text: '重点人员数量同比环比情况',
                //     left: 'center',
                //     top: '0',
                //     textStyle: {
                //         color: 'black',
                //         fontWeight: 'lighter',
                //         fontSize: '20',
                //         fontFamily: '宋体'
                //     }
                // },
                tooltip: {
                    trigger: 'axis',
                    textStyle: {
                        color: 'white',
                        fontWeight: 'lighter',
                        fontSize: 16,
                        fontFamily: '宋体'
                    },
                    axisPointer: {
                        lineStyle: {
                            color: 'black'
                        }
                    }
                },
                legend: {
                    left: 'right',
                    top: '0.5%',
                    textStyle: {
                        color: 'rgb(152, 152, 152)',
                        fontWeight: 'lighter',
                        fontSize: 18,
                        fontFamily: '宋体'
                    },
                    data: ['环比', '同比']
                    // data: []
                },
                grid: {
                    left: 'center',
                    bottom: '9%',
                    width: '90%',
                    height: '75%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: '#d7d7d7',
                                width: 2
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: 'rgb(102, 102, 102);',
                                fontWeight: 'lighter',
                                fontSize: 14,
                                fontFamily: '宋体'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        splitArea: {
                            show: true,
                            interval: 0,
                            areaStyle: {
                                color: ['rgba(0,0,0,0)', 'rgba(255,255,255,0.2)']
                            }
                        },
                        // data:  ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
                        data: []
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#d7d7d7',
                                width: 2
                            }
                        },
                        axisLabel: {
                            formatter: '{value}%',
                            textStyle: {
                                color: 'rgb(102, 102, 102)',
                                fontWeight: 'lighter',
                                fontSize: 16,
                                fontFamily: '宋体'
                            }
                        },
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        name: '环比',
                        type: 'line',
                        smooth: true,
                        showSymbol: false,
                        areaStyle: {
                            normal: {type: 'default',
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(213, 240, 253,1)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(213, 240, 253,1)'
                                }], false)
                            }
                        },
                        lineStyle: {
                            normal: {
                                // color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                //     {
                                //         offset: 0, color: '#7B98FE'
                                //     },
                                //     {
                                //         offset: 1, color: '#4189EE'
                                //     }
                                // ], false),
                                color: '#2db7f5',
                                // shadowColor: '#4694ff',
                                // shadowBlur: 15,
                                // shadowOffsetY: 5
                            }
                        },
                        /* data:[['01', 18400], ['02', 15200], ['03', 11500], ['04', 147922], ['05', 14777], ['06', 784165],
                         ['07', 65820], ['08', 451841], ['09', 781514], ['10', 458445], ['11', 78145], ['12', 48684]]*/
                        data: []
                    },
                    {
                        name: '同比',
                        type: 'line',
                        smooth: true,
                        showSymbol: false,
                        areaStyle: {
                            normal: {type: 'default',
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(196, 220, 242,1)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(196, 220, 242,1)'
                                }], false)
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: '#9a6be6'
                                // color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                //     {
                                //         offset: 0, color: '#FAD963'
                                //     },
                                //     {
                                //         offset: 1, color: '#FF832E'
                                //     }
                                // ], false),
                                // shadowColor: '#FF832E',
                                // shadowBlur: 15,
                                // shadowOffsetY: 5
                            }
                        },
                        /*  data:[['01', 18400], ['02', 15200], ['03', 11500], ['04', 147922], ['05', 14777], ['06', 784165],
                         ['07', 65820], ['08', 451841], ['09', 781514], ['10', 458445], ['11', 78145], ['12', 48684]]*/
                        data: []
                    }
                ]
            },
            windowWidth: 1,
            windowHeight: 1
        }
    }
    componentWillMount(){
        let width = document.documentElement.clientWidth || document.body.clientWidth;
        let height = document.documentElement.clientHeight || document.body.clientHeight;
        this.setState({
            windowWidth:width/1920,
            windowHeight:height/1080
        })
    }
   
    getYoy(cur, bef) {//计算同比环比
        return Math.round(((cur - bef) / bef) * 10000) / 100.00;
    }
   
    shouldComponentUpdate (nextProps, nextState) {
        // componentDidMount(){
        if (nextProps.data !== this.props.data) {
            let data = nextProps.data;
            if (data['huanList'] || data['tongList']) {
                this.state.optionzdryslhbtb.xAxis[0].data = [];
                this.state.optionzdryslhbtb.series[0].data = [];
                this.state.optionzdryslhbtb.series[1].data = [];
                for (let i = 0; i < data['huanList'].length; i++) {
                    this.state.optionzdryslhbtb.xAxis[0].data[i] = data['huanList'][i]['month'] + '月';
                    if (data['huanList'][i]['sl'] === 0 || data['huanList'][i]['prev_sl'] === 0) {
                        this.state.optionzdryslhbtb.series[0].data[i] = 0;
                    } else {
                        this.state.optionzdryslhbtb.series[0].data[i] = this.getYoy(data['huanList'][i]['sl'], data['huanList'][i]['prev_sl']);
                    }
                }
                for (let j = 0; j < data['tongList'].length; j++) {
                    if (data['tongList'][j]['sl'] === 0 || data['tongList'][j]['prev_sl'] === 0) {
                        this.state.optionzdryslhbtb.series[1].data[j] = 0;
                    } else {
                        this.state.optionzdryslhbtb.series[1].data[j] = this.getYoy(data['tongList'][j]['sl'], data['tongList'][j]['prev_sl']);
                    }
                }
            }else{
                this.state.optionzdryslhbtb.xAxis[0].data = [];
                this.state.optionzdryslhbtb.series[0].data = [];
                this.state.optionzdryslhbtb.series[1].data = [];
            }
            
            this.myChart = echarts.init(this.element);
            this.myChart.setOption(this.state.optionzdryslhbtb, true);
        }
        return true
    }

    render () {
        return <div style={{width: this.state.windowWidth*470, height: this.state.windowHeight*300 }} ref={(div) => this.element = div}></div>
    }


}