import { ajax } from "utils";

export const getConfig = ajax.fetchJSONByGet(
    "/display/jinqtsfx/getNativeInfo"
);
export const jjqkbjRatio = ajax.fetchJSONByPost(
    "/display/jinqtsfx/jjqkbjRatio"
);
export const ajlxRatio = ajax.fetchJSONByPost(
    "/display/jinqtsfx/ajlxRatio"
);
export const zdrqk = ajax.fetchJSONByPost(
    "/display/jinqtsfx/zdrqk"
);
export const afslpm = ajax.fetchJSONByPost(
    "/display/jinqtsfx/afslpm"
);
export const afslpmdj = ajax.fetchJSONByPost(
    "/display/jinqtsfx/afslpmdj"
);
export const affb = ajax.fetchJSONByPost(
    "/display/jinqtsfx/affb"
);
export const caseNumTrend = ajax.fetchJSONByPost(
    "/display/jinqtsfx/caseNumTrend"
);
export const peoNumTrend = ajax.fetchJSONByPost(
    "/display/jinqtsfx/peoNumTrend"
);
export const jqfb = ajax.fetchJSONByPost(
    "/display/Echart/jqfb"
);
export const peoHostel = ajax.fetchJSONByPost(
    "/display/jinqtsfx/peoHostel"
);
export const peoNumTongHuan = ajax.fetchJSONByPost(
    "/display/jinqtsfx/peoNumTongHuan"
);
export const jjNumTongHuan = ajax.fetchJSONByPost(
    "/display/jinqtsfx/jjNumTongHuan"
);
export const caseNumTongHuan = ajax.fetchJSONByPost(
    "/display/jinqtsfx/caseNumTongHuan"
);
export const zdjq = ajax.fetchJSONByGet(
    "/display/zdjq/selectZdjq"
);
