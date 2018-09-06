import { daily } from "api";
import { createAction } from "redux-actions";
import { createAjaxAction, fakeAjaxAction } from "utils";
export const selectInternetBarPeople = createAjaxAction(
  daily.selectInternetBarPeople
);

export const selectHotelPeople = createAjaxAction(daily.selectHotelPeople);

export const keyCriminalCaseYoyChain = createAjaxAction(
  daily.keyCriminalCaseYoyChain
);
export const keyCriminalCaseTotal = createAjaxAction(
  daily.keyCriminalCaseTotal
);
export const keyAlarmTotal = createAjaxAction(daily.keyAlarmTotal);
export const securityCaseYoyChain = createAjaxAction(
  daily.securityCaseYoyChain
);

export const securityCaseYoyChainTotal = createAjaxAction(
  daily.securityCaseYoyChainTotal
);

export const criminalCaseAreaDistribution = createAjaxAction(
  daily.criminalCaseAreaDistribution
);

export const selectInternetBarWarning = createAjaxAction(
  daily.selectInternetBarWarning
);
export const selectHotelWarning = createAjaxAction(daily.selectHotelWarning);
