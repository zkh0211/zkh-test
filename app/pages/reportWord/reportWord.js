import React, {Component} from 'react'
import {connect} from 'react-redux'
import { hashHistory } from 'react-router'
import './reportWord.less'
import Cookies from 'js-cookie'
import Report2Word from "./component/Report2Word";
import {Checkbox , message, Radio, Rate } from "antd";
import {getWordReport} from "../../actions/reportWord";

import EditIcon from '../../images/info/edit.png'
import {
    getHcDetail,
    postApproveDone,
}from 'actions/syntheticInfo'
import {
    sendSubmitReport
}from 'actions/reportWord'


const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@connect(
    (state, props) => ({
        config: state.config,
        mijiList:state.mijiResponse
    })
)


export  default class reportWord extends  Component {

    constructor(props){
        super(props)
        this.state={
            id:this.props.params.id,
            state:this.props.params.state,
            reportInfo:{},
            ifCreateReport:false,
            xiafaAudio:false,
            forCommander:'1',
            caseInfo:{},
            secretLevel:'1',
            tijiaoZhizhang:'',
            disabled:false,
            xiafa:'1',
            textInEditor:''//当前富文本内的内容

        }
    }
    componentWillMount() {
        let values = this.props.params
        let {id} = values


        this.props.dispatch(getHcDetail({id:this.state.id,state:this.state.state},(res)=>{
            if(res.data){
                this.setState({
                    caseInfo:res.data
                },()=>{
                  if(this.state.caseInfo.taskType === '1' || this.state.caseInfo.taskType === '2' || this.state.caseInfo.taskType === '4' ||this.state.caseInfo.taskType === '7'){
                      if(this.state.caseInfo.acceptDeptNo === Cookies.get('gxjgdm')){

                            this.setState({
                                fankuiAudio: true,
                                disabled: true,
                                xiafaAudio:false
                            })

                      }else{

                        this.setState({
                            fankuiAudio: false,
                            disabled: true,
                            xiafaAudio:true
                        })
                      }
                  }else{
                    if(Cookies.get('deptLevel')==='2'){
                        this.setState({
                            fankuiAudio: true,
                            disabled: true,
                            xiafaAudio:false
                        })
                    }else{
                        this.setState({
                            fankuiAudio: true,
                            disabled: false,
                            xiafaAudio: false
                        })
                    }
                  }
                })
            }else{

                this.setState({
                    caseInfo:{}
                })
            }
        }))
        this.props.dispatch(getWordReport({reportId:'',id:this.state.id}, (res) => {
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
    //接收暂存的内容
    dataCallback(newData){
        // console.log(newData)
        this.setState({
            textInEditor:newData.wordContent
        })

    }

    secretLevelChange=(e)=>{
        this.setState({
            secretLevel:e.target.value
        })
    }
    tijiaoChange=(e)=>{
        this.setState({
            xiafa:e.target.value
        })
    }


    checkBoxonChange = (e)=>{
        if(e.target.checked){
            this.setState({
                forCommander:'1'
            })
        }else{
            this.setState({
                forCommander:'0'
            })
        }


    }

    //创建报告
    creatReport(){
        this.setState({
            ifCreateReport:true
        })
        setTimeout(()=>{
            this.setState({
                ifCreateReport:false
            })
        },2000)
        if(this.state.reportInfo.reportStatus !== '2' || this.state.reportInfo.reportStatus !== '3'|| this.state.reportInfo.reportStatus !== '5' ){
            this.saveFornow()
        }

    }
    //暂存内容
    saveFornow(){
        let data =  {
            "hcId":this.state.id,
            "reportStatus":"1",
            "reportContent":this.state.textInEditor,
            "isApprove":this.state.forCommander
        }

        // {"hcId":"合成主键","reportStatus":"报告状态 1：暂存,2.上报",
        // "reportContent":"报告内容","isApprove":"是否提交指挥长审批 1:是，0：否"}
        if(this.state.reportInfo.reportStatus === '2' || this.state.reportInfo.reportStatus === '3'|| this.state.reportInfo.reportStatus === '5' ){
            message.error('该合成报告已经提交到指挥长审批,无法暂存!',3);
        }else{
            this.props.dispatch(sendSubmitReport(data,(res)=>{
                if(res.status === 200){
                    message.success('暂存报告成功',3)
                }
            }))
        }

    }
    // 提交内容
    submit(){

        let values = {
            "result": this.state.xiafa,
            "urlParam": this.state.caseInfo['id'],
            "advice": '',
            "secretLevel":this.state.secretLevel,
            "reportContent":this.state.textInEditor
        }
        this.props.dispatch(postApproveDone(values, (res) => {
            if (res.status === 200) {
                message.info(res['msg']);
                hashHistory.push('/master/3/1/1')
            }
        }))

    }

    changeRate =(value) =>{
        this.setState({
            secretLevel: value
        })
    }

    render(){
        let {  mijiList } = this.props;
        return (

        <div className="report-content">
            <div >
                <span>{this.state.caseInfo.caseName?this.state.caseInfo.caseName:''}</span>
            </div>
            <div className="word-box">
                <Report2Word reportData={this.state.reportInfo} callbackData={this.dataCallback.bind(this)} ifCreateReport = {this.state.ifCreateReport}/>
                {/*<Report2Word reportData={this.state.reportInfo} callbackData={this.dataCallback.bind(this)}/>*/}
            </div>
            <div className={(this.state.reportInfo.reportStatus === '2' || this.state.reportInfo.reportStatus === '3' || this.state.reportInfo.reportStatus === '5') ?"display-none":"bottom-box"}>

                {/*设置密级*/}
                <div className="reportMiji">
                    <div className="appoint-box inner-title" style={{margin:'0'}}>
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
                    </RadioGroup>     */}
                    </div>
                </div>

                <RadioGroup onChange={this.tijiaoChange} defaultValue={this.state.xiafa} >
                    <Radio value="3"  disabled={this.state.disabled}>提交给上级指挥长</Radio>
                    <Radio value="1" disabled={this.state.xiafaAudio}>下发给相关单位</Radio>
                    <Radio value="4" disabled={this.state.fankuiAudio}>反馈</Radio>
                </RadioGroup>

                <button className="button-white" onClick={this.saveFornow.bind(this)}>暂存</button>
                <button className="button" style={{marginLeft: '1rem'}}
                        onClick={this.submit.bind(this)}>提交
                </button>
                <button className="button" onClick={this.creatReport.bind(this)} >下载报告</button>
            </div>

        </div>

        )
    }
}
