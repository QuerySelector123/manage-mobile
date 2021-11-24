<!--
 * @Author: your name
 * @Date: 2021-10-09 16:41:32
 * @LastEditTime: 2021-10-09 17:57:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \manage-mobile\src\components\stickHeader\index.vue
-->
<template>
  <van-sticky :offset-top="50" class="flight-stick">
    <div class="stick-header">
      <div class="stick-left">{{ titleLeft }} <i class="ht el-icon-arrow-down"></i></div>
      <div class="stick-right">2021年8月25 <i class="ht el-icon-arrow-down"></i></div>
    </div>
  </van-sticky>
</template>

<script>
import { Sticky as vanSticky } from 'vant';
export default {
  props: {
    titleLeft: {
      type: String,
      default: () => {
        return '业绩';
      },
    },
  },
  components: {
    vanSticky,
  },
};
</script>

<style lang="scss">
.flight-stick {
  height: 40px !important;
  .van-sticky--fixed {
    width: 100%;
    top: 40px !important;
    background: #f1f1f1;
    height: 40px;
    .stick-header {
      height: 40px;
      background: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 12px 0 25px;
      font-size: 19px;
    }

    // & > .flight-wrap {
    //   margin-left: 6px;
    //   width: calc(100% - 12px);
    // }
    // background: #f1f1f1;
  }
}
</style>
