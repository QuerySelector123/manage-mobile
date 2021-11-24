/**
 * @name: 全局自定义指令
 * @author: xulujin
 * @createTime 2021/3/16 15:32
 */

import Vue from "vue";

Vue.directive('element-table-scroll-loadmore', {
  bind(el, binding) {
    var mydiv = el.querySelector('.el-table__body-wrapper')
    var t = mydiv.scrollTop || mydiv.scrollTop;
    var l = mydiv.scrollLeft || mydiv.scrollLeft;
    mydiv.onscroll = function () {
      var t1 = this.scrollTop || this.scrollTop;
      var l1 = this.scrollLeft || this.scrollLeft;
      if (t1 != t) {
        t = t1;
        if (mydiv.scrollTop >= mydiv.scrollHeight - mydiv.clientHeight) {
          binding.value();
        }
      }
      if (l1 != l) {
        l = l1;
      }
    }
  }
})

Vue.directive('scroll-loadmore', {
  bind(el, binding) {
    var mydiv = el;
    var t = mydiv.scrollTop || mydiv.scrollTop;
    var l = mydiv.scrollLeft || mydiv.scrollLeft;
    mydiv.onscroll = function () {
      var t1 = this.scrollTop || this.scrollTop;
      var l1 = this.scrollLeft || this.scrollLeft;
      if (t1 != t) {
        t = t1;
        if (mydiv.scrollTop >= mydiv.scrollHeight - mydiv.clientHeight) {
          binding.value();
        }
      }
      if (l1 != l) {
        l = l1;
      }
    }
  }
})

// 获得焦点
Vue.directive('focus', {
  inserted: function (el) {
    el.focus();
  }
})

