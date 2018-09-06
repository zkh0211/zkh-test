/**
 * Created by ljs on 2018/5/12.
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { hashHistory } from "react-router";
import Cookies from 'js-cookie'
import 'jquery'
import $ from 'jquery'
import "./toolBox.less";
import { Checkbox, message, Tabs } from "antd";
import Tool1 from "../../images/toolBox/tool1.png";
import ToolboxWhite from '../../images/toolBox/simplebgk2.png'
const TabPane = Tabs.TabPane;

@connect((state, props) => ({ config: state.config }))
export default class toolBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.params.id,
      state: this.props.params.state,
      titleName: "合成作战研判工具集（分局）",
        toolInfo: [
            {
                title: "研判工具",
                key: "yanpan",
                children: [
                    { img: "gxtp", title: "关系图谱" , link: 'http://10.95.18.122:3000/login2?username=zhzx'},
                    { img: "smkj", title: "数模空间"  , link: ''},
                    { img: "ajcb", title: "案件串并" , link: 'http://10.95.94.162:9029/criminalCaseAnalysis/views/homepage.jsp?username=tyga' },
                    { img: "txzq", title: "图像增强" , link: 'http://10.95.18.139:5000/ImgEnhance.html' },
                    { img: "qbmf", title: "情报魔方" , link: '' },
                    { img: "rydamx", title: "人员档案模型" , link: 'http://10.95.94.67/pcsII/pcspublic/Zhcx?corename=peopleidx' },
                    { img: "cldamx", title: "车辆档案模型" , link: 'http://10.95.94.67/pcsII/pcspublic/Zhcx?corename=caridx' },
                    { img: "ajdamx", title: "案件档案模型" , link: 'http://10.95.94.67/pcsII/pcspublic/Zhcx?corename=caseidx' },
                    { img: "txdamx", title: "通信档案模型" , link: 'http://10.95.94.67/pcsII/pcspublic/Zhcx?corename=mobileidx2' }
                ]
            },
            {
                title: "警务云搜",
                key: "yunsou",
                children: [
                    { img: "bys", title: "部云搜" , link: ''},
                    { img: "sys", title: "省云搜" , link: ''},
                    { img: "sys1", title: "市云搜" , link: 'http://10.95.94.67/pcsII/pcspublic/index' }
                ]
            },
            {
                title: "特侦手段",
                key: "tezhen",
                children: [
                    { img: "fzsd", title: "反诈手段" , link: ''},
                    { img: "jzsd", title: "技侦手段" , link: ''},
                    { img: "wzsd", title: "网侦手段" , link: ''},
                    { img: "tzsd", title: "图侦手段" , link: ''}
                ]
            },
            {
                title: "实战应用",
                key: "shizhan",
                children: [
                    { img: "qbyy", title: "情报应用",  link:'http://10.95.95.120:8080/DQB/loginJwy.do'},
                    { img: "jtrldb", title: "静态人脸比对" , link: ''},
                    { img: "dtrldb", title: "动态人脸比对" , link: ''},
                    { img: "xzyy", title: "刑侦应用" , link: 'http://10.95.95.191:9080/platform/login'},
                    { img: "fkwwyy", title: "反恐维稳应用" , link: 'http://10.95.95.88/fysp'},
                    { img: "syhyy", title: "食药环应用" , link: 'http://10.95.95.157:8081/ITAP/LCDLJK'},
                    { img: "rlsbyy", title: "人脸识别应用" , link: 'http://10.95.95.160/apollo-web/web/login!login4ThirdUrl.action'},
                    { img: "rkyy", title: "人口应用", link: '' },
                    { img: "zayy", title: "治安应用" , link: 'http://10.95.95.72:9088/tyrdm/pkiLogin2.action'},
                    { img: "dtyy", title: "地图应用" , link: 'http://10.95.95.103:7080/PGISMap'},
                    { img: "jzyy", title: "经侦应用" , link: 'http://10.95.94.239:8080/eicp/index.htm'},
                    { img: "qyhzyy", title: "区域合作应用", link: '' },
                    { img: "qyhzyy", title: "区域合作应用", link: 'http://10.95.94.168:8080/xfwwszpt/index.htm' }


                ]
            },
            {
                title: "协作手段",
                key: "xiezuo",
                children: [
                    { img: "albb", title: "阿里吧吧" },
                    { img: "tx", title: "腾讯" },
                    { img: "mtdp", title: "美团点评" }
                ]
            },
            {
                title: "人工智能",
                key: "rengong",
                children: [
                    { img: "ajcp", title: "案件串并",link: 'http://10.95.94.162:9029/criminalCaseAnalysis/views/homepage.jsp?username=tyga' },
                    { img: "shxe", title: "扫黑险恶" , link: ''},
                    { img: "qbfx", title: "情报分析" , link: ''}
                ]
            },

            {
                title: "布控预警",
                key: "bukong",
                children: [
                    { img: "dsjbkyj", title: "大数据布控预警", link:`http://10.95.94.109:8080/bms/` },
                    // { img: "dsjbkyj", title: "大数据布控预警", link:`http://10.95.94.109:8080/bms/?no=${Cookies.get('cardId')}` },
                    { img: "jz", title: "技侦" , link: ''},
                    { img: "wa", title: "网安", link: '' }
                ]
            },
            {
                title: "大数据分析",
                key: "dashuju",
                children: [
                    { img: "wbswrysdmx", title: "网吧上网人员涉毒模型" , link: ''},
                    { img: "shcemx", title: "扫黑除恶模型" , link: ''},
                    { img: "djsdmx", title: "叠加手段模型" , link: ''},
                    { img: "fwsjfxmx", title: "蜂乌数据分析模型" , link: ''},
                    { img: "dtrlgjmx", title: "动态人脸轨迹模型" , link: ''},
                    { img: "clbsmx", title: "车辆伴随模型" , link: ''},
                    { img: "rydamx", title: "人员档案模型", link:'http://10.95.94.67/pcsII/pcspublic/Zhcx?corename=peopleidx' },
                    { img: "cldamx", title: "车辆档案模型", link: 'http://10.95.94.67/pcsII/pcspublic/Zhcx?corename=caridx' },
                    { img: "ajdamx", title: "案件档案模型", link:'http://10.95.94.67/pcsII/pcspublic/Zhcx?corename=caseidx' },
                    { img: "txdamx", title: "通信档案模型", link:'http://10.95.94.67/pcsII/pcspublic/Zhcx?corename=mobileidx2' }
                ]
            }
        ]
    };
  }

  componentWillMount() {
    let values = this.props.params;
    let { id } = values;
    if(Cookies.get('deptLevel') === '2'){
      this.setState({
        titleName: "合成作战研判工具集（市局）"
      })
    }
    else if(Cookies.get('deptLevel') === '3'){
      this.setState({
        titleName: "合成作战研判工具集（分局）"
      })
    }else if(Cookies.get('deptLevel') === '4'){
      this.setState({
        titleName: "合成作战研判工具集（派出所）"
      })
    }
  }

  
  openWin (e) {
    let link = e.currentTarget.getAttribute('data-link');
    let img = e.currentTarget.getAttribute('data-img');
    if(img === 'gxtp'){
      window.open(link)
    }else{
        if(link === ''){
            window.open(link)
        }else{
            $(e.currentTarget).find("form").submit();
        }
    }
    // if(link !== ''){

    //     $(e.currentTarget).find("form").submit();
    //   // let newWindow = window.open(link);
    //   // let method = 'POST';
    //   // let cardId = Cookies.get('cardId');//人员身份证信息
    //   // let cardId = '140922198712080016';
    //   // if(link.indexOf('bms')!==-1){
    //   //   method = "GET"
    //   //   cardId = '';
    //   // }else{
    //   //   method = 'POST';
    //   //   cardId = '140922198712080016';
    //   // }
    //   // let html = `<html><head><body>
    //   //   <form action="${link}" method=${method} id="form">
    //   //     <input type="hidden" name="no" value=${cardId}/>
    //   //   </form>
    //   //   <script>
    //   //     document.getElementById("form").submit()
    //   //   </script>
    //   // </body></head></html>`
    //   // newWindow.document.write(html);
    // }
  }

  render() {
    return (
      <div className="toolBox toolBoxWhite">
        <div className="title_box">
          <span>{this.state.titleName}</span>
        </div>
        <div className="content_box" style={{backgroundImage:`url(${ToolboxWhite})`}}>
          <div className="card-container">
            <Tabs type="card">
              {this.state.toolInfo.map((item, index) => {
                return (
                  <TabPane tab={item.title} key={item.key}>
                    <div className="inner_flex" key={index}>
                      {item.children.map((child, index) => {
                        return (
                          <div className="toolItem" key={index} onClick={this.openWin.bind(this)} data-link={child.link?child.link:''} data-img={child.img?child.img:''}>
                            <div className="imgItem">
                              {/*<img className="img" src={`${global.$GLOBALCONFIG.img}/images/toolBox/${child.img}.png`}/>*/}
                              <img
                                className="img"
                                src={require("../../images/toolBox/" +
                                  child.img +
                                  ".png")}
                              />
                                <form action={child.link} method="post" target="_blank">
                                    <input type="hidden" name="no" value="14010219611229061X"/>
                                </form>
                              <div>{child.title}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </TabPane>
                );
              })}
              {/*<TabPane tab="Tab Title 1" key="1">
                                <div className="inner_flex">
                                </div>
                            </TabPane>
                            <TabPane tab="Tab Title 2" key="2">
                                <p>Content of Tab Pane 2</p>
                                <p>Content of Tab Pane 2</p>
                                <p>Content of Tab Pane 2</p>
                            </TabPane>
                            <TabPane tab="Tab Title 3" key="3">
                                <p>Content of Tab Pane 3</p>
                                <p>Content of Tab Pane 3</p>
                                <p>Content of Tab Pane 3</p>
                            </TabPane>*/}
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}
