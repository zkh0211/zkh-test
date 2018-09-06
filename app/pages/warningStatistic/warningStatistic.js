/**
 * Created by GTR on 2017/9/13.
 */
import React, { Component } from 'react';
import './warningStatistic.less';
import '../common/timeLineCSS.css';
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import TimeLine from '../common/timeLine';
import ShadowLine from '../information/component/shadowLine';
import WarnBarChart from './component/warnBarChart';
import {
    selectImportantPeopleWarning,
    selectImportantPeopleDetails,
    selectCriminalCaseWarning,
    selectCriminalCaseTop10,
    selectAdministrativeCaseWarning,
    selectAdministrativeCaseTop10
}from 'actions/warningStaticAction'

@connect((state, props)=>{
    config: state.config
})

export default class WarningStatistic extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            beginTime: new Date().getFullYear().toString(),
            endTime: new Date().getFullYear().toString(),
            rylx: "涉疆维族人员",
            data1: {name: [], value: []},
            data2: {name: [], value: []},
            data3: {name: [], value: []},
            xValue: [],
            data: [],
            tl: [],
            xzValue: [],
            xzdata: [],
            xztl: [],
            datatable: [],
            zdryyj:'',
            gxjgdm: Cookies.get('gxjgdm'),
            // gxjgdm:'150104000000',
            
        }
    }

    //重点人员预警
    refreshselectImportantPeopleWarning() {
        this.props.dispatch(selectImportantPeopleWarning({gxjgdm: this.state.gxjgdm, beginTime: this.state.beginTime, endTime: this.state.endTime},(res)=>{
            if(res.status === 200){
                if(res.data.length>0){
                    let item1 = {name: [], value: []};
                    res['data'].forEach((elem, index) => {
                        item1.value.push(elem['SL']);
                        if(elem['ZDRYLX']===undefined){
                            item1.name.push('其他')
                        }else{
                            item1.name.push(elem['ZDRYLX']);
                        }
                    });
                    this.setState({zdryyj:res.msg,data1: item1});
                }else{
                    this.setState({data1: []});
                }
            }

        }))
    
    }

    //重点人员预警明细XM,GMSFHM,YJJF,RYLX,JB,YYCSMC,FSSJ
    refreshselectImportantPeopleDetails(rylxParm) {
       this.props.dispatch(selectImportantPeopleDetails({ 
        gxjgdm: this.state.gxjgdm,
        beginTime: this.state.beginTime,
        endTime: this.state.endTime,
        rylx: rylxParm},(res)=>{
            if (res['status'] === 200) {
                this.setState({
                    datatable: res['data']
                });
            }
       }))
     
    }

    //刑事案件预警
    refreshselectCriminalCaseWarning() {
        this.props.dispatch(selectCriminalCaseWarning({gxjgdm: this.state.gxjgdm, beginTime: this.state.beginTime, endTime: this.state.endTime},(res)=>{
            if(res.status === 200){
                if(res.data.codeSet.length>0){
                    let result = res['data'];
                    let xValue = [];
                    let tl = [];
                    let valueList = [];
                    result.codeSet.forEach((obj, index)=> {
                        let value = {name: obj, icon: 'roundRect'};
                        tl.push(value);
                 
                        let item = {name:obj,list:[]};
                        result.criminalCaseWarning.forEach((elem, i)=> {
                            if (elem['AJZLMC_LEV2'] === obj) {
                                item.list.push(elem['AJSL'])
                            }
                        });
                        valueList.push(item);
                    });
                    result.criminalCaseWarning.forEach((item,index)=>{

                        if (item['AJZLMC_LEV2'] === tl[0].name) {
                            xValue.push(item['TJRQ'])
                        }
                    });

                    this.setState({
                        xsajyj:res.msg,
                        xValue: xValue,
                        data: valueList,
                        tl: tl
                    });
                }
            }

        }))

    }

    //刑事案件预警-类型TOP10
    refreshselectCriminalCaseTop10() {
       this.props.dispatch(selectCriminalCaseTop10({gxjgdm: this.state.gxjgdm, beginTime: this.state.beginTime, endTime: this.state.endTime},(res)=>{
            if(res.status === 200){
                if(res.data.length>0){
                    let item2 = {name: [], value: []};
                    res['data'].forEach((elem, index) => {
                        item2.name.push(elem['AJZLMC_LEV2']);
                        item2.value.push(elem['AJSL']);
                    });
                    this.setState({data2: item2});
                }else{
                    this.setState({
                        data2:{name: [], value: []}
                    })
                }
            }
       }))

    }
    //行政案件预警
    refreshselectAdministrativeCaseWarning() {
       this.props.dispatch(
        selectAdministrativeCaseWarning({gxjgdm: this.state.gxjgdm, beginTime: this.state.beginTime, endTime: this.state.endTime},(res)=>{
            if(res.status === 200){
                if(res.data.codeSet.length>0){
                    let result = res['data'];
                    let xValue = [];
                    let tl = [];
                    let valueList = [];

                    result.codeSet.forEach((obj, index)=> {
                        let value = {name: obj, icon: 'roundRect'};
                        tl.push(value);
                       
                        let item = {name:obj,list:[]};
                        result.administrativeCaseWarning.forEach((elem, i)=> {
                            if (elem['AJZLMC_LEV2'] === obj) {
                                item.list.push(elem['AJSL'])
                            }
                        });
                        valueList.push(item);
                    });

                    result.administrativeCaseWarning.forEach((item,index)=>{
                        if (item['AJZLMC_LEV2'] === tl[0].name) {
                            xValue.push(item['TJRQ'])
                        }
                    });

            

                    this.setState({
                        xzValue: xValue,
                        xzdata: valueList,
                        xztl: tl
                    });
                }
            }
        }))
       
     
    }

    //行政案件预警-类型TOP10
    refreshselectAdministrativeCaseTop10() {
        this.props.dispatch(selectAdministrativeCaseTop10({gxjgdm: this.state.gxjgdm, beginTime: this.state.beginTime, endTime: this.state.endTime},(res)=>{
            if(res.status === 200){
                if(res.data.length>0){
                    let item3 = {name: [], value: []};
                    res['data'].forEach((elem, index) => {
                        item3.name.push(elem['AJZLMC_LEV2']);
                        item3.value.push(elem['AJSL']);
                    });
                    this.setState({
                        data3: item3
                    })
                }else{
                    this.setState({
                        data3:{name: [], value: []}
                    })
                }
            }
        }))
  
    }
    refreshAll() {
        this.refreshselectImportantPeopleWarning();
        this.refreshselectImportantPeopleDetails(this.state.rylx);
        this.refreshselectCriminalCaseWarning();
        this.refreshselectCriminalCaseTop10();
        this.refreshselectAdministrativeCaseWarning();
        this.refreshselectAdministrativeCaseTop10();
    }

    time(newState) {//接收传回来的时间改变后的数据
        let time = newState.split('|');
        this.setState({
            beginTime: time[0],
            endTime: time[1]
        });
        this.refreshAll();
    }

    componentWillMount() {
        this.refreshAll();
    }

    render() {
        return <div className="warn-contain">
            <div className="warn-con">
                <div className="warn-echarts">
                    <div className="warn-echarts-con"><WarnBarChart title={this.state.zdryyj} color="#54adff"
                                                                    data={this.state.data1} beginTime={this.state.beginTime} endTime={this.state.endTime}/></div>
                    <div className="warn-echarts-con">
                        {/*<WarnTable datatable={this.state.datatable}/>*/}
                    <div className="warn-table-con dataTables-box1">
            <table style={{borderCollapse:'collapse'}} className="warn-table">
                <thead>
                <tr>
                    <th>人员</th><th>身份证</th><th>预警积分</th><th>类型</th><th>级别</th><th>预警场所</th><th>户籍地</th><th>信息入库时间</th>
                </tr> 
                </thead>
                <tbody>
               {
                            this.state.datatable.map((e, i) => {
                                return <tr key={i}>
                                    <td className='warn-table-con-item'><div><a title={e['XM']}>{e['XM']}</a></div></td>
                                    <td className='warn-table-con-item'><div><a title={e['GMSFHM']}>{e['GMSFHM']}</a></div></td>
                                    <td className='warn-table-con-item'><div><a title={e['YJJF']}>{e['YJJF']}</a></div></td>
                                    <td className='warn-table-con-item'><div><a title={e['RYLX']}>{e['RYLX']}</a></div></td>
                                    <td className='warn-table-con-item'><div><a title={e['JB']}>{e['JB']}</a></div></td>
                                    <td className='warn-table-con-item'><div><a title={e['YYCSMC']}>{e['YYCSMC']}</a></div></td>
                                    <td className='warn-table-con-item'><div><a title={e['HJD']}>{e['HJD']}</a></div></td>
                                    <td className='warn-table-con-item'><div><a title={e['XXRKSJ']}>{e['XXRKSJ']}</a></div></td>
                                </tr>
                            })
                        }
                </tbody>

            </table>
        </div>
                    </div>
                    <div className="warn-echarts-con"><ShadowLine title={this.state.xsajyj} xValue={this.state.xValue}
                                                                  data={this.state.data} tl={this.state.tl}/></div>
                    <div className="warn-echarts-con"><WarnBarChart title="类型排名TOP10" color="#ff9240"
                                                                    data={this.state.data2}/></div>
                    <div className="warn-echarts-con"><ShadowLine title="行政案件" xValue={this.state.xValue}
                                                                  data={this.state.data} tl={this.state.tl}/></div>
                    <div className="warn-echarts-con"><WarnBarChart title="类型排名TOP10" color="#ff9240"
                                                                    data={this.state.data3}/></div>
                    <div style={{clear:'both'}}></div>
                </div>
            </div>
            <div className="warn-footer"><TimeLine getTime={this.time.bind(this)}/></div>
        </div>
    }

}