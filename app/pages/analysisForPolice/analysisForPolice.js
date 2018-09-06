
import React, {Component} from 'react'
import {connect} from 'react-redux'
import { hashHistory} from 'react-router'
import './analysisForPolice.less'
import '../analysisForSeat/analysisForSeat.less'
import '../traceOfSource/traceOfSource.less'
import Cookies from 'js-cookie'
import Divider from 'antd/lib/divider';
import titleIcon from '../../images/info/syntheticIcon.png'
import Image from '../../images/source/image.svg'
import Word from '../../images/source/word.svg'
import Excle from '../../images/source/excel.svg'
import File from '../../images/source/file-1.png'
import FeedCircle1 from '../../images/common/feedCircle-1.png'
import FeedCircle2 from '../../images/common/feedCircle-2.png'
import FeedCircle3 from '../../images/common/feedCircle-3.png'
import flowDone from '../../images/info/flowDone.png'
import Sign from '../../images/info/sign.png'

import TalkNewsLeft from '../traceOfSource/components/talkNewsLeft'
import TalkNewsRight from '../traceOfSource/components/talkNewsRight'

import Fankui from '../../images/source/fankuiTitle.png'
import RightMan from '../../images/analysis/rightManWhite.png'
import RenyuanXinxi from '../../images/analysis/rightMan.png'
import Tupu from '../../images/analysis/connect.png'
import Guiji from '../../images/analysis/guiji.png'
import GuijiYanpan from '../../images/analysis/guijiyanpan.png'
import Jiankong from '../../images/analysis/jiankong.png'
import ChaojiJiansuo from '../../images/analysis/superSearch.png'
import RightButton from '../../images/analysis/rightButton.png'
import PickUp from '../../images/analysis/pickUp.png'
import Add from '../../images/analysis/add.png'
import Tool from '../../images/analysis/tool.png'
import SuperSearch from '../analysisForSeat/components/superSearch'

import appointIcon from '../../images/info/appoint.png'

// import EditIcon from '../../images/info/edit.png'
import EditDoneIcon from '../../images/info/edit-done.png'
import Computer from '../../images/info/computer.png'
import ComputerWhite from '../../images/info/computer-white.png'
import EditIcon from '../../images/info/edit.png'
import mpush from '../../utils/webSocKet'
// import { wsUrl,systemId } from  '../../actions/otherUrl'
import {
    getHcDetail,
    getApprove,
    analysisForPoliceApi,
    getTaskWillTodo,
    getChatMessageHistory,
    postChatMessage,
    pushMessage
}from 'actions/analysisForPoliceAction'
import {
    sendRecvFeedBack,
    sendUploadFiles
}from 'actions/analysisForSeatAction'
import {
    getHcPushInfoById,
    getHcZoneRecvList,
}from 'actions/traceOfSourceAction'
getFileList
import {
    getFileList,
    getHcResult
}from 'actions/syntheticInfo'
import {Button, Carousel, Col, Modal, Row, Table , message,Rate } from "antd";

import {
    getWordReport
}from 'actions/reportWord'
import Report2Word from "../reportWord/component/Report2Word";
import moment from 'moment'
moment.locale('zh-cn');

@connect(
    (state, props) => ({
        config: state.config,
        // chatMessageHistory:state.chatMessageHistoryResponse
    })
)

export default class AnalysisForPolice extends Component{

    constructor(props){
        super(props);
        this.state={
            caseInfo:{},
            checkTaskDeail:{},
            hcZoneRecvList:[],
            rightSide:false,
            modalVisible:false,
            id:this.props.params.id,//'2018031900001'
            state:this.props.params.state,//1
            policeTypeId:Cookies.get('policeTypeId'),
            zoneId: Cookies.get('zoneId'),
            currentPoliceTypeId:Cookies.get('policeTypeId'),
            taskWillTodo:[],
            feedCurrentPushId:'',
            currentDate:'',
            wordModalVisible:false,
            ifCreateReport:false,
            isShiju:true,
            isMaster:false,
            reportInfo:{},
            hcResult:{},
            superSearchData:[],
            reportStatus:'',
            files:[
                // {fileName:'某图片',fileType:'image'},
                // {fileName:'某图片',fileType:'image'},
                // {fileName:'某图片',fileType:'image'},
                // {fileName:'某文件',fileType:'word'},
                // {fileName:'某文件',fileType:'word'},
                // {fileName:'某文件',fileType:'word'},
                // {fileName:'某文件',fileType:'word'},
                // {fileName:'某材料',fileType:'excle'},
            ],
            approveData:[{
                key: '1',
                name: '填写表单',
                sign: '周警官',
                date: '2017-11-08 16:32:23',
                control: '提交',
                suggestion:'审批意见审批意见审批意见审批意见审批意见审批意见',
            },{
                key: '2',
                name: '审批',
                sign: '李主任',
                date: '2017-11-08 16:32:23',
                control: '不同意',
                suggestion:'审批意见审批意见审批意见审批意见审批意见审批意见',
            }],
            approveColumn:[{
                title: '',
                key: 'index',
                // width: '5%',
                render: (text, recordId, index) => <span>{index + 1}</span>,
            },{
                title: '节点名称',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '电子签名',
                dataIndex: 'sign',
                key: 'sign',
            }, {
                title: '签名日期',
                dataIndex: 'date',
                key: 'date',
            },{
                title: '操作',
                dataIndex: 'control',
                key: 'control',
            },{
                title: '审批意见',
                dataIndex: 'suggestion',
                key: 'suggestion',
            }, ],


            feedNews:[
                { feedTime:'2017-12-12   08:08:08', role:'结束', feedDesc:'fsjfkslfjdsjflsjjfjjfsldk饭店经理反馈说了', fileName:'某图片'},
                { feedTime:'2017-12-12   08:08:08', role:'重大案事件合成席', feedDesc:'fsjfkslfjdsjflsjjfjjfsldk饭店经理反馈说了', fileName:'某图片'},
                { feedTime:'2017-12-12   08:08:08', role:'特侦合成席', feedDesc:'fsjfkslfjdsjflsjjfjjfsldk饭店经理反馈说了', fileName:'某图片'}
            ],
            feedCircle:FeedCircle1,
            readTaskShow:-1,
            tools:[
                {name:'市云搜',src:RenyuanXinxi ,link:'http://10.95.94.67/pcsII/pcspublic/index' },
                {name:'关系图谱',src:Tupu ,link:'http://10.95.18.122:3000/login2?username=zhzx' },
                {name:'超级检索',src:ChaojiJiansuo, link:'superSearch' },
                {name:'轨迹',src:Guiji ,link:`http://10.95.18.131:5555/policeMap/baiduMap.html?token=${Cookies.get("token")}`},
                {name:'街区监控',src:Jiankong ,link:''},
                {name:'数模空间',src:GuijiYanpan,link:''},
                {name:'串并案',src:Jiankong ,link:'http://10.95.94.162:9029/criminalCaseAnalysis/views/homepage.jsp?username=tyga'},
                {name:'更多',src:Guiji ,link:'more'},
            ],
            showTool:'none',
            showSearch:'none',
            sendTaskFile:[],
            feedBackFile:[],
            showTalk:'0',
            talkList:[],
            needTodo:[
                {index:'1',time:'2018-12-12 09:09:09',content:'dfsdfsdfafdfdsfdsfdfdsfdsfdf',files:[{name:'某文件',extrName:'xls'}]},
                {index:'2',time:'2018-12-12 09:09:09',content:'dfsdfsdfafdfdsfdsfdfdsfdsfdf',files:[{name:'某文件',extrName:'xls'}]},
                {index:'3',time:'2018-12-12 09:09:09',content:'dfsdfsdfafdfdsfdsfdfdsfdsfdf',files:[{name:'某文件',extrName:'xls'}]},
            ]
           
        }
    }

    mpushFn(){
        let _self = this ;
        // mpush.close();
        mpush.bindUser(`${global.$GLOBALCONFIG.$systemId}-${Cookies.get('username')}-${this.state.caseInfo.id}`,'',
        (result)=>{
      
                console.log('----------接收反馈开始----------');
                let data = JSON.parse(result);
                // console.log(data);
                let mes = JSON.parse(data.content);
                // console.log('mes')
                // console.log(mes);
                let content = JSON.parse(mes.content);
                // console.log('content')
                // console.log(content);
                if (mes.title === '多人聊天') {
                    if (content.id === _self.state.id) {  // 是本案的聊天
                        let showMsg = {
                            policeTypeName: content.policeTypeName,
                            content: content.content,
                            policeTypeId: content.policeTypeId
                        };
                        // console.log(showMsg)
                        let talkList = _self.state.talkList;
                        talkList.push(showMsg);
                        _self.setState({talkList: talkList});
                    }
                } else {
                    if (content.pushType === 1) {//获取警种指派数量
                        // _self.getPoliceTypes();

                        _self.getTaskWillTodo();
                    }else if(content.pushType === 2) {
                        _self.getFeedList();
                    }
                }
                console.log('========接收反馈完毕======');
               
        
      
            // offLine: function () {
            //     message.error('您已在其他设备上登录，请重新登录！', 2);
            //     // window.alert("已在别处登录");
            //     _this.clearCookie();
            //     sessionStorage.removeItem("buttons");
            //     window.setTimeout(() => {
            //         window.location.href = '/login'
            //     }, 2000)
      
            // }
        });
    }

    componentWillMount(){
        if(Cookies.get('authCode')&&Cookies.get('authCode').indexOf('hczhRole')!==-1){
            this.setState({
                isMaster:true
            })
        }else{
            this.setState({
                isMaster:false
            })
        }
       
        this.props.dispatch(getHcDetail({id:this.state.id,state:this.state.state}, (res) => {
            if (res.status === 200 && res['data']) {
                this.setState({
                    caseInfo:res.data
                },()=>{
                    this.mpushFn();
                    let length = this.state.caseInfo.composeResultList.length;
                    if(length > 0){
                        let report = this.state.caseInfo.composeResultList[length-1];
                        let reportStatus = report.reportExt && report.reportExt.reportStatus
                        this.setState({
                            reportStatus:reportStatus
                        })
                    }
                    
                     //获取合成结果列表
                    //  this.props.dispatch(getHcResult({id:this.state.id,taskTime:this.state.caseInfo.taskTime}, (res) => {
                    //     if (res.status === 200 && res['data']) {
                    //         this.setState({
                    //             hcResult: res.data
                    //         },()=>{
                               
                    //         })
                    //     }else{
                    //         this.setState({
                    //             hcResult: {}
                    //         })
                    //     }
                    // }))
                })

            }

        }))
       
        this.getFeedList();
        //获取代办任务列表{policeTypeId:'10019',id:'2018031400003'}
        // this.props.dispatch(getTaskWillTodo({policeTypeId:this.state.policeTypeId,id:this.state.id},(res)=>{
       this.getTaskWillTodo();

       
       this.props.dispatch(getFileList({id:this.state.id,status:'1'},(res)=>{
        if(res.data.length>0){
            this.setState({
                files:res.data
            })
        }else{
            this.setState({
                files:[]
            })
        }
    }))
    }

    getFeedList(){
        this.props.dispatch(getHcZoneRecvList({id:this.state.id},(res)=>{
            if(res.data.length>0){
                this.setState({
                    hcZoneRecvList:res.data
                })
            }else{
                this.setState({
                    hcZoneRecvList:[]
                })
            }
        }))
    }

    getTaskWillTodo(){
        this.props.dispatch(getTaskWillTodo({policeTypeId:this.state.policeTypeId,id:this.state.id,willDo:'1'},(res)=>{
            if(res.data.length>0){
                this.setState({
                    taskWillTodo:res.data,
                    feedCurrentPushId:res.data[0].pushId
                })
            }else{
                this.setState({
                    taskWillTodo:[]
                })
            }
        }))
    }

    getChatMessageHistory(){
        this.props.dispatch(getChatMessageHistory({id:this.state.id},(res)=>{
        // this.props.dispatch(getChatMessageHistory({caseId:'A1401071400002017112233'},(res)=>{
            if(res.data.length>0){
                this.setState({
                    talkList:res.data
                })
            }else{
                this.setState({
                    talkList:[]
                })
            }
        }))
    }

    componentDidMount(){
        let currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
        this.setState({
            currentDate:currentDate
        })
    }
    componentDidUpdate(prevProps, prevState){
        let talkContent = this.refs.talkContent;
        talkContent.scrollTop = talkContent.scrollHeight - talkContent.offsetHeight
      
    }
   

    showHistory(){
        // this.props.dispatch(getApprove({id:this.state.id}, (res) => {
        //     if (res.status === 200 && res['data']) {
        //         /*this.setState({
        //             caseInfo:res.data
        //         })*/

        //     }

        // }))
        this.setState({
            rightSide:true,
        })
    }
    
    showModal = () => {
        this.setState({
            modalVisible: true,
        });
    }
    cancelRightSide(){
        // console.log('11')
        this.setState({rightSide:false})
    }
    handleOk = (e) => {
        // console.log(e);
        this.setState({
            modalVisible: false,
        });
    }
    handleCancel = (e) => {
        // console.log(e);
        this.setState({
            modalVisible: false,
        });
    }
    showTalk(){
        this.setState({
            showTalk:'1'
        })
        this.getChatMessageHistory()
    }
    closeTalk(){
        this.setState({
            showTalk:'0'
        })
    }
    readTask(e){
        e.stopPropagation();
        let num = e.currentTarget.getAttribute('data-pushid');
        let infoDate = e.currentTarget.getAttribute('data-date');
        this.props.dispatch(getHcPushInfoById({pushId:num},(res)=>{
            if(res.data){
                this.setState({
                    readTaskShow:infoDate,
                    checkTaskDeail:res.data
                })
            }else{
                this.setState({
                    readTaskShow:infoDate,
                    checkTaskDeail:{}
                })
            }
        }))
    }
    closePop(){
        this.setState({
            readTaskShow:-1
        })
    }
    stopPropagation(e){
        e.stopPropagation();
    }
    showTool(){
        this.setState({
            showTool:this.state.showTool === 'block'?'none':'block',
            // showSearch:'block'
        })
    }
    goTools=(e)=>{
        let link = e.currentTarget.getAttribute('data-link');
        if(link.indexOf('superSearch')!==-1){
            this.setState({
                showSearch:'block',
                showTool:'none',
            })
        }else if(link.indexOf('more')!==-1){
            hashHistory.push('/toolBox');
            this.setState({
                showTool:'none',
            })
        }else{
            window.open(link);
            this.setState({
                showTool:'none',
            })
        }
      
    }
    // superSearch=(e)=>{
    //     this.setState({
    //         showSearch:'block',
    //         showTool:'none'
    //     })
    // }
    closeSuperSearch(e){
        // console.log(e)
        this.setState({
            showSearch:e
        })
    }
    enterKey(e){
        if(e.keyCode == 13){
            this.sendMsg();
        }
    }

    showWordModal = (e) => {
        let reportid = e.currentTarget.getAttribute('data-reportid');
        this.setState({
            wordModalVisible: true,
        });
        this.props.dispatch(getWordReport({reportId:reportid,id:this.state.id}, (res) => {
            if (res.status === 200 && res['data']) {
                this.setState({
                    reportInfo:res.data
                })

            }

        }))

    }

    // 溯源按钮点击事件
    origins(e){
        let {id, state} = this.props.params
        let deptNo = e.currentTarget.getAttribute('data-deptNo');
        // hashHistory.push(`/traceOfSource/${id}/${state}/${deptNo}`);
        window.open(`/#/traceOfSource/${id}/${state}/${deptNo}`);

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
    handleCancel = (e) => {
        this.setState({
            modalVisible: false,
            wordModalVisible: false,
        });
    }


     // 发送消息
     sendMsg(){
           let policeTypeName = Cookies.get("policeTypeName");
           let content = this.refs.taleContent.value;
           let data = {
               content : content,
            //    warnId : this.state.caseInfo.caseId,
               policeTypeId:this.state.policeTypeId,
               policeTypeName :policeTypeName,
               toUser:'',
               id:this.state.id
           };
        //    console.log(data)
        let regu = "^\\s*$";
        let re = new RegExp(regu);
        // console.log(re.test(content));
        
    
         if(!(re.test(content))){
            this.props.dispatch(postChatMessage(data,(res)=>{
                //    console.log(res)
                   if(res.status === 200){
                        this.refs.taleContent.value = '';
                   }else{
                       message.error('消息发送失败',3)
                   }
                    
               }))
         }else{
             message.error('输入内容不能为空',3)
         }
          
       
       //{"content":"hshshhs","warnId":"10001","policeTypeId":"10001","policeTypeName":"刑侦"}

   }

      
    sendTaskFile(e){
        let fileName = e.target.files[0].name;
        let fileBody = e.target.files[0];
        let index = fileName.lastIndexOf('.');  
        let fileExtrName = fileName.substring(index+1);
        if(fileName.length>4){
            fileName = fileName.substr(0,4);
        }
        let file = {
            fileName:fileName.substr(0,4),
            fileBody:fileBody,
            fileExtrName: fileExtrName
        }
        this.state.sendTaskFile.push(file)
        this.setState({
            sendTaskFile:this.state.sendTaskFile
        },()=>{
        });
    }

    feedBackFile(e){
        let fileName = e.target.files[0].name;
        let fileBody = e.target.files[0];
        let index = fileName.lastIndexOf('.');  
        let fileExtrName = fileName.substring(index+1);
        if(fileName.length>4){
            fileName = fileName.substr(0,4);
        }
        let file = {
            fileName:fileName.substr(0,4),
            fileBody:fileBody,
            fileExtrName: fileExtrName
        }
        this.state.feedBackFile.push(file)
        this.setState({
            feedBackFile:this.state.feedBackFile
        });
    }
    
    // 根据警种判断显示未知
    displayMode(e,i){ 
        //自己发的聊天内容
        if(e['policeTypeId'] === this.state.policeTypeId){
             return <TalkNewsRight  company={e['policeTypeName']} detail={e['content']} />
         }else {
            // return <TalkNewsLeft key={i} company={e['policeTypeName']} detail={e['content']} />
            return <TalkNewsLeft company={e.policeTypeName} detail={e.content} />
         }
        }

    goAfter(current){
        // console.log(current)
        let currentPushId = this.state.taskWillTodo.length>0?this.state.taskWillTodo[current].pushId:''
        this.setState({
            feedCurrentPushId:currentPushId
        })
    }

    feedBackText(){
        let feedBackText = this.refs.feedBackText.value;
        let feedbackSearch = this.refs.feedbackSearch.innerHTML;
        let infoDesc = feedbackSearch  + feedBackText;
        let data = {
            "id":this.state.id,
            "caseId": this.state.caseInfo.caseId,
            "infoDesc": infoDesc,
            "policeTypeId": this.state.currentPoliceTypeId,
            "pushId": this.state.feedCurrentPushId,
            "zoneId": this.state.zoneId
            }
        let form = new FormData();
        // form.append("files",this.state.feedBackFile);
        this.state.feedBackFile.forEach((e)=>{
            form.append("files",e.fileBody);
        });
        form.append("type",'0');
        form.append("caseId",this.state.caseInfo.caseId);
        form.append("policeTypeId",this.state.currentPoliceTypeId);
        form.append("uploadStatus",'2');
        form.append("zoneId",this.state.zoneId);
        form.append("cId",this.state.id);//cId是合成主键
        // console.log(form);
        // console.log(data)

        // let sendMessage = {
        //     "caseId":this.state.caseInfo.caseId,
        //     "policeTypeId": this.state.policeTypeId,
        //     "policeTypeName": Cookies.get('policeTypeName'),
        //     "content": feedBackText,
        //     "caseTypeId":'',
        //     "caseTypeName":'',
        //     "caseName":this.state.caseInfo.caseName,
        //     "pushType":4   // -- 1. 发起专项推送 2.指派推送 3.日常反馈推送 4.专项反馈推送
        // };

        if(this.state.feedCurrentPushId!==''){
            // if(false){
            this.props.dispatch(sendRecvFeedBack(data,(res)=>{
                if(res.status === 200){
                    form.append("pushId",res.data);
                    this.props.dispatch(sendUploadFiles(form,(res)=>{
                        if(res.status === 200){
                            message.success('反馈成功',3);
                            this.refs.feedBackText.value = '';
                            this.refs.feedbackSearch.innerHTML = '';
                            this.setState({
                                feedBackFile:[]
                            })
                            this.getTaskWillTodo();
                            // this.props.dispatch(pushMessage(sendMessage,(res)=>{
                            //     if(res['status'] === 200){
                            //         console.log('推送成功')
                            //     }
                            // }))
    
                        }
                    }))
                }
            }))
        }else{
            message.error('没有需要反馈的任务',3)
        }
       

    }

    getSuperSearchData(e){
      
        let superSearchData = {};
        let searchData = '';
        e.singleKeyList.forEach((item,index)=>{
            let keyValue = '';
            e.singleDataList.forEach((elem,p)=>{
                if(index === p){
                    keyValue = item + ' : ' + elem;
                    searchData = searchData + keyValue + ' ; ' ;
                }
            })
        })
        superSearchData = {
            searchPersonName:e.singleName + ' : ',
            searchPersonId:e.singleId +' 。 ',
            searchPersonData:searchData
        }

        this.state.superSearchData.push(superSearchData);
        this.setState({
            superSearchData:this.state.superSearchData
        },()=>{
            // console.log(this.state.superSearchData);
        })

    }

    
    deleteFile(e){
        let currentFileName = e.currentTarget.getAttribute('data-filename');
        this.state.feedBackFile.forEach((item,index)=>{
            if(item.fileBody.name === currentFileName){
                this.state.feedBackFile.splice(index,1);
            }
        })
        this.setState({
            feedBackFile:this.state.feedBackFile
        },()=>{
            // console.log(this.state.feedBackFile);
        });
        
    }
  

   
    render(){
        let settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            variableWidth: false
        };
        let settingsTop = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 6,
            arrows: true,
            variableWidth: true
        };
        let { chatMessageHistory } = this.props;
        return(
            <div className="analysisForPolice-contain" >


                <SuperSearch show={this.state.showSearch} close={this.closeSuperSearch.bind(this)} getData={this.getSuperSearchData.bind(this)}/>

                <div className="inner">
                    <div className="inner-title">
                        <img src={titleIcon} alt="pic"/>
                        <span>合成信息</span>
                        <button className="button display-none right" onClick={this.showHistory.bind(this)}>审批历史</button>
                    </div>

                    <div className="inner-table">
                        <table border="1" >
                            <tbody>
                            <tr >
                                <td>合成名称</td>
                                <td title={this.state.caseInfo['caseName']}>{this.state.caseInfo['caseName']}</td>
                                <td >等级</td>
                                <td><Rate count={4} value={this.state.caseInfo.levelName==='普通'?1:(this.state.caseInfo.levelName==='秘密'?2:(this.state.caseInfo.levelName==='机密'?3:4))}/></td>
                                <td >类型</td>
                                <td>{this.state.caseInfo.typeName}</td>
                            </tr>
                            <tr >
                                <td>发起人</td>
                                <td >{this.state.caseInfo['username']}</td>
                                <td >来源</td>
                                <td>{this.state.caseInfo['submitDeptName']}</td>
                                <td>发起时间</td>
                                <td>{this.state.caseInfo['submitDate']}</td>

                            </tr>
                            <tr >
                                <td>合成描述</td>
                                <td colSpan="5" dangerouslySetInnerHTML={{__html: this.state.caseInfo['caseDesc']}} >
                                  
                                </td>

                            </tr>
                            <tr >
                                <td>附件</td>
                                <td colSpan="5" className="analysisPolice-carousel">
                                    <div className="trace-files" >
                                   
                                       
                                       <Carousel {...settingsTop}>
                                       
                                       
                                        {
                                            this.state.files.map((item,index)=>{
                                                if(item.fileType === 'png' || item.fileType === 'jpg' || item.fileType === 'jpeg'){
                                                    return(
                                                        <a href={item.filePath} target="_blank"  key={item.fileName}><div className='trace-files-item' >
                                                            <img src={Image} alt="pic"/>
                                                            <p>{item.fileName?item.fileName.substr(0,6):''}</p>
                                                        </div></a>
                                                    )
                                                }else if(item.fileType === 'doc' || item.fileType === 'docx'){
                                                    return(
                                                        <a href={item.filePath}  target="_blank"  key={item.fileName}><div className='trace-files-item' >
                                                            <img src={Word} alt="pic"/>
                                                            <p>{item.fileName?item.fileName.substr(0,6):''}</p>
                                                        </div></a>
                                                    )
                                                }else if(item.fileType === 'xls' || item.fileType === 'xlsx'){
                                                    return(
                                                        <a href={item.filePath} target="_blank"  key={item.fileName}><div className='trace-files-item'>
                                                            <img src={Excle} alt="pic"/>
                                                            <p>{item.fileName?item.fileName.substr(0,6):''}</p>
                                                        </div></a>
                                                    )
                                                }else{
                                                    return(
                                                        <a href={item.filePath}  target="_blank"  key={item.fileName}><div className='trace-files-item'>
                                                            <img src={File} alt="pic"/>
                                                            <p>{item.fileName?item.fileName.substr(0,6):''}</p>
                                                        </div></a>
                                                    )
                                                }

                                            })
                                        }
                                        </Carousel>
                                        <p className="clearBoth"></p>
                                        

                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                  
                </div>

                <div className={((this.state.caseInfo.composeResultList && this.state.caseInfo.composeResultList.length>0)&&(this.state.caseInfo.composeResultList[0].reportExt||this.state.caseInfo.composeResultList[0].commentResultList.length>0))?'shenpiyijian':'display-none'}>
                {
                    this.state.caseInfo.composeResultList&&this.state.caseInfo.composeResultList.map((item,index)=>{
                        return(
                            <div key={'jieguo'+index}>
                                    {/*已指派页面需要*/}
                                        <div className={item.agentId?'appoint-box inner-title':'display-none'}>
                                        <img src={appointIcon} alt="pic"/>
                                        <span>指派信息</span>
                                        <span className="appoint-area">{item['zoneName']}</span>
                                        <span className="appoint-user">
                                            <img src={ComputerWhite}/>
                                            <span>{item['agentName']}</span>
                                        </span>
                                    </div>
                                    {/*已指派页面需要*/}
                                    {/*已审批页面需要*/}
                                   

                                    {
                                        item.reportExt&&
                                        <div>
                                            <div className="appoint-box inner-title">
                                                <img src={EditIcon} alt="pic"/>
                                                <span>合成结果({item.deptName})</span>
                                            </div>
                                            <div className={item.reportExt?"inner-table":'display-none' }>
                                            <table border="1">
                                                <tbody>
                                                    <tr >
                                                    <td>负责席位</td>
                                                    <td >{item.agentName?item.agentName:''}</td>
                                                    <td >完成时间</td>
                                                    <td>{item.reportExt.updateTime?item.reportExt.updateTime:item.reportExt.createTime}</td>
                                                    <td>历时</td>
                                                    <td>{item.reportExt.completeHours?item.reportExt.completeHours:'0'}小时</td>
                                                </tr>
                                                <tr >
                                                    <td>合成报告</td>
                                                    <td ><div className="originsButton" onClick={this.showWordModal} data-reportid={item.reportExt.reportId}>{item.reportExt['reportName']}</div></td>
                                                    <td >操作</td>
                                                    <td><div className="originsButton" onClick={this.origins.bind(this)} data-deptno={item.deptNo}>溯源</div></td>
                                                    <td>状态</td>
                                                    <td>{item.reportExt.reportStatus?(item.reportExt.reportStatus ==='3'?'已完成':'已上报'):''}</td>
                                                </tr>
                                                {
                                                    item.commentResultList?(item.commentResultList.map((elem,p)=>{
                                                        return(
                                                            <tr key={'yijian'+p}>
                                                                <td>审批意见</td>
                                                                <td colSpan="3">
                                                                    {elem.rComment}
                                                                </td>
                                                                <td>审批时间</td>
                                                                <td>
                                                                    {elem.createTime}
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                ):''
                                                }
                                                </tbody>
                                            </table>
                                            </div>
                                        </div>
                                    }

                                      {/*单独的审批意见*/}
                                    <div className={!item.reportExt&&item.commentResultList.length>0?"":"display-none"}>
                                        <div className="appoint-box inner-title">
                                            <img src={EditIcon} alt="pic"/>
                                            <span>审批结果({item.deptName})</span>
                                        </div>
                                        <div className="inner-table">
                                            <table border="1">
                                                <tbody>
                                                {
                                                    item.commentResultList?(item.commentResultList.map((elem,p)=>{
                                                        return(
                                                            <tr key={"jianyi"+p}>
                                                                <td>审批意见</td>
                                                                <td colSpan="3">
                                                                    {elem.rComment}
                                                                </td>
                                                                <td>审批时间</td>
                                                                <td style={{textAlign:'center'}}>
                                                                    {elem.createTime}
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                ):''
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    
                                    </div>

                                 
                                    
                                   
                                    <div className="clearBoth"> </div>
                                    
                                    {/*已审批页面需要*/}


                            </div>
                        )
                    })
              
                }
                </div>

                    
                <div className="trace-content-bottom">

                    {/*右侧点击讨论组*/}
                    <div className={this.state.showTalk==='0'?'analysis-rightButton':'analysis-rightButton talk-hide'} onClick={this.showTalk.bind(this)}>
                        <img src={RightButton} alt="pic"/>
                        <img src={RightMan} alt="pic"/>
                        <p>讨论组</p>
                    </div>  

                    <div className="analysisPolice-bottom-left" onClick={this.closePop.bind(this)}>
                        <div className="inner-title marBottom"> <img src={Fankui} alt="pic"/> <span>反馈信息</span></div>
                        {
                            this.state.hcZoneRecvList.length>0?(this.state.hcZoneRecvList.map((item,index)=>{
                                return(
                                    <div key={index} className="trace-news">
                                        <div className='trace-news-time' style={{width:'21%'}}>{item.infoDate}</div>
                                        <div className="trace-news-desc" style={{width:'79%'}}>
                                            <img src={this.state.feedCircle} alt="pic"/>
                                            <div className="trace-news-show">
                                                <span>{item.policeTypeName} </span> <button onClick={this.readTask.bind(this)} data-pushid={item.pushId} data-date={item.infoDate} className={(item.pushId.indexOf('P:')<0 && item.policeTypeId === Cookies.get('policeTypeId'))||this.state.isMaster?"":'readTaskHide'}>查看任务</button>
                                                <div className={this.state.readTaskShow === item.infoDate ?'trace-news-pop readTaskShow':'trace-news-pop readTaskHide'} onClick={this.stopPropagation.bind(this)}>
                                                    <p>{this.state.checkTaskDeail.infoDate?this.state.checkTaskDeail.infoDate:''}</p>
                                                    <p> {this.state.checkTaskDeail.taskDesc?this.state.checkTaskDeail.taskDesc:''}</p>
                                                    
                                                    {
                                                        this.state.checkTaskDeail.files? (this.state.checkTaskDeail.files.length>0?(this.state.checkTaskDeail.files.map((elem,index)=>{
                                                            // return(
                                                                if(elem.fileType === 'png' || elem.fileType === 'jpeg' ||elem.fileType === 'jpg'  ){
                                                                    return(
                                                                        <a href={elem.filePath}  target="_blank"  key={elem.fileName+index}><div  className='files-item trace-file-margin'>
                                                                            <img src={Image} alt="pic"/>
                                                                            <p>{elem.fileName?elem.fileName.substr(0,6):''}</p>
                                                                        </div></a>
                                                                    )
                                                                }else  if(elem.fileType === 'doc' || elem.fileType === 'docx' ){
                                                                    return(
                                                                        <a href={elem.filePath}  key={elem.fileName}><div className='files-item trace-file-margin'>
                                                                            <img src={Word} alt="pic"/>
                                                                            <p>{elem.fileName?elem.fileName.substr(0,6):''}</p>
                                                                        </div></a>
                                                                    )
                                                                }else  if(elem.fileType === 'xls' || elem.fileType === 'xlsx' ){
                                                                    return(
                                                                        <a href={elem.filePath}  key={elem.fileName}><div className='files-item trace-file-margin'>
                                                                            <img src={Excle} alt="pic"/>
                                                                            <p>{elem.fileName?elem.fileName.substr(0,6):''}</p>
                                                                        </div></a>
                                                                    )
                                                                }else{
                                                                    return(
                                                                        <a href={elem.filePath}  key={elem.fileName}><div className='files-item trace-file-margin'>
                                                                            <img src={File} alt="pic"/>
                                                                            <p>{elem.fileName?elem.fileName.substr(0,6):''}</p>
                                                                        </div></a>
                                                                    )
                                                                }
                                                                
                                                            // )
                                                        })
                                                        ):''
                                                    ):''
                                                    }
                                                   
                                                </div>
                                            </div> 
                                            <p dangerouslySetInnerHTML={{__html: item.infoDesc}}/>
                                            {
                                                item.files.map((elem,num)=>{
                                                    if(elem.fileType === 'png' || elem.fileType === 'jpeg' ||elem.fileType === 'jpg'  ){
                                                        return(
                                                            <a href={elem.filePath}  key={elem.fileName}><div className='files-item trace-file-margin'>
                                                                <img src={Image} alt="pic"/>
                                                                <p>{elem.fileName?elem.fileName.substr(0,6):''}</p>
                                                            </div></a>
                                                        )
                                                    }else  if(elem.fileType === 'doc' || elem.fileType === 'docx' ){
                                                        return(
                                                            <a href={elem.filePath}  key={elem.fileName}><div className='files-item trace-file-margin'>
                                                                <img src={Word} alt="pic"/>
                                                                <p>{elem.fileName?elem.fileName.substr(0,6):''}</p>
                                                            </div></a>
                                                        )
                                                    }else  if(elem.fileType === 'xls' || elem.fileType === 'xlsx' ){
                                                        return(
                                                            <a href={elem.filePath}  key={elem.fileName}><div className='files-item trace-file-margin'>
                                                                <img src={Excle} alt="pic"/>
                                                                <p>{elem.fileName?elem.fileName.substr(0,6):''}</p>
                                                            </div></a>
                                                        )
                                                    }else{
                                                        return(
                                                            <a href={elem.filePath}  key={elem.fileName}><div className='files-item trace-file-margin'>
                                                                <img src={File} alt="pic"/>
                                                                <p>{elem.fileName?elem.fileName.substr(0,6):''}</p>
                                                            </div></a>
                                                        )
                                                    }
                                                   
                                                })
                                           
                                            }
                                           
                                        </div>
                                    </div>
                                )
                            })
                            ):''
                        }
                      
                    </div>

                    <div className="analysisSeat-bottom-right">
                       
                        <div className={this.state.showTalk==='0'?'analysisSeat-right-feedback':'analysisSeat-right-feedback feedback-changeWidth'} style={{backgroundColor:'transparent',padding:'0'}}>

                            <div className="analysisPolice-right-willdeal">
                                <div className="inner-title marBottom"> <img src={Fankui} alt="pic"/> <span>待办任务</span></div>
                                    <Carousel {...settings} afterChange={this.goAfter.bind(this)}>
                                        {
                                            this.state.taskWillTodo.length>0?(this.state.taskWillTodo.map((item,index)=>{
                                                return(
                                                    <div className="analysisPolice-willTask" key={index+'11s'}>
                                                        <p>{index+1}</p>
                                                        <p>({item.infoDate?item.infoDate:''})</p>
                                                        <p>{item.taskDesc?item.taskDesc:''}</p>
                                                        <div className="daiban-file">
                                                            {
                                                                item.files.length>0?(item.files.map((elem,num)=>{
                                                                   
                                                                    if(elem.fileType === 'png' || elem.fileType === 'jpeg' ||elem.fileType === 'jpg'  ){
                                                                        return(
                                                                            <a href={elem.filePath}  key={elem.fileName+num} target="_blank"><div className='files-item trace-file-margin'>
                                                                                <img src={Image} alt="pic"/>
                                                                                <p>{elem.fileName?elem.fileName.substr(0,6):''}</p>
                                                                            </div></a>
                                                                        )
                                                                    }else  if(elem.fileType === 'doc' || elem.fileType === 'docx' ){
                                                                        return(
                                                                            <a href={elem.filePath}  key={elem.fileName+num}><div className='files-item trace-file-margin'>
                                                                                <img src={Word} alt="pic"/>
                                                                                <p>{elem.fileName?elem.fileName.substr(0,6):''}</p>
                                                                            </div></a>
                                                                        )
                                                                    }else  if(elem.fileType === 'xls' || elem.fileType === 'xlsx' ){
                                                                        return(
                                                                            <a href={elem.filePath}  key={elem.fileName+num} ><div  className='files-item trace-file-margin'>
                                                                                <img src={Excle} alt="pic"/>
                                                                                <p>{elem.fileName?elem.fileName.substr(0,6):''}</p>
                                                                            </div></a>
                                                                        )
                                                                    }else{
                                                                        return(
                                                                            <a href={elem.filePath}  key={elem.fileName+num} ><div className='files-item trace-file-margin'>
                                                                                <img src={File} alt="pic"/>
                                                                                <p>{elem.fileName?elem.fileName.substr(0,6):''}</p>
                                                                            </div></a>
                                                                        )
                                                                    }
                                                                    // )
                                                                })
                                                            ):''
                                                            }
                                                            <div className="clearBoth"></div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            ):<div></div>
                                        }
                                    </Carousel>
                            </div>
                           <div className="analysisPolice-right-feed">
                              <div className="inner-title analysisPolice-title">
                                    <img src={titleIcon} alt="pic"/>
                                    <span>反馈</span>
                                    <button onClick={this.showTool.bind(this)}  disabled={this.state.reportStatus === '2'?true:false}  className='analysis-buttom-tool button'><img src={Tool} alt="pic"/>研判工具集</button>
                                </div>
                                {/*工具集*/}
                                <div className="analysis-tool-contain" style={{display:this.state.showTool}}>
                                    {
                                        this.state.tools.map((item,index)=>{
                                            return(
                                                <div key={index} className="tool-item" data-link={item.link} onClick={this.goTools}>
                                                    <div>   
                                                        <img src={item.src} alt="pic"/>
                                                    </div>
                                                    <p>{item.name}</p>
                                                </div>
            
                                            )
                                        })
                                    }
                                    <div className='clearBoth'></div>
                                </div>

                                <div className="policeFeedback-text">
                                    <p>({this.state.currentDate})</p>
                                    <div className="feedback-send">
                                    <div ref='feedbackSearch'>
                                        {
                                            this.state.superSearchData.length>0?(
                                                this.state.superSearchData.map((item,index)=>{
                                                    return(
                                                        <p key={index+'p'}>
                                                            {item.searchPersonName?item.searchPersonName:''} {item.searchPersonId?item.searchPersonId:''}  <br/>
                                                            {item.searchPersonData?(item.searchPersonData+' 。'):''}
                                                        </p>

                                                    )
                                                })
                                                
                                            ):''
                                        }
                                       
                                    </div>
                                        
                                    
                                        <textarea ref="feedBackText" ></textarea> 
                                    </div>
                                

                                    {/* <textarea ref="feedBackText" cols="30" rows="10" onKeyDown={this.enterKey.bind(this)}></textarea>*/}
                                </div>

                                <div className='feedback-files analysisPolice-marginTop'>
                                    <div className='files-item feedBack-file-first'>
                                        <input type="file" className="fileHide" onChange={this.feedBackFile.bind(this)}/>
                                        <img src={Add} alt="pic"/>
                                        <p>上传</p>
                                    </div>
                                    {
                                        this.state.feedBackFile.map((item,index)=>{
                                            if(item.fileExtrName === 'doc'||item.fileExtrName === 'docx'){
                                                return(
                                                    <div key={item.fileName} className='files-item feedBack-file'>
                                                        <i className="deleteFile" onClick={this.deleteFile.bind(this)} data-filename={item.fileBody.name}></i>
                                                        <img src={Word} alt="pic"/>
                                                        <p>{item.fileName?item.fileName.substr(0,6):''}</p>
                                                    </div>
                                                )
                                            }else if(item.fileExtrName === 'xls'||item.fileExtrName === 'xlsx'){
                                                return(
                                                    <div key={item.fileName} className='files-item feedBack-file'>
                                                        <i className="deleteFile" onClick={this.deleteFile.bind(this)} data-filename={item.fileBody.name}></i>
                                                        <img src={Excle} alt="pic"/>
                                                        <p>{item.fileName?item.fileName.substr(0,6):''}</p>
                                                    </div>
                                                )
                                            }else if(item.fileExtrName === 'png'||item.fileExtrName === 'jpg'||item.fileExtrName === 'jpeg'){
                                                return(
                                                    <div key={item.fileName} className='files-item feedBack-file'>
                                                        <i className="deleteFile" onClick={this.deleteFile.bind(this)} data-filename={item.fileBody.name}></i>
                                                        <img src={Image} alt="pic"/>
                                                        <p>{item.fileName?item.fileName.substr(0,6):''}</p>
                                                    </div>
                                                )
                                            }else{
                                                return(
                                                    <div key={item.fileName} className='files-item feedBack-file'>
                                                        <i className="deleteFile" onClick={this.deleteFile.bind(this)} data-filename={item.fileBody.name}></i>
                                                        <img src={File} alt="pic"/>
                                                        <p>{item.fileName?item.fileName.substr(0,6):''}</p>
                                                    </div>
                                                )
                                            }
                                        
                                        })
                                    }
                                    <div className='clearBoth'></div>
                                </div>

                                <div className=' feedback-queding'>
                                    <button className="button"  onClick={this.feedBackText.bind(this)}>确定</button>
                                </div>
                            
                           </div>
                            
                           
                           
                        </div>


                        <div className={this.state.showTalk==='0'?'analysisPolice-content-right  talk-hide':'analysisPolice-content-right '}>
                            <div className="talk-title">  <div className='newpro-title'><p> <i className='nd-title-img'><b></b></i> 讨论组  <b onClick={this.closeTalk.bind(this)} className="analysisPolice-closeTalk"></b></p></div></div>
                
                            <div className="talk-content" ref="talkContent" id="talk-content">
                               
                                {
                                    this.state.talkList.length>0?(this.state.talkList.map((e,i)=>{
                                        return this.displayMode(e,i);
                                        })
                                    ):''
                                }
                                <div style={{clear:'both'}}></div>
                                
                            </div>
                            <div className="talk-write">
                                <textarea ref="taleContent"  cols="30" rows="10" onKeyDown={this.enterKey.bind(this)}></textarea>
                            </div>
                           
                        </div>
                        <div className='clearBoth'></div>

                    </div>
                    <div className='clearBoth'></div>
                </div>

                

                <div className={this.state.rightSide ? 'right-side slow-show' : 'right-side slow-hidden'}>
                    <div className="inner-title">
                        <img src={flowDone} alt="pic"/>
                        <span>审批情况跟踪</span>
                        <button className="button right" style={{marginLeft:'1rem'}} onClick={this.showModal}>签呈</button>
                        <button className="button-white right" onClick={this.cancelRightSide.bind(this)}>取消</button>

                    </div>
                    <div>
                        <Table className="approveTable" pagination = {false} dataSource={this.state.approveData} columns={this.state.approveColumn} />
                    </div>
                </div>


                <Modal
                    title={<span style = {{color:'#2C567F',fontSize:'1.25rem'}}>5.2金店抢劫案签呈</span>}
                    visible={this.state.modalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={'30%'}
                    footer={[
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            确认
                        </Button>,
                        <Button key="back" onClick={this.handleCancel}>取消</Button>,
                    ]}
                >
                    <ul className="signModal">
                        <li>
                            <div className="modalTitle">市领导审批</div>
                            <div className="modalImg"><img src={Sign}/> </div>
                            <div className="modalTime"><span>2017年12月8日</span></div>
                        </li>
                        <li>
                            <div className="modalTitle">市领导审批</div>
                            <div className="modalImg"><img src={Sign}/> </div>
                            <div className="modalTime"><span>2017年12月8日</span></div>
                        </li>
                        <li>
                            <div className="modalTitle">市领导审批</div>
                            <div className="modalImg"><img src={Sign}/> </div>
                            <div className="modalTime"><span>2017年12月8日</span></div>
                        </li>
                    </ul>
                    <div className="modalLast">
                        <div className="lastItem"><span>交办单位：</span>某某某</div>
                        <div className="lastItem"><span>经办人：</span>张三</div>
                        <div className="lastItem"><span>交办时间：</span>2017年12月31日</div>

                    </div>
                </Modal>
            
                {/*合成报告点击事件弹出的模态框*/}
                <Modal
                title={<span style={{color: '#2C567F', fontSize: '1.25rem'}}>{this.state.caseInfo.caseName?this.state.caseInfo.caseName:''}</span>}
                visible={this.state.wordModalVisible}
                onCancel={this.handleCancel}
                width={'75%'}
                height={'70vh'}
                className = 'word-modal'
                footer={[
                    <Button key="down" onClick={this.createReport}>下载报告</Button>,
                    <Button key="back" onClick={this.handleCancel}>关闭</Button>,
                ]}
                >
                    <Report2Word reportData={this.state.reportInfo} callbackData={this.dataCallback.bind(this)}  ifCreateReport = {this.state.ifCreateReport}/>
                </Modal>
                {/*合成报告点击事件弹出的模态框*/}
            
            </div>
        )
    }

}