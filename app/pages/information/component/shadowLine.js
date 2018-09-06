/**
 * Created by GTR on 2017/9/13.
 */
import  React ,{ Component } from 'react';
import echarts from 'echarts'
import Zs from '../../../images/newsCenter/zs.png'

export default class ShadowLine extends Component{

    // constructor(props){
    //     super(props);
    // }
    initLine(nextProps){
           let seriesList=[];
        nextProps.data.forEach((obj,index)=>{
            let  value=  {
                name:obj.name,
                type:'line',
                smooth:true,
                symbol:'none',
                areaStyle:{
                    normal:{
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 0.5,
                            colorStops: [{
                                offset: 0, color: '#fdb43a' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'transparent' // 100% 处的颜色
                            }],
                        }
                    }
                },
                data:obj.list
            };
            seriesList.push(value)
        })

        echarts.dispose(this.element);
        this.myChart = echarts.init(this.element);
        // 绘制图表
        this.option = {
            color:['#fdb43a','#6ffa82','#7196ff'],
            tooltip : {
                trigger: 'axis',
                textStyle:{
                    fontSize:16
                }
            },
            grid:{
                left:'10%',
                top:'5%',
                width:'80%',
                height:'80%'
            },
            legend: {
                show:'true',
                bottom:'2%',
                itemWidth:8,
                textStyle:{
                    color:'white',
                    fontSize:16
                },
               // data:nextProps.tl
            },
            /* toolbox: {
             show : true,
             feature : {
             mark : {show: true},
             dataView : {show: true, readOnly: false},
             magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
             restore : {show: true},
             saveAsImage : {show: true}
             }
             },*/
            //calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    axisLine:{
                        show:true,
                        lineStyle:{
                            color:'#ffffff',
                        }
                    },
                    axisLabel:{
                        color:'#ffffff',
                        fontSize:16
                    },
                    axisTick:{
                        inside:true
                    },
                    data : nextProps.xValue
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLine:{
                        show:true,
                        lineStyle:{
                            color:'#ffffff',
                        }
                    },
                    axisLabel:{
                        color:'#ffffff',
                        fontSize:16
                    },
                    splitLine:{show:false}
                }
            ],
            series : seriesList
               /* [

                {
                    name:'处警',
                    type:'line',
                    smooth:true,
                    symbol:'none',
                    areaStyle:{
                        normal:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 0.5,
                                colorStops: [{
                                    offset: 0, color: '#fdb43a' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                            }
                        }
                    },
                    data:cjjs
                },
                {
                    name:'接警',
                    type:'line',
                    smooth:true,
                    symbol:'none',
                    areaStyle:{
                        normal:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 0.5,
                                colorStops: [{
                                    offset: 0, color:  '#6ffa82' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                            }
                        }
                    },
                    data:jjjs
                },
                {
                    name:'反馈',
                    type:'line',
                    smooth:true,
                    symbol:'none',
                    areaStyle:{
                        normal:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 0.5,
                                colorStops: [{
                                    offset: 0, color:  '#7196ff' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                            }
                        }
                    },
                    data:yxjqjs
                }
            ]*/
        };

        this.myChart.setOption(this.option,true);


    }


    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.data !== nextProps.data){
            this.initLine(nextProps);
            return true;
        }else{
            return false;
        }

    }

    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
    }
    render(){
        return <div className="echartsCon">
            <div className="echartsTitle"><span>{this.props.title}</span><img src={Zs} alt="pic"/></div>
            <div ref={(div)=>this.element=div } className="echartsInner"></div>
        </div>
    }

}