import { ajax } from 'utils'

export const policeTypeList = ajax.fetchJSONByGet('/composev1/hc/getPoliceTypeList');
export const sendSubPolice = ajax.fetchJSONStringByPost('/composev1/approve/user/sendSubPolice');
export const uploadFiles = ajax.fetchJSONByPostFile('/composev1/approve/user/uploadFiles');
export const recvFeedBack = ajax.fetchJSONByPost('/composev1/approve/user/recvFeedBack');
export const pcsrecvFeedBack = ajax.fetchJSONByPost('/composev1/approve/user/stationFeedBack');

export const deleteTask= ajax.fetchJSONByDelete('/composev1/approve/user/revokePush');
export const revokeAssign = ajax.fetchJSONByDelete('/composev1/approve/user/revokeAssign');
//判断是否可以生成报告
export const isGenerateReport= ajax.fetchJSONByGet('/composev1/approve/user/isGenerateReport');

export const selectAssignList= ajax.fetchJSONByGet('/composev1/approve/user/selectAssignList');
export const selectAssign= ajax.fetchJSONByGet('/composev1/approve/user/selectAssign');




