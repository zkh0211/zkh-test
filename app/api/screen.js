/**
 * Created by lixin on 2018/5/25.
 */
import { ajax } from 'utils'

export const pendingList = ajax.fetchJSONByGet('/composev1/portal/selectTaskMasterList');
export const selectCountByStatus= ajax.fetchJSONByGet('/composev1/portal/selectWaitingCount');
export const selectCountByType= ajax.fetchJSONByGet('/composev1/portal/selectTypeCount');
export const selectStatusCountByType= ajax.fetchJSONByGet('/composev1/portal/sumStatusByType');
export const selectEmergencyByTime= ajax.fetchJSONByGet('/composev1/portal/selectEmergencyByTime');
export const selectCurrentFkyj= ajax.fetchJSONByGet('/composev1/portal/selectCurrentFkyj');

