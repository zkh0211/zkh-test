import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import Divider from 'antd/lib/divider';
import Cookies from 'js-cookie'
import { Select ,Pagination, Modal, Carousel } from 'antd';
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
    tongxingYujingDetail
} from 'actions/masterAction'
import DirectionBack from '../../../images/common/directionback2.png'
import YujingPic from '../../../images/common/yujing-low.png'
import YujingPicHigh from '../../../images/common/yujing-high.png'
import Times from '../../common/time'
import moment from 'moment';
import 'moment/locale/zh-cn';
import TongxingYujingDetail from './tongxingYujingDetail'

moment.locale('zh-cn');
const Option = Select.Option;


@connect(
    (state,props)=>({
        config: state.config,
        tabAppointedType:state.tabAppointedTypeResponse,
        hcCaseFromList:state.hcCaseFromListResponse
    })
)


export default class TongxingYujing extends Component{
    constructor(props){
        super(props);
        this.state={
            zoneId:Cookies.get('zoneId'),
            pageSize:7,
            currentPage : 1,
            isMaster:'1',
            tabAppointed:'',
            hcTaskList:[],
            caseList:{},
            caseType:[],
            taskType:'',
            personDetail:{},
            taskSubType:'',
            caseFromList:[],
            caseFrom:'',
            submited:'',
            shujuleixing:'',
            selectTypeOption:[],
            visible: false,
            types:[{name:'jack',value:'12'},{name:'jackw',value:'2'},{name:'jackww',value:'22'}],
            thead:['序号','预警车次','预警车厢','发车日期','发车时间','预警级别','预警人数','数据来源'],
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
            yujingMM: '05',
            yujingSS: '00',
            timer: null,
            modalmm: '20',
            modalss: '00',
            yujingDetail:[]
        }
    }
    componentWillMount(){
        if(Cookies.get('authCode').indexOf('hczhRole')!==-1){
            this.setState({
                isMaster:'1'
            })
        }else{
            this.setState({
                isMaster:'0'
            })
        }





    }

    componentDidMount(){
        // this.state.timer = setInterval(this.timeFn,1000)
    }

    componentWillUnmount(){
        // clearInterval(this.state.timer)
    }

    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.caseList!== this.props.caseList ){
            // let selectTypeOption = [];
            // nextProps.caseType.forEach((item,index)=>{
            //     if(item.typeId === nextProps.taskSubType){
            //         selectTypeOption = item.typeChildList
            //     }
            // })
            this.setState({
                currentPage:1,
                caseList:nextProps.caseList,
                // caseType:nextProps.caseType,
                taskType:nextProps.taskSubType,
                selectTypeOption:nextProps.caseType,
                tabAppointed:nextProps.tabAppointed,
                submited: nextProps.total
            },()=>{
                // console.log(this.state.caseList)
            })

        }
        return true
    }


    changeType=(value)=>{
        this.setState({
            taskSubType:value
        })

    }
    changeSource=(value)=>{
        this.setState({
            caseFrom:value
        })
    }
    onShowSizeChange(current,pageChange){
        this.setState({
            pageSize:pageChange
        },()=>{
            // const { willAppointedData , didAppointedData , willApproveData ,didApproveData, tabAppointedType } = this.props;
            // this.props.dispatch(getPendingList({caseFrom:"",taskType:"",isApprove:"",inMaster:"",page:1,size:7},(res)=>{  }));
            // this.search(this.state.currentCaseStatus,'2',this.state.currentProcessStatus,this.state.InputCaseId,this.state.SelectCaseType,this.state.currentPage,this.state.pageSize)
            // console.log(willAppointedData)
        })
    }

    search(){
        let source=1;
        this.state.taskType==='2'?source=2:this.state.taskType==='3'?source=1:this.state.taskType==='4'?source=3:''
        this.props.dispatch(tongxingYujing({source:source,page:this.state.currentPage,pageSize:this.state.pageSize},(res)=>{
            if(res.data){
                this.setState({
                    caseList:res.data,
                    // submited:res.data.total
                })
            }else{
                this.setState({
                    caseList:{},
                    // submited:'0'
                })
            }
        }));
    }

    goToWillAppointed(e){

        let caseId = e.currentTarget.getAttribute('data-caseid');
        if(this.state.taskType!=='1'){
            let source=1;
            this.state.taskType==='2'?source=2:this.state.taskType==='3'?source=1:this.state.taskType==='4'?source=3:'';
            hashHistory.push(`/newsAssign/${caseId}/${source}/${this.state.taskType}`);
        }else{
            this.setState({
                showSecondPage: 'true'
            })
        }
    }

    closeDirectionSecond = () => {
        this.setState({
            showSecondPage: 'false'
        })
    }
    showModal(e){
        let id = e.currentTarget.getAttribute('data-id');
        let type = e.currentTarget.getAttribute('data-type');
        this.setState({
            visible:true
        })
        this.props.dispatch(tongxingYujingDetail({"id":id,"type":type},(res)=>{
            this.setState({
                yujingDetail: res.data
            })
        }))
    }

    handleCancel = (e) => {
        this.setState({
          visible: false,
        });
      }

    handleOk = (e) => {
    this.setState({
        visible: false,
    });
    }

    timeFn = ()=>{
        if(this.state.yujingSS === '00'){
            let newmm = (parseInt(this.state.yujingMM) - 1).toString();
            if(this.state.yujingMM === '00'){

                this.setState({
                    yujingSS: '59',
                    yujingMM: '04'
                },()=>{
                     //五分钟时间到重新调用接口获取数据
                this.search();
                })
            }else{
                if(parseInt(newmm) > 9){
                    this.setState({
                        yujingMM : newmm,
                        yujingSS: '59',
                    })
                }else{
                    this.setState({
                        yujingMM : '0' + newmm,
                        yujingSS: '59',
                    })
                }
            }
        }else{
            let newss = (parseInt(this.state.yujingSS) - 1).toString();
            if(parseInt(newss) > 9){
                this.setState({
                    yujingSS : newss
                })
            }else{
                this.setState({
                    yujingSS : '0' + newss
                },()=>{


                })
            }
        }

    }




    render(){
        const {  tabAppointedType ,hcCaseFromList } = this.props;
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
                <div className={this.state.showSecondPage === 'false'&&this.state.taskType==='1'?'showTimeEnd':'display-none'}> <p> 距离下次刷新还有 <span> {this.state.yujingMM} : {this.state.yujingSS}</span></p></div>
                <div className="appoint-content-contain" style={{marginTop:'0'}}>
                        <div className="masTable-contain">
                            <div className="masTable-search">
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
                                <button className="button" onClick={this.search.bind(this)}>查询</button>
                            </div>
                            <div className="masTable-table">
                                <table className="yujing-table">
                                    <thead>
                                    <tr>
                                        {
                                            this.state.thead?(this.state.thead.map((item,index)=>{
                                                return  <th key={'data'+index}>{item}</th>
                                            })
                                        ):<th/>
                                        }
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.caseList&&this.state.caseList.list?(this.state.caseList.list.map((item,index)=>{
                                            return(
                                                <tr key={'caseId'+index} onClick={this.showModal.bind(this)} data-id={item.id} data-type={item.sjlx} >
                                                    <td>{index+1+(this.state.currentPage-1)*this.state.pageSize}</td>
                                                    <td title={item.yjcc}>{item.yjcc}</td>
                                                    <td title={item.caseTypeDesc}>{item.caseTypeDesc&&item.caseTypeDesc.substr(0,10)}</td>
                                                    <td>{ moment(item.fcrq).format('YYYY-MM-DD')}</td>
                                                    <td>{moment(item.fcsj).format('MM-DD')}</td>
                                                    <td>{item.yjjb.trim() === '2'?<img src={YujingPicHigh} alt="pic"/>:<img src={YujingPic} alt="pic"/>}</td>
                                                    <td>{item.yjrs}</td>
                                                    <td>{item.sjlx === '1'?"进站数据":(item.sjlx === '2'?'取票数据':'轨迹数据')}</td>
                                                </tr>
                                            )
                                        })):<tr/>
                                    }
                                    </tbody>
                                </table>
                                <div className="tab-Pagination">
                                    <Pagination total={this.state.submited?this.state.submited:0}  current={this.state.currentPage}
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


                <Modal
                title="进站人员基本信息"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                // okText="确认"
                // cancelText="取消"
                width= '40vw'
                footer={null} //去掉底部按钮'
                >

                <div className="jinZhanRenYuan">
                        <Carousel {...setting}>
                            {
                                this.state.yujingDetail&&this.state.yujingDetail.map((item,index)=>{
                                    return(
                                        <div key={index+'detail'}>
                                            <TongxingYujingDetail cancle={this.handleCancel} personInfo={item} />
                                        </div>
                                    )
                                })
                            }

                   </Carousel>

                </div>

            </Modal>
            </div>
        )
    }
}
