import React, { Component, PureComponent } from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import Divider from 'antd/lib/divider';
import Cookies from 'js-cookie'
import { Select ,Pagination, Modal, Carousel, Button, Checkbox, message } from 'antd';
import {
    willAppointed,
    didAppointed,
    willApprove,
    didApprove,
    changeCurrentPage,
    getHcCaseFromList,
    getSubmitList,
    getSubmitListNotPolice,
    overviewCount,
    queryAllCase,
    postDirection,
    getDirection,
    signOrder,
    policePeopleList,
    policePeopleDetail,
    getFeedBack,
    willDoCount,
    doingCount,
    isFeedBackZhiling,
    changePoliceStation
} from 'actions/masterAction'
import DirectionBack from '../../../images/common/directionback2.png'
import TimeOut from '../../common/time'
import moment from 'moment';
import 'moment/locale/zh-cn';
import DirectionDetail from './directionDetail'
import mpush from '../../../utils/webSocKet'
moment.locale('zh-cn');
const Option = Select.Option;


@connect(
    (state,props)=>({
        config: state.config,
        tabAppointedType:state.tabAppointedTypeResponse,
        hcCaseFromList:state.hcCaseFromListResponse,
        isFeedBackZhiling: state.isFeedBackZhilingResponse,
        getDirectionSearch: state.getDirectionSearchResponse
    })
)


export default class DirectionTable extends Component{
    constructor(props){
        super(props);
        this.type = '',
        this.branchId = '',
        this.appoint ='',
        this.state={
            zoneId:Cookies.get('zoneId'),
            deptLevel: Cookies.get('deptLevel'),
            deptName: Cookies.get('deptName'),
            pageSize:7,
            currentPage : 1,
            caseItemId:'',
            // pageSize: 1,
            isMaster:'1',
            tabAppointed:'',
            hcTaskList:[],
            caseList:{},
            // caseList:this.props.caseList,
            caseType:[],
            taskType:'',
            taskSubType:'',
            caseFromList:[],
            caseFrom:'',
            submited:'',
            selectTypeOption:[],
            visible: false,
            xiafaVisible:false,
            xiafaMessage:"",
            types:[{name:'jack',value:'12'},{name:'jackw',value:'2'},{name:'jackww',value:'22'}],
            thead:['序号',"文件名",'数据来源','市局下发时间','轨迹类型','下发分局','分局下发时间','人数','指令状态'],
            thead21:['序号','姓名','身份证号码',"分局下发时间",'下发派出所','管辖民警',"状态",'操作'],
            thead1:['序号','名称','类型','来源','状态','案发时间','合成状态'],
            thead2:['序号','名称','类型','采集途径','紧急程度','入库时间','合成状态'],
            thead3:['序号',"文件名",'数据来源','市局下发时间','轨迹类型','下发分局','分局下发时间','人数','指令状态'],
            thead31:['序号',"文件名",'数据来源','市局下发时间','轨迹类型','人数','指令状态'],
            thead4:['序号','姓名','证件号码','人员类型','人员级别','管辖单位','管辖民警','签收状态','签收时间','反馈状态','反馈时间'],

            showSecondPage:'false',
            tbody:[
                {index:'1',name:'case',type:'traffic',source:'police',starUser:'jack',startTime:'2017-12-12'},
                {index:'2',name:'case',type:'traffic',source:'police',starUser:'jack',startTime:'2017-12-12'},
                {index:'3',name:'case',type:'traffic',source:'police',starUser:'jack',startTime:'2017-12-12'},
                {index:'4',name:'case',type:'traffic',source:'police',starUser:'jack',startTime:'2017-12-12'},
                {index:'5',name:'case',type:'traffic',source:'police',starUser:'jack',startTime:'2017-12-12'},
                {index:'6',name:'case',type:'traffic',source:'police',starUser:'jack',startTime:'2017-12-12'},
                {index:'7',name:'case',type:'traffic',source:'police',starUser:'jack',startTime:'2017-12-12'}
            ],
            minites: '05',
            miao: '00',
            timer: null,
            modalmm: '20',
            modalss: '00',
            secondPageData:[],
            personDetail:{},
            getFeedBackNews:[],
            shujuleixing:'',
            caseFileList:[],
            minutes: '05',
            seconds: '00',
            checkboxList:[],
            ifChangePolice: 'false',
            whichPolice: '',
            ifShowChanged:'false',
            changedGXDW: '',
            changedGXMJ: '',
            dataTypeCode:'',
            dataSourceCode:''
        }
    }


    componentDidMount(){
        this.setState({
            minutes: '04',
            seconds: '59'
        })
        // this.mpushFn()

    }

 
    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.caseList.total!== this.props.caseList.total){

            this.setState({
                currentPage:1,
                caseList:nextProps.caseList,
                caseType:nextProps.caseType,
                taskType:nextProps.taskSubType,
                selectTypeOption:nextProps.caseType,
                tabAppointed:nextProps.tabAppointed,
                submited: nextProps.total
            },()=>{
                if(this.state.tabAppointed === '0'){
                    this.appoint = '';
                   if(this.state.taskType === '1'){
                        if(this.state.deptLevel === '2'){
                            this.setState({
                                thead:this.state.thead3
                            },()=>{
                            })
                        }else if(this.state.deptLevel === '3'){
                            this.setState({
                                thead:this.state.thead31
                            })
                        }else if(this.state.deptLevel === '4'){
                            this.setState({
                                thead:this.state.thead4
                            })
                        }

                    }else{
                        if(this.state.taskType === '4'){
                            this.setState({
                                thead:this.state.thead2
                            })
                        }else{
                            this.setState({
                                thead:this.state.thead1
                            })
                        }
                    }

                }else if(this.state.tabAppointed === '2'){
                    this.appoint = '1';
                    if(this.state.taskType === '1'){
                        if(this.state.deptLevel === '3'){
                             this.setState({
                                    thead:this.state.thead31
                            })
                       }else if(this.state.deptLevel === '4'){
                        this.setState({
                            thead:this.state.thead4
                        })
                       }
                    }else{
                        this.setState({
                            thead:this.state.thead1
                        })
                    }
                }else if(this.state.tabAppointed === '3'){
                    this.appoint = '2';
                    if(this.state.taskType === '1'){
                        if(this.state.deptLevel === '3'){
                            this.setState({
                                thead:this.state.thead31
                            })
                        }else if(this.state.deptLevel === '4'){
                            this.setState({
                                thead:this.state.thead4
                            })
                        }

                    }else{
                        this.setState({
                            thead:this.state.thead1
                        })
                    }
                }else if(this.state.tabAppointed === '5'){
                    this.appoint = '3';
                    if(this.state.taskType === '1'){
                        if(this.state.deptLevel === '3'){
                            this.setState({
                                thead:this.state.thead31
                            })
                        }else if(this.state.deptLevel === '4'){
                            this.setState({
                                thead:this.state.thead4
                            })
                        }

                    }else{
                        this.setState({
                            thead:this.state.thead1
                        })
                    }
                }
            })

        }
        return true
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
    onShowSizeChange(current,pageChange){
        this.setState({
            pageSize:pageChange
        },()=>{

        })
    }

    search(){
        // console.log('调用search函数请求数据')
        if(this.state.taskType === '1'){
            if(this.state.deptLevel === '4'){
                let status = '';
                if(this.state.tabAppointed === '2'){
                    status = '1'
                }else{
                    status = '2'
                }
                this.props.dispatch(policePeopleList({dataTypeCode:this.state.dataTypeCode,dataSourceCode:this.state.dataSourceCode,"policeStation":this.state.deptName,"status":status,"type":'',"pageNum":this.state.currentPage,"pageSize":7},(res)=>{
                    if(res.data){
                        this.setState({
                            caseList:res.data
                            // thead:this.state.thead3
                        })
                    }else{
                        this.setState({
                            caseList:{}
                            // thead:this.state.thead3
                        })
                    }
                   
                }))
            }else{
                this.props.dispatch(getDirection({dataTypeCode:this.state.dataTypeCode,dataSourceCode:this.state.dataSourceCode,"status":this.appoint,branch:this.state.deptLevel === '2'?"":this.state.deptName,page:this.state.currentPage,pageSize:this.state.pageSize},(res)=>{
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
        }else{
            let source=1;
            this.state.taskType==='2'?source=2:this.state.taskType==='3'?source=1:this.state.taskType==='4'?source=3:'';
            this.props.dispatch(queryAllCase({source:source,page:this.state.currentPage,pageSize:this.state.pageSize},(res)=>{
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
      
    }

    goToWillAppointed(e){
        let caseId = e.currentTarget.getAttribute('data-caseid');
        let source=1;
        this.state.taskType==='2'?source=2:this.state.taskType==='3'?source=1:this.state.taskType==='4'?source=3:'';
        hashHistory.push(`/newsAssign/${caseId}/${source}/${this.state.taskType}`);

    }

    showXiangqing(e){
        let branchId = e.currentTarget.getAttribute('data-branchid');
        let type = e.currentTarget.getAttribute('data-type');
        this.type = type;
        this.branchId = branchId;
        this.setState({
            shujuleixing: type
        },()=>{
            // console.log(this.state.shujuleixing)
        })

        this.secondSearch()

    }
    secondSearch ()  {
        this.props.dispatch(policePeopleList({"branchId":this.branchId,"type":this.type},(res)=>{
            if(res.data){
                this.setState({
                    showSecondPage: 'true',
                    secondPageData: res.data
                })
            }else{
                this.setState({
                    showSecondPage: 'true',
                    secondPageData: []
                })
            }
        }))
   }

   showPeopleList(e){
       let itemId = e.currentTarget.getAttribute('data-itemid');
       let type = e.currentTarget.getAttribute('data-type');
       let sfqs = e.currentTarget.getAttribute('data-sfqs');
       this.selfItemId = itemId;
       this.selfType = type;
       this.setState({
        shujuleixing: type,
        caseItemId: itemId
        },()=>{
           
        })


        if(sfqs === '3'){
            this.props.dispatch(getFeedBack({"itemId":itemId},(res)=>{
                if(res.data){
                    this.setState({
                        getFeedBackNews: res.data
                    },()=>{
                        // console.log(this.state.getFeedBackNews)
                    })
                }
            }))
            this.props.dispatch(policePeopleDetail({"itemId":itemId,"type":type},(res)=>{
                if(res.data){
                    this.setState({
                        personDetail: res.data
                    },()=>{
                        // console.log(this.state.personDetail)
                    })
                    // this.props.dispatch(policePeopleList({"policeStation":this.state.deptName ,"type":'',"pageNum":1,"pageSize":7},(res)=>{
                    //     this.setState({
                    //         caseList:res.data,
                    //         // thead:this.state.thead3
                    //     })
                    // }))
                }
            }))
            this.setState({
                visible:true
            })
        }else{
            let form = new FormData();
            form.append("itemId",itemId);
            form.append("type",type);
             this.props.dispatch(signOrder(form,(res)=>{
                 // if(res.rel){
                     this.props.dispatch(policePeopleDetail({"itemId":itemId,"type":type},(res)=>{
                         if(res.data){
                             this.setState({
                                 personDetail: res.data
                             },()=>{
                                //  console.log(this.state.personDetail)
                             })
                             this.props.dispatch(policePeopleList({"policeStation":this.state.deptName ,"status":"1","type":'',"pageNum":this.state.currentPage,"pageSize":7},(res)=>{
                                if(res.data){
                                    this.setState({
                                        caseList:res.data,
                                        // thead:this.state.thead3
                                    })
                                } else{
                                    this.setState({
                                        caseList:{}
                                    })
                                }
                               
                             }))
                         }
                     }))
                     this.setState({
                         visible:true
                     })

                 // }
             }))
         //    }

        }


   }


    closeDirectionSecond = () => {
        this.setState({
            showSecondPage: 'false'
        })
    }
    showModal(e){
        let itemId = e.currentTarget.getAttribute('data-itemid');
        // let type = e.currentTarget.getAttribute('data-type');
        this.props.dispatch(policePeopleDetail({"itemId":itemId, "type": this.type},(res)=>{
            if(res.data){
                this.setState({
                    personDetail: res.data
                })
            }else{

            }
        }))
        this.props.dispatch(getFeedBack({"itemId":itemId},(res)=>{
            if(res.data){
                this.setState({
                    getFeedBackNews: res.data
                },()=>{
                    // console.log(this.state.getFeedBackNews)
                })
            }
        }))

        this.setState({
            visible:true
        })
    }

    handleCancel = (e) => {
        if(this.state.deptLevel === '4'){
            this.search();
        }
        this.setState({
          visible: false,
        });
      }

    handleOk = (e) => {
    this.setState({
        visible: false,
    });
    this.search()
    }

    xiafaSuccess = (e) => {
        this.setState({
            xiafaVisible: false,
        });
    }
    duoxuan = (values) => {
        console.log(values);

        let flag = false;
        let checkedAll = [];
        values.forEach((item,index)=>{
            if(item === 'checkAll'){
                this.state.secondPageData.forEach((item,index)=>{
                    if(item.orderId){

                    }else{
                        checkedAll.push(item.itemId)
                    }
                   
                })
                checkedAll.unshift('checkAll')
                this.setState({
                    checkboxList: checkedAll
                },()=>{
                    console.log(this.state.checkboxList)
                })
            }else{
                if(this.state.checkboxList.length>0 && this.state.checkboxList[0]==='checkAll'){
                    this.setState({
                        checkboxList:[]
                    },()=>{
                        console.log(this.state.checkboxList)
                    })
                }else{
                    this.setState({
                        checkboxList: values
                    },()=>{
                        console.log(this.state.checkboxList)
                    })
                }
                
            }
        })
    }
  
    xiafaButton = (e) => {
        e.stopPropagation();
        // console.log(this.state.checkboxList)
        let branchIdAndTypeList = '';
        let data = {}
        let length = this.state.checkboxList.length;
        if(length>1){
            for(let i = 1; i<length; i++){
                if(i = length-1){
                    branchIdAndTypeList = branchIdAndTypeList+this.state.checkboxList[i]
                }else{
                    branchIdAndTypeList = branchIdAndTypeList+this.state.checkboxList[i]+","
                }
               
            }
            if(length>2){
                data = {
                    itemIds: branchIdAndTypeList,
                    type: this.type
                }
            }else{
                data = {
                    itemId: branchIdAndTypeList,
                    type: this.type
                }
            }
            // console.log(data)
            
            // let branchId = e.currentTarget.getAttribute('data-branchid');
            // let type = e.currentTarget.getAttribute('data-type');
            this.props.dispatch(postDirection(data,(res)=>{
                if(res.rel){
                    this.setState({
                        xiafaVisible: true,
                        xiafaMessage: "下发成功，已将任务分配到相关派出所"
                    },()=>{
                        this.props.dispatch(policePeopleDetail({"itemId": this.selfItemId,"type": this.selfType},(res)=>{
                            if(res.data){
                                this.setState({
                                    personDetail: res.data
                                },()=>{
                                    // console.log(this.state.personDetail)
                                })
                              
                            }
                        }))
                        this.props.dispatch(getDirection({"status":'1',"branch":this.state.deptLevel === '2'?"":this.state.deptName,"page":this.state.currentPage,"pageSize":7},(res)=>{
                            this.props.dispatch(willDoCount({count: res.data.total}))
                        }))
                        this.props.dispatch(getDirection({"status":'2',"branch":this.state.deptLevel === '2'?"":this.state.deptName,"page":this.state.currentPage,"pageSize":7},(res)=>{
                            this.props.dispatch(doingCount({count: res.data.total}))
                        }))
                        this.props.dispatch(getDirection({"status":'1',branch:this.state.deptName,page:this.state.currentPage,pageSize:this.state.pageSize},(res)=>{
                            if(res.data){
                                this.setState({
                                    caseList:res.data,
                                })
                                this.props.dispatch(zhilingTotal(res.data.total))
                            }else{
                                this.setState({
                                    caseList:{},
                                })
                                this.props.dispatch(zhilingTotal(res.data.total))
                            }
                        }));
                      
                    });
                }else{
                    this.setState({
                        xiafaVisible: true,
                        xiafaMessage: "下发失败"
                    });
                }
            }))
        }else{
            message.error("暂无案件可以下发",3)
        }
       

    }

    timeout(){
        this.search();
    }

    changePcs(itemid){
        this.setState({
            ifChangePolice: 'true',
            whichPolice: itemid
        })
    }
    quxiaoXiugai(){
        this.setState({
            ifChangePolice: 'false',
            whichPolice: ''
        })
    }
    quedingXiugai(itemid){
       
        this.setState({
            ifShowChanged: 'true',
            ifChangePolice: 'false',
            whichPolice: ''
        })
        // this.props.dispatch(changePoliceStation(
        //     {"gxdw":this.state.changedGXDW,
        //     "gxmj": this.state.changedGXMJ,
        //     "itemId":itemid,
        //     "type":this.type},(res)=>{
                 
        // }))
    }
    
    gxdw = (e) => {
        this.setState({
            changedGXDW: e.target.value
        })
    }
    gxmj = (e) =>{
        this.setState({
            changedGXMJ: e.target.value
        })
    }


    render(){
        const {  tabAppointedType ,hcCaseFromList, isFeedBackZhiling, getDirectionSearch } = this.props;
        let setting = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            variableWidth: true
        }
       
        return(
            <div className="showDirection-contain">
            {
                this.state.deptLevel === '4'?(''):(
                    <div className={this.state.showSecondPage === 'false'&&this.state.taskType==='1'?'showTimeEnd':'display-none'}> <div> 距离下次刷新还有 <TimeOut endtime={this.timeout.bind(this)} minutes={this.state.minutes} seconds={this.state.seconds}/> </div></div>

                )
            }
                {/*<div className={this.state.showSecondPage === 'false'&&this.state.taskType==='1'?'showTimeEnd':'display-none'}> <p> 距离下次刷新还有 <span> {this.state.minites} : {this.state.miao}</span></p></div>
        */}
                <div className="appoint-content-contain" style={{marginTop:'0'}}>
                        <div className="masTable-contain">
                            <div className="masTable-search">
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
                            <div className="masTable-table">
                                
                                <table>
                                    <thead>
                                    <tr>
                                       
                                        {
                                            this.state.thead?(this.state.thead.map((item,index)=>{
                                                return <th key={'data'+index}>{item}</th>
                                          })
                                          ):<th/>
                                        }
                                    </tr>
                                    </thead>
                                    <tbody className="zhilingTable-tbody">
                                    
                                    {
                                        this.state.deptLevel === '4'?(
                                            this.state.caseList&&this.state.caseList.list?(this.state.caseList.list.map((item,index)=>{

                                                    return(
                                                        <tr key={"id"+index} style={{cursor: 'pointer'}} onClick={this.showPeopleList.bind(this)} data-itemid={item.itemId} data-sfqs={item.sfqs} data-type={item.sjlx} >
                                                            <td>{index+1+(this.state.currentPage-1)*this.state.pageSize}</td>
                                                            <td>{item.xm}</td>
                                                            <td>{item.sfzh}</td>
                                                            <td title={item.rylb}>{item.rylb.substr(0,5)}</td>
                                                            <td>{item.ryjb}</td>
                                                            <td title={item.gxdw}>{item.gxdw.substr(0,5)}</td>
                                                            <td>{item.gxmj}</td>
                                                            <td>{item.sfqs === '1'?"未签收":'已签收'}</td>
                                                            <td>{item.qssj&&item.qssj}</td>
                                                            <td>{item.sfqs === '3'?"已反馈":"未反馈"}</td>
                                                            <td>{item.fksj && item.fksj}</td>
                                                        </tr>
                                                    )
                                            })): <tr></tr>
                                        ):(
                                            this.state.caseList&&this.state.caseList.list?(this.state.caseList.list.map((item,index)=>{

                                                if( this.state.taskType==='3'||this.state.taskType==='2'){
                                                    return(
                                                        <tr key={'caseId'+index} style={{cursor: 'pointer'}} onClick={this.goToWillAppointed.bind(this)} data-caseid={item.caseId}  >
                                                            <td>{index+1+(this.state.currentPage-1)*this.state.pageSize}</td>
                                                            <td title={item.caseName}>{item.caseName&&item.caseName.substr(0,14)}</td>
                                                            <td title={item.caseTypeDesc}>{item.caseTypeDesc&&item.caseTypeDesc.substr(0,10)}</td>
                                                            <td>{item.caseFromDesc}</td>
                                                            <td>{item.caseStateDesc}</td>
                                                            <td>{item.caseTime}</td>
                                                            <td>{item.isLaunch === '1'?"已发起":'待发起'}</td>
                                                        </tr>
                                                    )
                                                }else if(this.state.taskType==='4'){
                                                    return(
                                                        <tr key={"id"+index} style={{cursor: 'pointer'}} onClick={this.goToWillAppointed.bind(this)} data-caseid={item.id}  >
                                                            <td>{index+1+(this.state.currentPage-1)*this.state.pageSize}</td>
                                                            <td title={item.bt}>{item.bt&&item.bt.substr(0,14)}</td>
                                                            <td>{item.xxlx==='1'?'综合类情报':item.xxlx==='2'?'行动性情报':''}</td>
                                                            <td>{item.cjtj==='1'?'日常工作':item.cjtj==='2'?'互联网监察':item.cjtj==='3'?'人力情报':item.cjtj==='4'?'专案工作':''}</td>
                                                            <td>{item.jjcd==='1'?'一般':item.jjcd==='2'?'重要':item.jjcd==='3'?'紧急':''}</td>
                                                            <td>{moment(item.cts).format('YYYY-MM-DD HH:MM:SS')}</td>
                                                            <td>{item.sffq === '1'?"已发起":'待发起'}</td>
                                                        </tr>
                                                    )
                                                }else if(this.state.taskType==='1'){
                                                    if(this.state.deptLevel === '3'){
                                                        return(
                                                            <tr key={"id"+index}>
                                                                <td>{index+1+(this.state.currentPage-1)*this.state.pageSize}</td>
                                                                <td><a href={item.wjlj}>{item.wjm}</a></td>
                                                                <td>{item.sjlx==='1'||item.sjlx==='2'?"省厅":"公安部"}</td>
                                                                <td>{item.sjxfsj}</td>
                                                                <td>{item.sjlx === '1'?"进站数据":(item.sjlx === '2'?'取票数据':'轨迹数据')}</td>
                                                                <td>{item.rs}</td>
                                                                <td  style={{cursor: 'pointer'}} onClick={this.showXiangqing.bind(this)} data-branchid={item.id} data-type={item.sjlx}  >{item.sfxf === '1'?"未下发":(item.sfxf === '2'?'未签收':(item.sfxf === '3'?"已签收未反馈":"已反馈"))}</td>
                                                            </tr>
                                                        )
                                                    }else{
                                                        return(
                                                            <tr key={"id"+index}  >
                                                                <td>{index+1+(this.state.currentPage-1)*this.state.pageSize}</td>
                                                                <td><a href={item.wjlj}>{item.wjm}</a></td>
                                                                <td >{item.sjlx==='1'||item.sjlx==='2'?"省厅":"公安部"} </td>
                                                                <td>{item.sjxfsj}</td>
                                                                <td>{item.sjlx === '1'?"进站数据":(item.sjlx === '2'?'取票数据':'轨迹数据')}</td>
                                                                <td>{item.xffj}</td>
                                                                <td > {item.fjxfsj&&item.fjxfsj}</td>
                                                                <td>{item.rs}</td>
                                                                <td style={{cursor: 'pointer'}} onClick={this.showXiangqing.bind(this)} data-branchid={item.id} data-type={item.sjlx} >{item.sfxf === '1'?"未下发":(item.sfxf === '2'?'未签收':(item.sfxf === '3'?"已签收未反馈":"已反馈"))}</td>
                                                            </tr>
                                                        )
                                                    }
                                                }
                                            }) 
                                        ):<tr/>
                                        )

                                    }
                                   
                                    </tbody>
                                </table>
                               
                                <div className="tab-Pagination">
                                    <Pagination total={this.state.caseList.total?this.state.caseList.total:0}  current={this.state.currentPage}
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
                </div>
                {
                    this.state.showSecondPage === 'true'?(
                        <div className="showSecondPage showDirectionAnimation">
                        <button className = "showDirection-button" onClick={this.closeDirectionSecond}><img src={DirectionBack} alt="pic"/></button>
                        <div className="masTable-contain">
                            <div className="masTable-search" style={{paddingLeft:'2rem'}}>
                                <span>类型：</span>
                                <Select defaultValue="请选择" size='large' style={{ width: 120 }} onChange={this.changeType}>
                                    {
                                        this.state.selectTypeOption.length>0?(this.state.selectTypeOption.map((item,index)=>{
                                            return <Option key={item.typeId} value={item.typeId}>{item.typeName}</Option>
                                        })):<Option value=''>请选择</Option>
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
                                <button className="button" onClick={this.secondSearch.bind(this)}>查询</button>
                            </div>
                            <div className="masTable-table">
                            <Checkbox.Group className="Group" value={this.state.checkboxList} onChange={this.duoxuan}>
    
                                <table>
                                    <thead>
                                    <tr>
                                        {
                                            this.state.deptLevel === '3'&&this.state.tabAppointed === '2'&& this.state.taskType === '1'?(
                                                <th><Checkbox value='checkAll'></Checkbox></th>
                                            ):(
                                            ''
                                            )
                                        }
                                        {
                                            this.state.thead21?(this.state.thead21.map((item,index)=>{
                                                return  <th key={'data'+index}>{item}</th>
                                            })
                                        ):<th/>
                                        }
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.secondPageData&&this.state.secondPageData.map((item,index)=>{
                                            if(this.state.tabAppointed === '2'&&this.state.deptLevel ==='3'){
                                                return(
                                                    <tr key={'caseId'+index}>
                                                        <td style={{width:'5%'}} className={this.state.deptLevel === '3'&&this.state.tabAppointed ==='2'?"":"displayNone"}>
                                                            <Checkbox disabled={item.orderId?true:false} value={item.orderId?'':item.itemId}></Checkbox></td>
                                                        <td style={{width: '5%'}}>{index+1+(this.state.currentPage-1)*this.state.pageSize}</td>
                                                        <td  onClick={this.showModal.bind(this)} data-itemid={item.itemId}>{item.xm}</td>
                                                        <td>{item.sfzh}</td>
                                                        <td>{item.fjqrsj}</td>
                                                        <td>{this.state.ifChangePolice === 'true'&&this.state.whichPolice === item.itemId?<input type="text" placeholder="请输入" onBlur={this.gxdw}/>:(this.state.ifShowChanged ==='true'?this.state.changedGXDW:item.gxdw)}</td>
                                                        <td style={{width:'9%'}}>{this.state.ifChangePolice === 'true'&&this.state.whichPolice === item.itemId?<input type="text" placeholder="请输入" onBlur={this.gxmj}/>:(this.state.ifShowChanged ==='true'?this.state.changedGXMJ:item.gxmj)}</td>
                                                        <td>{item.orderId?(item.sfqs === '1'?"未签收":(item.sfqs === '2'?"已签收未反馈":"已反馈")):'未下发'}</td>
                                                        <td style={{width:"9%"}} className={this.state.ifChangePolice === 'true'&&this.state.whichPolice === item.itemId?"":"displayNone"}>
                                                            <div><button onClick={this.quedingXiugai.bind(this,item.itemId)}>确定</button>
                                                            <button onClick={this.quxiaoXiugai.bind(this)}>取消</button></div>
                                                        </td>
                                                        <td style={{width:"9%"}} className={this.state.ifChangePolice === 'true'&&this.state.whichPolice === item.itemId?"displayNone":""}>
                                                            
                                                            {item.orderId?(
                                                                <button style={{color: 'rgba(0,0,0,0.2)',cursor:'not-allowed'}}>编辑</button>
                                                            ):(
                                                                <button onClick={this.changePcs.bind(this,item.itemId)}>编辑</button>
                                                                
                                                            )}
                                                        </td>
                                                      
                                                    </tr>
                                                )
                                            }else{
                                                return(
                                                    <tr key={'caseId'+index}>
                                                        <td style={{width:'5%'}} className={this.state.deptLevel === '3'&&this.state.tabAppointed ==='2'?"":"displayNone"}><Checkbox value={item.itemId}></Checkbox></td>
                                                        <td style={{width: '5%'}}>{index+1+(this.state.currentPage-1)*this.state.pageSize}</td>
                                                        <td  onClick={this.showModal.bind(this)} data-itemid={item.itemId}>{item.xm}</td>
                                                        <td>{item.sfzh}</td>
                                                        <td>{item.fjqrsj}</td>
                                                        <td>{item.gxdw}</td>
                                                        <td>{item.gxmj}</td>
                                                        <td>{item.orderId?(item.sfqs === '1'?"未签收":(item.sfqs === '2'?"已签收未反馈":"已反馈")):'未下发'}</td>
                                                        <td style={{width:"9%"}} ><button style={{color: 'rgba(0,0,0,0.2)',cursor:'not-allowed'}}>编辑</button></td>
                                                    </tr>
                                                )
                                            }
                                           
                                        })
                                    }
                                    </tbody>
                                </table>
                                </Checkbox.Group>
    
                                <div className="tab-Pagination">
                                <button onClick={this.xiafaButton} className={this.state.deptLevel === '3'&&this.state.tabAppointed ==='2'?"button queRenXiaFaBtn":"displayNone"}>确认下发</button>
    
                                    <Pagination total={this.state.secondPageData?this.state.secondPageData.length:0} current={this.state.secondPage}
                                                pageSize={this.state.pageSize}
                                                onChange={
                                                    (page) => {this.setState({
                                                        secondPage:page
                                                    },()=>{
                                                        this.secondSearch();
                                                    })
                                                    }
                                                }/>
                                </div>
                            </div>
    
                        </div>
    
                    </div>
                    ):(
                        ''
                    )
                }
               

                <Modal
                    title="下发提示"
                    visible={this.state.xiafaVisible}
                    onOk={this.xiafaSuccess}
                    // onCancel={this.handleCancel}
                    // okText="确认"
                    // cancelText="取消"
                    style = {
                        {"width": "auto"}
                    }
                    footer={[
                        <Button key="submit" type="primary" onClick={this.xiafaSuccess}>
                          确认
                        </Button>
                      ]}
                >
                <p style={{color:'#666',fontSize:'1.25rem'}}>{this.state.xiafaMessage}</p>

                </Modal>


                <Modal
                    title="进站人员基本信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    // okText="确认"
                    // cancelText="取消"
                    style={
                      {top: '1%'}
                    }
                    width = '40vw'
                    centered
                    footer={null} //去掉底部按钮

                >
                      {
                        this.state.deptLevel === '4'&& (this.state.personDetail&&this.state.personDetail.sfqs !=='3')?(
                            // <div className="modal-time"> <p> 反馈倒计时 <span> {this.state.modalmm} : {this.state.modalss}</span></p></div>
                            <div className="modal-time"> <p style={{"color":"red"}}>请在签收案件半小时内进行反馈！</p></div>
                        ):''
                      }

                    <div className="jinZhanRenYuan">
                        <DirectionDetail cancle={this.handleCancel} sjlx={this.state.shujuleixing} caseFileList={this.state.caseFileList} data={this.state.personDetail} feedNews={this.state.getFeedBackNews}/>
                        {/*<Carousel {...setting}>
                            <div >
                                <DirectionDetail handleCancel={this.handleCancel}/>
                            </div>
                        </Carousel>  */}
                    </div>

                </Modal>
            </div>
        )
    }
}
