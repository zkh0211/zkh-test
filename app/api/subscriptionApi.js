import { ajax } from "utils";


export const saveSubscription = ajax.fetchJSONByPost("/message/subscription/save");
export const listCode = ajax.fetchJSONByPost("/message/subscription/listCode");
export const test = '1111111111111'