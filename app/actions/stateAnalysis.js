/**
 * Created by 15254 on 2018/5/22.
 */
import { stateAnalysis } from "api";
import { createAction } from "redux-actions";
import { createAjaxAction, fakeAjaxAction } from "utils";

export const getConfig = createAjaxAction(stateAnalysis.getConfig);
export const jjqkbjRatio = createAjaxAction(stateAnalysis.jjqkbjRatio);
export const ajlxRatio = createAjaxAction(stateAnalysis.ajlxRatio);
export const zdrqk = createAjaxAction(stateAnalysis.zdrqk);
export const afslpm = createAjaxAction(stateAnalysis.afslpm);
export const afslpmdj = createAjaxAction(stateAnalysis.afslpmdj);
export const affb = createAjaxAction(stateAnalysis.affb);
export const caseNumTrend = createAjaxAction(stateAnalysis.caseNumTrend);
export const peoNumTrend = createAjaxAction(stateAnalysis.peoNumTrend);
export const jqfb = createAjaxAction(stateAnalysis.jqfb);
export const peoHostel = createAjaxAction(stateAnalysis.peoHostel);
export const peoNumTongHuan = createAjaxAction(stateAnalysis.peoNumTongHuan);
export const jjNumTongHuan = createAjaxAction(stateAnalysis.jjNumTongHuan);
export const caseNumTongHuan = createAjaxAction(stateAnalysis.caseNumTongHuan);
export const zdjq = createAjaxAction(stateAnalysis.zdjq);





