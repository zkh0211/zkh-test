import { ajax } from 'utils'


export const hcDetail = ajax.fetchJSONByGet('/composev1/approve/user/getHcDetail')

export const approve = ajax.fetchJSONByGet('/composev1/approve/commentList/')

export const pushMessage = ajax.fetchJSONByPost('/composev1/approve/user/pushMessage')

export const taskWillTodo = ajax.fetchJSONByGet('/composev1/hc/user/getHcPushInfoByPoliceType')

export const chatMessageHistory = ajax.fetchJSONByGet('/composev1/approve/user/getChatMessageHistory')

export const chatMessage = ajax.fetchJSONByPost('/composev1/approve/user/chatMessage')

export const cluster = ajax.fetchJSONByGet('/composev1/shell/cluster')

export const superSearch = ajax.fetchJSONByGet('/composev1/shell/search')

export const pcszhzDaiban = ajax.fetchJSONByGet('/composev1/approve/user/selectPushList')
