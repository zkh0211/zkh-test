/**
 * Created by GTR on 2017/10/19.
 */
import React, {Component} from 'react';
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import './subscription.less';
import './main.less';
import {Steps, Button, message ,Checkbox, Radio, Modal} from 'antd';
import Cookies from 'js-cookie';
import {
    saveSubscription,
    listCode
}from 'actions/subscriptionAction'

const RadioGroup = Radio.Group;
const Step = Steps.Step;
const steps = [{
    title: '订阅辖区',
    //  content: BookArea,
    // path: './component/bookArea',
}, {
    title: '订阅警案情',
    //  content: BookCase,
    // path:'./component/bookCase',
}, {
    title: '订阅综合情报',
    //  content: BookInformation,
    // path:'./component/bookInformation',
}, {
    title: '订阅预警情报',
    // content: BookEarlyWarning,
    // path:'./component/bookEarlyWarning',
}
];

@connect((state, props) => ({
    config: state.config
  }))


export default class SubScription extends Component {
    constructor(props) {
        super(props);

        
        this.state = {
            gxjgdm : Cookies.get("gxjgdm"),
            // gxjgdm:'',
            current: 0,
            codeData: [],
            policeData: [],
            policeCity: [],
            result: [],
            booleanCode: false,
            lastCodeId: '-1',
            arrayIds: new Array(),
            code: [],
            codeDataType: [],
            typeData: [],
            codeName: "",
            typeName: "",
            resultCode: [],
            checked: true,
            innerhtml: '',
            inner: ''

        };
    }

    checkTable() {
        let list = this.state.resultCode;
        let arr = [];
        let indexs = [];
        this.refs["tablehtml"].querySelectorAll(".htmlcheck").forEach(function (v, i) {
            if (!v.checked) {
                arr.push(v.id);
            }
        });
        this.refs["tablehtml1"].querySelectorAll(".htmlcheck1").forEach(function (v, i) {
            if (!v.checked) {
                arr.push(v.id);
            }
        })
        arr.forEach(function (v, i) {
            indexs.push(list.indexOf(v));
        })
        indexs.reverse()
        //  console.log(indexs);
        if (indexs.length > 0) {
            for (let i = 0; i < indexs.length; i++) {
                list.splice(indexs[i], 1);
            }
        }
        //console.log(list)
        indexs = [];
        this.setState({resultCode: list})
    }

    next() {
        if (this.state.arrayIds.length <= 0) {
            Modal.warning({
                title: '提示',
                content: '请选择订阅的辖区',
                width: 300,
                okText: '取消',
            });
            return;
        }
        let refName = "stepDivs" + this.state.current;
        this.refs[refName].style.display = "none";
        const current = this.state.current + 1;
        this.setState({current});
        refName = "stepDivs" + current;
        this.refs[refName].style.display = "block";
    }

    prev() {
        let refName = "stepDivs" + this.state.current;
        this.refs[refName].style.display = "none";

        const current = this.state.current - 1;
        this.setState({current});
        refName = "stepDivs" + current;
        this.refs[refName].style.display = "block";
    }

    success() {
        let t = this;
        this.checkTable();

        // fetch({
        //     url: GlobalData.saveSubscription,
        //     method: 'POST',
        //     data: {area: this.state.arrayIds, code: this.state.resultCode, userId: Cookies.get("username")}
        // }).then((res) => {
            this.props.dispatch(saveSubscription({area: this.state.arrayIds, code: this.state.resultCode, userId: Cookies.get("username")},(res)=>{
                if (res['status'] === 200) {
                    Modal.success({
                        title: '成功',
                        content: '订阅成功',
                        width: 300,
                        okText: '确认',
                        onOk() {
                            // console.log('OK');
                            hashHistory.push('/dailyBriefing')
                        },
                        onCancel() {
                            // console.log('Cancel');
                        },
    
    
                    });
    
                }
            }));
          

        // });


    }


    refreshGXJGDM() {
        let _this = this;
        this.props.dispatch(listCode({deptId: this.state.gxjgdm},(res)=>{
            if (res['status'] === 200) {
                res.data.code[0].list.forEach( (data, index, array)=> {
                    if (data.id === this.state.gxjgdm) {
                        array[index] = array[0];
                        array[0] = data;
                    }
                });
                let arr = new Array();
                res['data']['type']['C0001']['list'].forEach(function (v, i) {
                    arr.push(v.id);
                })
                res['data']['type']['C0008']['list'].forEach(function (v, i) {
                    arr.push(v.id);
                })
                
                let html = "<tbody>";
                let title;
                let team = res['data']['type']['C0015']['list'];
                for (var i = 0; i < team.length; i++) {
                    if (team[i]['list']) {
                        title = team[i]['name'];
                        html += "<tr><td>" + title + ":</td>";
                        for (var j = 0; j < team[i]['list'].length; j++) {
                            arr.push(team[i]['list'][j]['id'])
                            html += "<td><label class='checkbox-inline'><input  class='htmlcheck' type='checkbox' id='" + team[i]['list'][j]['id'] + "'  value='" + team[i]['list'][j]['name'] + "'  checked=' checked'/>" + team[i]['list'][j]['name'] + "</label></td>";
                        }
                        html += "</tr>"
                    }
                }
                html += "</tbody>";


                let html1 = "<tbody>";
                let title1;
                let team1 = res['data']['type']['C0068']['list'];
                for (var i = 0; i < team1.length; i++) {
                    if (team1[i]['list']) {
                        title1 = team1[i]['name'];
                        html1 += "<tr><td>" + title1 + "</td>";
                        for (var j = 0; j < team1[i]['list'].length; j++) {
                            arr.push(team1[i]['list'][j]['id'])

                            html1 += "<td><label class='checkbox-inline'><input class='htmlcheck1' type='checkbox' id='" + team1[i]['list'][j]['id'] + "'  value='" + team1[i]['list'][j]['name'] + "'  checked=' checked'/>" + team1[i]['list'][j]['name'] + "</label></td>";
                        }
                        html1 += "</tr>"
                    }
                }
                html1 += "</tbody>";


                this.setState({
                    policeCity: res['data']['code'][0],
                    codeData: res['data']['code'][0]['list'],
                    policeData: [],
                    code: res['data']['type'],
                    codeDataType: res['data']['type']['C0001']['list'],
                    typeData: res['data']['type']['C0008']['list'],
                    codeName: res['data']['type']['C0001']['name'],
                    typeName: res['data']['type']['C0008']['name'],
                    resultCode: arr,
                    innerhtml: html,
                    inner: html1

                }, () => {
                });
                // console.log(this.state.codeData)


            }
        }))
      
    }

    componentWillMount() {
        this.refreshGXJGDM();
    }

    handleChange(checkedValues) {
        this.setState({arrayIds: checkedValues});
    }

    handleChangeJQ(checkedValues) {
        if (!checkedValues.target.checked) {
            this.state.resultCode.splice(this.state.resultCode.indexOf(checkedValues.target.value), 1)
        } else {
            this.state.resultCode.push(checkedValues.target.value);
        }
    }

    handleChangeRadio(e) {

        let list = [];
        this.state.codeData.forEach( (v, i)=> {
            if (v.id == e) {
                if (v.id != v.list[0].id && v.id == this.state.gxjgdm) {
                    v.list.unshift({id: v.id, name: v.name})
                }
                list = v.list

                return;
            }
        });
        this.setState({
            policeData: list

        })

    }


    render() {
        const {current} = this.state;

        return (
            <div className="subscription-contain">
                <div className="subscription-content">
                    <Steps current={current}>
                        {steps.map(item => <Step key={item.title} title={item.title}/>)}
                    </Steps>
                    <div className="row" ref="stepDivs0" style={{display: 'block'}}>
                        <div className="step-pane active" id="simplewizardstep1" style={{width:'100%',height:'100%'}}>
                            <div className="row">
                                <div className="rowType" id="sj">
                                    <p className="list-group-item active" style={{paddingLeft: "40px"}}>
                                        市局
                                    </p>
                                    <p className="list-group-item city" id={this.state.policeCity.id}
                                       style={{paddingLeft: "3.43rem"}}>{this.state.policeCity.name}</p>
                                </div>
                                <div className="rowType">
                                    <p className="list-group-item active" style={{paddingLeft: "40px"}}>
                                        分局
                                    </p>
                                    <div className="scrollHeight  substation"
                                         style={{overflowY: "auto", height: "92%"}}>
                                        <RadioGroup onChange={(e) => this.handleChangeRadio(e.target.value)}
                                                    defaultValue="">
                                            {
                                                this.state.codeData.map((item, index) => {

                                                    return (
                                                        <Radio key={item.id} value={item.id}
                                                               className="list-group-item">{item.name}</Radio>
                                                    )
                                                })
                                            }
                                        </RadioGroup>
                                    </div>
                                </div>
                                <div className="rowType ">
                                    <p href="#" className="list-group-item active" style={{paddingLeft: "40px"}}>
                                        派出所
                                    </p>
                                    <div className="scrollHeight policeStation"
                                         style={{overflowY: "auto", height: "92%"}}>
                                        <Checkbox.Group onChange={(e) => this.handleChange(e)}>
                                            {this.state.policeData.map((item, index) => {
                                                    return (
                                                        <Checkbox className="list-group-item" key={item.id}
                                                                  style={{paddingLeft: "3.43rem"}}
                                                                  value={item.id}>{item.name}</Checkbox>
                                                    )
                                                }
                                            )}
                                        </Checkbox.Group>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row" ref="stepDivs1" style={{width: "99.9%", marginLeft: "0.1%", display: 'none'}}>
                        <div className="rowKind">
                            <div className="step-content" id="simplewizard-steps" style={{
                                background: "url(assets/img/img/gzgd_01.png) no-repeat 100% 100%",
                                padding: "5px"
                            }}>
                                <div className="step-pane" id="simplewizardstep2">
                                    <p href="#" className="list-group-item active"
                                       style={{color: "#ffffff", paddingLeft: "40px"}}>
                                        <span style={{fontSize: "16px"}}>{this.state.codeName}</span>&nbsp;
                                    </p>
                                    {/*<Checkbox.Group >*/}
                                    <table className="table no-border">
                                        <tbody>
                                        <tr>

                                            {

                                                this.state.codeDataType.map((item, index) => {
                                                    return (
                                                        <td ><label className="checkbox-inline"><Checkbox
                                                            onChange={(e) => this.handleChangeJQ(e)}
                                                            defaultChecked={true} key={item.id}
                                                            value={item.id}>{item.name}</Checkbox ></label></td>
                                                    )
                                                })
                                            }
                                        </tr>
                                        </tbody>
                                    </table>

                                    {/*</Checkbox.Group>*/}


                                    <p href="#" className="list-group-item active"
                                       style={{color: "#ffffff", paddingLeft: "40px"}}>
                                        <span style={{fontSize: "16px"}}>{this.state.typeName}</span>&nbsp;
                                    </p>
                                    <table className="table no-border">
                                        <tbody>
                                        <tr>
                                            {
                                                this.state.typeData.map((item, index) => {
                                                    return (
                                                        <td ><label className="checkbox-inline"><Checkbox
                                                            onChange={(e) => this.handleChangeJQ(e)}
                                                            defaultChecked={true} key={item.id}
                                                            value={item.id}>{item.name}</Checkbox ></label></td>

                                                        // <td><label className="checkbox-inline"><input type="checkbox" key={index} value={item.id}  checked="checked"/>{item.name}</label></td>

                                                    )
                                                })
                                            }
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div ref="stepDivs2" className="row" style={{display: 'none', width: "99.9%", marginLeft: "0.1%"}}>
                        <div className="col-lg-12 col-sm-12 col-xs-12">
                            <div className="step-content" id="simplewizard-steps" style={{
                                background: "url(assets/img/img/gzgd_01.png) no-repeat 100% 100%",
                                padding: "5px"
                            }}>
                                <div className="step-pane" id="simplewizardstep4">
                                    <p href="#" className="list-group-item active"
                                       style={{color: "#ffffff", paddingLeft: "40px"}}>
                                        <span style={{fontSize: "16px"}}>关注范围或场所</span>&nbsp;
                                    </p>
                                    <table className="table  no-border" ref="tablehtml"
                                           dangerouslySetInnerHTML={{__html: this.state.innerhtml}}></table>

                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row" ref="stepDivs3" style={{display: 'none', width: "99.9%", marginLeft: "0.1%"}}>
                        <div className="col-lg-12 col-sm-12 col-xs-12">
                            <div className="step-content" id="simplewizard-steps" style={{
                                background: "url(assets/img/img/gzgd_01.png) no-repeat 100% 100%",
                                padding: "5px"
                            }}>
                                <div className="step-pane" id="simplewizardstep5">
                                    <p href="#" className="list-group-item active"
                                       style={{color: "#ffffff", paddingLeft: "40px"}}>
                                        <span style={{fontSize: "1rem"}}>实时预警模板</span>&nbsp;
                                    </p>
                                    <table className="table  no-border" ref="tablehtml1"
                                           dangerouslySetInnerHTML={{__html: this.state.inner}}></table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="steps-action">
                        {
                            this.state.current < steps.length - 1
                            &&
                            <Button type="primary" id="btn1" onClick={() => this.next()}>下一步</Button>
                        }
                        {
                            this.state.current === steps.length - 1
                            &&
                            <Button type="primary" id="btn2" onClick={() => this.success()}>提交</Button>
                        }
                        {
                            this.state.current > 0
                            &&
                            <Button style={{marginLeft: 8}} id="btn3" onClick={() => this.prev()}>
                                上一步
                            </Button>
                        }
                    </div>

                </div>

            </div>
        );
    }
}






