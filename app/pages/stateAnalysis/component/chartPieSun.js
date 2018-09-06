/**
 * Created by lpsh0 on 2017/10/24.
 */
import  React, {Component} from 'react';
import echarts from 'echarts'
import bgPic from '../../../images/stateAnalysis/L1bg.png'

export default class ChartPieSun extends Component {
    constructor(props) {
        super(props);
        this.option = {
            id: 'optionL1',
            color: ['rgba(2, 29, 58, 1)', 'rgba(255, 255, 255, 0)'],
            color2: ['#85D15A', '#6588D9','#FD6F5B','#63ECEA','#CE92ED'],
            graphic: {
                type: 'image',
                id: 'L1bg',
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
            title: [
                {
                    text: '',
                    left: 'center',
                    top: '43%',
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
                    fontWeight: 'lighter',
                    fontSize: '',
                    fontFamily: '宋体'
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
                itemWidth: 10,
                itemHeight: 10,
                itemGap: 5,
                data: []
            },
            series: [
                {
                    name: '接报警情况',
                    type: 'pie',
                    radius: ['43%', '50%'],
                    center: ['50%', '50%'],
                    avoidLabelOverlap: true,
                    hoverAnimation: false,
                    itemStyle: {
                        normal: {
                            shadowColor: 'black',
                            shadowBlur: 10
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'outside',
                            formatter: '{d}%',
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
                            show: true
                        }
                    },
                    data: []
                },
                {
                    name: '接报警情况',
                    type: 'pie',
                    radius: ['53%', '58%'],
                    center: ['50%', '50%'],
                    hoverAnimation: false,
                    avoidLabelOverlap: true,
                    label: {
                        normal: {
                            show: false,
                            position: 'outside',
                            formatter: '{d}%',
                            fontWeight: 'lighter',
                            // fontSize: font,
                            fontFamily: '宋体',
                            marginTop: '80%'

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
                    data: []
                },
                {
                    name: '',
                    type: 'pie',
                    radius: ['53%', '58%'],
                    center: ['50%', '50%'],
                    tooltip: {
                        trigger: 'item',
                        formatter: ' ',
                        backgroundColor: 'rgba(0,0,0,0)'
                    },
                    hoverAnimation: false,
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
                }

            ]
        };
    }

    initOption(newProps) {
        echarts.dispose(this.element);
        this.myChart = echarts.init(this.element);
        let echartWidth = this.element.clientWidth;
        this.option.graphic.style.width=this.option.graphic.style.height=echartWidth*0.33;
        this.option.title[0].textStyle.fontSize=echartWidth*0.06;
        this.option.title[1].textStyle.fontSize=echartWidth*0.06;
        this.option.title[0].subtextStyle.fontSize=echartWidth*0.07;
        this.option.legend.textStyle.fontSize=echartWidth*0.05;
        this.option.series[0].label.normal.textStyle.fontSize=echartWidth*0.05;
        this.option.title[1].text = newProps.address + '接报警情况';
        let sum = 0;
        if (newProps.data.length !== 0) {
            for (let i = 0; i < newProps.data.length; i++) {
                this.option.legend.data[i] = newProps.data[i]['BJFS'];
                let x = i % (this.option.color2.length);
                this.option.series[0].data[i] = this.option.series[1].data[i] = {
                    name: newProps.data[i]['BJFS'],
                    value: newProps.data[i]['SL'],
                    itemStyle: {
                        normal: {
                            color: this.option.color2[x]
                        }
                    }
                };
                sum += newProps.data[i]['SL'];
            }
        }else {
            this.option.series[0].data = this.option.series[1].data =[]
        }
        this.option.title[0].text = '报警总数';
        this.option.title[0].subtext = sum + '个';
        this.option.series[2].data=function () {
            let data = [];
            for (let i = 0; i < 200; i++) {
                data.push(1);
            }
            return data;
        }();

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