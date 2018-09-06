
import {
    createAction
  } from 'redux-actions';
  import { warningStaticApi } from 'api';
  import {
    createAjaxAction,
    fakeAjaxAction,
  } from 'utils';

  
  export const selectImportantPeopleWarning = createAjaxAction(warningStaticApi.selectImportantPeopleWarning );
  export const selectImportantPeopleDetails = createAjaxAction(warningStaticApi.selectImportantPeopleDetails );
  export const selectCriminalCaseWarning = createAjaxAction(warningStaticApi.selectCriminalCaseWarning );
  export const selectCriminalCaseTop10 = createAjaxAction(warningStaticApi.selectCriminalCaseTop10 );
  export const selectAdministrativeCaseWarning = createAjaxAction(warningStaticApi.selectAdministrativeCaseWarning );
  export const selectAdministrativeCaseTop10 = createAjaxAction(warningStaticApi.selectAdministrativeCaseTop10 );
  
  

  