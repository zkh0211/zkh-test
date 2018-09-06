import { ajax } from 'utils'

export const selectTotalTrend = ajax.fetchJSONByPost('/message/alarmAnalysis/selectTotalTrend')

export const selectAlarmReceive = ajax.fetchJSONByPost('/message/alarmAnalysis/selectAlarmReceive')
export const selectAlarmHandle = ajax.fetchJSONByPost('/message/alarmAnalysis/selectAlarmHandle')
export const selectAlarmFeedback = ajax.fetchJSONByPost('/message/alarmAnalysis/selectAlarmFeedback')





