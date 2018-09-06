/**
 * Created by GTR on 2017/9/12.
 */
import  React ,{ Component } from 'react';
import echarts from 'echarts'
import Zs from '../../../images/newsCenter/zs.png'

export default class BrokenLineLittle extends Component{

    initLine(nextProps){
        echarts.dispose(this.element);
        this.myChart = echarts.init(this.element);
        this.option = {
            color:['#fab3ba','#6787f0','#bb73fa','#fa5288','#e48c3c','#fdfb74','#7cfb84','#74fdf9','#e95fe6'],
            tooltip : {
                trigger: 'axis',
            
            },
            grid:{
                left:'10%',
                top:'5%',
                width:'80%',
                height:'80%'
            },
            legend: {
                show:false,
                bottom:'2%',
                width:'80%',
                itemWidth: 8,
                textStyle:{
                    color:'white',
                    fontSize:16
                },
                // data:nextProps.tlj
            },
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
            series :nextProps.dataj
        
        };

     

        this.myChart.setOption(this.option,true);
    }
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        // let ids = this.state.id;
        // this.myChart = echarts.init(this.element);
       // this.initLine(nextProps);
        // 绘制图表
        this.myChart = echarts.init(this.element);
    }
    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.dataj!== nextProps.dataj){
            this.initLine(nextProps);
            return true;
        }else{
            return false;
        }


    }
    render(){
        return <div className="echartsCon">
            <div className="echartsTitle"><span>{this.props.title}</span><img src={Zs} alt="pic"/></div>
            <div ref={(div)=>this.element=div } className="echartsInner"></div>
        </div>
    }

}
