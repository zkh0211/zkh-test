
import React, {Component} from 'react';
import echarts from 'echarts'
import blackMan from '../../../images/stateAnalysis/black.png'
import blueMan from '../../../images/stateAnalysis/blue.png'
//man是人的意思，这个echart图是一个个小人组成的
export default class ChartBarManRight extends Component {
    constructor(props) {
        super(props);
        this.option = {
            id: 'optionL6',
            color: ['#1472ED', '#1472ED'],
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
                // formatter: '{b0}:{c0}人',
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
            yAxis: {
                data: [],
                inverse: true,
                axisTick: {show: false},
                axisLine: {show: false},
                axisLabel: {
                    formatter: function (val) {
                        return val.substr(0, 4)
                    },
                    textStyle: {
                        color: 'rgb(255,255,255)',
                        fontWeight: 'lighter',
                        fontSize: '',
                        fontFamily: '宋体'
                    }
                }
            },
            legend: {
                show: false
            },
            grid: {
                left: 'left',
                right: 0,
                top: 'bottom',
                width: '83%',
                height: '85%',
                containLabel: true
            },
            series: [
                {
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
                }]
        }
    }

    initOption(newProps) {
        echarts.dispose(this.element);
        this.myChart = echarts.init(this.element);
        let echartWidth = this.element.clientWidth;
        this.option.title.textStyle.fontSize = echartWidth * 0.06;
        this.option.yAxis.axisLabel.textStyle.fontSize = echartWidth * 0.04;
        this.option.series[0].label.normal.textStyle.fontSize = echartWidth * 0.04;
        this.option.title.text = newProps.address + newProps.title;
        this.option.yAxis.data = [];
        this.option.series[0].data = [];
        this.option.series[1].data = [];
        this.option.series[0].symbolBoundingData = 200;
        this.option.series[1].symbolBoundingData = 200;
        this.option.xAxis.max = 200;
        if (newProps.data.length != 0) {
            this.option.xAxis.max = newProps.data[0]['rs'];
            this.option.series[0].symbolBoundingData = newProps.data[0]['rs'];
            this.option.series[1].symbolBoundingData = newProps.data[0]['rs'];
            for (var j = 0; j < newProps.data.length; j++) {
              /*  this.option.yAxis.data[j] = newProps.data[j]['name'];
                this.option.series[0].data[j] = newProps.data[j]['sl'];
                this.option.series[1].data[j] = newProps.data[j]['sl'];*/
                this.option.yAxis.data[j] = newProps.data[j]['jc'];
                this.option.series[0].data[j] = {name:newProps.data[j]['mc'],value:newProps.data[j]['rs'],tooltip:{formatter: function(params){ return (params.data.name+params.data.value+'人')}} };
                this.option.series[1].data[j] = {name:newProps.data[j]['mc'],value:newProps.data[j]['rs'],tooltip:{formatter:function(params){ return (params.data.name+params.data.value+'人')}}}

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