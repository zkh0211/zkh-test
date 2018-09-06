/**
 * Created by 15254 on 2018/5/25.
 */
import {
    createAction
} from 'redux-actions';
import { screen} from 'api';
import {
    createAjaxAction,
    fakeAjaxAction,
} from 'utils';


export const willAppointed = createAjaxAction(screen.pendingList )
export const getSelectCountByStatus = createAjaxAction(screen.selectCountByStatus )
export const selectCountByType = createAjaxAction(screen.selectCountByType )
export const selectStatusCountByType = createAjaxAction(screen.selectStatusCountByType )
export const selectEmergencyByTime = createAjaxAction(screen.selectEmergencyByTime )
export const selectCurrentFkyj = createAjaxAction(screen.selectCurrentFkyj )

