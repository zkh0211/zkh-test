/**
 * Created by GTR on 2017/9/13.
 */
import React,{Component} from 'react';

export default class WarnTable extends Component {



    render(){
        let obj=this.props.datatable;
        let listtr=[];
        obj.forEach((data,index)=>{
            listtr.push(<tr><td>{data.id}</td><td>{data.cardId}</td><td>{data.jifen}</td><td>{data.leixing}</td><td>{data.jibie}</td><td>{data.changsuo}</td></tr>)
        });
        return <div className="warn-table-con">
            <table style={{borderCollapse:'collapse'}} className="warn-table">
                <thead>
                <tr>
                    <th>人员</th><th>身份证</th><th>预警积分</th><th>类型</th><th>级别</th><th>预警场所</th>
                </tr>
                </thead>
                <tbody>
                {listtr}
                </tbody>

            </table>
        </div>
    }
}