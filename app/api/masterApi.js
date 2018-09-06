import { ajax } from 'utils'

export const orderSumByYear = ajax.fetchJSONByGet('/composev1/statistics/user/orderSumByYear');
export const orderSumByMonth = ajax.fetchJSONByGet('/composev1/statistics/user/orderSumByMonth');
export const orderSumByWeek = ajax.fetchJSONByGet('/composev1/statistics/user/orderSumByWeek');
export const orderCompletion = ajax.fetchJSONByGet('/composev1/statistics/user/orderCompletion');
export const orderByType = ajax.fetchJSONByGet('/composev1/statistics/user/orderByType');
export const pendingList = ajax.fetchJSONByGet('/composev1/case/user/getPendingList');
export const runingList = ajax.fetchJSONByGet('/composev1/case/user/getRunningList');
export const historyList = ajax.fetchJSONByGet('/composev1/case/user/getHistoryList');
export const hcTaskTypeList = ajax.fetchJSONByGet('/composev1/hc/getHcTaskTypeList');
export const orderByStatus = ajax.fetchJSONByGet('/composev1/statistics/user/orderByStatus');
export const hcCaseFromList = ajax.fetchJSONByGet('/composev1/hc/getHcCaseFromList');
export const selectCountByStatus= ajax.fetchJSONByGet('/composev1/statistics/user/selectCountByStatus');
export const establishCase= ajax.fetchJSONByPost('/composev1/case/user/saveHcPending');
export const submitList= ajax.fetchJSONByGet('/composev1/case/user/getSubmitList');
export const charsAnalysis= ajax.fetchJSONByGet('/composev1/statistics/user/charsAnalysis');
export const tijiaoBohui= ajax.fetchJSONByPost('/composev1/approve/user/reSubmit');
export const deleteFile= ajax.fetchJSONByDelete('/composev1/approve/user/deleteFile/');
export const selectCountByType= ajax.fetchJSONByGet('/composev1/statistics/user/selectCountByType/');
export const selectStatusCountByType= ajax.fetchJSONByGet('/composev1/statistics/user/selectStatusCountByType/');
export const selectEmergencyByTime= ajax.fetchJSONByGet('/composev1/statistics/selectEmergencyByTime');
export const selectCurrentFkyj= ajax.fetchJSONByGet('/composev1/statistics/selectCurrentFkyj');
export const getCaseType = ajax.fetchJSONByGet('/composev1/statistics/user/orderByStatus');

export const queryAllCase= ajax.fetchJSONByGet('/composev1/case/user/queryAllCase');
export const startCompose = ajax.fetchJSONByPost('/composev1/case/user/startCompose');
export const caseFindById = ajax.fetchJSONByGet('/composev1/case/findById');
// 其他平台案件详情接口   GET http://172.16.20.2:8765/api/composev1/case/findById?caseId=3a9ed878677943a8b6035ac3b2205d47&source=3  source 1.警综 2.110警情 3.情报平台

export const overviewCount = ajax.fetchJSONByGet('/composev1/hc/user/overviewCount');

export const checkCaseName = ajax.fetchJSONByGet('/composev1/approve/isExists')

export const getDirection = ajax.fetchJSONByGet('/composev1/issueBranch/issueBranchList')

//上级指令 分局下发
// export const postDirection = ajax.fetchJSONByPost('/composev1/issueBranch/confirmIssue')
export const postDirection = ajax.fetchJSONByPost('/composev1/issueBranch/confirmIssueItem')

// export const signOrder = ajax.fetchJSONByPost('/composev1/issueBranch/user/signOrder')
export const signOrder = ajax.fetchJSONByPostFile('/composev1/issueBranch/user/signOrder');


export const feedBackDirection = ajax.fetchJSONByPost('/composev1/issueBranch/user/feedback')

// export const uploadDirectionFile = ajax.fetchJSONByPost('/composev1/issue/user/issueUploadFiles')
export const uploadDirectionFile = ajax.fetchJSONByPostFile('/composev1/issue/user/issueUploadFiles');

export const policePeopleList = ajax.fetchJSONByGet('/composev1/issue/getIssueItemList')

export const policePeopleDetail = ajax.fetchJSONByGet('/composev1/issue/getIssueItemDetail')

export const changePoliceStation = ajax.fetchJSONByGet('/composev1/issue/user/updateIssue')
// export const changePoliceStation = ajax.fetchJSONByPostFile('/composev1/issue/user/updateIssue');

export const tongxingYujing = ajax.fetchJSONByGet('/composev1/issue/user/queryAllWarn')

export const tongxingYujingDetail = ajax.fetchJSONByGet('/composev1/issue/queryWarnItem')

export const checkWhiteSheet = ajax.fetchJSONByGet('/composev1/issueBranch/queryIssueWhite')

export const whiteSheetList = ajax.fetchJSONByGet('/composev1/issueBranch/queryIssueWhite')

export const addWhiteSheet = ajax.fetchJSONByPost('/composev1/issueBranch/user/addIssueWhite')
// export const addWhiteSheet = ajax.fetchJSONByPost('issueBranch/user/addIssueWhite')

export const getFeedBack = ajax.fetchJSONByGet('/composev1/issueBranch/queryFeedback')

export const peizhi = ajax.fetchJSONStringByPost('/composev1/issueBranch/user/saveRules')

export const getPersonInfo = ajax.fetchJSONByGet('/composev1/issue/getPersonInfo')

export const getDirectionSearch = ajax.fetchJSONByGet('/composev1/issueBranch/queryConditions')

export const getPersonType = ajax.fetchJSONByGet('/composev1/issueBranch/queryConditions')

export const getAreaList = ajax.fetchJSONByGet('/composev1/issueBranch/areaTreeList')

export const deleteIssueWhite = ajax.fetchJsonByParamDelete('/composev1/issueBranch/deleteIssueWhite')




