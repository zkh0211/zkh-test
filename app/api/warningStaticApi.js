import { ajax } from 'utils'

export const selectImportantPeopleWarning = ajax.fetchJSONByPost('/message/warningStatistics/selectImportantPeopleWarning')
export const selectImportantPeopleDetails = ajax.fetchJSONByPost('/message/warningStatistics/selectImportantPeopleDetails')
export const selectCriminalCaseWarning = ajax.fetchJSONByPost('/message/warningStatistics/selectCriminalCaseWarning')
export const selectCriminalCaseTop10 = ajax.fetchJSONByPost('/message/warningStatistics/selectCriminalCaseTop10')
export const selectAdministrativeCaseWarning = ajax.fetchJSONByPost('/message/warningStatistics/selectAdministrativeCaseWarning')
export const selectAdministrativeCaseTop10 = ajax.fetchJSONByPost('/message/warningStatistics/selectAdministrativeCaseTop10')


