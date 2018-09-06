import { ajax } from "utils";

export const selectNewImportantPlace = ajax.fetchJSONByPost(
  "/message/social/selectNewImportantPlace"
);

export const selectTotalImportantPlace = ajax.fetchJSONByPost(
  "/message/social/selectTotalImportantPlace"
);
export const selectEntryExitPeoAdd = ajax.fetchJSONByPost(
  "/message/social/selectEntryExitPeoAdd"
);
export const selectEntryExitPeoTotal = ajax.fetchJSONByPost(
  "/message/social/selectEntryExitPeoTotal"
);

export const selectAboveSixtyAdd = ajax.fetchJSONByPost(
  "/message/social/selectAboveSixtyAdd"
);

export const selectAboveSixtyTotal = ajax.fetchJSONByPost(
  "/message/social/selectAboveSixtyTotal"
);

export const roadTrafficAdd = ajax.fetchJSONByPost(
  "/message/social/roadTrafficAdd"
);
export const roadTrafficTotal = ajax.fetchJSONByPost(
  "/message/social/roadTrafficTotal"
);
export const prisonWatchhouseRehabAdd = ajax.fetchJSONByPost(
  "/message/social/prisonWatchhouseRehabAdd"
);
export const prisonWatchhouseRehabAddTotal = ajax.fetchJSONByPost(
  "/message/social/prisonWatchhouseRehabAddTotal"
);

export const selectInternetBarWarning = ajax.fetchJSONByPost(
  "/message/social/selectInternetBarWarning"
);
export const selectInternetBarPeople = ajax.fetchJSONByPost(
  "/message/social/selectInternetBarPeople"
);

export const selectInternetBarTop10 = ajax.fetchJSONByPost(
  "/message/social/selectInternetBarTop10"
);
export const selectHotelWarning = ajax.fetchJSONByPost(
  "/message/social/selectHotelWarning"
);

export const selectHotelTop10 = ajax.fetchJSONByPost(
  "/message/social/selectHotelTop10"
);

export const selectHotelPeople = ajax.fetchJSONByPost(
  "/message/social/selectHotelPeople"
);
export const selectMigrantSexRatio = ajax.fetchJSONByPost(
  "/message/social/selectMigrantSexRatio"
);

export const selectMigrantAge = ajax.fetchJSONByPost(
  "/message/social/selectMigrantAge"
);
export const selectMigrantPeople = ajax.fetchJSONByPost(
  "/message/social/selectMigrantPeople"
);

export const listCode = ajax.fetchJSONByPost("/message/subscription/listCode");
export const save = ajax.fetchJSONByPost("/message/subscription/save");

// export const clickMenu = ajax.fetchJSONByPost("/message/news/clickMenu");
