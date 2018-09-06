
import {
    createAction
  } from 'redux-actions';
  import { traceOfSourceApi} from 'api';
  import {
    createAjaxAction,
    fakeAjaxAction,
  } from 'utils';

  export const getPoliceTypePushById = createAjaxAction(traceOfSourceApi.policeTypePushById );
  export const getHcZoneRecvList = createAjaxAction(traceOfSourceApi.hcZoneRecvList );
  export const getHcPushInfoById = createAjaxAction(traceOfSourceApi.hcPushInfoById );

  
  