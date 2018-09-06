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
export default class TaizhangDetail extends Component{
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
    componentDidMount(){
        // let date = new Date();
      

    }

  
    shouldComponentUpdate(nextProps,nextState){
       
        if(nextProps.feedNews !== this.props.feedNews){
            this.setState({
                feedNews: nextProps.feedNews
            })
        }
        return true
      
    }
   

  

   

   

   
    
    cancel =()=>{
        this.props.cancle()
    }
    

  

    render(){
        return(
            <div className="peopleBasicInfo" style={{'width':'100%'}}>
                <table className="peopleInfo-fourth">
                    <tbody>
                        <tr style={{height: '2rem'}}> <td colSpan={4}>反馈内容</td> </tr>
                        <tr> <td colSpan={4}>
                                <div style={{marginTop: '1rem'}}>
                                    <p>{this.state.feedNews.length>0&&this.props.feedNews[0].backDesc&&this.props.feedNews[0].backDesc}</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            <div className={'feedback-files'}>
                <p className="feedback-p">反馈文件</p>
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
            </div>
           

            </div>
        )
    }
}

