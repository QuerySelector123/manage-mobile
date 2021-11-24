/*
 * @Author: your name
 * @Date: 2021-10-14 11:26:42
 * @LastEditTime: 2021-11-04 15:46:33
 * @LastEditors: [Dushuai]
 * @Description: In User Settings Edit
 * @FilePath: \manage-mobile\src\main.js
 */
import Vue from 'vue';
import App from './App.vue';
import store from './store';
import ElementUI from 'element-ui';
import wl from 'wl-vue-select';
import 'wl-vue-select/lib/wl-vue-select.css';
import router from './router';
import * as echarts from 'echarts';
import 'echarts-liquidfill'
import './assets/scss/index.scss';
import * as custom from './utils/filters';

import './lib/lib-flexible';
import './utils/directive';
import './utils/prototype';
import { deepClone } from './utils/deepClone';
import { format, subMonths, addMonths } from 'date-fns';
import { unitConversion } from './utils/unitConversion';
import { globalData } from './assets/js/globalData';
import { VueJsonp } from "vue-jsonp";
import enterNumber from "@/directive/enterNumber";
// 引入vant Drpdown 下拉菜单
import { DropdownMenu, DropdownItem } from 'vant';
import "vant/lib/dropdown-item/style"
import "vant/lib/dropdown-menu/style"
Vue.use(DropdownMenu);
Vue.use(DropdownItem);

// 引入 vant 时间选择
import { DatetimePicker } from 'vant'
import "vant/lib/datetime-picker/style"

Vue.use(DatetimePicker);
// 引入 vant 弹出层
import { Popup } from 'vant';
import "vant/lib/popup/style"
Vue.use(Popup);
// 引入日历组件
import { Calendar } from 'vant';
import "vant/lib/calendar/style"

Vue.use(Calendar);
//  引入 年份选择器
import { Picker } from 'vant';
import "vant/lib/picker/style"
Vue.use(Picker);
// 点选
import { Tab, Tabs } from 'vant';
Vue.use(Tab);
Vue.use(Tabs);
import "vant/lib/tab/style"
import "vant/lib/tabs/style"

// 下拉加载
import { PullRefresh as vantPullRefresh } from 'vant';
Vue.use(vantPullRefresh);
import "vant/lib/pull-refresh/style"


Vue.use(enterNumber);
Vue.use(VueJsonp);
Vue.use(wl);

// 下拉
import { List } from 'vant';

Vue.use(List);
import './components/index'; // 全局组件


import { Icon } from 'vant';

Vue.use(Icon);
// 引入全局过滤器
Object.keys(custom).forEach((key) => {
    Vue.filter(key, custom[key]);
});

Vue.prototype.$echarts = echarts;
Vue.prototype.$format = format;
Vue.prototype.$subMonths = subMonths;
Vue.prototype.$addMonths = addMonths;
Vue.prototype.$unitConversion = unitConversion;
Vue.prototype.$globalData = globalData;
Vue.prototype.$deepClone = deepClone;

Vue.use(ElementUI);


Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
    // chrome
    document.body.scrollTop = 0
    // firefox
    document.documentElement.scrollTop = 0
    // safari
    // window.pageYOffset = 0
    next()
});

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app');