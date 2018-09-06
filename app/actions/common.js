import {
  createAction,
} from 'redux-actions'
import {
  common,
} from 'api'
import {
  createAjaxAction,
  fakeAjaxAction,
} from 'utils'


// export const requestAmList = createAction('request am list')
// export const recevieAmList = createAction('receive am list')
// export const fetchAmList = createAjaxAction(common.amList, requestAmList, recevieAmList)
// export const resetAmList = createAction('reset am list')
export const fetchToken = createAjaxAction(common.jwtToken)
export const fetchLogin = createAjaxAction(common.login)
export const fetchRegister = createAjaxAction(common.register)
export const getMenu = createAjaxAction(common.menu)
export const getMenuToolBox = createAjaxAction(common.menuToolBox)

const requestMiji = createAction('request miji')
const recevieMiji = createAction('receive miji')
export const getMiji = createAjaxAction(common.miji , requestMiji , recevieMiji )

export const renyuanZhanbi = createAjaxAction(common.renyuanZhanbi)
export const tonghuanbi = createAjaxAction(common.tonghuanbi)
export const shuliangqushi = createAjaxAction(common.shuliangqushi)
export const tongzhiTongbao = createAjaxAction(common.tongzhiTongbao)
export const keyLogin = createAjaxAction(common.keyLogin)




