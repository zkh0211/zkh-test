/**
 * Created by GTR on 2017/9/19.
 */
import React,{Component} from 'react';

export default class TalkNewsRight extends Component{

    render(){
        return <div className="talkRight-con">
            <div className="talkRight-img"><p></p></div>
            <div className="talkRight-detail">
                <p>{this.props.company}</p>
                <div>{this.props.detail}</div></div>
            <div style={{clear:'both'}}></div>
        </div>
    }
}