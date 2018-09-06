/**
 * Created by lpsh0 on 2017/10/24.
 */
import React, {Component} from 'react';
import echarts from 'echarts'

//strip是条板的意思，这个echart图的像是一条条的条板
export default class ChartBarStrip extends Component {
    constructor(props) {
        super(props);
        this.option = {
            id: 'optionL5',
            title: {
                text: '太原市各辖区发案数量TOP排名情况',
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
                show: true,
                trigger: 'axis',
                formatter: '{b1}: {c1}起',
                textStyle: {
                    color: 'rgb(255,255,255)',
                    fontWeight: 'lighter',
                    fontSize: '',
                    fontFamily: '宋体'
                },
                axisPointer: {
                    lineStyle: {
                        width: 0,
                        color: 'rgb(255,255,255)'
                    }
                }
            },
            legend: {
                show: false
            },
            grid: {
                left: 'left',
                top: 'bottom',
                width: '95%',
                height: '85%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'value',
                    max: 'dataMax',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            yAxis: [
                {
                    type: 'category',

                    inverse: true,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: function (val) {
                            return val.substr(val.length-3, 3)
                        },
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
                    data: []
                },
                {
                    type: 'category',

                    inverse: true,
                    // position: 'right',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: function (obj) {
                            return obj + '起'
                        },
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
                    data: []
                }
            ],
            series: [
                {
                    name: '',
                    type: 'bar',
                    barCategoryGap: '50%',
                    barGap: '-100%',
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            barBorderRadius: [5, 5, 5, 5],
                            color: '#081929',
                            borderWidth: 1,
                            borderColor: 'black'
                        }
                    },
                    animation: false,
                    data: []
                },
                {
                    name: '',
                    type: 'bar',
                    barCategoryGap: '50%',
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            barBorderRadius: [5, 5, 5, 5],
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                {
                                    offset: 0, color: '#038DFC'
                                },
                                {
                                    offset: 1, color: '#4AADB2'
                                }
                            ], false)
                        }
                    },
                    z: 10,
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
        this.option.yAxis[0].data = [];
        this.option.series[0].data= [];
        this.option.series[1].data = [];
        this.option.title.textStyle.fontSize = echartWidth * 0.06;
        this.option.yAxis[0].axisLabel.textStyle.fontSize = echartWidth * 0.04;
        this.option.yAxis[1].axisLabel.textStyle.fontSize = echartWidth * 0.04;
        this.option.title.text = newProps.address + '案发数量TOP排名情况';
        if(newProps.data.length > 0){
            for (let i = 0; i < newProps.data.length; i++) {
                if(!newProps.data[i].name){
                    newProps.data[i].name = ''
                }
                this.option.yAxis[0].data[i] = newProps.data[i]['name'];
                // this.option.yAxis[0].data[i] = newProps.data[i]['name'].substring(6).substr(0, 3);
                this.option.series[0].data[i] = newProps.data[0]['sl'];
                this.option.series[1].data[i] = {
                    name: newProps.data[i]['name'],
                    // name: newProps.data[i]['name'].substring(6).substr(0, 3),
                    value: newProps.data[i]['sl']
                };
            }
            this.option.yAxis[1].data = this.option.series[1].data;

        }else {
            this.option.series[0].data = [];
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