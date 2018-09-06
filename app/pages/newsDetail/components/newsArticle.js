import React, { Component } from "react";
import "../newsDetail.less";
import person from "../../../images/news/person.png";
import { Button } from "antd";

export default class NewsActicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBefore: false,
      showAfter: false
    };
  }

  componentWillMount() {
    this.setState({
      showBefore: false,
      showAfter: false
    });
  }
  searchArray(arr, id) {
    let index = -1;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id == id) {
        index = i;
        break;
      }
    }
    return index;
  }
  componentWillReceiveProps(nextProps) {
    let num = this.searchArray(nextProps.articleList, nextProps.id);

    if (num == 0) {
      this.setState({
        showBefore: true
      });
    } else {
      this.setState({
        showBefore: false
      });
    }
    if (num == nextProps.articleList.length - 1) {
      this.setState({
        showAfter: true
      });
    } else {
      this.setState({
        showAfter: false
      });
    }
  }
  beforeOne() {
    this.setState({
      showAfter: false
    });
    let position = this.searchArray(this.props.articleList, this.props.id);
    if (position > 0) {
      position--;
      this.props.changeIndex({
        id: this.props.articleList[position].id
      });
    }
  }

  afterOne() {
    this.setState({
      showBefore: false
    });
    let num = this.searchArray(this.props.articleList, this.props.id);

    if (num >= 0) {
      num++;
      if (num < this.props.articleList.length) {
        this.props.changeIndex({
          id: this.props.articleList[num].id
        });
      }
    }
  }

  render() {
    // console.log(this.props.articleList);
    // console.log(this.props.id);
    return (
      <div className="article">
        <div className="title">{this.props.data.title}</div>
        <div className="main">
          <p className="time">
            <span>更新时间:</span>
            <span>{this.props.data.crtTime}</span>
          </p>
          <div
            className="text"
            dangerouslySetInnerHTML={{ __html: this.props.data.content }}
          />
        </div>

        <div className="btn">
          {this.state.showBefore == false ? (
            <Button onClick={this.beforeOne.bind(this)}>&lt; 上一个</Button>
          ) : (
            <Button onClick={this.beforeOne.bind(this)} disabled="false">
              &lt; 上一个
            </Button>
          )}
          {this.state.showAfter == false ? (
            <Button onClick={this.afterOne.bind(this)}> 下一个 &gt;</Button>
          ) : (
            <Button onClick={this.afterOne.bind(this)} disabled="false">
              下一个 &gt;
            </Button>
          )}
        </div>
      </div>
    );
  }
}
