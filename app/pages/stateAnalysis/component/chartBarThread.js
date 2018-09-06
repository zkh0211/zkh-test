/**
 * Created by lpsh0 on 2017/10/24.
 */
import React, {Component} from 'react';
import echarts from 'echarts'
//thread是线的意思，这个echart图的像是一条条的线
export default class ChartBarThread extends Component {
    constructor(props) {
        super(props);
        this.option = {
            id: 'optionR3',
            title: {
                text: '重点人员数量趋势情况',
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
                    name: '',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            barBorderRadius: [5, 5, 0, 0],
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                {
                                    offset: 0, color: '#C9455A'
                                },
                                {
                                    offset: 1, color: '#3F97F1'
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
        this.option.title.textStyle.fontSize = echartWidth * 0.06;
        // this.option.legend.textStyle.fontSize = echartWidth * 0.05;
        this.option.xAxis[0].axisLabel.textStyle.fontSize = echartWidth * 0.05;
        this.option.yAxis[0].axisLabel.textStyle.fontSize = echartWidth * 0.05;
        // this.option.series[0].markPoint.label.normal.textStyle.fontSize = echartWidth * 0.05;
        this.option.title.text = newProps.address + '重点人员数量趋势情况';
        this.option.xAxis[0].data = [];
        this.option.series[0].data = [];
        if (newProps.data != 0 && newProps.data != null) {
            if (newProps.timeStyle == 'year') {//传入参数为年份时
                this.option.tooltip.formatter = '{a}年{b}月:{c}人';//浮动提示框格式
                for (var i = 0; i < newProps.data.length; i++) {
                    this.option.xAxis[0].data[i] = newProps.data[i]['year'] + '年';
                    this.option.series[0].data[i] = newProps.data[i]['sl'];
                }
            }
            else if (newProps.timeStyle == 'month') {//传入参数为月份时
                this.option.tooltip.formatter = '{a}年{b}月:{c}人';//浮动提示框格式
                for (var i = 0; i < newProps.data.length; i++) {
                    this.option.xAxis[0].data[i] = newProps.data[i]['month'] + '月';
                    this.option.series[0].data[i] = newProps.data[i]['sl'];
                }
            }
            else if (newProps.timeStyle == 'day') {//传入参数为天时
                this.option.tooltip.formatter = '{a}{b}日:{c}人';//浮动提示框格式
                for (var i = 0; i < newProps.data.length; i++) {
                    this.option.xAxis[0].data[i] = newProps.data[i]['day'] + '日';
                    this.option.series[0].data[i] = newProps.data[i]['sl'];
                }
            }
            else if (newProps.timeStyle == 'hour') {//传入参数为日时
                this.option.tooltip.formatter = '{a}{b}时:{c}人';//浮动提示框格式
                for (var i = 0; i < newProps.data.length; i++) {
                    this.option.xAxis[0].data[i] = newProps.data[i]['hour'] + '时';
                    this.option.series[0].data[i] = newProps.data[i]['sl'];
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