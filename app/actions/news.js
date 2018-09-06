import { news } from "api";
import { createAction } from "redux-actions";
import { createAjaxAction, fakeAjaxAction } from "utils";

export const dataList = createAjaxAction(news.newList);

export const nodeList = createAjaxAction(news.nodeList);
export const clickMenu = createAjaxAction(news.clickMenu);
export const showNewsDetail = createAjaxAction(news.showNewsDetail);

export const clickPage = createAjaxAction(news.clickPage);
export const newsSingle = createAjaxAction(news.newsSingle);

export const requestnewsListInfoList = createAction("request_newsList_List");
export const receivenewsListInfoList = createAction("receive_newsList_List");
export const getnewsInfoList = createAjaxAction(
  news.newList,
  requestnewsListInfoList,
  receivenewsListInfoList
);
