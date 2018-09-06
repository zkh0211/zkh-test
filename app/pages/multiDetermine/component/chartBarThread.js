/**
 * Created by lpsh0 on 2017/10/24.
 */
import React, {Component} from 'react';
import echarts from 'echarts'
import bgPic from '../../../images/stateAnalysis/L2bg.png'
//thread是线的意思，这个echart图的像是一条条的线
export default class ChartBarThread extends Component {
    constructor(props) {
        super(props);
        this.option = {
            id: 'optionR3',
            title: {
                text: '',
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
                trigger: 'axis',
                textStyle: {
                    color: 'rgb(255,255,255)',
                    fontWeight: 'lighter',
                    fontSize: '',
                    fontFamily: '宋体'
                },
                axisPointer: {
                    lineStyle: {
                        color: 'rgb(255,255,255)'
                    }
                }
            },
            legend: {
                show: false
            },
            grid: {
                left: 'center',
                bottom: '5%',
                width: '95%',
                height: '75%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#3B77B6',
                            width: 2
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'rgb(255,255,255)',
                            fontWeight: 'lighter',
                            fontSize: '',
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
                            color: '#3B77B6',
                            width: 2
                        }
                    },
                    axisLabel: {
                        formatter: '{value}人',
                        textStyle: {
                            color: 'rgb(255,255,255)',
                            fontWeight: 'lighter',
                            fontSize: '',
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
                    name: '男',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            barBorderRadius: [5, 5, 0, 0],
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                {
                                    offset: 0, color: '#007ec6'
                                },
                                {
                                    offset: 1, color: '#01fce5'
                                }
                            ], false)
                        }
                    },
                    animationDelay: function (idx) {
                        return idx * 100;
                    },
                    animationEasing: 'elasticOut',
                    data: []
                },
                {
                    name: '女',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            barBorderRadius: [5, 5, 0, 0],
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                {
                                    offset: 0, color: '#c66cd7'
                                },
                                {
                                    offset: 1, color: '#3425af'
                                }
                            ], false)
                        }
                    },
                    animationDelay: function (idx) {
                        return idx * 100;
                    },
                    animationEasing: 'elasticOut',
                    data: []
                }
            ]
        };
    }

    initOption(newProps) {
        echarts.dispose(this.element);
        this.myChart = echarts.init(this.element);
        let echartWidth = this.element.clientWidth;
        this.option.title.textStyle.fontSize = echartWidth * 0.05;
        this.option.xAxis[0].axisLabel.textStyle.fontSize = echartWidth * 0.04;
        this.option.yAxis[0].axisLabel.textStyle.fontSize = echartWidth * 0.04;
        this.option.title.text = newProps.address  + newProps.title;
        this.option.xAxis[0].data = [];
        this.option.series[0].data = [];
        this.option.series[1].data = [];
        if (newProps.data != 0 && newProps.data != null) {
                // this.option.tooltip.formatter = '{a}年{b}月:{c}人';//浮动提示框格式
            for (var i = 0; i < newProps.data.legend.length; i++) {
                this.option.xAxis[0].data[i] = newProps.data.legend[i]['ageRange'];
            }
            for (var i = 0; i < newProps.data.list.length; i++) {
                this.option.series[0].data[i] = {
                    'name': newProps.data.list[i].ageRange,
                    'value': newProps.data.list[i].count
                }
            }
            for (var i = 0; i < newProps.data.listW.length; i++) {
                this.option.series[1].data[i] = {
                    'name': newProps.data.listW[i].ageRange,
                    'value': newProps.data.listW[i].count
                }
            }

        }
        this.myChart.setOption(this.option, true);
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