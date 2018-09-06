
import {
    createAction
  } from 'redux-actions';
import {
    analysisForPoliceApi,
} from 'api'
import {
    createAjaxAction,
    fakeAjaxAction,
} from 'utils'

export const getHcDetail = createAjaxAction( analysisForPoliceApi.hcDetail );

export const getApprove = createAjaxAction(analysisForPoliceApi.approve)

export const pushMessage = createAjaxAction(analysisForPoliceApi.pushMessage)

// const requestTaskWillTodo = createAction('request taskWillTodo');
// const receiveTaskWillTodo = createAction('receive taskWillTodo');
export const getTaskWillTodo = createAjaxAction(analysisForPoliceApi.taskWillTodo)

export const pcszhzDaiban = createAjaxAction(analysisForPoliceApi.pcszhzDaiban)



export const postChatMessage = createAjaxAction(analysisForPoliceApi.chatMessage)




// const requestChatMessageHistory = createAction('request chatMessageHistory');
// const receiveChatMessageHistory = createAction('receive chatMessageHistory');
export const getChatMessageHistory = createAjaxAction(analysisForPoliceApi.chatMessageHistory )


export const cluster = createAjaxAction(analysisForPoliceApi.cluster )
export const superSearch= createAjaxAction(analysisForPoliceApi.superSearch )