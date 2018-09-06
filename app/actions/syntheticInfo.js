/**
 * Created by lpsh0 on 2018/4/10.
 */
import {
    syntheticInfo,
} from 'api'
import {
    createAjaxAction,
    fakeAjaxAction,
} from 'utils'


export const getHcDetail = createAjaxAction(syntheticInfo.getHcDetail)
export const getFileList = createAjaxAction(syntheticInfo.getFileListUrl)
export const getApprove = createAjaxAction(syntheticInfo.getApprove)
export const getHcZoneAgent = createAjaxAction(syntheticInfo.getHcZoneAgentUser)
export const postAppointDone = createAjaxAction(syntheticInfo.postAppointDoneUrl)
export const postApproveDone = createAjaxAction(syntheticInfo.postApproveDoneUrl)
export const getCommentInfo = createAjaxAction(syntheticInfo.getCommentUrl)
export const getHcResult = createAjaxAction(syntheticInfo.getResult)
export const getPoliceTypeList = createAjaxAction(syntheticInfo.getPoliceTypeList)
export const getxiajiPoliceTypeList = createAjaxAction(syntheticInfo.getxiajiPoliceTypeList)


export const xiajiPostAppointDone = createAjaxAction(syntheticInfo.xiajiPostAppointDone)
export const findById = createAjaxAction(syntheticInfo.findById)

