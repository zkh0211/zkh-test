import React, { Component } from 'react'
import { connect } from 'react-redux'
import echarts from 'echarts'
import Divider from 'antd/lib/divider';
import Pieback from '../../../images/common/pie-bg.png'

export default class Shuliangqushi extends Component {
    constructor (props) {
        super (props);
        this.state = {
            optionzdryslqs: {
                // id: 'optionR3',
                // title: {
                //     text: '重点人员数量趋势情况',
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
                    show: false
                },
                grid: {
                    left: 'center',
                    bottom: '6%',
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
                                color: '#d7d7d7',
                                width: 2
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: 'rgb(102, 102, 102)',
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
                        data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
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
                            formatter: '{value}人',
                            textStyle: {
                                color: 'rgb(102, 102, 102)',
                                fontWeight: 'lighter',
                                fontSize: '16',
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
                        markPoint : {
                            data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                            ]
                        },
                        itemStyle: {
                            normal: {
                                barBorderRadius: [5, 5, 0, 0],
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                    {
                                        offset: 0, color: '#6491fe'
                                    },
                                    {
                                        offset: 1, color: '#72ecfe'
                                    }
                                ], false)
                               
                            }
                        },
                        animationDelay: function (idx) {
                            return idx * 100;
                        },
                        animationEasing: 'elasticOut',
                        data: [['01', 18400], ['02', 15200], ['03', 11500], ['04', 147922], ['05', 14777], ['06', 784165],
                            ['07', 65820], ['08', 451841], ['09', 781514], ['10', 458445], ['11', 78145], ['12', 48684]]
                    }
                ]
            },
            windowWidth:1,
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
    shouldComponentUpdate (nextProps, nextState) {
        if (nextProps.data !== this.props.data) {
            let data = nextProps.data;
            this.myChart = echarts.init(this.element);
            if (data['peo']) {
                this.state.optionzdryslqs.xAxis[0].data = [];
                this.state.optionzdryslqs.series[0].data = [];
                for (let i = 0; i < data['peo'].length; i++) {
                    this.state.optionzdryslqs.xAxis[0].data[i] = data['peo'][i]['month'] + '月';
                    this.state.optionzdryslqs.series[0].data[i] = data['peo'][i]['sl'];
                }
            }else{
                this.state.optionzdryslqs.xAxis[0].data = [];
                this.state.optionzdryslqs.series[0].data = [];
            }
            this.myChart.setOption(this.state.optionzdryslqs, true);
        }
        return true
    }

    render () {
        return <div style={{width: this.state.windowWidth*470, height: this.state.windowHeight*300}} ref={(div) => this.element = div}></div>
    }


}