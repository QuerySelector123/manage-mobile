/*
 * @Author: your name
 * @Date: 2021-09-27 11:17:59
 * @LastEditTime: 2021-10-29 15:03:18
 * @LastEditors: [Dushuai]
 * @Description: In User Settings Edit
 * @FilePath: \manage-mobile\src\components\index.js
 */
/**
 * @name: 全局注册组件
 * @author: xulujin
 * @msg:
 * @Date: 2021-05-25 10:49:27
 */
import Vue from 'vue';
import CirclePieChart from './circlePieChart';
import ContentBox from './contentBox/index.vue';
import SuperChart from './superChart/index.vue';
import TableSlot from './tableSlot/index.vue';
import WaterPoloChart from './waterPoloChart/index.vue';
import ShipDropdown from './shipdropdown/index.vue';
import DateNavbar from './dateNavbar/index.vue';
import DateTimePickerRange from './dateTimePickerRange/index.vue';
import BarLineChart from './barLineChart/index.vue';
import thedashBoard from './thedashBoard/index.vue';

import NetsDloop from './NesteDloop/index.vue'

import stickHeader from './stickHeader/index.vue'
import BarLeftChart from './BarLeftChart/index.vue'
import ModleChart from "./ModleChart/index.vue"
// import CopiesCHart from './copiesCHart';
import LiquidfillChart from './LiquidfillChart/index.vue'
import Navbar from './Navbar/index.vue'
import Loading from './Loading/index.vue'

Vue.component('ContentBox', ContentBox)
Vue.component('SuperChart', SuperChart)
Vue.component('TableSlot', TableSlot)
Vue.component('WaterPoloChart', WaterPoloChart)
Vue.component('ShipDropdown', ShipDropdown)
Vue.component('CirclePieChart', CirclePieChart)
Vue.component('DateNavbar', DateNavbar)
Vue.component('DateTimePickerRange', DateTimePickerRange)
Vue.component('BarLineChart', BarLineChart)
Vue.component('stickHeader', stickHeader)
Vue.component('thedashBoard', thedashBoard)
Vue.component('NetsDloop', NetsDloop)
Vue.component('BarLeftChart', BarLeftChart)
Vue.component('LiquidfillChart', LiquidfillChart)
Vue.component('ModleChart', ModleChart)
Vue.component('Navbar', Navbar)
Vue.component('Loading', Loading)

// Vue.component('CopiesCHart', CopiesCHart)

