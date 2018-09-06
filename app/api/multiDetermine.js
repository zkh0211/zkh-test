import { ajax } from 'utils'

//案发地点占比情况
export const getPieByLocation = ajax.fetchJSONByGet('/compose/yp/getPieByLocation')
//案件高发时间段情况
export const getLineByTime = ajax.fetchJSONByGet('/compose/yp/getLineByTime')
//获取高发区排名
export const getTopByCounty = ajax.fetchJSONByGet('/compose/yp/getTopByCounty')
//案件分类占比情况
export const getPieByClassify = ajax.fetchJSONByGet('/compose/yp/getPieByClassify')
//年龄情况
export const getColumnByAge = ajax.fetchJSONByGet('/compose/yp/getColumnByAge')
//民族情况排名
export const getTopByEthnicity = ajax.fetchJSONByGet('/compose/yp/getTopByEthnicity')
//交通事故损伤人员及经济损失情况
export const getTopByLosses = ajax.fetchJSONByGet('/compose/yp/getTopByLosses')
//交通违章人员性别情况
export const getPieBySex = ajax.fetchJSONByGet('/compose/yp/getPieBySex')
//交通事故涉案车辆情况
export const getPieByCarType = ajax.fetchJSONByGet('/compose/yp/getPieByCarType')
//获取配置参数，和地图数据
export const getMapByCounty = ajax.fetchJSONByGet('/compose/yp/getMapByCounty')
//获取单选按钮
export const getCaseTypeList = ajax.fetchJSONByGet('/compose/yp/getCaseTypeList')