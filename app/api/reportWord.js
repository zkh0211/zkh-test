/**
 * Created by lpsh0 on 2018/4/18.
 */
import { ajax } from 'utils'

export const getWordReportUrl = ajax.fetchJSONByGet('/composev1/approve/user/createReport')
export const submitReport = ajax.fetchJSONByPost('/composev1/approve/user/submitReport')
