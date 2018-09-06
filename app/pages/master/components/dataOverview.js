import React, { Component } from 'react'
import { connect } from 'react-redux'
import Cookies from 'js-cookie' 
import Img from '../../../images/common/u114.png'
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts'
import { Tabs,message,Spin } from 'antd';
import { DataSet} from '@antv/data-set'
import { orderByMonthResponse } from '../../../reducers/masterReducer';
import { sendEstablishCase } from 'actions/masterAction'
import Add from '../../../images/common/add2.png'
import {
    sendUploadFiles
}from 'actions/analysisForSeatAction'
import {
    getCharsAnalysis,
    getSubmitList,
    checkCaseName,
}from 'actions/masterAction'

import Image from '../../../images/source/image.svg'
import Word from '../../../images/source/word.svg'
import Excle from '../../../images/source/excel.svg'
import File from '../../../images/source/file-1.png'
const TabPane = Tabs.TabPane;
const { DataView } = DataSet;
const { Html } = Guide;



@connect(
    (state,props)=>({
        config: state.config,
        orderByYear: state.orderByYearResponse,
        orderByMonth: state.orderByMonthResponse,
        orderByWeek: state.orderByWeekResponse,
        orderCompletion: state.orderCompletionResponse,
        orderByType: state.orderByTypeResponse
    })
)
export default class DataOverview extends Component{
    constructor(props){
        super(props);
        this.state={
            showSpin:false,
            currentPoliceTypeId:Cookies.get('policeTypeId'),
            zoneId:Cookies.get('zoneId'),
            showEstablish:'none',
            showEstablishButton:'none',
            caseNameRepeat:false,
            windowWidth:0,
            feedBackFile:[],
            windowHeight:0,
            changeCount:'1',
            paifaGongdan:'1',
            tubiaoData:[],
             currentMonthData : [
                { year: '1991', value: 15468 },
                { year: '1992', value: 16100 },
                { year: '1993', value: 15900 },
                { year: '1994', value: 17409 },
                { year: '1995', value: 17000 },
                { year: '1996', value: 31056 },
                { year: '1997', value: 31982 },
                { year: '1998', value: 32040 },
                { year: '1999', value: 33233 },
                { year: '1981', value: 15468 },
                { year: '1982', value: 16100 },
                { year: '1983', value: 15900 },
                { year: '1984', value: 17409 },
                { year: '1985', value: 17000 },
                { year: '1986', value: 31056 },
                { year: '1987', value: 31982 },
                { year: '1988', value: 32040 },
                { year: '1989', value: 33233 }
              ],
              currentWeekData : [
                { year: '1951 年', sales: 38 },
                { year: '1952 年', sales: 52 },
                { year: '1956 年', sales: 61 },
                { year: '1957 年', sales: 145 },
                { year: '1958 年', sales: 48 },
                { year: '1959 年', sales: 38 },
                { year: '1960 年', sales: 38 },
                { year: '1962 年', sales: 38 },
              ],
               currentMonthCols:{
                value: {
                  min: 15000
                },
                year: {
                  range: [ 0 , 1 ]
                }
              },
              label:{
                  autoRotate:false,
                  textStyle:{
                      fontSize:'16'
                  }
              }
              
        }
    }

    componentWillMount(){
        let width = document.documentElement.clientWidth || document.body.clientWidth;
        let height = document.documentElement.clientHeight || document.body.clientHeight;

        if(this.state.zoneId === '-1'){
            this.setState({
                showEstablishButton:'block',
                windowWidth:width/1920,
                windowHeight:height/1080
            })
        }else{
            this.setState({
                windowWidth:width/1920,
                windowHeight:height/1080
            })
        }
        
        this.getChartData();
    }
 
    renderCanvas(x){
        let length = x*230*this.state.windowWidth;
        let canvas = this.refs.canvas;
        let ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.fillStyle='#ffffff';
        ctx.fillRect(0,0,230*this.state.windowWidth,50*this.state.windowHeight);
        ctx.closePath();
        ctx.fillStyle='#f0f2f5';
        ctx.fillRect(0,20*this.state.windowHeight,230*this.state.windowWidth,12*this.state.windowHeight);
        ctx.fillStyle='#1890ff';
        ctx.fillRect(0,20*this.state.windowHeight,length,12*this.state.windowHeight);
        ctx.strokeStyle='#1890ff';
        ctx.lineWidth=2;
        ctx.moveTo(length,10*this.state.windowHeight);
        ctx.lineTo(length,16*this.state.windowHeight);
        ctx.stroke();
        ctx.moveTo(length,36*this.state.windowHeight);
        ctx.lineTo(length,42*this.state.windowHeight);
        ctx.stroke();
    }
  
    shouldComponentUpdate(nextProps){
        let { orderCompletion } = this.props;
        // console.log(orderCompletion)
        if(orderCompletion.res&&orderCompletion.res.data){
            this.renderCanvas(orderCompletion.res.data.completion?orderCompletion.res.data.completion.toFixed(4):0)
        }else{
            // this.renderCanvas(0)
        }

        return true;
    }
    getChartData(){
        this.props.dispatch(getCharsAnalysis({type:this.state.paifaGongdan,rang:this.state.changeCount},(res)=>{
            if(res.data){
                this.setState({
                    tubiaoData:res.data
                })
            }else{
                this.setState({
                    tubiaoData:[]
                })
            }
        }))
    }
    callback(key) {
        if(key !== this.state.paifaGongdan){
            this.setState({
                paifaGongdan:key,
                changeCount:'1'
            },()=>{
                this.getChartData();
            })
        }
       
      }
      changeCount(e){
        let currentCount = e.currentTarget.getAttribute('data-changecount');
      //   console.log(currentCount)
        this.setState({
          changeCount:currentCount
        },()=>{
          //   console.log(this.state.changeCount)
          this.getChartData();
          
        })
    }
  
      feedBackFile(e){
        let fileName = e.target.files[0].name;
        let fileBody = e.target.files[0];
        let index = fileName.lastIndexOf('.');  
        let fileExtrName = fileName.substring(index+1);
        if(fileName.length>4){
            fileName = fileName.substr(0,4);
        }
        let file = {
            fileName:fileName.substr(0,4),
            fileBody:fileBody,
            fileExtrName: fileExtrName
        }
        this.state.feedBackFile.push(file);
        e.target.value = '' ;//删除上传后input的值   这样就可以重复传同一个文件了
        this.setState({
            feedBackFile:this.state.feedBackFile
        },()=>{
            // console.log(this.state.feedBackFile);
        });
       
    }
    showEstablishCase(){
        this.setState({
            showEstablish:'block'
        })

    }
    closeEstablishCase(){
        this.setState({
            showEstablish:'none',
            feedBackFile:[]
        })
        this.refs.esName.value = '';
        this.refs.esDesc.value = '';
    }
    

    establishCase(){
        let caseName = this.refs.esName.value;
        let caseDesc = this.refs.esDesc.value;
        let form = new FormData();
        if(this.state.caseNameRepeat){
            this.state.feedBackFile.forEach((e)=>{
                form.append("files",e.fileBody);
            });
            form.append("type",'0');
        
            form.append("policeTypeId",this.state.currentPoliceTypeId);
            form.append("uploadStatus",'1');
            form.append("zoneId",this.state.zoneId);
            if(caseName.replace(/^ +| +$/g,'')){
                if(!this.state.showSpin){
                    this.setState({
                        showSpin:true
                    },()=>{
                        this.props.dispatch(sendEstablishCase({caseName:caseName,caseDesc:caseDesc},(res)=>{
            
                            form.append("caseId",res.data);
                            form.append("cId",res.data);//cId是合成主键
                            this.props.dispatch(sendUploadFiles(form,(res)=>{
                                if(res.status === 200){
                                    message.success('创建案件成功',3);
                                    this.setState({
                                        showEstablish:'none',
                                        feedBackFile:[],
                                        showSpin:false
                                    })
                                    this.refs.esName.value = '';
                                    this.refs.esDesc.value = '';
                                    this.props.dispatch(getSubmitList({page:1,size:7},(res)=>{ 
                                    
                                    }));
                                
                                }
                            }))
                
                
                        }))
                    })
                }else{
                    message.error('该案件已提交',3);
                }
            }else{
                message.error('请输入案件名称',3)
            }
        
        
        }else{
            message.error('案件名称重复，请重新输入',3)
        }    
       


    }


    deleteFile(e){
        let currentFileName = e.currentTarget.getAttribute('data-filename');
        this.state.feedBackFile.forEach((item,index)=>{
            if(item.fileBody.name === currentFileName){
                this.state.feedBackFile.splice(index,1);
            }
        })
        this.setState({
            feedBackFile:this.state.feedBackFile
        },()=>{
            // console.log(this.state.feedBackFile);
        });
        
    }

    blur(){
        this.props.dispatch(checkCaseName({caseName:this.refs.esName.value},(res)=>{
            if(res.data > 0){
                this.setState({
                    caseNameRepeat: false
                })
                message.error('该案件已存在，请重新输入案件名称！',3)
            }else{
                this.setState({
                    caseNameRepeat: true
                })
            }
        })) 
    }

    render(){
        const { orderByYear, orderByMonth, orderByWeek, orderCompletion, orderByType } = this.props;
        if(orderByType.res){
            this.dv = new DataView();
            this.dv.source(orderByType.res.data.list).transform({
            type: 'percent',
            field: 'sum',
            dimension: 'taskName',
            as: 'percent'
            });
            this.cols = {
            percent: {
            formatter: val => {
                val = parseInt(val * 100) + '%';
                return val;
            }
            }
            }   
        }

      


        return(
            <div className="master-content-data">
                <div className="master-text-top">
                    <div className="master-text-top-item master-item-top-width">
                        <p>本年任务总量</p>
                        <p>{orderByYear.res?orderByYear.res.data.sum:''}</p>
                        <p>年同比  <img src={Img} alt="pic" className={(orderByYear.res?orderByYear.res.data.than:1)>=0?"":"goDown"}/> <span>{orderByYear.res?orderByYear.res.data.than:''}</span></p> 
                    </div>
                    <div className="master-text-top-item master-item-top-width">
                        <p>本月任务</p>
                        <p>{orderByMonth.res?orderByMonth.res.data.sum:''}</p>
                        <div className="master-tubiao">
                            <Chart data={this.state.currentMonthData}  scale={this.state.currentMonthCols} height={40*this.state.windowHeight}  width={230*this.state.windowWidth} padding={[0,0,0,0]}>
                                <Axis name="year" visible={false} />
                                <Axis name="value"  visible={false} />
                                <Geom type="area" position="year*value" Label={null}/>
                            </Chart>
                        </div>
                    </div>
                    <div className="master-text-top-item master-item-top-width">
                        <p>本周任务</p>
                        <p>{orderByWeek.res?orderByWeek.res.data.sum:''}</p>
                        <div className="master-tubiao">
                            <Chart data={this.state.currentWeekData}  height={40*this.state.windowHeight}  width={230*this.state.windowWidth} padding={[0,0,0,0]}>
                                <Axis name="year" visible={false}/>
                                <Axis name="sales" visible={false} />
                                <Geom type="interval" position="year*sales"  label={null} />
                            </Chart>
                        </div>
                    </div>
                    <div className="master-text-top-item master-item-top-width">
                        <p>任务完成率</p>
                        <p>{orderCompletion.res?(parseInt(orderCompletion.res.data.completion*100)+'%'):''}</p>
                        <div className="master-tubiao">
                           <canvas width={230*this.state.windowWidth} height={50*this.state.windowHeight} ref='canvas'></canvas>
                        </div>
                    </div>
                    <div className="master-establishcase" onClick={this.showEstablishCase.bind(this)}>
                        <div>
                            <img src={Add} alt="pic"/>
                            <p>新建合成请求</p>
                        </div>
                    </div>
                </div>

                
                <div className="master-text-middle" style={{display:this.state.showEstablish}}>
                    <div className="master-establish-content">
                        <div className={this.state.showSpin?'wait-contain':'display-none'}>
                            <Spin tip='提交中...' size="large"></Spin>
                        </div>
                       
                        <div className="master-establish-title">
                            <span> <i></i> 新建合成</span>
                            <b onClick={this.closeEstablishCase.bind(this)}></b>
                            <div className='clearBoth'></div>
                        </div>
                        <div className="master-establish-name">
                            <p><span>名称：</span></p>
                            <input ref='esName' id='caseName' onBlur={this.blur.bind(this)}/>
                            <div className='clearBoth'></div>
                        </div>
                        <div className="master-establish-desc">
                            <p><span>描述：</span></p>
                            <textarea ref='esDesc'></textarea>
                            <div className='clearBoth'></div>
                        </div>
                        <div className="master-establish-file">
                            <p><span>附件：</span></p>
                            <div className='establishCase-file'>
                                    <div className='files-item feedBack-file-first'>
                                        <input type="file" className="fileHide" onChange={this.feedBackFile.bind(this)}/>
                                        <img src={Add} alt="pic"/>
                                        <p>上传</p>
                                    </div>
                                    {
                                        this.state.feedBackFile.map((item,index)=>{
                                            if(item.fileExtrName === 'doc'||item.fileExtrName === 'docx'){
                                                return(
                                                    <div key={item.fileName} className='files-item feedBack-file'>
                                                        <i className="deleteFile" onClick={this.deleteFile.bind(this)} data-filename={item.fileBody.name}></i>
                                                        <img src={Word} alt="pic"/>
                                                        <p>{item.fileName?item.fileName.substr(0,6):''}</p>
                                                    </div>
                                                )
                                            }else if(item.fileExtrName === 'xls'||item.fileExtrName === 'xlsx'){
                                                return(
                                                    <div key={item.fileName} className='files-item feedBack-file'>
                                                        <i className="deleteFile" onClick={this.deleteFile.bind(this)} data-filename={item.fileBody.name}></i>
                                                        <img src={Excle} alt="pic"/>
                                                        <p>{item.fileName?item.fileName.substr(0,6):''}</p>
                                                    </div>
                                                )
                                            }else if(item.fileExtrName === 'png'||item.fileExtrName === 'jpg'||item.fileExtrName === 'jpeg'){
                                                return(
                                                    <div key={item.fileName} className='files-item feedBack-file'>
                                                        <i className="deleteFile" onClick={this.deleteFile.bind(this)} data-filename={item.fileBody.name}></i>
                                                        <img src={Image} alt="pic"/>
                                                        <p>{item.fileName?item.fileName.substr(0,6):''}</p>
                                                    </div>
                                                )
                                            }else{
                                                return(
                                                    <div key={item.fileName} className='files-item feedBack-file'>
                                                        <i className="deleteFile" onClick={this.deleteFile.bind(this)} data-filename={item.fileBody.name}></i>
                                                        <img src={File} alt="pic"/>
                                                        <p>{item.fileName?item.fileName.substr(0,6):''}</p>
                                                    </div>
                                                )
                                            }
                                        
                                        })
                                    }
                                    <div className='clearBoth'></div>
                                </div>
                                <div className="clearBoth">   </div>
                        </div>

                        <div className="master-establish-save"><button className="button" onClick={this.establishCase.bind(this)}>提交</button></div>
                    </div>
                </div>

                <div className="master-text-bottom">
                    <div className="master-text-bottom-content">
                        <div className="master-bottom-line"></div>
                        <div className="master-bottom-button">
                            <button className={this.state.changeCount ==='3'?'buttonActive':''} onClick={this.changeCount.bind(this)} data-changecount='3'>本周</button>
                            <button className={this.state.changeCount ==='2'?'buttonActive':''} onClick={this.changeCount.bind(this)} data-changecount='2'>本月</button>
                            <button className={this.state.changeCount ==='1'?'buttonActive':''} onClick={this.changeCount.bind(this)} data-changecount='1'>全年</button>
                        </div>
                        <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                            <TabPane tab="派发任务" key="1">
                                <p className="paifa-text">派发趋势</p>
                                <Chart height={350*this.state.windowHeight} data={this.state.tubiaoData} forceFit>
                                    <Axis name="xalis" label={this.state.label}/>
                                    <Axis name="num"  label={this.state.label} />
                                    <Geom type="interval" position="xalis*num"  />
                                </Chart>
                            </TabPane>
                            <TabPane tab="审批任务" key="2">
                                <p className="paifa-text">派发趋势</p>
                                <Chart height={350*this.state.windowHeight} data={this.state.tubiaoData} forceFit>
                                <Axis name="xalis" label={this.state.label}/>
                                <Axis name="num"  label={this.state.label} />
                                <Geom type="interval" position="xalis*num"  />
                                </Chart>
                            </TabPane>
                        </Tabs>
                    </div>
                    <div className="master-text-bottom-content">
                        <div className="master-bottom-title"><p>任务类别</p></div>
                        <div className="master-bottom-line"></div>
                        <div className="master-bottom-chart">
                            <Chart height={400*this.state.windowHeight} width={500*this.state.windowWidth} data={this.dv} scale={this.cols} padding={[ 50*this.state.windowHeight, 150*this.state.windowWidth, 20*this.state.windowHeight, 20*this.state.windowWidth ]} >
                                <Coord type={'theta'} radius={1} innerRadius={0.76} />
                                <Axis name="percent" />
                                <Legend position='right'  textStyle={{
                                    fill: 'rgba(0, 0, 0, 0.647)', // 文本的颜色
                                    fontSize: '20', // 文本大小
                                }} offsetY={-16*this.state.windowHeight} offsetX={10*this.state.windowWidth} itemMarginBottom={20*this.state.windowHeight} itemFormatter={(val)=>{return val.substr(0,4) }}/>
                                <Tooltip 
                                showTitle={false} 
                                itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                                />
                                <Guide >
                                <Html position ={[ '50%', '50%' ]} html={`<div style="color:rgba(0, 0, 0, 0.427);font-size:1.5rem;text-align: center;width:10em">总任务<br><span style="color:rgba(0, 0, 0, 0.847);font-size:2.25rem">${orderByType.res?orderByType.res.data.sum:'0'}</span></div>`} alignX='middle' alignY='middle'/>
                                </Guide>
                                <Geom
                                type="intervalStack"
                                position="percent"
                                color='taskName'
                                Active={true}
                                select={[true,{mode:'single'}]}
                                tooltip={['taskName*percent',(item, percent) => {
                                    percent = parseInt((percent) * 100) + '%';
                                    return {
                                    name: item,
                                    value: percent
                                    };
                                }]}
                                style={{lineWidth: 6,stroke: '#fff'}}
                                >
                               {/* <Label content='percent' formatter={(val, item) => {
                               return item.point.item + ': ' + val;}} />*/}
                                </Geom>
                            </Chart>

                            <div className="master-sheet-type">
                               <ul>
                                    {orderByType.res?(orderByType.res.data.list.map((item,index)=>{
                                        return(
                                            <li key={item.taskType}><span>{parseInt((item.than)*100)+'%'}</span> <span>{item.sum}</span></li>
                                        )
                                    })):''}
                               </ul>
                            </div>
                        </div>

                    </div>
                  
                </div>
            </div>
        )
    }
}