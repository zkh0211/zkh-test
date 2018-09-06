import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'echarts'
import echarts from 'echarts'

export default class RenyuanZhanbi extends Component {
    constructor (props) {
        super (props);
        this.state = {
            optionzdryzb: {
                color: ['#3ba1ff', '#fad337','#f2637b','#975fe4','#40cbca','#7fd979','#fb8b77'],
                title: [
                    {
                        text: '',
                        left: '24%',
                        top: '22%',
                        itemGap: 8,
                        textStyle: {
                            color: '#C4DBF3',
                            fontWeight: '700',
                            fontSize: '32',
                            textAlign:'center',
                            fontFamily: '宋体'
                        },
                        subtextStyle: {
                            color: '#C4DBF3',
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
                    top: 15,
                    bottom: 0,
                    textStyle: {
                        color: '#C4DBF3',
                        fontWeight: 'lighter',
                        fontSize: '19',
                        fontFamily: '宋体'
                    },
                    itemWidth: 5,
                    itemHeight: 20,
                    itemGap: 20,
                    data: []
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: ['40%', '50%'],
                        center: ['34%', '30%'],
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
            let L4sum = 0;
            for (let i = 0; i < data.length; i++) {
                L4sum += data[i]['sum'];
                this.state.optionzdryzb.legend.data[i] = data[i]['taskName'];
                // this.state.optionzdryzb.legend.data[i] = data[i]['taskName']+' '+data[i]['than']*100+'%'+' '+data[i]['sum'];
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
        return <div style={{width: this.state.windowWidth*315, height: this.state.windowHeight*400 , position: 'relative'}} ref={(div) => this.element = div}></div>
    }


}