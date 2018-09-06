import React,{Component} from 'react'
import { connect } from 'react-redux'
import {Input,Menu,Table, Pagination,Checkbox,AutoComplete,Button,message} from 'antd';
import SuperBack from '../../../images/analysis/searchBackground.png'
// const plainOptions = ['Apple', 'Pear', 'Orange'];
// const defaultCheckedList = ['Apple', 'Orange'];
import '../../../style/base.less'
import './superSearch.less'
import {
    cluster,superSearch
} from 'actions/analysisForPoliceAction'
import { Spin } from 'antd'
const Search = Input.Search;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const CheckboxGroup = Checkbox.Group;
@connect(

)

export default class SuperSearch extends Component{

    constructor(props) {
        super(props);
        this.state = {
            newsKey:'',
            searchList: [
                {
                name: '人员库', num: 0,
                lists: [{name: '常住人口信息', num: 110, url: ''},
                    {name: '全国暂住人口', num: 60, url: ''},
                    {name: '户变动信息', num: 70, url: ''},
                    {name: '户成员变动信息', num: 80, url: ''}]
            },
                {
                    name: '物品库', url: '', num: 0,
                    lists: [{name: '拘留所信息', num: 110, url: ''},
                        {name: '戒毒所信息', num: 90, url: ''},
                        {name: '看守所信息', num: 130, url: ''},
                        {name: '监所信息', num: 70, url: ''}]
                }],
            openKeys: [],
            rootSubmenuKeys: ['0', '1'],
            showWindow1: true,
            fankui: false,
            fankuiSuccess: false,
            responseData: {},
            responseData1: {},
            responseData2: {},
            total: 0,
            total1: 0,
            total2: 0,
            loading:false,
            dataList:[],
            columns:{
                trail:[
                    {
                        title: 'TRAIL_NAME',
                        dataIndex: 'TRAIL_NAME',
                        key: 'TRAIL_NAME',
                    },{
                        title: 'CARD',
                        dataIndex: 'CARD',
                        key: 'CARD',
                    }, {
                        title: 'SEX',
                        dataIndex: 'SEX',
                        key: 'SEX',
                    }, {
                        title: 'PHONE',
                        dataIndex: 'PHONE',
                        key: 'PHONE',
                    } ,{
                        title: 'TRAIL_TIME',
                        dataIndex: 'TRAIL_TIME',
                        key: 'TRAIL_TIME',

                    } ,{
                        title: 'VEHICLE_ID_SIGN',
                        dataIndex: 'VEHICLE_ID_SIGN',
                        key: 'VEHICLE_ID_SIGN',

                    },{
                        title: 'TRAIL_ADDR',
                        dataIndex: 'TRAIL_ADDR',
                        key: 'TRAIL_ADDR',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                wtryxx:[
                    {
                        title: '姓名',
                        dataIndex: '姓名',
                        key: '姓名',
                    },{
                        title: '身份证号',
                        dataIndex: '身份证号',
                        key: '身份证号',
                    }, {
                        title: '性别',
                        dataIndex: '性别',
                        key: '性别',
                    }, {
                        title: '联系电话',
                        dataIndex: '本人_联系电话',
                        key: '本人_联系电话',
                    } ,{
                        title: '出生日期',
                        dataIndex: '出生日期',
                        key: '出生日期',

                    } ,{
                        title: '人员类型',
                        dataIndex: '人员类型',
                        key: '人员类型',

                    },{
                        title: '上报时间',
                        dataIndex: '上报时间',
                        key: '上报时间',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                zdrldxx:[
                    {
                        title: '姓名',
                        dataIndex: '姓名',
                        key: '姓名',
                    },{
                        title: '身份证号',
                        dataIndex: '公民身份号码',
                        key: '身份证号',
                    }, {
                        title: '营业场所名称',
                        dataIndex: '营业场所名称',
                        key: '营业场所名称',
                    }, {
                        title: '人员类型',
                        dataIndex: '人员类型',
                        key: '人员类型',
                    } ,{
                        title: '户籍地',
                        dataIndex: '户籍地',
                        key: '户籍地',

                    } ,{
                        title: '信息入库时间',
                        dataIndex: '信息入库时间',
                        key: '信息入库时间',

                    },{
                        title: '管辖机关名称',
                        dataIndex: '管辖机关名称',
                        key: '管辖机关名称',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                zdryxx:[
                    {
                        title: '姓名',
                        dataIndex: '姓名',
                        key: '姓名',
                    },{
                        title: '身份证号',
                        dataIndex: '公民身份号码',
                        key: '身份证号',
                    }, {
                        title: '人员类别',
                        dataIndex: '人员类别',
                        key: '人员类别',
                    }, {
                        title: '人员类型',
                        dataIndex: '人员类型',
                        key: '人员类型',
                    } ,{
                        title: '户籍地',
                        dataIndex: '户籍地',
                        key: '户籍地',

                    } ,{
                        title: '信息入库时间',
                        dataIndex: '信息入库时间',
                        key: '信息入库时间',

                    },{
                        title: '管辖机关名称',
                        dataIndex: '管辖机关名称',
                        key: '管辖机关名称',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                jyxx:[
                    {
                        title: '姓名',
                        dataIndex: '姓名',
                        key: '姓名',
                    },{
                        title: '身份证号',
                        dataIndex: '身份证号',
                        key: '身份证号',
                    }, {
                        title: '警衔',
                        dataIndex: '警衔',
                        key: '警衔',
                    }, {
                        title: '警种',
                        dataIndex: '警种',
                        key: '警种',
                    } ,{
                        title: '职务',
                        dataIndex: '职务',
                        key: '职务',

                    } ,{
                        title: '来所工作时间',
                        dataIndex: '来所工作时间',
                        key: '来所工作时间',

                    },{
                        title: '民警责任区',
                        dataIndex: '民警责任区',
                        key: '民警责任区',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                wbxx:[
                    {
                        title: '姓名',
                        dataIndex: '姓名',
                        key: '姓名',
                    },{
                        title: '公民身份号码',
                        dataIndex: '公民身份号码',
                        key: '公民身份号码',
                    }, {
                        title: '人员类型',
                        dataIndex: '人员类型',
                        key: '人员类型',
                    }, {
                        title: '营业场所名称',
                        dataIndex: '营业场所名称',
                        key: '营业场所名称',
                    } ,{
                        title: '行政区划',
                        dataIndex: '行政区划',
                        key: '行政区划',

                    } ,{
                        title: '管辖机关',
                        dataIndex: '管辖机关',
                        key: '管辖机关',

                    },{
                        title: '户籍地',
                        dataIndex: '户籍地',
                        key: '户籍地',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                wsdpqpxx:[
                    {
                        title: '旅客姓名',
                        dataIndex: '旅客姓名',
                        key: '旅客姓名',
                    },{
                        title: '旅客证件号',
                        dataIndex: '旅客证件号',
                        key: '旅客证件号',
                    }, {
                        title: '旅客联系电话',
                        dataIndex: '旅客联系电话',
                        key: '旅客联系电话',
                    }, {
                        title: '到站名称',
                        dataIndex: '到站名称',
                        key: '到站名称',
                    } ,{
                        title: '车牌号',
                        dataIndex: '车牌号',
                        key: '车牌号',

                    } ,{
                        title: '客运站名称',
                        dataIndex: '客运站名称',
                        key: '客运站名称',

                    },{
                        title: '取票时间',
                        dataIndex: '取票时间',
                        key: '取票时间',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                wsdp:[
                    {
                        title: '旅客姓名',
                        dataIndex: '旅客姓名',
                        key: '旅客姓名',
                    },{
                        title: '旅客证件号',
                        dataIndex: '旅客证件号',
                        key: '旅客证件号',
                    }, {
                        title: '旅客联系电话',
                        dataIndex: '旅客联系电话',
                        key: '旅客联系电话',
                    }, {
                        title: '到站名称',
                        dataIndex: '到站名称',
                        key: '到站名称',
                    } ,{
                        title: '车牌号',
                        dataIndex: '车牌号',
                        key: '车牌号',

                    } ,{
                        title: '客运站名称',
                        dataIndex: '客运站名称',
                        key: '客运站名称',

                    },{
                        title: '发车时间',
                        dataIndex: '发车时间',
                        key: '发车时间',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                ckgp:[
                    {
                        title: '旅客姓名',
                        dataIndex: '旅客姓名',
                        key: '旅客姓名',
                    },{
                        title: '旅客证件号',
                        dataIndex: '旅客证件号',
                        key: '旅客证件号',
                    }, {
                        title: '票号',
                        dataIndex: '票号',
                        key: '票号',
                    }, {
                        title: '到站名称',
                        dataIndex: '到站名称',
                        key: '到站名称',
                    } ,{
                        title: '车牌号',
                        dataIndex: '车牌号',
                        key: '车牌号',

                    } ,{
                        title: '客运站名称',
                        dataIndex: '客运站名称',
                        key: '客运站名称',

                    },{
                        title: '发车时间',
                        dataIndex: '发车时间',
                        key: '发车时间',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                kssxx:[
                    {
                        title: '姓名',
                        dataIndex: '姓名',
                        key: '姓名',
                    },{
                        title: '身份证号',
                        dataIndex: '身份证号',
                        key: '身份证号',
                    }, {
                        title: '籍贯',
                        dataIndex: '籍贯',
                        key: '籍贯',
                    }, {
                        title: '送押单位',
                        dataIndex: '送押单位',
                        key: '送押单位',
                    } ,{
                        title: '涉嫌罪名',
                        dataIndex: '涉嫌罪名',
                        key: '涉嫌罪名',

                    } ,{
                        title: '户籍所在地',
                        dataIndex: '户籍所在地',
                        key: '户籍所在地',

                    },{
                        title: '入所时间',
                        dataIndex: '入所时间',
                        key: '入所时间',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                ajwsxx:[
                    {
                        title: '案件名称',
                        dataIndex: '案件名称',
                        key: '案件名称',
                    },{
                        title: '笔录_名称',
                        dataIndex: '笔录_名称',
                        key: '笔录_名称',
                    }, {
                        title: '文书编号',
                        dataIndex: '文书编号',
                        key: '文书编号',
                    }, {
                        title: '照片编号',
                        dataIndex: '照片编号',
                        key: '照片编号',
                    } ,{
                        title: '录入时间',
                        dataIndex: '录入时间',
                        key: '录入时间',

                    } ,{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                ajxx:[
                    {
                        title: '案件名称',
                        dataIndex: '案件名称',
                        key: '案件名称',
                    },{
                        title: '案件编号',
                        dataIndex: '案件编号',
                        key: '案件编号',
                    }, {
                        title: '案件类别',
                        dataIndex: '案件类别',
                        key: '案件类别',
                    }, {
                        title: '案件来源',
                        dataIndex: '案件来源',
                        key: '案件来源',
                    } ,{
                        title: '案件状态',
                        dataIndex: '案件状态',
                        key: '案件状态',

                    } ,{
                        title: '接警单位',
                        dataIndex: '接警单位',
                        key: '接警单位',

                    },{
                        title: '结案时间',
                        dataIndex: '结案时间',
                        key: '结案时间',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                ajrygl:[
                    {
                        title: '录入人',
                        dataIndex: '录入人',
                        key: '录入人',
                    },{
                        title: '案件编号',
                        dataIndex: '案件编号',
                        key: '案件编号',
                    }, {
                        title: '录入单位',
                        dataIndex: '录入单位',
                        key: '录入单位',
                    }, {
                        title: '人员编号',
                        dataIndex: '人员编号',
                        key: '人员编号',
                    } ,{
                        title: '呈送审批单位',
                        dataIndex: '呈送审批单位',
                        key: '呈送审批单位',

                    } ,{
                        title: '撤销原因',
                        dataIndex: '撤销原因',
                        key: '撤销原因',

                    },{
                        title: '删除原因',
                        dataIndex: '删除原因',
                        key: '删除原因',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                jdcxx:[
                    {
                        title: '机动车所有人',
                        dataIndex: '机动车所有人',
                        key: '机动车所有人',
                    },{
                        title: '身份证明号码',
                        dataIndex: '身份证明号码',
                        key: '身份证明号码',
                    }, {
                        title: '中文品牌',
                        dataIndex: '中文品牌',
                        key: '中文品牌',
                    }, {
                        title: '制造厂名称',
                        dataIndex: '制造厂名称',
                        key: '制造厂名称',
                    } ,{
                        title: '机动车状态',
                        dataIndex: '机动车状态',
                        key: '机动车状态',

                    } ,{
                        title: '车辆型号',
                        dataIndex: '车辆型号',
                        key: '车辆型号',

                    },{
                        title: '号牌种类',
                        dataIndex: '号牌种类',
                        key: '号牌种类',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                lkxx:[
                    {
                        title: '旅客姓名',
                        dataIndex: '旅客姓名',
                        key: '旅客姓名',
                    },{
                        title: '身份证号码',
                        dataIndex: '身份证号码',
                        key: '身份证号码',
                    }, {
                        title: '性别',
                        dataIndex: '性别间',
                        key: '性别',
                    }, {
                        title: '始发站',
                        dataIndex: '始发站',
                        key: '始发站',
                    } ,{
                        title: '目的地名称',
                        dataIndex: '目的地名称',
                        key: '目的地名称',

                    } ,{
                        title: '登机牌号',
                        dataIndex: '登机牌号',
                        key: '登机牌号',

                    },{
                        title: '联系方式',
                        dataIndex: '联系方式',
                        key: '联系方式',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                lkdj:[
                    {
                        title: '登机通道',
                        dataIndex: '登机通道',
                        key: '登机通道',
                    },{
                        title: '登机安检人员编号',
                        dataIndex: '登机安检人员编号',
                        key: '登机安检人员编号',
                    }, {
                        title: '登机时间',
                        dataIndex: '登机时间',
                        key: '登机时间',
                    }, {
                        title: '旅客记录号',
                        dataIndex: '旅客记录号',
                        key: '旅客记录号',
                    } ,{
                        title: '出入口标识',
                        dataIndex: '出入口标识',
                        key: '出入口标识',

                    } ,{
                        title: '有效标志位名称',
                        dataIndex: '有效标志位名称',
                        key: '有效标志位名称',

                    },{
                        title: '状态',
                        dataIndex: '状态',
                        key: '状态',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                lkzp:[
                    {
                        title: '照片',
                        dataIndex: '照片',
                        key: '照片',

                    } ,
                    {
                        title: '安检信息ID',
                        dataIndex: '安检信息ID',
                        key: '安检信息ID',
                    },{
                        title: '有效标志位',
                        dataIndex: '有效标志位',
                        key: '有效标志位',
                    }, {
                        title: '照片名称',
                        dataIndex: '照片名称',
                        key: '照片名称',
                    }, {
                        title: '状态',
                        dataIndex: '状态',
                        key: '状态',
                    } ,{
                        title: 'ODC更新时间',
                        dataIndex: 'ODC更新时间',
                        key: 'ODC更新时间',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                jjxx:[
                    {
                        title: '用户姓名',
                        dataIndex: '用户姓名',
                        key: '用户姓名',
                    },{
                        title: '用户地址',
                        dataIndex: '用户地址',
                        key: '用户地址',
                    }, {
                        title: '案发地点',
                        dataIndex: '案发地点',
                        key: '案发地点',
                    }, {
                        title: '报警车牌号',
                        dataIndex: '报警车牌号',
                        key: '报警车牌号',
                    } ,{
                        title: '报警电话',
                        dataIndex: '报警电话',
                        key: '报警电话',

                    } ,{
                        title: '警情类别',
                        dataIndex: '警情类别',
                        key: '警情类别',

                    },{
                        title: '警情类型',
                        dataIndex: '警情类型',
                        key: '警情类型',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                jlsxx:[
                    {
                        title: '姓名',
                        dataIndex: '姓名',
                        key: '姓名',
                    },{
                        title: '身份证号',
                        dataIndex: '身份证号',
                        key: '身份证号',
                    }, {
                        title: '性别',
                        dataIndex: '性别',
                        key: '性别',
                    }, {
                        title: '职业',
                        dataIndex: '职业',
                        key: '职业',
                    } ,{
                        title: '案件名称',
                        dataIndex: '案件名称',
                        key: '案件名称',

                    } ,{
                        title: '类别名称',
                        dataIndex: '类别名称',
                        key: '类别名称',

                    },{
                        title: '派出所名称',
                        dataIndex: '派出所名称',
                        key: '派出所名称',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                hcybdxx:[
                    {
                        title: '姓名',
                        dataIndex: '姓名',
                        key: '姓名',
                    },{
                        title: '公民身份号码',
                        dataIndex: '公民身份号码',
                        key: '公民身份号码',
                    }, {
                        title: '与户主关系',
                        dataIndex: '与户主关系',
                        key: '与户主关系',
                    }, {
                        title: '户类型',
                        dataIndex: '户类型',
                        key: '户类型',
                    } ,{
                        title: '户成员变动类型',
                        dataIndex: '户成员变动类型',
                        key: '户成员变动类型',

                    } ,{
                        title: '户号',
                        dataIndex: '户号',
                        key: '户号',

                    },{
                        title: '申报人联系电话',
                        dataIndex: '申报人联系电话',
                        key: '申报人联系电话',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                hbdxx:[
                    {
                        title: '变动人姓名',
                        dataIndex: '变动人姓名',
                        key: '变动人姓名',
                    },{
                        title: '变动时间',
                        dataIndex: '变动时间',
                        key: '变动时间',
                    }, {
                        title: '户主姓名',
                        dataIndex: '户主姓名',
                        key: '户主姓名',
                    }, {
                        title: '门楼详址',
                        dataIndex: '门楼详址',
                        key: '门楼详址',
                    } ,{
                        title: '变动人警号',
                        dataIndex: '变动人警号',
                        key: '变动人警号',

                    } ,{
                        title: '所属市',
                        dataIndex: '所属市',
                        key: '所属市',

                    },{
                        title: '街路巷名称',
                        dataIndex: '街路巷名称',
                        key: '街路巷名称',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                jdsxx:[
                    {
                        title: '姓名',
                        dataIndex: '姓名',
                        key: '姓名',
                    },{
                        title: '身份证号码',
                        dataIndex: '身份证号码',
                        key: '身份证号码',
                    }, {
                        title: '性别',
                        dataIndex: '性别',
                        key: '性别',
                    }, {
                        title: '职业',
                        dataIndex: '职业',
                        key: '职业',
                    } ,{
                        title: '案件名称',
                        dataIndex: '案件名称',
                        key: '案件名称',

                    } ,{
                        title: '地址',
                        dataIndex: '地址',
                        key: '地址',

                    },{
                        title: '工作地点',
                        dataIndex: '工作地点',
                        key: '工作地点',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                czrkxx:[
                    {
                        title: '姓名',
                        dataIndex: '姓名',
                        key: '姓名',
                    },{
                        title: '身份证号码',
                        dataIndex: '公民身份号码',
                        key: '公民身份号码',
                    }, {
                        title: '性别',
                        dataIndex: '性别',
                        key: '性别',
                    }, {
                        title: '文化程度',
                        dataIndex: '文化程度',
                        key: '文化程度',
                    } ,{
                        title: '职业',
                        dataIndex: '职业',
                        key: '职业',

                    } ,{
                        title: '住址',
                        dataIndex: '住址',
                        key: '住址',

                    },{
                        title: '婚姻状况',
                        dataIndex: '婚姻状况',
                        key: '婚姻状况',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                jyxlxx:[
                    {
                        title: '旅客记录号',
                        dataIndex: '旅客记录号',
                        key: '旅客记录号',
                    },{
                        title: '过检类型',
                        dataIndex: '过检类型',
                        key: '过检类型',
                    }, {
                        title: '过检时间',
                        dataIndex: '过检时间',
                        key: '过检时间',
                    }, {
                        title: '始发站',
                        dataIndex: '始发站',
                        key: '始发站',
                    } ,{
                        title: '过检编号',
                        dataIndex: '过检编号',
                        key: '过检编号',

                    } ,{
                        title: '目的站名称',
                        dataIndex: '目的站名称',
                        key: '目的站名称',

                    },{
                        title: '记录编号',
                        dataIndex: '记录编号',
                        key: '记录编号',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                anjxx:[
                    {
                        title: '安检信息ID',
                        dataIndex: '安检信息ID',
                        key: '安检信息ID',
                    },{
                        title: '旅客流水号',
                        dataIndex: '旅客流水号',
                        key: '旅客流水号',
                    }, {
                        title: '安全标记',
                        dataIndex: '安全标记',
                        key: '安全标记',
                    }, {
                        title: '安检通道',
                        dataIndex: '安检通道',
                        key: '安检通道',
                    } ,{
                        title: '安检人员编号',
                        dataIndex: '安检人员编号',
                        key: '安检人员编号',

                    } ,{
                        title: '未正常安检时出口',
                        dataIndex: '未正常安检时出口',
                        key: '未正常安检时出口',

                    },{
                        title: '安检时间',
                        dataIndex: '安检时间',
                        key: '安检时间',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                cjxx:[
                    {
                        title: '姓名',
                        dataIndex: '处警员姓名',
                        key: '姓名',
                    },{
                        title: '处警员编号',
                        dataIndex: '处警员编号',
                        key: '处警员编号',
                    }, {
                        title: '处警单位',
                        dataIndex: '处警单位',
                        key: '处警单位',
                    }, {
                        title: '处警时间',
                        dataIndex: '处警时间',
                        key: '处警时间',
                    } ,{
                        title: '处警台IP地址',
                        dataIndex: '处警台IP地址',
                        key: '处警台IP地址',

                    } ,{
                        title: '接警单编号',
                        dataIndex: '接警单编号',
                        key: '接警单编号',

                    },{
                        title: '处警意见',
                        dataIndex: '处警意见',
                        key: '处警意见',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                jnlkzs:[
                    {
                        title: '姓名',
                        dataIndex: '姓名',
                        key: '姓名',
                    },{
                        title: '证件号码',
                        dataIndex: '证件号码',
                        key: '证件号码',
                    }, {
                        title: '性别',
                        dataIndex: '性别',
                        key: '性别',
                    }, {
                        title: '旅馆名称',
                        dataIndex: '旅馆名称',
                        key: '旅馆名称',
                    } ,{
                        title: '房间号码',
                        dataIndex: '房间号码',
                        key: '房间号码',

                    } ,{
                        title: '旅馆地址',
                        dataIndex: '旅馆地址',
                        key: '旅馆地址',

                    },{
                        title: '入住时间',
                        dataIndex: '入住时间',
                        key: '入住时间',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                csyjglb:[
                    {
                        title: '中文字段名',
                        dataIndex: '中文字段名',
                        key: '中文字段名',
                        // render: text => <a href="javascript:;">{text}</a>,
                    },{
                        title: '英文字段名',
                        dataIndex: '英文字段名',
                        key: '英文字段名',
                    }, {
                        title: '字段值',
                        dataIndex: '字段值',
                        key: '字段值',
                    }, {
                        title: '外键',
                        dataIndex: '外键',
                        key: '外键',
                    } ,{
                        title: '唯一标识',
                        dataIndex: '唯一标识',
                        key: '唯一标识',

                    } ,{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                csyj:[
                    {
                        title: '布控单位',
                        dataIndex: '布控单位',
                        key: '布控单位',
                        // render: text => <a href="javascript:;">{text}</a>,
                    },{
                        title: '布控源类型',
                        dataIndex: '布控源类型',
                        key: '布控源类型',
                    }, {
                        title: '报警时间',
                        dataIndex: '报警时间',
                        key: '报警时间',
                    }, {
                        title: '比对关键信息',
                        dataIndex: '比对关键信息',
                        key: '比对关键信息',
                    } ,{
                        title: '任务标题',
                        dataIndex: '任务标题',
                        key: '任务标题',

                    } ,{
                        title: '责任单位',
                        dataIndex: '责任单位',
                        key: '责任单位',

                    },{
                        title: '经度',
                        dataIndex: '经度',
                        key: '经度',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                xdry:[
                    {
                        title: '姓名',
                        dataIndex: '姓名',
                        key: '姓名',
                        // render: text => <a href="javascript:;">{text}</a>,
                    },{
                        title: '身份证号',
                        dataIndex: '18位身份证号',
                        key: '18位身份证号',
                    }, {
                        title: '性别',
                        dataIndex: '性别',
                        key: '性别',
                    }, {
                        title: '民族',
                        dataIndex: '民族',
                        key: '民族',
                    } ,{
                        title: '户籍地',
                        dataIndex: '户籍地',
                        key: '户籍地',

                    } ,{
                        title: '人员类型',
                        dataIndex: '人员类型',
                        key: '人员类型',

                    },{
                        title: '文化程度',
                        dataIndex: '文化程度',
                        key: '文化程度',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                fkxx:[
                    {
                        title: '反馈人姓名',
                        dataIndex: '反馈人姓名',
                        key: '反馈人姓名',
                        // render: text => <a href="javascript:;">{text}</a>,
                    },{
                        title: '反馈人编号',
                        dataIndex: '反馈人编号',
                        key: '反馈人编号',
                    }, {
                        title: '反馈单状态',
                        dataIndex: '反馈单状态',
                        key: '反馈单状态',
                    }, {
                        title: '反馈单位IP地址',
                        dataIndex: '反馈单位IP地址',
                        key: '反馈单位IP地址',
                    } ,{
                        title: '反馈时间',
                        dataIndex: '反馈时间',
                        key: '反馈时间',

                    } ,{
                        title: '出警情况',
                        dataIndex: '出警情况',
                        key: '出警情况',

                    },{
                        title: '出警人姓名',
                        dataIndex: '出警人姓名',
                        key: '出警人姓名',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                qkry:[
                    {
                        title: '姓名',
                        dataIndex: '姓名',
                        key: '姓名',
                        // render: text => <a href="javascript:;">{text}</a>,
                    },{
                        title: '身份证号',
                        dataIndex: '身份证号',
                        key: '身份证号',
                    }, {
                        title: '性别',
                        dataIndex: '性别',
                        key: '性别',
                    }, {
                        title: '住址',
                        dataIndex: '住址',
                        key: '住址',
                    } ,{
                        title: '案件类别',
                        dataIndex: '案件类别',
                        key: '案件类别',

                    } ,{
                        title: '工作单位',
                        dataIndex: '工作单位',
                        key: '工作单位',

                    },{
                        title: '户籍地址',
                        dataIndex: '户籍地址',
                        key: '户籍地址',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                qgjsrxx:[
                    {
                        title: '姓名',
                        dataIndex: '姓名',
                        key: '姓名',
                        // render: text => <a href="javascript:;">{text}</a>,
                    },{
                        title: '证件号码',
                        dataIndex: '身份证明号码',
                        key: '证件号码',
                    }, {
                        title: '驾驶证状态',
                        dataIndex: '驾驶证状态',
                        key: '驾驶证状态',
                    }, {
                        title: '准驾车型',
                        dataIndex: '准驾车型',
                        key: '准驾车型',
                    } ,{
                        title: '有效期始',
                        dataIndex: '有效期始',
                        key: '有效期始',

                    } ,{
                        title: '有效期止',
                        dataIndex: '有效期止',
                        key: '有效期止',

                    },{
                        title: '联系电话',
                        dataIndex: '联系电话',
                        key: '联系电话',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                qgmhdp:[
                    {
                        title: '姓名',
                        dataIndex: '中文名',
                        key: '姓名',
                        // render: text => <a href="javascript:;">{text}</a>,
                    },{
                        title: '证件号码',
                        dataIndex: '证件号码',
                        key: '证件号码',
                    }, {
                        title: '航班号',
                        dataIndex: '航班号',
                        key: '航班号',
                    }, {
                        title: '航空公司',
                        dataIndex: '航空公司',
                        key: '航空公司',
                    } ,{
                        title: '出发日期',
                        dataIndex: '出发日期',
                        key: '出发日期',

                    } ,{
                        title: '降落时间',
                        dataIndex: '降落时间',
                        key: '降落时间',

                    },{
                        title: '旅客序号',
                        dataIndex: '旅客序号',
                        key: '旅客序号',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                qgzzrk:[
                    {
                        title: '姓名',
                        dataIndex: '姓名',
                        key: '姓名',
                        // render: text => <a href="javascript:;">{text}</a>,
                    },{
                        title: '公民身份号码',
                        dataIndex: '公民身份号码',
                        key: '公民身份号码',
                    }, {
                        title: '性别',
                        dataIndex: '性别',
                        key: '性别',
                    }, {
                        title: '出生日期',
                        dataIndex: '出生日期',
                        key: '出生日期',
                    } ,{
                        title: '常住户口地址祥址',
                        dataIndex: '常住户口地址祥址',
                        key: '常住户口地址祥址',

                    } ,{
                        title: '联系方式',
                        dataIndex: '联系方式',
                        key: '联系方式',

                    },{
                        title: '户口类别',
                        dataIndex: '与户口类别',
                        key: '户口类别',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                qgztrydj:[
                    {
                        title: '姓名',
                        dataIndex: '姓名',
                        key: '姓名',
                        // render: text => <a href="javascript:;">{text}</a>,
                    },{
                        title: '身份证号',
                        dataIndex: '身份证号',
                        key: '身份证号',
                    }, {
                        title: '在逃人员编号',
                        dataIndex: '在逃人员编号',
                        key: '在逃人员编号',
                    }, {
                        title: '性别',
                        dataIndex: '性别',
                        key: '性别',
                    } ,{
                        title: '逃跑方向区划',
                        dataIndex: '逃跑方向区划',
                        key: '逃跑方向区划',

                    } ,{
                        title: '抓逃奖金',
                        dataIndex: '抓逃奖金',
                        key: '抓逃奖金',

                    },{
                        title: '逃跑时间',
                        dataIndex: '逃跑时间',
                        key: '逃跑时间',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                qgjtwzxx:[
                    {
                        title: '当事人',
                        dataIndex: '当事人',
                        key: '当事人',
                        // render: text => <a href="javascript:;">{text}</a>,
                    },{
                        title: '机动车所有人',
                        dataIndex: '机动车所有人',
                        key: '机动车所有人',
                    }, {
                        title: '号牌号码',
                        dataIndex: '号牌号码',
                        key: '号牌号码',
                    }, {
                        title: '性别',
                        dataIndex: '性别',
                        key: '性别',
                    } ,{
                        title: '违法行为',
                        dataIndex: '违法行为',
                        key: '违法行为',

                    } ,{
                        title: '执勤民警',
                        dataIndex: '执勤民警',
                        key: '执勤民警',

                    },{
                        title: '联系方式',
                        dataIndex: '联系方式',
                        key: '联系方式',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                xfryxx:[
                    {
                        title: '姓名',
                        dataIndex: '姓名',
                        key: '姓名',
                        // render: text => <a href="javascript:;">{text}</a>,
                    },{
                        title: '身份证号',
                        dataIndex: '公民身份号码',
                        key: '身份证号',
                    }, {
                        title: '操作标识',
                        dataIndex: '操作标识',
                        key: '操作标识',
                    }, {
                        title: '操作人_姓名',
                        dataIndex: '操作人_姓名',
                        key: '操作人_姓名',
                    } ,{
                        title: '操作单位',
                        dataIndex: '操作单位_公安机关名称',
                        key: '操作单位_公安机关名称',

                    } ,{
                        title: '登记人_姓名',
                        dataIndex: '登记人_姓名',
                        key: '登记人_姓名',

                    },{
                        title: '管控单位',
                        dataIndex: '管控单位_单位名称',
                        key: '管控单位_单位名称',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                ryyj:[
                    {
                        title: '姓名',
                        dataIndex: '姓名',
                        key: '姓名',
                        // render: text => <a href="javascript:;">{text}</a>,
                    },{
                        title: '身份证号',
                        dataIndex: '身份证号',
                        key: '身份证号',
                    }, {
                        title: '创建单位',
                        dataIndex: '创建单位',
                        key: '创建单位',
                    }, {
                        title: '车牌号',
                        dataIndex: '车牌号',
                        key: '车牌号',
                    } ,{
                        title: '分管单位',
                        dataIndex: '分管单位',
                        key: '分管单位',

                    } ,{
                        title: '联系方式',
                        dataIndex: '联系方式',
                        key: '联系方式',

                    },{
                        title: '责任单位',
                        dataIndex: '责任单位',
                        key: '责任单位',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                rytlccgjxx:[
                    {
                        title: '姓名',
                        dataIndex: '姓名',
                        key: '姓名',
                        // render: text => <a href="javascript:;">{text}</a>,
                    },{
                        title: '证件号码',
                        dataIndex: '证件号码',
                        key: '证件号码',
                    }, {
                        title: '车次',
                        dataIndex: '车次',
                        key: '车次',
                    }, {
                        title: '证件号码',
                        dataIndex: '旅客证件号',
                        key: '证件号码',
                    } ,{
                        title: '发站',
                        dataIndex: '发站',
                        key: '发站',

                    } ,{
                        title: '到站',
                        dataIndex: '到站',
                        key: '到站',

                    },{
                        title: '登记时间',
                        dataIndex: '登记时间',
                        key: '登记时间',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                scjp:[
                    {
                        title: '姓名',
                        dataIndex: '旅客姓名',
                        key: '姓名',
                    },{
                        title: '客运站名称',
                        dataIndex: '客运站名称',
                        key: '客运站名称',
                    }, {
                        title: '车牌号',
                        dataIndex: '车牌号',
                        key: '车牌号',
                    }, {
                        title: '证件号码',
                        dataIndex: '旅客证件号',
                        key: '证件号码',
                    } ,{
                        title: '发车时间',
                        dataIndex: '发车时间',
                        key: '发车时间',

                    } ,{
                        title: '到站名称',
                        dataIndex: '到站名称',
                        key: '到站名称',

                    },{
                        title: '联系电话',
                        dataIndex: '旅客联系电话',
                        key: '联系电话',

                    },{
                        title: '.....',
                        dataIndex: 'more',
                        key: 'more',

                    }],
                jsydjxx:[
                 {
                title: '姓名',
                dataIndex: '姓名',
                key: '姓名',
                // render: text => <a href="javascript:;">{text}</a>,
                },{
                title: '性别',
                dataIndex: '性别',
                key: '性别',
            }, {
                title: '住址',
                dataIndex: '住址',
                key: '住址',
            }, {
                title: '证件号码',
                dataIndex: '证件号码',
                key: '证件号码',
            } ,{
                title: '有效期',
                dataIndex: '有效期',
                key: '有效期',

            } ,{
                title: '驾驶证准驾车型',
                dataIndex: '机动车驾驶证准驾车型',
                key: '机动车驾驶证准驾车型',

            },{
                title: '联系电话',
                dataIndex: '联系电话',
                key: '联系电话',

            },{
                title: '.....',
                dataIndex: 'more',
                key: 'more',

            }],
                zdrxx: [
            {
                title: '姓名',
                dataIndex: '姓名',
                key: '姓名',
                // render: text => <a href="javascript:;">{text}</a>,
            },{
                title: '性别',
                dataIndex: '性别',
                key: '性别',
            },{
                title: '民族',
                dataIndex: '民族',
                key: '民族',
            }
            ,{
                title: '户籍地',
                dataIndex: '户籍地',
                key: '户籍地',
            }, {
                title: '现住址',
                dataIndex: '详细住址',
                key: '详细住址',
            }, {
                title: '身份号码',
                dataIndex: '公民身份号码',
                key: '公民身份号码',
            } ,{
                title: '职业',
                dataIndex: '职业',
                key: '职业',

            } ,{
                title: '重点人员类别',
                dataIndex: '重点人员类别',
                key: '重点人员类别',

            },{
                title: '.....',
                dataIndex: 'more',
                key: 'more',

            }],
                fjcj:[
            {
                title: '姓名',
                dataIndex: '姓名',
                key: '姓名',
                // render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: '性别',
                dataIndex: '性别',
                key: '性别',
            },{
                title: '出发地',
                dataIndex: '出发地',
                key: '出发地',
            }
            ,{
                title: '目的地',
                dataIndex: '目的地',
                key: '目的地',
            },{
                title: '证件号码',
                dataIndex: '证件号码',
                key: '证件号码',
            } ,{
                title: '航班号',
                dataIndex: '航班号',
                key: '航班号',

            }
            ,{
                title: '乘机日期',
                dataIndex: '乘机日期',
                key: '乘机日期',

            },{
                title: '.....',
                dataIndex: 'more',
                key: 'more',

            }],
                wbsw: [
            {
                title: '姓名',
                dataIndex: '姓名',
                key: '姓名',
                // render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: '身份号码',
                dataIndex: '公民身份号码',
                key: '公民身份号码',
            }
            ,{
                title: '网吧名称',
                dataIndex: '网吧名称',
                key: '网吧名称',
            }, {
                title: '地址',
                dataIndex: '地址',
                key: '地址',

            } ,{
                title: '上网时间',
                dataIndex: '上网时间',
                key: '上网时间',

            }
            ,{
                title: '下网时间',
                dataIndex: '下网时间',
                key: '下网时间',

            }
            ,{
                title: '终端编号',
                dataIndex: '终端编号',
                key: '终端编号',

            },{
                title: '.....',
                dataIndex: 'more',
                key: 'more',

            }],
                crjdj:[
            {
                title: '姓名',
                dataIndex: '姓名',
                key: '姓名',
                // render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: '性别',
                dataIndex: '性别',
                key: '性别',
            }
            ,{
                title: '民族',
                dataIndex: '民族',
                key: '民族',
            },{
                title: '发证地',
                dataIndex: '发证地',
                key: '发证地',
            } ,{
                title: '身份证',
                dataIndex: '身份证',
                key: '身份证',

            } ,{
                title: '发证日期',
                dataIndex: '发证日期',
                key: '发证日期',

            }
            ,{
                title: '有效期',
                dataIndex: '有效期',
                key: '有效期',

            }
            ,{
                title: '.....',
                dataIndex: 'more',
                key: 'more',

            }],
                ldzs:[
            {
                title: '姓名',
                dataIndex: '姓名',
                key: '姓名',
                // render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: '性别',
                dataIndex: '性别',
                key: '性别',
            }
            ,{
                title: '旅店名称',
                dataIndex: '旅店名称',
                key: '旅店名称',
            } ,{
                title: '身份号码',
                dataIndex: '公民身份号码',
                key: '公民身份号码',

            } ,{
                title: '入住房号',
                dataIndex: '入住房号',
                key: '入住房号',

            }
            ,{
                title: '入住时间',
                dataIndex: '入住时间',
                key: '入住时间',

            }
            ,{
                title: '退房时间',
                dataIndex: '退房时间',
                key: '退房时间',

            }
            ,{
                title: '.....',
                dataIndex: 'more',
                key: 'more',

            }],
                czrkdjb:[
            {
                title: '姓名',
                dataIndex: '姓名',
                key: '姓名',
                // render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: '性别',
                dataIndex: '性别',
                key: '性别',
            }
            ,{
                title: '民族',
                dataIndex: '民族',
                key: '民族',
            },{
                title: '详细住址',
                dataIndex: '详细住址',
                key: '详细住址',
            } ,{
                title: '身份证号',
                dataIndex: '身份证号',
                key: '身份证号',

            } ,{
                title: '出生地',
                dataIndex: '出生地',
                key: '出生地',

            }
            ,{
                title: '职业',
                dataIndex: '职业',
                key: '职业',

            }
            ,{
                title: '服务处所',
                dataIndex: '服务处所',
                key: '服务处所',

            }
            ,{
                title: '.....',
                dataIndex: 'more',
                key: 'more',

            }],
                hcdp:[
            {
                title: '姓名',
                dataIndex: '姓名',
                key: '姓名',
                // render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: '性别',
                dataIndex: '性别',
                key: '性别',
            }
            ,{
                title: '民族',
                dataIndex: '民族',
                key: '民族',
            },{
                title: '始发地',
                dataIndex: '始发地',
                key: '始发地',
            } ,{
                title: '目的地',
                dataIndex: '目的地',
                key: '目的地',

            } ,{
                title: '证件号码',
                dataIndex: '证件号码',
                key: '证件号码',

            }
            ,{
                title: '车次',
                dataIndex: '车次',
                key: '车次',

            }
            ,{
                title: '座位号',
                dataIndex: '座位号',
                key: '座位号',

            }
            ,{
                title: '购票日期',
                dataIndex: '购票日期',
                key: '购票日期',

            }
            ,{
                title: '乘车日期',
                dataIndex: '乘车日期',
                key: '乘车日期',

            }
            ,{
                title: '.....',
                dataIndex: 'more',
                key: 'more',

            }],
                cldjxx:[
            {
                title: '品牌',
                dataIndex: '中文品牌名称',
                key: '中文品牌名称',
                // render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: '车辆型号',
                dataIndex: '车辆型号',
                key: '车辆型号',
            }
            ,{
                title: '姓名',
                dataIndex: '机动车所有人_姓名',
                key: '机动车所有人_姓名',

            } ,{
                title: '证件号码',
                dataIndex: '机动车所有人_证件号码',
                key: '机动车所有人_证件号码',

            }
            ,{
                title: '出厂日期',
                dataIndex: '出厂日期',
                key: '出厂日期',

            }
            ,{
                title: '所有人现住址',
                dataIndex: '机动车所有人_现住址_地址名称',
                key: '机动车所有人_现住址_地址名称',

            }
            ,{
                title: '车号牌号',
                dataIndex: '机动车号牌号',
                key: '机动车号牌号',

            }

            ,{
                title: '.....',
                dataIndex: 'more',
                key: 'more',

            }],
                clkktx:[
            {
                title: '卡口名称',
                dataIndex: '卡口名称',
                key: '卡口名称',
                // render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: '卡口地址',
                dataIndex: '卡口地址',
                key: '卡口地址',
            }
            ,{
                title: '卡口编号',
                dataIndex: '卡口编号',
                key: '卡口编号',
            },{
                title: '号牌号码',
                dataIndex: '机动车号牌号码',
                key: '机动车号牌号码',
            } ,{
                title: '路口名称',
                dataIndex: '路口名称',
                key: '路口名称',

            } ,{
                title: '通过方向',
                dataIndex: '通过方向',
                key: '通过方向',

            }
            ,{
                title: '通过时间',
                dataIndex: '通过时间',
                key: '通过时间',

            }
            ,{
                title: '.....',
                dataIndex: 'more',
                key: 'more',

            }],
            },
            cluster1:{},
            cluster2:{},
            type:0,
            size:3,
            keyWord:'',
            currentTotal:0,
            currentPage:1,
            startCount:0,
            singleKeyList:[],
            singleDataList:[],
            singleName:'',
            singleId:'',
            checkedList: [],
            plainOptions :[],
            dataSource:[],
            indeterminate: true,
            checkAll:true,
            openLibrary:false,
            reverseCheck:false,
            searchValue:'',
        }
        this.superSearch=this.superSearch.bind(this)

    }
    tanchuWindow (id){
        this.state.responseData.hits.map((ele,index)=>{
            if(ele.id===id){
                let keyList=[];
                let dataList=[];
                for(let i in  ele.source){
                    if(i!=="@timestamp"&&i!=="@version"&&i!=='id'&&i!=="type"&&i!=="key"){
                        if(i.indexOf("机动车")!==-1){
                            keyList.push(i.substr(3,i.length-3))
                        }else{
                            keyList.push(i)
                        }
                        dataList.push(ele.source[i])
                    }
                }
                this.setState({
                    showWindow1:false,
                    singleKeyList: keyList,
                    singleDataList:dataList,
                    singleName: ele.source["姓名"]||ele.source["机动车所有人_姓名"]||ele.source['旅客姓名']||ele.source['当事人']||ele.source['中文名']||ele.source['反馈人姓名']||ele.source['中文字段名']||ele.source['处警员姓名']||ele.source['变动人姓名']||ele.source['用户姓名']||ele.source['机动车所有人']||ele.source['录入人']||ele.source['TRAIL_NAME'],
                    singleId: ele.source['证件号码']||ele.source['公民证件号码']||ele.source['公民身份号码']||ele.source['机动车所有人_证件号码']||ele.source['身份证']||ele.source['旅客证件号']||ele.source['身份证明号码']||ele.source['18位身份证号']||ele.source['身份证号']||ele.source['身份证号码']||ele.source['CARD'],
                },()=>{

                })
            }
        })


    }
    hideWindow=()=>{
        this.setState({
            showWindow1:true,
        })
    }
    fankui=(id)=>{
        // window.confirm("是否确定反馈？")
        this.setState({
            fankui:true,
            fankuiSuccess:false,
            newsKey:id
        })
     

    }
    confirmFankui=()=>{
        this.setState({
            fankui:false,
            fankuiSuccess:true,
        })
        let sendData = {};
        this.state.responseData.hits.map((ele,index)=>{
            if(ele.id===this.state.newsKey){
                let keyList=[];
                let dataList=[];
                for(let i in  ele.source){
                    if(i!=="@timestamp"&&i!=="@version"&&i!=='id'&&i!=="type"&&i!=="key"){
                        if(i.indexOf("机动车")!==-1){
                            keyList.push(i.substr(3,i.length-3))
                        }else{
                            keyList.push(i)
                        }
                        dataList.push(ele.source[i])
                    }
                }
                sendData.singleKeyList = keyList;
                sendData.singleDataList = dataList;
                sendData.singleName = ele.source["姓名"]||ele.source["机动车所有人_姓名"]||ele.source['旅客姓名']||ele.source['当事人']||ele.source['中文名']||ele.source['反馈人姓名']||ele.source['中文字段名']||ele.source['处警员姓名']||ele.source['变动人姓名']||ele.source['用户姓名']||ele.source['机动车所有人']||ele.source['录入人']||ele.source['TRAIL_NAME'];
                sendData.singleId = ele.source['证件号码']||ele.source['公民证件号码']||ele.source['公民身份号码']||ele.source['机动车所有人_证件号码']||ele.source['身份证']||ele.source['旅客证件号']||ele.source['身份证明号码']||ele.source['18位身份证号']||ele.source['身份证号']||ele.source['身份证号码']||ele.source['CARD'];

            }
        })

        this.props.getData(sendData)

    }
    cancelFankui=()=>{
             this.setState({
                 fankui:false,
             })
    }
    closeSearch(e){
        this.props.close('none')
    }
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };
   componentWillMount(){
    //    console.log(this.state.columns['qgjtwzxx'])
       this.props.dispatch(cluster({},
           (res)=>{
               if(res.status===200){
                  for(let e in res.data.data.clt_default.indices.ztk_ry.mapping){
                      res.data.data.clt_default.indices.ztk_ry.mapping[e]=[e]
                  }
                   for(let e in res.data.data.clt_default.indices.ztk_wp.mapping){
                       res.data.data.clt_default.indices.ztk_wp.mapping[e]=[e]
                   }
                   this.setState({
                       cluster1: res.data.data.clt_default.indices.ztk_ry.mapping,
                       cluster2: res.data.data.clt_default.indices.ztk_wp.mapping,
                   },()=>{
                   })
           }
       })
       );
   }
   extend(destination, source) {
        for (let e in source)
            destination[e] = source[e];
        return destination;
    }

    superSearch(e){
       if(e===''){
           message.error('请输入搜索内容！')
       }else{
           this.setState({
               keyWord:e
           })
           this.props.dispatch(superSearch({expression:e,from:this.state.startCount,fulltext:true,scope:JSON.stringify(this.state.cluster1),size:this.state.size},
               (res)=>{
                   if(res.status===200){
                       this.setState({
                           responseData1:res.data.data.documents,
                           loading: false
                       },()=>{
                           this.props.dispatch(superSearch({expression:e,from:this.state.startCount,fulltext:true,scope:JSON.stringify(this.state.cluster2),size:this.state.size},
                               (res)=>{
                                   if(res.status===200){
                                       this.setState({
                                           responseData2:res.data.data.documents
                                       },()=>{

                                           if(this.state.type===0){
                                               this.state.responseData=this.state.responseData1;
                                               this.state.currentTotal=this.state.responseData1.total;
                                           }else if(this.state.type===1){
                                               this.state.responseData=this.state.responseData2;
                                               this.state.currentTotal=this.state.responseData2.total;
                                           }
                                           this.state.dataList=[]
                                           this.state.responseData.hits.map((item,index)=>{
                                               this.extend(item.source,{id:item.id,key:item.id})
                                               this.state.dataList.push(item.source)

                                           })
                                           this.state.searchList[0].num=this.state.responseData1.total
                                           this.state.searchList[1].num=this.state.responseData2.total
                                           this.setState({
                                               total:this.state.responseData1.total+this.state.responseData2.total,
                                               total1:this.state.responseData1.total,
                                               total2:this.state.responseData2.total,
                                           })
                                       })
                                   }

                               })
                           );
                       })
                   }
                   else{
                       this.setState({
                        loading:true
                       })
                   }

               })
           );
       }



    }

    selectItem(e){
        this.setState({
            openLibrary:false
        })
            if(e===0){
                this.setState({
                    responseData:this.state.responseData1,
                    type:0,

                },()=>{
                    this.superSearch(this.state.keyWord)
                })
            }else if(e===1)
            {
                this.setState({
                    responseData:this.state.responseData2,
                    type:1,
            },()=>{
                    this.superSearch(this.state.keyWord)

                })}
    }

    openLibrary(e) {
        this.setState({
            openLibrary: true
        })

        this.state.dataSource=[];
        this.state.checkedList=[];
        if(e===0){
            for (let item in this.state.cluster1) {
                this.state.dataSource.push(item)
                if(this.state.cluster1[item].length>0){
                    this.state.checkedList.push(item)
                }
                this.setState({
                    type:0
                })

            }

        }else if(e===1){
            for (let item in this.state.cluster2) {
                this.state.dataSource.push(item)
                if(this.state.cluster2[item].length>0){
                    this.state.checkedList.push(item)
                }
                this.setState({
                    type:1
                })

            }
        }
        this.setState({
            plainOptions:this.state.dataSource,
        })

    }


    onChange = (checkedList) => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < this.state.plainOptions.length),
            checkAll: checkedList.length === this.state.plainOptions.length,
        });
    }

    onCheckAllChange = (e) => {
        this.setState({
            checkedList: e.target.checked ? this.state.plainOptions : [],
            checkAll: e.target.checked,
        });
    }

    reverseSelection=(e)=>{
        let newArr=[]
        this.state.plainOptions.map((item,index)=>{
            if(this.state.checkedList.indexOf(item)===-1){
                newArr. push(item)
            }
        })
        this.setState({
            checkedList:newArr,
            reverseCheck: e.target.checked,
        });
    }

    searchChange(e){
        this.state.plainOptions=[];
        this.state.plainOptions.push(e)
        this.setState({})

    }

    changeOption(e){
        if(e===''){
            this.setState({
                plainOptions:this.state.dataSource,
            })
        }
    }

    closeSelect(){
        this.setState({
            openLibrary:false
        })
    }

    getNewList(){
        if(this.state.checkedList.length===0){
            message.error('选择范围不能为空')
        }else{
            if(this.state.type===0){
                for(let e in this.state.cluster1){
                    if(this.state.checkedList.indexOf(e)===-1){
                        this.state.cluster1[e]=[]
                    }else{
                        this.state.cluster1[e].push(e)
                    }
                }
            }else if(this.state.type===1){
                for(let e in this.state.cluster2){
                    if(this.state.checkedList.indexOf(e)===-1){
                        this.state.cluster2[e]=[]
                    }else{
                        this.state.cluster2[e].push(e)
                    }
                }
            }
            this.setState({
                openLibrary: false
            },()=>{
                this.superSearch(this.state.keyWord)
            })
        }

    }






    render(){
        return(
            <div className="superSearch-contain" style={{display:this.props.show}}>
                <Spin title="loading..." spinning={this.state.loading}/>
                <img className='button closeButton' src={require('../../../images/analysis/closeWhite.png')}onClick={this.closeSearch.bind(this)}/>
                <div className="superSearch-main">
                    <div className="surperSearch-header" style={{backgroundImage:`url(${SuperBack})`}}>
                        <div className='superSearch-header-sousuok'>
                        <span style={{fontSize:'1.5rem',color:'white', fontWeight:'bolder'}}>超级检索&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <Search
                            placeholder="请输入"
                            enterButton="检索 &nbsp;&nbsp;&nbsp;&nbsp;"
                            size="large"
                            style={{width:'80%'}}
                            onSearch={this.superSearch}

                        />
                        </div>
                        <div className={this.state.fankuiSuccess?'fankuiSuccess':'fankuiFail'}>反馈成功</div>
                    </div>
                    <div className="surperSearch-leftNav">
                        <div  className={this.state.type===0?"librarySelected":"library"}>
                            <div onClick={this.selectItem.bind(this,0)} className="changeLibrary">人员库 <span>{this.state.total1}</span></div>
                            <div className="open" onClick={this.openLibrary.bind(this,0)}>人员库筛选</div>
                        </div>
                        <div className={this.state.type===1?"librarySelected":"library"}>
                            <div onClick={this.selectItem.bind(this,1)} className="changeLibrary">物品库 <span>{this.state.total2}</span></div>
                            <div className="open" onClick={this.openLibrary.bind(this,1)}>物品库筛选</div>
                        </div>
                    </div>
                    <div className="surperSearch-center" style={{display:this.state.openLibrary?'none':'block'}}>
                        {
                            this.state.dataList.map((ele,index)=>{
                                let arr=[];
                                arr.push(ele);
                                // console.log(this.state.columns[ele.type]);
                                // console.log(this.state.columns['qgjtwzxx'])
                                  return(
                                      <div key={index}>
                                        <p className='surperSearch-center-tabal-title'>
                                            <span>{index+1}.{ele["姓名"]||ele["机动车所有人_姓名"]||ele['旅客姓名']||ele['当事人']||ele['中文名']||ele['反馈人姓名']||ele['中文字段名']||ele['处警员姓名']||ele['变动人姓名']||ele['用户姓名']||ele['机动车所有人']||ele['录入人']||ele['TRAIL_NAME']}</span>
                                            <span style={{marginLeft:"0.5rem"}}>{ele['证件号码']||ele['公民证件号码']||ele['公民身份号码']||ele['机动车所有人_证件号码']||ele['身份证']||ele['旅客证件号']||ele['身份证明号码']||ele['18位身份证号']||ele['身份证号']||ele['身份证号码']||ele['CARD']}</span>
                                          <input type='button'className='button returnButton' value='反馈' onClick={this.fankui.bind(this,arr[0].id)}/>
                                        </p>
                                         <div onClick={this.tanchuWindow.bind(this,arr[0].id)}>
                                          <Table   columns={this.state.columns[ele.type]} dataSource={arr}/>
                                            {/* <Table   columns={this.state.columns['qgjtwzxx']} dataSource={arr}/>*/}
                                        </div>
                                      </div>)
                            })
                        }
                        <div>
                            <Pagination current={this.state.currentPage} pageSize={this.state.size} total={this.state.currentTotal} onChange={(page)=>{
                                this.setState({currentPage:page,startCount:this.state.size*(page-1)},()=>{   this.superSearch(this.state.keyWord)})

                            }} />
                        </div>
                    </div>
                    <div className={ this.state.showWindow1?'superSearch-tanchHide':'superSearch-tanch'}>
                        <div className='superSearch-tanchHead'><span>{this.state.singleName}</span><span> {this.state.singleId}</span>
                            <img src={require('../../../images/analysis/closeWn.png')} alt="pic"
                            style={{position:'absolute',top:0,right:'1rem'}}
                                 onClick={this.hideWindow.bind(this)}
                            />
                        </div>
                        <div className='superSearch-tanchBody'>
                            <ul className='tanchuwindow   tcL'>
                                {
                                    this.state.singleKeyList.map((item,index)=>{
                                         return(<li key={index+'first'} title={item}>{item}</li>)
                                    })
                                }
                            </ul>
                            <ul className='tanchuwindow tcR'>
                                {
                                    this.state.singleDataList.map((item,index)=>{
                                        return(<li key={index+'second'} title={item}>{item}</li>)
                                    })
                                }

                            </ul>

                        </div>

                    </div>
                    <div className={this.state.fankui?"fankuiWindow":"hideFankuiWindow"}>
                        <div><p className='superSearch-icon'>i</p><span>是否确定反馈？</span></div>
                        <button className='button fankuiWindow-button' onClick={this.confirmFankui.bind(this)}>确定</button>
                        <button className='button fankuiWindow-button' onClick={this.cancelFankui.bind(this)}>取消</button>
                    </div>

                    <div className="surperSearch-center" style={{display:this.state.openLibrary?'block':'none',paddingLeft:"4rem"}}>
                        <div className="search-top">
                            <label htmlFor="search">搜索库</label>
                            <AutoComplete
                            style={{ width: 300 }}
                            dataSource={this.state.dataSource}
                            placeholder="请输入搜索库"
                            onSelect={this.searchChange.bind(this)}
                            onChange={this.changeOption.bind(this)}
                            filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                            />

                            <Checkbox
                                // indeterminate={this.state.indeterminate}
                                onChange={this.onCheckAllChange}
                                checked={this.state.checkAll}
                            >
                               全选
                            </Checkbox>

                            <Checkbox
                                // indeterminate={this.state.indeterminate}
                                onChange={this.reverseSelection}
                                checked={this.state.reverseCheck}
                            >
                                反选
                            </Checkbox>
                        </div>

                        <CheckboxGroup options={this.state.plainOptions} value={this.state.checkedList} onChange={this.onChange} />
                        <div className="buttonList">
                            <Button type="primary" onClick={this.closeSelect.bind(this)}>取消</Button>
                            <Button type="primary" onClick={this.getNewList.bind(this)}>确定</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}