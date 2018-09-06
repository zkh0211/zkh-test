import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import Cookies from 'js-cookie'

export default class GoHecheng extends Component {
    componentWillMount(){
        if(Cookies.get('authCode')&&Cookies.get('authCode').indexOf('hczhRole') !== -1){
            hashHistory.push('/master/1/0/1')
        }else{
            hashHistory.push('/averagePolice/1')
        }
    }
  render() {
    return (
      <div className="zhegai-redirect-hecheng"></div>
    )
  }
}
