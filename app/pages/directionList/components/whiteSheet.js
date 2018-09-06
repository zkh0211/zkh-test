import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import Divider from 'antd/lib/divider';
import Cookies from 'js-cookie'
import EditIcon from '../../../images/info/edit.png'
import { Select ,Pagination ,message, Modal, Radio , Button} from 'antd';
import Report2Word from '../../reportWord/component/Report2Word'
import {
    willAppointed,
    didAppointed,
    willApprove,
    didApprove,
    changeCurrentPage,
    getHcCaseFromList,
    whiteSheetList,
    checkWhiteSheet,
    deleteIssueWhite
} from 'actions/masterAction'
import {
    getWordReport,
    sendSubmitReport
} from "actions/reportWord";
import {
    getHcDetail
}from 'actions/syntheticInfo'
import AddWhitePeople from './addWhitePeople'
import TaizhangDetail from './taizhangDetail'

const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@connect(
    (state,props)=>({
        config: state.config,
        tabAppointedType:state.tabAppointedTypeResponse,
        hcCaseFromList:state.hcCaseFromListResponse,
        mijiList:state.mijiResponse,
        checkWhiteSheet: state.checkWhiteSheetResponse,
        getDirectionSearch: state.getDirectionSearchResponse
    })
)


export default class WhiteSheet extends Component{
    constructor(props){
        super(props);
        this.state={
            pageSize:7,
            currentPage : 1,
            isMaster:'1',
            secretLevel:1,
            tabAppointed:'',
            reportShow:'none',
            ifCreateReport:false,
            wordModalVisible:false,
            dataTypeCode:'',
            dataSourceCode:'',
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
            ifCancle:false,
            currentPeopleSfZH:'',
            types:[{name:'jack',value:'12'},{name:'jackw',value:'2'},{name:'jackww',value:'22'}],
            thead:['序号','数据来源','数据类型','姓名','证件号码','撤销原因','撤销单位','撤销人','撤销时间','操作'],
            tbody:[
                // {index:'1',name:'case',type:'traffic',source:'police',starUser:'jack',startTime:'2017-12-12'},
               ]
        }
    }
    componentWillMount(){
        // if(Cookies.get('authCode').indexOf('hczhRole')!==-1){
        //     this.setState({
        //         isMaster:'1'
        //     })
        // }else{
        //     this.setState({
        //         isMaster:'0'
        //     })
        // }
        // this.props.dispatch(whiteSheetList({"page":this.state.currentPage,"pageSize":this.state.pageSize},(res)=>{
        //     this.setState({
        //         caseLIst: res.data
        //     })
        // }))

        // getHcCaseFromList



    }

    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.taskType!== this.props.taskType){

            this.setState({
                currentPage:1
            },()=>{
                // console.log(this.state.caseList);
            })

        }
        return true
    }



    onShowSizeChange(current,pageChange){
        this.setState({
            pageSize:pageChange
        },()=>{

        })
    }
    handleCancel = (e) => {
        // console.log(2222222)
        this.setState({
            wordModalVisible: false
        });
    }

    search(){

            this.props.dispatch(checkWhiteSheet({dataTypeCode:this.state.dataTypeCode,dataSourceCode:this.state.dataSourceCode,"page":this.state.currentPage,"pageSize":this.state.pageSize},(res)=>{
               
             }));


    }

    showAdd = (e) => {
        this.setState({
            wordModalVisible:true
        })

    }

    canclePeople =(e)=>{
        let sfzh = e.currentTarget.getAttribute("data-sfzh");
        this.setState({
            ifCancle: true,
            currentPeopleSfZH: sfzh
        })
    }

    quedingCancle = () => {
        //进行删除操作
        this.setState({
            ifCancle: false
        })
        this.props.dispatch(deleteIssueWhite(this.state.currentPeopleSfZH,(res)=>{
            if(res.status === '200'){
                this.search()
            }
        }))
        // console.log(this.state.currentPeopleSfZH)
    }
    quxiao = () => {
        this.setState({
            ifCancle: false
        })
    }


    render(){
        const {  tabAppointedType ,hcCaseFromList, mijiList, checkWhiteSheet, getDirectionSearch } = this.props;
        return(
            <div className="masTable-contain">

                <Modal
                    title="添加白名单"
                    visible={this.state.wordModalVisible}
                    // onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    // okText="确认"
                    // cancelText="取消"
                    width = '40vw'
                    footer={null} //去掉底部按钮
                >
                    <div className="jinZhanRenYuan">
                        <AddWhitePeople cancel={this.handleCancel}/>
                    </div>

                </Modal>


                <div className="masTable-search" >
                    <span>数据类型：</span>
                    <Select defaultValue="请选择" size='large' style={{ width: 120 }} onChange={this.changeType}>
                        <Option value=''>请选择</Option>
                        {
                            getDirectionSearch.res?(getDirectionSearch.res.data.dataType.map((item,index)=>{
                                return <Option key={item.dataTypeCode} value={item.dataTypeCode}>{item.dataTypeName}</Option>
                            })):''
                        }
                    </Select>
                    <span className={this.state.tabAppointed === '6'?'displayNone':''}>数据来源：</span>
                    <Select defaultValue="请选择" size='large' style={{ width: 120 }} className={this.state.tabAppointed === '6'?'displayNone':''} onChange={this.changeSource}>
                        <Option value=''>请选择</Option>
                        {
                            getDirectionSearch.res?(getDirectionSearch.res.data.dataSource.map((item,index)=>{
                                    return <Option key={'from'+item.dataSourceCode} value={item.dataSourceCode}>{item.dataSourceName}</Option>
                                })
                            ):''
                        }
                    </Select>
                    <button className="button" onClick={this.search.bind(this)}>查询</button>
                    <button className="whiteSheetBtn" onClick={this.showAdd}>添加</button>
                </div>
                <div className=" direction-table" >
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
                                checkWhiteSheet.res&&checkWhiteSheet.res.data.list? ( checkWhiteSheet.res.data.list.map((item,index)=>{
                                    // console.log(item)
                                    return(
                                        <tr key={index} >
                                            <td>{index+1+(this.state.currentPage - 1)*this.state.pageSize}</td>
                                            <td>{item.slly}</td>
                                            <td>{item.sllx}</td>
                                            <td>{item.xm}</td>
                                            <td>{item.sfzh}</td>
                                            <td>{item.cxyy&&item.cxyy}</td>
                                            <td>{item.cxdw&&item.cxdw}</td>
                                            <td>{item.cxdw&&item.cxr}</td>
                                            <td>{item.cxdw&&item.cxsj}</td>
                                            <td style={{color: 'red',cursor: 'pointer'}} onClick={this.canclePeople} data-sfzh={item.sfzh}>删除</td>
                                        </tr>
                                    )
                                })):<tr></tr>
                            }
                        </tbody>
                    </table>
                    <div className="tab-Pagination">
                        <Pagination total={this.state.caseList?this.state.caseList.total:0}  current={this.state.currentPage}
                          pageSize={this.state.pageSize}
                          showQuickJumper
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
                <Modal
                    title="提示"
                    visible={this.state.ifCancle}
                    onOk={this.quedingCancle}
                    onCancel={this.quxiao}
                >
                    <p>是否确认删除？</p>
              </Modal>
            </div>
        )
    }
}
