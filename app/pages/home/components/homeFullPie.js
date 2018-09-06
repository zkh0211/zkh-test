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
                        bottom: '4%',
                        itemGap: 0,
                        textStyle: {
                            color: 'rgb(102, 102, 102)',
                            fontWeight: 600,
                            fontSize: 28,
                            fontFamily: '宋体'
                        },
                        subtextStyle: {
                            show:false,
                            color: 'rgb(102, 102, 102)',
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
                    show:false,
                    orient: 'horizontal',
                    left: 'center',
                    bottom: '0',
                    textStyle: {
                        color: 'rgb(152, 152, 152)',
                        fontWeight: 'lighter',
                        fontSize: '16',
                        fontFamily: '宋体',
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
                        radius: '65%',
                        center: ['50%', '45%'],
                        avoidLabelOverlap: true,
                        hoverAnimation: true,
                        startAngle: 180,
                        // clockwize: true,
                        selectedOffset: '12',
                        label: {
                            normal: {
                                show: true,
                                position: 'outside',
                                formatter: function(params){
                                    return params.name+'\n'+params.percent+'%'
                                },
                                textStyle: {
                                    fontWeight: '400',
                                    fontSize: 20,
                                    fontFamily: '宋体',
                                    color:'rgb(51, 51, 51)'
                                }
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true,
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

            let data = nextProps.data;
            let echartWidth = this.element.clientWidth;
            this.state.optionzdryzb.legend.data = [];
            this.state.optionzdryzb.series[0].data = [];
            this.state.optionzdryzb.series[0].label.normal.textStyle.fontSize=20*this.state.windowWidth
            this.state.optionzdryzb.title[0].textStyle.fontSize=32*this.state.windowWidth
            let L4sum = 0;
            for (let i = 0; i < data.length; i++) {
                L4sum += data[i]['YJJF'];
                this.state.optionzdryzb.legend.data[i] = data[i]['LXMC'];
                    this.state.optionzdryzb.series[0].data[i] = {
                        name: data[i]['LXMC'],
                        value: data[i]['YJJF'],
                    };


            }
            // console.log(this.state.optionzdryzb.series[0])
            // this.state.optionzdryzb.title[0].subtext = '重点人员总数';
            this.state.optionzdryzb.title[0].text = '预警总数：'+L4sum ;
            this.myChart = echarts.init(this.element);
            this.myChart.setOption(this.state.optionzdryzb, true);
        }
        return true
    }
    render () {
        return <div style={{width: this.state.windowWidth*650, height: this.state.windowHeight*400 , position: 'relative'}} ref={(div) => this.element = div}></div>
    }

}