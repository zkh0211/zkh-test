/**
 * Created by lpsh0 on 2017/10/24.
 */
import React, {Component} from 'react';
import echarts from 'echarts'
import bgPic from '../../../images/stateAnalysis/L4bg.png'
//dial是表盘的意思，这个echart图的背景像个钟表的表盘
export default class ChartPieDial extends Component {
    constructor(props) {
        super(props);
        this.option = {
            id: 'optionL4',
            graphic: {
                    type: 'image',
                    id: 'L4bg',
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
            color: ['#F7BA2B', '#0D7BEE', '#EC7E46', '#35A7FF', '#32D1CF'],
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
                    text: '',
                    left: 'center',
                    top: '2%',
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
                orient: 'horizontal',
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
                    name: '重点人员占比',
                    type: 'pie',
                    radius: ['50%', '60%'],
                    center: ['50%', '50%'],
                    avoidLabelOverlap: true,
                    hoverAnimation: true,
                    startAngle: 180,
                    clockwize: false,
                    selectedOffset: 5,
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
                }
            ]
        };
    }

    initOption(newProps) {
        echarts.dispose(this.element);
        this.myChart = echarts.init(this.element);
        let echartWidth = this.element.clientWidth;
        this.option.graphic.style.width = this.option.graphic.style.height = echartWidth * 0.32;
        this.option.title[0].textStyle.fontSize = echartWidth * 0.04;
        this.option.title[1].textStyle.fontSize = echartWidth * 0.05;
        this.option.title[0].subtextStyle.fontSize = echartWidth * 0.07;
        this.option.legend.textStyle.fontSize = echartWidth * 0.035;
        this.option.series[0].label.normal.textStyle.fontSize = echartWidth * 0.035;
        this.option.title[1].text = newProps.address + newProps.title;
        var sum = 0;
        if(newProps.data.length > 0){
            for (var i = 0; i < newProps.data.length; i++) {
                sum += newProps.data[i]['value'];
                this.option.legend.data[i] = newProps.data[i]['name'];

            }
            this.option.series[0].data = newProps.data
            if(this.option.series[0].data.length>2)
                this.option.series[0].data[0].selected = true;
        }else {
            this.option.series[0].data = [];
        }
        this.option.title[0].text = newProps.midTitle;
        this.option.title[0].subtext = sum;
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