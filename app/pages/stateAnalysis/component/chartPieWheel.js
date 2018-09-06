/**
 * Created by lpsh0 on 2017/10/24.
 */
import React, {Component} from 'react';
import echarts from 'echarts'
import bgPic from '../../../images/stateAnalysis/L3bg.png'
import bgPic2 from '../../../images/stateAnalysis/L3bg2.png'
//Wheel是车轮的意思，这个echart图有点像个车轮
export default class ChartPieWheel extends Component {
    constructor(props) {
        super(props);
        this.option = {
            id: 'optionL3',
            graphic: [
                {
                    type: 'image',
                    id: 'L3bg',
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
                {
                    type: 'image',
                    id: 'L3bg2',
                    right: 'center',
                    top: 'middle',
                    z: -10,
                    style: {
                        image: bgPic2,
                        width: '',
                        height: '',
                        opacity: 1
                    }
                }
            ],
            color: ['rgba(2, 29, 58, 1)', 'rgba(255, 255, 255, 0)'],
            color2: ['#02FED7', '#4AAFFF', '#FF9744', '#FFFF02', '#ff0072', '#00f6ff'],
            title: [
                {
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

                    },
                    subtextStyle: {
                        color: '#98C9FF',
                        fontWeight: 'lighter',
                        fontSize: '',
                        fontFamily: '宋体'

                    }
                },
                {
                    text: '太原市案件类型占比情况',
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
                    fontSize: '',
                    fontFamily: '宋体'
                }
            },
            legend: {
                show:false,
                selectedMode: false,
                left: 'center',
                top: 'bottom',
                textStyle: {
                    color: 'rgb(255,255,255)',
                    fontSize: '',
                    fontWeight: 'lighter',
                    fontFamily: '宋体'
                },
                itemWidth: 10,
                itemHeight: 10,
                itemGap: 5,
                data: []
            },
            series: [
                {
                    name: '案件类型占比',
                    type: 'pie',
                    radius: ['40%', '46.1%'],
                    center: ['50%', '50%'],
                    hoverAnimation: false,
                    avoidLabelOverlap: true,
                    label: {
                        normal: {
                            show: false,
                            position: 'outside',
                            formatter: '{d}%'

                        },

                        emphasis: {
                            show: true
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
                    name: '案件类型占比',
                    type: 'pie',
                    radius: ['46%', '52.1%'],
                    center: ['50%', '50%'],
                    hoverAnimation: false,
                    avoidLabelOverlap: true,
                    label: {
                        normal: {
                            show: false,
                            position: 'outside',
                            formatter: '{d}%'
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            opacity: 0.8
                        }
                    },
                    data: []
                },
                {
                    name: '案件类型占比',
                    type: 'pie',
                    radius: ['52%', '55%'],
                    center: ['50%', '50%'],
                    hoverAnimation: false,
                    avoidLabelOverlap: true,
                    label: {
                        normal: {
                            show: false,
                            position: 'outside',
                            formatter: '{d}%'
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            opacity: 0.5
                        }
                    },
                    data: []
                },
                {
                    name: '',
                    type: 'pie',
                    radius: ['40%', '55%'],
                    center: ['50%', '50%'],
                    hoverAnimation: false,
                    tooltip: {
                        trigger: 'item',
                        formatter: ' ',
                        backgroundColor: 'rgba(0,0,0,0)'
                    },
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: []
                },
                {
                    name: '案件类型占比',
                    type: 'pie',
                    radius: ['40%', '55%'],
                    center: ['50%', '50%'],
                    hoverAnimation: false,
                    avoidLabelOverlap: true,
                    label: {
                        normal: {
                            show: true,
                            position: 'outside',
                            formatter: '{d}%',
                            textStyle: {
                                fontSize: '',
                                fontWeight: 'lighter',
                                fontFamily: '宋体'
                            }
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            opacity: 0
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
        this.option.graphic[0].style.width = this.option.graphic[0].style.height = echartWidth * 0.29;
        this.option.graphic[1].style.width = this.option.graphic[1].style.height = echartWidth * 0.66;
        this.option.title[0].textStyle.fontSize = echartWidth * 0.06;
        this.option.title[1].textStyle.fontSize = echartWidth * 0.06;
        this.option.title[0].subtextStyle.fontSize = echartWidth * 0.07;
        this.option.legend.textStyle.fontSize = echartWidth * 0.05;
        this.option.series[4].label.normal.textStyle.fontSize = echartWidth * 0.05;
        this.option.title[1].text = newProps.address + '案件类型占比情况';
        var sum = 0;
        if (newProps.data.length > 0) {
            for (var i = 0; i < newProps.data.length; i++) {
                this.option.legend.data[i] = newProps.data[i]['name'];
                var x = i % (this.option.color2.length);
                this.option.series[0].data[i] = {
                    name: newProps.data[i]['name'],
                    value: newProps.data[i]['value'],
                    itemStyle: {
                        normal: {
                            color: this.option.color2[x]
                        }
                    }
                };
                sum += newProps.data[i]['value'];
            }
            this.option.series[1].data = this.option.series[0].data;
            this.option.series[2].data = this.option.series[0].data;
            this.option.series[4].data = this.option.series[0].data;
            this.option.series[3].data=function () {
                var data = [];
                for (var i = 0; i < 200; i++) {
                    data.push(1);
                }
                return data;
            }();

        } else {
            this.option.series[1].data = this.option.series[0].data = [];
            this.option.series[2].data = this.option.series[4].data = []
        }
        this.option.title[0].text = '案发数量';
        this.option.title[0].subtext = sum + '起';
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