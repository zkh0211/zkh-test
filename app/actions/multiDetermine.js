import {
    createAction,
} from 'redux-actions'
import {
    multiDetermine,
} from 'api'
import {
    createAjaxAction
} from 'utils'

export const getPieByLocation = createAjaxAction(multiDetermine.getPieByLocation)
export const getLineByTime = createAjaxAction(multiDetermine.getLineByTime)
export const getTopByCounty = createAjaxAction(multiDetermine.getTopByCounty)
export const getPieByClassify = createAjaxAction(multiDetermine.getPieByClassify)
export const getColumnByAge = createAjaxAction(multiDetermine.getColumnByAge)
export const getTopByEthnicity = createAjaxAction(multiDetermine.getTopByEthnicity)
export const getTopByLosses = createAjaxAction(multiDetermine.getTopByLosses)
export const getPieBySex = createAjaxAction(multiDetermine.getPieBySex)
export const getPieByCarType = createAjaxAction(multiDetermine.getPieByCarType)
export const getMapByCounty = createAjaxAction(multiDetermine.getMapByCounty)
export const getCaseTypeList = createAjaxAction(multiDetermine.getCaseTypeList)