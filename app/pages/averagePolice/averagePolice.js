import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, hashHistory , Route , Router } from 'react-router'
import Divider from 'antd/lib/divider';
import '../master/master.less'
import './averagePoliceCss.less'
import Cookies from 'js-cookie'
import Img1 from '../../images/common/u2012.png'
import Img1Hover from '../../images/common/u2011.png'
import Img2 from '../../images/common/u2014.png'
import Img2Hover from '../../images/common/u2015.png'
import Img3 from '../../images/common/u2017.png'
import Img3Hover from '../../images/common/u2018.png'
import Img4 from '../../images/common/u2020.png'
import Img4Hover from '../../images/common/u2021.png'
import Img5 from '../../images/common/u2023.png'
import Img5Hover from '../../images/common/u2024.png'
import DataOverview from './components/dataOverview'
import ZxDataOverview from './components/zxDataOverView'
import WillAppointed from './components/willAppointed'
import { 
    getOrderSumByYear ,
    getOrderSumByMonth ,
    getOrderSumByWeek ,
    getOrderCompletion,
    getOrderByType ,
    willAppointed,
    didAppointed,
    willApprove,
    didApprove,
    tabAppointed,
    getHcTaskTypeList,
    changeCurrentPage,
    getHcCaseFromList,
    getSelectCountByStatus,
    getSubmitList,
    getCaseType,
    changeCaseTypeTab


} from 'actions/masterAction'

@connect(
    (state, props) => ({ 
        config: state.config,
        submitList: state.submitListResponse,
        changeCaseTypeTab: state.changeCaseTypeTabResponse,
        caseCount: state.selectCountByStatusResponse
     })
  )

export default class AveragePolice extends Component{
    constructor(props){
        super(props);
        this.state={
            tab:this.props.params.tab,
            ifSeat:false,
            caseList:[],
            caseData:{},
            isMaster:'',
            submited:'0',
            caseType:[],
            caseCount:{},
            Role:Cookies.get('policeTypeName'),
            deptLevel:Cookies.get('deptLevel')
        }
    }
    componentWillMount(){
        
        this.setState({
            isMaster:'0',
            Role:Cookies.get('policeTypeName')
        },()=>{
            this.props.dispatch(getSelectCountByStatus({isMaster:this.state.isMaster},(res)=>{
                // if(res.data){
                //     this.setState({
                //         caseCount:res.data
                //     })
                // }else{
                //     this.setState({
                //         caseCount:{}
                //     })
                // }
            }))
            
        })
        
        
        this.props.dispatch(getOrderSumByYear({},(res)=>{  }));
        this.props.dispatch(getOrderSumByMonth({},(res)=>{  }));
        this.props.dispatch(getOrderSumByWeek({},(res)=>{  }));
        this.props.dispatch(getOrderCompletion({},(res)=>{  }));
        this.props.dispatch(getOrderByType({},(res)=>{  }));
        this.props.dispatch(getHcTaskTypeList({},(res)=>{ 
            if(res.data){
                this.setState({
                    caseType:res.data
                })
            }else{
                this.setState({
                    caseType:[]
                })
            }
        }));
        this.props.dispatch(getHcCaseFromList({},(res)=>{ }));
        // this.props.dispatch(getSubmitList({page:1,size:7},(res)=>{ 
           
        //  }));
         this.changeTypeData();
         this.props.dispatch(tabAppointed({tab:this.state.tab}));
         
        //  this.props.dispatch(changeCaseTypeTab({caseTypeId:'1'}));

    }

  
    changeTypeData(){
        let isApprove = 0;
        let status = 1;
        let taskStatus = '0';//非指挥长查询案件数量时使用  待处理传0   已处理传1
        if(this.state.tab === '2'){
            // this.props.dispatch(tabAppointed(type));
            status = 2;
            taskStatus = '0';
            isApprove = '1';
                // this.props.dispatch(didAppointed({caseFrom:"",taskType:"1",taskSubType:'',isApprove:"1",isMaster:this.state.isMaster, taskStatus:'0',page:1,size:7},(res)=>{
                //     if(res.data){
                //         this.setState({
                //             caseData:res.data
                //         })
                //     }else{
                //         this.setState({
                //             caseData:{}
                //         })
                //     }
                //   }));
            
        }else if(this.state.tab === '3'){
            // this.props.dispatch(tabAppointed(type));
            taskStatus = '1';
            isApprove = '1';
            status = 2;
                // this.props.dispatch(didAppointed({caseFrom:"",taskType:"1",taskSubType:'',isApprove:"1",isMaster:this.state.isMaster, taskStatus:'1',page:1,size:7},(res)=>{
                //     if(res.data){
                //         this.setState({
                //             caseData:res.data
                //         })
                //     }else{
                //         this.setState({
                //             caseData:{}
                //         })
                //     }
                //   }));
            
          
        }else if(this.state.tab === '4'){
            // this.props.dispatch(tabAppointed(type));
            taskStatus = '1';
            isApprove = '';
            status = 3;
            // this.props.dispatch(willApprove({caseFrom:"",taskType:"1",taskSubType:'',isApprove:"",isMaster:this.state.isMaster,page:1,size:7},(res)=>{ 
            //     if(res.data){
            //         this.setState({
            //             caseData:res.data
            //         })
            //     }else{
            //         this.setState({
            //             caseData:{}
            //         })
            //     }
            //  }));
        }else if(this.state.tab === '5'){
            // this.props.dispatch(tabAppointed(type));
            taskStatus = '1';
            isApprove = '';
            status = 3;
            // this.props.dispatch(getSubmitList({page:1,size:7},(res)=>{ 
               
            //  }));
        }

        this.props.dispatch(getCaseType({status:status,taskStatus:taskStatus,isMaster:'0',isApprove:isApprove},(res)=>{

        }))
    }

    changeTab(e){
        let num = e.currentTarget.getAttribute('data-tab');
        this.props.dispatch(changeCaseTypeTab({caseTypeId:'1'}));
        this.setState({
            tab:num,
        },()=>{
            this.props.dispatch(tabAppointed({tab:this.state.tab}));
            // let type = this.state.tab;
            this.changeTypeData()
        });
     
    }


    render(){
        let { submitList, changeCaseTypeTab, caseCount } = this.props;
        return(
            <div className="master-contain">
                <div  className='master-left'>
                    <div className="master-title"><span>{this.state.Role}首页</span></div>
                    <div className={this.state.tab !==''?(this.state.tab === '1'?'master-left-item master-item-active':'master-left-item'):'master-left-item master-item-active'} onClick={this.changeTab.bind(this)} data-tab='1' >
                        <img src={this.state.tab === '1'?Img1Hover:Img1} alt="pic"/>
                        <span>数据概览</span> 
                    </div>
                    <div className={this.state.tab === '2'?'master-left-item master-item-active':'master-left-item'} onClick={this.changeTab.bind(this)} data-tab='2' >
                        <img src={this.state.tab === '2'?Img2Hover:Img2} alt="pic"/>
                        <span>待处理</span><span className="master-left-will-color">({caseCount.res?(caseCount.res.data.todo>10000?parseInt(caseCount.res.data.todo/10000)+'万':caseCount.res.data.todo):0})</span>
                    </div>
                    <div className={this.state.deptLevel !== '4'?(this.state.tab === '3'?'master-left-item master-item-active':'master-left-item'):'display-none'} onClick={this.changeTab.bind(this)} data-tab='3' >
                        <img src={this.state.tab === '3'?Img3Hover:Img3} alt="pic"/>
                        <span>已处理</span><span className="master-left-did-color">({caseCount.res?(caseCount.res.data.doing>10000?parseInt(caseCount.res.data.doing/10000)+'万':caseCount.res.data.doing):0})</span>
                    </div>
                    {/*<div className={this.state.tab === '4'?'master-left-item master-item-active':'master-left-item'} onClick={this.changeTab.bind(this)} data-tab='4' >
                        <img src={this.state.tab === '4'?Img4Hover:Img4} alt="pic"/>
                        <span>已完成</span><span className="master-left-will-color">({this.state.caseCount.done?this.state.caseCount.done:0})</span>
                    </div>*/}
                    <div className={this.state.tab === '5'?'master-left-item master-item-active':'master-left-item'} onClick={this.changeTab.bind(this)} data-tab='5' >
                        <img src={this.state.tab === '5'?Img5Hover:Img5} alt="pic"/>
                        <span>已上报</span><span className="master-left-did-color">({caseCount.res?(caseCount.res.data.submit>10000?parseInt(caseCount.res.data.submit/10000)+'万':caseCount.res.data.submit):0})</span>
                    </div>
                    <div className="clearBoth"></div>
                </div>
                <div className="master-right">
                    <div className={this.state.tab!==''?(this.state.tab === '1'?'master-right-content bottomToTop':'master-right-content topToBottom'):'master-right-content'}>{this.state.tab === '1'?<DataOverview/>:''}</div>   
                    <div className={this.state.tab!==''?(this.state.tab === '2'?'master-right-content bottomToTop':'master-right-content topToBottom'):'master-right-content master-left-hide'}>{this.state.tab === '2'?<WillAppointed caseData={this.state.caseData} caseType={this.state.caseType} tabAppointed={this.state.tab} taskType={changeCaseTypeTab.data && changeCaseTypeTab.data.caseTypeId}/>:''}</div>     
                    <div className={this.state.tab!==''?(this.state.tab === '3'?'master-right-content bottomToTop':'master-right-content topToBottom'):'master-right-content master-left-hide'}>{this.state.tab === '3'?<WillAppointed caseData={this.state.caseData} caseType={this.state.caseType} tabAppointed={this.state.tab} taskType={changeCaseTypeTab.data && changeCaseTypeTab.data.caseTypeId}/>:''}</div>     
                    <div className={this.state.tab!==''?(this.state.tab === '4'?'master-right-content bottomToTop':'master-right-content topToBottom'):'master-right-content master-left-hide'}>{this.state.tab === '4'?<WillAppointed caseData={this.state.caseData} caseType={this.state.caseType} tabAppointed={this.state.tab} taskType={changeCaseTypeTab.data && changeCaseTypeTab.data.caseTypeId}/>:''}</div>     
                    <div className={this.state.tab!==''?(this.state.tab === '5'?'master-right-content bottomToTop':'master-right-content topToBottom'):'master-right-content master-left-hide'}>{this.state.tab === '5'?<WillAppointed caseData={this.state.caseData} caseType={this.state.caseType} tabAppointed={this.state.tab} taskType={changeCaseTypeTab.data && changeCaseTypeTab.data.caseTypeId}/>:''}</div>     
                </div>
                <div className="clearBoth"></div>
            </div>
        )
    }
}