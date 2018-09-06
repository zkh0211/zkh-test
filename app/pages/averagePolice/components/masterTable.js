import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import Divider from 'antd/lib/divider';
import Cookies from 'js-cookie'
import { Select ,Pagination } from 'antd';
import { 
    willAppointed,
    didAppointed,
    willApprove,
    didApprove,
    changeCurrentPage,
    getHcCaseFromList,
    getSubmitList,
    getSubmitListNotPolice

} from 'actions/masterAction'
const Option = Select.Option;


@connect(
    (state,props)=>({
        config: state.config,
        tabAppointedType:state.tabAppointedTypeResponse,
        hcCaseFromList:state.hcCaseFromListResponse
    })
)


export default class MasterTable extends Component{
    constructor(props){
        super(props);
        this.state={
            zoneId:Cookies.get('zoneId'),
            pageSize:7,
            currentPage : 1,
            isMaster:'1',
            isHcZuoxi:false,
            hideFrom:'inline-block',
            tabAppointed:'',
            hcTaskList:[],
            caseLists:{},
            caseType:[],
            taskType:'',
            taskSubType:'',
            caseFromList:[],
            caseFrom:'',
            selectTypeOption:[],
            types:[{name:'jack',value:'12'},{name:'jackw',value:'2'},{name:'jackww',value:'22'}],
            thead:['序号','名称','类型','来源','发起人','发起时间'],
            tbody:[
                {index:'1',name:'case',type:'traffic',source:'police',starUser:'jack',startTime:'2017-12-12'},
                {index:'2',name:'case',type:'traffic',source:'police',starUser:'jack',startTime:'2017-12-12'},
                {index:'3',name:'case',type:'traffic',source:'police',starUser:'jack',startTime:'2017-12-12'},
                {index:'4',name:'case',type:'traffic',source:'police',starUser:'jack',startTime:'2017-12-12'},
                {index:'5',name:'case',type:'traffic',source:'police',starUser:'jack',startTime:'2017-12-12'},
                {index:'6',name:'case',type:'traffic',source:'police',starUser:'jack',startTime:'2017-12-12'},
                {index:'7',name:'case',type:'traffic',source:'police',starUser:'jack',startTime:'2017-12-12'}
            ]
        }
    }
    componentWillMount(){
        if(Cookies.get('authCode')){
            if(Cookies.get('authCode').indexOf('hczhRole')!==-1){
                this.setState({
                    isMaster:'1',
                   isHcZuoxi:false
                })
            }else{
                if(Cookies.get('authCode').indexOf('hcRole')!==-1){
                    this.setState({
                        isMaster:'0',
                        isHcZuoxi:true
                    })
                }else{
                    this.setState({
                        isMaster:'0',
                        isHcZuoxi:false
                    })
                }
              
            }
        }
        
      

       
    }

    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.caseList.list!== this.props.caseList.list){
            // let selectTypeOption = [];
            // nextProps.caseType.forEach((item,index)=>{
            //     if(item.typeId === nextProps.taskSubType){
            //         selectTypeOption = item.typeChildList
            //     }
            // })
            this.setState({
                currentPage:1,
                caseLists:nextProps.caseList,
                caseType:nextProps.caseType,
                taskType:nextProps.taskSubType,
                selectTypeOption:nextProps.caseType,
                tabAppointed:nextProps.tabAppointed
            },()=>{
                // console.log(this.state.currentPage)
                if(this.state.tabAppointed === '5'){
                    this.setState({
                        hideFrom:'none'
                    })
                }else{
                    this.setState({
                        hideFrom:'inline-block'
                    })
                }
                // console.log(this.state.caseList);
            })
            // if(nextState.currentPage !== this.state.currentPage){
            //     this.setState({
            //         currentPage:1
            //     })
            // }
          
        }
        return true
    }

    
    changeType=(value)=>{
        this.setState({
            taskSubType:value
        })
    }
    changeSource=(value)=>{
        this.setState({
            caseFrom:value
        })
    }
    onShowSizeChange(current,pageChange){
        this.setState({
            pageSize:pageChange
        },()=>{
            // const { willAppointedData , didAppointedData , willApproveData ,didApproveData, tabAppointedType } = this.props;
            // this.props.dispatch(getPendingList({caseFrom:"",taskType:"",isApprove:"",inMaster:"",page:1,size:7},(res)=>{  }));
            // this.search(this.state.currentCaseStatus,'2',this.state.currentProcessStatus,this.state.InputCaseId,this.state.SelectCaseType,this.state.currentPage,this.state.pageSize)
            // console.log(willAppointedData)
        })
    }
   
    search(){
        if(this.state.tabAppointed === '2'){
            
            this.props.dispatch(didAppointed({caseFrom:this.state.caseFrom,taskType:this.state.taskType,taskSubType:this.state.taskSubType,isApprove:"1",isMaster:this.state.isMaster,taskStatus:'0',page:this.state.currentPage,size:7},(res)=>{ 
                if(res.data){
                    this.setState({
                        caseLists:res.data
                    })
                }else{
                    this.setState({
                        caseLists:{}
                    })
                }
                }));
            
           
        }else  if(this.state.tabAppointed  === '3'){
         
            this.props.dispatch(didAppointed({caseFrom:this.state.caseFrom,taskType:this.state.taskType,taskSubType:this.state.taskSubType,isApprove:"1",isMaster:this.state.isMaster,taskStatus:'1',page:this.state.currentPage,size:7},(res)=>{ 
                if(res.data){
                    this.setState({
                        caseLists:res.data
                    })
                }else{
                    this.setState({
                        caseLists:{}
                    })
                }
             }));
           
            
        }else  if(this.state.tabAppointed  === '4'){
            this.props.dispatch(didApprove({caseFrom:this.state.caseFrom,taskType:this.state.taskType,taskSubType:this.state.taskSubType,isApprove:"",isMaster:this.state.isMaster,page:this.state.currentPage,size:7},(res)=>{ 
                if(res.data){
                    this.setState({
                        caseLists:res.data
                    })
                }else{
                    this.setState({
                        caseLists:{}
                    })
                }
             }));
        }else  if(this.state.tabAppointed  === '5'){
          
            this.props.dispatch(getSubmitListNotPolice({page:this.state.currentPage,size:7},(res)=>{ 
                if(res.data){
                    this.setState({
                        caseLists:res.data
                    })
                }else{
                    this.setState({
                        caseLists:{}
                    })
                }
             }));
        }
    
    }

    goToWillAppointed(e){
        // console.log(e)
        let id = e.currentTarget.getAttribute('data-id');
        let state = e.currentTarget.getAttribute('data-state');
        let taskType = e.currentTarget.getAttribute('data-tasktype')
      
        if(this.state.tabAppointed  === '2'){
            // if(taskType === '1' || taskType === '4' || taskType ===  '7'){
            //     hashHistory.push(`/downAnalysisForPolice/${id}/${state}`)
            // }else{
            //     hashHistory.push(`/analysisForPolice/${id}/${state}`)
            // }
            hashHistory.push(`/analysisForPolice/${id}/${state}`)
        }else  if(this.state.tabAppointed  === '3'){
           
            hashHistory.push(`/analysisForPolice/${id}/${state}`)
        }else  if(this.state.tabAppointed  === '4'){
            window.open(`/#/traceOfSource/${id}/${state}/${deptNo}`);
        }else  if(this.state.tabAppointed  === '5'){
            let isBohui = false;
            let bohui = e.currentTarget.getAttribute('data-bohui');
            if(bohui === '驳回'){
                isBohui = true
            }else{
                isBohui = false;
            }
            hashHistory.push(`/submitted/${id}/${state}/${isBohui}/${taskType}`)
        }

       
    }

    render(){
        const {  tabAppointedType ,hcCaseFromList } = this.props;
        return( 
            <div className="masTable-contain">
                <div className="masTable-search">
                    <span>类型：</span>
                    <Select defaultValue="请选择" size='large' style={{ width: 120 }} onChange={this.changeType}>
                        {
                            this.state.selectTypeOption.map((item,index)=>{
                                return <Option key={item.typeId} value={item.typeId}>{item.typeName}</Option>
                            })
                        }
                    </Select>
                    <span style={{display:this.state.hideFrom}}>来源：</span>
                    <Select defaultValue="请选择" size='large' style={{ width: 120 , display:this.state.hideFrom}} onChange={this.changeSource}>
                        {
                            hcCaseFromList.res?(hcCaseFromList.res.data.map((item,index)=>{
                                return <Option key={item.FROM_ID} value={item.FROM_ID}>{item.FROM_NAME}</Option>
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
                                <th style={{display:(this.state.tabAppointed  === '5' || (this.state.tabAppointed  === '3'&&this.state.isHcZuoxi)?'':'none')}}>状态</th>
                        
                            </tr>
                        </thead>
                        <tbody>
                            { 
                                this.state.caseLists&&this.state.caseLists.list? ( this.state.caseLists.list.map((item,index)=>{
                                    if(this.state.tabAppointed  === '5'||(this.state.tabAppointed  === '3'&&this.state.isHcZuoxi)){
                                        return(
                                            <tr key={item.ID} onClick={this.goToWillAppointed.bind(this)} data-bohui={item.DIC_APPROVE} data-tasktype={item.TASK_TYPE} data-id={item.ID} data-state={item.STATE} data-taskmaster={item.TASK_MASTER?item.TASK_MASTER:''} > 
                                                <td>{item.ROW_ID}</td>
                                                <td title={item.CASE_NAME}>{item.CASE_NAME&&item.CASE_NAME.substr(0,14)}</td>
                                                <td title={item.TYPE_NAME}>{item.TYPE_NAME&&item.TYPE_NAME.substr(0,10)}</td>
                                                <td>{item.FROM_NAME}</td>
                                                <td>{item.NAME}</td>
                                                <td>{item.SUBMIT_DATE}</td>
                                                <td className={item.DIC_APPROVE==='驳回'?'colorRed':''}>{item.DIC_APPROVE}</td>
                                            </tr>
                                        ) 
                                    }else{
                                        return(
                                            <tr key={item.Row_ID} onClick={this.goToWillAppointed.bind(this)} data-id={item.ID} data-state={item.STATE} data-taskmaster={item.TASK_MASTER?item.TASK_MASTER:''} > 
                                                <td>{item.ROW_ID}</td>
                                                <td title={item.CASE_NAME}>{item.CASE_NAME&&item.CASE_NAME.substr(0,14)}</td>
                                                <td title={item.TYPE_NAME}>{item.TYPE_NAME&&item.TYPE_NAME.substr(0,10)}</td>
                                                <td>{item.FROM_NAME}</td>
                                                <td>{item.NAME}</td>
                                                <td>{item.SUBMIT_DATE}</td>
                                            </tr>
                                        ) 
                                    }
                                })):<tr></tr>
                            }
                        </tbody>
                    </table>
                    <div className="tab-Pagination">
                        <Pagination total={this.state.caseLists?this.state.caseLists.total:0}  
                        current={this.state.currentPage} 
                        pageSize={this.state.pageSize} 
                         onChange={
                             (page) => {this.setState({
                                 currentPage:page
                             },()=>{
                                //  console.log(this.state.currentPage);
                               this.search();
                             })
                            }
                    }/>
                    </div>
                </div>
            
            </div>
        )
    }
}