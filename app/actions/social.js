import { social } from "api";
import { createAction } from "redux-actions";
import { createAjaxAction, fakeAjaxAction } from "utils";

export const selectNewImportantPlace = createAjaxAction(
  social.selectNewImportantPlace
);
export const selectTotalImportantPlace = createAjaxAction(
  social.selectTotalImportantPlace
);

export const selectEntryExitPeoAdd = createAjaxAction(
  social.selectEntryExitPeoAdd
);
export const selectEntryExitPeoTotal = createAjaxAction(
  social.selectEntryExitPeoTotal
);

export const selectAboveSixtyAdd = createAjaxAction(social.selectAboveSixtyAdd);

export const selectAboveSixtyTotal = createAjaxAction(
  social.selectAboveSixtyTotal
);
// export const selectNewImportantPlace = createAjaxAction(
//   social.selectNewImportantPlace
// );

export const roadTrafficAdd = createAjaxAction(social.roadTrafficAdd);
export const roadTrafficTotal = createAjaxAction(social.roadTrafficTotal);
export const prisonWatchhouseRehabAdd = createAjaxAction(
  social.prisonWatchhouseRehabAdd
);
export const prisonWatchhouseRehabAddTotal = createAjaxAction(
  social.prisonWatchhouseRehabAddTotal
);

export const selectInternetBarWarning = createAjaxAction(
  social.selectInternetBarWarning
);
export const selectInternetBarPeople = createAjaxAction(
  social.selectInternetBarPeople
);
export const selectInternetBarTop10 = createAjaxAction(
  social.selectInternetBarTop10
);
export const selectHotelWarning = createAjaxAction(social.selectHotelWarning);
export const selectHotelTop10 = createAjaxAction(social.selectHotelTop10);
export const selectHotelPeople = createAjaxAction(social.selectHotelPeople);
export const selectMigrantSexRatio = createAjaxAction(
  social.selectMigrantSexRatio
);

export const selectMigrantAge = createAjaxAction(social.selectMigrantAge);
export const selectMigrantPeople = createAjaxAction(social.selectMigrantPeople);

export const listCode = createAjaxAction(social.listCode);
export const save = createAjaxAction(social.save);
