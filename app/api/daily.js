import { ajax } from "utils";

export const selectInternetBarPeople = ajax.fetchJSONByPost(
  "/message/social/selectInternetBarPeople"
);

export const selectHotelPeople = ajax.fetchJSONByPost(
  "/message/social/selectHotelPeople"
);

export const keyCriminalCaseYoyChain = ajax.fetchJSONByPost(
  "/message/report/keyCriminalCaseYoyChain"
);

export const keyCriminalCaseTotal = ajax.fetchJSONByPost(
  "/message/report/keyCriminalCaseTotal"
);

export const keyAlarmTotal = ajax.fetchJSONByPost(
  "/message/report/keyAlarmTotal"
);
export const securityCaseYoyChain = ajax.fetchJSONByPost(
  "/message/report/securityCaseYoyChain"
);
export const securityCaseYoyChainTotal = ajax.fetchJSONByPost(
  "/message/report/securityCaseYoyChainTotal"
);
export const criminalCaseAreaDistribution = ajax.fetchJSONByPost(
  "/message/report/criminalCaseAreaDistribution"
);
export const selectInternetBarWarning = ajax.fetchJSONByPost(
  "/message/social/selectInternetBarWarning"
);
export const selectHotelWarning = ajax.fetchJSONByPost(
  "/message/social/selectHotelWarning"
);
