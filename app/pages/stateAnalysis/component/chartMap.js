/**
 * Created by lpsh0 on 2017/10/24.
 */
import React, {Component} from 'react';
import echarts from 'echarts'
// import $ from 'jquery';
// import './chartMap.css'
// import * as $ from "jquery";
//ripple是波纹的意思，这个echart图的背景是波纹形状
export default class ChartMap extends Component {
    constructor(props) {
        super(props);
        this.bingdianFlag = false; //用于冰点图和警力分布图切换的标注属性
        this.option = {
            legend: [{     //案件图例
                show: true,
                orient: 'vertical',
                left: '50%',
                // marginRight:'1%',
                top: '',
                itemWidth: 15,
                height:130,
                formatter: function (val) {
                    return val.substr(0, 4)
                },
                textStyle: {
                    color: 'rgb(255,255,255)',
                    fontWeight: 'lighter',
                    fontSize: '',
                    fontFamily: '宋体'
                },
                data: []
            },{   //重点人员
                show: true,
                orient: 'vertical',
                left: '2%',
                top: '',
                height:130,
                itemWidth: 15,
                formatter: function (val) {
                    return val.substr(0, 8)
                },
                textStyle: {
                    color: 'rgb(255,255,255)',
                    fontWeight: 'lighter',
                    fontSize: '',
                    fontFamily: '宋体'
                },
                data: []
            },{  //警情热力
                show: true,
                orient: 'vertical',
                right: '5%',
                top: '',
                itemWidth: 15,
                height:130,
                textStyle: {
                    color: 'rgb(255,255,255)',
                    fontWeight: 'lighter',
                    fontSize: '',
                    fontFamily: '宋体'
                },
                data: []
            },{
                show: false,
                orient: 'vertical',
                right: '5%',
                top: '55%',
                itemWidth: 15,
                textStyle: {
                    color: 'rgb(255,255,255)',
                    fontWeight: 'lighter',
                    fontSize: '',
                    fontFamily: '宋体'
                },
                data: []
            },{
                show: false,
                orient: 'vertical',
                right: '5%',
                top: '65%',
                itemWidth: 15,
                textStyle: {
                    color: 'rgb(255,255,255)',
                    fontWeight: 'lighter',
                    fontSize: '',
                    fontFamily: '宋体'
                },
                data: []
            }
            ],
            tooltip: {
                trigger: 'item',
                textStyle: {
                    color: 'rgb(255,255,255)',
                    fontWeight: 'lighter',
                    fontSize: 12,
                    fontFamily: '宋体'
                },
                formatter: function (obj) {
                    return obj.name + '<br/>' + obj.seriesName + '\:' + obj.value[2] + '起';
                }
            },

            geo: {
                map: 'taiyuan',
                roam: true,
                left: 'center',
                top: 'middle',
                // aspectScale: 0.9,
                zoom: 1,
                layoutCenter: ['100%', '100%'],
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: '#ffffff',
                            fontSize: 12,
                            fontFamily: '宋体'
                        }
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            color: '#ffffff',
                            fontSize: 12,
                            fontFamily: '宋体'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: '#232323',
                        borderWidth: 1,
                        shadowColor: '#5095DA',
                        shadowBlur: 9,
                        shadowOffsetX: 7,
                        shadowOffsetY: 7
                    },
                    emphasis: {
                        areaColor: new echarts.graphic.RadialGradient(0.6, 0.3, 0.8, [
                            {
                                offset: 0, color: '#D58A62'
                            },
                            {
                                offset: 1, color: '#A85E39'
                            }
                        ], false)
                    }
                },
                regions: []
            },
            series:  []
        };
        this.regionStyle=[
            {
                name: '',
                itemStyle: {
                    normal: {
                        areaColor: new echarts.graphic.RadialGradient(0.9, 0.3, 0.8, [
                            {
                                offset: 0, color: '#3e6a99'
                            },
                            {
                                offset: 1, color: '#134173'
                            }
                        ], false)
                    }
                }
            },
            {
                name: '',
                itemStyle: {
                    normal: {
                        areaColor: new echarts.graphic.RadialGradient(0.8, 0.6, 0.8, [
                            {
                                offset: 0, color: '#33506e'
                            },
                            {
                                offset: 1, color: '#0d2b4d'
                            }
                        ], false)
                    }
                }
            },
            {
                name: '',
                itemStyle: {
                    normal: {
                        areaColor: new echarts.graphic.RadialGradient(0.2, 0.1, 0.9, [
                            {
                                offset: 0, color: '#3e6a99'
                            },
                            {
                                offset: 1, color: '#134173'
                            }
                        ], false)
                    }
                }
            },
            {
                name: '',
                itemStyle: {
                    normal: {
                        areaColor: new echarts.graphic.RadialGradient(0.6, 0.3, 0.8, [
                            {
                                offset: 0, color: '#3A6FA1'
                            },
                            {
                                offset: 1, color: '#0D447C'
                            }
                        ], false)
                    }
                }

            },
            {
                name: '',
                itemStyle: {
                    normal: {
                        areaColor: new echarts.graphic.RadialGradient(0.1, 0.5, 0.8, [
                            {
                                offset: 0, color: '#41607d'
                            },
                            {
                                offset: 1, color: '#325372'
                            }
                        ], false)
                    }
                }
            },
            {
                name: '',
                itemStyle: {
                    normal: {
                        areaColor: new echarts.graphic.RadialGradient(0.1, 0.8, 0.8, [
                            {
                                offset: 0, color: '#2e5d8b'
                            },
                            {
                                offset: 1, color: '#154576'
                            }
                        ], false)
                    }
                }
            },
            {
                name: '',
                itemStyle: {
                    normal: {
                        areaColor: new echarts.graphic.RadialGradient(0.6, 0.3, 0.8, [
                            {
                                offset: 0, color: '#3A6FA1'
                            },
                            {
                                offset: 1, color: '#0D447C'
                            }
                        ], false)
                    }
                }
            },
            {
                name: '',
                itemStyle: {
                    normal: {
                        areaColor: new echarts.graphic.RadialGradient(0.1, 0.4, 0.8, [
                            {
                                offset: 0, color: '#274464'
                            },
                            {
                                offset: 1, color: '#183658'
                            }
                        ], false)
                    }
                }
            },
            {
                name: '',
                itemStyle: {
                    normal: {
                        areaColor: new echarts.graphic.RadialGradient(0.6, 0.3, 0.8, [
                            {
                                offset: 0, color: '#3A6FA1'
                            },
                            {
                                offset: 1, color: '#0D447C'
                            }
                        ], false)
                    }
                }
            },
            {
                name: '',
                itemStyle: {
                    normal: {
                        areaColor: new echarts.graphic.RadialGradient(0.6, 0.8, 0.8, [
                            {
                                offset: 0, color: '#274464'
                            },
                            {
                                offset: 1, color: '#183658'
                            }
                        ], false)
                    }
                }
            }
        ];
        this.vasible=false;
        // this.state={
        //     visable:false,
        //     mapText:'警力冰点图',
        // }
    }

    initOption(newProps,chartMap,echartHeight) {
        chartMap.clear();
        let regionStyle=this.regionStyle;
        let geo = require('../json/'+newProps.geo.geourl);
        let allOrSingle = newProps.status;
        let data = newProps.data;
        let dataLineHeight=0.05;
        for (var key in geo.features) {
            var i = key
            while (i>= regionStyle.length)
                i = i -regionStyle.length
            regionStyle[i]["name"]=geo.features[key]['properties']['name']
            this.option.geo.regions.push(regionStyle[i])
        }
        if (allOrSingle == true){
            dataLineHeight=0.1
            let geoName = data[0].geoMap[0].geoName;
            this.option.geo.map = geoName;
            echarts.registerMap(geoName, geo);
        }else{
            dataLineHeight=0.05
            let maparrdata = {
                type: 'single',
                features: []
            };
            for (var key in geo.features) {
                // console.log("================" + key);
                if (newProps.address == geo.features[key]['properties']['name']) {
                    maparrdata.features[0] = geo.features[key];
                }
            }
            this.option.geo.map =newProps.address;
            echarts.registerMap(maparrdata.features[0].properties.name, maparrdata);
        }
        this.option.legend[0].data = [];
        this.option.legend[1].data = [];
        this.option.legend[2].data = [];
        this.option.legend[0].top = echartHeight-130;  //因为在警力冰点图中将top设置为了68% ，此处需要复位。
        this.option.legend[1].top = echartHeight-130;  //因为在警力冰点图中将top设置为了68% ，此处需要复位。
        this.option.legend[2].top = echartHeight-130;  //因为在警力冰点图中将top设置为了68% ，此处需要复位。
        this.option.series =[];
        for(var num=0;num<data.length;num++){
            this.option.legend[num].textStyle.fontSize = echartHeight*0.02;
            /*判断传回来的数据是否大于2组*/
            if(data.length>2){
                this.option.legend[0].right = echartHeight*0.15;
                if(data[num].geoMap[0].dtqbf != 6) {//判断传回来的数据是否有热力图
                    delete this.option.visualMap;
                    // console.log(this.option)
                    if (data[num].geoMap[0].dtqbf == 1) {//回来的数据是案件动态分布图
                        this.option.legend[0].data.push({
                            name: data[num].geoMap[0].gslx,
                            icon: '',
                            textStyle: {color: '#f5f687', fontSize: echartHeight * 0.02}
                        });
                        for (var m0 = 0; m0 < data[num].caseType.length; m0++) {
                            this.option.legend[0].data.push({
                                name: data[num].caseType[m0][0],
                                // icon: data[num].caseType[m0][1]
                                icon: 'image://'+require('../../../images/mapIcons/'+data[num].caseType[m0][1])
                            });
                        }
                    } else if (data[num].geoMap[0].dtqbf == 7) {//回来的数据是重点人员动态分布图
                        this.option.legend[1].data.push({
                            name: data[num].geoMap[0].gslx,
                            icon: '',
                            textStyle: {color: '#f5f687', fontSize: echartHeight * 0.0185}
                        });
                        for (var m0 = 0; m0 < data[num].caseType.length; m0++) {
                            this.option.legend[1].data.push({
                                name: data[num].caseType[m0][0],
                                // icon: data[num].caseType[m0][1]
                                icon: 'image://'+require('../../../images/mapIcons/'+data[num].caseType[m0][1])
                            });

                            if(m0 % 4 == 3 ){
                                this.option.legend[1].data.push({
                                    name: 'huanhangzhuanyong',
                                    icon: '',
                                    textStyle: {color: 'rgba(0,0,0,0)', fontSize: echartHeight * 0.0185}
                                });
                            }
                        }
                    } else if (data[num].geoMap[0].dtqbf == 5) {//回来的数据是警情热力分布图（散点图）
                        this.option.legend[2].data.push({
                            name: data[num].geoMap[0].gslx,
                            icon: '',
                            textStyle: {color: '#f5f687', fontSize: echartHeight * 0.0185}
                        });
                        for (var m0 = 0; m0 < data[num].caseType.length; m0++) {
                            this.option.legend[2].data.push({
                                name: data[num].caseType[m0][0],
                                icon: 'image://'+require('../../../images/mapIcons/'+data[num].caseType[m0][1])
                            });
                        }
                    }else {//回来的数据是重点人住宿旅店
                        for (var m0 = 0; m0 < data[num].caseType.length; m0++) {
                            this.option.legend[2].data.push({
                                name: data[num].caseType[m0][0],
                                icon: 'image://'+require('../../../images/mapIcons/'+data[num].caseType[m0][1])
                            });
                        }
                    }
                    this.option.series.push({
                        name: data[num].geoMap[0].gslx,
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        symbolSize: 0,
                        itemStyle: {
                            normal: {
                                color: 'transparent'
                            }
                        },
                        data: [[110, 31, 0]]
                    });
                    this.option.series.push({
                        name:'huanhangzhuanyong',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        symbolSize: 0,
                        itemStyle: {
                            normal: {
                                color: 'transparent'
                            }
                        },
                        data: [[110, 31, 0]]
                    });

                }else{
                    this.option.visualMap = {
                        type:'continuous',
                        min:'0',
                        max:'50',
                        right:'2%',
                        bottom:'3%',
                        orient:'horizontal',
                        itemWidth:'',
                        itemHeight:'',
                        inRange:{
                            color:['#f71d1e','#e3778f','#5e73ac','#204788','#0e366a'].reverse()
                        },
                        dimension:3,
                        text:['高','低'],
                        textStyle:{
                            color:'#ffffff'
                        }
                    };
                    this.option.visualMap.itemWidth = echartHeight*0.009;
                    this.option.visualMap.itemHeight = echartHeight*0.1;
                    for( var n2=0;n2<data[num].caseList.length;n2++){
                        var item2 = {
                            type: 'heatmap',
                            coordinateSystem: 'geo',
                            data: [[data[num].caseList[n2].longitude,data[num].caseList[n2].latitude,data[num].caseList[n2].ajsl]]
                        };
                        this.option.series.push(item2);
                    }
                }
            }else if(data.length==1){//判断后台传回来的数据为1组
                // delete this.option.visualMap;
                if(data[num].geoMap[0].dtqbf != 3){//判断该组数据是不是热力图
                    delete this.option.visualMap;
                    for(var m in data[num].caseType){
                        this.option.legend[2].data.push ({
                            name:data[num].caseType[m][0],
                            // icon:data[num].caseType[m][1]
                            icon:'image://'+require('../../../images/mapIcons/'+data[num].caseType[m][1])
                        });
                    }
                }else{
                    for( var n2=0;n2<data[num].caseList.length;n2++){
                        var item2 = {
                            type: 'heatmap',
                            coordinateSystem: 'geo',
                            data: [[data[num].caseList[n2].longitude,data[num].caseList[n2].latitude,data[num].caseList[n2].ajsl]]
                        };
                        this.option.series.push(item2);
                    }
                }
            }
            //这个for循环是专门往series里存数据
            for( var n in data[num].caseList){
                //由于数据大小差别太大，cache_num将数据尽量分好等级又可以使大小均等
                if(data[num].geoMap[0].dtqbf != 6 && data[num].geoMap[0].dtqbf != 5) {
                    var cache_num = (parseInt(data[num].caseList[n].sltj) + 80) * echartHeight * 0.00005;
                    // console.log(cache_num);
                    let symbolSize = 0;
                    if(parseInt(data[num].caseList[n].ajsl) >=10000){ symbolSize = 24}
                    else if(parseInt(data[num].caseList[n].ajsl) >=1000){ symbolSize = 20}
                    else if(parseInt(data[num].caseList[n].ajsl) >=100){ symbolSize = 16}
                    else if(parseInt(data[num].caseList[n].ajsl) >=10){ symbolSize = 14}
                    else if(parseInt(data[num].caseList[n].ajsl) >=1){ symbolSize = 12}

                    var item = {
                        name: data[num].caseList[n].ajlx,
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        // symbol: data[num].caseList[n].tburl,
                        symbol: 'image://'+require('../../../images/mapIcons/'+data[num].caseList[n].tburl),
                        symbolSize: symbolSize,
                        // symbolSize: cache_num * 2.8,
                        itemStyle: {
                            normal: {
                                // color: data[num].caseList[n].corlor,
                                shadowColor: 'black',
                                shadowBlur: 2,
                                shadowOffsetX: 2,
                                shadowOffsetY: 2,
                                opacity: 5
                            }
                        },
                        data: [[data[num].caseList[n].longitude, data[num].caseList[n].latitude, data[num].caseList[n].ajsl]]
                    };
                    this.option.series.push(item);
                }else if(data[num].geoMap[0].dtqbf == 5){
                    var cache_num = (parseInt(data[num].caseList[n].sltj) + 80) * echartHeight * 0.00005;
                    // console.log(cache_num);
                    let symbolSize = 0;
                    if(parseInt(data[num].caseList[n].ajsl) >=10000){ symbolSize = 24}
                    else if(parseInt(data[num].caseList[n].ajsl) >=1000){ symbolSize = 20}
                    else if(parseInt(data[num].caseList[n].ajsl) >=100){ symbolSize = 16}
                    else if(parseInt(data[num].caseList[n].ajsl) >=10){ symbolSize = 14}
                    else if(parseInt(data[num].caseList[n].ajsl) >=1){ symbolSize = 12}

                    var item = {
                        name: data[num].caseList[n].ajlx,
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        symbol: 'image://'+require('../../../images/mapIcons/'+data[num].caseList[n].tburl),
                        symbolSize: symbolSize,
                        // symbolSize: cache_num * 2.8,
                        itemStyle: {
                            normal: {
                                // color: data[num].caseList[n].corlor,
                                shadowColor: 'black',
                                shadowBlur: 2,
                                shadowOffsetX: 2,
                                shadowOffsetY: 2,
                                opacity: 5
                            }
                        },
                        data: [[data[num].caseList[n].longitude, data[num].caseList[n].latitude+dataLineHeight, data[num].caseList[n].ajsl]]
                    };
                    this.option.series.push(item);
                    var item = {
                        name: data[num].caseList[n].ajlx,
                        type: 'lines',
                        lineStyle: {
                            normal: {
                                color: '#fff',
                                width: 2,
                                opacity:1
                                // curveness: 0.2
                            }
                        },
                        data:[[[data[num].caseList[n].longitude, data[num].caseList[n].latitude],[data[num].caseList[n].longitude, data[num].caseList[n].latitude+dataLineHeight],data[num].caseList[n].ajsl]]
                    };
                    this.option.series.push(item);
                }
            }
        }
        var thisMap =  chartMap ;
        // console.log(thisMap)
        // console.log(thisMap._coordSysMgr._coordinateSystems.Geo)
        thisMap.setOption(this.option,true);

    }

    /*冰点图和热力图切换时使用的方法*/
    jingliOption(newProps,thisMap,littleMap, echartHeight,flag) {
        var chartMapList = [];
        if (flag){
            chartMapList.push(littleMap);
            chartMapList.push(thisMap);
        }else {
            chartMapList.push(thisMap);
            chartMapList.push(littleMap);

        }

        thisMap.clear();
        littleMap.clear();
        let regionStyle=this.regionStyle;
        let geo = require('../json/'+newProps.geo.geourl);
        let allOrSingle = newProps.status;
        let data = newProps.data;

        for (var key in geo.features) {
            var i = key
            while (i>= regionStyle.length)
                i = i -regionStyle.length
            regionStyle[i]["name"]=geo.features[key]['properties']['name']
            this.option.geo.regions.push(regionStyle[i])
        }
        if (allOrSingle == true){
            let geoName = data[0].geoMap[0].geoName;
            this.option.geo.map = geoName;
            echarts.registerMap(geoName, geo);
        }else{
            let maparrdata = {
                type: 'single',
                features: []
            };
            for (var key in geo.features) {
                // console.log("================" + key);
                if (newProps.address == geo.features[key]['properties']['name']) {
                    maparrdata.features[0] = geo.features[key];
                }
            }
            this.option.geo.map =newProps.address;
            echarts.registerMap(maparrdata.features[0].properties.name, maparrdata);
        }

        for(let num=0;num<data.length;num++){
            this.option.legend[0].data = [];
            this.option.legend[1].data = [];
            this.option.legend[2].data = [];
            this.option.series =[];
            this.option.legend[num].textStyle.fontSize = echartHeight*0.0125;
            delete this.option.visualMap;
            if(data[num].geoMap[0].dtqbf != 3){//判断该组数据是不是热力图
                for(var m in data[num].caseType){
                    this.option.legend[2].data.push ({name:data[num].caseType[m][0],
                        icon:'image://'+require('../../../images/mapIcons/'+data[num].caseType[m][1])});
                }
                this.option.legend[2].bottom = '0';
                this.option.legend[2].top = '68%';
                for( var n in data[num].caseList){
                    //由于数据大小差别太大，cache_num将数据尽量分好等级又可以使大小均等
                    var cache_num = (parseInt(data[num].caseList[n].sltj) + 80)*echartHeight*0.00005;
                    // console.log(cache_num);
                    var item = {
                        name: data[num].caseList[n].ajlx,
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        symbol:'image://'+require('../../../images/mapIcons/'+data[num].caseList[n].tburl),
                        // symbolSize: 20,
                        symbolSize:  cache_num*2.8,
                        itemStyle: {
                            normal: {
                                color: data[num].caseList[n].corlor,
                                shadowColor: 'black',
                                shadowBlur: 2,
                                shadowOffsetX: 2,
                                shadowOffsetY: 2,
                                opacity: 5
                            }
                        },
                        data: [[data[num].caseList[n].longitude,data[num].caseList[n].latitude,data[num].caseList[n].ajsl]]
                    };
                    this.option.series.push(item);
                }
            }else{
                this.option.visualMap = {
                    type:'continuous',
                    show:false,
                    min:'0',
                    max:'50',
                    right:'2%',
                    bottom:'3%',
                    orient:'horizontal',
                    itemWidth:'',
                    itemHeight:'',
                    inRange:{
                        color:['#ffffff','#5385ff','#2563b0','#1a4d86'].reverse()
                    },
                    dimension:3,
                    text:['高','低'],
                    textStyle:{
                        color:'#ffffff'
                    }
                };
                this.option.visualMap.itemWidth = echartHeight*0.009;
                this.option.visualMap.itemHeight = echartHeight*0.1;
                for( var n2=0;n2<data[num].caseList.length;n2++){
                    var item2 = {
                        type: 'heatmap',
                        coordinateSystem: 'geo',
                        data: [[data[num].caseList[n2].longitude,data[num].caseList[n2].latitude,data[num].caseList[n2].ajsl]]
                    };
                    this.option.series.push(item2);
                }
            }
            chartMapList[num].setOption(this.option,true);
        }

    }

    initMap(newProps) {
        echarts.dispose(this.element);
        this.myChart = echarts.init(this.element);
        this.myLittleChart = echarts.init(this.smallElement);
        let echartheight = this.element.clientHeight;
        if(newProps.radioSelect != 5){
            // $(this.refs.chartBingdianMap).hide();
            // this.setState({
                this.visable=false
            // })

            this.initOption(newProps,this.myChart,echartheight);
        }else {
            // $(this.refs.chartBingdianMap).show();
            // this.setState({
                this.visable=true
            // })
            this.jingliOption(newProps,this.myChart,this.myLittleChart,echartheight);
            this.myLittleChart.resize()
        }
        let _this = this;
        this.myChart.on('dblclick', function (param) {
            if (param.name != '') {
                let address_allOrSingle = []; 
                address_allOrSingle.push(param.name);
                address_allOrSingle.push(!newProps.status);
                _this.props.callbackData(address_allOrSingle);
            }
        });

    }

    // var bingdianFlag = false;
    switchMap() {
        // console.log(this);
        if(this.bingdianFlag){
            // $(".bingdian-title span").html("警力冰点图");
            // this.setState({
            //     mapText:'警力冰点图'
            // },()=>{
            //     console.log(this.state.mapText);
            //     this.bingdianFlag = false;
            // })
            this.refs.bingdianTitle.innerText='警力冰点图'
            this.bingdianFlag = false;

        }else {
            // $(".bingdian-title span").html("警力动态分布图");
            // console.log(12313)
            this.refs.bingdianTitle.innerText='警力动态分布图'
            this.bingdianFlag = true;
            // console.log(this);
            // this.setState({
            //    mapText:'警力动态分布图'
            // },()=>{
            //     console.log(this.state.mapText);
            //     this.bingdianFlag = true;
            // })

        }
        this.jingliOption(this.props,this.myChart,this.myLittleChart,this.element.clientHeight,this.bingdianFlag);

    }

    shouldComponentUpdate(newProps) {
        if (this.props.data !== newProps.data) {
            this.initMap(newProps);
            return true;
        } else {
            return false;
        }

    }

    render() {
        return <div className="chart-map">
            <div style={{width: '100%', height: '100%'}} ref={(div) => this.element = div}></div>
            <div className="chart-bingdianMap" onClick={this.switchMap.bind(this)}
                 ref='chartBingdianMap'
                 style={{display:this.visable?'block':'none'}}
            >
                <div className="bingdian-title" ><span ref='bingdianTitle'>
                    {/*{this.state.mapText}*/}
                    警力冰点图
                    </span></div>
                <div className="main-chart" style={{width: '100%', height: '100%'}}
                     ref={(div) => this.smallElement = div}></div>
            </div>

        </div>
            }
}