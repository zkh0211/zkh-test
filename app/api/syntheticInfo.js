/**
 * Created by lpsh0 on 2018/4/10.
 */
import { ajax } from 'utils'

export const getHcDetail = ajax.fetchJSONByGet('/composev1/approve/user/getHcDetail')
export const getFileListUrl = ajax.fetchJSONByGet('/composev1/approve/getFiles')
export const getApprove = ajax.fetchJSONByGet('/composev1/approve/commentList/')
export const getHcZoneAgentUser = ajax.fetchJSONByGet('/composev1/hc/getHcZoneAgentUser')
export const postAppointDoneUrl = ajax.fetchJSONByPost('/composev1/approve/user/masterApprove')
export const postApproveDoneUrl = ajax.fetchJSONByPost('/composev1/approve/user/closeCase')
export const getCommentUrl = ajax.fetchJSONByGet('/composev1/approve/commentList')
export const getResult = ajax.fetchJSONByGet('/composev1/approve/getComposeResult')
export const getPoliceTypeList = ajax.fetchJSONByGet('/composev1/hc/getPoliceTypeList')
export const getxiajiPoliceTypeList = ajax.fetchJSONByGet('/composev1/hc/getDepts')
export const xiajiPostAppointDone = ajax.fetchJSONByPost('/composev1/approve/user/assign')
export const findById = ajax.fetchJSONByGet('/composev1/case/findById')
