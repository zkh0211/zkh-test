import React, { Component } from 'react'
import { connect } from 'react-redux'
// import MasterTable from '../master/components/masterTable'
import './directionListCss.less'
import Hecheng from '../../images/source/u3599.png'
import Peizhi from './components/peiZhi'
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
import InStation from './components/instation'
import WhiteSheet from './components/whiteSheet'
import Track from './components/track'
import Ticket from './components/ticket'
import {
    // getOrderByStatus,
    // getHcTaskTypeList,
    // didApprove,
    // getSelectCountByStatus,
    // getHcCaseFromList,
    policePeopleList,
    checkWhiteSheet
} from 'actions/masterAction'
@connect(
    (state,props)=>({
        config: state.config,
        checkWhiteSheet: state.checkWhiteSheetResponse
    })
)

export default class DirectionList extends Component{
    constructor(props){
        super(props);
        this.state={
            deptName: Cookies.get('deptName'),
            tab:'1',
            caseType:[],
            caseList:{},
            caseCount:{},
            caseTotal:0,
            jinzhanData:[],
            jinzhanTotal:'0',
            dingpiaoData:[],
            dingpiaoTotal:'0',
            guijiData:[],
            guijiTotal:'0',
            whiteSheetData:{},
            whiteSheetTotal:'0',
        }
    }


    componentWillMount(){
      this.getData()
    }

    getData(){
        //进站预警
        this.props.dispatch(policePeopleList({"policeStation": this.state.deptName,"status":'',"type":'1',"pageNum":1,"pageSize":7},(res)=>{
            if(res.data){
                this.setState({
                    jinzhanData: res.data,
                    jinzhanTotal: res.data.length
                })
            }else{
                this.setState({
                    jinzhanData: [],
                    jinzhanTotal: '0'
                })
            }
        }))
        //订票预警
        this.props.dispatch(policePeopleList({"policeStation": this.state.deptName,"status":'',"type":'2',"pageNum":1,"pageSize":7},(res)=>{
            if(res.data){
                this.setState({
                    dingpiaoData: res.data,
                    dingpiaoTotal: res.data.length
                })
            }else{
                this.setState({
                    dingpiaoData: [],
                    dingpiaoTotal: '0'
                })
            }
        }))
        //轨迹预警
        this.props.dispatch(policePeopleList({"policeStation": this.state.deptName,"status":'',"type":'3',"pageNum":1,"pageSize":7},(res)=>{
            if(res.data){
                this.setState({
                    guijiData: res.data,
                    guijiTotal: res.data.length
                })
            }else{
                this.setState({
                    guijiData: [],
                    guijiTotal: '0'
                })
            }
        }))

            //白名单
        this.props.dispatch(checkWhiteSheet({"page":1,"pageSize":7},(res)=>{
        
        }))
    }

    changeTab=(e)=>{
        let num = e.currentTarget.getAttribute('data-tab');
        // let typeId = e.currentTarget.getAttribute('data-typeid');

            this.setState({
                tab:num,
                // typeId:typeId
            },()=>{
                // console.log(this.state.tab)


            })

    }

    render(){
        let { checkWhiteSheet } = this.props;
        return(
            <div className="recordList-contain">
                <div className="inner-title"> <img src={Hecheng} alt="pic"/> <span>指令台账（{parseInt(this.state.jinzhanTotal)+parseInt(this.state.dingpiaoTotal)+parseInt(this.state.guijiTotal)+parseInt(this.state.whiteSheetTotal)}）</span></div>
                <div className="master-content-data recordList-height">
                    <div className="appoint-tab-contain">

                        <div className={this.state.tab === `1`?`appoint-tab-item appoint-tab-active`:`appoint-tab-item`} onClick={this.changeTab} data-tab={'1'} >
                            <div><img src={this.state.tab=== `1`?require(`../../images/common/a-110jq.svg`):require(`../../images/common/110jq.svg`)} alt="pic"/></div>
                            <div><p className={this.state.tab===`1`?'tab-title-active tab-title':'tab-title'}>进站预警</p>
                              <p className={this.state.tab===`1`?'tab-count-active tab-count':'tab-count'}>{this.state.jinzhanTotal}</p></div>
                        </div>
                        <div className={this.state.tab === `2`?`appoint-tab-item appoint-tab-active`:`appoint-tab-item`} onClick={this.changeTab} data-tab={'2'} >
                            <div><img src={this.state.tab=== `2`?require(`../../images/common/a-jzaj.svg`):require(`../../images/common/jzaj.svg`)} alt="pic"/></div>
                            <div><p className={this.state.tab===`2`?'tab-title-active tab-title':'tab-title'}>订票预警</p>
                              <p className={this.state.tab===`2`?'tab-count-active tab-count':'tab-count'}>{this.state.dingpiaoTotal}</p></div>
                        </div>
                        <div className={this.state.tab === `3`?`appoint-tab-item appoint-tab-active`:`appoint-tab-item`} onClick={this.changeTab} data-tab={'3'} >
                            <div><img src={this.state.tab=== `3`?require(`../../images/common/a-ptqb.svg`):require(`../../images/common/ptqb.svg`)} alt="pic"/></div>
                            <div><p className={this.state.tab===`3`?'tab-title-active tab-title':'tab-title'}>轨迹预警</p>
                              <p className={this.state.tab===`3`?'tab-count-active tab-count':'tab-count'}>{this.state.guijiTotal}</p></div>
                        </div>
                        <div className={this.state.tab === `4`?`appoint-tab-item appoint-tab-active`:`appoint-tab-item`} onClick={this.changeTab} data-tab={'4'} >
                            <div><img src={this.state.tab=== `4`?require(`../../images/common/a-hcqq.svg`):require(`../../images/common/hcqq.svg`)} alt="pic"/></div>
                            <div><p className={this.state.tab===`4`?'tab-title-active tab-title':'tab-title'}>白名单</p>
                              <p className={this.state.tab===`4`?'tab-count-active tab-count':'tab-count'}>{checkWhiteSheet.res&&checkWhiteSheet.res.data.total}</p></div>
                        </div>
                        <div className={this.state.tab === `5`?`appoint-tab-item appoint-tab-active`:`appoint-tab-item`} onClick={this.changeTab} data-tab={'5'} >
                            <div><img src={this.state.tab=== `5`?require(`../../images/common/a-hcqq.svg`):require(`../../images/common/hcqq.svg`)} alt="pic"/></div>
                            <div><p className={this.state.tab===`5`?'tab-title-active tab-title':'tab-title'}>配置过滤</p>
                              <p className={this.state.tab===`5`?'tab-count-active tab-count':'tab-count'}></p></div>
                        </div>

                    </div>


                    <div className="appoint-content-contain" style={{height:'83%'}}>

                        <div className={this.state.tab !=='0'?(this.state.tab === `1`?"appoint-content-active instationScroll":'appoint-content-noActive'):''}><InStation caseList={this.state.jinzhanData} caseType={this.state.caseType} taskType={this.state.tab} /></div>
                        <div className={this.state.tab !=='0'?(this.state.tab === `2`?"appoint-content-active":'appoint-content-noActive'):''}><Ticket caseList={this.state.dingpiaoData} caseType={this.state.caseType} taskType={this.state.tab} /></div>
                        <div className={this.state.tab !=='0'?(this.state.tab === `3`?"appoint-content-active":'appoint-content-noActive'):''}><Track caseList={this.state.guijiData} caseType={this.state.caseType} taskType={this.state.tab} /></div>
                        <div className={this.state.tab !=='0'?(this.state.tab === `4`?"appoint-content-active":'appoint-content-noActive'):''}><WhiteSheet caseType={this.state.caseType} taskType={this.state.tab} /></div>
                        <div className={this.state.tab !=='0'?(this.state.tab === `5`?"appoint-content-active":'appoint-content-noActive'):''}><Peizhi/></div>

                  </div>
                </div>


            </div>

        )
    }
}
