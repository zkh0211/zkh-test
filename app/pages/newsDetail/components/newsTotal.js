import React, { Component } from "react";
import { connect } from "react-redux";

import "../newsDetail.less";

import Cookies from "js-cookie";
import { Pagination } from "antd";

import { showNewsDetail } from "actions/news";
import message from "../../../images/news/message.png";
import messageHover from "../../../images/news/messageHover.png";
import { newsSingle, clickPage } from "actions/news";

@connect((state, props) => ({
  config: state.config
}))
export default class NewsTotals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleDate: true,
      singleDate2: false,
      size: 10,
      page: 1,
      dataList: []
    };
  }

  newsSingle = () => {
    this.setState({
      singleDate: false,
      singleDate3: true
    });
  };
  change(id, i) {
    this.props.transferMsg({ num: 1, ID: id});
  }
  listPagation(page, pageSize) {
    this.setState({
      page: page
    });
    this.props.dispatch(
      clickPage(
        {
          nodeId: this.props.nodeId,
          pageIndex: page,
          pageSize: this.state.size
        },
        res => {
          if (res.data) {
            this.setState({
              dataList: res.data.cmsList
            });
          } else {
            this.setState({
              dataList: []
            });
          }
        }
      )
    );
  }

  singleOut = () => {
    this.setState({
      singleDate: true,
      singleDate3: false
    });
  };
  render() {
    if (this.state.dataList.length > 0) {
      return (
        <div className="newsMain">
          <div className="newsTotals">
            {/* {this.state.dataList.length > 0 &&
              this.state.dataList.map((item, index) => { */}
            {this.state.dataList.length > 0 &&
              this.state.dataList.map((item, index) => {
                return (
                  <div
                    className="newsSingle"
                    key={index}
                    onClick={this.change.bind(this, item.id, index)}
                  >
                    <div className="single">
                      <div className="singleLeft">
                        <img src={message} alt="" />
                        <span>{item.title}</span>
                      </div>
                      <div className="singleRight">
                        <span>更新时间:</span>
                        <span>{item.crtTime}</span>
                      </div>
                    </div>

                    <div className="singleHover">
                      <div className="slingeTitle">
                        <img src={messageHover} alt="" />
                        <span>{item.title}</span>
                      </div>
                      <div className="singleMain">{item.remark}</div>
                      <div className="singleBtn">
                        <button>阅读原文</button>
                        <span />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {this.props.data.length > 0 && (
            <Pagination
              className="totalPagination"
              total={this.props.total}
              showTotal={(total, range) =>
                `显示${range[0]}-${range[1]}条，共${total} 条`
              }
              pageSize={this.props.size}
              current={this.state.page}
              onChange={(page, pageSize) => {
                this.listPagation(page, pageSize);
              }}
            />
          )}
        </div>
      );
    } else {
      return (
        <div className="newsMain">
          <div className="newsTotals">
            {/* {this.state.dataList.length > 0 &&
              this.state.dataList.map((item, index) => { */}
            {this.props.data.length > 0 &&
              this.props.data.map((item, index) => {
                return (
                  <div
                    className="newsSingle"
                    key={index}
                    onClick={this.change.bind(this, item.id, index)}
                  >
                    <div className="single">
                      <div className="singleLeft">
                        <img src={message} alt="" />
                        <span>{item.title}</span>
                      </div>
                      <div className="singleRight">
                        <span>更新时间:</span>
                        <span>{item.crtTime}</span>
                      </div>
                    </div>

                    <div className="singleHover">
                      <div className="slingeTitle">
                        <img src={messageHover} alt="" />
                        <span>{item.title}</span>
                      </div>
                      <div className="singleMain">{item.remark}</div>
                      <div className="singleBtn">
                        <button>阅读原文</button>
                        <span />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {this.props.data.length > 0 && (
            <Pagination
              className="totalPagination"
              total={this.props.total}
              showTotal={(total, range) =>
                `显示${range[0]}-${range[1]}条，共${total} 条`
              }
              pageSize={this.props.size}
              current={this.state.page}
              onChange={(page, pageSize) => {
                this.listPagation(page, pageSize);
              }}
            />
          )}
        </div>
      );
    }
  }
}
