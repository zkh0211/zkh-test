/**
 * Created by lpsh0 on 2017/10/24.
 */
import React, {Component} from 'react';
import 'echarts'
import echarts from 'echarts'
import 'echarts/lib/chart/pictorialBar'
import blackMan from '../../../images/stateAnalysis/black.png'
import blueMan from '../../../images/stateAnalysis/blue.png'
//man是人的意思，这个echart图是一个个小人组成的
export default class ChartBarMan extends Component {
    constructor(props) {
        super(props);
        this.option = {
            // id: 'optionL6',
            color: ['#1472ED', '#1472ED'],
            title: {
                text: '太原市案件嫌疑人民族情况排名',
                left: 'center',
                top: '0',
                textStyle: {
                    color: 'rgb(255,255,255)',
                    fontWeight: 'lighter',
                    fontSize: '',
                    fontFamily: '宋体'
                }
            },
            tooltip: {
                formatter: '{b0}:{c0}人',
                textStyle: {
                    color: 'rgb(255,255,255)',
                    fontWeight: 'lighter',
                    fontSize: '',
                    fontFamily: '宋体'
                }
            },
            xAxis: {
                show: false,
                max: 200
            },
            yAxis: [{
                data: [],
                inverse: true,
                axisTick: {show: false},
                axisLine: {show: false},
                axisLabel: {
                        formatter: function (val) {
                            return val
                        },
                        textStyle: {
                            color: 'rgb(255,255,255)',
                            fontWeight: 'lighter',
                            fontSize: '',
                            fontFamily: '宋体'
                        }
                    }
                },
                {
                    data: [],
                    inverse: true,
                    axisTick: {show: false},
                    axisLine: {show: false},
                    axisLabel: {
                        formatter: function (val) {
                            return val
                        },
                        textStyle: {
                            color: 'rgb(255,255,255)',
                            fontWeight: 'lighter',
                            fontSize: '',
                            fontFamily: '宋体'
                        }
                    }
                }
            ],
            legend: {
                show: false
            },
            grid: {
                left: 'left',
                // right: 0,
                top: 'bottom',
                width: '85%',
                height: '85%',
                containLabel: true
            },
            series: [
                {
                    name:'realValue',
                    type: 'pictorialBar',
                    symbol: 'image://'+blueMan,
                    symbolRepeat: 'fixed',
                    symbolMargin: '5%',
                    symbolClip: true,
                    symbolSize: [6, 14],
                    symbolBoundingData: 200,
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: '{c}人',
                            textStyle: {
                                color: 'rgb(255,255,255)',
                                fontWeight: 'lighter',
                                fontSize: '',
                                fontFamily: '宋体'
                            }
                        }
                    },
                    data: [],
                    z: 10,
                    animationDelay: function (idx) {
                        return idx * 100;
                    },
                    animationEasing: 'elasticOut'
                },
                {
                    name:'background',
                    type: 'pictorialBar',
                    itemStyle: {
                        normal: {
                            opacity: 1
                        }
                    },

                    symbolRepeat: 'fixed',
                    symbolMargin: '5%',
                    symbol: 'image://'+blackMan,
                    symbolSize: [6, 14],
                    symbolBoundingData: 200,
                    data: [],
                    z: 5
                }
            ]
        }
    }
    initOption(newProps) {
        echarts.dispose(this.element);
        this.myChart = echarts.init(this.element);
        let echartWidth = this.element.clientWidth;
        this.option.title.textStyle.fontSize = echartWidth * 0.05;
        this.option.yAxis[0].axisLabel.textStyle.fontSize = echartWidth * 0.03;
        this.option.yAxis[1].axisLabel.textStyle.fontSize = echartWidth * 0.03;
        this.option.title.text = newProps.address + newProps.title;
        this.option.yAxis[0].data = [];
        this.option.yAxis[1].data = [];
        this.option.series[0].data = [];
        this.option.series[1].data = [];
        this.option.series[0].symbolBoundingData = 200;
        this.option.series[1].symbolBoundingData = 200;
        this.option.xAxis.max = 200;
        if (newProps.data.length != 0) {
            if(newProps.lossFlag !='true'){
                this.option.xAxis.max = newProps.data[0]['count'];
                this.option.series[0].symbolBoundingData = newProps.data[0]['count'];
                this.option.series[1].symbolBoundingData = newProps.data[0]['count'];
                this.option.series[0].label.normal.show = true;
                for (var j = 0; j < newProps.data.length; j++) {
                    this.option.yAxis[0].data[j] = newProps.data[j]['userEthnicty'];
                    this.option.series[0].data[j] = newProps.data[j]['count'];
                    this.option.series[1].data[j] = newProps.data[j]['count'];
                }
            }else {
                this.option.xAxis.max = newProps.data[0].deathNum;
                this.option.series[0].symbolBoundingData = newProps.data[0].deathNum;
                this.option.series[1].symbolBoundingData = newProps.data[0].deathNum;
                this.option.series[0].label.normal.show = false;
                // for (var j = 0; j < newProps.data.length; j++) {
                //     this.option.yAxis[0].data[j] = newProps.data[j].caseName;
                //     this.option.yAxis[1].data[j] = newProps.data[j].lossMoney
                //         +'万元；死'+newProps.data[j].deathNum+'人；伤'+newProps.data[j].hurtNum+'人';
                //     this.option.series[0].data[j] = newProps.data[j].deathNum;
                //     this.option.series[1].data[j] = newProps.data[j].deathNum;
                // }
            }
        }
        this.myChart.setOption(this.option, '',true);
    }

    shouldComponentUpdate(newProps) {
        if (this.props.data !== newProps.data) {
            this.initOption(newProps);
            return true;
        } else {
            return false;
        }
    }

    render() {
        return <div style={{width: '100%', height: '100%'}} ref={(div) => this.element = div}></div>
    }
}