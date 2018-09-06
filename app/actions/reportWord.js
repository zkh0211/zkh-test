/**
 * Created by lpsh0 on 2018/4/18.
 */
import {
    reportWord,
} from 'api'
import {
    createAjaxAction,
    fakeAjaxAction,
} from 'utils'


export const getWordReport = createAjaxAction(reportWord.getWordReportUrl)
export const sendSubmitReport = createAjaxAction(reportWord.submitReport)
