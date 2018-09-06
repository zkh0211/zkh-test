import {
    createAction,
  } from 'redux-actions'
  import {
    informationApi,
  } from 'api'
  import {
    createAjaxAction,
  } from 'utils'

  export const selectTotalTrend = createAjaxAction(informationApi.selectTotalTrend)
  export const selectAlarmReceive = createAjaxAction(informationApi.selectAlarmReceive)
  export const selectAlarmHandle = createAjaxAction(informationApi.selectAlarmHandle)
  export const selectAlarmFeedback = createAjaxAction(informationApi.selectAlarmFeedback)

  
  

  