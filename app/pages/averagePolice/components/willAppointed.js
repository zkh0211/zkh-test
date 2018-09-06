import React, { Component } from 'react'
import { connect } from 'react-redux'
import MasterTable from './masterTable'

// import Img1 from '../../../images/common/u856.svg'
// import ImgActive1 from '../../../images/common/u864.svg'
// import Img2 from '../../../images/common/u873.svg'
// import ImgActive2 from '../../../images/common/u881.svg'
// import Img3 from '../../../images/common/u890.svg'
// import ImgActive3 from '../../../images/common/u898.svg'
// import Img4 from '../../../images/common/u907.svg'
// import ImgActive4 from '../../../images/common/u915.svg'
// import Img5 from '../../../images/common/u924.svg'
// import ImgActive5 from '../../../images/common/u932.svg'
// import Img6 from '../../../images/common/u941.svg'
// import ImgActive6 from '../../../images/common/u949.svg'
import Cookies from 'js-cookie'
import { 
    getOrderByStatus,
    willAppointed,
    didAppointed,
    willApprove,
    didApprove,
    getSubmitList,
    getSubmitListNotPolice
} from 'actions/masterAction'

@connect(
    (state,props)=>({
        config: state.config,
        caseTypes: state.getCaseTypeResponse
        // submitList: state.submitListResponse
    })
)

export default class WillAppointed extends Component{
    constructor(props){
        super(props);
        this.state={
            tab:'1',
            flag:0,
            num:'',
            caseType:[],
            isMaster:'1',
            typeId:'1',
            tabAppointed:this.props.tabAppointed,
            caseList:{},
            caseData:{}
        }
    }
    changeTab(typeId){
        let num = typeId ;
      
        if(this.state.tabAppointed === '2'){
            this.setState({
                tab:num,
                // flag:0,
                // typeId:typeId
            },()=>{
                this.props.dispatch(didAppointed({caseFrom:"",taskType:num,taskSubType:'',isApprove:"1",isMaster:'0',taskStatus:'0',page:1,size:7},(res)=>{ 
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
        }else  if(this.state.tabAppointed === '3'){
            this.setState({
                tab:num,
                // flag:0,
                // typeId:typeId
            },()=>{
               
                this.props.dispatch(didAppointed({caseFrom:"",taskType:num,taskSubType:'',isApprove:"1",isMaster:'0',taskStatus:'1',page:1,size:7},(res)=>{
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
        }else  if(this.state.tabAppointed === '4'){
            this.setState({
                tab:num,
                // flag:0,
                // typeId:typeId
            },()=>{
                this.props.dispatch(didApprove({caseFrom:"",taskType:num,taskSubType:'',isApprove:"3",isMaster:'0',page:1,size:7},(res)=>{
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
        }else  if(this.state.tabAppointed === '5'){
            this.setState({
                tab:num,
                // flag:0,
                // typeId:typeId
            },()=>{
                this.props.dispatch(getSubmitListNotPolice({page:1,size:7},(res)=>{
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
       
       
       
    }
    componentWillMount(){
        this.setState({
            tab:this.props.taskType ? this.props.taskType : '1'
        },()=>{
            this.changeTab(this.state.tab);
        })
    }

    shouldComponentUpdate(nextProps,nextState){
    
        if(nextProps.taskType !== this.props.taskType || nextProps.tabAppointed !== this.props.tabAppointed){
            this.setState({
                tabAppointed:nextProps.tabAppointed,
                tab:nextProps.taskType ? nextProps.taskType : '1' 
            },()=>{
                this.changeTab(this.state.tab);
            })
            
  
               
        }
        return true;
        
    }

    render(){
        let { caseTypes } = this.props;
        return(
            <div className="master-content-data">
                <div className="appoint-tab-contain">
                    {
                        caseTypes.res?(caseTypes.res.data.map((item,index)=>{
                            if(this.state.tabAppointed === '5' && Cookies.get('authCode').indexOf('hczhRole')<0){
                                if(item.typeId === '6'){
                                    return(
                                        <div key={'type'+index} className={`appoint-tab-item appoint-tab-active`} onClick={this.changeTab.bind(this,item.typeId)} data-tab={item.typeId} data-typeid={item.typeId}>
                                        <div><img src={require(`../../../images/common/${item.imgActive}`)} alt="pic"/></div>
                                            <div><p className={'tab-title-active tab-title'}>{item.typeName}</p><p className={'tab-count-active tab-count'}>{this.state.caseList.total}</p></div>
                                        </div>
                                    )
                                }
                             
                            }else{
                                return(
                                    <div key={'type'+index} className={this.state.tab === item.typeId?`appoint-tab-item appoint-tab-active`:`appoint-tab-item`} onClick={this.changeTab.bind(this,item.typeId)}  data-tab={item.typeId} data-typeid={item.typeId}>
                                    <div><img src={this.state.tab===item.typeId?require(`../../../images/common/${item.imgActive}`):require(`../../../images/common/${item.imgName}`)} alt="pic"/></div>
                                        <div><p className={this.state.tab===item.typeId?'tab-title-active tab-title':'tab-title'}>{item.typeName}</p><p className={this.state.tab===item.typeId?'tab-count-active tab-count':'tab-count'}>{item.count}</p></div>
                                    </div>
                                )
                            }
                          
                        })):''
                    }
                   {/* <div className={this.state.tabAppointed !== '5'?(this.state.tab === '1'?'appoint-tab-item appoint-tab-active tab-margin':'appoint-tab-item tab-margin'):'master-left-hide'} onClick={this.changeTab} data-tab='1' data-typeid={this.state.caseType.length>0?(this.state.caseType[0]?this.state.caseType[0].typeId:''):''}>
                        <div><img src={this.state.tab==='1'?ImgActive1:Img1} alt="pic"/></div>
                        <div><p className={this.state.tab==='1'?'tab-title-active tab-title':'tab-title'}>{this.state.caseType.length>0?(this.state.caseType[0]?this.state.caseType[0].typeName:''):''}</p><p className={this.state.tab==='1'?'tab-count-active tab-count':'tab-count'}>{this.state.caseType.length>0?(this.state.caseType[0]?this.state.caseType[0].count:''):''}</p></div>
                    </div>
                    <div className={this.state.tabAppointed !== '5'?(this.state.tab === '4'?'appoint-tab-item appoint-tab-active':'appoint-tab-item'):'master-left-hide'} onClick={this.changeTab} data-tab='4' data-typeid={this.state.caseType.length>0?(this.state.caseType[3]?this.state.caseType[3].typeId:''):''}>
                        <div><img src={this.state.tab==='4'?ImgActive4:Img4} alt="pic"/></div>
                        <div><p className={this.state.tab==='4'?'tab-title-active tab-title':'tab-title'}>{this.state.caseType.length>0?(this.state.caseType[3]?this.state.caseType[3].typeName:''):''}</p><p className={this.state.tab==='4'?'tab-count-active tab-count':'tab-count'}>{this.state.caseType.length>0?(this.state.caseType[3]?this.state.caseType[3].count:''):''}</p></div>
                    </div>
                    <div className={this.state.tabAppointed !== '5'?(this.state.tab === '7'?'appoint-tab-item appoint-tab-active':'appoint-tab-item'):'master-left-hide'} onClick={this.changeTab} data-tab='7' data-typeid={this.state.caseType.length>0?(this.state.caseType[6]?this.state.caseType[6].typeId:''):''}>
                        <div><img src={this.state.tab==='7'?ImgActive6:Img6} alt="pic"/></div>
                        <div><p className={this.state.tab==='7'?'tab-title-active tab-title':'tab-title'}>{this.state.caseType.length>0?(this.state.caseType[6]?this.state.caseType[6].typeName:''):''}</p><p className={this.state.tab==='5'?'tab-count-active tab-count':'tab-count'}>{this.state.caseType.length>0?(this.state.caseType[6]?this.state.caseType[6].count:''):''}</p></div>
                    </div>
                    <div className={this.state.tabAppointed !== '5'?(this.state.tab === '2'?'appoint-tab-item appoint-tab-active':'appoint-tab-item'):'master-left-hide'} onClick={this.changeTab} data-tab='2' data-typeid={this.state.caseType.length>0?this.state.caseType[1].typeId:''}>
                        <div><img src={this.state.tab==='2'?ImgActive2:Img2} alt="pic"/></div>
                        <div><p className={this.state.tab==='2'?'tab-title-active tab-title':'tab-title'}>{this.state.caseType.length>0?(this.state.caseType[1]?this.state.caseType[1].typeName:''):''}</p><p className={this.state.tab==='2'?'tab-count-active tab-count':'tab-count'}>{this.state.caseType.length>0?(this.state.caseType[1]?this.state.caseType[1].count:''):''}</p></div>
                    </div>
                    <div className={this.state.tabAppointed !== '5'?(this.state.tab === '3'?'appoint-tab-item appoint-tab-active':'appoint-tab-item'):'master-left-hide'} onClick={this.changeTab} data-tab='3' data-typeid={this.state.caseType.length>0?(this.state.caseType[2]?this.state.caseType[2].typeId:''):''}>
                        <div><img src={this.state.tab==='3'?ImgActive3:Img3} alt="pic"/></div>
                        <div><p className={this.state.tab==='3'?'tab-title-active tab-title':'tab-title'}>{this.state.caseType.length>0?(this.state.caseType[2]?this.state.caseType[2].typeName:''):''}</p><p className={this.state.tab==='3'?'tab-count-active tab-count':'tab-count'}>{this.state.caseType.length>0?(this.state.caseType[2]?this.state.caseType[2].count:''):''}</p></div>
                    </div>
                   
                    <div className={this.state.tabAppointed !== '5'?(this.state.tab === '5'?'appoint-tab-item appoint-tab-active':'appoint-tab-item'):'master-left-hide'} onClick={this.changeTab} data-tab='5' data-typeid={this.state.caseType.length>0?(this.state.caseType[4]?this.state.caseType[4].typeId:''):''}>
                        <div><img src={this.state.tab==='5'?ImgActive5:Img5} alt="pic"/></div>
                        <div><p className={this.state.tab==='5'?'tab-title-active tab-title':'tab-title'}>{this.state.caseType.length>0?(this.state.caseType[4]?this.state.caseType[4].typeName:''):''}</p><p className={this.state.tab==='5'?'tab-count-active tab-count':'tab-count'}>{this.state.caseType.length>0?(this.state.caseType[4]?this.state.caseType[4].count:''):''}</p></div>
                    </div>
                    <div className={this.state.tab === '6'?'appoint-tab-item appoint-tab-active':'appoint-tab-item'} onClick={this.changeTab} data-tab='6' data-typeid={this.state.caseType.length>0?(this.state.caseType[5]?this.state.caseType[5].typeId:''):''}>
                        <div><img src={this.state.tab==='6'?ImgActive6:Img6} alt="pic"/></div>
                        <div><p className={this.state.tab==='6'?'tab-title-active tab-title':'tab-title'}>{this.state.tabAppointed !== '5'?(this.state.caseType.length>0?(this.state.caseType[5]?this.state.caseType[5].typeName:''):''):'合成请求'}</p><p className={this.state.tab==='6'?'tab-count-active tab-count':'tab-count'}>{this.state.tabAppointed === '5'?this.state.caseList.total:(this.state.caseType.length>0?(this.state.caseType[5]?this.state.caseType[5].count:''):'')}</p></div>
                    </div>*/}
                </div>

                <div className="appoint-content-contain">
                    {
                        caseTypes.res?caseTypes.res.data.map((item,index)=>{
                            return(
                                <div key={"leixing"+index} className={this.state.tab !=='0'?(this.state.tab === `${index+1}`?"leftMoreLeft":'rightToLeft'):''}><MasterTable caseList={this.state.caseList} caseType={item.typeList} taskSubType={this.state.tab} tabAppointed={this.state.tabAppointed}/></div>
                    
                            )
                        }):''
                    }
                  {/*  <div className={this.state.tab !=='0'?(this.state.tab === '1'?"leftMoreLeft":'rightToLeft'):''}><MasterTable caseList={this.state.caseList} caseType={this.state.caseType} taskSubType={this.state.tab} tabAppointed={this.state.tabAppointed}/></div>
                    <div className={this.state.tab !=='0'?(this.state.tab === '2'?"leftMoreLeft":'rightToLeft'):''}><MasterTable caseList={this.state.caseList}  caseType={this.state.caseType} taskSubType={this.state.tab} tabAppointed={this.state.tabAppointed}/></div>
                    <div className={this.state.tab !=='0'?(this.state.tab === '3'?"leftMoreLeft":'rightToLeft'):''}><MasterTable caseList={this.state.caseList}  caseType={this.state.caseType} taskSubType={this.state.tab} tabAppointed={this.state.tabAppointed}/></div>
                    <div className={this.state.tab !=='0'?(this.state.tab === '4'?"leftMoreLeft":'rightToLeft'):''}><MasterTable caseList={this.state.caseList}  caseType={this.state.caseType} taskSubType={this.state.tab} tabAppointed={this.state.tabAppointed}/></div>
                    <div className={this.state.tab !=='0'?(this.state.tab === '5'?"leftMoreLeft":'rightToLeft'):''}><MasterTable caseList={this.state.caseList}  caseType={this.state.caseType} taskSubType={this.state.tab} tabAppointed={this.state.tabAppointed}/></div>
                    <div className={this.state.tab !=='0'?(this.state.tab === '6'?"leftMoreLeft":'rightToLeft'):''}><MasterTable caseList={this.state.caseList}  caseType={this.state.caseType} taskSubType={this.state.tab} tabAppointed={this.state.tabAppointed}/></div>
                    <div className={this.state.tab !=='0'?(this.state.tab === '7'?"leftMoreLeft":'rightToLeft'):''}><MasterTable caseList={this.state.caseList}  caseType={this.state.caseType} taskSubType={this.state.tab} tabAppointed={this.state.tabAppointed}/></div>
                */}
                </div>
            </div>
        )
    }
}