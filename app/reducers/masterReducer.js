import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
import { message } from 'antd'

// const appointedType = {type:'1'}

// 本年任务总量
const orderByYear = () => ({ })
export const orderByYearResponse = handleActions({
  'request orderByYear'(state, action) {
    return { ...state, loading: true }
  },
  'receive orderByYear'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      // message.error(res.msg, 3)
      return { ...state, loading: false }
    }
    return { res: res, loading: false }
  },
}, orderByYear())


// 本月任务量
const orderByMonth = () => ({ })
export const orderByMonthResponse = handleActions({
  'request orderByMonth'(state, action) {
    return { ...state, loading: true }
  },
  'receive orderByMonth'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      // message.error(res.msg, 3)
      return { ...state, loading: false }
    }
    return { res: res, loading: false }
  },
}, orderByMonth())



// 本周任务总量
const orderByWeek = () => ({ })
export const orderByWeekResponse = handleActions({
  'request orderByWeek'(state, action) {
    return { ...state, loading: true }
  },
  'receive orderByWeek'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      // message.error(res.msg, 3)
      return { ...state, loading: false }
    }
    return { res: res, loading: false }
  },
}, orderByWeek())


// 任务完成率
const orderCompletion = () => ({ })
export const orderCompletionResponse = handleActions({
  'request orderCompletion'(state, action) {
    return { ...state, loading: true }
  },
  'receive orderCompletion'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      // message.error(res.msg, 3)
      return { ...state, loading: false }
    }
    return { res: res, loading: false }
  },
}, orderCompletion())


// 任务类别统计
const orderByType = () => ({ })
export const orderByTypeResponse = handleActions({
  'request orderByType'(state, action) {
    return { ...state, loading: true }
  },
  'receive orderByType'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      // message.error(res.msg, 3)
      return { ...state, loading: false }
    }
    return { res: res, loading: false }
  },
}, orderByType())

/** 
// 待指派案件列表
const willAppointed = () => ({ })
export const willAppointedResponse = handleActions({
  'request willAppointed'(state, action) {
    return { ...state, loading: true }
  },
  'receive willAppointed'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return { ...state, loading: false }
    }
    return { res: res, loading: false }
  },
}, willAppointed())

// 已指派案件列表
const didAppointed = () => ({ })
export const didAppointedResponse = handleActions({
  'request didAppointed'(state, action) {
    return { ...state, loading: true }
  },
  'receive didAppointed'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return { ...state, loading: false }
    }
    return { res: res, loading: false }
  },
}, didAppointed())


// 待审批案件列表
const willApprove = () => ({ })
export const willApproveResponse = handleActions({
  'request willApprove'(state, action) {
    return { ...state, loading: true }
  },
  'receive willApprove'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return { ...state, loading: false }
    }
    return { res: res, loading: false }
  },
}, willApprove())

// 已审批案件列表
const didApprove = () => ({ })
export const didApproveResponse = handleActions({
  'request didApprove'(state, action) {
    return { ...state, loading: true }
  },
  'receive didApprove'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return { ...state, loading: false }
    }
    return { res: res, loading: false }
  },
}, didApprove())



// 已上报
const submitListNotPolice = () => ({ })
export const submitListNotPoliceResponse = handleActions({
  'request submitListNotPolice'(state, action) {
    return { ...state, loading: true }
  },
  'receive submitListNotPolice'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return { ...state, loading: false }
    }
    return { res: res, loading: false }
  },
}, submitListNotPolice())
*/

// 获取案件类型和数量
const getCaseTypeData = () => ({ })
export const getCaseTypeResponse = handleActions({
  'request getCaseType'(state, action) {
    return { ...state, loading: true }
  },
  'receive getCaseType'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      // message.error(res.msg, 3)
      return { ...state, loading: false }
    }
    return { res: res, loading: false }
  },
}, getCaseTypeData())

// 获取案件来源
const getHcCaseFromList = () => ({ })
export const hcCaseFromListResponse = handleActions({
  'request hcCaseFromList'(state, action) {
    return { ...state, loading: true }
  },
  'receive hcCaseFromList'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      // message.error(res.msg, 3)
      return { ...state, loading: false }
    }
    return { res: res, loading: false }
  },
}, getHcCaseFromList())

//获取首页左侧的分类  2是待指派 3是已指派  4是待审批  5是已审批
const appointedType = () => ({})
export const tabAppointedTypeResponse = handleActions({
  'tabAppointed'(state, action) {
    const res = action.payload
    return { appointeType:res }
  },
}, appointedType())

//获取上级指令的案件总数  开始
const zonglanCount = () => ({})
export const zonglanCountResponse = handleActions({
  'zonglanCount'(state, action) {
    const res = action.payload
    return { zonglanCount:res }
  },
}, zonglanCount())
const willDoCount = () => ({})
export const willDoCountResponse = handleActions({
  'willDoCount'(state, action) {
    const res = action.payload
    return { willDoCount:res }
  },
}, willDoCount())
const doingCount = () => ({})
export const doingCountResponse = handleActions({   
  'doingCount'(state, action) {
    const res = action.payload
    return { doingCount:res }
  },
}, doingCount())
const doneCount = () => ({})
export const doneCountResponse = handleActions({
  'doneCount'(state, action) {
    const res = action.payload
    return { doneCount:res }
  },
}, doneCount())
const tongxingCount = () => ({})
export const tongxingCountResponse = handleActions({
  'tongxingCount'(state, action) {
    const res = action.payload
    return { tongxingCount:res }
  },
}, tongxingCount())
const pcsWillDoCount = () => ({})
export const pcsWillDoCountResponse = handleActions({
  'pcsWillDoCount'(state, action) {
    const res = action.payload
    return { pcsWillDoCount:res }
  },
}, pcsWillDoCount())
const pcsDoingCount = () => ({})
export const pcsDoingCountResponse = handleActions({
  'pcsDoingCount'(state, action) {
    const res = action.payload
    return { pcsDoingCount:res }
  },
}, pcsDoingCount())
//获取上级指令的案件总数  结束


// 获取案件来源
const getSubmitList = () => ({ })
export const submitListResponse = handleActions({
  'request submitList'(state, action) {
    return { ...state, loading: true }
  },
  'receive submitList'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      // message.error(res.msg, 3)
      return { ...state, loading: false }
    }
    return { res: res, loading: false }
  },
}, getSubmitList())


//获取首页左侧的分类  2是待指派 3是已指派  4是待审批  5是已审批
const changeCaseTypeTab = () => ({})
export const changeCaseTypeTabResponse = handleActions({
  'changeCaseTypeTab'(state, action) {
    const res = action.payload
    return { data:res }
  },
}, changeCaseTypeTab())

const zhilingTotal = () => ({})
export const zhilingTotalResponse = handleActions({
  'zhilingTotal'(state, action) {
    const res = action.payload
    return { data:res }
  },
}, zhilingTotal())


// 获取案件来源
const selectCountByStatus = () => ({ })
export const selectCountByStatusResponse = handleActions({
  'request selectCountByStatus'(state, action) {
    return { ...state, loading: true }
  },
  'receive selectCountByStatus'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      // message.error(res.msg, 3)
      return { ...state, loading: false }
    }
    return { res: res, loading: false }
  },
}, selectCountByStatus())


const checkWhiteSheet = () => ({ })
export const checkWhiteSheetResponse = handleActions({
  'request checkWhiteSheet'(state, action) {
    return { ...state, loading: true }
  },
  'receive checkWhiteSheet'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      // message.error(res.msg, 3)
      return { ...state, loading: false }
    }
    return { res: res, loading: false }
  },
}, checkWhiteSheet())


const isFeedBackZhiling = () => ({})
export const isFeedBackZhilingResponse = handleActions({
  'isFeedBackZhiling'(state, action) {
    const res = action.payload
    return { data:res }
  },
}, isFeedBackZhiling())


const getDirectionSearch = () => ({ })
export const getDirectionSearchResponse = handleActions({
  'request getDirectionSearch'(state, action) {
    return { ...state, loading: true }
  },
  'receive getDirectionSearch'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      // message.error(res.msg, 3)
      return { ...state, loading: false }
    }
    return { res: res, loading: false }
  },
}, getDirectionSearch())
