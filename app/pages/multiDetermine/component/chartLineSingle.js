/**
 * Created by lpsh0 on 2017/10/24.
 */
import React, {Component} from 'react';
import echarts from 'echarts'
import yujing from '../../../images/stateAnalysis/yujing.png'

//single是单独的意思，这个echart图是单条线的图
export default class ChartLineSingle extends Component {
    constructor(props) {
        super(props);
        this.option = {
            id: 'optionR1',
            color: ['#F7FBFF'],
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
                formatter: '{b}{a}:{c}起',
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
                    boundaryGap: false,
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
                        formatter: '{value}起',
                        textStyle: {
                            color: 'rgb(255,255,255)',
                            fontWeight: 'lighter',
                            fontSize: '',
                            fontFamily: '宋体'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'black',
                            type: 'dashed',
                            opacity: 0.5
                        }
                    }
                }
            ],
            series: [
                {
                    name: '发案数量',
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                {
                                    offset: 0, color: '#1C1C34'
                                },
                                {
                                    offset: 1, color: '#502341'
                                }
                            ], false),
                            opacity: 0.6
                        }
                    },
                    markPoint: {
                        symbol: 'image:'+yujing,
                        clipOverflow: false,
                        symbolSize: [25, 15],
                        symbolOffset: [0, '-50%'],
                        top: 'top',
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: 'black',
                                    fontWeight: 'lighter',
                                    fontSize: '',
                                    fontFamily: '宋体'
                                }
                            }
                        },
                        data: [
                            {
                                name: '最小值',
                                type: 'min'
                            },
                            {
                                name: '最大值',
                                type: 'max'
                            }
                        ]
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
        this.option.title.textStyle.fontSize = echartWidth * 0.05;
        this.option.xAxis[0].axisLabel.textStyle.fontSize = echartWidth * 0.035;
        this.option.yAxis[0].axisLabel.textStyle.fontSize = echartWidth * 0.035;
        this.option.series[0].markPoint.label.normal.textStyle.fontSize = echartWidth * 0.035;
        // this.option.title.textStyle.fontSize = echartWidth * 0.04;
        //this.option.tooltip.formatter = '{a}年{b}月:{c}起';//浮动提示框格式
        this.option.title.text = newProps.address + newProps.title;
        // this.option.series[0].name = data['caseNumList'][0]['year'];
        this.option.xAxis[0].data = [];
        this.option.series[0].data = [];
        if(newProps.data !=''){
            // if (newProps.timeStyle == 'year' ) {//传入参数为年份时
                for (let i = 0; i < newProps.data.length; i++) {
                    let name = ''
                    if (newProps.timeStyle == 'month')
                        name = newProps.data[i]['timeStage'].substr(5);
                    else if(newProps.timeStyle == 'day'){
                        let cache = newProps.data[i]['timeStage'];
                        name = cache.substr(cache.indexOf('月')+1);
                    }
                    else
                        name = newProps.data[i]['timeStage'];
                    this.option.xAxis[0].data[i] = name;
                    this.option.series[0].data[i] = newProps.data[i]['count'];
                }
            /*}
            else if (newProps.timeStyle == 'month') {//传入参数为年份时
                for (let i = 0; i < newProps.data.length; i++) {
                    this.option.xAxis[0].data[i] = newProps.data[i]['month'] + '月';
                    this.option.series[0].data[i] = newProps.data[i]['sl'];
                }
            }
            else if (newProps.timeStyle == 'day') {//传入参数为月份时
                for (let i = 0; i < newProps.data.length; i++) {
                    this.option.xAxis[0].data[i] = newProps.data[i]['day'] + '日';
                    this.option.series[0].data[i] = newProps.data[i]['sl'];
                }
            }
            else if (newProps.timeStyle == 'hour' ) {//传入参数为日时
                for (let i = 0; i < newProps.data.length; i++) {
                    this.option.xAxis[0].data[i] = newProps.data[i]['hour'] + '时';
                    this.option.series[0].data[i] = newProps.data[i]['sl'];
                }
            }*/
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