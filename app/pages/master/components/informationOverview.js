/**
 * Created by 15254 on 2018/5/29.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { hashHistory } from 'react-router'
import { Select ,Pagination, message } from 'antd';
import {
    getOrderByStatus,
    willAppointed,
    didAppointed,
    willApprove,
    didApprove,
    getSubmitList,
    getSubmitListNotPolice,
    startCompose,
    queryAllCase,
    overviewCount

} from 'actions/masterAction'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Option = Select.Option;

@connect(
    (state,props)=>({
        config: state.config,
        tabAppointedType:state.tabAppointedTypeResponse,
        hcCaseFromList:state.hcCaseFromListResponse

    })
)

export default class Information extends Component{
    constructor(props){
        super(props);
        this.state={
            tab:'1',
            flag:0,
            num:'',
            caseTypes:[],
            isMaster:'1',
            typeId:'1',
            tabAppointed:'2',
            caseList:[],
            subTypeList:[],
            selectTypeOption:[],
            thead:[],
            pageSize:7,
            currentPage : 1,
            thead1:['序号','名称','类型','来源','状态','案发时间','合成状态'],
            thead2:['序号','名称','类型','采集途径','紧急程度','入库时间','合成状态'],
        }
    }
    changeTab=(e)=>{
        let num = e.currentTarget.getAttribute('data-tab');
        let typeId = e.currentTarget.getAttribute('data-typeid');

        num==='4'?this.setState({
            thead:this.state.thead2
        }):this.setState({
            thead:this.state.thead1
        })
            this.setState({
                tab:num,
                flag:0,
                typeId:typeId,
            },()=>{
               num==='2'||num==='3'||num==='4'? this.search():this.setState({submited:0})

            })

    }
    search(){
        let source=1;
        this.state.tab==='2'?source=2:this.state.tab==='3'?source=1:this.state.tab==='4'?source=3:''
        this.props.dispatch(queryAllCase({source:source,page:this.state.currentPage,pageSize:this.state.pageSize},(res)=>{
            if(res.data){
                this.setState({
                    caseList:res.data.list,
                    submited:res.data.total
                })
            }else{
                this.setState({
                    caseList:{},
                    submited:'0'
                })
            }
        }));
    }
    composeAction(id){


    }
    goToWillAppointed(e){
        let caseId = e.currentTarget.getAttribute('data-caseid');
        let source=1;
        this.state.tab==='2'?source=2:this.state.tab==='3'?source=1:this.state.tab==='4'?source=3:'';
        hashHistory.push(`/newsAssign/${caseId}/${source}/${this.state.tab}`);
        // let state = e.currentTarget.getAttribute('data-state');
        // let taskMaster = e.currentTarget.getAttribute('data-taskmaster');
        // let policeTypeId = Cookies.get('policeTypeId');
        // let taskType = e.currentTarget.getAttribute('data-tasktype')
      
        // this.props.dispatch(startCompose({source:source,caseId:id},(res)=>{
        //     if(res.status===200){
        //         if(this.state.tab  === '2'){
        //             if(Cookies.get('deptLevel')==='4'){
        //                 if(taskType === '1' ||taskType === '2' || taskType === '4' || taskType ===  '7'){

        //                 }else{
        //                     hashHistory.push(`/approve/${id}/${state}/1`)
        //                 }

        //             }else{
        //                 if(taskType === '1' || taskType === '2' ||taskType === '4' || taskType ===  '7'){
        //                     hashHistory.push(`/assignTTT/${id}/${state}/${this.state.tab}`)
        //                 }else{
        //                     hashHistory.push(`/assign/${id}/${state}/${this.state.tab}`)
        //                 }
        //                 // hashHistory.push(`/assign/${id}/${state}/${this.state.tabAppointed}`)
        //             }

        //         }else if(this.state.tab  === '3'){

        //             if(taskType === '1' ||taskType === '2' || taskType === '4' || taskType ===  '7'){
        //                 hashHistory.push(`/downAnalysisForSeat/${id}/${state}`)
        //             }else{
        //                 hashHistory.push(`/analysisForSeat/${id}/${state}`)
        //             }
        //         }else  if( this.state.tab === '4'){
        //             hashHistory.push(`/approve/${id}/${state}/${this.state.tab}`)
        //         }else  if( this.state.tab  === '5'){
        //             hashHistory.push(`/approveed/${id}/${state}/${this.state.tab}`)
        //         }else  if( this.state.tab  === '6'){
        //             hashHistory.push(`/submitted/${id}/${state}/false`)
        //         }
        //     }
        // }))


    }
    componentWillMount(){

        if(Cookies.get('authCode').indexOf('hczhRole')!==-1){
            this.setState({
                isMaster:'1'
            })
        }else{
            this.setState({
                isMaster:'0'
            })
        }
      this.props.dispatch(overviewCount({},(res)=>{
          this.setState({
             caseTypes:res.data,
              thead:this.state.thead1
          })
      }))
    }

    render(){
        const {  tabAppointedType ,hcCaseFromList } = this.props;
        return(
            <div className="master-content-data">
                <div className="appoint-tab-contain">
                    {
                       this.state.caseTypes.map((item,index)=>{
                            return(
                                <div key={'type'+index} className={this.state.tab === item.typeId?`appoint-tab-item appoint-tab-active`:`appoint-tab-item`} onClick={this.changeTab} data-tab={item.typeId} data-typeid={item.typeId} >
                                    <div><img src={this.state.tab=== `${index+1}`?require(`../../../images/common/${item.imgActive}`):require(`../../../images/common/${item.imgName}`)} alt="pic"/></div>
                                    <div><p className={this.state.tab===`${index+1}`?'tab-title-active tab-title':'tab-title'}>{item.typeName}</p><p className={this.state.tab===`${index+1}`?'tab-count-active tab-count':'tab-count'}>{item.count}</p></div>
                                </div>
                            )
                        })
                    }

                </div>

                <div className="appoint-content-contain">
                    <div className="masTable-contain">
                        <div className="masTable-search">
                            <span>类型：</span>
                            <Select defaultValue="请选择" size='large' style={{ width: 120 }} onChange={this.changeType}>
                                {
                                    this.state.selectTypeOption.length>0?(this.state.selectTypeOption.map((item,index)=>{
                                        return <Option key={item.typeId} value={item.typeId}>{item.typeName}</Option>
                                    })):''
                                }
                            </Select>
                            <span className={this.state.tabAppointed === '6'?'displayNone':''}>来源：</span>
                            <Select defaultValue="请选择" size='large' style={{ width: 120 }} className={this.state.tabAppointed === '6'?'displayNone':''} onChange={this.changeSource}>
                                {
                                    hcCaseFromList.res?(hcCaseFromList.res.data.map((item,index)=>{
                                            return <Option key={'from'+item.FROM_ID} value={item.FROM_ID}>{item.FROM_NAME}</Option>
                                        })
                                    ):<Option value=''>请选择</Option>
                                }
                            </Select>
                            <button className="button" onClick={this.search.bind(this)}>查询</button>
                        </div>
                        <div className="masTable-table">
                            <table>
                                <thead>
                                <tr>
                                    {
                                        this.state.thead.map((item,index)=>{
                                            return  <th key={'data'+index}>{item}</th>
                                        })
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.caseList&&this.state.caseList? ( this.state.caseList.map((item,index)=>{
                                        return(
                                            this.state.tab==='3'||this.state.tab==='2'?
                                            <tr key={item.caseId} onClick={this.goToWillAppointed.bind(this)} data-caseid={item.caseId}  >
                                                <td>{index+1+(this.state.currentPage-1)*this.state.pageSize}</td>
                                                <td title={item.caseName}>{item.caseName&&item.caseName.substr(0,14)}</td>
                                                <td title={item.caseTypeDesc}>{item.caseTypeDesc&&item.caseTypeDesc.substr(0,10)}</td>
                                                <td>{item.caseFromDesc}</td>
                                                <td>{item.caseStateDesc}</td>
                                                <td>{item.caseTime}</td>
                                                <td>{item.isLaunch === '1'?"已发起":'待发起'}</td>
                                            </tr>:this.state.tab==='4'?
                                                <tr key={item.id} onClick={this.goToWillAppointed.bind(this)} data-caseid={item.id}  >
                                                    <td>{index+1+(this.state.currentPage-1)*this.state.pageSize}</td>
                                                    <td title={item.bt}>{item.bt&&item.bt.substr(0,14)}</td>
                                                    <td>{item.xxlx==='1'?'综合类情报':item.xxlx==='2'?'行动性情报':''}</td>
                                                    <td>{item.cjtj==='1'?'日常工作':item.cjtj==='2'?'互联网监察':item.cjtj==='3'?'人力情报':item.cjtj==='4'?'专案工作':''}</td>
                                                    <td>{item.jjcd==='1'?'一般':item.jjcd==='2'?'重要':item.jjcd==='3'?'紧急':''}</td>
                                                    <td>{moment(item.cts).format('YYYY-MM-DD hh:mm:ss')}</td>
                                                    <td>{item.sffq === '1'?"已发起":'待发起'}</td>
                                                </tr>:
                                                <tr ></tr>

                                        )


                                    })):<tr></tr>
                                }
                                </tbody>
                            </table>
                            <div className="tab-Pagination">
                                <Pagination total={this.state.submited?this.state.submited:0}  current={this.state.currentPage}
                                            pageSize={this.state.pageSize}
                                            onChange={
                                                (page) => {this.setState({
                                                    currentPage:page
                                                },()=>{
                                                    this.search();
                                                })
                                                }
                                            }/>
                            </div>
                        </div>

                    </div>
                    } </div>
            </div>
        )
    }
}