import { ajax } from 'utils'

export const policeTypePushById = ajax.fetchJSONByGet('/composev1/hc/user/getPoliceTypePushById');

export const hcZoneRecvList = ajax.fetchJSONByGet('/composev1/hc/user/getHcZoneRecvList');

//获取反馈列表的查看任务详情
export const hcPushInfoById = ajax.fetchJSONByGet('/composev1/hc/getHcPushInfoById');


