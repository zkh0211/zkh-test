
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, hashHistory , Route , Router } from 'react-router'
import Divider from 'antd/lib/divider';
import './master.less'
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
import WillAppointed from './components/willAppointed'
import InformationOverview from './components/informationOverview'
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
    getSubmitListNotPolice,
    getCaseType,
    startCompose,
    queryAllCase,
    overviewCount,
    changeCaseTypeTab,
    getDirection,
    tongxingYujing,
    zonglanCount,
    willDoCount,
    doingCount,
    doneCount,
    tongxingCount,
    pcsWillDoCount,
    pcsDoingCount,
    policePeopleList,
    getDirectionSearch
} from 'actions/masterAction'


@connect(
    (state, props) => ({
        config: state.config,
        submitList: state.submitListResponse,
        caseTypes: state.getCaseTypeResponse,
        changeCaseTypeTab: state.changeCaseTypeTabResponse,
        caseCount: state.selectCountByStatusResponse,
        zonglanCount: state.zonglanCountResponse,
        willDoCount: state.willDoCountResponse,
        doingCount: state.doingCountResponse,
        doneCount: state.doneCountResponse,
        tongxingCount: state.tongxingCountResponse,
        pcsWillDoCount:state.pcsWillDoCountResponse ,
        pcsDoingCount: state.pcsDoingCountResponse
     })
  )

export default class Master extends Component{
    constructor(props){
        super(props);
        this.state={
            tab:this.props.params.tab,
            fromHomePage: this.props.params.fromHomePage,
            subType:this.props.params.subType,
            caseTotal:'0',
            caseList:[],
            caseData:{},
            isMaster:'1',
            caseType:[],
            totalCase:0,
            inforCount:0,
            Role:Cookies.get('policeTypeName'),
            deptLevel:Cookies.get('deptLevel'),
            deptName: Cookies.get('deptName'),
            ifChangeTab: 1

        }
    }
    
 
    componentWillMount(){
        this.props.dispatch(getSelectCountByStatus({isMaster:this.state.isMaster},(res)=>{}))

        this.props.dispatch(getOrderSumByYear({},(res)=>{  }));
        this.props.dispatch(getOrderSumByMonth({},(res)=>{  }));
        this.props.dispatch(getOrderSumByWeek({},(res)=>{  }));
        this.props.dispatch(getOrderCompletion({},(res)=>{  }));
        this.props.dispatch(getOrderByType({},(res)=>{  }));

        this.props.dispatch(getHcCaseFromList({},(res)=>{

        }))
        this.props.dispatch(getSubmitList({page:1,size:7},(res)=>{

        }));
        this.props.dispatch(overviewCount({},(res)=>{
            res.data.map((ele,index)=>{
                this.state.inforCount+=ele.count
            })
            this.setState({
              inforCount: this.state.inforCount
            })
        }))

        this.changeTypeData();
        this.props.dispatch(tabAppointed({tab:this.state.tab}));

        this.props.dispatch(getDirection({"status":'',"branch":this.state.deptLevel === '2'?"":this.state.deptName,"page":1,"pageSize":7},(res)=>{
            this.props.dispatch(zonglanCount({count: res.data.total}))
        }))
        this.props.dispatch(getDirection({"status":'1',"branch":this.state.deptLevel === '2'?"":this.state.deptName,"page":1,"pageSize":7},(res)=>{
            this.props.dispatch(willDoCount({count: res.data.total}))
        }))
        this.props.dispatch(getDirection({"status":'2',"branch":this.state.deptLevel === '2'?"":this.state.deptName,"page":1,"pageSize":7},(res)=>{
            this.props.dispatch(doingCount({count: res.data.total}))
        }))
        this.props.dispatch(getDirection({"status":'3',"branch":this.state.deptLevel === '2'?"":this.state.deptName,"page":1,"pageSize":7},(res)=>{
            this.props.dispatch(doneCount({count: res.data.total}))
        }))
        this.props.dispatch(tongxingYujing({page:1,pageSize:7},(res)=>{
            this.props.dispatch(tongxingCount({count: res.data.total}))
        }));
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
       

    }
   


 
    changeTypeData(){
        let isApprove = 0;
        let status = 1;
        if(this.state.tab === '2'){
            status = 1;
            isApprove = '1';
        }else if(this.state.tab === '3'){
            isApprove = '1';
            status = 2;
        }else if(this.state.tab === '4'){
            if(this.state.deptLevel === '4'){
                status = 1;
                isApprove = '1';
            }else{
                status = 2;
                isApprove = '2';
            }

        }else if(this.state.tab === '5'){
            isApprove = '3';
            status = 3;
        }
        else if(this.state.tab === '6'){
            isApprove = '';
            status = 4;
        }
        else if(this.state.tab === '0'){
        }
        this.props.dispatch(getCaseType({status:status,isMaster:this.state.isMaster,isApprove:isApprove},(res)=>{

        }))
    }
 
    changeTab(e){
        let { currentPage } = this.props;
        let num = e.currentTarget.getAttribute('data-tab');
        this.props.dispatch(changeCaseTypeTab({caseTypeId:'1'}));
        this.setState({
            tab:num,
            ifChangeTab: this.state.ifChangeTab++,
            subType: '1'
        },()=>{
            this.props.dispatch(tabAppointed({tab:this.state.tab}));
            this.changeTypeData();
        });
    }


    render(){
        let { caseTypes, changeCaseTypeTab,caseCount, zonglanCount, willDoCount, doingCount, doneCount, tongxingCount, pcsWillDoCount, pcsDoingCount } = this.props;

        return(
            <div className="master-contain">
                <div className={ this.state.isMaster === '1'?'master-left':'master-left-hide'}>
                    <div className="master-title"><span>{this.state.Role}首页</span></div>
                    <div className={this.state.tab !==''?(this.state.tab === '1'?'master-left-item master-item-active':'master-left-item'):'master-left-item master-item-active'} onClick={this.changeTab.bind(this)} data-tab='1' >
                        <img src={this.state.tab === '1'?Img1Hover:Img1} alt="pic"/>
                        <span>数据概览</span>
                    </div>
                    <div className={this.state.deptLevel === '2'?(this.state.tab === '0'?'master-left-item master-item-active':'master-left-item'):'display-none'} onClick={this.changeTab.bind(this)} data-tab='0' >
                        <img src={this.state.tab === '0'?Img2Hover:Img2} alt="pic"/>
                        <span>信息总览</span>
                        <span className="master-left-did-color">({(this.state.inforCount + parseInt(zonglanCount.zonglanCount&&parseInt(zonglanCount.zonglanCount.count)) + parseInt(tongxingCount.tongxingCount&&parseInt(tongxingCount.tongxingCount.count)))>10000?(parseInt((this.state.inforCount + parseInt(zonglanCount.zonglanCount&&parseInt(zonglanCount.zonglanCount.count)) + parseInt(tongxingCount.tongxingCount&&parseInt(tongxingCount.tongxingCount.count)))/10000)+"万"):(this.state.inforCount + parseInt(zonglanCount.zonglanCount&&parseInt(zonglanCount.zonglanCount.count)) + parseInt(tongxingCount.tongxingCount&&parseInt(tongxingCount.tongxingCount.count)))})</span>
                    </div>
                    <div className={this.state.tab === '2'?'master-left-item master-item-active':'master-left-item'} onClick={this.changeTab.bind(this)} data-tab='2' >
                        <img src={this.state.tab === '2'?Img2Hover:Img2} alt="pic"/>
                        <span>{this.state.deptLevel !== '4'?'待合成':'待处理'}</span>
                        {/*<span className="master-left-will-color">({caseCount.res?(caseCount.res.data.todo>10000?parseInt(caseCount.res.data.todo/10000)+'万':caseCount.res.data.todo):0})</span>
                        */}
                        {this.state.deptLevel === '4'?(
                            <span className="master-left-did-color">({caseCount.res?((caseCount.res.data.todo + parseInt(pcsWillDoCount.pcsWillDoCount&&parseInt(pcsWillDoCount.pcsWillDoCount.count)))>10000?parseInt((caseCount.res.data.todo + parseInt(pcsWillDoCount.pcsWillDoCount&&parseInt(pcsWillDoCount.pcsWillDoCount.count)))/10000)+"万":(caseCount.res.data.todo + parseInt(pcsWillDoCount.pcsWillDoCount&&parseInt(pcsWillDoCount.pcsWillDoCount.count)))):0})</span>

                        ):(
                            <span className="master-left-did-color">({caseCount.res?((caseCount.res.data.todo + parseInt(willDoCount.willDoCount&&parseInt(willDoCount.willDoCount.count)))>10000?parseInt((caseCount.res.data.todo + parseInt(willDoCount.willDoCount&&parseInt(willDoCount.willDoCount.count)))/10000)+"万":(caseCount.res.data.todo + parseInt(willDoCount.willDoCount&&parseInt(willDoCount.willDoCount.count)))):0})</span>

                        )
                    }

                    </div>
                    <div className={this.state.tab === '3'?'master-left-item master-item-active':'master-left-item'} onClick={this.changeTab.bind(this)} data-tab='3' >
                        <img src={this.state.tab === '3'?Img3Hover:Img3} alt="pic"/>
                        <span>{this.state.deptLevel !== '4'?'合成中':'已处理'}</span>
                       {/*} <span className="master-left-did-color">({caseCount.res?(caseCount.res.data.doing>10000?parseInt(caseCount.res.data.doing/10000)+'万':caseCount.res.data.doing):0})</span>
                    */}
                    {this.state.deptLevel === '4'?(
                       <span className="master-left-did-color">({caseCount.res?((caseCount.res.data.doing + parseInt(pcsDoingCount.pcsDoingCount&&parseInt(pcsDoingCount.pcsDoingCount.count)))>10000?parseInt((caseCount.res.data.doing + parseInt(pcsDoingCount.pcsDoingCount&&parseInt(pcsDoingCount.pcsDoingCount.count)))/10000)+"万":(caseCount.res.data.doing + parseInt(pcsDoingCount.pcsDoingCount&&parseInt(pcsDoingCount.pcsDoingCount.count)))):0})</span>
                    ):(
                        <span className="master-left-did-color">({caseCount.res?((caseCount.res.data.doing + parseInt(doingCount.doingCount&&parseInt(doingCount.doingCount.count)))>10000?parseInt((caseCount.res.data.doing + parseInt(doingCount.doingCount&&parseInt(doingCount.doingCount.count)))/10000)+"万":(caseCount.res.data.doing + parseInt(doingCount.doingCount&&parseInt(doingCount.doingCount.count)))):0})</span>

                    )}

                    </div>
                    {/*<div className={this.state.tab === '4'?'master-left-item master-item-active':'master-left-item'} onClick={this.changeTab.bind(this)} data-tab='4' >
                        <img src={this.state.tab === '4'?Img4Hover:Img4} alt="pic"/>
                        <span>已研判</span><span className="master-left-will-color">({this.state.deptLevel === '4'?(this.state.caseCount.todo?this.state.caseCount.todo:0):(this.state.caseCount.approve?this.state.caseCount.approve:0)})</span>
                    </div>*/}
                    <div className={this.state.deptLevel !== '4'?(this.state.tab === '5'?'master-left-item master-item-active':'master-left-item'):'display-none'} onClick={this.changeTab.bind(this)} data-tab='5' >
                        <img src={this.state.tab === '5'?Img5Hover:Img5} alt="pic"/>
                        <span>已研判</span>
                        {/*<span className="master-left-did-color">({caseCount.res?(caseCount.res.data.done>10000?parseInt(caseCount.res.data.done/10000)+'万':caseCount.res.data.done):0})</span>
                */}<span className="master-left-did-color">({caseCount.res?((caseCount.res.data.done + parseInt(doneCount.doneCount&&parseInt(doneCount.doneCount.count)))>10000?parseInt((caseCount.res.data.done + parseInt(doneCount.doneCount&&parseInt(doneCount.doneCount.count)))/10000)+"万":(caseCount.res.data.done + parseInt(doneCount.doneCount&&parseInt(doneCount.doneCount.count)))):0})</span>

                    </div>
                    <div className={this.state.deptLevel !== '2'?(this.state.tab === '6'?'master-left-item master-item-active':'master-left-item'):'display-none'} onClick={this.changeTab.bind(this)} data-tab='6' >
                        <img src={this.state.tab === '6'?Img5Hover:Img5} alt="pic"/>
                        <span>已上报</span><span className="master-left-did-color">({caseCount.res?(caseCount.res.data.submit>10000?parseInt(caseCount.res.data.submit/10000)+'万':caseCount.res.data.submit):0})</span>
                    </div>
                    <div className="clearBoth"></div>
                </div>

                <div className="master-right">
                    <div className={this.state.tab!==''?(this.state.tab === '1'?'master-right-content bottomToTop':'master-right-content topToBottom'):'master-right-content'}>{this.state.tab === '1'?<DataOverview/>:''}</div>
                    <div className={this.state.tab!==''?(this.state.tab === '2'?'master-right-content bottomToTop':'master-right-content topToBottom'):'master-right-content master-left-hide'}>{this.state.tab === '2'?(<WillAppointed ifChangeTab={this.state.ifChangeTab} tabAppointed={this.state.tab} taskType={changeCaseTypeTab.data && changeCaseTypeTab.data.caseTypeId} fromHomePage={this.state.fromHomePage} subType={this.state.subType}/>):''}</div>
                    <div className={this.state.tab!==''?(this.state.tab === '0'?'master-right-content bottomToTop':'master-right-content topToBottom'):'master-right-content master-left-hide'}><WillAppointed ifChangeTab={this.state.ifChangeTab} tabAppointed={this.state.tab} taskType={changeCaseTypeTab.data && changeCaseTypeTab.data.caseTypeId} fromHomePage={this.state.fromHomePage}  subType={this.state.subType}/></div>
                   {/* <div className={this.state.tab!==''?(this.state.tab === '0'?'master-right-content bottomToTop':'master-right-content topToBottom'):'master-right-content master-left-hide'}><InformationOverview  /></div>*/}

                    <div className={this.state.tab!==''?(this.state.tab === '3'?'master-right-content bottomToTop':'master-right-content topToBottom'):'master-right-content master-left-hide'}>{this.state.tab === '3'?(<WillAppointed  ifChangeTab={this.state.ifChangeTab} tabAppointed={this.state.tab} taskType={changeCaseTypeTab.data && changeCaseTypeTab.data.caseTypeId} fromHomePage={this.state.fromHomePage} subType={this.state.subType}/>):''}</div>
                    <div className={this.state.tab!==''?(this.state.tab === '4'?'master-right-content bottomToTop':'master-right-content topToBottom'):'master-right-content master-left-hide'}>{this.state.tab === '4'?(<WillAppointed  ifChangeTab={this.state.ifChangeTab} tabAppointed={this.state.tab} taskType={changeCaseTypeTab.data && changeCaseTypeTab.data.caseTypeId} fromHomePage={this.state.fromHomePage} subType={this.state.subType}/>):''}</div>
                    <div className={this.state.tab!==''?(this.state.tab === '5'?'master-right-content bottomToTop':'master-right-content topToBottom'):'master-right-content master-left-hide'}>{this.state.tab === '5'?(<WillAppointed  ifChangeTab={this.state.ifChangeTab} tabAppointed={this.state.tab} taskType={changeCaseTypeTab.data && changeCaseTypeTab.data.caseTypeId} fromHomePage={this.state.fromHomePage} subType={this.state.subType}/>):''}</div>
                    <div className={this.state.tab!==''?(this.state.tab === '6'?'master-right-content bottomToTop':'master-right-content topToBottom'):'master-right-content master-left-hide'}>{this.state.tab === '6'?(<WillAppointed  ifChangeTab={this.state.ifChangeTab} tabAppointed={this.state.tab} taskType={changeCaseTypeTab.data && changeCaseTypeTab.data.caseTypeId} fromHomePage={this.state.fromHomePage} subType={this.state.subType}/>):''}</div>
                </div>
                <div className="clearBoth"></div>
            </div>
        )
    }
}
