import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Select, DatePicker, message, Input, Tree, Checkbox  } from 'antd'
import { 
    policePeopleList,
    checkWhiteSheet,
    peizhi,
    getAreaList,
    getPersonType
} from 'actions/masterAction'

const Option = Select.Option
const TreeNode = Tree.TreeNode
const CheckboxGroup = Checkbox.Group
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

@connect(
    (state,props)=>({
        config: state.config
    })
)

export default class PeizhiGuolv extends Component{
    constructor(props){
        super(props)
        this.state = {
            checkedListStr:'全国',
            person:'',
            rangeDate:[],
            selectedKeys:[],
            checkedKeys: ['0|全国'],
            area1:[{
                title: '全国',
                key:"全国",
                children:[
                    {title: '北京市', key:'北京市'},
                    {title: '上海市', key:'上海市'},
                    {title: '天津市', key:'天津市'},
                    {title: '重庆市', key:'重庆市'},
                    { 
                        title: '河北省',
                        key:'河北省',
                        children:[
                            {title: '石家庄市', key:'石家庄市'},
                            {title: '唐山市', key:'唐山市'},
                            {title: '秦皇岛市', key:'秦皇岛市'},
                            {title: '邯郸市', key:'邯郸市'},
                            {title: '邢台市', key:'邢台市'},
                            {title: '保定市', key:'保定市'},
                            {title: '张家口市', key:'张家口市'},
                            {title: '承德市', key:'承德市'},
                            {title: '沧州市', key:'沧州市'},
                            {title: '廊坊市', key:'廊坊市'},
                            {title: '衡水市', key:'衡水市'},
                        ]
                    }, 
                    { 
                        title: '山西省',
                        key:'山西省',
                        children:[
                            {title: '太原市', key:'太原市'},
                            {title: '大同市', key:'大同市'},
                            {title: '阳泉市', key:'阳泉市'},
                            {title: '长治市', key:'长治市'},
                            {title: '晋城市', key:'晋城市'},
                            {title: '朔州市', key:'朔州市'},
                            {title: '晋中市', key:'晋中市'},
                            {title: '运城市', key:'运城市'},
                            {title: '忻州市', key:'忻州市'},
                            {title: '临汾市', key:'临汾市'},
                            {title: '吕梁市', key:'吕梁市'},
                        ]
                    },
                    { 
                        title: '内蒙古自治区',
                        key:'内蒙古自治区',
                        children:[
                            {title: '呼和浩特市', key:'呼和浩特市'},
                            {title: '包头市', key:'包头市'},
                            {title: '乌海市', key:'乌海市'},
                            {title: '赤峰市', key:'赤峰市'},
                            {title: '通辽市', key:'通辽市'},
                            {title: '鄂尔多斯市', key:'鄂尔多斯市'},
                            {title: '呼伦贝尔市', key:'呼伦贝尔市'},
                            {title: '巴彦淖尔市', key:'巴彦淖尔市'},
                            {title: '乌兰察布市', key:'乌兰察布市'},
                            {title: '兴安盟', key:'兴安盟'},
                            {title: '锡林郭勒盟', key:'锡林郭勒盟'},
                            {title: '阿拉善盟', key:'阿拉善盟'},
                        ]
                    },
                    { 
                        title: '黑龙江省',
                        key:'黑龙江省',
                        children:[
                            {title: '哈尔滨市', key:'哈尔滨市'},
                            {title: '齐齐哈尔市', key:'齐齐哈尔市'},
                            {title: '牡丹江市', key:'牡丹江市'},
                            {title: '佳木斯市', key:'佳木斯市'},
                            {title: '大庆市', key:'大庆市'},
                            {title: '鸡西市', key:'鸡西市'},
                            {title: '双鸭山市', key:'双鸭山市'},
                            {title: '伊春市', key:'伊春市'},
                            {title: '七台河市', key:'七台河市'},
                            {title: '鹤岗市', key:'鹤岗市'},
                            {title: '黑河市', key:'黑河市'},
                            {title: '绥化市', key:'绥化市'},
                            {title: '大兴安岭地区', key:'大兴安岭地区'},
                        ]
                    },
                    { 
                        title: '吉林省',
                        key:'吉林省',
                        children:[
                            {title: '长春市', key:'长春市'},
                            {title: '吉林市', key:'吉林市'},
                            {title: '四平市', key:'四平市'},
                            {title: '辽源市', key:'辽源市'},
                            {title: '通化市', key:'通化市'},
                            {title: '白山市', key:'白山市'},
                            {title: '松原市', key:'松原市'},
                            {title: '白城市', key:'白城市'},
                            {title: '延边朝鲜族自治州', key:'延边朝鲜族自治州'},
                           
                        ]
                    },
                    { 
                        title: '辽宁省',
                        key:'辽宁省',
                        children:[
                            {title: '沈阳市', key:'沈阳市'},
                            {title: '大连市', key:'大连市'},
                            {title: '鞍山市', key:'鞍山市'},
                            {title: '抚顺市', key:'抚顺市'},
                            {title: '本溪市', key:'本溪市'},
                            {title: '丹东市', key:'丹东市'},
                            {title: '锦州市', key:'锦州市'},
                            {title: '营口市', key:'营口市'},
                            {title: '阜新市', key:'阜新市'},
                            {title: '辽阳市', key:'辽阳市'},
                            {title: '盘锦市', key:'盘锦市'},
                            {title: '铁岭市', key:'铁岭市'},
                            {title: '朝阳市', key:'朝阳市'},
                            {title: '葫芦岛市', key:'葫芦岛市'},
                        ]
                    },
                    { 
                        title: '山东省',
                        key:'山东省',
                        children:[
                            {title: '济南市', key:'济南市'},
                            {title: '青岛市', key:'青岛市'},
                            {title: '淄博市', key:'淄博市'},
                            {title: '东营市', key:'东营市'},
                            {title: '烟台市', key:'烟台市'},
                            {title: '潍坊市', key:'潍坊市'},
                            {title: '威海市', key:'威海市'},
                            {title: '济宁市', key:'济宁市'},
                            {title: '泰安市', key:'泰安市'},
                            {title: '日照市', key:'日照市'},
                            {title: '临沂市', key:'临沂市'},
                            {title: '德州市', key:'德州市'},
                            {title: '聊城市', key:'聊城市'},
                            {title: '滨州市', key:'滨州市'},
                            {title: '菏泽市', key:'菏泽市'},
                        ]
                    },
                    { 
                        title: '江苏省',
                        key:'江苏省',
                        children:[
                            {title: '南京市', key:'南京市'},
                            {title: '无锡市', key:'无锡市'},
                            {title: '徐州市', key:'徐州市'},
                            {title: '常州市', key:'常州市'},
                            {title: '苏州市', key:'苏州市'},
                            {title: '南通市', key:'南通市'},
                            {title: '连云港市', key:'连云港市'},
                            {title: '淮安市', key:'淮安市'},
                            {title: '盐城市', key:'盐城市'},
                            {title: '扬州市', key:'扬州市'},
                            {title: '镇江市', key:'镇江市'},
                            {title: '泰州市', key:'泰州市'},
                            {title: '宿迁市', key:'宿迁市'},
                        ]
                    },
                    { 
                        title: '浙江省',
                        key:'浙江省',
                        children:[
                            {title: '杭州市', key:'杭州市'},
                            {title: '宁波市', key:'宁波市'},
                            {title: '温州市', key:'温州市'},
                            {title: '嘉兴市', key:'嘉兴市'},
                            {title: '湖州市', key:'湖州市'},
                            {title: '绍兴市', key:'绍兴市'},
                            {title: '金华市', key:'金华市'},
                            {title: '衢州市', key:'衢州市'},
                            {title: '舟山市', key:'舟山市'},
                            {title: '台州市', key:'台州市'},
                            {title: '丽水市', key:'丽水市'}
                        ]
                    },
                    { 
                        title: '安徽省',
                        key:'安徽省',
                        children:[
                            {title: '合肥市', key:'合肥市'},
                            {title: '芜湖市', key:'芜湖市'},
                            {title: '蚌埠市', key:'蚌埠市'},
                            {title: '淮南市', key:'淮南市'},
                            {title: '马鞍山市', key:'马鞍山市'},
                            {title: '铜陵市', key:'铜陵市'},
                            {title: '安庆市', key:'安庆市'},
                            {title: '淮北市', key:'淮北市'},
                            {title: '黄山市', key:'黄山市'},
                            {title: '滁州市', key:'滁州市'},
                            {title: '阜阳市', key:'阜阳市'},
                            {title: '宿州市', key:'宿州市'},
                            {title: '巢湖市', key:'巢湖市'},
                            {title: '六安市', key:'六安市'},
                            {title: '亳州市', key:'亳州市'},
                            {title: '池州市', key:'池州市'},
                            {title: '宣城市', key:'宣城市'},
                        ]
                    },
                    { 
                        title: '江西省',
                        key:'江西省',
                        children:[
                            {title: '南昌市', key:'南昌市'},
                            {title: '景德镇市', key:'景德镇市'},
                            {title: '萍乡市', key:'萍乡市'},
                            {title: '九江市', key:'九江市'},
                            {title: '新余市', key:'新余市'},
                            {title: '鹰潭市', key:'鹰潭市'},
                            {title: '赣州市', key:'赣州市'},
                            {title: '吉安市', key:'吉安市'},
                            {title: '抚州市', key:'抚州市'},
                            {title: '上饶市', key:'上饶市'}
                        ]
                    },
                    { 
                        title: '福建省',
                        key:'福建省',
                        children:[
                            {title: '福州市', key:'福州市'},
                            {title: '厦门市', key:'厦门市'},
                            {title: '莆田市', key:'莆田市'},
                            {title: '三明市', key:'三明市'},
                            {title: '泉州市', key:'泉州市'},
                            {title: '漳州市', key:'漳州市'},
                            {title: '南平市', key:'南平市'},
                            {title: '龙岩市', key:'龙岩市'},
                            {title: '宁德市', key:'宁德市'}
                        ]
                    },
                    { 
                        title: '河南省',
                        key:'河南省',
                        children:[
                            {title: '郑州市', key:'郑州市'},
                            {title: '开封市', key:'开封市'},
                            {title: '洛阳市', key:'洛阳市'},
                            {title: '平顶山市', key:'平顶山市'},
                            {title: '焦作市', key:'焦作市'},
                            {title: '鹤璧市', key:'鹤璧市'},
                            {title: '新乡市', key:'新乡市'},
                            {title: '安阳市', key:'安阳市'},
                            {title: '濮阳市', key:'濮阳市'},
                            {title: '漯河市', key:'漯河市'},
                            {title: '三门峡市', key:'三门峡市'},
                            {title: '南阳市', key:'南阳市'},
                            {title: '商丘市', key:'商丘市'},
                            {title: '信阳市', key:'信阳市'},
                            {title: '周口市', key:'周口市'},
                            {title: '驻马店市', key:'驻马店市'},
                        ]
                    },
                    { 
                        title: '湖北省',
                        key:'湖北省',
                        children:[
                            {title: '武汉市', key:'武汉市'},
                            {title: '黄石市', key:'黄石市'},
                            {title: '襄樊市', key:'襄樊市'},
                            {title: '十堰市', key:'十堰市'},
                            {title: '荆州市', key:'荆州市'},
                            {title: '宜昌市', key:'宜昌市'},
                            {title: '荆门市', key:'荆门市'},
                            {title: '鄂州市', key:'鄂州市'},
                            {title: '孝感市', key:'孝感市'},
                            {title: '黄冈市', key:'黄冈市'},
                            {title: '咸宁市', key:'咸宁市'},
                            {title: '随州市', key:'随州市'},
                            {title: '恩施土家族苗族自治州', key:'恩施土家族苗族自治州'}
                        ]
                    },
                    { 
                        title: '湖南省',
                        key:'湖南省',
                        children:[
                            {title: '长沙市', key:'长沙市'},
                            {title: '株洲市', key:'株洲市'},
                            {title: '湘潭市', key:'湘潭市'},
                            {title: '衡阳市', key:'衡阳市'},
                            {title: '邵阳市', key:'邵阳市'},
                            {title: '岳阳市', key:'岳阳市'},
                            {title: '常德市', key:'常德市'},
                            {title: '张家界市', key:'张家界市'},
                            {title: '益阳市', key:'益阳市'},
                            {title: '郴州市', key:'郴州市'},
                            {title: '永州市', key:'永州市'},
                            {title: '怀化市', key:'怀化市'},
                            {title: '娄底市', key:'娄底市'},
                            {title: '湘西土家族苗族自治州', key:'湘西土家族苗族自治州'}
                        ]
                    },
                    { 
                        title: '广东省',
                        key:'广东省',
                        children:[
                            {title: '广州市', key:'广州市'},
                            {title: '深圳市', key:'深圳市'},
                            {title: '珠海市', key:'珠海市'},
                            {title: '汕头市', key:'汕头市'},
                            {title: '韶关市', key:'韶关市'},
                            {title: '佛山市', key:'佛山市'},
                            {title: '江门市', key:'江门市'},
                            {title: '湛江市', key:'湛江市'},
                            {title: '茂名市', key:'茂名市'},
                            {title: '肇庆市', key:'肇庆市'},
                            {title: '惠州市', key:'惠州市'},
                            {title: '梅州市', key:'梅州市'},
                            {title: '汕尾市', key:'汕尾市'},
                            {title: '河源市', key:'河源市'},
                            {title: '阳江市', key:'阳江市'},
                            {title: '清远市', key:'清远市'},
                            {title: '东莞市', key:'东莞市'},
                            {title: '潮州市', key:'潮州市'},
                            {title: '揭阳市', key:'揭阳市'},
                            {title: '云浮市', key:'云浮市'}
                        ]
                    }
                ]
            }],
            postArea: [],
            area:[],
            options:['涉稳','涉军','精神病人','非访','太原'],
            postPerson:[],
            optionsKey:[],
            getCurrentArea:['0']
        }
    }

    componentWillMount(){
        let keys = [];
        let personType = ''
        this.setState({
            postPerson: this.state.options
        },()=>{
            this.state.postPerson.forEach((item)=>{
                personType = personType + item + ','
            })
            this.setState({
                person: personType
            })
        })
        this.props.dispatch(getAreaList({},(res)=>{
            if(res.data){
                this.setState({
                    area: res.data
                })
            }
        }))
      
     

      
    }


    selectArea = (value) => {
        this.setState({
            area: value.target.value
        })
    }

    rangeTime = (date, dateString) => {
        
            this.setState({
                rangeDate: dateString
            })
               
    }

    save = () => {
        let ruleList = [
            {"fileDesc":'重点关注时间段',"fieldName":'FCRQ', "fieldValue": this.state.rangeDate[0]&&this.state.rangeDate[1]?this.state.rangeDate[0]+":"+this.state.rangeDate[1]:""}, 
        ]
        this.state.postPerson.forEach((item)=>{
            ruleList.push({"fileDesc":'重点关注人员类型',"fieldName":'RYLB', "fieldValue": item})
        })
        if(this.state.postArea.length>0){
            this.state.postArea.forEach((item)=>{
                ruleList.push(
                    {"fileDesc":'重点关注地区',"fieldName":'DZ', "fieldValue":item.split('|')[1]}
                )
            })
        }
       
        // console.log(ruleList)
       
        this.props.dispatch(peizhi(JSON.stringify(ruleList),(res)=>{
            if(res.rel){
                message.success("保存成功",3)
            }
        }))

    
    }
    onCheck = (checkedKeys) => {
        let checkedList = checkedKeys;
        let checkedStr = '';
        let getCurrentArea = [];
        let ifAll = false;
        let arr = [];
        for(let i = 0; i<checkedList.length; i++){
            getCurrentArea.push(checkedList[i].split("|")[0])
            if(checkedList[i].split("|")[1] === '全国'){
                ifAll = true;
                arr.push(checkedList[i])
                break;
            }
        }
        
        if(ifAll){
            this.setState({ 
                getCurrentArea: ['0'],
                checkedKeys:arr ,
                checkedListStr: checkedKeys[0].split("|")[1]
             },()=>{
             
             });
        }else{
            checkedList.forEach((item,index)=>{
                if(index === (checkedList.length-1)){
                    checkedStr = checkedStr + item.split("|")[1]
                }else{
                    checkedStr = checkedStr + item.split("|")[1] + ","
                }
            })
            this.setState({ 
                getCurrentArea: getCurrentArea,
                checkedKeys: checkedKeys,
                checkedListStr: checkedStr
             },()=>{
                let areas = checkedKeys;
                let arr = [];
                arr = this.state.area[0].children;
                    for(let i=0; i< checkedKeys.length; i++){
                        let address = checkedKeys[i].split('|');
                        for(let j=0; j<arr.length; j++){
                            if(address[1] === arr[j].name){
                                if((address[1].indexOf("北京")!== -1) ||(address[1].indexOf('天津')!==-1)||(address[1].indexOf('上海')!==-1)||(address[1].indexOf('重庆')!==-1)){

                                }else{
                                    areas.splice(i,1)
                                }
                               
                            }
                        }
                    }
                this.setState({
                   postArea: areas
                })
             });
        }
      
    }
    renderTreeNodes = (data) => {
        return data.map((item) => {
                if(item.name.indexOf('北京')!==-1){
                    item.children = []
                }
                if(item.name.indexOf('天津')!==-1){
                    item.children = []
                }
                if(item.name.indexOf('重庆')!==-1){
                    item.children = []
                }
                if(item.name.indexOf('上海')!==-1){
                    item.children = []
                }
            if (item.children) {
                return (
                    <TreeNode title={item.name} key={item.value+"|"+item.name} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
            
        });
    }

    changePeople = (values) => {
        // console.log(values)
        let personType = '';
        values.forEach((item,index)=>{
            personType = personType + item + ','
     
        })
       
        this.setState({
            person: personType,
            postPerson: values
        })
    }
    render(){
        let { getDirectionSearch } = this.props;
        return(
            <div className="peizhi-contain"  style={{backgroundColor:'white'}}>
                <div className="peizhi-show">
                    <p>当前已配置条件</p>
                    <table>
                        <tbody>
                            <tr>
                                <td>重点关注地区:</td> <td colSpan={9} title={this.state.checkedListStr}><span style={{display:'inline-block',height: '2rem','fontSize':'1.125rem', whiteSpace:'nowrap',overflow: 'hidden'}}>{this.state.checkedListStr}</span></td>
                            </tr>
                            <tr>
                                <td>重点关注时间段:</td> <td colSpan={4}>{this.state.rangeDate.length>0&&(this.state.rangeDate[0]+'  ~  '+this.state.rangeDate[1])}</td>
                                <td>重点关注人员类型:</td> <td colSpan={4}>{this.state.person}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="peizhi-select">
                    <table>
                        <tbody>
                            <tr>
                                <td>重点关注时间段:</td>
                                <td colSpan={2}> <RangePicker onChange={this.rangeTime}  placeholder={['开始时间', '结束时间']}/></td>
                                <td>重点关注人员类型:</td>
                                <td colSpan={4}>
                                    <Checkbox.Group style={{ width: '100%' }} value={this.state.postPerson} onChange={this.changePeople}>
                                        {
                                            this.state.options.map((item,index)=>{
                                                return <Checkbox key={index} value={item}>{item}</Checkbox>
                                            })
                                        }
                                    </Checkbox.Group>                          
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="guanZhuDiQu">
                        <p>重点关注地区：</p>
                        <div>
                            <Tree
                                checkable
                                checkedKeys={this.state.checkedKeys}
                                onCheck={this.onCheck}
                            >
                                {this.renderTreeNodes(this.state.area)}
                            </Tree>
                        </div>
                        <div style={{clear: 'both'}}></div>
                    </div>
                    <div style={{width: '100%',textAlign: 'right'}}>
                        <button className="button" onClick={this.save}>保存</button>
                    </div>
                </div>

            </div>
        )
    }
}