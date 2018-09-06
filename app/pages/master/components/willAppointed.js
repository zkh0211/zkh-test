import React, { Component } from 'react'
import { connect } from 'react-redux'
import MasterTable from './masterTable'
import DirectionTable from './directionTable'
import TongxingYujing from './tongxingYujing'
import Hcqq from '../../../images/common/hcqq.svg'
import HcqqActive from '../../../images/common/a-hcqq.svg'
import Cookies from 'js-cookie'
import {
    getOrderByStatus,
    willAppointed,
    didAppointed,
    willApprove,
    didApprove,
    getSubmitList,
    getSubmitListNotPolice,
    queryAllCase,
    overviewCount,
    getDirection,
    tongxingYujing,
    policePeopleList,
    zhilingTotal,
    isFeedBackZhiling,
    doneCount,
    doingCount
} from 'actions/masterAction'

@connect(
    (state,props)=>({
        config: state.config,
        caseTypes: state.getCaseTypeResponse,
        zhilingTotal: state.zhilingTotalResponse,
        isFeedBackZhiling: state.isFeedBackZhilingResponse
    })
) 

export default class WillAppointed extends Component{
    constructor(props){
        super(props);
        this.state={
            deptName: Cookies.get('deptName'),
            tab:'1',
            flag:0,
            zhilingTotal:0,
            num:'',
            deptLevel: Cookies.get('deptLevel'),
            caseType:[],
            caseTypes:[],
            isMaster:Cookies.get('authCode').indexOf('hczhRole')!==-1?"1":'0',
            typeId:'1',
            tabAppointed:this.props.tabAppointed,
            caseList:{},
            thead:[],
            thead1:['序号','名称','类型','来源','状态','案发时间','合成状态'],
            thead2:['序号','名称','类型','采集途径','紧急程度','入库时间','合成状态'],
            thead3:['序号','数据来源','市局下发时间','轨迹类型','下发分局','分局下发时间','人数','指令状态'],
            thead4:['序号','姓名','证件号码','人员类型','人员级别','管辖单位','管辖民警','签收状态','签收倒计时','反馈状态','反馈倒计时'],
            subTypeList:[],
            tongxingyujingCount:''
        }
    }
      
  
    changeTab(typeId){
        let num = typeId ;
        // let num = e.currentTarget.getAttribute('data-typeid');
        // let typeId = e.currentTarget.getAttribute('data-typeid');
        // let typeList = e.currentTarget.getAttribute('data-typelist') ;
        if(this.state.tabAppointed === '2'){
            this.setState({
                tab:num,
            },()=>{
                   if(num === '1'){
                       if(this.state.deptLevel === '3'){

                            this.props.dispatch(getDirection({"status":'1',"branch":this.state.deptName,"page":1,"pageSize":7},(res)=>{
                                this.setState({
                                    caseList:res.data,
                                    // zhilingTotal: res.data.total
                                    // thead:this.state.thead3 
                                })
                                this.props.dispatch(zhilingTotal(res.data.total))
                            }))
                       }else if(this.state.deptLevel === '2'){
                            this.props.dispatch(getDirection({"status":'1',"branch":'',"page":1,"pageSize":7},(res)=>{
                                this.setState({
                                    caseList:res.data,
                                    // zhilingTotal: res.data.total
                                    // thead:this.state.thead3
                                })
                                this.props.dispatch(zhilingTotal(res.data.total))
                            }))
                       }
                       else if(this.state.deptLevel === '4'){//  山西省太原市公安局万柏林分局白家庄派出所
                            this.props.dispatch(policePeopleList({"policeStation":this.state.deptName,'status':'1',"type":'',"pageNum":1,"pageSize":7},(res)=>{
                                if(res.data){
                                    this.setState({
                                        caseList:res.data,
                                        // zhilingTotal: res.data.total
                                        // thead:this.state.thead3
                                    },()=>{
                                        
                                    })
                                    this.props.dispatch(zhilingTotal(res.data.total))
                                }else{
                                    this.setState({
                                        caseList:{}
                                    })
                                    this.props.dispatch(zhilingTotal(0))
                                }
                               
                            }))
                       }
                      

                    }else{
                        this.props.dispatch(willAppointed({caseFrom:"",taskType:num,taskSubType:'',isApprove:"1",isMaster:this.state.isMaster,page:1,size:7},(res)=>{
                            if(res.data){
                                this.setState({
                                    caseList:res.data
                                })
                            }else{
                                this.setState({
                                    caseList:{}
                                })
                            }
                        }));
                        if(this.state.deptLevel === '3'){

                            this.props.dispatch(getDirection({"status":'1',"branch":this.state.deptName,"page":1,"pageSize":7},(res)=>{
                                // this.setState({
                                //     // caseList:res.data,
                                //     // zhilingTotal: res.data.total
                                //     // thead:this.state.thead3
                                // })
                                this.props.dispatch(zhilingTotal(res.data.total))
                            }))
                       }else if(this.state.deptLevel === '2'){
                            this.props.dispatch(getDirection({"status":'1',"branch":'',"page":1,"pageSize":7},(res)=>{
                                // this.setState({
                                //     // caseList:res.data,
                                //     zhilingTotal: res.data.total
                                //     // thead:this.state.thead3
                                // })
                                this.props.dispatch(zhilingTotal(res.data.total))
                            }))
                       }
                       else if(this.state.deptLevel === '4'){//  山西省太原市公安局万柏林分局白家庄派出所
                            this.props.dispatch(policePeopleList({"policeStation":this.state.deptName,'status':'1',"type":'',"pageNum":1,"pageSize":7},(res)=>{
                                // this.setState({
                                //     // caseList:res.data,
                                //     zhilingTotal: res.data.total
                                //     // thead:this.state.thead3
                                // })
                                if(res.data){
                                    this.props.dispatch(zhilingTotal(res.data.total))
                                }else{
                                    this.props.dispatch(zhilingTotal(0))
                                }
                               
                            }))
                       }

                    }
            })
        }else  if(this.state.tabAppointed === '3'){
            this.setState({
                tab:num
            },()=>{
                    if(num !== '1'){
                        this.props.dispatch(didAppointed({caseFrom:"",taskType:num,taskSubType:'',isApprove:"1",isMaster:this.state.isMaster,page:1,size:7},(res)=>{
                            if(res.data){
                                this.setState({
                                    caseList:res.data
                                })
                            }else{
                                this.setState({
                                    caseList:{}
                                })
                            }
                        }));
                    }else{
                        if(this.state.deptLevel === "4"){
                            this.props.dispatch(policePeopleList({"policeStation":this.state.deptName,'status':'2',"type":'',"pageNum":1,"pageSize":7},(res)=>{
                                if(res.data){
                                    this.setState({
                                        caseList:res.data,
                                        // zhilingTotal: res.data.total
                                        // thead:this.state.thead3
                                    })
                                    this.props.dispatch(zhilingTotal(res.data.total))
                                }else{
                                    this.setState({
                                        caseList:{}
                                    })
                                    this.props.dispatch(zhilingTotal(0))
                                }
                                
                            }))
                        }else{
                            this.props.dispatch(getDirection({"status":'2',"branch":this.state.deptName,"page":1,"pageSize":7},(res)=>{
                                this.setState({
                                    caseList:res.data
                                })
                                this.props.dispatch(zhilingTotal(res.data.total))
                            }))
                        }

                        // this.setState({
                        //     caseList: {},
                        //     zhilingTotal: '0'
                        // })
                    }


            })
        }else  if(this.state.tabAppointed === '4'){
            this.setState({
                tab:num,
            },()=>{
                if(Cookies.get('deptLevel') === '4'){
                    this.props.dispatch(willAppointed({caseFrom:"",taskType:num,taskSubType:'',isApprove:"1",isMaster:this.state.isMaster,page:1,size:7},(res)=>{
                        if(res.data){
                            this.setState({
                                caseList:res.data
                            })
                        }else{
                            this.setState({
                                caseList:{}
                            })
                        }
                     }));

                }else{
                    this.props.dispatch(willApprove({caseFrom:"",taskType:num,taskSubType:'',isApprove:"2",isMaster:this.state.isMaster,page:1,size:7},(res)=>{
                        if(res.data){
                            this.setState({
                                caseList:res.data
                            })
                        }else{
                            this.setState({
                                caseList:{}
                            })
                        }
                      }));

                }

            })
        }else  if(this.state.tabAppointed === '5'){
            this.setState({
                tab:num,
            },()=>{
               if(num === '1'){
                this.props.dispatch(getDirection({"status":'3',"branch":this.state.deptName,"page":1,"pageSize":7},(res)=>{
                    this.setState({
                        caseList:res.data,
                        // zhilingTotal: res.data.total
                        // thead:this.state.thead3
                    })
                    this.props.dispatch(zhilingTotal(res.data.total))
                }))
                // this.setState({
                //     caseList: {},
                //     zhilingTotal: '0'
                // })
               }else{
                this.props.dispatch(didApprove({caseFrom:"",taskType:num,taskSubType:'',isApprove:"3",isMaster:this.state.isMaster,page:1,size:7},(res)=>{
                    if(res.data){
                        this.setState({
                            caseList:res.data
                        })
                    }else{
                        this.setState({
                            caseList:{}
                        })
                    }
                  }));
               }

            })
        }else  if(this.state.tabAppointed === '6'){
            this.setState({
                tab:num,
            },()=>{
                if(num !== '1'){
                    this.props.dispatch(getSubmitListNotPolice({taskType:num,page:1,size:7},(res)=>{
                        if(res.data){
                            this.setState({
                                caseList:res.data,
                                submited:res.data.total
                            })
                        }else{
                            this.setState({
                                caseList:{},
                                submited:'0'
                            })
                        }
                    }));

                }else{
                    this.setState({
                        caseList: {},
                        // zhilingTotal: '0'
                    })
                    this.props.dispatch(zhilingTotal(0))
                }
 
            })
        }else if(this.state.tabAppointed === '0'){
            this.setState({
                tab:num,
            },()=>{
                if(this.state.tab === '8'){
                    this.props.dispatch(tongxingYujing({page:1,pageSize:7},(res)=>{
                        if(res.data){
                            this.setState({
                                caseList:res.data,
                                tongxingyujingCount:res.data.total
                            })
                        }else{
                            this.setState({
                                caseList:{},
                                tongxingyujingCount:'0'
                            })
                        }
                    }));
                }
                else if(this.state.tab === '1'){
                        let branch = '';
                        if(this.state.deptLevel === '2'){
                            branch = "";
                        }else if(this.state.deptLevel === '3'){
                            branch = this.state.deptName;
                        }else if(this.state.deptLevel === '4'){

                        }
                        this.props.dispatch(getDirection({"status":'',"branch":branch,"page":1,"pageSize":7},(res)=>{
                            if(res.data){
                                this.setState({
                                    caseList:res.data,
                                    // zhilingTotal: res.data.total
                                },()=>{
                                    // console.log(this.state.caseList)
                                })
                                this.props.dispatch(zhilingTotal(res.data.total))
                            }
                        }))
                }else{
                        let source=1;
                        this.state.tab==='2'?source=2:this.state.tab==='3'?source=1:this.state.tab==='4'?source=3:'';
                        this.props.dispatch(queryAllCase({source:source,page:1,pageSize:7},(res)=>{
                            if(res.data){
                                this.setState({
                                    caseList:res.data,
                                    submited:res.data.total
                                })
                            }else{
                                this.setState({
                                    caseList:{},
                                    submited:'0'
                                })
                            }
                        }));
                }
            })
        }
    }

    alreadyFeed =()=>{
        this.props.dispatch(isFeedBackZhiling('1'))
        if(this.state.deptLevel === '2'){
            this.props.dispatch(getDirection({"status":'3',"branch":'',"page":1,"pageSize":7},(res)=>{
                if(this.state.tabAppointed === '5'){
                    this.setState({
                        caseList:res.data
                    },()=>{
                    })
                    this.props.dispatch(zhilingTotal(res.data.total))
                }
                
                this.props.dispatch(doneCount({count: res.data.total}))
            }))
            this.props.dispatch(getDirection({"status":'2',"branch":'',"page":1,"pageSize":7},(res)=>{
                this.props.dispatch(doingCount({count: res.data.total}))
            }))
            
        }else{
            this.props.dispatch(getDirection({"status":'3',"branch":this.state.deptName,"page":1,"pageSize":7},(res)=>{
                if(this.state.tabAppointed === '5'){
                    this.setState({
                        caseList:res.data
                    },()=>{
                    })
                    this.props.dispatch(zhilingTotal(res.data.total))
                }
                
                this.props.dispatch(doneCount({count: res.data.total}))
            }))
            this.props.dispatch(getDirection({"status":'2',"branch":this.state.deptName,"page":1,"pageSize":7},(res)=>{
                this.props.dispatch(doingCount({count: res.data.total}))
            }))
        }
       
    }
    componentWillMount(){
        this.props.dispatch(tongxingYujing({page:1,pageSize:7},(res)=>{
            if(res.data){
                this.setState({
                    // caseList:res.data,
                    tongxingyujingCount:res.data.total
                })
            }else{
                this.setState({
                    // caseList:{},
                    tongxingyujingCount:'0'
                })
            }
        }));
        
        this.changeTab(this.props.subType);
        this.props.dispatch(overviewCount({},(res)=>{
            if(res.data){
                this.setState({
                    caseTypes:res.data
                },()=>{
                //   console.log(this.state.caseTypes)
                })
            }else{
                this.setState({
                    caseTypes:[]
                })
            }
                
        }))



    }
 
    shouldComponentUpdate(nextProps,nextState){
      if(nextProps.taskType !== this.props.taskType || nextProps.tabAppointed !== this.props.tabAppointed || nextProps.ifChangeTab !== this.props.ifChangeTab){
        
            this.setState({
                tabAppointed:nextProps.tabAppointed,
                tab:nextProps.taskType ? nextProps.taskType : '1'
            },()=>{
                this.changeTab(this.state.tab);
                if(this.state.tabAppointed === '0'){
                    this.props.dispatch(overviewCount({},(res)=>{
                       
                            if(res.data){
                                this.setState({
                                    caseTypes:res.data
                                },()=>{
                                   
                                })
                            }else{
                                this.setState({
                                    caseTypes:[]
                                })
                            }
                    }))

                }

            })

        }
       
        return true;

    }
    componentDidUpdate(nextProps,nextState){
        let { isFeedBackZhiling } = this.props;
        isFeedBackZhiling&&isFeedBackZhiling.data === 'getFeedBackFromPcs'? this.alreadyFeed():''
    }

    render(){
        let { caseTypes, zhilingTotal, isFeedBackZhiling } = this.props;
        return(
            <div className="master-content-data">
                <div className="appoint-tab-contain">
                    {
                        this.state.tabAppointed === '0'?(
                            this.state.caseTypes?(this.state.caseTypes.map((item,index)=>{
                                return(
                                    <div key={'type'+index} className={this.state.tab === item.typeId?`appoint-tab-item appoint-tab-active`:`appoint-tab-item`} onClick={this.changeTab.bind(this,item.typeId)}   >
                                        <div><img src={this.state.tab=== item.typeId ?require(`../../../images/common/${item.imgActive}`):require(`../../../images/common/${item.imgName}`)} alt="pic"/></div>
                                        <div><p className={this.state.tab===item.typeId?'tab-title-active tab-title':'tab-title'}>{item.typeName}</p><p className={this.state.tab===item.typeId?'tab-count-active tab-count':'tab-count'}>{item.typeId === '1'?zhilingTotal&&zhilingTotal.data:item.count}</p></div>
                                    </div>
                                )
                            })):''
                        ):(
                            caseTypes.res?(caseTypes.res.data.map((item,index)=>{
                                return(
                                    <div key={'type'+index} className={this.state.tab === item.typeId?`appoint-tab-item appoint-tab-active`:`appoint-tab-item`} onClick={this.changeTab.bind(this,item.typeId)}   >
                                        <div><img src={this.state.tab=== item.typeId ?require(`../../../images/common/${item.imgActive}`):require(`../../../images/common/${item.imgName}`)} alt="pic"/></div>
                                        <div><p className={this.state.tab===item.typeId?'tab-title-active tab-title':'tab-title'}>{item.typeName}</p><p className={this.state.tab===item.typeId?'tab-count-active tab-count':'tab-count'}>{item.typeId === '1'?zhilingTotal&&zhilingTotal.data:item.count}</p></div>
                                    </div>
                                )
                            })):''
                        )
                    }
                    <div  className={this.state.deptLevel === '2'&&this.state.tabAppointed === '0'?(this.state.tab === '8'?`appoint-tab-item appoint-tab-active`:'appoint-tab-item'):'display-none'} onClick={this.changeTab.bind(this,'8')} >
                        <div><img src={this.state.tab === '8'? HcqqActive: Hcqq} alt="pic"/></div>
                        <div><p className={this.state.tab === '8'?'tab-title-active tab-title':'tab-title'}>同行预警</p><p className={this.state.tab === '8'?'tab-count-active tab-count':'tab-count'}>{this.state.tongxingyujingCount}</p></div>
                    </div>
                </div>

                <div className="appoint-content-contain">
                    {
                        this.state.tabAppointed === '0'?(
                            this.state.caseTypes?(this.state.caseTypes.map((item,index)=>{

                                if(this.state.tab === '8'){
                                    return(
                                        <div key={'leixing'+index} className={this.state.tab !=='0'?(this.state.tab === `8`?"leftMoreLeft":'rightToLeft'):''}><TongxingYujing caseList={this.state.caseList} caseType={item.typeList}  taskSubType={this.state.tab} tabAppointed={this.state.tabAppointed}/></div>
                                    )
                                }else{
                                    return(
                                        <div key={'leixing'+index} className={this.state.tab !=='0'?(this.state.tab === `${index+1}`?"leftMoreLeft":'rightToLeft'):''}><DirectionTable alreadyFeed={this.alreadyFeed} caseList={this.state.caseList}  caseType={item.typeList}  taskSubType={this.state.tab} tabAppointed={this.state.tabAppointed}/></div>
                                    )
                                }

                            })):''
                        ):(
                           caseTypes.res?(caseTypes.res.data.map((item,index)=>{
                                    if(this.state.tabAppointed === '2'&&this.state.tab === '1'|| this.state.tabAppointed === '3'&&this.state.tab === '1'||this.state.tabAppointed === '5'&&this.state.tab === '1'){
                                        return(
                                            <div key={'leixing'+index} className={this.state.tab !=='0'?(this.state.tab === `${index+1}`?"leftMoreLeft":'rightToLeft'):''}><DirectionTable alreadyFeed={this.alreadyFeed} caseList={this.state.caseList} thead={this.state.thead} caseType={item.typeList}  taskSubType={this.state.tab} tabAppointed={this.state.tabAppointed}/></div>
                                        )
                                    }
                                    else{
                                        return(
                                            <div key={'leixing'+index} className={this.state.tab !=='0'?(this.state.tab === `${index+1}`?"leftMoreLeft":'rightToLeft'):''}><MasterTable caseList={this.state.caseList} caseType={item.typeList} taskSubType={this.state.tab} tabAppointed={this.state.tabAppointed}/></div>
                                        )
                                    }

                            })):''
                        )
                    }

                </div>
            </div>
        )
    }
}
