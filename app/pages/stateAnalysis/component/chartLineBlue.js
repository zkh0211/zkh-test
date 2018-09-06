/**
 * Created by lpsh0 on 2017/10/24.
 */
import React, {Component} from 'react';
import echarts from 'echarts'
//blue是蓝色的意思，这个echart图的一根线是蓝色的
export default class ChartLineBlue extends Component {
    constructor(props) {
        super(props);
        this.option = {
            id: 'optionR6',
            color: ['#3C9952', '#376EA6'],
            title: {
                text: '警情数量环比、同比情况',
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
                left: 'center',
                top: 'bottom',
                textStyle: {
                    color: 'rgb(255,255,255)',
                    fontWeight: 'lighter',
                    fontSize: '',
                    fontFamily: '宋体'
                },
                data: ['环比', '同比']
            },
            grid: {
                left: 'center',
                top: 'middle',
                width: '95%',
                height: '65%',
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
                        formatter: '{value}%',
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
                    name: '环比',
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    areaStyle: {
                        normal: {
                            opacity: 0.9
                        }
                    },
                    lineStyle: {
                        normal: {
                            width: 0
                        }
                    },
                    data: []
                },
                {
                    name: '同比',
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    areaStyle: {
                        normal: {
                            opacity: 0.9
                        }
                    },
                    lineStyle: {
                        normal: {
                            width: 0
                        }
                    },
                    data: []
                }
            ]
        }
    }


    initOption(newProps) {
        echarts.dispose(this.element);
        this.myChart = echarts.init(this.element);
        let echartWidth = this.element.clientWidth;
        this.option.title.textStyle.fontSize = echartWidth * 0.06;
        this.option.legend.textStyle.fontSize = echartWidth * 0.05;
        this.option.xAxis[0].axisLabel.textStyle.fontSize = echartWidth * 0.05;
        this.option.yAxis[0].axisLabel.textStyle.fontSize = echartWidth * 0.05;
        // this.option.series[0].markPoint.label.normal.textStyle.fontSize = echartWidth * 0.05;
        this.option.title.text = newProps.address + '警情数量环比、同比情况';
        this.option.xAxis[0].data = [];
        this.option.series[0].data = [];
        this.option.series[1].data = [];
        let data = newProps.data;
        if (newProps.data['huanList'] != '' && newProps.data['huanList'] != null) {
            if (newProps.timeStyle == 'year') {//传入参数为年份时
                this.option.tooltip.formatter = '{b}年<br/>环比:{c0}%<br/>同比:{c1}%';//浮动提示框格式
                for (var i = 0; i < newProps.data['huanList'].length; i++) {
                    this.option.xAxis[0].data[i] = newProps.data['huanList'][i]['year'];
                    this.option.series[0].data[i] = newProps.data['huanList'][i]['rate'];
                }
                for (var j = 0; j < newProps.data['tongList'].length; j++) {
                    this.option.series[1].data[j] = newProps.data['tongList'][j]['rate'];
                }
            }
            else if (newProps.timeStyle == 'month') {//传入参数为月份时
                this.option.tooltip.formatter = newProps.data['huanList'][0]['year'] + '年{b}月<br/>环比:{c0}%<br/>同比:{c1}%';//浮动提示框格式

                for (var i = 0; i < newProps.data['huanList'].length; i++) {
                    this.option.xAxis[0].data[i] = newProps.data['huanList'][i]['month'];
                    this.option.series[0].data[i] = newProps.data['huanList'][i]['rate'];
                }
                for (var j = 0; j < data['tongList'].length; j++) {
                    this.option.series[1].data[j] = newProps.data['tongList'][j]['rate'];
                }
            }
            else if (newProps.timeStyle == 'day') {//传入参数为天时
                this.option.tooltip.formatter = newProps.data['huanList'][0]['year'] + '年' + newProps.data['huanList'][0]['month'] + '月{b}日<br/>环比:{c0}%<br/>同比:{c1}%';//浮动提示框格式

                for (var i = 0; i < newProps.data['huanList'].length; i++) {
                    this.option.xAxis[0].data[i] = newProps.data['huanList'][i]['day'];
                    this.option.series[0].data[i] = newProps.data['huanList'][i]['rate'];

                }
                for (var j = 0; j < data['tongList'].length; j++) {
                    this.option.series[1].data[j] = newProps.data['tongList'][j]['rate'];
                }
            }
            else if (newProps.timeStyle == 'hour') {//传入参数为日时
                this.option.tooltip.formatter = newProps.data['huanList'][0]['year'] + '年' + newProps.data['huanList'][0]['month'] + '月' + newProps.data['huanList'][0]['day'] + '日{b}时<br/>环比:{c0}%<br/>同比:{c1}%';//浮动提示框格式

                for (var i = 0; i < newProps.data['huanList'].length; i++) {
                    this.option.xAxis[0].data[i] = newProps.data['huanList'][i]['hour'];
                    this.option.series[0].data[i] = newProps.data['huanList'][i]['rate'];
                }
                for (var j = 0; j < data['tongList'].length; j++) {
                    this.option.series[1].data[j] = newProps.data['tongList'][j]['rate'];
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