import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import Cookies from 'js-cookie'

export default class GoToolbox extends Component {
    componentWillMount(){
        if(Cookies.get('deptLevel') === '2'){
            hashHistory.push('/toolbox')
        }else if(Cookies.get('deptLevel') === '3'){
            hashHistory.push('/toolboxWhite')
        }else if(Cookies.get('deptLevel') === '4'){
            hashHistory.push('/toolboxWhite')
        }
        // hashHistory.push('/toolbox')
    }
  render() {
    return (
      <div className="zhegai-redirect-toolbox"></div>
    )
  }
}