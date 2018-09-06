import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'echarts'
import echarts from 'echarts'

export default class RenyuanZhanbi extends Component {
    constructor (props) {
        super (props);
        this.state = {
            windowWidth:1,
            windowHeight:1,
            optionzdryzb: {
                color: ['#3ba1ff', '#fad337','#f2637b','#975fe4','#40cbca','#7fd979','#fb8b77'],
                title: [
                    {
                        text: '',
                        left: '28.5%',
                        top: '38%',
                        itemGap: 8,
                        textStyle: {
                            // color: 'rgb(102, 102, 102)',
                            fontWeight: '700',
                            fontSize: '32',
                            textAlign:'center',
                            fontFamily: '宋体'
                        },
                        subtextStyle: {
                            color: 'rgb(146,146,146)',
                            fontWeight: '400',
                            fontSize: '14',
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
                    // type: 'scroll',
                    orient: 'vertical',
                    right: 10,
                    top: 0,
                    bottom: 0,
                    textStyle: {
                        color: 'rgb(152, 152, 152)',
                        fontWeight: 'lighter',
                        fontSize: 20,
                        fontFamily: '宋体'
                    },
                    itemWidth: 5,
                    itemHeight: 25,
                    itemGap: 15,
                    data: []
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: ['50%', '62%'],
                        center: ['35%', '48%'],
                        avoidLabelOverlap: true,
                        hoverAnimation: true,
                        startAngle: 180,
                        clockwize: false,
                        selectedOffset: '5',
                        label: {
                            normal: {
                                show: false,
                                position: 'outside',
                                formatter: '{d}%',
                                textStyle: {
                                    fontWeight: '400',
                                    fontSize: '28',
                                    fontFamily: '宋体',
                                    color:'rgb(51, 51, 51)'
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
                                length2: 10
                            }
                        },
                        data: []
                    }]
            },
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
            // console.log(data)
            let echartWidth = this.element.clientWidth;
            this.state.optionzdryzb.legend.data = [];
            this.state.optionzdryzb.series[0].data = [];

            let L4sum = 0;
            this.state.optionzdryzb.legend.itemHeight=25*this.state.windowWidth
            this.state.optionzdryzb.legend.itemGap=14*this.state.windowWidth
            for (let i = 0; i < data.length; i++) {
                L4sum += data[i]['sum'];
                this.state.optionzdryzb.legend.data[i] = data[i]['taskName'];
                // this.state.optionzdryzb.legend.data[i] = data[i]['taskName']+' '+data[i]['than']*100+'%'+' '+data[i]['sum'];
                // let ads = data[i]['taskName']+' '+data[i]['than']*100+'%'+' '+data[i]['sum'];
                // console.log(ads)
                this.state.optionzdryzb.series[0].data[i] = {
                    name: data[i]['taskName'],
                    value: data[i]['sum']
                };
            }
            this.state.optionzdryzb.title[0].subtext = nextProps.subTitle;
            this.state.optionzdryzb.title[0].text = L4sum ;
            this.myChart = echarts.init(this.element);
            this.myChart.setOption(this.state.optionzdryzb, true);
        }
        return true
    }
    render () {
        return <div style={{width: this.state.windowWidth*480, height: this.state.windowHeight*400 , position: 'relative'}} ref={(div) => this.element = div}></div>
    }


}