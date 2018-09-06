/**
 * Created by lpsh0 on 2017/10/24.
 */
import React, {Component} from 'react';
import echarts from 'echarts'
//ripple是波纹的意思，这个echart图的背景是波纹形状
export default class ChartMap extends Component {
    constructor(props) {
        super(props);
        this.bingdianFlag = false; //用于冰点图和警力分布图切换的标注属性
        this.option = {
            legend: [{     //案件图例
                show: true,
                orient: 'vertical',
                // left: '50%',
                // marginRight:'1%',
                // top: '',
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
                right: '',
                // top: '',
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
                // right: '5%',
                // top: '',
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
                // right: '5%',
                // top: '55%',
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
                // right: '5%',
                // top: '65%',
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
        ]
    }

    initOption(newProps,chartMap,echartHeight) {
        chartMap.clear();
        let regionStyle=this.regionStyle;
        let geo = require('../json/'+newProps.geo.GEOURL);
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
            let geoName = newProps.geo.GEONAME;
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
            this.option.legend[num].textStyle.fontSize = echartHeight*0.025;
            /*判断传回来的数据是否大于2组*/
            this.option.legend[0].right = echartHeight*0.15;
            delete this.option.visualMap;
            for (var m0 = 0; m0 < data[num].caseType.length; m0++) {
                this.option.legend[num].data.push({
                    name: data[num].caseType[m0]['caseTypeName'],
                    // icon: data[num].caseType[m0][1]
                    icon: 'image://'+require('../../../images/mapIcons/'+data[num].caseType[m0]['picName'])
                });

                if(m0 % 4 == 3 ){
                    this.option.legend[num].data.push({
                        name: 'huanhangzhuanyong',
                        icon: '',
                        textStyle: {color: 'rgba(0,0,0,0)', fontSize: echartHeight * 0.025}
                    });
                }
            }
            // }
            /*this.option.series.push({
                name: '99',
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
            });*/

            //这个for循环是专门往series里存数据
            for( var n =0;n< data[num].caselist.length;n++){
                //由于数据大小差别太大，cache_num将数据尽量分好等级又可以使大小均等
                // if(data[num].geoMap[0].dtqbf != 6 && data[num].geoMap[0].dtqbf != 5) {
                    var cache_num = (parseInt(data[num].caselist[n].piczb) + 80) * echartHeight * 0.00005;
                    // console.log(cache_num);

             /*   let symbolSize = 0;
                if(parseInt(data[num].caseList[n].ajsl) >=10000){ symbolSize = 24}
                else if(parseInt(data[num].caseList[n].ajsl) >=1000){ symbolSize = 20}
                else if(parseInt(data[num].caseList[n].ajsl) >=100){ symbolSize = 16}
                else if(parseInt(data[num].caseList[n].ajsl) >=10){ symbolSize = 14}
                else if(parseInt(data[num].caseList[n].ajsl) >=1){ symbolSize = 12}
*/

                var item = {
                        name: data[num].caselist[n].caseTypeName,
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        // symbol: data[num].caseList[n].tburl,
                        symbol: 'image://'+require('../../../images/mapIcons/'+data[num].caselist[n]['picName']),
                        // symbolSize: symbolSize,
                        symbolSize: cache_num * 2.8,
                        itemStyle: {
                            normal: {
                                // color: data[num].caselist[n].corlor,
                                shadowColor: 'black',
                                shadowBlur: 2,
                                shadowOffsetX: 2,
                                shadowOffsetY: 2,
                                opacity: 5
                            }
                        },
                        data: [[data[num].caselist[n].longitude, data[num].caselist[n].latitude, data[num].caselist[n].count]]
                    };
                    this.option.series.push(item);
                // }
            }
        }
        var thisMap =  chartMap ;
        // console.log(thisMap._coordSysMgr._coordinateSystems.Geo)
        thisMap.setOption(this.option,true);

    }


    initMap(newProps) {
        echarts.dispose(this.element);
        this.myChart = echarts.init(this.element);
        let echartheight = this.element.clientHeight;

        this.initOption(newProps,this.myChart,echartheight);
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
            {/*<div className="chart-bingdianMap" onClick={this.switchMap.bind(this)} ref='chartBingdianMap'>
                <div className="bingdian-title" ><span>警力冰点图</span></div>
                <div className="main-chart" style={{width: '100%', height: '100%'}}
                     ref={(div) => this.smallElement = div}></div>
            </div>*/}

        </div>
            }
}