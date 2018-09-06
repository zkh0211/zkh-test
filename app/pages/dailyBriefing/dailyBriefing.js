/**
 * Created by Administrator on 2017/9/12.
 */
import React, { Component } from "react";
import { connect } from "react-redux";
// import HeaderNav from '../common/headerNav';
import ChartPanel from "./component/chartPanel";
import "./dailyBriefing.css";
import ImgUp from "../../images/daily/chart-panel-up.png";
import ImgDown from "../../images/daily/chart-panel-down.png";
import Cookies from 'js-cookie'
// import GlobalData from '../../util/globalData';
// import RightLink from '../common/rightLink';
// import fetch from '../common/fetch';

import {
  selectInternetBarPeople,
  selectHotelPeople,
  keyCriminalCaseYoyChain,
  keyCriminalCaseTotal,
  keyAlarmTotal,
  securityCaseYoyChain,
  securityCaseYoyChainTotal,
  criminalCaseAreaDistribution,
  selectInternetBarWarning,
  selectHotelWarning
} from "actions/daily";

@connect((state, props) => ({
  config: state.config
}))
export default class DailyBriefing extends Component {
  constructor() {
    super();
    this.state = {
      beginTime: this.getDate(),
      endTime: this.getDate(),
      gxjgdm: Cookies.get('gxjgdm'),
      wbryHead: [
        {
          text: "人员",
          key: "XM"
        },
        {
          text: "身份证",
          key: "GMSFHM"
        },
        {
          text: "预警积分",
          key: "YJJF"
        },
        {
          text: "类型",
          key: "RYLX"
        },
        {
          text: "级别",
          key: "JB"
        },
        {
          text: "预警场所",
          key: "YYCSMC"
        }
      ],
      ldryHead: [
        {
          text: "人员",
          key: "XM"
        },
        {
          text: "身份证",
          key: "GMSFHM"
        },
        {
          text: "预警积分",
          key: "YJJF"
        },
        {
          text: "类型",
          key: "RYLX"
        },
        {
          text: "级别",
          key: "JB"
        },
        {
          text: "预警场所",
          key: "YYCSMC"
        }
      ],
      zdxsaj: {},
      zdgzjq: {},
      zaaj: {},
      xsajqyfb: {},
      ldyj: {},
      zsxsajtotal: {},
      zaajtotal: {},
      wbyj: {},
      wbryData: [],
      ldryData: []
    };
  }

  // 返回日期格式YYYYMMDD
  getDate() {
    let date = new Date();
    return `${date.getFullYear()}${
      date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
    }${date.getDate() - 1}`;
  }
  //网吧人员
  refreshWBRY() {
    this.props.dispatch(
      selectInternetBarPeople(
        {
          gxjgdm: this.state.gxjgdm,
          beginTime: this.state.beginTime,
          endTime: this.state.endTime
        },
        res => {
          if (res["status"] === 200) {
            this.setState({
              wbryData: res["data"]
            });
          }
        }
      )
    );

    //   fetch({
    //     url: GlobalData.socialSelectInternetBarPeople,
    //     method: "POST",
    //     data: {
    //       gxjgdm: GlobalData.gxjgdm,
    //       beginTime: this.state.beginTime,
    //       endTime: this.state.endTime
    //     }

    //   }).then(
    //     res => {
    //     if (res["status"] === 200) {
    //       this.setState({
    //         wbryData: res["data"]
    //       });
    //     }
    //   }
    // );
  }

  //旅店人员
  refreshLDRY() {
    this.props.dispatch(
      selectHotelPeople(
        {
          gxjgdm: this.state.gxjgdm,
          beginTime: this.state.beginTime,
          endTime: this.state.endTime
        },
        res => {
          if (res["status"] === 200) {
            this.setState({
              ldryData: res["data"]
            });
          }
        }
      )
    );

    // fetch({
    //   url: GlobalData.socialSelectHotelPeople,
    //   method: "POST",
    //   data: {
    //     gxjgdm: GlobalData.gxjgdm,
    //     beginTime: this.state.beginTime,
    //     endTime: this.state.endTime
    //   }
    //   //Request.post({
    //   //    url: GlobalData.socialSelectHotelPeople,
    //   //    data: {gxjgdm: GlobalData.gxjgdm, beginTime: this.state.beginTime, endTime: this.state.endTime}
    // }).then(res => {
    //   if (res["status"] === 200) {
    //     this.setState({
    //       ldryData: res["data"]
    //     });
    //   }
    // });
  }

  refreshZDXSAJ() {
    let zdxsajOption = {
      color: ["#16E77F", "#E9533B", "#60BDFF"],
      textStyle: { color: "white" },
      tooltip: { trigger: "axis" },
      legend: {
        bottom: "5%",
        textStyle: {
          color: "white",
          fontSize: 16
        },
        data: ["同比", "环比", "数量"]
      },
      grid: {
        left: "3%",
        top: "3%",
        bottom: "17%",
        right: "5%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 16
          },
          axisLine: {
            lineStyle: {
              color: "#84AFD2"
            }
          },
          //data: ['2017-8-16', '2017-8-18', '2017-8-20', '2017-8-22', '2017-8-24', '2017-8-26', '2017-8-28']
          data: []
        }
      ],
      yAxis: [
        {
          type: "value",
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 16
          },
          axisLine: {
            lineStyle: {
              color: "#84AFD2"
            }
          }
        }
      ],
      series: [
        {
          name: "同比",
          type: "line",
          showSymbol: false,
          smooth: true,
          //data: [120, 132, 101, 134, 90, 230, 210]
          data: []
        },
        {
          name: "环比",
          type: "line",
          showSymbol: false,
          smooth: true,
          //data: [220, 182, 191, 234, 290, 330, 310]
          data: []
        },
        {
          name: "数量",
          type: "bar",
          barCategoryGap: "90%",
          itemStyle: {
            normal: {
              barBorderRadius: 20
            }
          },
          //data: [150, 232, 201, 154, 190, 330, 410]
          data: []
        }
      ]
    };

    this.props.dispatch(
      keyCriminalCaseYoyChain(
        {
          gxjgdm: this.state.gxjgdm
        },
        res => {
          if (res["status"] === 200) {
            res["data"].forEach((e, i) => {
              zdxsajOption.xAxis[0].data.push(e["SJD"]);
              zdxsajOption.series[0].data.push(e["TB"]);
              zdxsajOption.series[1].data.push(e["HB"]);
              zdxsajOption.series[2].data.push(e["AJSL"]);
            });
            this.setState({ zdxsaj: zdxsajOption });
          }
        }
      )
    );
    //   fetch({
    //     url: GlobalData.dailyBriefingCriminalCaseYoyChain,
    //     method: "POST",
    //     data: { gxjgdm: GlobalData.gxjgdm }
    //     //Request.post({
    //     //    url:GlobalData.dailyBriefingCriminalCaseYoyChain,
    //     //    data:{gxjgdm:GlobalData.gxjgdm}
    //   }).then(
    //     res => {
    //     if (res["status"] === 200) {
    //       res["data"].forEach((e, i) => {
    //         zdxsajOption.xAxis[0].data.push(e["SJD"]);
    //         zdxsajOption.series[0].data.push(e["TB"]);
    //         zdxsajOption.series[1].data.push(e["HB"]);
    //         zdxsajOption.series[2].data.push(e["AJSL"]);
    //       });
    //       this.setState({ zdxsaj: zdxsajOption });
    //     }
    //   }
    // );

    // 重点刑事案件每日总量同比、环比
    /*Request.post({
         url: GlobalData.dailyBriefingCriminalCaseTotal,
         data: {gxjgdm: GlobalData.gxjgdm}*/

    this.props.dispatch(
      keyCriminalCaseTotal(
        {
          gxjgdm: this.state.gxjgdm
        },
        res => {
          if (res["status"] === 200 && res["data"].length > 0) {
            this.setState({
              zsxsajtotal: {
                ajsl: res["data"][0]["AJSL"],
                tb: res["data"][0]["TB"],
                hb: res["data"][0]["HB"]
              }
            });
          }
        }
      )
    );
    //   fetch({
    //     url: GlobalData.dailyBriefingCriminalCaseTotal,
    //     method: "POST",
    //     data: { gxjgdm: GlobalData.gxjgdm }
    //   }).then(
    //     res => {
    //     if (res["status"] === 200 && res["data"].length > 0) {
    //       this.setState({
    //         zsxsajtotal: {
    //           ajsl: res["data"][0]["AJSL"],
    //           tb: res["data"][0]["TB"],
    //           hb: res["data"][0]["HB"]
    //         }
    //       });
    //     }
    //   }
    // );
  }

  refreshZDGZJQ() {
    let zdgzjqOption = {
      color: ["#16E77F", "#E9533B", "#60BDFF"],
      textStyle: { color: "white" },
      tooltip: { trigger: "axis" },
      legend: {
        bottom: "5%",
        textStyle: {
          color: "white",
          fontSize: 16
        },
        data: ["同比", "环比", "数量"]
      },
      grid: {
        left: "3%",
        top: "3%",
        bottom: "17%",
        right: "5%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 16
          },
          axisLine: {
            lineStyle: {
              color: "#84AFD2"
            }
          },
          //data: ['抢劫', '抢夺', '技术性开锁', '阳台盗窃', '撬门入室盗窃', '汽车电子干扰盗窃', '盗窃电动车']
          data: []
        }
      ],
      yAxis: [
        {
          type: "value",
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 16
          },
          axisLine: {
            lineStyle: {
              color: "#84AFD2"
            }
          }
        }
      ],
      series: [
        {
          name: "同比",
          type: "line",
          showSymbol: false,
          smooth: true,
          //data: [120, 132, 101, 134, 90, 230, 210]
          data: []
        },
        {
          name: "环比",
          type: "line",
          showSymbol: false,
          smooth: true,
          //data: [220, 182, 191, 234, 290, 330, 310]
          data: []
        },
        {
          name: "数量",
          type: "bar",
          barCategoryGap: "90%",
          itemStyle: {
            normal: {
              barBorderRadius: 20
            }
          },
          //data: [150, 232, 201, 154, 190, 330, 410]
          data: []
        }
      ]
    };
    //Request.post({
    //    url: GlobalData.dailyBriefingAlarmTotal,
    //    data: {gxjgdm: GlobalData.gxjgdm}

    this.props.dispatch(
      keyAlarmTotal(
        {
          gxjgdm: this.state.gxjgdm
        },
        res => {
          if (res["status"] === 200) {
            res["data"].forEach((e, i) => {
              zdgzjqOption.xAxis[0].data.push(e["AJZLMC_LEV3"]);
              zdgzjqOption.series[0].data.push(e["TB"]);
              zdgzjqOption.series[1].data.push(e["HB"]);
              zdgzjqOption.series[2].data.push(e["AJSL"]);
            });
            this.setState({ zdgzjq: zdgzjqOption });
          }
        }
      )
    );

    //   fetch({
    //     url: GlobalData.dailyBriefingAlarmTotal,
    //     method: "POST",
    //     data: { gxjgdm: GlobalData.gxjgdm }
    //   }).then(
    //     res => {
    //     if (res["status"] === 200) {
    //       res["data"].forEach((e, i) => {
    //         zdgzjqOption.xAxis[0].data.push(e["AJZLMC_LEV3"]);
    //         zdgzjqOption.series[0].data.push(e["TB"]);
    //         zdgzjqOption.series[1].data.push(e["HB"]);
    //         zdgzjqOption.series[2].data.push(e["AJSL"]);
    //       });
    //       this.setState({ zdgzjq: zdgzjqOption });
    //     }
    //   }
    // );
  }

  refreshZAAJ() {
    let zaajOption = {
      color: ["#16E77F", "#E9533B", "#60BDFF"],
      textStyle: { color: "white" },
      tooltip: { trigger: "axis" },
      legend: {
        bottom: "5%",
        textStyle: {
          color: "white",
          fontSize: 16
        },
        data: ["同比", "环比", "数量"]
      },
      grid: {
        left: "3%",
        top: "3%",
        bottom: "17%",
        right: "5%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          splitLine: {
            show: false
          },
          axisLabel: {
            fontSize: 16
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#84AFD2"
            }
          },
          //data: ['2017-8-16', '2017-8-18', '2017-8-20', '2017-8-22', '2017-8-24', '2017-8-26', '2017-8-28']
          data: []
        }
      ],
      yAxis: [
        {
          type: "value",
          splitLine: {
            show: false
          },
          axisLabel: {
            fontSize: 16
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#84AFD2"
            }
          }
        }
      ],
      series: [
        {
          name: "同比",
          type: "line",
          showSymbol: false,
          smooth: true,
          //data: [120, 132, 101, 134, 90, 230, 210]
          data: []
        },
        {
          name: "环比",
          type: "line",
          showSymbol: false,
          smooth: true,
          //data: [220, 182, 191, 234, 290, 330, 310]
          data: []
        },
        {
          name: "数量",
          type: "bar",
          barCategoryGap: "90%",
          itemStyle: {
            normal: {
              barBorderRadius: 20
            }
          },
          //data: [150, 232, 201, 154, 190, 330, 410]
          data: []
        }
      ]
    };

    this.props.dispatch(
      securityCaseYoyChain(
        {
          gxjgdm: this.state.gxjgdm
        },
        res => {
          if (res["status"] === 200) {
            res["data"].forEach((e, i) => {
              zaajOption.xAxis[0].data.push(e["SJD"]);
              zaajOption.series[0].data.push(e["TB"]);
              zaajOption.series[1].data.push(e["HB"]);
              zaajOption.series[2].data.push(e["AJSL"]);
            });
            this.setState({ zaaj: zaajOption });
          }
        }
      )
    );

    //   fetch({
    //     url: GlobalData.dailyBriefingSecurityCaseYoyChain,
    //     method: "POST",
    //     data: { gxjgdm: GlobalData.gxjgdm }
    //   }).then(
    //     res => {
    //     if (res["status"] === 200) {
    //       res["data"].forEach((e, i) => {
    //         zaajOption.xAxis[0].data.push(e["SJD"]);
    //         zaajOption.series[0].data.push(e["TB"]);
    //         zaajOption.series[1].data.push(e["HB"]);
    //         zaajOption.series[2].data.push(e["AJSL"]);
    //       });
    //       this.setState({ zaaj: zaajOption });
    //     }
    //   }
    // );
  }
  refreshZAANMR() {
    this.props.dispatch(
      securityCaseYoyChainTotal(
        {
          gxjgdm: this.state.gxjgdm
        },
        res => {
          if (res["status"] === 200 && res["data"].length > 0) {
            this.setState({
              zaajtotal: {
                ajsl: res["data"][0]["AJSL"],
                tb: res["data"][0]["TB"],
                hb: res["data"][0]["HB"]
              }
            });
          }
        }
      )
    );
    //   fetch({
    //     url: GlobalData.dailyBriefingSecurityCaseYoyChainTotal,
    //     method: "POST",
    //     data: { gxjgdm: GlobalData.gxjgdm }
    //   }).then(
    //     res => {
    //     if (res["status"] === 200 && res["data"].length > 0) {
    //       this.setState({
    //         zaajtotal: {
    //           ajsl: res["data"][0]["AJSL"],
    //           tb: res["data"][0]["TB"],
    //           hb: res["data"][0]["HB"]
    //         }
    //       });
    //     }
    //   }
    // );
  }

  refreshXSAJQY() {
    let xsajqyfbOption = {
      color: ["#36E471", "#217DC6"],
      textStyle: { color: "white" },
      tooltip: {
        trigger: "axis",
        textStyle: { fontSize: 16 }
      },
      legend: {
        show: false
      },
      grid: {
        left: "3%",
        top: "3%",
        bottom: "10%",
        right: "5%",
        containLabel: true
      },
      yAxis: [
        {
          type: "category",
          inverse: true,
          splitLine: {
            show: false
          },
          axisLabel: {
            fontSize: 16
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#84AFD2"
            }
          },
          data: []
        }
      ],
      xAxis: [
        {
          type: "value",
          splitLine: {
            show: false
          },
          axisLabel: {
            fontSize: 16
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#84AFD2"
            }
          }
        }
      ],
      series: [
        {
          z: 2,
          type: "bar",
          barCategoryGap: "70%",

          itemStyle: {
            normal: {
              barBorderRadius: 20
            }
          },
          //data: [150, 232, 201, 154, 190, 330, 410, 190, 330, 410]
          data: []
        },
        {
          z: 1,
          type: "bar",
          barGap: "-100%",
          barCategoryGap: "70%",
          itemStyle: {
            normal: {
              barBorderRadius: 20
            }
          },
          data: []
        }
      ]
    };
    this.props.dispatch(
      criminalCaseAreaDistribution(
        {
          gxjgdm: this.state.gxjgdm
        },
        res => {
          if (res["status"] === 200) {
            res["data"].forEach((e, i) => {
              xsajqyfbOption.yAxis[0].data.push(e["AFD"]);
              xsajqyfbOption.series[0].data.push(e["AJSL"]);
            });
            this.setState({ xsajqyfb: xsajqyfbOption });
          }
        }
      )
    );

    //   fetch({
    //     url: GlobalData.dailyBriefingCriminalCaseAreaDistribution,
    //     method: "POST",
    //     data: { gxjgdm: GlobalData.gxjgdm }
    //   }).then(
    //     res => {
    //     if (res["status"] === 200) {
    //       res["data"].forEach((e, i) => {
    //         xsajqyfbOption.yAxis[0].data.push(e["AFD"]);
    //         xsajqyfbOption.series[0].data.push(e["AJSL"]);
    //       });
    //       this.setState({ xsajqyfb: xsajqyfbOption });
    //     }
    //   }
    // );
  }

  refreshWBYJ() {
    //网吧预警
    let wbyjOption = {
      color1: [
        "#5DF97A",
        "#46B8F2",
        "#E17AFA",
        "#FBC340",
        "#E18074",
        "#74EED9",
        "#FA73A5"
      ],
      color2: [
        "#52C867",
        "#2F94BD",
        "#C169D7",
        "#CBA033",
        "#CB6D58",
        "#58BEB0",
        "#C55C85"
      ],
      textStyle: { color: "white" },
      title: {
        text: "12人",
        top: "middle",
        left: "center",
        textStyle: {
          color: "white",
          fontSize: 30,
          fontWeight: 200
        }
      },
      tooltip: {
        show: true,
        textStyle: {
          fontSize: 16
        }
      },
      legend: {
        show: false
      },
      grid: {
        left: "3%",
        top: "3%",
        bottom: "10%",
        right: "5%",
        containLabel: true
      },
      series: [
        {
          name: "",
          center: ["50%", "50%"],
          radius: ["60%", "65%"],
          startAngle: 90,
          hoverAnimation: false,
          type: "pie",
          label: {
            normal: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          // data: [100, 100, 100, 100, 100, 100, 100]
          data: []
        },

        {
          name: "",
          center: ["50%", "50%"],
          radius: ["64.8%", "70%"],
          startAngle: 90,
          hoverAnimation: false,
          type: "pie",
          label: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 16
              }
            }
          },
          labelLine: {
            normal: {
              show: true
            }
          },

          data: []
        }
      ]
    };
    this.props.dispatch(
      selectInternetBarWarning(
        {
          gxjgdm: this.state.gxjgdm,
          beginTime: this.state.beginTime,
          endTime: this.state.endTime
        },
        res => {
          if (res["status"] === 200) {
            let sum = res["data"].reduce((sum, elem, index) => {
              wbyjOption.series[0].data.push({
                name: elem["RYLX"],
                value: elem["SL"],
                itemStyle: {
                  normal: {
                    color: wbyjOption.color1[index]
                  }
                }
              });
              wbyjOption.series[1].data.push({
                name: elem["RYLX"],
                value: elem["SL"],
                itemStyle: {
                  normal: {
                    color: wbyjOption.color2[index]
                  }
                }
              });
              return sum + elem["SL"];
            }, 0);
            wbyjOption.title.text = `${sum}人`;
            this.setState({ wbyj: wbyjOption });
          }
        }
      )
    );
    //   fetch({
    //     url: GlobalData.socialSelectInternetBarWarning,
    //     method: "POST",
    //     data: {
    //       gxjgdm: GlobalData.gxjgdm,
    //       beginTime: this.state.beginTime,
    //       endTime: this.state.endTime
    //     }
    //   }).then(
    //     res => {
    //     if (res["status"] === 200) {
    //       let sum = res["data"].reduce((sum, elem, index) => {
    //         wbyjOption.series[0].data.push({
    //           name: elem["RYLX"],
    //           value: elem["SL"],
    //           itemStyle: {
    //             normal: {
    //               color: wbyjOption.color1[index]
    //             }
    //           }
    //         });
    //         wbyjOption.series[1].data.push({
    //           name: elem["RYLX"],
    //           value: elem["SL"],
    //           itemStyle: {
    //             normal: {
    //               color: wbyjOption.color2[index]
    //             }
    //           }
    //         });
    //         return sum + elem["SL"];
    //       }, 0);
    //       wbyjOption.title.text = `${sum}人`;
    //       this.setState({ wbyj: wbyjOption });
    //     }
    //   }
    // );
  }

  refreshLDYJ() {
    //旅店预警
    let ldyjOption = {
      color1: [
        "#5DF97A",
        "#46B8F2",
        "#E17AFA",
        "#FBC340",
        "#E18074",
        "#74EED9",
        "#FA73A5"
      ],
      color2: [
        "#52C867",
        "#2F94BD",
        "#C169D7",
        "#CBA033",
        "#CB6D58",
        "#58BEB0",
        "#C55C85"
      ],
      textStyle: { color: "white" },
      title: {
        text: "",
        top: "middle",
        left: "center",
        textStyle: {
          color: "white",
          fontSize: 30,
          fontWeight: 200
        }
      },
      tooltip: {
        show: true,
        textStyle: {
          fontSize: 16
        }
      },
      legend: {
        show: false
      },
      grid: {
        left: "3%",
        top: "3%",
        bottom: "10%",
        right: "5%",
        containLabel: true
      },
      series: [
        {
          name: "",
          center: ["50%", "50%"],
          radius: ["60%", "65%"],
          startAngle: 90,
          hoverAnimation: false,
          type: "pie",
          label: {
            normal: {
              show: false,
              textStyle: {
                fontSize: 16
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          // data: [100, 100, 100, 100, 100, 100, 100]
          data: []
        },

        {
          name: "",
          center: ["50%", "50%"],
          radius: ["64.8%", "70%"],
          startAngle: 90,
          hoverAnimation: false,
          type: "pie",
          label: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 16
              }
            }
          },
          labelLine: {
            normal: {
              show: true
            }
          },

          data: []
        }
      ]
    };
    this.props.dispatch(
      selectHotelWarning(
        {
          gxjgdm: this.state.gxjgdm,
          beginTime: this.state.beginTime,
          endTime: this.state.endTime
        },
        res => {
          if (res["status"] === 200) {
            let sum = res["data"].reduce((sum, elem, index) => {
              ldyjOption.series[0].data.push({
                name: elem["RYLX"],
                value: elem["SL"],
                itemStyle: {
                  normal: {
                    color: ldyjOption.color1[index]
                  }
                }
              });
              ldyjOption.series[1].data.push({
                name: elem["RYLX"],
                value: elem["SL"],
                itemStyle: {
                  normal: {
                    color: ldyjOption.color2[index]
                  }
                }
              });
              return sum + elem["SL"];
            }, 0);
            ldyjOption.title.text = `${sum}人`;
            this.setState({ ldyj: ldyjOption });
          }
        }
      )
    );

    //   fetch({
    //     url: GlobalData.socialSelectHotelWarning,
    //     method: "POST",
    //     data: {
    //       gxjgdm: GlobalData.gxjgdm,
    //       beginTime: this.state.beginTime,
    //       endTime: this.state.endTime
    //     }
    //   }).then(
    //     res => {
    //     if (res["status"] === 200) {
    //       let sum = res["data"].reduce((sum, elem, index) => {
    //         ldyjOption.series[0].data.push({
    //           name: elem["RYLX"],
    //           value: elem["SL"],
    //           itemStyle: {
    //             normal: {
    //               color: ldyjOption.color1[index]
    //             }
    //           }
    //         });
    //         ldyjOption.series[1].data.push({
    //           name: elem["RYLX"],
    //           value: elem["SL"],
    //           itemStyle: {
    //             normal: {
    //               color: ldyjOption.color2[index]
    //             }
    //           }
    //         });
    //         return sum + elem["SL"];
    //       }, 0);
    //       ldyjOption.title.text = `${sum}人`;
    //       this.setState({ ldyj: ldyjOption });
    //     }
    //   }
    // );
  }
  componentWillMount() {
    //重点刑事案件时间段同比、环比
    this.refreshZDXSAJ();
    //重点关注警情每日总量同比、环比
    this.refreshZDGZJQ();

    //治安事案件时间段同比、环比

    //治安案件每日总量同比、环比
    this.refreshZAANMR();

    //刑事案件区域分布情况
    this.refreshXSAJQY();

    this.refreshWBYJ();

    // setTimeout(() => {
    this.refreshZAAJ();

    this.refreshLDYJ();

    //   }, 1500);

    //网吧人员
    this.refreshWBRY();

    //旅店人员
    this.refreshLDRY();
  }

  render() {
    return (
      <div id="dailyBriefing">
        <div className="briefing">
          <div className="briefing-left">
            <div className="title">每日简报</div>
            <div>
              <div className="briefing-left-chart fl">
                <ChartPanel title="重点刑事案件" option={this.state.zdxsaj} />
              </div>
              <div className="briefing-left-panel fl">
                <div>
                  <div>重点刑事类案情</div>
                  <div>
                    <span className="chart-panel-num">
                      {this.state.zsxsajtotal.ajsl}
                    </span>起
                  </div>
                </div>
                <div>
                  <div>
                    同比
                    <span className="chart-panel-num">
                      {this.state.zsxsajtotal.tb}
                    </span>%
                    <img className="imgLine" src={ImgUp} alt="" />
                  </div>
                </div>
                <div>
                  <div>
                    环比
                    <span className="chart-panel-num">
                      {this.state.zsxsajtotal.hb}
                    </span>%
                    <img className="imgLine" src={ImgDown} alt="" />
                  </div>
                </div>
              </div>
              <div className="briefing-left-chart fl">
                <ChartPanel title="重点关注警情" option={this.state.zdgzjq} />
              </div>
            </div>
            <div>
              <div className="briefing-left-chart fl">
                <ChartPanel title="治安案件" option={this.state.zaaj} />
              </div>
              <div className="briefing-left-panel fl">
                <div>
                  <div>治安案件</div>
                  <div>
                    <span className="chart-panel-num">
                      {this.state.zaajtotal.ajsl}
                    </span>起
                  </div>
                </div>
                <div>
                  <div>
                    同比
                    <span className="chart-panel-num">
                      {this.state.zaajtotal.tb}
                    </span>%
                    <img className="imgLine" src={ImgUp} alt="" />
                  </div>
                </div>
                <div>
                  <div>
                    环比
                    <span className="chart-panel-num">
                      {this.state.zaajtotal.hb}
                    </span>%
                    <img className="imgLine" src={ImgDown} alt="" />
                  </div>
                </div>
              </div>
              <div className="briefing-left-chart fl">
                <ChartPanel
                  title="刑事案件区域分布情况"
                  option={this.state.xsajqyfb}
                />
              </div>
            </div>
          </div>
          <div className="briefing-right">
            <div className="title">预警</div>
            <div className="briefing-right-chart">
              <ChartPanel title="网吧预警" option={this.state.wbyj} />
            </div>
            <div className="briefing-right-chart">
              <ChartPanel title="旅店预警" option={this.state.ldyj} />
            </div>
          </div>
        </div>
        <div className="yujingrenyuan">
          <div>
            <div className="tables dataTables-box1">
              <div className="table-title flex-middle-center">网吧预警人员</div>
              {/*<DataTables heads={this.state.wbryHead} data={this.state.wbryData}/>*/}
              <table>
                <thead>
                  <tr>
                    <th>人员</th>
                    <th>身份证</th>
                    <th>预警积分</th>
                    <th>类型</th>
                    <th>级别</th>
                    <th>预警场所</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.wbryData.map((e, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <div>
                            <a title={e["XM"]}>{e["XM"]}</a>
                          </div>
                        </td>
                        <td>
                          <div>
                            <a title={e["GMSFHM"]}>{e["GMSFHM"]}</a>
                          </div>
                        </td>
                        <td>
                          <div>
                            <a title={e["YJJF"]}>{e["YJJF"]}</a>
                          </div>
                        </td>
                        <td>
                          <div>
                            <a title={e["RYLX"]}>{e["RYLX"]}</a>
                          </div>
                        </td>
                        <td>
                          <div>
                            <a title={e["JB"]}>{e["JB"]}</a>
                          </div>
                        </td>
                        <td>
                          <div>
                            <a title={e["YYCSMC"]}>{e["YYCSMC"]}</a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="tables dataTables-box1">
              <div className="table-title flex-middle-center">旅店预警人员</div>
              {/*<DataTables heads={this.state.ldryHead} data={this.state.ldryData}/>*/}
              <table>
                <thead>
                  <tr>
                    <th>人员</th>
                    <th>身份证</th>
                    <th>预警积分</th>
                    <th>类型</th>
                    <th>级别</th>
                    <th>预警场所</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.ldryData.map((e, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <div>
                            <a title={e["XM"]}>{e["XM"]}</a>
                          </div>
                        </td>
                        <td>
                          <div>
                            <a title={e["GMSFHM"]}>{e["GMSFHM"]}</a>
                          </div>
                        </td>
                        <td>
                          <div>
                            <a title={e["YJJF"]}>{e["YJJF"]}</a>
                          </div>
                        </td>
                        <td>
                          <div>
                            <a title={e["RYLX"]}>{e["RYLX"]}</a>
                          </div>
                        </td>
                        <td>
                          <div>
                            <a title={e["JB"]}>{e["JB"]}</a>
                          </div>
                        </td>
                        <td>
                          <div>
                            <a title={e["YYCSMC"]}>{e["YYCSMC"]}</a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
