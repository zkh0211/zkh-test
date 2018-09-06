/**
 * Created by lpsh0 on 2017/10/24.
 */
import React, {Component} from 'react';
import echarts from 'echarts'
import bgPic from '../../../images/stateAnalysis/L2bg.png'
//ripple是波纹的意思，这个echart图的背景是波纹形状
export default class ChartPieRipple extends Component {
    constructor(props) {
        super(props);
        this.option = {
            id: 'optionL2',
            graphic: {
                type: 'image',
                id: 'L2bg',
                right: 'center',
                top: 'middle',
                z: -10,
                style: {
                    image: bgPic,
                    width: '',
                    height: '',
                    opacity: 1
                }
            },
            color: ['#D6D672', '#C04F6A', '#C89928', '#1781B8', '#9057AA', '#89AC42', '#37A374'],
            title: [{
                text: '',
                left: 'center',
                top: '44%',
                subtext: '',
                itemGap: 0,
                textStyle: {
                    color: '#98C9FF',
                    fontWeight: 'lighter',
                    fontSize: '',
                    fontFamily: '宋体'
                }
                ,
                subtextStyle: {
                    color: '#98C9FF',
                    fontWeight: 'lighter',
                    fontSize: '',
                    fontFamily: '宋体'
                }
            },
                {
                    text: '',
                    left: 'center',
                    top: '0',
                    textStyle: {
                        color: 'rgb(255,255,255)',
                        fontWeight: 'lighter',
                        fontSize: '',
                        fontFamily: '宋体'
                    }
                }
            ],
            tooltip: {
                trigger: 'item',
                formatter: "{b}: {c} ({d}%)",
                textStyle: {
                    color: 'rgb(255,255,255)',
                    fontWeight: 'lighter',
                    // fontSize: font,
                    fontFamily: '宋体'
                }
            }
            ,
            legend: {
                formatter: function (value) {
                    return value.substr(0, 3);
                },

                left: 'center',
                bottom: 0,
                textStyle: {
                    color: 'rgb(255,255,255)',
                    fontWeight: 'lighter',
                    fontSize: '',
                    fontFamily: '宋体'
                }
                ,
                itemWidth: 10,
                itemHeight: 10,
                itemGap: 5,
                data: []
            }
            ,
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: ['55%', '60%'],
                    center: ['50%', '50%'],
                    avoidLabelOverlap: true,
                    hoverAnimation: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'outside',
                            formatter: '{c}',
                            textStyle: {
                                fontWeight: 'lighter',
                                fontSize: '',
                                fontFamily: '宋体'
                            }
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true,
                            length: 3,
                            length2: 1,
                            lineStyle: {
                                width: 0
                            }
                        }
                    },
                    itemStyle: {
                        shadowBlur: 20,
                        shadowColor: 'rgba(0, 0, 0, 1)',
                        normal: {
                            opacity: 0.8
                        }
                    },
                    data: []
                },
                {
                    name: '',
                    type: 'pie',
                    radius: ['50%', '55.1%'],
                    center: ['50%', '50%'],
                    avoidLabelOverlap: false,
                    hoverAnimation: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'outside'
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            opacity: 1
                        }
                    },
                    data: []
                },
                {
                    name: '',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    avoidLabelOverlap: false,
                    hoverAnimation: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'outside'
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            opacity: 0.2
                        }
                    },
                    data: []
                }

            ]
        };
    }

    initOption(newProps) {
        echarts.dispose(this.element);
        this.myChart = echarts.init(this.element);
        let echartWidth = this.element.clientWidth;
        this.option.graphic.style.width = this.option.graphic.style.height = echartWidth * 0.39;
        this.option.title[0].textStyle.fontSize = echartWidth * 0.06;
        this.option.title[1].textStyle.fontSize = echartWidth * 0.06;
        this.option.title[0].subtextStyle.fontSize = echartWidth * 0.07;
        this.option.legend.textStyle.fontSize = echartWidth * 0.05;
        this.option.series[0].label.normal.textStyle.fontSize = echartWidth * 0.05;
        this.option.title[1].text = newProps.address + '接报警分类占比情况';
        let sum = 0;
        if (newProps.data.length > 0) {
            for (let j = 0; j < newProps.data.length; j++) {
                this.option.legend.data[j] = newProps.data[j]['JJLX'];
                this.option.series[0].data[j] = {
                    name: newProps.data[j]['JJLX'],
                    value: newProps.data[j]['SL']
                };
                this.option.series[1].data[j] = this.option.series[0].data[j];
                this.option.series[2].data[j] = this.option.series[0].data[j];
                sum += newProps.data[j]['SL'];
            }
        } else {
            this.option.series[1].data = this.option.series[0].data = [];
            this.option.series[2].data = []
        }
        this.option.title[0].text = '报警总数';
        this.option.title[0].subtext = sum + '个';
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