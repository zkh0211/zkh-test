/**
 * Created by Administrator on 2017/9/12.
 */
import React, { Component } from "react";
import ImgChartTitle from "../../../images/daily/zs.png";
import echarts from "echarts";
export default class ChartPanel extends Component {
  componentWillReceiveProps(newProps) {
    if (newProps.hasOwnProperty("option")) {
      this.chart.clear();
      this.chart.setOption(newProps.option);
    }
  }

  componentDidMount() {
    this.chart = echarts.init(this.element);
    if (
      this.props.hasOwnProperty("option") &&
      this.props.option.hasOwnProperty("series")
    ) {
      this.chart.setOption(this.props.option);
    }
  }

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="chart-title">
          {this.props.title}
          <img src={ImgChartTitle} alt="" />
        </div>
        <div className="chart-box">
          <div
            style={{ width: "100%", height: "100%" }}
            ref={div => (this.element = div)}
          />
        </div>
      </div>
    );
  }
}
