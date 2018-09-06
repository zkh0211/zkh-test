import { ajax } from 'utils'

export const amList = ajax.fetchJSONByPost('/common/amList')



// export const login = ajax.fetchJSONByGet('/auth/jwt/getUserInfo')
// export const jwtToken = ajax.fetchJSONByPost('/auth/jwt/token')
// export const menu = ajax.fetchJSONByGet('/admin/menu/user/authorityTree') //市局服务器使用
// export const menuToolBox = ajax.fetchJSONByGet('/admin/menu/user/authorityTreeDept')

export const login = ajax.fetchJSONByGet('/authv1/jwt/getUserInfo')
export const jwtToken = ajax.fetchJSONByPost('/authv1/jwt/token')
export const menu = ajax.fetchJSONByGet('/adminv1/menu/user/authorityTree')
export const menuToolBox = ajax.fetchJSONByGet('/adminv1/menu/user/authorityTreeDept')




export const register = ajax.fetchJSONByPost('/register')
export const miji = ajax.fetchJSONByGet('/composev1/statistics/secretLevel')
export const renyuanZhanbi = ajax.fetchJSONByPost('/display/jinqtsfx/zdrqkNew')
export const tonghuanbi = ajax.fetchJSONByPost('/display/jinqtsfx/peoNumTongHuanNew')
export const shuliangqushi = ajax.fetchJSONByPost('/display/jinqtsfx/peoNumTrendNew')
export const tongzhiTongbao = ajax.fetchJSONByGet('/cms/jsonp/info/page')
export const keyLogin = ajax.fetchJSONByPost('/auth/jwt/keyLogin')



