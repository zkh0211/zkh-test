import React, {Component} from 'react'
import Add from '../../../images/analysis/add.png'
import Word from '../../../images/source/word.svg'
import Excle from '../../../images/source/excel.svg'
import File from '../../../images/source/file-1.png'
import Image from '../../../images/source/image.svg'
import PeopleIcon from '../../../images/common/talkRight.jpg'
import Editor from '../../../images/common/u2020.png'
import Cookies from 'js-cookie'
import {
    uploadDirectionFile,
    feedBackDirection,
    changePoliceStation,
    policePeopleList,
    pcsWillDoCount, 
    pcsDoingCount,
    zhilingTotal
}from 'actions/masterAction'
import { lang } from 'moment';
import { connect } from 'react-redux'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
@connect(
    (state,props)=>({
        config: state.config,
    })
)
export default class DirectionDetail extends Component{
    constructor(props){
        super(props);
        this.changeCompanyFlag = false;
        this.changePoliceFlag = false;
        this.state={
            deptLevel:Cookies.get('deptLevel'),
            deptName: Cookies.get('deptName'),
            sendTaskFile:[],
            tempFile:[],
            danwei:'',
            minjing:'',
            ifOnly:'true',
            ifOnlyPolice: 'true',
            personInfo:{},
            caseFileList:[],
            feedNews:[]
        }
    }
    componentDidMount(){
        // let date = new Date();
      

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
        // temp.push(file);
        // console.log('before')
        // console.log(this.state.sendTaskFile)
        // this.state.tempFile.push(file)
        this.setState({
            sendTaskFile:this.state.sendTaskFile
        },()=>{
            // console.log('after')
            // console.log(this.state.sendTaskFile)
            // console.log("执行上传文件结束")
        });
       
    }
    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.data.itemId !== this.props.data.itemId){
            this.setState({
                personInfo: nextProps.data,
                danwei: nextProps.data.gxdw,
                gxmj: nextProps.data.gxmj
            },
        ()=>{
            // console.log(this.state.personInfo)
            // let caseDay = this.state.personInfo.sjqrsj&&this.state.personInfo.sjqrsj.substr(8,2);
            // let caseHour = this.state.personInfo.sjqrsj&&this.state.personInfo.sjqrsj.substr(6,2);
            // let caseMinute = this.state.personInfo.sjqrsj&&this.state.personInfo.sjqrsj.substr(11,2);
            // let caseSecond = this.state.personInfo.sjqrsj&&this.state.personInfo.sjqrsj.substr(14,2);
     
            // let addMinute = parseInt(caseMinute)+30;
            // console.log(addMinute)
            // if(addMinute>59){
            //  caseHour = parseInt(caseHour)+1;
            //  if(caseHour > 23){
            //      caseDay = parseInt(caseDay)+1
            //  }
            // }
            // let endTime = this.state.personInfo.sjqrsj&&this.state.personInfo.sjqrsj.substr(0,7)+caseDay+' '+caseHour+caseMinute+caseSecond;
            // console.log(endTime)
            // console.log(nextProps.feedNews)
        })
        }
        if(nextProps.feedNews !== this.props.feedNews){
            this.setState({
                feedNews: nextProps.feedNews
            })
        }
        return true
      
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

    changeDanwei = (e) => {
        let danweis = this.refs.guanxiadanwei.value;
        // console.log(danweis)
        this.changeCompanyFlag = true;
        this.setState({
            danwei: danweis
        },()=>{
            // console.log(this.state.danwei)
        })
    }

    changeInput = () =>{
        this.refs.guanxiadanwei.removeAttribute("readOnly");
        // this.setState({
        //     ifOnly: 'false'
        // })
    }

    changeMinjing = (e) => {
        let minjing = this.refs.guanxiaminjing.value;
        this.changePoliceFlag = true;
        this.setState({
            minjing: minjing,
        })
    }

    changeInput2 = () =>{
        this.refs.guanxiaminjing.removeAttribute("readOnly")
    }
    
    cancel =()=>{
        this.props.cancle()
    }
    feedbackContent () {
        // console.log("反馈信息")

        let type = this.props.sjlx;
        let changePolice = this.state.danwei;
        let changePolicePeople = this.state.minjing;

        if(this.state.deptLevel === '4'){
            
            let desc = this.refs.desc.value;
            let formData = new FormData();
            formData.append("gxdw",changePolice);
            formData.append("gxmj",changePolicePeople);
            formData.append("itemId",this.state.personInfo.itemId);
            formData.append("type",type);
    
            this.props.dispatch(feedBackDirection({"itemId":this.state.personInfo.itemId,"backDesc":desc,"type":type},(res)=>{
                if(res.rel){
                    this.props.cancle();
                    this.uploadFile(this.state.personInfo.itemId,res.data);
                }
            }))
            this.props.dispatch(policePeopleList({"policeStation":this.state.deptName,"status":'1',"type":'',"pageNum":1,"pageSize":7},(res)=>{
                if(res.data){
                    this.props.dispatch(pcsWillDoCount({count: res.data.total}))
                  }else{
                    this.props.dispatch(pcsWillDoCount({count: 0}))
                  }
                
            }))
    
            this.props.dispatch(policePeopleList({"policeStation":this.state.deptName,"status":'2',"type":'',"pageNum":1,"pageSize":7},(res)=>{
                if(res.data){
                    this.props.dispatch(pcsDoingCount({count: res.data.total}))
                  }else{
                    this.props.dispatch(pcsDoingCount({count: 0}))
                  }
                
               
            }))
            this.props.dispatch(policePeopleList({"policeStation":this.state.deptName,'status':'1',"type":'',"pageNum":1,"pageSize":7},(res)=>{ 
                if(res.data){
                    this.props.dispatch(zhilingTotal(res.data.total))
                  }else{
                    this.props.dispatch(zhilingTotal(0))
                  }
               
            }))
           

        }else{
            if(this.changeCompanyFlag || this.changePoliceFlag){
                this.props.dispatch(changePoliceStation({"gxdw":changePolice,"gxmj":changePolicePeople,"itemId":this.state.personInfo.itemId,"type":type},(res)=>{
                 
                }))
                this.changeCompanyFlag = false;
                this.changePoliceFlag = false;
                this.props.cancle();
            }else{
                this.props.cancle();
            }
          
        }

    }
 
    uploadFile(itemId,backId) {
        let form = new FormData();
        this.state.sendTaskFile.forEach((e)=>{
            form.append("files",e.fileBody);
        });
        form.append("itemId",itemId);
        form.append("backId",backId);
        form.append("whiteIdNum",this.state.personInfo.sfzh);

        this.props.dispatch(uploadDirectionFile(form,(res)=>{
            // console.log(res)
        }))
    }

    render(){
        return(
            <div className="peopleBasicInfo">
                <div className="peopleInfo-first">
                    <div> <p>照片</p>  <img src={PeopleIcon} alt="pic"/></div>
                    <div>
                        <p> <span>姓名</span> {this.state.personInfo.xm}</p>
                        <p> <span>证件号码</span>{this.state.personInfo.sfzh} </p>
                    </div>
                </div>
                <table className="peopleInfo-second">
                    <tbody>
                        <tr> <td>验票发送时间</td> <td>{this.state.personInfo.ypfssj&&moment(this.state.personInfo.ypfssj).format("YYYY-MM-DD HH:MM:SS")}</td> <td>验票站点</td> <td> {this.state.personInfo.ypzd&&this.state.personInfo.ypzd}</td></tr>
                        <tr> <td>票号</td> <td> {this.state.personInfo.ph&&this.state.personInfo.ph}</td> <td>车次</td> <td>{this.state.personInfo.cc}</td> </tr>
                        <tr> <td>发站</td> <td>{this.state.personInfo.fz&&this.state.personInfo.fz} </td> <td>到站</td> <td>{this.state.personInfo.dz}</td> </tr>
                        <tr> <td>发车日期</td> <td> </td> <td>发车时间</td> <td> {this.state.personInfo.fcsj&&this.state.personInfo.fcsj}</td> </tr>
                        <tr> <td>车厢号</td> <td> {this.state.personInfo.cxh&&this.state.personInfo.cxh}</td> <td>座位号</td> <td>{this.state.personInfo.zwh&&this.state.personInfo.zwh} </td> </tr>
                        <tr> <td>人员类别</td> <td title={this.state.personInfo.rylb}>{this.state.personInfo.rylb&&this.state.personInfo.rylb.substr(0,8)}</td> <td>人员标签</td> <td>{this.state.personInfo.rybq}</td> </tr>
                        <tr> <td>人员级别</td> <td colSpan={3}>{this.state.personInfo.ryjb&&this.state.personInfo.ryjb} </td> </tr>
                    </tbody>
                </table>
                
                <table className="peopleInfo-third">
                    <tbody>
                       {/*} <tr> <td>管辖单位</td> <td title={this.state.danwei}><input type="text" ref="guanxiadanwei" readOnly value={this.state.danwei} onChange={this.changeDanwei}/> <img className={this.state.deptLevel !== '4'?'showEditor':'display-none'} src={Editor} onClick={this.changeInput} alt="pic"/></td> 
                
                         <td>管辖民警</td> <td><input type="text" ref="guanxiaminjing" readOnly value={this.state.minjing} onChange={this.changeMinjing}/> <img className={this.state.deptLevel !== '4'?'showEditor':'display-none'} src={Editor} onClick={this.changeInput2} alt="pic"/></td> 
                        </tr>*/}
                        <tr> <td>签收状态</td> <td>{this.state.personInfo.sfqs === '1'?"未签收":"已签收"} </td> <td>签收时间</td> <td>{this.state.personInfo.qssj&&this.state.personInfo.qssj} </td> </tr>
                        <tr> <td>反馈状态</td> <td>{this.state.personInfo.sfqs === '3'?"已反馈":"未反馈"} </td> <td>反馈时间</td> <td>{this.state.personInfo.fksj&&this.state.personInfo.fksj} </td> </tr>
                    </tbody>
                </table>
                <table className="peopleInfo-fourth">
                    <tbody>
                        <tr> <td colSpan={4}>反馈内容</td> </tr>
                        <tr> <td colSpan={4}>
                                <div>
                                {
                                    this.state.deptLevel === '4' && this.state.personInfo.sfqs !=='3'?(
                                    
                                        <textarea className={"showfeed"} ref='desc'></textarea>
                                    ):(
                                        <p>{this.state.feedNews.length>0&&this.props.feedNews[0]&&this.props.feedNews[0].backDesc&&this.props.feedNews[0].backDesc}</p>
                                    )
                                }
                                   {/* <p className={this.state.deptLevel !== '4'&&this.state.personInfo.sfqs === '3'?"":'display-none'}>{this.state.feedNews[0]&&this.props.feedNews[0].backDesc}</p>
                                    <textarea className={this.state.deptLevel === '4'&&this.state.personInfo.sfqs !=='3'?"showfeed":'display-none'} ref='desc'></textarea>*/}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className={this.state.deptLevel === '4'&&this.state.personInfo.sfqs !=='3'?'feedback-files':'display-none'}>
                    <p className='modal-sendFile-title'>上传附件：</p>
                    <div className='files-item feedBack-file-first'>
                        <input type="file" className="fileHide" onChange={this.sendTaskFile.bind(this)} />
                        <img src={Add} alt="pic"/>
                        <p>上传</p>
                    </div>

                {
                    this.state.sendTaskFile.length>0?(this.state.sendTaskFile.map((item,index)=>{
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
                ):''
                }
       
                <div className="clearBoth"></div>
            </div>
            <div className={this.state.deptLevel === '4'&&this.state.personInfo.sfqs !=='3'?'display-none':'feedback-files'}>
             {/*展示文件*/}
             {
                this.state.feedNews[0]&&this.state.feedNews[0].filesEntityList[0]&&this.state.feedNews[0].filesEntityList.map((item, index) => {
              
                    if (item.fileType === 'png' || item.fileType === 'jpg' ||item.fileType === 'jpeg'   ) {
                        return (
                            <a href={item.filePath} target='_blank' key={item.fileName}><div className='trace-files-item' >
                                <img src={Image} alt="pic"/>
                                <p>{item.fileName?item.fileName.substr(0,6):''}</p>
                            </div></a>
                        )
                    } else if (item.fileType === 'doc' || item.fileType === 'docx') {
                        return (
                            <a href={item.filePath} target="_blank"  key={item.fileName}><div className='trace-files-item'>
                                <img src={Word} alt="pic"/>
                                <p>{item.fileName?item.fileName.substr(0,6):''}</p>
                            </div></a>
                        )
                    } else if (item.fileType === 'xlsx' || item.fileType === 'xls') {
                        return (
                            <a href={item.filePath}  target="_blank" key={item.fileName}><div className='trace-files-item'>
                                <img src={Excle} alt="pic"/>
                                <p>{item.fileName?item.fileName.substr(0,6):''}</p>
                            </div></a>
                        )
                    } else{
                        return (
                            <a href={item.filePath} target="_blank"  key={item.fileName}><div className='trace-files-item' >
                                <img src={File} alt="pic"/>
                                <p>{item.fileName?item.fileName.substr(0,6):''}</p>
                            </div></a>
                        )
                    }

                })
            }
            
                <div className="clearBoth"></div>
            </div>
            <div className="renyuanButton">   
                <button className="button" onClick={this.cancel} style={{margin:'0'}}>取消</button>
                {
                    this.state.deptLevel === '4'&& this.state.personInfo.sfqs !=='3'?(
                        <button className="button" style={{marginLeft:'1rem'}} onClick={this.feedbackContent.bind(this)}>确定</button>
                    ):""
                }
            </div>
           

            </div>
        )
    }
}

