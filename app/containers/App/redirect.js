import React, { Component } from 'react'
import { hashHistory } from 'react-router'

export default class Redirect extends Component {
    componentWillMount(){
        hashHistory.push('/portal')
    }
  render() {
    return (
      <div className="zhegai-redirect"></div>
    )
  }
}