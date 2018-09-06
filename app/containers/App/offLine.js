import React, { Component } from 'react'
import { hashHistory } from 'react-router'

export default class OffLine extends Component {
    componentWillMount(){
        // hashHistory.push('/portal')
    }
  render() {
    return (
      <div className="zhegai-redirect">
        <p className="offline-p">已退出登陆！</p>
      </div>
    )
  }
}