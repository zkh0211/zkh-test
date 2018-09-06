import fetch from 'isomorphic-fetch'
import {API_PREFIX, API_SUFFIX,API_FILE} from '../constants'
import Cookies from 'js-cookie';

// todo : 连接store
// const code = global.$GLOBALCONFIG.STAFF.code

function buildParams(obj) {
    if (!obj) {
        return ''
    }
    const params = []
    for (const key of Object.keys(obj)) {
        const value = obj[key] === undefined ? '' : obj[key]
        params.push(`${key}=${encodeURIComponent(value)}`)
    }
    const arg = params.join('&')
    return arg
}

// 下面是注释用formdata的方式传输数据
/* export function fetchJSON(url, params) {
 params = {
 ...params,
 headers: {
 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
 ...params.headers,
 },
 }
 url = `${API_PREFIX}${url}${API_SUFFIX}`
 return fetch(url, params)
 }*/

export function fetchJSON(url, header, target) {
  /* const data = {
   'method': 'POST',
   'headers': {
   'Content-Type': 'application/json',
   },
   'body': JSON.stringify(params),
   }*/

    if (target) {
        // url = `${target}${url}${API_SUFFIX}`
        url = `${target}${url}`
    } else {
        // url = `${API_PREFIX}${url}${API_SUFFIX}`
        url = `${API_PREFIX}${url}`
    }

    let token = Cookies.get('token') || null;
    header['headers']['access-token'] = token;
    return fetch(url, header)
}

export const fetchJsonByParamDelete = (url, target) => query=> {
    const header = {
        'method': 'DELETE',
        'headers': {
            'Content-Type': 'application/json',
            'access-token':'',
        }
    }
    let newUrl = url;
    let params = query;
    newUrl = newUrl + "/" + params;
    return fetchJSON(newUrl, header, target)
}


// eslint-disable-next-line arrow-parens
export const fetchJSONByPost = (url, target) => query => {
    // 下面是注释用formdata的方式传输数据
  /* const params = {
   method: 'POST',
   body: buildParams(query),
   }
   return fetchJSON(url, params)*/
    const header = {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json',
            'access-token':'',
        },
        'body': '',
    }
    let newUrl = url;
    if (query) {
        let urlParam;
        let newQuery = {};
        newQuery.extend = function(obj){
            for(var k in obj){
                if(k != 'urlParam'){
                    this[k] = obj[k];
                }
            }
        }
        newQuery.extend(query);
        Object.keys(query).forEach(key => {
            if(key === 'urlParam'){
                urlParam = query[key]
            }else if(key === 'multiPageUrl'){
                newUrl = query[key]
            }
        })
        header.body = JSON.stringify(newQuery);
        if(urlParam != undefined && urlParam != ''){
            newUrl += '/' + urlParam;
        }
    }
    return fetchJSON(newUrl, header, target);
}

export const fetchJSONByGet = (url, target) => query => {
    const requestParams = {
        'method': 'get',
        'headers': {
            'Content-Type': 'application/json',
            'access-token':'',
        },
    }
    let newUrl = url;
    if (query) {
        let paramsArray = [];
        let urlParam;
        //拼接参数
        Object.keys(query).forEach(key => {
            if(key === 'urlParam'){
                urlParam = query[key]
            }else {
                paramsArray.push(key + '=' + query[key])
            }
        })

        if (newUrl.search(/\?/) === -1) {
            if(urlParam != '' && urlParam != undefined){
                newUrl += '/' + urlParam;
            }
            newUrl += '?' + paramsArray.join('&')
        } else {
            if(urlParam != '' && urlParam != undefined){
                let urls = newUrl.split('?');
                newUrl = urls[0] + '/' + urlParam + '?' + urls[1];
                newUrl += '/' + urlParam;
            }
            newUrl += '&' + paramsArray.join('&')
        }
    }
    return fetchJSON(newUrl, requestParams, target)
}


export const fetchJSONByPostFile = (url, target) => query => {
    // 下面是注释用formdata的方式传输数据
   const params = {
    method: 'POST',
    'headers': {
        'access-token':'',
        // 'Content-Type' : 'multipart/form-data'
    },
    body: query,
   }
   return fetchJSON(url, params , API_FILE)
}


export const fetchJSONByParamPost = (url, target) => query => {
    const requestParams = {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json',
            'access-token':'',
        }
    }
    let newUrl = url;
    if (query) {
        let paramsArray = [];
        let urlParam;
        //拼接参数
        Object.keys(query).forEach(key => {
            if(key === 'urlParam'){
                urlParam = query[key]
            }else {
                paramsArray.push(key + '=' + query[key])
            }
        })
        if (newUrl.search(/\?/) === -1) {
            if(urlParam != '' && urlParam != undefined){
                newUrl += '/' + urlParam;
            }
            newUrl += '?' + paramsArray.join('&')
        } else {
            if(urlParam != '' && urlParam != undefined){
                let urls = newUrl.split('?');
                newUrl = urls[0] + '/' + urlParam + '?' + urls[1];
                newUrl += '/' + urlParam;
            }
            newUrl += '&' + paramsArray.join('&')
        }
    }
    return fetchJSON(newUrl, requestParams, target);
}

export const fetchJSONByPut = (url, target) => query => {
    const header = {
        'method': 'PUT',
        'headers': {
            'Content-Type': 'application/json',
            'access-token':'',
        },
        'body': '',
    }
    let newUrl = url;
    if (query) {
        let urlParam;
        let newQuery = {};
        newQuery.extend = function(obj){
            for(var k in obj){
                if(k != 'urlParam'){
                    this[k] = obj[k];
                }
            }
        }
        newQuery.extend(query);
        Object.keys(query).forEach(key => {
            if(key === 'urlParam'){
                urlParam = query[key]
            }
        })
        header.body = JSON.stringify(newQuery);
        if(urlParam != undefined && urlParam != ''){
            newUrl += '/' + urlParam;
        }
    }
    return fetchJSON(newUrl, header, target);
}


export const fetchJSONByParamPut = (url, target) => query => {
    const requestParams = {
        'method': 'PUT',
        'headers': {
            'Content-Type': 'application/json',
        }
    }
    let newUrl = url;
    if (query) {
        let paramsArray = [];
        let urlParam;
        //拼接参数
        Object.keys(query).forEach(key => {
            if(key === 'urlParam'){
                urlParam = query[key]
            }else {
                paramsArray.push(key + '=' + query[key])
            }
        })
        if (newUrl.search(/\?/) === -1) {
            if(urlParam != '' && urlParam != undefined){
                newUrl += '/' + urlParam;
            }
            newUrl += '?' + paramsArray.join('&')
        } else {
            if(urlParam != '' && urlParam != undefined){
                let urls = newUrl.split('?');
                // console.log("urls");
                // console.log(urls);
                newUrl = urls[0] + '/' + urlParam + '?' + urls[1];
                newUrl += '/' + urlParam;
            }
            newUrl += '&' + paramsArray.join('&')
        }
    }
    return fetchJSON(newUrl, requestParams, target);
}

export const fetchJSONByDelete = (url, target) => query => {
    const header = {
        'method': 'DELETE',
        'headers': {
            // 'Content-Type': 'application/json',
            'access-token':'',
        },
        'body': '',
    }
    let newUrl = url;
    if (query) {
        let paramsArray = [];
        let urlParam;
        //拼接参数
        Object.keys(query).forEach(key => {
            if(key === 'urlParam'){
                urlParam = query[key]
            }else {
                paramsArray.push(key + '=' + query[key])
            }
        })
        if (newUrl.search(/\?/) === -1) {
            if(urlParam != '' && urlParam != undefined){
                newUrl += '/' + urlParam;
            }
            newUrl += '?' + paramsArray.join('&')
        } else {
            if(urlParam != '' && urlParam != undefined){
                let urls = newUrl.split('?');
                newUrl = urls[0] + '/' + urlParam + '?' + urls[1];
                newUrl += '/' + urlParam;
            }
            newUrl += '&' + paramsArray.join('&')
        }
        // header.body = JSON.stringify(newQuery);
        // if(urlParam != undefined && urlParam != ''){
        //     newUrl += '/' + urlParam;
        // }
    }
    return fetchJSON(newUrl, header, target);
}

/*export const fetchJSONByBodyDelete = (url, target) => query => {
 const header = {
 'method': 'DELETE',
 'headers': {
 'Content-Type': 'application/json',
 'access-token':'',
 },
 'body': '',
 }
 let newUrl = url;
 if (query) {
 let urlParam;
 let newQuery = {};
 newQuery.extend = function(obj){
 for(var k in obj){
 if(k != 'urlParam'){
 this[k] = obj[k];
 }
 }
 }
 newQuery.extend(query);
 Object.keys(query).forEach(key => {
 if(key === 'urlParam'){
 urlParam = query[key]
 }
 })
 const token = Cookies.get('token') || null;
 header.headers['access-token'] = token;
 header.body = JSON.stringify(newQuery);
 if(urlParam != undefined && urlParam != ''){
 newUrl += '/' + urlParam;
 }
 }
 return fetchJSON(newUrl, header, target);
 }*/

export const fetchJSONStringByPost = url => query => {
    const requestParams = {
        method: 'POST',
        body: query,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
    }
    return fetchJSON(url, requestParams)
}

