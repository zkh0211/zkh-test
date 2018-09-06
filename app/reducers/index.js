import { routerReducer as routing } from "react-router-redux";
import { combineReducers } from "redux";

import tabListResult from "./tabList";

// house
import {
  houseCheckSearchResult,
  houseCheckSearchQuery,
  houseDetailResult
} from "./house";
import { loginResponse, mijiResponse } from "./common";

import {
  orderByYearResponse,
  orderByMonthResponse,
  orderByWeekResponse,
  orderCompletionResponse,
  orderByTypeResponse,
  tabAppointedTypeResponse,
  hcCaseFromListResponse,
  submitListResponse,
  getCaseTypeResponse,
  changeCaseTypeTabResponse,
  selectCountByStatusResponse,
  zonglanCountResponse,  
  doneCountResponse, 
  willDoCountResponse,
  doingCountResponse,
  tongxingCountResponse,
  pcsWillDoCountResponse,
  pcsDoingCountResponse,
  zhilingTotalResponse,
  checkWhiteSheetResponse,
  isFeedBackZhilingResponse,
  getDirectionSearchResponse

} from "./masterReducer";

import // chatMessageHistoryResponse
"./analysisForPoliceReducer";

import { newsData } from "./news";

const rootReducer = combineReducers({
  routing,
  config: (state = {}) => state,
  tabListResult,

  loginResponse,

  houseCheckSearchResult,
  houseCheckSearchQuery,
  houseDetailResult,

  orderByYearResponse,
  orderByMonthResponse,
  orderByWeekResponse,
  orderCompletionResponse,
  orderByTypeResponse,
  tabAppointedTypeResponse,
  hcCaseFromListResponse,
  submitListResponse,
  mijiResponse,
  newsData,
  getCaseTypeResponse,
  changeCaseTypeTabResponse,
  selectCountByStatusResponse,
  zonglanCountResponse,  
  doneCountResponse, 
  willDoCountResponse,
  doingCountResponse,
  tongxingCountResponse,
  pcsWillDoCountResponse,
  pcsDoingCountResponse,
  zhilingTotalResponse,
  checkWhiteSheetResponse,
  isFeedBackZhilingResponse,
  getDirectionSearchResponse
});

export default rootReducer;
