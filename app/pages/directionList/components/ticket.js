import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import Divider from 'antd/lib/divider';
import Cookies from 'js-cookie'
import EditIcon from '../../../images/info/edit.png'
import { Select ,Pagination ,message, Modal, Radio , Button} from 'antd';
import Report2Word from '../../reportWord/component/Report2Word'
import {
    policePeopleList

} from 'actions/masterAction'
import {
    getWordReport,
    sendSubmitReport
} from "actions/reportWord";
import {
    getHcDetail
}from 'actions/syntheticInfo'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@connect(
    (state,props)=>({
        config: state.config,
        tabAppointedType:state.tabAppointedTypeResponse,
        hcCaseFromList:state.hcCaseFromListResponse,
        mijiList:state.mijiResponse,
        getDirectionSearch: state.getDirectionSearchResponse
    })
)


export default class Ticket extends Component{
    constructor(props){
        super(props);
        this.state={
            deptName:Cookies.get('deptName'),
            pageSize:7,
            currentPage : 1,
            isMaster:'1',
            secretLevel:1,
            tabAppointed:'',
            reportShow:'none',
            ifCreateReport:false,
            wordModalVisible:false,
            dataTypeCode: '',
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
            types:[{name:'jack',value:'12'},{name:'jackw',value:'2'},{name:'jackww',value:'22'}],
            thead:['序号','数据来源','数据类型','姓名','证件号码','车次','发站','到站','乘车日期','乘车时间','人员类别','人员标签','人员级别',
                    '管辖单位','管辖民警','签收状态',
                    '反馈状态',
                ],
            tbody:[
                {index:'1',name:'case',type:'traffic',source:'police',starUser:'jack',startTime:'2017-12-12'},
               ]
        }
    }


    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.caseList!== this.props.caseList){

            this.setState({
                currentPage:1,
                caseList:nextProps.caseList,
                // tabAppointed:nextProps.tabAppointed
            },()=>{
                // console.log(this.state.selectTypeOption);
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
        this.setState({
            wordModalVisible: false,
        });
    }

    search(){
          //订票预警
          this.props.dispatch(policePeopleList({dataTypeCode:this.state.dataTypeCode,dataSourceCode:this.state.dataSourceCode,"policeStation": this.state.deptName,"type":'2',"pageNum":this.state.currentPage,"pageSize":this.state.pageSize},(res)=>{
            if(res.data){
                this.setState({
                    caseList: res.data
                })
            }else{
                this.setState({
                    caseList: {}
                })
            }
        }))
    }

    changeType=(value)=>{
        this.setState({
            dataTypeCode:value
        })

    }
    changeSource=(value)=>{
        this.setState({
            dataSourceCode:value
        })
    }







    render(){
        const {  tabAppointedType ,hcCaseFromList, mijiList, getDirectionSearch } = this.props;
        return(
            <div className="masTable-contain">
                <Modal
                    title={<span style={{color: '#2C567F', fontSize: '1.25rem'}}>{this.state.caseInfo.caseName?this.state.caseInfo.caseName:''}</span>}
                    visible={this.state.wordModalVisible}
                    onCancel={this.handleCancel}
                    width={'75%'}
                    height={'70vh'}
                    className = 'word-modal'

                >
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
                                this.state.caseList.length>0&& this.state.caseList.map((item,index)=>{
                                    return(
                                        <tr key={index} >
                                            <td>{index+1+(this.state.currentPage - 1)*this.state.pageSize}</td>
                                            <td>省厅</td>
                                            <td>{item.dataTypeName}</td>
                                            <td>{item.xm}</td>
                                          {/*<td title={item.sfzh}>{item.sfzh.substr(0,6)}</td>*/}
                                            <td>{item.sfzh}</td>
                                            <td>{item.cc}</td>
                                            <td>{item.fz}</td>
                                            <td>{item.dz}</td>
                                            <td>{moment(item.ccrq).format("YYYY-MM-DD")}</td>
                                            <td>{moment(item.ccsj).format("MM:DD")}</td>
                                            <td>{item.rylb}</td>
                                            <td>{item.rybq}</td>
                                            <td>{item.ryjb}</td>
                                            <td title={item.gxdw}>{item.gxdw.substr(0,5)}</td>
                                            <td>{item.gxmj}</td>
                                            <td>{item.sfqs === '1'?"未签收":"已签收"}</td>
                                            <td>{item.sfqs === '3'?"已签收":"未签收"}</td>
                                        </tr>
                                    )
                                })
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

            </div>
        )
    }
}
