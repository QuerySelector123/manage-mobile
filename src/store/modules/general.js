/**
 * app store
 * @description
 * 登录模块的状态存储
 */

import Vue from 'vue';
// const Login = () => import("views/Login/index.vue"); // 401无权限页面

const state = {
  isLogin: '' || sessionStorage.getItem('isLogin'),
  isloading: false,
  pullShow: false,
  addRoutesFlag: false,
  authRoute: JSON.parse(sessionStorage.getItem('authRoute')) || [
    { menuUrl: '/', redirect: '/login' },
    {
      menuUrl: '/login',
      menuCode: 'login',
      component: require('@/views/login').default
    }
  ],
  token: '' || sessionStorage.getItem('token'),
  appCode: '1010000000',
  userName: '' || sessionStorage.getItem('userName'),
  credential: '' || sessionStorage.getItem('credential'),
};

const getters = {
  getIsLogin(state) {
    return state.authRoute;
  },
  getAuthRoute(state) {
    return state.authRoute;
  },
  getToken(state) {
    return state.token;
  },
  getAppCode(state) {
    return state.appCode;
  },
  getUserName(state) {
    return state.userName;
  },
  getCredential(state) {
    return state.credential;
  }
};

const mutations = {
  setpullShow(state, device) {
    console.log(device);
    state.pullShow = device
  },
  setIsLogin(state, device) {
    sessionStorage.setItem('isLogin', device);
    state.isLogin = device;
  },
  setAuthRoute(state, device) {
    sessionStorage.setItem('authRoute', device);
    state.authRoute = device;
  },
  setToken(state, device) {
    sessionStorage.setItem('token', device);
    state.token = device;
  },
  setAppCode(state, device) {
    sessionStorage.setItem('appCode', device);
    state.appCode = device;
  },
  setUserName(state, device) {
    sessionStorage.setItem('userName', device);
    state.userName = device;
  },
  setCredential(state, device) {
    sessionStorage.setItem('credential', device);
    state.credential = device;
  },
  setAddRoutesFlag(state, device) {
    state.addRoutesFlag = device;
  }
};

const actions = {
  commitpullShow({ commit }, device) {
    return new Promise((resolve, reject) => {
      commit('setpullShow', device)
      resolve()
    })
  },
  commitIsLogin({ commit }, device) {
    return new Promise((resolve, reject) => {
      commit('setIsLogin', device);
      resolve();
    });
  },
  commitAuthRoute({ commit }, device) {
    return new Promise((resolve, reject) => {
      commit('setAuthRoute', device);
      resolve();
    });
  },
  commitToken({ commit }, commitThings) {
    return new Promise((resolve, reject) => {
      commit('setToken', commitThings);
    });
  },
  commitAppCode({ commit }, commitThings) {
    return new Promise((resolve, reject) => {
      commit('setAppCode', commitThings);
    });
  },
  commitUserName({ commit }, commitThings) {
    return new Promise((resolve, reject) => {
      commit('setUserName', commitThings);
    });
  },
  commitCredential({ commit }, commitThings) {
    return new Promise((resolve, reject) => {
      commit('setCredential', commitThings);
    });
  },
  commitAddRoutesFlag({ commit }, commitThings) {
    return new Promise((resolve, reject) => {
      commit('setAddRoutesFlag', commitThings);
    });
  }
};
export default {
  namespaced: true, // 开启模块的命名空间
  state,
  getters,
  mutations,
  actions
};
