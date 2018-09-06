import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
import { message } from 'antd'


// // 获取聊天历史
// const getChatMessageHistory = () => ({ })
// export const chatMessageHistoryResponse = handleActions({
//   'request chatMessageHistory'(state, action) {
//     return { ...state, loading: true }
//   },
//   'receive chatMessageHistory'(state, action) {
//     // eslint-disable-next-line no-unused-vars
//     const { req, res } = action.payload
//     if (hasResponseError(res)) {
//       message.error(res.msg, 3)
//       return { ...state, loading: false }
//     }
//     return { res: res, loading: false }
//   },
// }, getChatMessageHistory())