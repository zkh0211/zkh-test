import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'echarts'
import echarts from 'echarts'

export default class YuJing extends Component {
    constructor (props) {
        super (props);
        this.state = {
            optionzdryzb: {
                color: ['#3ba1ff', '#fad337','#f2637b','#975fe4','#40cbca','#7fd979'],
                title: [
                    {
                        text: '',
                        left: 'center',
                        bottom: '53%',
                        itemGap: 0,
                        textStyle: {
                            color: '#929292',
                            fontWeight: '700',
                            fontSize: '14',
                            fontFamily: '宋体'
                        },
                        subtextStyle: {
                            show:false,
                            color: '#929292',
                            fontWeight: '500',
                            fontSize: '12',
                            fontFamily: '宋体'
                        }
                    }
                ],
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)",
                    textStyle: {
                        color: 'white',
                        fontWeight: 'lighter',
                        fontSize: 14,
                        fontFamily: '宋体'
                    }
                },
                legend: {
                    show:true,
                    orient: 'horizontal',
                    left: 'center',
                    bottom: '0',
                    width:300,
                    textStyle: {
                        color: 'rgb(146,146,146)',
                        fontWeight: 'lighter',
                        fontSize: 16,
                        fontFamily: '宋体'
                    },
                    itemWidth: 5,
                    itemHeight: 10,
                    itemGap: 5,
                    data: []
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: ['55%', '66%'],
                        center: ['50%', '40%'],
                        avoidLabelOverlap: true,
                        hoverAnimation: true,
                        startAngle: 180,
                        // clockwize: true,
                        selectedOffset: '5',
                        label: {
                            normal: {
                                show: false,
                                position: 'outside',
                                formatter: function(params){
                                    return params.name+'\n'+params.percent+'%'
                                },
                                textStyle: {
                                    fontWeight: '400',
                                    fontSize: '20',
                                    fontFamily: '宋体',
                                    color: '#929292',
                                }
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false,
                                length: 10,
                                length2: 30
                            }
                        },
                        data: []
                    }]
            },
            windowWidth:1,
            windowHeight:1
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
            let data = nextProps.data[0];
            let echartWidth = this.element.clientWidth;
            this.state.optionzdryzb.legend.data = [];
            this.state.optionzdryzb.series[0].data = [];
            this.state.optionzdryzb.legend.textStyle.fontSize=16*this.state.windowWidth
            this.state.optionzdryzb.legend.itemHeight=10*this.state.windowWidth
            this.state.optionzdryzb.legend.itemGap=5*this.state.windowWidth
            this.state.optionzdryzb.legend.itemWidth=5*this.state.windowWidth
            for(let key in data){
                if(key==='todo'){
                    this.state.optionzdryzb.legend.data[0] = '待合成'
                    this.state.optionzdryzb.series[0].data[0] = {
                                name: '待合成',
                                value: data['todo'],
                            };
                }
                if(key==='doing'){
                    this.state.optionzdryzb.legend.data[1] = '合成中'
                    this.state.optionzdryzb.series[0].data[1] = {
                        name: '合成中',
                        value: data['doing'],
                    };
                }
                if(key==='submit'){
                    this.state.optionzdryzb.legend.data[2] = '已上报'
                    this.state.optionzdryzb.series[0].data[2] = {
                        name: '已上报',
                        value: data['submit'],
                    };
                }
                if(key==='done'){
                    this.state.optionzdryzb.legend.data[3] = '已研判'
                    this.state.optionzdryzb.series[0].data[3] = {
                        name: '已研判',
                        value: data['done'],
                    };
                }

            }

            this.state.optionzdryzb.title[0].text = nextProps.title
            this.myChart = echarts.init(this.element);
            this.myChart.setOption(this.state.optionzdryzb, true);
        }
        return true
    }
    render () {
        return <div style={{width: this.state.windowWidth*270, height: this.state.windowHeight*200 , position: 'relative'}} ref={(div) => this.element = div}></div>
    }

}