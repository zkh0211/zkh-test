import React, { Component } from 'react'
import 'echarts'
import echarts from 'echarts'

export default class YuJing extends Component {
    constructor (props) {
        super (props);
        this.state = {
            optionzdryzb: {
                color: ['#2db7f5', '#808bc6','#7dc856','#f9bf00'],
                title: [
                    {
                        text: '',
                        left: 'center',
                        bottom: '4%',
                        itemGap: 0,
                        textStyle: {
                            fontWeight: '600',
                            fontSize: '28',
                            fontFamily: '宋体'
                        },
                        subtextStyle: {
                            show:false,
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
                        fontWeight: 'lighter',
                        fontSize: '16',
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
                        radius: '58%',
                        center: ['50%', '55%'],
                        avoidLabelOverlap: true,
                        hoverAnimation: true,
                        startAngle: 180,
                        // clockwize: true,
                        selectedOffset: '10',
                        label: {

                            normal: {
                                show: true,
                                position: 'outside',
                                formatter: '{b|{b}}\n  {per|{d}%}  ',
                                rich: {
                                    b: {
                                        fontSize: 16,
                                        lineHeight: 33,
                                        color: '#C4DBF3',
                                    },
                                    per: {
                                        fontWeight: '500',
                                        fontSize: '22',
                                        color: '#C4DBF3',
                                        padding: [2, 4],

                                    }
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
                                length2: 20,
                                lineStyle:{
                                    color:'#fff',
                                    type:'dotted',
                                },
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
            for (var i = 0; i < data.length; i++) {
                L4sum += data[i]['YJJF'];
                this.state.optionzdryzb.legend.data[i] = data[i]['LXMC'];
                // if(i===1){
                //     this.state.optionzdryzb.series[0].data[1] = {
                //         name: data[i]['LXMC'],
                //         value: data[i]['YJJF'],
                //         selected:true,
                //     };
                // }else{
                    this.state.optionzdryzb.series[0].data[i] = {
                        name: data[i]['LXMC'],
                        value: data[i]['YJJF'],
                    };
                // }


            }
            // console.log(this.state.optionzdryzb.series[0])
            // this.state.optionzdryzb.title[0].subtext = '重点人员总数';
            // this.state.optionzdryzb.title[0].text = '预警总数：'+L4sum ;
            this.myChart = echarts.init(this.element);
            this.myChart.setOption(this.state.optionzdryzb, true);
        }
        return true
    }
    render () {
        return <div style={{width: this.state.windowWidth*455, height: this.state.windowHeight*350 , position: 'relative'}} ref={(div) => this.element = div}></div>
    }

}