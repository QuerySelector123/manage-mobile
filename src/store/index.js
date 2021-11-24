/**
 * store
 * @description
 * 状态管理入口
 */
import Vue from 'vue';
import Vuex from 'vuex';

import { getAllModules } from '@/utils/import-all';

Vue.use(Vuex);

// 批量导入 `./modules` 下所有的 store 数据
const modules = getAllModules(require.context('./modules', true, /\.js$/));

const store = new Vuex.Store({
  modules,
});

export default store;
