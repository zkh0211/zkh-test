/**
 * Created by GTR on 2017/9/13.
 */
import  React ,{ Component } from 'react';
import $ from  'jquery';
import echarts from 'echarts'
import Cookies from 'js-cookie'
import Zs from '../../../images/newsCenter/zs.png'
// import { connect } from 'react-redux'
// import {
//     selectImportantPeopleDetails
// }from 'actions/warningStaticAction'
// @connect((state, props)=>{
//     config: state.config
// })
export default class WarnBarChart extends Component{
    constructor(props){
        super(props);
        this.state={
            color:this.props.color,
            shuju:this.props.data,
            gxjgdm: Cookies.get('gxjgdm')
        };
        this.option = {
            //color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                textStyle:{
                    fontSize:16
                },
                formatter:'{b} : {c}',
            },
            grid:{
                left:'15%',
                top:'5%',
                 width:'80%',
                height:'80%'
            },
            xAxis : [
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
                    splitLine:{show:false},
                    axisTick:{
                        inside:true
                    }
                }
            ],
            yAxis : [

                {
                    type : 'category',
                    inverse:true,
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
                    data : [],
                    axisTick: {
                        alignWithLabel: true,
                        inside:true,
                    }
                }
            ],
            series : [
                {
                    name:'',
                    type:'bar',
                    barWidth: '30%',
                    itemStyle:{
                        normal:{
                            color:this.state.color,
                            barBorderRadius:10,
                        }

                    },
                    label:{
                        normal: {
                            show: true,
                            color:'#ffffff',
                            position: 'right',
                            formatter: '{c}',
                            fontSize:16
                        }
                    },
                    data:[]
                }
            ]
        };
    }
    initOption(newProps){
        echarts.dispose(this.element);
        this.myChart = echarts.init(this.element);
        // this.myChart.on('click', newProps.eConsole);
        this.option.yAxis[0].data=[];
        this.option.series[0].data=[];
        this.option.yAxis[0].data=newProps.data.name;
        this.option.series[0].data=newProps.data.value;
        this.myChart.setOption(this.option,true);
        this.myChart.on('click', (param)=>{
            var rylxVan='';
            if(param.name=='其他'){
                rylxVan='';
            }else{
                rylxVan=param.name
            }
            // this.props.dispatch(selectImportantPeopleDetails({
            //     gxjgdm: this.state.gxjgdm,
            //     beginTime: newProps.beginTime,
            //     endTime: newProps.endTime,
            //     rylx: rylxVan
            // },(res)=>{
            //     if (res['status'] === 200) {
            //         $(".dataTables-box1 tbody").empty();
            //         var op='';
            //         res.data.map((e,i)=>{
            //            op=op+"<tr key={i}>"+
            //                        "<td><div><a href='#' title="+e['XM']+">"+e['XM']+"</a></div></td>"+
            //                        "<td><div><a href='#' title="+e['GMSFHM']+">"+e['GMSFHM']+"</a></div></td>"+
            //                        "<td><div><a href='#' title="+e['YJJF']+">"+e['YJJF']+"</a></div></td>"+
            //                        "<td><div><a href='#' title="+e['RYLX']+">"+e['RYLX']+"</a></div></td>"+
            //                        "<td><div><a href='#' title="+e['JB']+">"+e['JB']+"</a></div></td>"+
            //                        "<td><div><a href='#' title="+e['YYCSMC']+">"+e['YYCSMC']+"</a></div></td>"+
            //                    "</tr>"
            //         })
            //         $(".dataTables-box1 tbody").html(op);
            //    }
            // }))
            // fetch({
            // url: GlobalData.selectImportantPeopleDetails,
            // method: 'POST',
            // data: {
            //     gxjgdm: GlobalData.gxjgdm,
            //     beginTime: newProps.beginTime,
            //     endTime: newProps.endTime,
            //     rylx: rylxVan
            //     }
            // }).then((res) => {
            //     if (res['status'] === 200) {
            //          $(".dataTables-box1 tbody").empty();
            //          var op='';
            //          res.data.map((e,i)=>{
            //             op=op+"<tr key={i}>"+
            //                         "<td><div><a href='#' title="+e['XM']+">"+e['XM']+"</a></div></td>"+
            //                         "<td><div><a href='#' title="+e['GMSFHM']+">"+e['GMSFHM']+"</a></div></td>"+
            //                         "<td><div><a href='#' title="+e['YJJF']+">"+e['YJJF']+"</a></div></td>"+
            //                         "<td><div><a href='#' title="+e['RYLX']+">"+e['RYLX']+"</a></div></td>"+
            //                         "<td><div><a href='#' title="+e['JB']+">"+e['JB']+"</a></div></td>"+
            //                         "<td><div><a href='#' title="+e['YYCSMC']+">"+e['YYCSMC']+"</a></div></td>"+
            //                     "</tr>"
            //          })
            //          $(".dataTables-box1 tbody").html(op);
            //     }
            // })
        });
    }
    shouldComponentUpdate(newProps){
        if(this.props.data!==newProps.data){
            this.initOption(newProps);
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