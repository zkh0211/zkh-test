
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, hashHistory, Route, Router} from 'react-router'
import Divider from 'antd/lib/divider';
import '../syntheticInfo/syntheticInfo.less'
import titleIcon from '../../images/info/syntheticIcon.png'
import appointIcon from '../../images/info/appoint.png'
import flowDone from '../../images/info/flowDone.png'
import Image from '../../images/source/image.svg'
import Word from '../../images/source/word.svg'
import Excle from '../../images/source/excel.svg'
import File from '../../images/source/file-1.png'
import Sign from '../../images/info/sign.png'
import Direction from '../../images/info/direction.png'
import Computer from '../../images/info/computer.png'
import ComputerWhite from '../../images/info/computer-white.png'
import EditIcon from '../../images/info/edit.png'
import EditDoneIcon from '../../images/info/edit-done.png'
import {Button, Carousel, Checkbox, Modal, message, Table, Radio,  Input} from "antd";
import moment from 'moment';
import 'moment/locale/zh-cn';
import {
    getApprove, getCommentInfo, getFileList, getHcDetail, getHcZoneAgent, postAppointDone,
    postApproveDone,
    getHcResult
} from "actions/syntheticInfo";
import {
    getWordReport
}from 'actions/reportWord'
import Report2Word from "../reportWord/component/Report2Word";
moment.locale('zh-cn');
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
@connect(
    (state, props) => ({config: state.config})
)

export default class Assigned extends Component {
    constructor(props) {
        super(props);
        this.state = {
            duringTime:'',
            secretLevel:1,
            files: [
                {fileName: '某图片', fileType: 'image'},
                {fileName: '某图片', fileType: 'image'},
                {fileName: '某图片', fileType: 'image'},
                {fileName: '某图片', fileType: 'image'},
                {fileName: '某图片', fileType: 'image'},
                {fileName: '某图片', fileType: 'image'},
                {fileName: '某图片', fileType: 'image'},
                {fileName: '某图片', fileType: 'image'},
                {fileName: '某图片', fileType: 'image'},
                {fileName: '某文件', fileType: 'word'},
                {fileName: '某文件', fileType: 'word'},
                {fileName: '某文件', fileType: 'word'},
                {fileName: '某文件', fileType: 'word'},
                {fileName: '某文件', fileType: 'word'},
                {fileName: '某文件', fileType: 'word'},
                {fileName: '某文件', fileType: 'word'},
                {fileName: '某文件', fileType: 'word'},
                {fileName: '某文件', fileType: 'word'},
                {fileName: '某文件', fileType: 'word'},
                {fileName: '某文件', fileType: 'word'},
                {fileName: '某文件', fileType: 'word'},
                {fileName: '某材料', fileType: 'excle'},
                {fileName: '某材料', fileType: 'excle'},
                {fileName: '某材料', fileType: 'excle'},
                {fileName: '某材料', fileType: 'excle'},
                {fileName: '某材料', fileType: 'excle'},
                {fileName: '某材料', fileType: 'excle'},
                {fileName: '某材料', fileType: 'excle'},
                {fileName: '某材料', fileType: 'excle'},
                {fileName: '某材料', fileType: 'excle'},
            ],
            tab: '',
            id:this.props.params.id,
            caseInfo: {},
            getWordReport:'',
            reportInfo:{},
            hcResult:{},
            ifCreateReport:false,
            caseFileList: [],
            flyInOutFlag: false,
            zoneAgentUser: [],
            rightSide: false,
            modalVisible: false,
            wordModalVisible: false,
            radioCheckedValue: '',
            approveState: 1,
            approveText:'',
            state:'',
            approveColumn: [{
                title: '',
                key: 'index',
                // width: '5%',
                render: (text, recordId, index) => <span>{index + 1}</span>,
            }, {
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
            }, {
                title: '操作',
                dataIndex: 'control',
                key: 'control',
            }, {
                title: '审批意见',
                dataIndex: 'suggestion',
                key: 'suggestion',
            },],
            approveData: [{
                key: '1',
                name: '填写表单',
                sign: '周警官',
                date: '2017-11-08 16:32:23',
                control: '提交',
                suggestion: '审批意见审批意见审批意见审批意见审批意见审批意见',
            }, {
                key: '2',
                name: '审批',
                sign: '李主任',
                date: '2017-11-08 16:32:23',
                control: '不同意',
                suggestion: '审批意见审批意见审批意见审批意见审批意见审批意见',
            },],
        }
    }

    componentWillMount() {
        let values = this.props.params
        let {id, state} = values
        this.setState({
            pageState:values['isApprove']
        })

        this.props.dispatch(getHcDetail({id:id,state:state}, (res) => {
            if (res.status === 200 && res['data']) {
                this.setState({
                    caseInfo: res.data,
                },()=>{
                    let getCommentValues = {
                        urlParam: this.state.caseInfo['caseId'],
                    }
                    //审批历史列表
                    // this.props.dispatch(getCommentInfo(getCommentValues, (res) => {
                    //     if (res.status === 200 && res['data']) {
                    //         console.log('getCommentInfo',res)
                    //        /* this.setState({
                    //             zoneAgentUser: res.data
                    //         })*/
                    //     }
                    // }))

                    //获取合成结果列表
                    // this.props.dispatch(getHcResult({id:id,taskTime:this.state.caseInfo.taskTime}, (res) => {
                    //     if (res.status === 200 && res['data']) {
                    //         this.setState({
                    //             hcResult: res.data
                    //         },()=>{
                    //             // let date2 = this.state.hcResult.updateTime;
                    //             // date2 = date2.substring(0,18);
                    //             // date2 = date2.replace(/-/g,'/');
                    //             // let timestamp2 = new Date(date).getTime();
                    //             // let date1 = this.state.caseInfo.taskTime;
                    //             // date1 = date1.substring(0,18);
                    //             // date1 = date1.replace(/-/g,'/');
                    //             // let timestamp1 = new Date(date).getTime();
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

        //获取附件列表
        this.props.dispatch(getFileList({id:id,status:"1"}, (res) => {
            if (res.status === 200 && res['data']) {
                this.setState({
                    caseFileList: res.data
                })
            }
        }))

        // state 状态值，待指派为1，已指派待审批为2，已审批为3
        if(values['state'] === '1'){
            this.props.dispatch(getHcZoneAgent({}, (res) => {
                if (res.status === 200 && res['data']) {
                    this.setState({
                        zoneAgentUser: res.data
                    })
                }
            }))
        }else {

        }

        // ,()=>{
        //     let endTime = this.state.hcResult.updateTime;
        //     let beginTime = this.state.caseInfo.taskTime?this.state.caseInfo.taskTime:'0';
        //     // let endTime =new Date.parse(new Date(endTime));
        //     // let beginTime =new Date.parse(new Date(beginTime));
        //     endTime = new Date(Date.parse(endTime.replace(/-/g, "/")));
        //     endTime = endTime.getTime();
        //     beginTime = new Date(Date.parse(beginTime.replace(/-/g, "/")));
        //     beginTime = beginTime.getTime();
        //     console.log(beginTime)
        //     console.log(endTime)
        //     let during = (endTime-beginTime)/1000/60/60
        //     console.log(during)
        //     this.setState({
        //         duringTime:during+'小时'
        //     })
        // }





    }

    changeTab(e) {
        let num = e.currentTarget.getAttribute('data-tab');
        this.setState({
            tab: num,
        });


    }

    showHistory() {
        // this.props.dispatch(getApprove({urlParam: this.state.caseInfo.id}, (res) => {
        //     if (res.status === 200 && res['data']) {
        //         /*this.setState({
        //          caseInfo:res.data
        //          })*/
        //          this.setState({
        //             approveData:res.data
        //          })
        //     }
        // }))
        this.setState({
            rightSide: true,
        })
    }

    cancelRightSide() {
        this.setState({rightSide: false})
    }


    showModal = () => {
        this.setState({
            modalVisible: true,
        });

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
    handleOk = (e) => {
        this.setState({
            modalVisible: false,
        });
    }
    handleCancel = (e) => {
        this.setState({
            modalVisible: false,
            wordModalVisible: false,
        });
    }
    createReport=()=>{
        this.setState({
            ifCreateReport:true
        })

    }

    radioOnChange = (e) => {
        this.setState({
            radioCheckedValue: e.target.value
        })
    }



    checkboxOnChange(checkedValues) {
        // console.log('checked = ', checkedValues);
    }

    flyIn() {
        this.setState({
            flyInOutFlag: !this.state.flyInOutFlag
        })
    }

    // 指派合成席--确认按钮
    appointDone() {
        let values = {
            "approve": 1,
            "caseId": this.state.caseInfo['caseId'],
            "id": this.state.caseInfo['id'],
            "taskMaster": this.state.radioCheckedValue,
        }
        this.props.dispatch(postAppointDone(values, (res) => {
            if (res.status === 200) {
                // console.log(res)
                message.success('指派成功,三秒后跳到首页', 3);
                setTimeout(()=>{
                    hashHistory.push('/master/3/1/1')
                },3000)

            }

        }))
    }
    //已指派页面返回按钮
    goBack(){
        hashHistory.push('/master/2/1/1')
    }
    //待审批页
    agreeOrNoOnchange=(e)=> {
        this.setState({
            approveState: e.target.value
        })

    }
    textAreaOnChange(e){
        this.setState({
            approveText: e.target.value
        })
    }
    approveDone(){
        let values = {
            "result": this.state.approveState,
            "urlParam": this.state.caseInfo['id'],
            "advice": this.state.approveText,
        }
        this.props.dispatch(postApproveDone(values, (res) => {
            if (res.status === 200) {
                message.info(res['msg']);
                hashHistory.push('/')
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

    secretLevelChange=(e)=>{
        this.setState({
            secretLevel:e.target.value
        })
    }

    render() {
        var settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 6,
            arrows: true,
            variableWidth: true
        };

        return (

            <div className="info-content">
                <div className='inner'>
                    <div className="inner-title">
                        <img src={titleIcon} alt="pic"/>
                        <span>合成信息</span>
                        <button className="button display-none right" onClick={this.showHistory.bind(this)}>审批历史</button>
                    </div>
                    <div className="inner-table">
                        <table border="1">
                            <tbody>
                            <tr >
                                <td>合成名称</td>
                                <td >{this.state.caseInfo['caseName']}</td>
                                <td >密级</td>
                                <td>{this.state.caseInfo.levelName}</td>
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
                                <td colSpan="5">
                                    {this.state.caseInfo['caseDesc']}
                                </td>
                            </tr>
                            <tr >
                                <td>附件</td>
                                <td colSpan="5" >
                                    <div className="trace-files">
                                        <Carousel {...settings}>
                                        {
                                            this.state.caseFileList.map((item, index) => {
                                                if (item.fileType === 'png' || item.fileType === 'jpg' ||item.fileType === 'jpeg'   ) {
                                                    return (
                                                        <a href={item.filePath} target='_blank'  key={item.fileName+index}><div className='trace-files-item' >
                                                            <img src={Image} alt="pic"/>
                                                            <p>{item.fileName?item.fileName.substr(0,6):''}</p>
                                                        </div></a>
                                                    )
                                                } else if (item.fileType === 'doc' || item.fileType === 'docx') {
                                                    return (
                                                        <a href={item.filePath}  target="_blank"  key={item.fileName+index}><div className='trace-files-item'>
                                                            <img src={Word} alt="pic"/>
                                                            <p>{item.fileName?item.fileName.substr(0,6):''}</p>
                                                        </div></a>
                                                    )
                                                } else if (item.fileType === 'xlsx' || item.fileType === 'xls') {
                                                    return (
                                                        <a href={item.filePath}  target="_blank"  key={item.fileName+index}><div className='trace-files-item'>
                                                            <img src={Excle} alt="pic"/>
                                                            <p>{item.fileName?item.fileName.substr(0,6):''}</p>
                                                        </div></a>
                                                    )
                                                } else{
                                                    return (
                                                        <a href={item.filePath}  target="_blank"  key={item.fileName+index}><div className='trace-files-item' >
                                                            <img src={File} alt="pic"/>
                                                            <p>{item.fileName?item.fileName.substr(0,6):''}</p>
                                                        </div></a>
                                                    )
                                                }

                                            })
                                        }
                                        </Carousel>
                                    </div>
                                </td>
                            </tr>

                            </tbody>
                        </table>

                    </div>
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
                                                                <tr key={"yijian"+index}>
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
                                                                <tr key={'yijian2'+p}>
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



                    {/*已指派页面需要
                    <div className={this.state.pageState == 3? 'appoint-box inner-title' : 'display-none'}>
                        <img src={appointIcon} alt="pic"/>
                        <span>指派信息</span>
                        <span className="appoint-area">{this.state.caseInfo['zoneName']}</span>
                        <span className="appoint-user">
                            <img src={ComputerWhite}/>
                            <span>{this.state.caseInfo['compseAgent']}</span>
                        </span>

                        <button className="button right" onClick={this.goBack.bind(this)}>返回</button>
                    </div>
                    已指派页面需要*/}


                    <button className="button right" onClick={this.goBack.bind(this)}>返回</button>
             <div className="clearBoth"></div>
                </div>


                <div className="clearBoth"> </div>
                <div className={this.state.rightSide ? 'right-side slow-show' : 'right-side slow-hidden'}>
                    <div className="inner-title">
                        <img src={flowDone} alt="pic"/>
                        <span>审批情况跟踪</span>
                        <button className="button right" style={{marginLeft: '1rem'}}
                                onClick={this.showModal}>签呈
                        </button>
                        <button className="button-white right" onClick={this.cancelRightSide.bind(this)}>取消</button>

                    </div>
                    <div>
                        <Table className="approveTable" pagination={false} dataSource={this.state.approveData}
                            columns={this.state.approveColumn}/>
                    </div>
                </div>


                {/*签呈按钮弹出的模态框*/}
                <Modal
                    title={<span style={{color: '#2C567F', fontSize: '1.25rem'}}>{this.state.caseInfo.caseName?this.state.caseInfo.caseName:''}</span>}
                    visible={this.state.modalVisible}
                    // onOk={this.handleOk}
                    // onCancel={this.handleCancel}
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
                            <div className="modalImg"><img src={Sign}/></div>
                            <div className="modalTime"><span>2017年12月8日</span></div>
                        </li>
                        <li>
                            <div className="modalTitle">市领导审批</div>
                            <div className="modalImg"><img src={Sign}/></div>
                            <div className="modalTime"><span>2017年12月8日</span></div>
                        </li>
                        <li>
                            <div className="modalTitle">市领导审批</div>
                            <div className="modalImg"><img src={Sign}/></div>
                            <div className="modalTime"><span>2017年12月8日</span></div>
                        </li>
                    </ul>
                    <div className="modalLast">
                        <div className="lastItem"><span>交办单位：</span>某某某</div>
                        <div className="lastItem"><span>经办人：</span>张三</div>
                        <div className="lastItem"><span>交办时间：</span>2017年12月31日</div>

                    </div>
                </Modal>
                {/*签呈按钮弹出的模态框*/}
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
