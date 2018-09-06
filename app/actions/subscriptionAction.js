

import { subscriptionApi } from "api";
import { createAction } from "redux-actions";
import { createAjaxAction, fakeAjaxAction } from "utils";
export const saveSubscription = createAjaxAction(subscriptionApi.saveSubscription);
export const listCode = createAjaxAction(subscriptionApi.listCode);
