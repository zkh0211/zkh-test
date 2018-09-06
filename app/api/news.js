import { ajax } from "utils";

// export const newList = ajax.fetchJSONByPost("/message/news/menuList");
// export const clickMenu = ajax.fetchJSONByPost("/message/news/clickMenu");

export const showNewsDetail = ajax.fetchJSONByPost(
  "/message/news/showNewsDetail"
);

export const nodeList = ajax.fetchJSONByGet("/cms/jsonp/info/nodeList");
export const clickPage = ajax.fetchJSONByGet("/cms/jsonp/info/page");

export const newsSingle = ajax.fetchJSONByGet("/cms/jsonp/info");
