/**
 * Created by GTR on 2017/9/19.
 */
import React,{Component} from 'react';

export default class TalkNewsLeft extends Component{

    render(){
        return <div className="talkLeft-con">
            <div className="talkLeft-img"><p></p></div>
            <div className="talkLeft-detail"><p>{this.props.company}</p><div>{this.props.detail}</div></div>
            <div style={{clear:'both'}}></div>
        </div>
    }
}