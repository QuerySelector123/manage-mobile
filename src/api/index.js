/*
 * @Author: your name
 * @Date: 2021-08-23 19:55:16
 * @LastEditTime: 2021-08-26 08:55:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lackmaterial-web\src\api\index.js
 */
import request from '@/utils/request';
import requestBip from '@/utils/request_bip';
import store from '@/store/index'
/**
 * 请求实例
 * @param url
 * @param {Object} params
 * @param responseType
 */
export function get(url, params, responseType) {
  return request({
    url,
    method: 'get',
    params,
    responseType,
  });
}

export function post(url, params, options) {
  return request({
    url,
    method: 'post',
    params,
    ...options,
  });
}

export function deletes(url, params) {
  return request({
    url,
    method: 'delete',
    params,
  });
}

export function put(url, params) {
  return request({
    url,
    method: 'put',
    params,
  });
}

export function postArr(url, params, options) {
  // 传过去的参数为对象形式，就用这种方式
  return request({
    url,
    method: 'post',
    data: params,
    ...options,
  });
}

export function get_bip(url, params, responseType) {
  return requestBip({
    url,
    method: 'get',
    params,
    responseType,
  });
}

export function post_bip(url, params, options) {
  return requestBip({
    url,
    method: 'post',
    params,
    ...options
  });
}

export function postArr_bip(url, params, options) {
  // 传过去的参数为对象形式，就用这种方式
  return requestBip({
    url,
    method: 'post',
    data: params,
    ...options
  });
}

// 区域 城市 特殊处理
export function get_qy(url, params, responseType) {
  if (!params) params = {}

  let modouleQY = [
    { name: '/economic', value: 1 },
    { name: '/operationOfMarket', value: 2 },
    { name: '/operationOfLand', value: 3 },
    { name: '/urbanmarket', value: 4 },
    { name: '/openProjectDecisions', value: 5 },
    { name: '/notPublic', value: 6 },
    { name: '/investCompletion', value: 7 },
    { name: '/CPPM', value: 8 },
    { name: '/investAnalyse', value: 9 },
    { name: '/competitor', value: 10 },
    { name: '/planResource', value: 11 },
    { name: '/IRSP', value: 12 },
    { name: '/policyKanban', value: 13 },
    { name: '/reportToShare', value: 14 },
    { name: '/systemTools', value: 15 },
  ];

  let modoule = modouleQY.find((item) => window.location.hash.indexOf(item.name) >= 0);

  params.module = modoule.value

  return request({
    url,
    method: 'get',
    params,
    responseType,
  });
}