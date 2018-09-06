import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import Divider from 'antd/lib/divider';
import Cookies from 'js-cookie'
import EditIcon from '../../../images/info/edit.png'
import { Select ,Pagination ,message, Modal, Radio , Button,Rate} from 'antd';
import Report2Word from '../../reportWord/component/Report2Word'
import { 
    willAppointed,
    didAppointed,
    willApprove,
    didApprove,
    changeCurrentPage,
    getHcCaseFromList

} from 'actions/masterAction'
import {
    getWordReport,
    sendSubmitReport
} from "actions/reportWord";
import {
    getHcDetail
}from 'actions/syntheticInfo'
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@connect(
    (state,props)=>({
        config: state.config,
        tabAppointedType:state.tabAppointedTypeResponse,
        hcCaseFromList:state.hcCaseFromListResponse,
        mijiList:state.mijiResponse
    })
)


export default class RecordTable extends Component{
    constructor(props){
        super(props);
        this.state={
            pageSize:7,
            currentPage : 1,
            isMaster:'1',
            secretLevel:0,
            tabAppointed:'',
            reportShow:'none',
            ifCreateReport:false,
            wordModalVisible:false,
            reportInfo:{},
            caseInfo:{},
            hcTaskList:[],
            caseList:{},
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
        if(Cookies.get('authCode').indexOf('hczhRole')!==-1){
            this.setState({
                isMaster:'1'
            })
        }else{
            this.setState({
                isMaster:'0'
            })
        }
      
        // getHcCaseFromList
      

       
    }

    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.caseList.list!== this.props.caseList.list){
            let selectTypeOption = [];
            nextProps.caseType.forEach((item,index)=>{
                if(item.typeId === nextProps.taskType){
                    // if(item.typeList){
                    //     selectTypeOption = item.typeList
                    // }else if(item.typeChildList){
                        selectTypeOption = item.typeChildList
                    // }
                   
                }
            })
            this.setState({
                currentPage:1,
                caseList:nextProps.caseList,
                caseType:nextProps.caseType,
                taskType:nextProps.taskType,
                selectTypeOption:selectTypeOption,
                // tabAppointed:nextProps.tabAppointed
            },()=>{
                // console.log(this.state.selectTypeOption);
            })
          
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
           
        })
    }
    handleCancel = (e) => {
        this.setState({
            wordModalVisible: false,
        });
    }
   
    search(){
        const {  tabAppointedType  } = this.props;
          
            this.props.dispatch(didApprove({caseFrom:this.state.caseFrom,taskType:this.state.taskType,taskSubType:this.state.taskSubType,isApprove:"",isMaster:this.state.isMaster,page:this.state.currentPage,size:7},(res)=>{ 
                if(res.data){
                    this.setState({
                        caseList:res.data
                    })
                }else{
                    this.setState({
                        caseList:{}
                    })
                }
             }));
        
    
    }

    showReport(e){
        let id = e.currentTarget.getAttribute('data-id');
        let state = e.currentTarget.getAttribute('data-state')
        let taskType = e.currentTarget.getAttribute('data-tasktype')
        if(Cookies.get('deptLevel')==='4'){
            let isBohui = false;
            let bohui = e.currentTarget.getAttribute('data-bohui');
            hashHistory.push(`/submitted/${id}/${state}/${isBohui}/${taskType}`)
        }else{
           
            this.setState({
                wordModalVisible:true
            })
    
            this.props.dispatch(getHcDetail({id:id,state:'3'}, (res) => {
                    if (res.status === 200 ) {
                        this.setState({
                            caseInfo: res.data,
                        })
                    }else{
                        this.setState({
                            caseInfo: {},
                        })
                    }
    
                }))
    
            this.props.dispatch(getWordReport({id:id,reportId:''}, (res) => {
                if (res.status === 200 && res['data']) {
                    this.setState({
                        reportInfo:res.data
                    })
    
                }else{
                    this.setState({
                        reportInfo:{}
                    })
    
                }
    
            }))
        }
      

    }

    closeReport(){
        this.setState({
            reportShow:'none'
        })
    }
    //接收暂存的内容
    dataCallback(newData){
        // console.log(newData)
        // this.setState({
        //     textInEditor:newData.wordContent
        // })

    }
    createReport=()=>{
        this.setState({
            ifCreateReport:true
        })
        
    }
    findSource=()=>{
        // hashHistory.push(`/traceOfSource/${this.state.caseInfo.id}/3/${this.state.reportInfo.deptNo}`)
        window.open(`/#/traceOfSource/${this.state.caseInfo.id}/3/${this.state.reportInfo.deptNo}`);
    }

    secretLevelChange=(e)=>{
        this.setState({
            secretLevel:e.target.value
        },()=>{
            let data =  {
                "hcId":this.state.caseInfo.id,
                "reportStatus":"1",
                "secretLevel":this.state.secretLevel,
                "reportContent":this.state.reportInfo.reportContent,
                "isApprove":''
            }
            // {"hcId":"合成主键","reportStatus":"报告状态 1：暂存,2.上报",
            // "reportContent":"报告内容","isApprove":"是否提交指挥长审批 1:是，0：否"}
        
            this.props.dispatch(sendSubmitReport(data,(res)=>{
                // message.success('ok',3)
                if(res.status === 200){
                    // message.success('暂存成功',3)
                    this.props.dispatch(getWordReport({id:this.state.caseInfo.id,reportId:''}, (res) => {
                        if (res.status === 200 && res['data']) {
                            this.setState({
                                reportInfo:res.data
                            })
                        }else{
                            this.setState({
                                reportInfo:{}
                            })
                        }
                    }))
                }
            }))
        })
    }
    changeRate =(value) =>{
        this.setState({
            secretLevel: value
        })
    }

    render(){
        const {  tabAppointedType ,hcCaseFromList, mijiList } = this.props;
        return(
            <div className="masTable-contain">
                <Modal
                    title={<span style={{color: '#2C567F', fontSize: '1.25rem'}}>{this.state.caseInfo.caseName?this.state.caseInfo.caseName:''}</span>}
                    visible={this.state.wordModalVisible}
                    onCancel={this.handleCancel}
                    width={'75%'}
                    height={'70vh'}
                    className = 'word-modal'
                    footer={[
                        <div style={{'textAlign':'left',"display":'none'}}>
                        <div className="inner-title">
                            <img src={EditIcon} alt="pic"/>
                            <span>设置等级</span>
                        </div>
                        <div>
                            <Rate onChange={this.changeRate} value={this.state.secretLevel} count={4} />
                           {/*} <RadioGroup onChange={this.secretLevelChange} defaultValue={this.state.secretLevel}>
                            {
                                mijiList.res?(mijiList.res.data.map((item,index)=>{
                                    return(
                                        <Radio key={index+'miji'} value={item.lId}>{item.lName}</Radio>
                                    )
                                })
                            ):''
                            }
                        </RadioGroup>      */}
                        </div>
                    </div>,
                        <Button key="source" style={{backgroundColor:'#2c567f',color:'white'}}  onClick={this.findSource}>溯源</Button>,
                        <Button key="down" onClick={this.createReport}>下载报告</Button>,
                        <Button key="back" onClick={this.handleCancel}>关闭</Button>
                    ]}
                >
                    <Report2Word reportData={this.state.reportInfo} callbackData={this.dataCallback.bind(this)}  ifCreateReport = {this.state.ifCreateReport}/>
                </Modal>
               {/* <div className="reportShow" style={{display:this.state.reportShow}}>*/}
                    
                   {/* <div>
                    <b onClick={this.closeReport.bind(this)}></b>
                  
                    <div dangerouslySetInnerHTML = {{__html:this.state.reportInfo}}></div>,
                   </div>*/}
                {/*</div>*/}

                <div className="masTable-search">
                    <span>类型：</span>
                    <Select defaultValue="请选择" size='large' style={{ width: 120 }} onChange={this.changeType}>
                        {
                            this.state.selectTypeOption?(this.state.selectTypeOption.map((item,index)=>{
                                return <Option key={item.typeId} value={item.typeId}>{item.typeName}</Option>
                            })
                        ):<Option value="0"></Option>
                        }
                    </Select>
                    <span>来源：</span>
                    <Select defaultValue="请选择" size='large' style={{ width: 120 }} onChange={this.changeSource}>
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
                            </tr>
                        </thead>
                        <tbody>
                            { 
                                this.state.caseList&&this.state.caseList.list? ( this.state.caseList.list.map((item,index)=>{
                                    return(
                                        <tr key={item.Row_ID} onClick={this.showReport.bind(this)} data-tasktype={item.TASK_TYPE} data-id={item.ID} data-state={item.STATE}> 
                                            <td>{item.ROW_ID}</td>
                                            <td>{item.CASE_NAME}</td>
                                            <td>{item.TYPE_NAME}</td>
                                            <td>{item.FROM_NAME}</td>
                                            <td>{item.NAME}</td>
                                            <td>{item.SUBMIT_DATE}</td>
                                        </tr>
                                    ) 
                                })):<tr></tr>
                            }
                        </tbody>
                    </table>
                    <div className="tab-Pagination">
                        <Pagination total={this.state.caseList?this.state.caseList.total:0}  current={this.state.currentPage} 
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
        )
    }
}