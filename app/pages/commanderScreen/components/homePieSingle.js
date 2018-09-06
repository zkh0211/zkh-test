import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'echarts'
import echarts from 'echarts'
import Divider from 'antd/lib/divider';
import Pieback from '../../../images/common/pie-bg.png'

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
                        bottom: '45%',
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
                    right: '5%',
                    bottom: '0',
                    textStyle: {
                        color: '#C4DBF3',
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
                        name: '110警情',
                        type: 'pie',
                        radius: ['21%', '27%'],
                        center: ['16.65%', '22.65%'],
                        avoidLabelOverlap: true,
                        hoverAnimation: true,
                        startAngle: 180,
                        // clockwize: true,
                        selectedOffset: '5',
                        label: {
                            normal: {
                                show: false,
                                position: 'center',
                                formatter: function(params){
                                    return params.seriesName
                                },
                                textStyle: {
                                    fontWeight: '400',
                                    fontSize: '14',
                                    fontFamily: '宋体',
                                    color: '#C4DBF3',
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
                    },
                    {
                        name: '上报文件',
                        type: 'pie',
                        radius: ['21%', '27%'],
                        center: ['49.95%', '22.65%'],
                        avoidLabelOverlap: true,
                        hoverAnimation: true,
                        startAngle: 180,
                        // clockwize: true,
                        selectedOffset: '5',
                        label: {
                            normal: {
                                show: false,
                                position: 'center',
                                formatter: function(params){
                                    return params.seriesName
                                },
                                textStyle: {
                                    fontWeight: '400',
                                    fontSize: '14',
                                    fontFamily: '宋体',
                                    color: '#C4DBF3',
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
                    },
                    {
                        name: '上级指令',
                        type: 'pie',
                        radius: ['21%', '27%'],
                        center: ['83.28%', '22.65%'],
                        avoidLabelOverlap: true,
                        hoverAnimation: true,
                        startAngle: 180,
                        // clockwize: true,
                        selectedOffset: '5',
                        label: {
                            normal: {
                                show: false,
                                position: 'center',
                                formatter: function(params){
                                    return params.seriesName
                                },
                                textStyle: {
                                    fontWeight: '400',
                                    fontSize: '14',
                                    fontFamily: '宋体',
                                    color: '#C4DBF3',
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
                    },
                    {
                        name: '反恐维稳',
                        type: 'pie',
                        radius: ['21%', '27%'],
                        center: ['16.65%', '52.98%'],
                        avoidLabelOverlap: true,
                        hoverAnimation: true,
                        startAngle: 180,
                        // clockwize: true,
                        selectedOffset: '5',
                        label: {
                            normal: {
                                show: false,
                                position: 'center',
                                formatter: function(params){
                                    return params.seriesName
                                },
                                textStyle: {
                                    fontWeight: '400',
                                    fontSize: '14',
                                    fontFamily: '宋体',
                                    color: '#C4DBF3',
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
                    },
                    {
                        name: '合成请求',
                        type: 'pie',
                        radius: ['21%', '27%'],
                        center: ['49.95%', '52.98%'],
                        avoidLabelOverlap: true,
                        hoverAnimation: true,
                        startAngle: 180,
                        // clockwize: true,
                        selectedOffset: '5',
                        label: {
                            normal: {
                                show: false,
                                position: 'center',
                                formatter: function(params){
                                    return params.seriesName
                                },
                                textStyle: {
                                    fontWeight: '400',
                                    fontSize: '14',
                                    fontFamily: '宋体',
                                    color: '#C4DBF3',
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
                    },
                    {
                        name: '普通情报',
                        type: 'pie',
                        radius: ['21%', '27%'],
                        center: ['83.28%', '52.98%'],
                        avoidLabelOverlap: true,
                        hoverAnimation: true,
                        startAngle: 180,
                        // clockwize: true,
                        selectedOffset: '5',
                        label: {
                            normal: {
                                show: false,
                                position: 'center',
                                formatter: function(params){
                                    return params.seriesName
                                },
                                textStyle: {
                                    fontWeight: '400',
                                    fontSize: '14',
                                    fontFamily: '宋体',
                                    color: '#C4DBF3',
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
                    },
                    {
                        name: '警综案件',
                        type: 'pie',
                        radius: ['21%', '27%'],
                        center: ['16.65%', '83.31%'],
                        avoidLabelOverlap: true,
                        hoverAnimation: true,
                        startAngle: 180,
                        // clockwize: true,
                        selectedOffset: '5',
                        label: {
                            normal: {
                                show: false,
                                position: 'center',
                                formatter: function(params){
                                    return params.seriesName
                                },
                                textStyle: {
                                    fontWeight: '400',
                                    fontSize: '14',
                                    fontFamily: '宋体',
                                    color: '#C4DBF3',
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
                    }
                    ]
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
            for(let key in data){
                if(key==='110警情'){
                    // this.state.optionzdryzb.legend.data[0] = '待合成'
                    for(let ckey in data['110警情'][0]){
                        if(ckey==='todo'){
                            this.state.optionzdryzb.legend.data[0] = '待合成'
                            this.state.optionzdryzb.series[0].data[0] = {
                                name: '待合成',
                                value: data['110警情'][0]['todo'],

                            };
                        }
                        if(ckey==='doing'){
                            this.state.optionzdryzb.legend.data[1] = '合成中'
                            this.state.optionzdryzb.series[0].data[1] = {
                                name: '合成中',
                                value: data['110警情'][0]['doing'],
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'center',
                                        formatter: function(params){
                                            return params.seriesName
                                        },
                                        textStyle: {
                                            fontWeight: '400',
                                            fontSize: '15',
                                            fontFamily: '宋体',
                                            color: '#C4DBF3',
                                        }
                                    },

                                },
                            };
                        }
                        if(ckey==='submit'){
                            this.state.optionzdryzb.legend.data[2] = '已上报'
                            this.state.optionzdryzb.series[0].data[2] = {
                                name: '已上报',
                                value: data['110警情'][0]['submit'],
                            };
                        }
                        if(ckey==='done'){
                            this.state.optionzdryzb.legend.data[3] = '已研判'
                            this.state.optionzdryzb.series[0].data[3] = {
                                name: '已研判',
                                value: data['110警情'][0]['done'],
                            };
                        }
                    }
                }
                if(key==='上报文件'){
                    // this.state.optionzdryzb.legend.data[0] = '待合成'
                    for(let ckey in data['上报文件'][0]){
                        if(ckey==='todo'){
                            this.state.optionzdryzb.series[1].data[0] = {
                                name: '待合成',
                                value: data['上报文件'][0]['todo'],
                            };
                        }
                        if(ckey==='doing'){
                            this.state.optionzdryzb.legend.data[1] = '合成中'
                            this.state.optionzdryzb.series[1].data[1] = {
                                name: '合成中',
                                value: data['上报文件'][0]['doing'],
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'center',
                                        formatter: function(params){
                                            return params.seriesName
                                        },
                                        textStyle: {
                                            fontWeight: '400',
                                            fontSize: '15',
                                            fontFamily: '宋体',
                                            color: '#C4DBF3',
                                        }
                                    },

                                },
                            };
                        }
                        if(ckey==='submit'){
                            this.state.optionzdryzb.legend.data[2] = '已上报'
                            this.state.optionzdryzb.series[1].data[2] = {
                                name: '已上报',
                                value: data['上报文件'][0]['submit'],
                            };
                        }
                        if(ckey==='done'){
                            this.state.optionzdryzb.legend.data[3] = '已研判'
                            this.state.optionzdryzb.series[1].data[3] = {
                                name: '已研判',
                                value: data['上报文件'][0]['done'],
                            };
                        }
                    }
                }
                if(key==='上级指令'){
                    // this.state.optionzdryzb.legend.data[0] = '待合成'
                    for(let ckey in data['上级指令'][0]){
                        if(ckey==='todo'){
                            this.state.optionzdryzb.series[2].data[0] = {
                                name: '待合成',
                                value: data['上级指令'][0]['todo'],
                            };
                        }
                        if(ckey==='doing'){
                            this.state.optionzdryzb.series[2].data[1] = {
                                name: '合成中',
                                value: data['上级指令'][0]['doing'],
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'center',
                                        formatter: function(params){
                                            return params.seriesName
                                        },
                                        textStyle: {
                                            fontWeight: '400',
                                            fontSize: '15',
                                            fontFamily: '宋体',
                                            color: '#C4DBF3',
                                        }
                                    },

                                },
                            };
                        }
                        if(ckey==='submit'){
                            this.state.optionzdryzb.series[2].data[2] = {
                                name: '已上报',
                                value: data['上级指令'][0]['submit'],
                            };
                        }
                        if(ckey==='done'){
                            this.state.optionzdryzb.series[2].data[3] = {
                                name: '已研判',
                                value: data['上级指令'][0]['done'],
                            };
                        }
                    }
                }
                if(key==='反恐维稳'){
                    // this.state.optionzdryzb.legend.data[0] = '待合成'
                    for(let ckey in data['反恐维稳'][0]){
                        if(ckey==='todo'){
                            this.state.optionzdryzb.series[3].data[0] = {
                                name: '待合成',
                                value: data['反恐维稳'][0]['todo'],
                            };
                        }
                        if(ckey==='doing'){
                            this.state.optionzdryzb.series[3].data[1] = {
                                name: '合成中',
                                value: data['反恐维稳'][0]['doing'],
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'center',
                                        formatter: function(params){
                                            return params.seriesName
                                        },
                                        textStyle: {
                                            fontWeight: '400',
                                            fontSize: '15',
                                            fontFamily: '宋体',
                                            color: '#C4DBF3',
                                        }
                                    },
                                },
                            };
                        }
                        if(ckey==='submit'){
                            this.state.optionzdryzb.series[3].data[2] = {
                                name: '已上报',
                                value: data['上级指令'][0]['submit'],
                            };
                        }
                        if(ckey==='done'){
                            this.state.optionzdryzb.series[3].data[3] = {
                                name: '已研判',
                                value: data['反恐维稳'][0]['done'],
                            };
                        }
                    }
                }
                if(key==='合成请求'){
                    // this.state.optionzdryzb.legend.data[0] = '待合成'
                    for(let ckey in data['合成请求'][0]){
                        if(ckey==='todo'){
                            this.state.optionzdryzb.series[4].data[0] = {
                                name: '待合成',
                                value: data['合成请求'][0]['todo'],
                            };
                        }
                        if(ckey==='doing'){
                            this.state.optionzdryzb.series[4].data[1] = {
                                name: '合成中',
                                value: data['合成请求'][0]['doing'],
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'center',
                                        formatter: function(params){
                                            return params.seriesName
                                        },
                                        textStyle: {
                                            fontWeight: '400',
                                            fontSize: '15',
                                            fontFamily: '宋体',
                                            color: '#C4DBF3',
                                        }
                                    },

                                },
                            };
                        }
                        if(ckey==='submit'){
                            this.state.optionzdryzb.series[4].data[2] = {
                                name: '已上报',
                                value: data['合成请求'][0]['submit'],
                            };
                        }
                        if(ckey==='done'){
                            this.state.optionzdryzb.series[4].data[3] = {
                                name: '已研判',
                                value: data['合成请求'][0]['done'],
                            };
                        }
                    }
                }
                if(key==='普通情报'){
                    // this.state.optionzdryzb.legend.data[0] = '待合成'
                    for(let ckey in data['普通情报'][0]){
                        if(ckey==='todo'){
                            this.state.optionzdryzb.series[5].data[0] = {
                                name: '待合成',
                                value: data['普通情报'][0]['todo'],
                            };
                        }
                        if(ckey==='doing'){
                            this.state.optionzdryzb.series[5].data[1] = {
                                name: '合成中',
                                value: data['普通情报'][0]['doing'],
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'center',
                                        formatter: function(params){
                                            return params.seriesName
                                        },
                                        textStyle: {
                                            fontWeight: '400',
                                            fontSize: '15',
                                            fontFamily: '宋体',
                                            color: '#C4DBF3',
                                        }
                                    },
                                },
                            };
                        }
                        if(ckey==='submit'){
                            this.state.optionzdryzb.series[5].data[2] = {
                                name: '已上报',
                                value: data['普通情报'][0]['submit'],
                            };
                        }
                        if(ckey==='done'){
                            this.state.optionzdryzb.series[5].data[3] = {
                                name: '已研判',
                                value: data['普通情报'][0]['done'],
                            };
                        }
                    }
                }
                if(key==='警综案件'){
                    // this.state.optionzdryzb.legend.data[0] = '待合成'
                    for(let ckey in data['警综案件'][0]){
                        if(ckey==='todo'){
                            this.state.optionzdryzb.series[6].data[0] = {
                                name: '待合成',
                                value: data['警综案件'][0]['todo'],
                            };
                        }
                        if(ckey==='doing'){
                            this.state.optionzdryzb.series[6].data[1] = {
                                name: '合成中',
                                value: data['警综案件'][0]['doing'],
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'center',
                                        formatter: function(params){
                                            return params.seriesName
                                        },
                                        textStyle: {
                                            fontWeight: '400',
                                            fontSize: '15',
                                            fontFamily: '宋体',
                                            color: '#C4DBF3',
                                        }
                                    },

                                },
                            };
                        }
                        if(ckey==='submit'){
                            this.state.optionzdryzb.series[6].data[2] = {
                                name: '已上报',
                                value: data['警综案件'][0]['submit'],
                            };
                        }
                        if(ckey==='done'){
                            this.state.optionzdryzb.series[6].data[3] = {
                                name: '已研判',
                                value: data['警综案件'][0]['done'],
                            };
                        }
                    }
                }

            }

            this.state.optionzdryzb.title[0].text = nextProps.title
            this.myChart = echarts.init(this.element);
            this.myChart.setOption(this.state.optionzdryzb, true);
        }
        return true
    }
    render () {
        return <div style={{width: this.state.windowWidth*430, height: this.state.windowHeight*370 , position: 'relative'}} ref={(div) => this.element = div}></div>
    }

}