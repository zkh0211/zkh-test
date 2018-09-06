import React,{Component} from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import '../traceOfSource/traceOfSource.less'
import './analysisForSeat.less'
import Cookies from 'js-cookie'
import mpush from '../../utils/webSocKet'
// import { wsUrl,systemId } from  '../../actions/otherUrl'
import TalkNewsLeft from '../traceOfSource/components/talkNewsLeft'
import TalkNewsRight from '../traceOfSource/components/talkNewsRight'
import Hecheng from '../../images/source/u3599.png'
import Fankui from '../../images/source/fankuiTitle.png'
import Image from '../../images/source/image.svg'
import Word from '../../images/source/word.svg'
import Excle from '../../images/source/excel.svg'
import File from '../../images/source/file-1.png'
import Police from '../../images/common/u6687.svg'
import FeedCircle1 from '../../images/common/feedCircle-1.png'
import FeedCircle2 from '../../images/common/feedCircle-2.png'
import FeedCircle3 from '../../images/common/feedCircle-3.png'
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
import CloseZhiPai from '../../images/analysis/closeZhipai.png'
import CheckedPolice from '../../images/analysis/policeHearBlue.png'
import NoCheckedPolice from '../../images/analysis/policeHearGray.png'
import Tool from '../../images/analysis/tool.png'
import Feed from '../../images/source/feed.png'
// import EditIcon from '../../images/info/edit.png'

import appointIcon from '../../images/info/appoint.png'
import Computer from '../../images/info/computer.png'
import ComputerWhite from '../../images/info/computer-white.png'

import EditIcon from '../../images/info/edit.png'
import EditDoneIcon from '../../images/info/edit-done.png'
import SuperSearch from './components/superSearch'
import moment from 'moment'
import {
    getHcDetail,
    getFileList,
    getHcZoneAgent,
    getHcResult
}from 'actions/syntheticInfo'
import {
    getPoliceTypePushById,
    getHcZoneRecvList, 
    getHcPushInfoById
}from 'actions/traceOfSourceAction'
import {
    getPoliceTypeList,
    getSendSubPolice,
    sendRecvFeedBack,
    sendUploadFiles,
    deleteTask
}from 'actions/analysisForSeatAction'
import {
    getChatMessageHistory,
    postChatMessage,
    getTaskWillTodo,
}from 'actions/analysisForPoliceAction'
import {
    getWordReport
}from 'actions/reportWord'
import Report2Word from "../reportWord/component/Report2Word";
import { Radio,Carousel,message , Modal, Button,Rate} from 'antd';
moment.locale('zh-cn');
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;



@connect(
    (state, props) => ({ config: state.config })
  )

export default class AnalysisForSeat extends Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.params.id?this.props.params.id:'',
            state:this.props.params.state?this.props.params.state:'',
            zoneId: Cookies.get('zoneId'),
            currentPoliceTypeId:Cookies.get('policeTypeId'),
            currentDate:'',
            showTalk:'0',
            openSendTask:'0',
            checkedId:0,
            policeTypeId:[],
            policesCount:[],
            taskWillTodo:[],
            showTool:'none',
            showSearch:'none',
            sendTaskFile:[],
            feedBackFile:[],
            hcResult:{},
            caseInfo:{},
            hcZoneRecvList:[],
            checkTaskDeail:{},
            wordModalVisible:false,
            ifCreateReport:false,
            reportStatus:'',
            isShiju:true,
            isMaster:false,
            reportInfo:{},
            assignPoliceTypeId:'',
            superSearchData:[],
            testinfo:'',
            zoneAgentUser:[],
            zuoxiTypeId:[],
            files:[
                // {fileName:'某图片',fileType:'image'},
                // {fileName:'某文件',fileType:'word'},
                // {fileName:'某材料',fileType:'excle'}
            ],
            policeTypes:[
                {policeTypeName:'图真',total:'12',feedback:'12'},
                {policeTypeName:'刑侦',total:'23',feedback:'2'},
                {policeTypeName:'网安',total:'24',feedback:'10'}
            ],
            feedCircle:FeedCircle1,
            feedNews:[
                { feedTime:'2017-12-12   08:08:08', role:'结束', feedDesc:'fsjfkslfjdsjflsjjfjjfsldk饭店经理反馈说了', fileName:'某图片'},
                { feedTime:'2017-12-12   08:08:08', role:'重大案事件合成席', feedDesc:'fsjfkslfjdsjflsjjfjjfsldk饭店经理反馈说了', fileName:'某图片'},
                { feedTime:'2017-12-12   08:08:08', role:'特侦合成席', feedDesc:'fsjfkslfjdsjflsjjfjjfsldk饭店经理反馈说了', fileName:'某图片'}
            ],
            readTaskShow:-1,
            talkList:[],
            xiajiPolices:[],
            polices:[
                {policeTypeId:'1',policeName:'图侦'},
                {policeTypeId:'2',policeName:'刑侦'},
                {policeTypeId:'3',policeName:'网安'},
                {policeTypeId:'4',policeName:'技侦'},
                {policeTypeId:'5',policeName:'治安'},
                {policeTypeId:'6',policeName:'交通'},
                {policeTypeId:'7',policeName:'网安1'},
                {policeTypeId:'8',policeName:'技侦1'},
                {policeTypeId:'9',policeName:'治安1'},
                {policeTypeId:'10',policeName:'交通1'},
            ],
            tools:[
                {name:'市云搜',src:RenyuanXinxi ,link:'http://10.95.94.67/pcsII/pcspublic/index' },
                {name:'关系图谱',src:Tupu ,link:'http://10.95.18.122:3000/login2?username=zhzx' },
                {name:'超级检索',src:ChaojiJiansuo, link:'superSearch' },
                {name:'轨迹',src:Guiji ,link:`http://10.95.18.131:5555/policeMap/baiduMap.html?token=${Cookies.get("token")}`},
                {name:'街区监控',src:Jiankong ,link:''},
                {name:'数模空间',src:GuijiYanpan,link:'' },
                {name:'串并案',src:Jiankong ,link:'http://10.95.94.162:9029/criminalCaseAnalysis/views/homepage.jsp?username=tyga'},
                {name:'更多',src:Guiji ,link:'more'},
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
                        let talkList = _self.state.talkList;
                        talkList.push(showMsg);
                        _self.setState({talkList: talkList});
                    }
                } else {
                    if (content.pushType === 1) {//获取警种指派数量
                        // console.log(111111111111111111)
                        _self.getPoliceTypes();
                    }else if(content.pushType === 2) {
                        // console.log(22222222222222)
                        _self.getPoliceTypes();
                        _self.getFeedList();
                    }
                }
                console.log('========接收反馈完毕======');
                // console.log("=============回调===============");
                //  let content = JSON.parse(data.content);
                //console.log(content);
                //  let message = JSON.parse(content.content);
                /*  if(content.title === '多人聊天'){
                 if(message.warnId === id){  // 是本案的聊天
                 let showMsg = {
                 policeTypeName : message.policeTypeName,
                 content : message.content,
                 policeTypeId : message.policeTypeId
                 };
                 let talkList = _self.state.talkList;
                 talkList.push(showMsg);
                 _self.setState({talkList:talkList});
                 }
                 }else if(content.title === '指派推送'){
                 console.log(message);
                 }*/
      
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
        // mpush.close();
        if(Cookies.get('authCode')&&Cookies.get('authCode').indexOf('hczhRole')!==-1){
            this.setState({
                isMaster:true
            })
        }else{
            this.setState({
                isMaster:false
            })
        }
        this.props.dispatch(getHcDetail({id:this.state.id,state:this.state.state},(res)=>{
            if(res.data){
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
                    
                })
            }else{
                this.setState({
                    caseInfo:{}
                })
            }
        }))

       this.getPoliceTypes();

        this.getFeedList();

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

    getPoliceTypes(){
        this.props.dispatch(getPoliceTypePushById({id:this.state.id},(res)=>{
            if(res.data.length>0){
                this.setState({
                    policeTypes:res.data
                })
            }else{
                this.setState({
                    policeTypes:[]
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
    componentDidMount(){
        // let date = new Date();
        let currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
        this.setState({
            currentDate:currentDate
        })
        let closePolices = this.refs.closePolices;
        // let _self = this ;
        // closePolices.addEventListener('click',this.closePoliceTypes.bind(this,_self),false)
    }
    componentWillUnmount(){
        // let closePolices = this.refs.closePolices;
        // closePolices.removeEventListener('click',this.closePoliceTypes)
    }
    clickShow(){
       
    }
    componentDidUpdate(prevProps, prevState){
       
        let talkContent = this.refs.talkContent;
        talkContent.scrollTop = talkContent.scrollHeight - talkContent.offsetHeight
      
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
            readTaskShow:-1,
            assignPoliceTypeId:''
        },()=>{
           
        })
    }
    
    closePoliceTypes(){
        // console.log('middleClick')
        this.setState({
            assignPoliceTypeId:''
        },()=>{
           
        })
    }
    stopPropagation(e){
        e.stopPropagation();
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
    // 根据警种判断显示未知
    displayMode(e,i){ 
    //自己发的聊天内容
        if(e['policeTypeId'] === Cookies.get('policeTypeId')){
            return <TalkNewsRight key={i} company={e['policeTypeName']} detail={e['content']} />
        }else {
            return <TalkNewsLeft key={i} company={e['policeTypeName']} detail={e['content']} />
            // return <TalkNewsLeft company='fsfds' detail='fdsfsfdsf' />
        }
    }
    enterKey(e){
        if(e.keyCode == 13){
            this.sendMsg();
        }
    }
     // 发送消息
     sendMsg(){
        let policeTypeName = Cookies.get("policeTypeName");
        let content = this.refs.taleContent.value;
        let data = {
            content : content,
            // warnId : this.state.caseInfo.caseId,
            policeTypeId:Cookies.get('policeTypeId'),
            policeTypeName :policeTypeName,
            toUser:'',
            id:this.state.id
        };
     //    console.log(data)
    let regu = "^\\s*$";
    let re = new RegExp(regu);
    

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
    openSendTask(){
        // console.log('zhipairenwu......')
      if(this.state.caseInfo.approveResult !== '1'){

     
        this.setState({
           
            openSendTask:'1',
        })
        this.props.dispatch(getPoliceTypeList({},(res)=>{
            if(res.data.length>0){
                this.setState({
                    polices:res.data
                },()=>{
                    // let policeCount = this.state.polices.length;
        
                    // if(policeCount/6%1 === 0){
                    //     let arr = [];
                    //     for(let i=1; i<=policeCount/6;i++){
                    //         arr.push(i);
                    //     }
                    //     this.setState({
                    //         openSendTask:'1',
                    //         policesCount:arr
                    //     },()=>{
                    //         // console.log(this.state.policesCount)
                    //     })
                    // }else{
                    //     let arr = [];
                    //     for(let i=1; i<=policeCount/6+1;i++){
                    //         arr.push(i);
                    //     }
                    //     this.setState({
                    //         openSendTask:'1',
                    //         policesCount:arr
                    //     },()=>{
                    //         // console.log(this.state.policesCount)
                    //     })
                    // }
                    
                })
            }
        }))
        this.props.dispatch(getHcZoneAgent({}, (res) => {
            if (res.status === 200 && res['data']) {
                this.setState({
                    zoneAgentUser: res.data
                },()=>{
                    // let agentUserLength = 0;
                    // let policeTypeData = [];
                    // let zuoxiOrjingzhong = {zuoxi:{},jingzhong:{}};
                    // this.state.zoneAgentUser.map((item)=>{
                    //     item.forEach((elem)=>{
                    //         agentUserLength += index+1;

                    //     })
                    // })
                    // if(agentUserLength > this.state.polices.length){
                    //     this.state.zoneAgentUser.map((item)=>{
                    //         item.forEach((elem)=>{
                    //             agentUserLength += index+1;

                    //         })
                    //     })
                    // }

                })
            }
        }))
       

       

       
    }
    }
    closeSendTask(){
        this.setState({
            openSendTask:'0',
            sendTaskFile:[]
        });
        this.refs.taskDesc.value = '';

    }
    
    policeOnChange(value) {
        let policeValue = value.target.value;
        let policeId = policeValue.substring(0, policeValue.indexOf('_'));
        let parentId = policeValue.substring(policeValue.indexOf('_') + 1, policeValue.length);
        let isChecked = value.target.checked;

        let police = {};
        police.policeId = policeId;
        police.zoneId = parentId;
     
        if(isChecked){
            this.state.policeTypeId.push(police);
            this.setState({
                policeTypeId:this.state.policeTypeId
            },()=>{
                // console.log(this.state.policeTypeId)
            })
        }else{
            this.state.policeTypeId.forEach((item,index)=>{
                if(item.policeId === policeId){
                    this.state.policeTypeId.splice(index,1)
                }
            })
            this.setState({
                policeTypeId:this.state.policeTypeId
            },()=>{
                // console.log(this.state.policeTypeId)
            })
        }

       
       
    }
    xiajiPoliceOnChange(value) {
        let policeValue = value.target.value;
        let policeId = policeValue.substring(0, policeValue.indexOf('_'));
        let parentId = policeValue.substring(policeValue.indexOf('_') + 1, policeValue.length);
        let isChecked = value.target.checked;

        let police = {};
        police.policeId = policeId;
        police.zoneId = parentId;
     
        if(isChecked){
            this.state.policeTypeId.push(police);
            this.setState({
                policeTypeId:this.state.policeTypeId
            },()=>{
                // console.log(this.state.policeTypeId)
            })
        }else{
            this.state.policeTypeId.forEach((item,index)=>{
                if(item.policeId === policeId){
                    this.state.policeTypeId.splice(index,1)
                }
            })
            this.setState({
                policeTypeId:this.state.policeTypeId
            },()=>{
                // console.log(this.state.policeTypeId)
            })
        }

       
       
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
        
    // }
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
    closeSuperSearch(e){
        this.setState({
            showSearch:e
        })
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
        let {id, state} = this.props.params;
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
    
    zhipaiTask(){
        let send = [];
        let agentId = this.state.caseInfo.taskMaster;
        let id = this.state.id;
        let taskDesc = this.refs.taskDesc.value;
        let zoneId = this.state.zoneId;

        this.state.policeTypeId.forEach((item)=>{
            let elem = {
                // "agentId": agentId,
                "id": id,
                "policeTypeId": item.policeId,
                "taskDesc": taskDesc,
                "zoneId": item.zoneId
            }
            send.push(elem);
        })

        this.state.zuoxiTypeId.forEach((item)=>{
            let elem = {
                // "agentId": agentId,
                "id": id,
                "policeTypeId": item.policeId,
                "taskDesc": taskDesc,
                "zoneId": item.zoneId
            }
            send.push(elem);
        })
       
       
        let form = new FormData();
        this.state.sendTaskFile.forEach((e)=>{
            form.append("files",e.fileBody);
        });
        form.append("type",'0');
        form.append("caseId",this.state.caseInfo.caseId);
        form.append("policeTypeId",this.state.currentPoliceTypeId);
        form.append("uploadStatus",'1');
        form.append("zoneId",this.state.zoneId);
        form.append("cId",this.state.id);//cId是合成主键
        

        this.props.dispatch(getSendSubPolice(JSON.stringify(send),(res)=>{
            if(res.status === 200){
                form.append("pushId",res.data);
                this.props.dispatch(sendUploadFiles(form,(res)=>{
                    if(res.status === 200){
                        message.success('指派成功',3);
                        this.refs.taskDesc.value = '';
                        this.setState({
                            openSendTask:'0',
                            sendTaskFile:[]
                        })
                    }
                }))
            }
        }))
    }

    feedBackText(){
        let feedBackText = this.refs.feedBackText.value;
        let feedbackSearch = this.refs.feedbackSearch.innerHTML;
       
        let infoDesc = feedbackSearch + feedBackText;
        let data = {
            "id":this.state.id,
            "caseId": this.state.caseInfo.caseId,
            "infoDesc": infoDesc,
            "policeTypeId": this.state.currentPoliceTypeId,
            "pushId": '',
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
        if(this.state.reportStatus !== '2'){
            if(this.state.caseInfo.approveResult !== '1'){
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
                            }
                        }))
                    }
                }))
            }
        }else{
            message.success('指挥长正在审批中，不能进行反馈',3);
        }
       
       
    }

    makeReport(){
        if(this.state.hcZoneRecvList.length>0){
            hashHistory.push(`/reportWord/${this.state.id}/${this.state.state}`);
        }else{
            message.error('请研判后再生成研判报告',3); 
        }
      
    }

    
    getTaskWillTodo(policeTypeId){
        this.props.dispatch(getTaskWillTodo({policeTypeId:policeTypeId,id:this.state.id},(res)=>{
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

    showTasked = (e)=>{
        // console.log('kuaiClick')
        e.stopPropagation();
        let policeType = e.currentTarget.getAttribute('data-policetypeid');
        this.setState({
            assignPoliceTypeId:policeType
        },()=>{
            this.getTaskWillTodo(this.state.assignPoliceTypeId);
         
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

    deleteSendFile(e){
        let currentFileName = e.currentTarget.getAttribute('data-filename');
        this.state.sendTaskFile.forEach((item,index)=>{
            if(item.fileBody.name === currentFileName){
                this.state.sendTaskFile.splice(index,1);
            }
        })
        this.setState({
            sendTaskFile:this.state.sendTaskFile
        },()=>{
            // console.log(this.state.feedBackFile);
        });
        
    }

    zuoxiOnChange(value){
        let policeValue = value.target.value;
        let policeId = policeValue.substring(0, policeValue.indexOf('_'));
        let parentId = policeValue.substring(policeValue.indexOf('_') + 1, policeValue.length);
        let isChecked = value.target.checked;

        let police = {};
        police.policeId = policeId;
        police.zoneId = parentId;
     
        if(isChecked){
            this.state.zuoxiTypeId.push(police);
            this.setState({
                zuoxiTypeId:this.state.zuoxiTypeId
            },()=>{
                // console.log(this.state.policeTypeId)
            })
        }else{
            this.state.zuoxiTypeId.forEach((item,index)=>{
                if(item.policeId === policeId){
                    this.state.zuoxiTypeId.splice(index,1)
                }
            })
            this.setState({
                zuoxiTypeId:this.state.zuoxiTypeId
            },()=>{
                // console.log(this.state.policeTypeId)
            })
        }

       
    }

    cancleTask(e){
        let pushId = e.currentTarget.getAttribute('data-pushid');
        // let policeTypeId = e.currentTarget.getAttribute('data-policetypeid');
        this.props.dispatch(deleteTask({urlParam: pushId},(res)=>{
            if(res.rel){
                this.getTaskWillTodo(this.state.assignPoliceTypeId);
                this.getPoliceTypes();
            }
        }))

    }

    render(){
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 6,
            arrows: true,
            variableWidth: false
        };
        let settings2 = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,
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
        let setting3 = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 6,
            arrows: true,
            variableWidth: true
        };
        return(
            <div className='traceOfSource-contain'>

            <SuperSearch show={this.state.showSearch} close={this.closeSuperSearch.bind(this)} getData={this.getSuperSearchData.bind(this)}/>

                <div className="trace-content-top"> 
                    <div className="inner-title"> 
                        <img src={Hecheng} alt="pic"/> 
                        <span>合成信息</span>
                        <button className='button analysis-buttom-tool' style={{marginTop:'0'}} onClick={this.makeReport.bind(this)}>{this.state.reportStatus === '2'?'查看合成报告':'生成合成报告'}</button>
                    </div>
                    <table> 
                        <tbody>
                            <tr><td>合成名称:</td><td title={this.state.caseInfo.caseName}>{this.state.caseInfo.caseName?this.state.caseInfo.caseName:<span>&nbsp;</span>}</td><td>发起人:</td><td>{this.state.caseInfo.username?this.state.caseInfo.username:<span>&nbsp;</span>}</td>
                            <td>发起时间:</td><td>{this.state.caseInfo.submitDate?this.state.caseInfo.submitDate:<span>&nbsp;</span>}</td> 
                            <td>审批时间:</td><td>{this.state.caseInfo.taskTime?this.state.caseInfo.taskTime:<span>&nbsp;</span>}</td>
                            <td>来源:</td><td>{this.state.caseInfo.fromName?this.state.caseInfo.fromName:<span>&nbsp;</span>}</td>
                            <td style={{color:'red'}}>等级:</td>
                            <td><Rate count={4} value={this.state.caseInfo.levelName==='普通'?1:(this.state.caseInfo.levelName==='秘密'?2:(this.state.caseInfo.levelName==='机密'?3:4))}/></td>                            </tr>
                            

                        </tbody>
                    </table>
                    <div className="trace-desc">
                        <p>合成描述:</p>
                        <div className="trace-desc-content"  dangerouslySetInnerHTML={{__html: this.state.caseInfo['caseDesc']}} >
                           
                        </div>
                        <div className="clearBoth"></div>
                    </div>
                    <div className="trace-files analysis-file-top">

                    <Carousel {...settingsTop}>
             
                        {
                            this.state.files.map((item,index)=>{
                                
                                if(item.fileType === 'png' || item.fileType === 'jpg' || item.fileType === 'jpeg'){
                                    return(
                                        <a href={item.filePath} target="_blank" key={item.fileName}><div className='files-item' >
                                            <img src={Image} alt="pic"/>
                                            <p>{item.fileName?item.fileName.substr(0,6):''}</p>
                                        </div></a>
                                    )
                                }else if(item.fileType === 'doc' || item.fileType === 'docx'){
                                    return(
                                        <a href={item.filePath}  target="_blank"  key={item.fileName}><div className='files-item'>
                                            <img src={Word} alt="pic"/>
                                            <p>{item.fileName?item.fileName.substr(0,6):''}</p>
                                        </div></a>
                                    )
                                }else if(item.fileType === 'xls' || item.fileType === 'xlsx'){
                                    return(
                                        <a href={item.filePath}  target="_blank" key={item.fileName}><div className='files-item'>
                                            <img src={Excle} alt="pic"/>
                                            <p>{item.fileName?item.fileName.substr(0,6):''}</p>
                                        </div></a>
                                    )
                                }else{
                                    return(
                                        <a href={item.filePath} target="_blank"  key={item.fileName}><div className='files-item'>
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
                   
                </div>

                <div className={(this.state.caseInfo.composeResultList&&((this.state.caseInfo.composeResultList.length>0)&&(this.state.caseInfo.composeResultList[0].reportExt||this.state.caseInfo.composeResultList[0].commentResultList.length>0)))?'shenpiyijian':'display-none'}>
                   
                    {
                        this.state.caseInfo.composeResultList&&this.state.caseInfo.composeResultList.map((item,index)=>{
                            return(
                                <div key={'jiguo'+index}>
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
                                                                <tr key={'jianyi'+p}>
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

                <div className="trace-content-middle trace-middle-flex" onClick={this.closePoliceTypes.bind(this)}>
                    <div className="zhipai-left">
                        <div className='analysis-middle-send' onClick={this.openSendTask.bind(this)}>
                            <p>{this.state.caseInfo.approveResult ==='1'?'已指派':'任务指派'}</p>
                        </div>
                        <div className={this.state.openSendTask==='0'?'display-none':'analysis-zhegai'}>

                        </div>
                        <div className='analysis-middle-zhipai' className={this.state.openSendTask==='0'?'analysis-middle-zhipai analysis-zhipai-close':'analysis-middle-zhipai analysis-zhipai-open'} onClick={this.stopPropagation.bind(this)}>
                            <img src={CloseZhiPai} alt="pic" onClick={this.closeSendTask.bind(this)}/>
                            <div className='analysis-zhipai-contain'>
                                <p className='analysis-zhipai-title'>任务描述：</p>
                                <textarea ref='taskDesc'></textarea>
                            </div>
                            <div className="analysis-zhipai-select">
                                <p className='analysis-zhipai-title'>选择坐席：</p>
                                <div  className="selectPoliceDatas1">
                                    <Carousel {...settings2}>
                                        
                                        {
                                            this.state.zoneAgentUser.map((elem,num)=>{
                                                return elem.agentList.map((item,index)=>{
                                                    return(
                                                        <div>
                                                            <div className="zuoxiTypes">
                                                                <input type="checkbox" value={item['policeTypeId'] + '_' + item['parentId']} id={item.policeTypeName}  onClick={this.zuoxiOnChange.bind(this)}/>
                                                                <label htmlFor={item.policeTypeName}>
                                                                    <div className="radio-button" onClick={
                                                                        (e) =>{
                                                                            if(e.currentTarget.getAttribute('class') === 'radio-button'){
                                                                                e.currentTarget.setAttribute('class','radio-button checkedBack');
                                                                                e.currentTarget.childNodes['0'].setAttribute('src',ComputerWhite)
                                                                                e.currentTarget.childNodes['1'].setAttribute('class','radio-white-p')
                                                                            }else{
                                                                                e.currentTarget.setAttribute('class','radio-button');
                                                                                e.currentTarget.childNodes['0'].setAttribute('src',Computer)
                                                                                e.currentTarget.childNodes['1'].setAttribute('class','')
                                                                            }
                                                                        } 
                                                                    }>
                                                                        <img src={Computer}/>
                                                                        <p title={item.policeTypeName}>{item.policeTypeName}</p>
                                                                    </div>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    )

                                                // }
                                                })
                                            })
                                        }
                                    </Carousel>
                                </div>
                                <p className='analysis-zhipai-title'>选择警种：</p>
                                <div className="selectPoliceDatas2">
                                    <Carousel {...settings}>
                                        
                                            {
                                                this.state.polices.map((item,index)=>{
                                                //  if(index >= (elem-1)*6 && index < elem*6){
                                                    return(
                                                        <div>
                                                            <div key={item.policeTypeId}  className='trace-middle-item analysis-select-elem'>
                                                                <input type="checkbox" value={item.policeTypeId + '_' + item.parentId} id={item.policeTypeName} onClick={this.policeOnChange.bind(this)}/>
                                                                <label htmlFor={item.policeTypeName}>
                                                                    <img className='analysis-police-img' src={NoCheckedPolice} onClick={(e)=>{
                                                                        e.target.getAttribute('src') === NoCheckedPolice?e.target.setAttribute('src',CheckedPolice):e.target.setAttribute('src',NoCheckedPolice)
            
                                                                    }} alt="pic"/>
                                                                    <p>{item.policeTypeName?item.policeTypeName:"技侦"}</p>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    )

                                                //  }
                                                
                                                })
                                            }
                                </Carousel>
                                </div>
                            </div>
                            <div className='feedback-files'>
                                <p className='analysis-zhipai-title'>上传附件：</p>
                                <div className='files-item feedBack-file-first'>
                                    <input type="file" className="fileHide" onChange={this.sendTaskFile.bind(this)} />
                                    <img src={Add} alt="pic"/>
                                    <p>上传</p>
                                </div>

                                {
                                    this.state.sendTaskFile.map((item,index)=>{
                                        if(item.fileExtrName === 'doc'||item.fileExtrName === 'docx'){
                                            return(
                                                <div key={item.fileName} className='files-item feedBack-file'>
                                                    <i className="deleteFile" onClick={this.deleteSendFile.bind(this)} data-filename={item.fileBody.name}></i>
                                                    <img src={Word} alt="pic"/>
                                                    <p>{item.fileName?item.fileName.substr(0,6):''}</p>
                                                </div>
                                            )
                                        }else if(item.fileExtrName === 'xls'||item.fileExtrName === 'xlsx'){
                                            return(
                                                <div key={item.fileName} className='files-item feedBack-file'>
                                                    <i className="deleteFile" onClick={this.deleteSendFile.bind(this)} data-filename={item.fileBody.name}></i>
                                                    <img src={Excle} alt="pic"/>
                                                    <p>{item.fileName?item.fileName.substr(0,6):''}</p>
                                                </div>
                                            )
                                        }else if(item.fileExtrName === 'png'||item.fileExtrName === 'jpg'||item.fileExtrName === 'jpeg'){
                                            return(
                                                <div key={item.fileName} className='files-item feedBack-file'>
                                                    <i className="deleteFile" onClick={this.deleteSendFile.bind(this)} data-filename={item.fileBody.name}></i>
                                                    <img src={Image} alt="pic"/>
                                                    <p>{item.fileName?item.fileName.substr(0,6):''}</p>
                                                </div>
                                            )
                                        }else{
                                            return(
                                                <div key={item.fileName} className='files-item feedBack-file'>
                                                    <i className="deleteFile" onClick={this.deleteSendFile.bind(this)} data-filename={item.fileBody.name}></i>
                                                    <img src={File} alt="pic"/>
                                                    <p>{item.fileName?item.fileName.substr(0,6):''}</p>
                                                </div>
                                            )
                                        }
                                        
                                    })
                                }
                                <div className="clearBoth"></div>
                            </div>
                            <div className=' feedback-queding'>
                                <button className="button" onClick={this.zhipaiTask.bind(this)}>确定</button>
                            </div>
                        </div>
                    </div>
                    <div className="zhipai-right">
                   
                        <div>
                            {
                                this.state.policeTypes.length>0?(this.state.policeTypes.map((child,index)=>{
                                    if(parseInt(child.parentId)<0){}
                                    else{
                                        return(
                                            <div className='trace-middle-item trace-item-one' key={index} >
                                                <div className="zuoxiTypes"  data-policetypeid={child.policeTypeId}  onClick={this.showTasked}>
                                                    <div className="radio-button analysis-zuoxi">
                                                        <img src={Computer}/>
                                                        <p title={child.policeTypeName}>{child.policeTypeName}</p>
                                                        <p>（<span>{child.backedNum?child.backedNum:'0'}</span>/{child.sumNum?child.sumNum:''}）</p>
                                                    </div>
                                                </div>
                                                {/*指派的任务显示*/}
                                                <div className={this.state.assignPoliceTypeId == child.policeTypeId?'showTasked display-block':'display-none'}  onClick={this.stopPropagation.bind(this)}>
                                                    <p className='renwuliebiao'>{child.policeTypeName}任务列表</p>
                                                {
                                                    this.state.taskWillTodo.length>0?(this.state.taskWillTodo.map((item,index)=>{
                                                
                                                        return(
                                                            <div key={index} className="showTask-item" >
                                                                <div className='showTask-item-time' >{item.infoDate?item.infoDate:''}</div>
                                                                <div className="showTask-item-desc" >
                                                                    <img src={this.state.feedCircle} alt="pic"/>
                                                                    <p>{item.taskDesc?item.taskDesc:''}</p>
                                                                    <button className={item.pushState === '0'?"cancleTaskButton":'display-none'} data-pushid={item.pushId} onClick={this.cancleTask.bind(this)}>撤销</button>
                                                                    {
                                                                        item.files.length>0?(item.files.map((elem,num)=>{
                                                                            if(elem.fileType === 'png' || elem.fileType === 'jpeg' ||elem.fileType === 'jpg'  ){
                                                                                return(
                                                                                    <a href={elem.filePath} target="_blank" key={elem.fileName}><div className='files-item trace-file-margin'>
                                                                                        <img src={Image} alt="pic"/>
                                                                                        <p>{elem.fileName?elem.fileName.substr(0,6):''}</p>
                                                                                    </div></a>
                                                                                )
                                                                            }else  if(elem.fileType === 'doc' || elem.fileType === 'docx' ){
                                                                                return(
                                                                                    <a href={elem.filePath}  key={elem.fileName}><div  className='files-item trace-file-margin'>
                                                                                        <img src={Word} alt="pic"/>
                                                                                        <p>{elem.fileName?elem.fileName.substr(0,6):''}</p>
                                                                                    </div></a>
                                                                                )
                                                                            }else  if(elem.fileType === 'xls' || elem.fileType === 'xlsx' ){
                                                                                return(
                                                                                    <a href={elem.filePath} key={elem.fileName}><div className='files-item trace-file-margin'>
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
                                                                    ):<div></div>   
                                                                    }
                                                                
                                                                </div>
                                                                <div className='clearBoth'></div>
                                                            </div>
                                                        )
                                                    })
                                                    ):''
                                                }

                                                </div>
                                            </div>
                                        )
                                    }
                                })
                                ): ('')
                            }
                            <p className="clearBoth"></p>
                        </div>
                        <div>
                        {
                            this.state.policeTypes.length>0?(this.state.policeTypes.map((item,index)=>{
                                if(parseInt(item.parentId)<0){
                              
                                    return(
                                        <div className='trace-middle-item trace-item-one' key={index}>
                                            <div data-policetypeid={item.policeTypeId} onClick={this.showTasked} className="data-pointer">
                                                <img src={Police} alt="pic"/>
                                            </div>
                                            <p>{item.policeTypeName?item.policeTypeName:''}（<span>{item.backedNum?item.backedNum:'0'}</span>/{item.sumNum?item.sumNum:''}）</p>
                                        
                                            {/*指派的任务显示*/}
                                            <div className={this.state.assignPoliceTypeId === item.policeTypeId?'showTasked display-block':'display-none'}  onClick={this.stopPropagation.bind(this)}>
                                                <p className='renwuliebiao'>{item.policeTypeName}任务列表</p>
                                            {
                                                this.state.taskWillTodo.length>0?(this.state.taskWillTodo.map((item,index)=>{
                                            
                                                    return(
                                                        <div key={index} className="showTask-item" >
                                                            <div className='showTask-item-time' >{item.infoDate?item.infoDate:''}</div>
                                                            <div className="showTask-item-desc" >
                                                                <img src={this.state.feedCircle} alt="pic"/>
                                                                {/*<div className="showTask-item-type">
                                                                    <span>{item.policeTypeName} </span>
                                                                </div> */}
                                                                <p>{item.taskDesc?item.taskDesc:''}</p>
                                                                <button className={item.pushState === '0'?"cancleTaskButton":'display-none'} data-pushid={item.pushId} onClick={this.cancleTask.bind(this)}>撤销</button>
                                                                {
                                                                    item.files.length>0?(item.files.map((elem,num)=>{
                                                                        if(elem.fileType === 'png' || elem.fileType === 'jpeg' ||elem.fileType === 'jpg'  ){
                                                                            return(
                                                                                <a href={elem.filePath} target="_blank" key={elem.fileName}><div className='files-item trace-file-margin'>
                                                                                    <img src={Image} alt="pic"/>
                                                                                    <p>{elem.fileName?elem.fileName.substr(0,6):''}</p>
                                                                                </div></a>
                                                                            )
                                                                        }else  if(elem.fileType === 'doc' || elem.fileType === 'docx' ){
                                                                            return(
                                                                                <a href={elem.filePath}  key={elem.fileName}><div  className='files-item trace-file-margin'>
                                                                                    <img src={Word} alt="pic"/>
                                                                                    <p>{elem.fileName?elem.fileName.substr(0,6):''}</p>
                                                                                </div></a>
                                                                            )
                                                                        }else  if(elem.fileType === 'xls' || elem.fileType === 'xlsx' ){
                                                                            return(
                                                                                <a href={elem.filePath} key={elem.fileName}><div className='files-item trace-file-margin'>
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
                                                                ):<div></div>   
                                                                }
                                                            
                                                            </div>
                                                            <div className='clearBoth'></div>
                                                        </div>
                                                    )
                                                })
                                                ):''
                                            }
    
                                            </div>
                                        </div>
                                    )
                                }
                            })
                            ): ('')
                        }
                        <p className="clearBoth"></p>
                    </div>
                       
                    </div>
                </div>


                  
                <div className="trace-content-bottom">

                    {/*右侧点击讨论组*/}
                    <div className={this.state.showTalk==='0'?'analysis-rightButton':'analysis-rightButton talk-hide'} onClick={this.showTalk.bind(this)}>
                        <img src={RightButton} alt="pic"/>
                        <img src={RightMan} alt="pic"/>
                        <p>讨论组</p>
                    </div>  

                    <div className="analysisSeat-bottom-left"  onClick={this.closePop.bind(this)}>
                        <div className="inner-title marBottom"> <img src={Fankui} alt="pic"/> <span>反馈信息</span></div>
                        {
                            this.state.hcZoneRecvList.length>0?(this.state.hcZoneRecvList.map((item,index)=>{
                                return(
                                    <div key={index} className="trace-news">
                                        <div className='trace-news-time' style={{width:'21%'}}>{item.infoDate}</div>
                                        <div className="trace-news-desc" style={{width:'79%'}}>
                                            <img src={this.state.feedCircle} alt="pic"/>
                                            <div className="trace-news-show">
                                                <span>{item.policeTypeName} </span> <button onClick={this.readTask.bind(this)} data-date={item.infoDate} data-pushid={item.pushId} className={this.state.isMaster||(item.pushId.indexOf('P:')<0 && item.policeTypeId === Cookies.get('policeTypeId'))?"":'readTaskHide'}>查看任务</button>
                                                <div className={this.state.readTaskShow === item.infoDate ?'trace-news-pop readTaskShow':'trace-news-pop readTaskHide'} onClick={this.stopPropagation.bind(this)}>
                                                    <p>{this.state.checkTaskDeail.infoDate?this.state.checkTaskDeail.infoDate:''}</p>
                                                    <p >{this.state.checkTaskDeail.taskDesc?this.state.checkTaskDeail.taskDesc:''}</p>
                                                    {
                                                        this.state.checkTaskDeail.files? (this.state.checkTaskDeail.files.length>0?(this.state.checkTaskDeail.files.map((elem,index)=>{
                                                            // return(
                                                                if(elem.fileType === 'png' || elem.fileType === 'jpeg' ||elem.fileType === 'jpg'  ){
                                                                    return(
                                                                        <a href={elem.filePath} key={elem.fileName}><div className='files-item trace-file-margin'>
                                                                            <img src={Image} alt="pic"/>
                                                                            <p>{elem.fileName?elem.fileName.substr(0,6):''}</p>
                                                                        </div></a>
                                                                    )
                                                                }else  if(elem.fileType === 'doc' || elem.fileType === 'docx' ){
                                                                    return(
                                                                        <a href={elem.filePath} key={elem.fileName}><div  className='files-item trace-file-margin'>
                                                                            <img src={Word} alt="pic"/>
                                                                            <p>{elem.fileName?elem.fileName.substr(0,6):''}</p>
                                                                        </div></a>
                                                                    )
                                                                }else  if(elem.fileType === 'xls' || elem.fileType === 'xlsx' ){
                                                                    return(
                                                                        <a href={elem.filePath} key={elem.fileName}><div className='files-item trace-file-margin'>
                                                                            <img src={Excle} alt="pic"/>
                                                                            <p>{elem.fileName?elem.fileName.substr(0,6):''}</p>
                                                                        </div></a>
                                                                    )
                                                                }else{
                                                                    return(
                                                                        <a href={elem.filePath} key={elem.fileName}><div className='files-item trace-file-margin'>
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
                                                item.files.length>0?(item.files.map((elem,num)=>{
                                                    if(elem.fileType === 'png' || elem.fileType === 'jpeg' ||elem.fileType === 'jpg'  ){
                                                        return(
                                                            <a href={elem.filePath} target="_blank" key={elem.fileName}><div className='files-item trace-file-margin'>
                                                                <img src={Image} alt="pic"/>
                                                                <p>{elem.fileName?elem.fileName.substr(0,6):''}</p>
                                                            </div></a>
                                                        )
                                                    }else  if(elem.fileType === 'doc' || elem.fileType === 'docx' ){
                                                        return(
                                                            <a href={elem.filePath}  key={elem.fileName}><div  className='files-item trace-file-margin'>
                                                                <img src={Word} alt="pic"/>
                                                                <p>{elem.fileName?elem.fileName.substr(0,6):''}</p>
                                                            </div></a>
                                                        )
                                                    }else  if(elem.fileType === 'xls' || elem.fileType === 'xlsx' ){
                                                        return(
                                                            <a href={elem.filePath} key={elem.fileName}><div className='files-item trace-file-margin'>
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
                                            ):<div></div>   
                                            }
                                           
                                        </div>
                                    </div>
                                )
                            })
                            ):''
                        }
                      
                    </div>

                    <div className="analysisSeat-bottom-right">
                        <div className={this.state.showTalk==='0'?'analysisSeat-right-feedback':'analysisSeat-right-feedback feedback-changeWidth'}>
                            <div className="inner-title analysisForSeat-title">
                                <img src={Feed} alt="pic" style={{width:'1.5rem'}}/>
                                <span>反馈</span>
                                <button onClick={this.showTool.bind(this)}  disabled={this.state.reportStatus === '2'?true:false} className='analysis-buttom-tool button'><img src={Tool} alt="pic"/>研判工具集</button>
                            </div>
                         {/* <div className="talk-title">  <div className='newpro-title'><p> <i className='nd-title-img'><b></b></i> 反馈 <button onClick={this.showTool.bind(this)} className='analysis-buttom-tool button'><img src={Tool} alt="pic"/>研判工具集</button></p></div></div>
                           工具集*/}
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

                            <div className="feedback-text">
                                <p>({this.state.currentDate})</p>
                                <div className="feedback-send">
                                    <div ref='feedbackSearch'>
                                        {
                                            this.state.superSearchData.length>0?(
                                                this.state.superSearchData.map((item,index)=>{
                                                    return(
                                                        <p>
                                                            {item.searchPersonName?item.searchPersonName:''} {item.searchPersonId?item.searchPersonId:''}  <br/>
                                                            {item.searchPersonData?(item.searchPersonData+' 。'):''}
                                                        </p>
                                                    )
                                                })
                                            ):''
                                        }
                                        
                                    </div>
                                   
                                 
                                    <textarea ref="feedBackText"  disabled={this.state.reportStatus === '2'?true:false} onKeyDown={this.enterKey.bind(this)}></textarea>
                                </div>
                            </div>

                            <div className='feedback-files '>
                                <div className='files-item feedBack-file-first'>
                                    <input type="file" className="fileHide" onChange={this.feedBackFile.bind(this)} disabled={this.state.caseInfo.approveResult === '1'?true:false}/>
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
                                <button className="button" onClick={this.feedBackText.bind(this)}>确定</button>
                            </div>
                           
                           
                            
                        </div>


                        <div className={this.state.showTalk==='0'?'trace-content-right analysis-talk-width talk-hide':'trace-content-right analysis-talk-width'}>
                            {/*<div className="talk-title">  <div className='newpro-title'><p> <i className='nd-title-img'><b></b></i> 讨论组  <b onClick={this.closeTalk.bind(this)}></b></p></div></div>
                            */}
                            <div className="inner-title analysisForSeat-title">
                                <img src={Feed} alt="pic" style={{width:'1.5rem'}}/>
                                <span>讨论组</span>
                                <button onClick={this.closeTalk.bind(this)} className='analysis-talk-pickUp'><img src={PickUp} alt="pic"/></button>
                            </div>
                            <div className="talk-content" ref='talkContent' id="talk-content" onClick={this.clickShow.bind(this)}>
                               
                                {
                                    this.state.talkList.map((e,i)=>{
                                    return this.displayMode(e,i);
                                    })
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

