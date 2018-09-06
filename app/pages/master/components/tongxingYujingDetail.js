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
    changePoliceStation
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
export default class TongxingYujingDetail extends Component{
    constructor(props){
        super(props);
        this.changeCompanyFlag = false;
        this.changePoliceFlag = false;
        this.state={
            deptLevel:Cookies.get('deptLevel'),
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


    cancel =()=>{
        this.props.cancle()
    }


    render(){
        return(
            <div className="peopleBasicInfo">
                <div className="peopleInfo-first">
                    <div> <p>照片</p>  <img src={PeopleIcon} alt="pic"/></div>
                    <div>
                        <p> <span>姓名</span> {this.props.personInfo.xm}</p>
                        <p> <span>证件号码</span>{this.props.personInfo.sfzh} </p>
                    </div>

                </div>
                <table className="peopleInfo-second">
                    <tbody>
                        <tr> <td>验票发送时间</td> <td>{this.props.personInfo.ypfssj&&moment(this.state.personInfo.ypfssj).format("YYYY-MM-DD HH:MM:SS")}</td> <td>验票站点</td> <td> {this.props.personInfo.ypzd&&this.props.personInfo.ypzd}</td></tr>
                        <tr> <td>票号</td> <td> {this.props.personInfo.ph&&this.props.personInfo.ph}</td> <td>车次</td> <td>{this.props.personInfo.cc}</td> </tr>
                        <tr> <td>发站</td> <td>{this.props.personInfo.fz&&this.props.personInfo.fz} </td> <td>到站</td> <td>{this.props.personInfo.dz}</td> </tr>
                        <tr> <td>发车日期</td> <td> </td> <td>发车时间</td> <td> {this.props.personInfo.fcsj&&this.props.personInfo.fcsj}</td> </tr>
                        <tr> <td>车厢号</td> <td> {this.props.personInfo.cxh&&this.props.personInfo.cxh}</td> <td>座位号</td> <td>{this.props.personInfo.zwh&&this.props.personInfo.zwh} </td> </tr>
                        <tr> <td>人员类别</td> <td>{this.props.personInfo.rylb}</td> <td>人员标签</td> <td>{this.props.personInfo.rybq}</td> </tr>
                        <tr> <td>人员级别</td> <td colSpan={3}>{this.props.personInfo.ryjb&&this.props.personInfo.ryjb} </td> </tr>
                    </tbody>
                </table>

              {/*  <table className="peopleInfo-third">
                    <tbody>
                        <tr> <td>管辖单位</td> <td title={this.props.gxdw}>{this.props.gxdw}</td>

                         <td>管辖民警</td> <td>{this.props.gxmj}</td>
                        </tr>
                        <tr> <td>签收状态</td> <td>{this.props.personInfo.sfqs === '1'?"未签收":"已签收"} </td> <td>签收时间</td> <td>{this.props.personInfo.qssj&&this.props.personInfo.qssj} </td> </tr>
                        <tr> <td>反馈状态</td> <td>{this.props.personInfo.sfqs === '3'?"已反馈":"未反馈"} </td> <td>反馈时间</td> <td>{this.props.personInfo.fksj&&this.props.personInfo.fksj} </td> </tr>
                    </tbody>
        </table>*/}




            <div className="renyuanButton">
                <button className="button" onClick={this.cancel} style={{margin:'0'}}>取消</button>
            </div>


            </div>
        )
    }
}

