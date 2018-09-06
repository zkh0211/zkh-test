import React, {Component} from 'react'
import { message } from 'antd'
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
    getPersonInfo,
    addWhiteSheet,
    checkWhiteSheet
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
export default class TaizhangDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            deptLevel:Cookies.get('deptLevel'),
            sendTaskFile:[],
            tempFile:[],
            danwei:'',
            minjing:'',
            ifOnly:'true',
            ifOnlyPolice: 'true',
            showId: 'false',
            personInfo:{},
            personName:''
        }
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
    // shouldComponentUpdate(nextProps,nextState){
    //     console.log('after'+nextState.sendTaskFile.length);
    //     console.log('before'+this.state.sendTaskFile.length)
    //     if(nextState.sendTaskFile.length === this.state.sendTaskFile.length){
    //         console.log(1111)
    //         return false
    //     }
    //     console.log(222)
    //     return true
      
    // }
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

  

   
    
    cancel =()=>{
        this.props.cancel();
        this.setState({
            personInfo: {}
        })
    }
    feedbackContent = () => {
        let desc = this.refs.desc.value;
        // let name = this.refs.name.value;
        let idCard = this.refs.idCard.value;
        // let gxpcs = '';
        // let gxmj = '';

        this.props.dispatch(addWhiteSheet({dataTypeCode:this.state.personInfo.dataTypeCode,dataSourceCode:this.state.personInfo.dataSourceCode,"xm":this.state.personInfo.xm,"cxyy":desc,"sfzh":idCard,"gxpcs":this.state.personInfo.gxdw, "gxmj":this.state.personInfo.gxmj},(res)=>{
            if(res.rel){
                this.props.cancel();
                this.setState({
                    personInfo: {}
                })
                this.props.dispatch(checkWhiteSheet({page:1,pageSize:7},(res)=>{
                  
                }));
                message.success(res.msg,3)
            }else{
                message.error(res.msg,3)
            }
        }))

       
    }

    uploadFile = () => {
        let form = new FormData();
        this.state.sendTaskFile.forEach((e)=>{
            form.append("files",e.fileBody);
        });
        form.append("itemId",'');
        form.append("backId",'');
        form.append("whiteIdNum",this.refs.idCard.value);
      
       
        this.props.dispatch(uploadDirectionFile(form,(res)=>{

        }))
    }
    inputIdCard(e){
        let inputValue = e.currentTarget.value;
        let exp = /^\d{18}$/
        if(!exp.test(inputValue)){
            this.setState({
                showId: 'true'
            })
        }else{
            this.props.dispatch(getPersonInfo({identifiedCode:inputValue},(res)=>{
                if(res.data){
                    this.setState({
                        personInfo: res.data,
                        personName: res.data.xm
                    },()=>{
                        
                    })
                }else{
                    this.setState({
                        personInfo: {},
                        personName:''
                    })
                }
            }))
        }
    }
    onfocus = ()=>{
        this.setState({
            showId: 'false'
        })
    }

    render(){
        return(
            <div className="peopleBasicInfo">
                <div className="peopleInfo-first">
                    <div> <p>照片</p> <img src={PeopleIcon} alt="pic"/></div>
                    <div>
                        <p> <span>姓名</span><input type="text" ref="name" value={this.state.personName} /> </p>
                        <p> <span>证件号码</span>
                            <input type="text" ref="idCard"  onBlur={this.inputIdCard.bind(this)} onFocus={this.onfocus}/> 
                            <span className={this.state.showId === 'true'?"showIdCard":"display-none"}>证件号码错误！</span>
                        </p>
                    </div>
                </div>
                <table className="peopleInfo-second">
                    <tbody>
                        <tr> <td>验票发送时间</td> <td>{this.state.personInfo.ypfssj&&moment(this.state.personInfo.ypfssj).format("YYYY-MM-DD hh:mm:ss")}</td>
                         <td>验票站点</td> <td>{this.state.personInfo.ypzd&&this.state.personInfo.ypzd}</td></tr>
                        <tr> <td>票号</td> <td>{this.state.personInfo.ph&&this.state.personInfo.ph}</td>
                         <td>车次</td> <td>{this.state.personInfo.cc&&this.state.personInfo.cc}</td> </tr>
                        <tr> <td>发站</td> <td>{this.state.personInfo.fz&&this.state.personInfo.fz}</td>
                         <td>到站</td> <td>{this.state.personInfo.dz&&this.state.personInfo.dz}</td> </tr>
                        <tr> <td>发车日期</td> <td>{this.state.personInfo.fcrq&&moment(this.state.personInfo.fcrq).format("YYYY-MM-DD")}</td> 
                        <td>发车时间</td> <td>{this.state.personInfo.fcsj&&moment(this.state.personInfo.fcsj).format("hh:mm")}</td> </tr>
                        <tr> <td>车厢号</td> <td>{this.state.personInfo.cxh&&this.state.personInfo.cxh}</td> 
                        <td>座位号</td> <td>{this.state.personInfo.zwh&&this.state.personInfo.zwh}</td> </tr>
                        <tr> <td>人员类别</td> <td title={this.state.personInfo.rylb&&this.state.personInfo.rylb}>{this.state.personInfo.rylb&&this.state.personInfo.rylb.substr(0,8)}</td> 
                        <td>人员标签</td> <td>{this.state.personInfo.rybq&&this.state.personInfo.rybq}</td> </tr>
                        <tr> <td>人员级别</td> <td colSpan={3}>{this.state.personInfo.ryjb&&this.state.personInfo.ryjb}</td> </tr>
                    </tbody>
                </table>
                
                <table className="peopleInfo-third">
                    <tbody>
                        <tr> <td>管辖单位</td> <td title={this.state.personInfo.gxdw&&this.state.personInfo.gxdw}>{this.state.personInfo.gxdw&&this.state.personInfo.gxdw.substr(0,10)}</td> 
                
                         <td>管辖民警</td> <td>{this.state.personInfo.gxmj&&this.state.personInfo.gxmj}</td> 
                        </tr>
                        <tr> <td>签收状态</td> <td>{this.state.personInfo.sfqs&&(this.state.personInfo.sfqs === '1'?"未签收":"已签收")}</td> 
                        <td>签收时间</td> <td>{this.state.personInfo.qssj&&this.state.personInfo.qssj}</td> </tr>
                        <tr> <td>反馈状态</td> <td>{this.state.personInfo.sfqs&&(this.state.personInfo.sfqs === '3'?"已反馈":"未反馈")}</td>
                         <td>反馈时间</td> <td>{this.state.personInfo.fksj&&this.state.personInfo.fksj}</td> </tr>
                    </tbody>
                </table>
                <table className="peopleInfo-fourth">
                    <tbody>
                        <tr> <td colSpan={4}>添加理由</td> </tr>
                        <tr> <td colSpan={4}>
                                <div>
                                    <textarea className={"showfeed"} ref='desc'></textarea>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className='feedback-files'>
                    <p className='modal-sendFile-title'>添加凭证</p>
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
            <div className="renyuanButton">   
                <button className="button" onClick={this.cancel} style={{margin:'0'}}>取消</button> 
                <button className="button" style={{marginLeft:'1rem'}} onClick={this.feedbackContent}>确定</button>
            </div>
           

            </div>
        )
    }
}

