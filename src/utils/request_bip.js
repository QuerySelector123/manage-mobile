/*
 * @Author: your name
 * @Date: 2021-08-23 19:55:17
 * @LastEditTime: 2021-08-26 08:56:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lackmaterial-web\src\utils\request_bip.js
 */
import axios from 'axios';
import { errorMessage } from './error-handler';
import store from "@/store";
import Vue from 'vue'

// 取消请求（用于当没有 token 时，取消当前的请求，直到获取 token）
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
// 这些接口不添加token
// const requestNoToken = ['/euicpUserAuthpass/login','/euicpUserAuthpass/logout'];

/**
 * 创建 axios 服务实例
 * @description
 * 该方法所需的参数如下：
 * @param {String} url 请求的 url，默认配置了一级路径，只需二级路径，例如：/login
 * @param {String} method 请求方式 `get/post`
 * @param {Object} data post 请求的参数
 * @param {Object} params get 请求的参数
 */
const service = axios.create({
  baseURL: process.env.VUE_APP_URL_DEVELOPMENT_bip,
  // withCredentials: true,
  timeout: 20000,
  cancelToken: source.token
});

export default service;

// 请求拦截
service.interceptors.request.use(
  (config) => {
    const params = config.params;
    config.headers['Authorization'] = store.state.general.token;
    if (config.method === 'post') {
      const isFormData = Object.prototype.toString.call(params) === '[object FormData]'; // 判断是否为FormData对象，是的的话需要需改 Content-Type
      config.headers['Content-Type'] = isFormData ? 'multipart/form-data' : 'application/json';
      if (isFormData) {
        config.data = params;  // FormData 的数据需要放在data下
      }
    } else if (config.method === 'get') {
      config.params = {
        _t: Date.parse(new Date()) / 1000,
        ...params
      };
    }
    return config;
  },
  (error) => {
    return promiseError(error, '请求错误');
  }
);

// 响应拦截
service.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (data.status == 0) {
      if (data.code == 200) {
        // Vue.prototype.$message({
        //   message: data.msg + '，请及时联系后台管理员！',
        //   type: 'error'
        // })
        return data;
      }
    } else if (data.status == 1) {
      return data;
    } else if (data.status == 40007) {
      return data;
    } else {
      if (data.msg) {
        Vue.prototype.$message({
          message: data.msg,
          type: 'error'
        })
      }
      return data
    }
  },
  (error) => {
    return promiseError(error);
  }
);

function promiseError(data, defaultMessage = '服务异常') {
  errorMessage(data || defaultMessage);
  return Promise.reject(data);
}
