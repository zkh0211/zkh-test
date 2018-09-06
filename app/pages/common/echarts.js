/**
 * Created by Administrator on 2017/9/13.
 */
import React, { Component } from "react";
import echarts from "echarts";

export default class Echarts extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    let echartWidth = this.element.clientWidth;
    if (this.props.option !== nextProps.option) {
      this.chart.clear();
      if (nextProps.option.graphic) {
        nextProps.option.graphic[0].style.width = nextProps.option.graphic[0].style.height =
          echartWidth * 0.36;
      }
      this.chart.setOption(nextProps.option);
    }
    return this.props.option !== nextProps.option;
  }

  componentDidMount() {
    this.chart = echarts.init(this.element);
    if (
      this.props.hasOwnProperty("option") &&
      this.props.option.hasOwnProperty("series")
    ) {
      this.chart.setOption(this.props.option);
    }
    // window.onresize = this.chart.resize;
  }

  componentWillUnmount() {
    // window.removeEventListener('resize', this.onWindowResize)
  }

  render() {
    return (
      <div
        style={{ width: "100%", height: "100%" }}
        ref={div => (this.element = div)}
      />
    );
  }
}
