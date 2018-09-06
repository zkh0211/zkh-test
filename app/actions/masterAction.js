import {
  createAction
} from 'redux-actions';
import { master} from 'api';
import {
  createAjaxAction,
  fakeAjaxAction,
} from 'utils';

// export const requestLeftNav = createAction('request left nav');
// export const receiveLeftNav = createAction('receive left nav');
// export const fetchLeftNav = createAjaxAction (
//     common.leftNav,
//     requestLeftNav,
//     receiveLeftNav
// )

const requestOrderSumByYear = createAction('request orderByYear');
const receiveOrderSumByYear = createAction('receive orderByYear');
export const getOrderSumByYear = createAjaxAction( master.orderSumByYear, requestOrderSumByYear , receiveOrderSumByYear )

const requestOrderSumByMonth = createAction('request orderByMonth');
const receiveOrderSumByMonth = createAction('receive orderByMonth');
export const getOrderSumByMonth = createAjaxAction(master.orderSumByMonth ,requestOrderSumByMonth, receiveOrderSumByMonth )

const requestOrderSumByWeek = createAction('request orderByWeek');
const receiveOrderSumByWeek = createAction('receive orderByWeek');
export const getOrderSumByWeek = createAjaxAction(master.orderSumByWeek, requestOrderSumByWeek, receiveOrderSumByWeek )

const requestOrderCompletion = createAction('request orderCompletion');
const receiveOrderCompletion = createAction('receive orderCompletion');
export const getOrderCompletion = createAjaxAction(master.orderCompletion, requestOrderCompletion, receiveOrderCompletion )

const requestOrderByType = createAction('request orderByType');
const receiveOrderByType = createAction('receive orderByType');
export const getOrderByType = createAjaxAction(master.orderByType, requestOrderByType, receiveOrderByType )


// const requestwillAppointed = createAction('request willAppointed');
// const receivewillAppointed = createAction('receive willAppointed');
export const willAppointed = createAjaxAction(master.pendingList)

// const requestdidAppointed = createAction('request didAppointed');
// const receivedidAppointed = createAction('receive didAppointed');
export const didAppointed = createAjaxAction(master.runingList)


// const requestwillApprove = createAction('request willApprove');
// const receivewillApprove = createAction('receive willApprove');
export const willApprove = createAjaxAction(master.runingList)


// const requestdidApprove = createAction('request didApprove');
// const receivedidApprove = createAction('receive didApprove');
export const didApprove = createAjaxAction(master.historyList)


export const tabAppointed = createAction('tabAppointed',payload => payload);

export const getHcTaskTypeList = createAjaxAction(master.hcTaskTypeList )

export const getOrderByStatus = createAjaxAction(master.orderByStatus )

const requestHcCaseFromList = createAction('request hcCaseFromList');
const receiveHcCaseFromList = createAction('receive hcCaseFromList');
export const getHcCaseFromList = createAjaxAction(master.hcCaseFromList , requestHcCaseFromList,receiveHcCaseFromList )

const requestSelectCountByStatus = createAction('request selectCountByStatus');
const receiveSelectCountByStatus = createAction('receive selectCountByStatus');
export const getSelectCountByStatus = createAjaxAction(master.selectCountByStatus, requestSelectCountByStatus, receiveSelectCountByStatus )

export const sendEstablishCase = createAjaxAction(master.establishCase )

const requestSubmitList = createAction('request submitList');
const receiveSubmitList = createAction('receive submitList');
export const getSubmitList = createAjaxAction(master.submitList , requestSubmitList , receiveSubmitList )

// const requestSubmitListNotPolice = createAction('request submitListNotPolice');
// const receiveSubmitListNotPolice = createAction('receive submitListNotPolice');
export const getSubmitListNotPolice = createAjaxAction(master.submitList)

export const getCharsAnalysis = createAjaxAction(master.charsAnalysis )
export const tijiaoBohui = createAjaxAction(master.tijiaoBohui )
export const deleteFile = createAjaxAction(master.deleteFile )



export const selectCountByType = createAjaxAction(master.selectCountByType )
export const selectStatusCountByType = createAjaxAction(master.selectStatusCountByType )


export const selectEmergencyByTime = createAjaxAction(master.selectEmergencyByTime )
export const selectCurrentFkyj = createAjaxAction(master.selectCurrentFkyj )

const requestGetCaseTypeList = createAction('request getCaseType');
const receiveGetCaseTypeList = createAction('receive getCaseType');
export const getCaseType = createAjaxAction(master.getCaseType , requestGetCaseTypeList,receiveGetCaseTypeList )

 

export const startCompose= createAjaxAction(master.startCompose )
export const caseFindById= createAjaxAction(master.caseFindById )

export const queryAllCase = createAjaxAction(master.queryAllCase )
export const overviewCount = createAjaxAction(master.overviewCount )

export const changeCaseTypeTab = createAction('changeCaseTypeTab',payload => payload);
export const zhilingTotal = createAction('zhilingTotal',payload => payload);

export const checkCaseName = createAjaxAction(master.checkCaseName )

export const getDirection = createAjaxAction(master.getDirection )

export const zonglanCount = createAction('zonglanCount',payload => payload);
export const willDoCount = createAction('willDoCount',payload => payload);
export const doingCount = createAction('doingCount',payload => payload);
export const doneCount = createAction('doneCount',payload => payload);
export const tongxingCount = createAction('tongxingCount',payload => payload);
export const pcsWillDoCount = createAction('pcsWillDoCount',payload => payload);
export const pcsDoingCount = createAction('pcsDoingCount',payload => payload);



export const postDirection = createAjaxAction(master.postDirection )

export const signOrder = createAjaxAction(master.signOrder )

export const feedBackDirection = createAjaxAction(master.feedBackDirection )

export const uploadDirectionFile = createAjaxAction(master.uploadDirectionFile )

export const policePeopleList = createAjaxAction(master.policePeopleList )

export const policePeopleDetail = createAjaxAction(master.policePeopleDetail )

export const changePoliceStation = createAjaxAction(master.changePoliceStation )

export const tongxingYujing = createAjaxAction(master.tongxingYujing )

export const tongxingYujingDetail = createAjaxAction(master.tongxingYujingDetail )

const requestcheckWhiteSheet = createAction('request checkWhiteSheet');
const receivecheckWhiteSheet = createAction('receive checkWhiteSheet');
export const checkWhiteSheet = createAjaxAction(master.checkWhiteSheet, requestcheckWhiteSheet, receivecheckWhiteSheet )

export const whiteSheetList = createAjaxAction(master.whiteSheetList )

export const addWhiteSheet = createAjaxAction(master.addWhiteSheet )

export const getFeedBack = createAjaxAction(master.getFeedBack )

export const peizhi = createAjaxAction(master.peizhi )
export const getPersonInfo = createAjaxAction(master.getPersonInfo )

export const isFeedBackZhiling = createAction('isFeedBackZhiling',payload => payload);

const requestgetDirectionSearch = createAction('request getDirectionSearch');
const receivegetDirectionSearch = createAction('receive getDirectionSearch');
export const getDirectionSearch = createAjaxAction(master.getDirectionSearch, requestgetDirectionSearch, receivegetDirectionSearch )

export const getPersonType = createAjaxAction(master.getPersonType )

export const getAreaList = createAjaxAction(master.getAreaList )

export const deleteIssueWhite = createAjaxAction(master.deleteIssueWhite )













