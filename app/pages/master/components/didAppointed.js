import React, { Component } from 'react'
import { connect } from 'react-redux'
import MasterTable from './masterTable'
import Img1 from '../../../images/common/u856.svg'
import ImgActive1 from '../../../images/common/u864.svg'
import Img2 from '../../../images/common/u873.svg'
import ImgActive2 from '../../../images/common/u881.svg'
import Img3 from '../../../images/common/u890.svg'
import ImgActive3 from '../../../images/common/u898.svg'
import Img4 from '../../../images/common/u907.svg'
import ImgActive4 from '../../../images/common/u915.svg'
import Img5 from '../../../images/common/u924.svg'
import ImgActive5 from '../../../images/common/u932.svg'
import Img6 from '../../../images/common/u941.svg'
import ImgActive6 from '../../../images/common/u949.svg'

@connect(
    (state,props)=>({config: state.config})
)

export default class DidAppointed extends Component{
    constructor(props){
        super(props);
        this.state={
            tab:'0',
            flag:0
        }
    }
    changeTab=(e)=>{
        let num = e.currentTarget.getAttribute('data-tab');
        if(parseInt(num)%2){
            this.setState({
                tab:num,
                flag:0
            })
        }else{
            this.setState({
                tab:num,
                flag:1
            })
        }
       
    }

    render(){
        return(
            <div className="master-content-data">
                <div className="appoint-tab-contain">
                    <div className={this.state.tab === '1'?'appoint-tab-item appoint-tab-active tab-margin':'appoint-tab-item tab-margin'} onClick={this.changeTab} data-tab='1'>
                        <div><img src={this.state.tab==='1'?ImgActive1:Img1} alt="pic"/></div>
                        <div><p className={this.state.tab==='1'?'tab-title-active tab-title':'tab-title'}>上级指令</p><p className={this.state.tab==='1'?'tab-count-active tab-count':'tab-count'}>7</p></div>
                    </div>
                    <div className={this.state.tab === '2'?'appoint-tab-item appoint-tab-active':'appoint-tab-item'} onClick={this.changeTab} data-tab='2'>
                        <div><img src={this.state.tab==='2'?ImgActive2:Img2} alt="pic"/></div>
                        <div><p className={this.state.tab==='2'?'tab-title-active tab-title':'tab-title'}>110警情</p><p className={this.state.tab==='2'?'tab-count-active tab-count':'tab-count'}>7</p></div>
                    </div>
                    <div className={this.state.tab === '3'?'appoint-tab-item appoint-tab-active':'appoint-tab-item'} onClick={this.changeTab} data-tab='3'>
                        <div><img src={this.state.tab==='3'?ImgActive3:Img3} alt="pic"/></div>
                        <div><p className={this.state.tab==='3'?'tab-title-active tab-title':'tab-title'}>警综案件</p><p className={this.state.tab==='3'?'tab-count-active tab-count':'tab-count'}>7</p></div>
                    </div>
                    <div className={this.state.tab === '4'?'appoint-tab-item appoint-tab-active':'appoint-tab-item'} onClick={this.changeTab} data-tab='4'>
                        <div><img src={this.state.tab==='4'?ImgActive4:Img4} alt="pic"/></div>
                        <div><p className={this.state.tab==='4'?'tab-title-active tab-title':'tab-title'}>普通情报</p><p className={this.state.tab==='4'?'tab-count-active tab-count':'tab-count'}>7</p></div>
                    </div>
                    <div className={this.state.tab === '5'?'appoint-tab-item appoint-tab-active':'appoint-tab-item'} onClick={this.changeTab} data-tab='5'>
                        <div><img src={this.state.tab==='5'?ImgActive5:Img5} alt="pic"/></div>
                        <div><p className={this.state.tab==='5'?'tab-title-active tab-title':'tab-title'}>文件上报</p><p className={this.state.tab==='5'?'tab-count-active tab-count':'tab-count'}>7</p></div>
                    </div>
                    <div className={this.state.tab === '6'?'appoint-tab-item appoint-tab-active':'appoint-tab-item'} onClick={this.changeTab} data-tab='6'>
                        <div><img src={this.state.tab==='6'?ImgActive6:Img6} alt="pic"/></div>
                        <div><p className={this.state.tab==='6'?'tab-title-active tab-title':'tab-title'}>合成请求</p><p className={this.state.tab==='6'?'tab-count-active tab-count':'tab-count'}>7</p></div>
                    </div>
                </div>

                <div className="appoint-content-contain">
                    <div className={this.state.tab !=='0'?(this.state.tab === '1'?"appoint-content-active":'appoint-content-noActive'):''}><MasterTable tab={this.state.tab}/></div>
                    <div className={this.state.tab !=='0'?(this.state.tab === '2'?"appoint-content-active":'appoint-content-noActive'):''}><MasterTable tab={this.state.tab}/></div>
                    <div className={this.state.tab !=='0'?(this.state.tab === '3'?"appoint-content-active":'appoint-content-noActive'):''}><MasterTable tab={this.state.tab}/></div>
                    <div className={this.state.tab !=='0'?(this.state.tab === '4'?"appoint-content-active":'appoint-content-noActive'):''}><MasterTable tab={this.state.tab}/></div>
                    <div className={this.state.tab !=='0'?(this.state.tab === '5'?"appoint-content-active":'appoint-content-noActive'):''}><MasterTable tab={this.state.tab}/></div>
                    <div className={this.state.tab !=='0'?(this.state.tab === '6'?"appoint-content-active":'appoint-content-noActive'):''}><MasterTable tab={this.state.tab}/></div>
                </div>
            </div>
        )
    }
}