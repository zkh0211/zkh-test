import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, hashHistory, Route, Router } from "react-router";
import Divider from "antd/lib/divider";
import "../master/master.less";
import Cookies from "js-cookie";
import Img1 from "../../images/common/u2012.png";
import Img1Hover from "../../images/common/u2011.png";
import Img2 from "../../images/common/u2014.png";
import Img2Hover from "../../images/common/u2015.png";
import Img3 from "../../images/common/u2017.png";
import Img3Hover from "../../images/common/u2018.png";
import Img4 from "../../images/common/u2020.png";
import Img4Hover from "../../images/common/u2021.png";
import Img5 from "../../images/common/u2023.png";
import Img5Hover from "../../images/common/u2024.png";
import NewsTotals from "./components/newsTotal";
import NewsArticle from "./components/newsArticle";
import { tongzhiTongbao } from "../../actions/common";

import {
  getnewsInfoList,
  clickMenu,
  showNewsDetail,
  clickPage,
  newsSingle,
  nodeList
} from "actions/news";
// import { newsData } from "../../reducers/news";

@connect((state, props) => ({
  config: state.config,
  submitList: state.submitListResponse,
  newsData: state.submitListResponse
}))
export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "1",
      caseTotal: "0",
      caseList: [],
      caseData: {},
      nodeList: [],
      firstData: [],
      secondData: [],
      thirdData: [],
      fourthData: [],
      fifthData: [],
      isMaster: true,
      caseType: [],
      articleNum: 0,
      articleData: {},
      caseCount: {},
      msg: "",
      id: 0,
      index: 0,
      size: 10,
      page: 1,
      total: 0,
      Role: Cookies.get("policeTypeName"),
      deptLevel: Cookies.get("deptLevel")
    };
  }

  transferMsg(msg) {
    this.setState({
      articleNum: msg.num,

      id: msg.ID
    });
    this.props.dispatch(
      newsSingle({ urlParam: parseInt(msg.ID) }, res => {
        if (res.data) {
          this.setState({
            articleData: res.data
          });
        } else {
          this.setState({
            articleData: {}
          });
        }
      })
    );
  }
  changeIndex(msg) {
    this.setState({
      id: msg.id
    });

    this.props.dispatch(
      newsSingle({ urlParam: parseInt(msg.id) }, res => {
        if (res.data) {
          this.setState({
            articleData: res.data
          });
        } else {
          this.setState({
            articleData: {}
          });
        }
      })
    );
  }
  componentWillMount() {
    // this.props.location.query.name
    // console.log(this.props.location.query);

    this.props.dispatch(
      nodeList({}, res => {
        if (res.data.length > 0) {
          // console.log(res.data);
          this.setState({
            nodeList: res.data
          });
        } else {
          this.setState({
            nodeList: []
          });
        }
      })
    );

    if (this.props.location.query.id) {
      this.setState({
        id: this.props.location.query.id,
        articleNum: 1,
        tab: this.props.location.query.tab
      });
      this.props.dispatch(
        clickPage(
          {
            nodeId: this.props.location.query.tab,
            pageIndex: this.state.page,
            pageSize: this.state.size
          },
          res => {
            if (res.data) {
              // console.log(res.data);
              this.setState(
                {
                  firstData: res.data.cmsList,
                  total: res.data.total,

                },
                () => { }
              );
            } else {
              this.setState({
                firstData: []
              });
            }
          }
        )
      );

      this.props.dispatch(
        newsSingle(
          { urlParam: parseInt(this.props.location.query.id) },
          res => {
            if (res.data) {
              this.setState({
                articleData: res.data
              });
            } else {
              this.setState({
                articleData: {}
              });
            }
          }
        )
      );
    } else {
      this.props.dispatch(
        clickPage(
          {
            nodeId: 4,
            pageIndex: this.state.page,
            pageSize: this.state.size
          },
          res => {
            if (res.data) {
              // console.log(res.data);
              this.setState(
                {
                  firstData: res.data.cmsList,
                  total: res.data.total,
                  tab: "4"
                },
                () => { }
              );
            } else {
              this.setState({
                firstData: []
              });
            }
          }
        )
      );
    }
  }

  changeTab(e) {
    let { currentPage } = this.props;
    let num = e.currentTarget.getAttribute("data-tab");

    this.setState(
      {
        articleNum: 0,
        tab: num
      },
      () => {
        this.props.dispatch(
          clickPage(
            {
              nodeId: num,
              pageIndex: this.state.page,
              pageSize: this.state.size
            },
            res => {
              if (res.data) {
                this.setState({
                  firstData: res.data.cmsList,
                  total: res.data.total
                });
              } else {
                this.setState({
                  firstData: []
                });
              }
            }
          )
        );
      }
    );
  }
  shouldComponentUpdate(nextState, nextProps) {
    if (this.state == nextState && this.props == nextProps) {
      return false;
    } else {
      return true;
    }
  }

  render() {

    return (
      <div className="master-contain">
        <div className="master-left" style={{ paddingTop: '2rem' }}>
          {/*<div className="master-title">
            <span>信息中心</span>
          </div>*/}

          {this.state.nodeList.length > 0 &&
            this.state.nodeList.map((item, index) => {
              if (item.ID == 1) {
                return (
                  <div
                    key={index}
                    className={
                      this.state.tab === "1"
                        ? "master-left-item master-item-active"
                        : "master-left-item master-left-hide"
                    }
                    onClick={this.changeTab.bind(this)}
                    data-tab="1"
                  >
                    <img
                      src={this.state.tab === "1" ? Img1Hover : Img1}
                      alt="pic"
                    />
                    <span>{item.NAME}</span>
                  </div>
                );
              } else if (item.ID == 2) {
                return (
                  <div
                    key={index}
                    className={
                      this.state.tab === "2"
                        ? "master-left-item master-item-active"
                        : "master-left-item master-left-hide"
                    }
                    onClick={this.changeTab.bind(this)}
                    data-tab="2"
                  >
                    <img
                      src={this.state.tab === "2" ? Img2Hover : Img2}
                      alt="pic"
                    />
                    <span>{item.NAME}</span>
                  </div>
                );
              } else if (item.ID == 3) {
                return (
                  <div
                    key={index}
                    className={
                      this.state.tab === "3"
                        ? "master-left-item master-item-active"
                        : "master-left-item master-left-hide"
                    }
                    onClick={this.changeTab.bind(this)}
                    data-tab="3"
                  >
                    <img
                      src={this.state.tab === "3" ? Img3Hover : Img3}
                      alt="pic"
                    />
                    <span>{item.NAME}</span>
                  </div>
                );
              } else if (item.ID == 4) {
                return (
                  <div
                    key={index}
                    className={
                      this.state.tab === "4"
                        ? "master-left-item master-item-active"
                        : "master-left-item master-left-hide"
                    }
                    onClick={this.changeTab.bind(this)}
                    data-tab="4"
                  >
                    <img
                      src={this.state.tab === "4" ? Img4Hover : Img4}
                      alt="pic"
                    />
                    <span>{item.NAME}</span>
                  </div>
                );
              } else if (item.ID == 5) {
                return (
                  <div
                    key={index}
                    className={
                      this.state.tab === "5"
                        ? "master-left-item master-item-active"
                        : "master-left-item master-left-hide"
                    }
                    onClick={this.changeTab.bind(this)}
                    data-tab="5"
                  >
                    <img
                      src={this.state.tab === "5" ? Img5Hover : Img5}
                      alt="pic"
                    />
                    <span>{item.NAME}</span>
                  </div>
                );
              }
            })}

          <div className="clearBoth" />
        </div>
        <div className="master-right">
          <div
            className={
              this.state.articleNum == 0
                ? this.state.tab !== "0"
                  ? "master-right-content bottomToTop"
                  : "master-right-content topToBottom master-left-hide"
                : "display-none"
            }
          >
            <NewsTotals
              nodeId={this.state.tab}
              data={this.state.firstData}
              transferMsg={this.transferMsg.bind(this)}
              size={this.state.size}
              total={this.state.total}
              page={this.state.page}
            />
          </div>
          <div
            className={
              this.state.articleNum == 1
                ? this.state.tab !== "0"
                  ? "master-right-content bottomToTop"
                  : "master-right-content topToBottom master-left-hide"
                : "display-none"
            }
          >
            <NewsArticle
              id={this.state.id}
              data={this.state.articleData}
              articleList={this.state.firstData}
              changeIndex={this.changeIndex.bind(this)}
            />
          </div>
        </div>

        <div className="clearBoth" />
      </div>
    );
  }
}
