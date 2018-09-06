
import {
    createAction
  } from 'redux-actions';
import {
    analysisForSeatApi,
} from 'api'
import {
    createAjaxAction,
    fakeAjaxAction,
} from 'utils'


export const getPoliceTypeList = createAjaxAction(analysisForSeatApi.policeTypeList );

export const getSendSubPolice = createAjaxAction(analysisForSeatApi.sendSubPolice );

export const sendUploadFiles = createAjaxAction(analysisForSeatApi.uploadFiles );

export const sendRecvFeedBack = createAjaxAction(analysisForSeatApi.recvFeedBack );
export const pcsrecvFeedBack = createAjaxAction(analysisForSeatApi.pcsrecvFeedBack );

export const deleteTask = createAjaxAction(analysisForSeatApi.deleteTask );
export const revokeAssign = createAjaxAction(analysisForSeatApi.revokeAssign );

export const isGenerateReport = createAjaxAction(analysisForSeatApi.isGenerateReport );
export const selectAssignList = createAjaxAction(analysisForSeatApi.selectAssignList );
export const selectAssign = createAjaxAction(analysisForSeatApi.selectAssign );






