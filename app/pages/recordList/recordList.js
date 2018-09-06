import React, { Component } from 'react'
import { connect } from 'react-redux'
import MasterTable from '../master/components/masterTable'
import './recordList.less'
import Hecheng from '../../images/source/u3599.png'

// import Img1 from '../../images/common/u856.svg'
// import ImgActive1 from '../../images/common/u864.svg'
// import Img2 from '../../images/common/u873.svg'
// import ImgActive2 from '../../images/common/u881.svg'
// import Img3 from '../../images/common/u890.svg'
// import ImgActive3 from '../../images/common/u898.svg'
// import Img4 from '../../images/common/u907.svg'
// import ImgActive4 from '../../images/common/u915.svg'
// import Img5 from '../../images/common/u924.svg'
// import ImgActive5 from '../../images/common/u932.svg'
// import Img6 from '../../images/common/u941.svg'
// import ImgActive6 from '../../images/common/u949.svg'
import Cookies from 'js-cookie'
import RecordTable from './components/recordTable'
import { 
    getOrderByStatus,
    getHcTaskTypeList,
    didApprove,
    getSelectCountByStatus,
    getHcCaseFromList
} from 'actions/masterAction'
@connect(
    (state,props)=>({
        config: state.config,
        
    })
)

export default class RecordList extends Component{
    constructor(props){
        super(props);
        this.state={
            tab:'1',
            caseType:[],
            caseList:{},
            caseCount:{},
            caseTotal:0
        }
    }
   

    componentWillMount(){
       
        this.props.dispatch(getHcTaskTypeList({},(result)=>{ 
            if(result.data){
                this.setState({
                    caseType:result.data
                },()=>{
                    this.props.dispatch(getOrderByStatus({status:'3',isMaster:this.state.isMaster,isApprove:''},(res)=>{
                        let caseItem = {};
                        let caseTypes = [];
                        if(res.data){
                            res.data.map((elem,num)=>{
                                this.state.caseTotal += parseInt(elem.count);
                            })
                            this.state.caseType.forEach((item,index)=>{
                                res.data.map((elem,num)=>{
                                   
                                    if(item.typeId === elem.typeId){
                                        caseItem = {
                                            typeId:item.typeId,
                                            typeName: item.typeName,
                                            count: elem.count,
                                            typeChildList: item.typeList
                                        }
                                        caseTypes.push(caseItem);
                                    }
                                })
                            })
                            this.setState({
                                caseType:caseTypes,
                                caseTotal:this.state.caseTotal
                            },()=>{
                            //    console.log(this.state.caseType)
                            })
                        }
                       
                    }))
                })
            }else{
                this.setState({
                    caseType:[]
                })
            }
         }));
         if(Cookies.get('authCode').indexOf('hczhRole')!==-1){
            this.setState({
                isMaster:'1'
            },()=>{
                this.props.dispatch(getSelectCountByStatus({isMaster:this.state.isMaster},(res)=>{
                    if(res.data){
                        this.setState({
                            caseCount:res.data
                        })
                    }else{
                        this.setState({
                            caseCount:{}
                        })
                    }
                }))
                
                this.props.dispatch(didApprove({caseFrom:"",taskType:"1",taskSubType:'',isApprove:"",isMaster:this.state.isMaster,page:1,size:7},(res)=>{ 
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
               
                
            })
        }else{
            this.setState({
                isMaster:'0'
            },()=>{
                this.props.dispatch(getSelectCountByStatus({isMaster:this.state.isMaster},(res)=>{
                    if(res.data){
                        this.setState({
                            caseCount:res.data
                        })
                    }else{
                        this.setState({
                            caseCount:{}
                        })
                    }
                }))
                
                this.props.dispatch(didApprove({caseFrom:"",taskType:"1",taskSubType:'',isApprove:"",isMaster:this.state.isMaster,page:1,size:7},(res)=>{ 
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
               
            })
        } 
         this.props.dispatch(getHcCaseFromList({},(res)=>{
            
        }))
      
    }

    changeTab=(e)=>{
        let num = e.currentTarget.getAttribute('data-tab');
        // let typeId = e.currentTarget.getAttribute('data-typeid');
      
            this.setState({
                tab:num,
                // typeId:typeId
            },()=>{

                this.props.dispatch(didApprove({caseFrom:"",taskType:num,taskSubType:'',isApprove:"",isMaster:this.state.isMaster,page:1,size:7},(res)=>{ 
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

            })
  
    }

    render(){
        return(
            <div className="recordList-contain">
                <div className="inner-title"> <img src={Hecheng} alt="pic"/> <span>档案列表（{this.state.caseTotal}）</span></div>
                <div className="master-content-data recordList-height">
                    <div className="appoint-tab-contain">
                        {
                            this.state.caseType.length>0?this.state.caseType.map((item,index)=>{
                                return(
                                    <div className={this.state.tab === `${index+1}`?`appoint-tab-item appoint-tab-active`:`appoint-tab-item`} onClick={this.changeTab} data-tab={index+1} >
                                        <div><img src={this.state.tab=== `${index+1}`?require(`../../images/common/a-hcqq.svg`):require(`../../images/common/hcqq.svg`)} alt="pic"/></div>
                                        <div><p className={this.state.tab===`${index+1}`?'tab-title-active tab-title':'tab-title'}>{this.state.caseType.length>0?(this.state.caseType[index]?this.state.caseType[index].typeName:''):''}</p><p className={this.state.tab===`${index+1}`?'tab-count-active tab-count':'tab-count'}>{this.state.caseType.length>0?(this.state.caseType[index]?this.state.caseType[index].count:''):''}</p></div>
                                    </div>
                                )
                            }):''
                        }
                        {/*<div className={this.state.tab === '1'?'appoint-tab-item appoint-tab-active tab-margin':'appoint-tab-item tab-margin'} onClick={this.changeTab} data-tab='1' >
                            <div><img src={this.state.tab==='1'?ImgActive1:Img1} alt="pic"/></div>
                            <div><p className={this.state.tab==='1'?'tab-title-active tab-title':'tab-title'}>{this.state.caseType.length>0?(this.state.caseType[0]?this.state.caseType[0].typeName:''):''}</p><p className={this.state.tab==='1'?'tab-count-active tab-count':'tab-count'}>{this.state.caseType.length>0?(this.state.caseType[0]?this.state.caseType[0].count:''):''}</p></div>
                        </div>
                        <div className={this.state.tab === '4'?'appoint-tab-item appoint-tab-active':'appoint-tab-item'} onClick={this.changeTab} data-tab='4' >
                            <div><img src={this.state.tab==='4'?ImgActive4:Img4} alt="pic"/></div>
                            <div><p className={this.state.tab==='4'?'tab-title-active tab-title':'tab-title'}>{this.state.caseType.length>0?(this.state.caseType[3]?this.state.caseType[3].typeName:''):''}</p><p className={this.state.tab==='4'?'tab-count-active tab-count':'tab-count'}>{this.state.caseType.length>0?(this.state.caseType[3]?this.state.caseType[3].count:''):''}</p></div>
                        </div>
                        <div className={this.state.tab === '7'?'appoint-tab-item appoint-tab-active':'appoint-tab-item'} onClick={this.changeTab} data-tab='7' >
                            <div><img src={this.state.tab==='7'?ImgActive6:Img6} alt="pic"/></div>
                            <div><p className={this.state.tab==='7'?'tab-title-active tab-title':'tab-title'}>{this.state.caseType.length>0?(this.state.caseType[6]?this.state.caseType[6].typeName:''):''}</p><p className={this.state.tab==='7'?'tab-count-active tab-count':'tab-count'}>{this.state.caseType.length>0?(this.state.caseType[6]?this.state.caseType[6].count:''):''}</p></div>
                        </div>
                        <div className={this.state.tab === '5'?'appoint-tab-item appoint-tab-active':'appoint-tab-item'} onClick={this.changeTab} data-tab='5' >
                            <div><img src={this.state.tab==='5'?ImgActive5:Img5} alt="pic"/></div>
                            <div><p className={this.state.tab==='5'?'tab-title-active tab-title':'tab-title'}>{this.state.caseType.length>0?(this.state.caseType[4]?this.state.caseType[4].typeName:''):''}</p><p className={this.state.tab==='5'?'tab-count-active tab-count':'tab-count'}>{this.state.caseType.length>0?(this.state.caseType[4]?this.state.caseType[4].count:''):''}</p></div>
                        </div>
                      
                        <div className={this.state.tab === '2'?'appoint-tab-item appoint-tab-active':'appoint-tab-item'} onClick={this.changeTab} data-tab='2'>
                            <div><img src={this.state.tab==='2'?ImgActive2:Img2} alt="pic"/></div>
                            <div><p className={this.state.tab==='2'?'tab-title-active tab-title':'tab-title'}>{this.state.caseType.length>0?(this.state.caseType[1]?this.state.caseType[1].typeName:''):''}</p><p className={this.state.tab==='2'?'tab-count-active tab-count':'tab-count'}>{this.state.caseType.length>0?(this.state.caseType[1]?this.state.caseType[1].count:''):''}</p></div>
                        </div>
                        <div className={this.state.tab === '3'?'appoint-tab-item appoint-tab-active':'appoint-tab-item'} onClick={this.changeTab} data-tab='3'>
                            <div><img src={this.state.tab==='3'?ImgActive3:Img3} alt="pic"/></div>
                            <div><p className={this.state.tab==='3'?'tab-title-active tab-title':'tab-title'}>{this.state.caseType.length>0?(this.state.caseType[2]?this.state.caseType[2].typeName:''):''}</p><p className={this.state.tab==='3'?'tab-count-active tab-count':'tab-count'}>{this.state.caseType.length>0?(this.state.caseType[2]?this.state.caseType[2].count:''):''}</p></div>
                        </div>
                      
                       
                        <div className={this.state.tab === '6'?'appoint-tab-item appoint-tab-active':'appoint-tab-item'} onClick={this.changeTab} data-tab='6' >
                            <div><img src={this.state.tab==='6'?ImgActive6:Img6} alt="pic"/></div>
                            <div><p className={this.state.tab==='6'?'tab-title-active tab-title':'tab-title'}>{this.state.caseType.length>0?(this.state.caseType[5]?this.state.caseType[5].typeName:''):''}</p><p className={this.state.tab==='6'?'tab-count-active tab-count':'tab-count'}>{this.state.caseType.length>0?(this.state.caseType[5]?this.state.caseType[5].count:''):''}</p></div>
                        </div>*/}
                    </div>

                    
                    <div className="appoint-content-contain">
                        {
                            this.state.caseType.length>0?this.state.caseType.map((item,index)=>{
                                return(
                                    <div className={this.state.tab !=='0'?(this.state.tab === `${index+1}`?"appoint-content-active":'appoint-content-noActive'):''}><RecordTable caseList={this.state.caseList} caseType={this.state.caseType} taskType={this.state.tab} /></div>
                       
                                )
                            }):''
                        }
                        {/*<div className={this.state.tab !=='0'?(this.state.tab === '1'?"appoint-content-active":'appoint-content-noActive'):''}><RecordTable caseList={this.state.caseList} caseType={this.state.caseType} taskType={this.state.tab} /></div>
                        <div className={this.state.tab !=='0'?(this.state.tab === '2'?"appoint-content-active":'appoint-content-noActive'):''}><RecordTable caseList={this.state.caseList}  caseType={this.state.caseType} taskType={this.state.tab} /></div>
                        <div className={this.state.tab !=='0'?(this.state.tab === '3'?"appoint-content-active":'appoint-content-noActive'):''}><RecordTable caseList={this.state.caseList}  caseType={this.state.caseType} taskType={this.state.tab} /></div>
                        <div className={this.state.tab !=='0'?(this.state.tab === '4'?"appoint-content-active":'appoint-content-noActive'):''}><RecordTable caseList={this.state.caseList}  caseType={this.state.caseType} taskType={this.state.tab} /></div>
                        <div className={this.state.tab !=='0'?(this.state.tab === '5'?"appoint-content-active":'appoint-content-noActive'):''}><RecordTable caseList={this.state.caseList}  caseType={this.state.caseType} taskType={this.state.tab} /></div>
                        <div className={this.state.tab !=='0'?(this.state.tab === '6'?"appoint-content-active":'appoint-content-noActive'):''}><RecordTable caseList={this.state.caseList}  caseType={this.state.caseType} taskType={this.state.tab} /></div>
                        <div className={this.state.tab !=='0'?(this.state.tab === '7'?"appoint-content-active":'appoint-content-noActive'):''}><RecordTable caseList={this.state.caseList}  caseType={this.state.caseType} taskType={this.state.tab} /></div>
                */} </div>
                </div>
                    
            
            </div>
           
        )
    }
}