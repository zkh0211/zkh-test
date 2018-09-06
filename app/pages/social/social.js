import React, { Component } from "react";
// import HeaderNav from '../common/headerNav';
import "./social.css";
import { connect } from "react-redux";
import TitleLine from "../../images/social/line.svg";
import TitleImage from "../../images/social/zs.png";
import Echarts from "../common/echarts";
import TimeLine from "../common/timeLine";
// import GlobalData from '../../util/globalData';
// import fetch from "../common/fetch";
import Cookies from "js-cookie";

import {
  selectNewImportantPlace,
  selectTotalImportantPlace,
  selectEntryExitPeoAdd,
  selectEntryExitPeoTotal,
  selectAboveSixtyAdd,
  selectAboveSixtyTotal,
  roadTrafficAdd,
  roadTrafficTotal,
  newImportantPlace,
  prisonWatchhouseRehabAdd,
  prisonWatchhouseRehabAddTotal,
  selectInternetBarWarning,
  selectInternetBarPeople,
  selectInternetBarTop10,
  selectHotelWarning,
  selectHotelTop10,
  selectHotelPeople,
  selectMigrantSexRatio,
  selectMigrantAge,
  selectMigrantPeople,
  listCode,
  save
} from "actions/social";
@connect((state, props) => ({
  config: state.config
}))
export default class Social extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gxjgdm: Cookies.get("gxjgdm"),
      // gxjgdm: "150100000000",

      beginTime: new Date().getFullYear().toString(),
      endTime: new Date().getFullYear().toString(),
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
          text: "预警网吧",
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
          text: "预警旅馆",
          key: "YYCSMC"
        }
      ],
      ldrkHead: [
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
          text: "预警旅馆",
          key: "YYCSMC"
        }
      ],

      zdcssl: {},
      crjrysl: {},
      rksl: {},
      dljt: {},
      jsrysl: {},
      wbyj: {},
      ldyj: {},
      wbpm: {},
      ldpm: {},
      ldrkPie: {},
      ldrkBar: {},
      wbryData: [],
      ldryData: [],
      ldrkData: []
    };
  }

  static sortAsc(a, b) {
    return parseInt(a, 10) - parseInt(b, 10);
  }

  //重点场所数量趋势发展情况
  refreshZDCSSL() {
    let zdcsslOption = {
      title: {
        text: "重点场所数量、趋势发展情况",
        top: "3%",
        left: "center",
        textStyle: {
          color: "white",
          fontSize: 20,
          fontWeight: 100
        }
      },
      /* graphic: [
                {
                    type: 'image',
                    left: '5%',
                    right: '5%',
                    top: '12%',
                    style: {
                        image: TitleLine
                    }
                }
            ],*/
      color: ["#5C84C8", "#E16FBC", "#5C84C8", "#E16FBC"],
      textStyle: { color: "white" },
      tooltip: {
        trigger: "axis",
        textStyle: {
          fontSize: 16
        }
      },
      legend: {
        bottom: "3%",
        itemWidth: 6,
        itemHeight: 10,
        borderRadius: 0,
        textStyle: {
          color: "white",
          fontSize: 16
        },
        data: []
      },
      grid: {
        left: "3%",
        top: "25%",
        bottom: "15%",
        right: "5%",
        containLabel: true
      },
      xAxis: {
        type: "category",
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: "#84AFD2"
          }
        },
        splitArea: {
          interval: 0,
          show: true,
          areaStyle: {
            color: ["#021D3A", "#0B2850"]
          }
        },
        axisLabel: {
          fontSize: "16"
        },
        data: []
      },
      yAxis: [
        {
          position: "left",
          name: "总量",
          type: "value",
          nameTextStyle: {
            fontSize: 16
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#84AFD2"
            }
          },
          axisLabel: {
            fontSize: "16"
          }
        },
        {
          position: "right",
          name: "增量",
          type: "value",
          nameTextStyle: {
            fontSize: 16
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#84AFD2"
            }
          },
          axisLabel: {
            fontSize: "16"
          }
        }
      ],
      series: []
    };

    // this.props.dispatch(
    //   selectNewImportantPlace(
    //     {
    //       gxjgdm: "150100000000",
    //       beginTime: this.state.beginTime,
    //       endTime: this.state.endTime
    //     },
    //     res => {
    //       if (res.data.length > 0) {
    //         console.log(res.data[0]);
    //         console.log(res.data[1]);

    //         zdcsslOption.xAxis.data.sort(this.sortAsc);
    //         this.setState({
    //           zdcssl: zdcsslOption
    //         });
    //       } else {
    //         console.log(11);
    //       }
    //     }
    //   )
    // );
    let newImportantPlace = new Promise((resolve, reject) => {
      //Request.post({
      //    url: GlobalData.socialSelectNewImportantPlace,
      //    data: {gxjgdm: GlobalData.gxjgdm, beginTime: this.state.beginTime, endTime: this.state.endTime}
      this.props.dispatch(
        selectNewImportantPlace(
          {
            gxjgdm: this.state.gxjgdm,
            beginTime: this.state.beginTime,
            endTime: this.state.endTime
          },
          res => {
            if (res.status === 200) {
              if (res.data.length > 0) {
                resolve(res);
              }
            }
          }
        )
      );
    });

    let totalImportantPlace = new Promise((resolve, reject) => {
      //Request.post({
      //    url: GlobalData.socialSelectTotalImportantPlace,
      //    data: {gxjgdm: GlobalData.gxjgdm, beginTime: this.state.beginTime, endTime: this.state.endTime}
      this.props.dispatch(
        selectTotalImportantPlace(
          {
            gxjgdm: this.state.gxjgdm,
            beginTime: this.state.beginTime,
            endTime: this.state.endTime
          },
          res => {
            if (res.status === 200) {
              if (res.data.length > 0) {
                resolve(res);
              }
            }
          }
        )
      );
    });
    Promise.all([newImportantPlace, totalImportantPlace]).then(data => {
      //新增柱图
      data[0]["data"].forEach((category, index) => {
        let item = {
          yAxisIndex: 1,
          type: "bar",
          barCategoryGap: "70%",
          itemStyle: {
            normal: {
              barBorderRadius: 20
            }
          },
          data: []
        };
        category.forEach((categoryData, index) => {
          zdcsslOption.xAxis.data.indexOf(categoryData["TJRQ"]) === -1
            ? zdcsslOption.xAxis.data.push(categoryData["TJRQ"])
            : null;
          zdcsslOption.legend.data.indexOf(categoryData["CSLX"]) === -1
            ? zdcsslOption.legend.data.push(categoryData["CSLX"])
            : null;
          if (!item.hasOwnProperty("name")) item.name = categoryData["CSLX"];
          item.data.push({
            name: categoryData["TJRQ"],
            value: categoryData["XZSL"]
          });
        });
        zdcsslOption.series.push(item);
      });

      //总量线图
      data[1]["data"].forEach((category, index) => {
        let item = {
          type: "line",
          smooth: true,
          showSymbol: false,
          data: []
        };
        category.forEach((categoryData, index) => {
          zdcsslOption.xAxis.data.indexOf(categoryData["TJRQ"]) === -1
            ? zdcsslOption.xAxis.data.push(categoryData["TJRQ"])
            : null;
          if (!item.hasOwnProperty("name")) item.name = categoryData["CSLX"];
          zdcsslOption.legend.data.indexOf(categoryData["CSLX"]) === -1
            ? zdcsslOption.legend.data.push(categoryData["CSLX"])
            : null;
          item.data.push({
            name: categoryData["TJRQ"],
            value: categoryData["ZSL"]
          });
        });
        zdcsslOption.series.push(item);
      });
      zdcsslOption.xAxis.data.sort(this.sortAsc);
      this.setState({
        zdcssl: zdcsslOption
      });
    });
  }

  //出入境人员数量趋势发展情况
  refreshCRJRYSL() {
    let crjryslOption = {
      title: {
        text: "出入境人员数量、趋势发展情况",
        top: "3%",
        left: "center",
        textStyle: {
          color: "white",
          fontSize: "20",
          fontWeight: 100
        }
      },
      /* graphic: [
                {
                    type: 'image',
                    left: '5%',
                    right: '5%',
                    top: '12%',
                    style: {
                        image: TitleLine
                    }
                }
            ],*/
      color: ["#F28F66", "#57C69C", "#F3E88C"],
      textStyle: { color: "white" },
      tooltip: {
        trigger: "axis",
        textStyle: {
          fontSize: 16
        }
      },
      legend: {
        bottom: "3%",
        itemWidth: 6,
        itemHeight: 10,
        borderRadius: 0,
        textStyle: {
          color: "white",
          fontSize: 16
        },
        data: []
      },
      grid: {
        left: "3%",
        top: "25%",
        bottom: "15%",
        right: "5%",
        containLabel: true
      },
      xAxis: {
        type: "category",
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: "#84AFD2"
          }
        },
        splitArea: {
          interval: 0,
          show: true,
          areaStyle: {
            color: ["#021D3A", "#0B2850"]
          }
        },
        axisLabel: {
          fontSize: 16
        },
        data: []
      },
      yAxis: [
        {
          position: "left",
          name: "总量",
          type: "value",
          nameTextStyle: {
            fontSize: 16
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#84AFD2"
            }
          },
          axisLabel: {
            fontSize: 16
          }
        },
        {
          position: "right",
          name: "增量",
          type: "value",
          nameTextStyle: {
            fontSize: 16
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#84AFD2"
            }
          },
          axisLabel: {
            fontSize: 16
          }
        }
      ],
      series: []
    };

    let entryExitPeoAdd = new Promise((resolve, reject) => {
      //Request.post({
      //    url: GlobalData.socialSelectEntryExitPeoAdd,
      //    data: {gxjgdm: GlobalData.gxjgdm, beginTime: this.state.beginTime, endTime: this.state.endTime}
      this.props.dispatch(
        selectEntryExitPeoAdd(
          {
            gxjgdm: this.state.gxjgdm,
            beginTime: this.state.beginTime,
            endTime: this.state.endTime
          },
          res => {
            if (res.status === 200) {
              if (res.data.length > 0) {
                resolve(res);
              }
            }
          }
        )
      );
    });

    let entryExitPeoTotal = new Promise((resolve, reject) => {
      //Request.post({
      //    url: GlobalData.socialSelectEntryExitPeoTotal,
      //    data: {gxjgdm: GlobalData.gxjgdm, beginTime: this.state.beginTime, endTime: this.state.endTime}
      this.props.dispatch(
        selectEntryExitPeoTotal(
          {
            gxjgdm: this.state.gxjgdm,
            beginTime: this.state.beginTime,
            endTime: this.state.endTime
          },
          res => {
            if (res.status === 200) {
              if (res.data.length > 0) {
                resolve(res);
              }
            }
          }
        )
      );
      //   fetch({
      //     url: GlobalData.socialSelectEntryExitPeoTotal,
      //     method: "POST",
      //     data: {
      //       gxjgdm: GlobalData.gxjgdm,
      //       beginTime: this.state.beginTime,
      //       endTime: this.state.endTime
      //     }
      //   }).then(
      //     res => {
      //     if (res.status === 200) {
      //       if (res.data.length > 0) {
      //         resolve(res);
      //       }
      //     }
      //   }
      // );
    });
    Promise.all([entryExitPeoAdd, entryExitPeoTotal]).then(data => {
      //新增柱图
      data[0]["data"].forEach((category, index) => {
        let item = {
          yAxisIndex: 1,
          type: "bar",
          barCategoryGap: "60%",
          itemStyle: {
            normal: {
              barBorderRadius: 20
            }
          },
          data: []
        };
        category.forEach((categoryData, index) => {
          crjryslOption.xAxis.data.indexOf(categoryData["TJRQ"]) === -1
            ? crjryslOption.xAxis.data.push(categoryData["TJRQ"])
            : null;
          crjryslOption.legend.data.indexOf(categoryData["HZLX"]) === -1
            ? crjryslOption.legend.data.push(categoryData["HZLX"])
            : null;
          if (!item.hasOwnProperty("name")) item.name = categoryData["HZLX"];
          item.data.push({
            name: categoryData["TJRQ"],
            value: categoryData["XZSL"]
          });
        });
        crjryslOption.series.push(item);
      });

      //总量线图
      data[1]["data"].forEach((category, index) => {
        let item = {
          type: "line",
          showSymbol: false,
          smooth: true,
          data: []
        };
        category.forEach((categoryData, index) => {
          crjryslOption.xAxis.data.indexOf(categoryData["TJRQ"]) === -1
            ? crjryslOption.xAxis.data.push(categoryData["TJRQ"])
            : null;
          crjryslOption.legend.data.indexOf(categoryData["HZLX"]) === -1
            ? crjryslOption.legend.data.push(categoryData["HZLX"])
            : null;
          if (!item.hasOwnProperty("name")) item.name = categoryData["HZLX"];
          item.data.push({
            name: categoryData["TJRQ"],
            value: categoryData["ZSL"]
          });
        });
        crjryslOption.series.push(item);
      });
      crjryslOption.xAxis.data.sort(this.sortAsc);
      this.setState({
        crjrysl: crjryslOption
      });
    });
  }

  //人口60岁以上数量趋势发展情况
  refreshRKSL() {
    let rkslOption = {
      title: {
        text: "人口（60岁以上）数量、趋势发展情况",
        top: "3%",
        left: "center",
        textStyle: {
          color: "white",
          fontSize: "20",
          fontWeight: 100
        }
      },
      /*  graphic: [
                {
                    type: 'image',
                    left: '5%',
                    right: '5%',
                    top: '12%',
                    style: {
                        image: TitleLine
                    }
                }
            ],*/
      color: ["#DDCA6C", "#DDCA6C"],
      textStyle: { color: "white" },
      tooltip: {
        trigger: "axis",
        textStyle: {
          fontSize: 16
        }
      },
      legend: {
        bottom: "3%",
        itemWidth: 6,
        itemHeight: 10,
        borderRadius: 0,
        textStyle: {
          color: "white",
          fontSize: 16
        },
        data: ["60岁以上老人增量", "60岁以上老人总量"]
      },
      grid: {
        left: "3%",
        top: "25%",
        bottom: "15%",
        right: "5%",
        containLabel: true
      },
      xAxis: {
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
        splitArea: {
          interval: 0,
          show: true,
          areaStyle: {
            color: ["#021D3A", "#0B2850"]
          }
        },
        data: []
      },
      yAxis: [
        {
          name: "总量",
          position: "left",
          type: "value",
          splitLine: {
            show: false
          },
          nameTextStyle: {
            fontSize: 16
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
        },
        {
          name: "增量",
          position: "right",
          type: "value",
          splitLine: {
            show: false
          },
          nameTextStyle: {
            fontSize: 16
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
          name: "60岁以上老人增量",
          yAxisIndex: 1,
          type: "bar",
          barCategoryGap: "80%",
          itemStyle: {
            normal: {
              barBorderRadius: 20
            }
          },
          data: []
        },
        {
          name: "60岁以上老人总量",
          type: "line",
          smooth: true,
          showSymbol: false,
          data: []
        }
      ]
    };
    this.props.dispatch(
      selectAboveSixtyAdd(
        {
          gxjgdm: this.state.gxjgdm,
          beginTime: this.state.beginTime,
          endTime: this.state.endTime
        },
        res => {
          if (res.data) {
            // console.log(res.data);
          } else {
            // console.log(11);
          }
        }
      )
    );

    let aboveSixtyAdd = new Promise((resolve, reject) => {
      //Request.post({
      //    url: GlobalData.socialSelectAboveSixtyAdd,
      //    data: {gxjgdm: GlobalData.gxjgdm, beginTime: this.state.beginTime, endTime: this.state.endTime}

      this.props.dispatch(
        selectAboveSixtyAdd(
          {
            gxjgdm: this.state.gxjgdm,
            beginTime: this.state.beginTime,
            endTime: this.state.endTime
          },
          res => {
            if (res.status === 200) {
              if (res.data.length > 0) {
                resolve(res);
              }
            }
          }
        )
      );
      //   fetch({
      //     url: GlobalData.socialSelectAboveSixtyAdd,
      //     method: "POST",
      //     data: {
      //       gxjgdm: GlobalData.gxjgdm,
      //       beginTime: this.state.beginTime,
      //       endTime: this.state.endTime
      //     }
      //   }).then(
      //     res => {
      //     if (res.status === 200) {
      //       if (res.data.length > 0) {
      //         resolve(res);
      //       }
      //     }
      //   }
      // );
    });

    let aboveSixtyTotal = new Promise((resolve, reject) => {
      //Request.post({
      //    url: GlobalData.socialSelectAboveSixtyTotal,
      //    data: {gxjgdm: GlobalData.gxjgdm, beginTime: this.state.beginTime, endTime: this.state.endTime}
      this.props.dispatch(
        selectAboveSixtyTotal(
          {
            gxjgdm: this.state.gxjgdm,
            beginTime: this.state.beginTime,
            endTime: this.state.endTime
          },
          res => {
            resolve(res);
          }
        )
      );
      //   fetch({
      //     url: GlobalData.socialSelectAboveSixtyTotal,
      //     method: "POST",
      //     data: {
      //       gxjgdm: GlobalData.gxjgdm,
      //       beginTime: this.state.beginTime,
      //       endTime: this.state.endTime
      //     }
      //   }).then(
      //     res => {
      //     resolve(res);
      //   }
      // );
    });

    Promise.all([aboveSixtyAdd, aboveSixtyTotal]).then(data => {
      //新增柱图
      data[0]["data"].forEach((elem, index) => {
        rkslOption.xAxis.data.indexOf(elem["TJRQ"]) === -1
          ? rkslOption.xAxis.data.push(elem["TJRQ"])
          : null;
        rkslOption.series[0].data.push({
          name: elem["TJRQ"],
          value: elem["XZSL"]
        });
      });
      //总量线图
      data[1]["data"].forEach((elem, index) => {
        rkslOption.xAxis.data.indexOf(elem["TJRQ"]) === -1
          ? rkslOption.xAxis.data.push(elem["TJRQ"])
          : null;
        rkslOption.series[1].data.push({
          name: elem["TJRQ"],
          value: elem["ZSL"]
        });
      });
      rkslOption.xAxis.data.sort(this.sortAsc);
      this.setState({
        rksl: rkslOption
      });
    });
  }

  //道路交通
  refreshDLJT() {
    let dljtOption = {
      title: {
        text: "道路交通（违章及60岁以上驾驶员情况）",
        top: "3%",
        left: "center",
        textStyle: {
          color: "white",
          fontSize: 20,
          fontWeight: 100
        }
      },
      /*  graphic: [
                {
                    type: 'image',
                    left: '5%',
                    right: '5%',
                    top: '12%',
                    style: {
                        image: TitleLine
                    }
                }
            ],*/
      color: ["#5C84C8", "#E16FBC", "#5C84C8", "#E16FBC"],
      textStyle: { color: "white" },
      tooltip: {
        trigger: "axis",
        textStyle: {
          fontSize: 16
        }
      },
      legend: {
        bottom: "3%",
        itemWidth: 6,
        itemHeight: 10,
        borderRadius: 0,
        textStyle: {
          color: "white",
          fontSize: 16
        },
        data: []
      },
      grid: {
        left: "3%",
        top: "25%",
        bottom: "15%",
        right: "5%",
        containLabel: true
      },
      xAxis: {
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
        splitArea: {
          interval: 0,
          show: true,
          areaStyle: {
            color: ["#021D3A", "#0B2850"]
          }
        },
        data: []
      },
      yAxis: [
        {
          position: "left",
          name: "总量",
          type: "value",
          splitLine: {
            show: false
          },
          nameTextStyle: {
            fontSize: 16
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
        },
        {
          position: "right",
          name: "增量",
          type: "value",
          splitLine: {
            show: false
          },
          nameTextStyle: {
            fontSize: 16
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
      series: []
    };

    let roadTrafficAdd1 = new Promise((resolve, reject) => {
      //Request.post({
      //    url: GlobalData.socialRoadTrafficAdd,
      //    data: {gxjgdm: GlobalData.gxjgdm, beginTime: this.state.beginTime, endTime: this.state.endTime}
      this.props.dispatch(
        roadTrafficAdd(
          {
            gxjgdm: this.state.gxjgdm,
            beginTime: this.state.beginTime,
            endTime: this.state.endTime
          },
          res => {
            if (res.status === 200) {
              if (res.data.length > 0) {
                resolve(res);
              }
            }
          }
        )
      );
    });

    let roadTrafficTotal1 = new Promise((resolve, reject) => {
      this.props.dispatch(
        roadTrafficTotal(
          {
            gxjgdm: this.state.gxjgdm,
            beginTime: this.state.beginTime,
            endTime: this.state.endTime
          },
          res => {
            if (res.status === 200) {
              if (res.data.length > 0) {
                resolve(res);
              }
            }
          }
        )
      );
    });

    Promise.all([roadTrafficAdd1, roadTrafficTotal1]).then(data => {
      //新增柱图
      data[0]["data"].forEach((category, index) => {
        let item = {
          yAxisIndex: 1,
          type: "bar",
          barCategoryGap: "70%",
          itemStyle: {
            normal: {
              barBorderRadius: 20
            }
          },
          data: []
        };
        category.forEach((categoryData, index) => {
          dljtOption.xAxis.data.indexOf(categoryData["TJRQ"]) === -1
            ? dljtOption.xAxis.data.push(categoryData["TJRQ"])
            : null;
          dljtOption.legend.data.indexOf(categoryData["LX"]) === -1
            ? dljtOption.legend.data.push(categoryData["LX"])
            : null;
          if (!item.hasOwnProperty("name")) item.name = categoryData["LX"];
          item.data.push({
            name: categoryData["TJRQ"],
            value: categoryData["XZSL"]
          });
        });
        dljtOption.series.push(item);
      });

      //总量线图
      data[1]["data"].forEach((category, index) => {
        let item = {
          type: "line",
          showSymbol: false,
          smooth: true,
          data: []
        };
        category.forEach((categoryData, index) => {
          dljtOption.xAxis.data.indexOf(categoryData["TJRQ"]) === -1
            ? dljtOption.xAxis.data.push(categoryData["TJRQ"])
            : null;
          dljtOption.legend.data.indexOf(categoryData["LX"]) === -1
            ? dljtOption.legend.data.push(categoryData["LX"])
            : null;
          if (!item.hasOwnProperty("name")) item.name = categoryData["LX"];
          item.data.push({
            name: categoryData["TJRQ"],
            value: categoryData["ZSL"]
          });
        });
        dljtOption.series.push(item);
      });
      dljtOption.xAxis.data.sort(this.sortAsc);
      this.setState({
        dljt: dljtOption
      });
    });
  }

  //监所人员数量趋势发展情况
  refreshJSRYSL() {
    let jsryslOption = {
      title: {
        text: "监所人员数量、趋势发展情况",
        top: "3%",
        left: "center",
        textStyle: {
          color: "white",
          fontSize: 20,
          fontWeight: 100
        }
      },
      /* graphic: [
                {
                    type: 'image',
                    left: '5%',
                    right: '5%',
                    top: '12%',
                    style: {
                        image: TitleLine
                    }
                }
            ],*/
      color: ["#F28F66", "#57C69C", "#F3E88C"],
      textStyle: { color: "white" },
      tooltip: {
        trigger: "axis",
        textStyle: {
          fontSize: 16
        }
      },
      legend: {
        bottom: "3%",
        itemWidth: 6,
        itemHeight: 10,
        borderRadius: 0,
        textStyle: {
          color: "white",
          fontSize: 16
        },
        data: []
      },
      grid: {
        left: "3%",
        top: "25%",
        bottom: "15%",
        right: "5%",
        containLabel: true
      },
      xAxis: {
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
        splitArea: {
          interval: 0,
          show: true,
          areaStyle: {
            color: ["#021D3A", "#0B2850"]
          }
        },
        data: []
      },
      yAxis: [
        {
          position: "left",
          name: "总量",
          type: "value",
          splitLine: {
            show: false
          },
          nameTextStyle: {
            fontSize: 16
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
        },
        {
          position: "right",
          name: "增量",
          type: "value",
          splitLine: {
            show: false
          },
          nameTextStyle: {
            fontSize: 16
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
      series: []
    };

    let rehabAdd = new Promise((resolve, reject) => {
      //Request.post({
      //    url: GlobalData.socialPrisonWatchHouseRehabAdd,
      //    data: {gxjgdm: GlobalData.gxjgdm, beginTime: this.state.beginTime, endTime: this.state.endTime}
      this.props.dispatch(
        prisonWatchhouseRehabAdd(
          {
            gxjgdm: this.state.gxjgdm,
            beginTime: this.state.beginTime,
            endTime: this.state.endTime
          },
          res => {
            if (res.status === 200) {
              if (res.data.length > 0) {
                resolve(res);
              }
            }
          }
        )
      );
    });

    let rehabAddTotal = new Promise((resolve, reject) => {
      //Request.post({
      //    url: GlobalData.socialPrisonWatchHouseRehabAddTotal,
      //    data: {gxjgdm: GlobalData.gxjgdm, beginTime: this.state.beginTime, endTime: this.state.endTime}
      this.props.dispatch(
        prisonWatchhouseRehabAddTotal(
          {
            gxjgdm: this.state.gxjgdm,
            beginTime: this.state.beginTime,
            endTime: this.state.endTime
          },
          res => {
            if (res.status === 200) {
              if (res.data.length > 0) {
                resolve(res);
              }
            }
          }
        )
      );
    });
    Promise.all([rehabAdd, rehabAddTotal]).then(data => {
      //新增柱图
      data[0]["data"].forEach((category, index) => {
        let item = {
          yAxisIndex: 1,
          type: "bar",
          barCategoryGap: "60%",
          itemStyle: {
            normal: {
              barBorderRadius: 20
            }
          },
          data: []
        };
        category.forEach((categoryData, index) => {
          jsryslOption.xAxis.data.indexOf(categoryData["TJRQ"]) === -1
            ? jsryslOption.xAxis.data.push(categoryData["TJRQ"])
            : null;
          jsryslOption.legend.data.indexOf(categoryData["JSM"]) === -1
            ? jsryslOption.legend.data.push(categoryData["JSM"])
            : null;
          if (!item.hasOwnProperty("name")) item.name = categoryData["JSM"];
          item.data.push({
            name: categoryData["TJRQ"],
            value: categoryData["XZSL"]
          });
        });
        jsryslOption.series.push(item);
      });

      //总量线图
      data[1]["data"].forEach((category, index) => {
        let item = {
          type: "line",
          showSymbol: false,
          smooth: true,
          data: []
        };
        category.forEach((categoryData, index) => {
          jsryslOption.xAxis.data.indexOf(categoryData["TJRQ"]) === -1
            ? jsryslOption.xAxis.data.push(categoryData["TJRQ"])
            : null;
          jsryslOption.legend.data.indexOf(categoryData["JSM"]) === -1
            ? jsryslOption.legend.data.push(categoryData["JSM"])
            : null;
          if (!item.hasOwnProperty("name")) item.name = categoryData["JSM"];
          item.data.push({
            name: categoryData["TJRQ"],
            value: categoryData["ZSL"]
          });
        });
        jsryslOption.series.push(item);
      });
      jsryslOption.xAxis.data.sort(this.sortAsc);
      this.setState({
        jsrysl: jsryslOption
      });
    });
  }

  //网吧预警
  refreshWBYJ() {
    let wbyjOption = {
      /*  graphic: [
                {
                    type: 'image',
                    left: '18%',
                    top: '3%',
                    style: {
                        image: TitleImage,
                        height: 10000,
                        width:10
                    }
                }
            ],*/
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
      title: [
        {
          text: "网吧重点人员统计",
          top: "1%",
          left: "3%",
          textStyle: {
            color: "#7AA8C2",
            fontSize: 20,
            fontWeight: 200
          }
        },
        {
          text: "",
          top: "middle",
          left: "center",
          textStyle: {
            color: "white",
            fontSize: 30,
            fontWeight: 200
          }
        }
      ],
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
          data: []
          //data: [100, 100, 100, 100, 100, 100, 100]
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
              fontSize: 16
            }
          },
          labelLine: {
            normal: {
              show: true
            }
          },
          data: []
          /*data: [
                     {name: '涉恐人员', value: 100},
                     {name: '涉稳人员', value: 100},
                     {name: '前科人员', value: 100},
                     {name: '在逃人员', value: 100},
                     {name: '涉毒人员', value: 100},
                     {name: '重点上访人员', value: 100},
                     {name: '肇事肇祸\n精神病人', value: 100}
                     ]*/
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
          if (res.status === 200) {
            if (res.data.length > 0) {
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
              wbyjOption.title[1].text = `${sum}人`;
              this.setState({ wbyj: wbyjOption });
            }else{
                wbyjOption.series[0].data.push({
                    value:0,
                    itemStyle: {
                        normal: {
                            color:  "#5DF97A",
                        }
                    }
                })
                wbyjOption.series[1].data.push({
                    value:0,
                    itemStyle: {
                        normal: {
                            color: "#52C867",
                        }
                    }
                })
                wbyjOption.title[1].text = '0人';
                this.setState({ wbyj: wbyjOption });
            }
          }
        }
      )
    );
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
          if (res.status === 200) {
            this.setState({
              wbryData: res["data"]
            });
          }
        }
      )
    );
  }
  //网吧排名
  refreshWBPM() {
    let wbpmOption = {
      /* graphic: [
                {
                    type: 'image',
                    left: '25%',
                    top: '3%',
                    style: {
                        image: TitleImage,
                        height: 12
                    }
                }
            ],*/
      title: {
        text: "网吧排名TOP10",
        top: "1%",
        left: "3%",
        textStyle: {
          color: "#7AA8C2",
          fontSize: 20,
          fontWeight: 200
        }
      },
      color: ["#FF9467"],
      textStyle: { color: "white" },
      tooltip: {
        trigger: "axis",
        textStyle: {
          fontSize: 16
        }
      },
      legend: {
        show: false
      },
      grid: {
        left: "3%",
        top: "13%",
        bottom: "3%",
        right: "5%",
        containLabel: true
      },
      yAxis: {
        type: "category",
        inverse: true,
        splitLine: {
          show: false
        },
        /*  axisLabel:{

                },*/
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: "#84AFD2"
          }
        },
        axisLabel: {
          show: true,
          fontSize: 16,
          formatter: function(val) {
            return val.substr(0, 4);
          }
        },
        data: []
      },
      xAxis: [
        {
          type: "value",
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#84AFD2"
            }
          },
          axisLabel: {
            fontSize: 16
          }
        }
      ],
      series: [
        {
          type: "bar",
          barCategoryGap: "70%",
          label: {
            normal: {
              show: true,
              position: "right",
              fontSize: 16
            }
          },
          itemStyle: {
            normal: {
              barBorderRadius: 20,
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "#FF8A36" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#EB5024" // 100% 处的颜色
                  }
                ]
              },
              shadowColor: "rgb(0, 0, 0)",
              shadowBlur: 10
            }
          },
          data: []
        }
      ]
    };
    //Request.post({
    //    url: GlobalData.socialSelectInternetBarTop10,
    //    data: {gxjgdm: GlobalData.gxjgdm, beginTime: this.state.beginTime, endTime: this.state.endTime}

    this.props.dispatch(
      selectInternetBarTop10(
        {
          gxjgdm: this.state.gxjgdm,
          beginTime: this.state.beginTime,
          endTime: this.state.endTime
        },
        res => {
          if (res.status === 200) {
            if (res.data.length > 0) {
              res["data"].forEach((elem, index) => {
                // console.log(elem.YYCSMC)
                wbpmOption.yAxis.data.push(elem["YYCSMC"]);
                wbpmOption.series[0].data.push(elem["CNT"]);
              });
              this.setState({ wbpm: wbpmOption });
            }else{
                this.setState({ wbpm:wbpmOption});
            }
          }
        }
      )
    );
  }

  //旅店预警
  refreshLDYJ() {
    let ldyjOption = {
      /* graphic: [
                {
                    type: 'image',
                    left: '18%',
                    top: '3%',
                    style: {
                        image: TitleImage,
                        height: 12
                    }
                }
            ],*/
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
      title: [
        {
          text: "旅店重点人员统计",
          top: "1%",
          left: "3%",
          textStyle: {
            color: "#7AA8C2",
            fontSize: 20,
            fontWeight: 200
          }
        },
        {
          text: "",
          top: "middle",
          left: "center",
          textStyle: {
            color: "white",
            fontSize: 30,
            fontWeight: 200
          }
        }
      ],
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
          data: []
          //data: [100, 100, 100, 100, 100, 100, 100]
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
              fontSize: 16
            }
          },
          labelLine: {
            normal: {
              show: true
            }
          },
          data: []
          /*data: [
                     {name: '涉恐人员', value: 100},
                     {name: '涉稳人员', value: 100},
                     {name: '前科人员', value: 100},
                     {name: '在逃人员', value: 100},
                     {name: '涉毒人员', value: 100},
                     {name: '重点上访人员', value: 100},
                     {name: '肇事肇祸\n精神病人', value: 100}
                     ]*/
        }
      ]
    };
    //Request.post({
    //    url: GlobalData.socialSelectHotelWarning,
    //    data: {gxjgdm: GlobalData.gxjgdm, beginTime: this.state.beginTime, endTime: this.state.endTime}

    this.props.dispatch(
      selectHotelWarning(
        {
          gxjgdm: this.state.gxjgdm,
          beginTime: this.state.beginTime,
          endTime: this.state.endTime
        },
        res => {
          if (res.status === 200) {
            if (res.data.length > 0) {
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
              ldyjOption.title[1].text = `${sum}人`;
              this.setState({ ldyj: ldyjOption });
            }else{
                ldyjOption.series[0].data.push({
                    value:0,
                    itemStyle: {
                        normal: {
                            color:  "#5DF97A",
                        }
                    }
                })
                ldyjOption.series[1].data.push({
                    value:0,
                    itemStyle: {
                        normal: {
                            color: "#52C867",
                        }
                    }
                })
                ldyjOption.title[1].text = '0人';
                this.setState({ ldyj: ldyjOption });
            }
          }
        }
      )
    );
  }

  //旅店排名
  refreshLDPM() {
    let ldpmOption = {
      /* graphic: [
                {
                    type: 'image',
                    left: '25%',
                    top: '3%',
                    style: {
                        image: TitleImage,
                        height: 12
                    }
                }
            ],*/
      title: {
        text: "旅店排名TOP10",
        top: "1%",
        left: "3%",
        textStyle: {
          color: "#7AA8C2",
          fontSize: 20,
          fontWeight: 200
        }
      },
      color: ["#FF9467"],
      textStyle: { color: "white" },
      tooltip: {
        trigger: "axis",
        textStyle: {
          fontSize: 16
        }
      },
      legend: {
        show: false
      },
      grid: {
        left: "3%",
        top: "13%",
        bottom: "3%",
        right: "5%",
        containLabel: true
      },
      yAxis: {
        type: "category",
        inverse: true,
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },

        axisLine: {
          lineStyle: {
            color: "#84AFD2"
          }
        },
        axisLabel: {
          fontSize: 16,
          formatter: function(val) {
            return val.substr(0, 4);
          }
        },
        data: []
      },
      xAxis: [
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
          type: "bar",
          barCategoryGap: "70%",
          label: {
            normal: {
              show: true,
              position: "right",
              fontSize: 16
            }
          },
          itemStyle: {
            normal: {
              barBorderRadius: 20,
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "#FF8A36"
                  },
                  {
                    offset: 1,
                    color: "#EB5024"
                  }
                ]
              },
              shadowColor: "rgb(0, 0, 0)",
              shadowBlur: 10
            }
          },
          data: []
        }
      ]
    };

    this.props.dispatch(
      selectHotelTop10(
        {
          gxjgdm: this.state.gxjgdm,
          beginTime: this.state.beginTime,
          endTime: this.state.endTime
        },
        res => {
          if (res.status === 200) {
            if (res.data.length > 0) {
              res["data"].forEach((elem, index) => {
                ldpmOption.yAxis.data.push(elem["YYCSMC"]);
                ldpmOption.series[0].data.push(elem["CNT"]);
              });
              this.setState({ ldpm: ldpmOption });
            }else{
                this.setState({ ldpm:ldpmOption });
            }
          }
        }
      )
    );
  }

  //旅店人员
  refreshLDRY() {
    //Request.post({
    //    url: GlobalData.socialSelectHotelPeople,
    //    data: {gxjgdm: GlobalData.gxjgdm, beginTime: this.state.beginTime, endTime: this.state.endTime}

    this.props.dispatch(
      selectHotelPeople(
        {
          gxjgdm: this.state.gxjgdm,
          beginTime: this.state.beginTime,
          endTime: this.state.endTime
        },
        res => {
          if (res.status === 200) {
            this.setState({
              ldryData: res["data"]
            });
          }else{
          }
        }
      )
    );
  }

  //流动人口比例饼图
  refreshLDRKPIE() {
    let ldrkPieOption = {
      /* graphic: [
                {
                    type: 'image',
                    left: '18%',
                    top: '3%',
                    style: {
                        image: TitleImage,
                        height: 12
                    }
                }
            ],*/
      textStyle: { color: "white" },
      title: [
        {
          text: "12",
          top: "48%",
          left: "42%",
          textStyle: {
            color: "#98C3F6",
            fontSize: 30,
            fontWeight: 200
          }
        },
        {
          text: "平均年龄",
          top: "43%",
          left: "center",
          textStyle: {
            color: "#98C3F6",
            fontSize: 20,
            fontWeight: 200
          }
        },
        {
          text: "岁",
          top: "49%",
          left: "52%",
          textStyle: {
            color: "#98C3F6",
            fontSize: 20,
            fontWeight: 200
          }
        }
      ],
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
          radius: ["60%", "70%"],
          startAngle: 90,
          hoverAnimation: false,
          type: "pie",
          label: {
            normal: {
              show: true,
              formatter: "{b}：{c}" + "\n" + "占比：{d}%",
              fontSize: 16
            }
          },
          labelLine: {
            normal: {
              show: true
            }
          },
          data: [
            {
              name: "男性",
              value: 100,
              itemStyle: {
                normal: {
                  color: {
                    type: "radial",
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#68B7FF"
                      },
                      {
                        offset: 1,
                        color: "#0573EF"
                      }
                    ]
                  }
                }
              }
            },
            {
              name: "女性",
              value: 100,
              itemStyle: {
                normal: {
                  color: {
                    type: "radial",
                    x: 1,
                    y: 1,
                    x2: 0,
                    y2: 0,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#F3EC07"
                      },
                      {
                        offset: 1,
                        color: "#F45B00"
                      }
                    ]
                  }
                }
              }
            }
          ]
        }
      ]
    };

    this.props.dispatch(
      selectMigrantSexRatio(
        {
          gxjgdm: this.state.gxjgdm,
          beginTime: this.state.beginTime,
          endTime: this.state.endTime
        },
        res => {
          if (res.status === 200) {
            ldrkPieOption.series[0].data[0].value = res["data"]["female"];
            ldrkPieOption.series[0].data[1].value = res["data"]["male"];
            ldrkPieOption.title[0].text = res["data"]["averageAge"];
            this.setState({ ldrkPie: ldrkPieOption });
          }
        }
      )
    );
  }

  //流动人口年龄柱图
  refreshLDRKBAR() {
    let ldrkBarOption = {
      textStyle: { color: "white" },
      tooltip: {
        trigger: "axis",
        textStyle: {
          fontSize: 16
        }
      },
      legend: {
        bottom: "3%",
        itemWidth: 20,
        itemHeight: 10,
        borderRadius: 10,
        textStyle: {
          color: "white",
          fontSize: 16
        },
        data: ["涉疆人员", "其他人员"]
      },
      grid: {
        left: "3%",
        top: "18%",
        bottom: "15%",
        right: "5%",
        containLabel: true
      },
      xAxis: {
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
        data: []
      },
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
          name: "涉疆人员",
          type: "bar",
          barCategoryGap: "70%",
          barGap: "100%",
          itemStyle: {
            normal: {
              barBorderRadius: 20,
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#01E594"
                  },
                  {
                    offset: 1,
                    color: "#008DFF"
                  }
                ]
              }
            }
          },
          data: []
        },
        {
          name: "其他人员",
          type: "bar",
          barCategoryGap: "70%",
          barGap: "100%",
          itemStyle: {
            normal: {
              barBorderRadius: 20,
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#E16B83"
                  },
                  {
                    offset: 1,
                    color: "#5172FF"
                  }
                ]
              }
            }
          },
          data: []
        }
      ]
    };

    this.props.dispatch(
      selectMigrantAge(
        {
          gxjgdm: this.state.gxjgdm,
          beginTime: this.state.beginTime,
          endTime: this.state.endTime
        },
        res => {
          if (res.status === 200) {
            ldrkBarOption.xAxis.data = Object.keys(res["data"]["sjry"]).sort();
            ldrkBarOption.xAxis.data.forEach((elem, index) => {
              ldrkBarOption.series[0].data.push(res["data"]["sjry"][elem]);
              ldrkBarOption.series[1].data.push(res["data"]["qtry"][elem]);
            });
            this.setState({ ldrkBar: ldrkBarOption });
          }
        }
      )
    );
  }

  //流动人口人员
  refreshLDRK() {
    //Request.post({
    //    url: GlobalData.socialSelectMigrantPeople,
    //    data: {gxjgdm: GlobalData.gxjgdm, beginTime: this.state.beginTime, endTime: this.state.endTime}

    this.props.dispatch(
      selectMigrantPeople(
        {
          gxjgdm: this.state.gxjgdm,
          beginTime: this.state.beginTime,
          endTime: this.state.endTime
        },
        res => {
          if (res.status === 200) {
            this.setState({
              ldrkData: res["data"]
            });
          }
        }
      )
    );
  }

  refreshAll() {
    this.refreshZDCSSL();

    this.refreshCRJRYSL();
    this.refreshRKSL();
    this.refreshDLJT();
    this.refreshJSRYSL();
    this.refreshWBYJ();
    this.refreshWBPM();
    this.refreshWBRY();
    setTimeout(() => {
      this.refreshLDYJ();
      this.refreshLDPM();
      this.refreshLDRY();
    }, 1500);

    setTimeout(() => {
      this.refreshLDRKPIE();
      this.refreshLDRKBAR();
      this.refreshLDRK();
    }, 2000);
  }

  componentWillMount() {
    this.refreshAll();
  }

  time(newState) {
    //接收传回来的时间改变后的数据
    let time = newState.split("|");
    this.setState({
      beginTime: time[0],
      endTime: time[1]
    });
    this.refreshAll();
  }

  render() {
    return (
      <div id="social">
        <div className="content">
          <div className="content-title">辖区动态</div>
          <div className="content-cont">
            <div>
              <Echarts option={this.state.zdcssl} />
            </div>
            <div>
              <Echarts option={this.state.crjrysl} />
            </div>
            <div>
              <Echarts option={this.state.rksl} />
            </div>
            <div>
              <Echarts option={this.state.dljt} />
            </div>
            <div>
              <Echarts option={this.state.jsrysl} />
            </div>
          </div>
        </div>
        <div className="content">
          <div className="content-title">网吧分析</div>
          <div className="content-cont wangbafenxi">
            <div>
              <Echarts option={this.state.wbyj} />
            </div>
            <div className="dataTables-box1">
              {/*<DataTables heads={this.state.wbryHead} data={this.state.wbryData}/>*/}
              <table>
                <thead>
                  <tr>
                    <th>人员</th>
                    <th>身份证</th>
                    <th>预警积分</th>
                    <th>类型</th>
                    <th>级别</th>
                    <th>预警网吧</th>
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
            <div>
              <Echarts option={this.state.wbpm} />
            </div>
          </div>
        </div>
        <div className="content">
          <div className="content-title">旅店分析</div>
          <div className="content-cont lvdianfenxi">
            <div>
              <Echarts option={this.state.ldyj} />
            </div>
            <div className="dataTables-box1">
              {/*<DataTables heads={this.state.ldryHead} data={this.state.ldryData}/>*/}
              <table>
                <thead>
                  <tr>
                    <th>人员</th>
                    <th>身份证</th>
                    <th>预警积分</th>
                    <th>类型</th>
                    <th>级别</th>
                    <th>预警旅店</th>
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
            <div>
              <Echarts option={this.state.ldpm} />
            </div>
          </div>
        </div>
        <div className="content liudongrenkou">
          <div className="content-title">流动人口分析</div>
          <div className="content-cont">
            <div>
              <Echarts option={this.state.ldrkPie} />
            </div>
            <div className="dataTables-box1">
              {/*<div className="">*/}
              {/*<DataTables heads={this.state.ldrkHead} data={this.state.ldrkData}/>*/}
              <table>
                <thead>
                  <tr>
                    <th>人员</th>
                    <th>身份证</th>
                    <th>户籍地址</th>
                    <th>迁入时间</th>
                    <th>性别</th>
                    <th>现住址</th>
                    <th>核发日期</th>
                    <th>注销日期</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.ldrkData.map((e, i) => {
                    return (
                      <tr key={i}>
                        <td style={{ height: "2rem" }}>
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
                            <a title={e["HJDZ_DZMC"]}>{e["HJDZ_DZMC"]}</a>
                          </div>
                        </td>
                        <td>
                          <div>
                            <a title={e["QRLRRQ"]}>
                              {e["QRLRRQ"].substr(0, 10)}
                            </a>
                          </div>
                        </td>
                        <td>{e["XBDM"] === "1" ? "男" : "女"}</td>
                        <td>
                          <div>
                            <a title={e["XZZ_DZMC"]}>{e["XZZ_DZMC"]}</a>
                          </div>
                        </td>
                        <td>
                          <div>
                            <a title={e["HFRQ"]}>{e["HFRQ"].substr(0, 10)}</a>
                          </div>
                        </td>
                        <td>
                          <div>
                            <a title={e["ZXRQ"]}>{e["ZXRQ"].substr(0, 10)}</a>
                          </div>
                        </td>

                          {/*  <td title={e['XM']}>{e['XM']}</td>
                                    <td title={e['GMSFHM']}>{e['GMSFHM']}</td>
                                    <td title={e['HJDZ_DZMC']}>{e['HJDZ_DZMC']}</td>
                                    <td title={e['QRLRRQ']}>{e['QRLRRQ'].substr(0,10)}</td>
                                    <td>{e['XBDM']==='1'?'男':'女'}</td>
                                    <td title={e['XZZ_DZMC']}>{e['XZZ_DZMC']}</td>*/}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div>
              <Echarts option={this.state.ldrkBar} />
            </div>
          </div>
        </div>
        <div className="timeLine-box">
          <TimeLine getTime={this.time.bind(this)} />
        </div>
      </div>
    );
  }
}
