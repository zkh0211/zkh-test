import React,{Component} from 'react'
import { connect } from 'react-redux'
import { Carousel, Modal,Button} from 'antd'
import './traceOfSource.less'
import Cookies from 'js-cookie'
import TalkNewsLeft from './components/talkNewsLeft'
import TalkNewsRight from './components/talkNewsRight'
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
import PickUp from '../../images/analysis/pickUp.png'
import Feed from '../../images/source/feed.png'
import appointIcon from '../../images/info/appoint.png'
import Computer from '../../images/info/computer.png'
import ComputerWhite from '../../images/info/computer-white.png'
import Report2Word from "../reportWord/component/Report2Word";
import EditIcon from '../../images/info/edit.png'
import EditDoneIcon from '../../images/info/edit-done.png'
import {
    getHcDetail,
    getFileList,
}from 'actions/syntheticInfo'
import {
    getPoliceTypePushById,
    getHcZoneRecvList,
    getHcPushInfoById
}from 'actions/traceOfSourceAction'
import {
    getWordReport
}from 'actions/reportWord'
import {
   
    getChatMessageHistory,
  
}from 'actions/analysisForPoliceAction'

@connect(
    (state, props) => ({ config: state.config })
  )

export default class TraceOfSource extends Component{
    constructor(props){
        super(props)
        this.state={
            caseInfo:{},
            caseId:'',
            isMaster:'0',
            policeTypes:[],
            hcZoneRecvList:[],
            reportInfo:{},
            ifCreateReport:false,
            id:this.props.params.id,
            state:this.props.params.state,
            deptNo:this.props.params.deptNo,
            files:[
                // {fileName:'某图片',fileType:'image'},
                // {fileName:'某文件',fileType:'word'},
                // {fileName:'某材料',fileType:'excle'}
            ],
            feedCircle:FeedCircle1,
            feedNews:[
                { feedTime:'2017-12-12   08:08:08', role:'结束', feedDesc:'fsjfkslfjdsjflsjjfjjfsldk饭店经理反馈说了', fileName:'某图片'},
                { feedTime:'2017-12-12   08:08:08', role:'重大案事件合成席', feedDesc:'fsjfkslfjdsjflsjjfjjfsldk饭店经理反馈说了', fileName:'某图片'},
                { feedTime:'2017-12-12   08:08:08', role:'特侦合成席', feedDesc:'fsjfkslfjdsjflsjjfjjfsldk饭店经理反馈说了', fileName:'某图片'}
            ],
            readTaskShow:-1,
            talkList:[],
            checkTaskDeail:{},
        }
    }

    componentWillMount(){
        if(Cookies.get('authCode').indexOf('hczhRole')!==-1){
            this.setState({
                isMaster:'1'
            })
        }
        this.props.dispatch(getHcDetail({id:this.state.id,state:this.state.state},(res)=>{
            if(res.data){
                this.setState({
                    caseInfo:res.data
                },()=>{
                    this.getChatMessageHistory()
                })
            }else{
                this.setState({
                    caseInfo:{}
                })
            }
        }))
        
        this.props.dispatch(getPoliceTypePushById({id:this.state.id,deptNo:this.state.deptNo},(res)=>{
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

        this.props.dispatch(getHcZoneRecvList({id:this.state.id,deptNo:this.state.deptNo},(res)=>{
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

    
    getChatMessageHistory(){
        this.props.dispatch(getChatMessageHistory({id:this.state.id,deptNo:this.state.deptNo},(res)=>{
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
    componentDidUpdate(prevProps, prevState){
         
        let talkContent = this.refs.talkContent;
        talkContent.scrollTop = talkContent.scrollHeight - talkContent.offsetHeight
      
    }

    readTask(e){
        e.stopPropagation();
        let currentUserPoliceTypeId = Cookies.get('policeTypeId');
        let policeTypeId = e.currentTarget.getAttribute('policetypeid');
        let num = e.currentTarget.getAttribute('data-pushid');
        let infoDate = e.currentTarget.getAttribute('data-date');
        if(this.state.isMaster === '1'){
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
        }else{
            if(currentUserPoliceTypeId === policeTypeId){
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
        }
       
       
    }
    closePop(){
        this.setState({
            readTaskShow:-1
        })
    }
    stopPropagation(e){
        e.stopPropagation();
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
            // this.sendMsg();
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

    render(){
        let settings = {
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
                <div className="trace-content-top">
                    <div className="inner-title"> <img src={Hecheng} alt="pic"/> <span>合成信息</span></div>
                    <table> 
                        <tbody>
                            <tr><td>合成名称:</td><td>{this.state.caseInfo.caseName?this.state.caseInfo.caseName:<span>&nbsp;</span>}</td><td>发起人:</td><td>{this.state.caseInfo.name?this.state.caseInfo.name:<span>&nbsp;</span>}</td>
                            <td>发起时间:</td><td>{this.state.caseInfo.submitDate?this.state.caseInfo.submitDate:<span>&nbsp;</span>}</td> 
                            <td>审批时间:</td><td>{this.state.caseInfo.taskTime?this.state.caseInfo.taskTime:<span>&nbsp;</span>}</td>
                            <td>来源:</td><td>{this.state.caseInfo.fromName?this.state.caseInfo.fromName:<span>&nbsp;</span>}</td>
                            <td style={{color:'red'}}>密级:</td><td style={{color:'red'}}>{this.state.caseInfo.levelName?this.state.caseInfo.levelName:<span>&nbsp;</span>}</td></tr>
                        </tbody>
                    </table>
                    <div className="trace-desc">
                        <p>合成描述:</p>
                        <div className="trace-desc-content">
                            <p>{this.state.caseInfo.caseDesc?this.state.caseInfo.caseDesc:''}</p>
                        </div>
                        <div className="clearBoth"></div>
                    </div>
                    <div className="trace-files">
                        <Carousel {...settings}>
                        {
                            this.state.files.map((item,index)=>{
                                if(item.fileType === 'png' || item.fileType === 'jpg' || item.fileType === 'jpeg'){
                                    return(
                                        <a href={item.filePath} target="_blank" key={item.fileName}><div className='files-item'>
                                            <img src={Image} alt="pic"/>
                                            <p>{item.fileName?item.fileName.substr(0,6):''}</p>
                                        </div></a>
                                    )
                                }else if(item.fileType === 'doc' || item.fileType === 'docx'){
                                    return(
                                        <a href={item.filePath} target='_blank' key={item.fileName}><div className='files-item' >
                                            <img src={Word} alt="pic"/>
                                            <p>{item.fileName?item.fileName.substr(0,6):''}</p>
                                        </div></a>
                                    )
                                }else if( item.fileType === 'xls' || item.fileType === 'xlsx'){
                                    return(
                                        <a href={item.filePath} target='_blank' key={item.fileName}><div className='files-item'>
                                            <img src={Excle} alt="pic"/>
                                            <p>{item.fileName?item.fileName.substr(0,6):''}</p>
                                        </div></a>
                                    )
                                }else{
                                    return(
                                        <a href={item.filePath} target='_blank' key={item.fileName}><div className='files-item'>
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

                <div className="shenpiyijian">
                   
                {
                    this.state.caseInfo.composeResultList&&this.state.caseInfo.composeResultList.map((item,index)=>{
                        return(
                            <div>
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
                                                            <tr >
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
                                                            <tr >
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


                <div className="trace-content-middle">
                    {
                        this.state.policeTypes.length>0?(this.state.policeTypes.map((item,index)=>{
                            return(
                                <div className='trace-middle-item trace-item-one' key={index}>
                                    <div>
                                        <img src={Police} alt="pic"/>
                                    </div>
                                   
                                    <p>{item.policeTypeName?item.policeTypeName:''}（<span>{item.backedNum?item.backedNum:'0'}</span>/{item.sumNum?item.sumNum:''}）</p>
                                </div>
                            )
                        })
                        ): (<div className='trace-middle-item trace-item-one'>
                                <div>
                                    <img src={Police} alt="pic"/>
                                </div>
                            
                                <p>（<span>{'0'}</span>/{'0'}）</p>
                            </div>  )
                    }
                    <p className="clearBoth"></p>
                </div>

                <div className="trace-content-bottom">
                    <div className="trace-content-left" onClick={this.closePop.bind(this)}>
                        <div className="inner-title marBottom"> <img src={Fankui} alt="pic"/> <span>反馈信息</span></div>
                        {
                            this.state.hcZoneRecvList.length>0?(this.state.hcZoneRecvList.map((item,index)=>{
                                return(
                                    <div key={index} className="trace-news">
                                        <div className='trace-news-time'>{item.infoDate}</div>
                                        <div className="trace-news-desc">
                                            <img src={this.state.feedCircle} alt="pic"/>
                                            <div className="trace-news-show">
                                                <span>{item.policeTypeName} </span> <button onClick={this.readTask.bind(this)} data-pushid={item.pushId} data-policetypeid={item.policeTypeId} data-date={item.infoDate} className={this.state.isMaster==='1'||(item.pushId.indexOf('P:')<0 && item.policeTypeId === Cookies.get('policeTypeId'))?"":'readTaskHide'}>查看任务</button>
                                                <div className={this.state.readTaskShow ===  item.infoDate ?'trace-news-pop readTaskShow':'trace-news-pop readTaskHide'} onClick={this.stopPropagation.bind(this)}>
                                                <p>{this.state.checkTaskDeail.infoDate?this.state.checkTaskDeail.infoDate:''}</p>
                                                <p> {this.state.checkTaskDeail.taskDesc?this.state.checkTaskDeail.taskDesc:''}</p>
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
                                                                    <a href={elem.filePath} key={elem.fileName}><div className='files-item trace-file-margin'>
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
                                                            <a href={elem.filePath}  key={elem.fileName} target="_blank"><div className='files-item trace-file-margin'>
                                                                <img src={Image} alt="pic"/>
                                                                <p>{elem.fileName?elem.fileName.substr(0,6):''}</p>
                                                            </div></a>
                                                        )
                                                    }else  if(elem.fileType === 'doc' || elem.fileType === 'docx' ){
                                                        return(
                                                            <a href={elem.filePath} key={elem.fileName}><div className='files-item trace-file-margin'>
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
                    <div className="trace-content-right">
                       {/* <div className="talk-title">  <div className='newpro-title'><p> <i className='nd-title-img'><b></b></i> 讨论组</p></div></div>
                    */} 
                       <div className="inner-title traceSource-title">
                            <img src={Feed} alt="pic" style={{width:'1.5rem'}}/>
                            <span>讨论组</span>
                            {/*<button onClick={this.closeTalk.bind(this)} className='analysisSeat-talk-pickUp'><img src={PickUp} alt="pic"/></button>*/}
                        </div>
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
                            <textarea ref="taleContent" disabled='true' className="noTalk" cols="30" rows="10" onKeyDown={this.enterKey.bind(this)}></textarea>
                        </div>
                    </div>
                    <div className="clearBoth"></div>
                   
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
                          <Button key="down" onClick={this.createReport}>生成合成报告</Button>,
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

