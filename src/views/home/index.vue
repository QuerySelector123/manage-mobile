<!--
 * @Author: your name
 * @Date: 2021-09-27 11:17:59
 * @LastEditTime: 2021-11-24 11:47:28
 * @LastEditors: [Dushuai]
 * @Description: In User Settings Edit
 * @FilePath: \manage-mobile\src\views\home\index.vue
-->
<template>
  <div class="home">
    <div class="homeSpan">
      <span
        :class="{ active: index === activeIndex, disable: item.disable }"
        v-for="(item, index) in list"
        :key="index"
        @click="item.disable === true ? '' : handclick(index, item)"
      >
        {{ item.name }}
        <!-- <router-link ></router-link> -->
      </span>
    </div>
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :pulling-text="`数据更新时间：${$format(new Date(), 'yyyy年MM月dd日 hh:mm:ss')}`"
      :loosing-text="`数据更新时间：${$format(new Date(), 'yyyy年MM月dd日 hh:mm:ss')}`"
      :loading-text="`数据更新时间：${$format(new Date(), 'yyyy年MM月dd日 hh:mm:ss')}`"
    >
      <!-- <Navbar></Navbar> -->
      <router-view></router-view>
    </van-pull-refresh>
  </div>
</template>
<script>
import { Toast } from 'vant';
// var lastOnlick = -1;
// var flag = true;
export default {
  name: 'Home',
  data() {
    return {
      // activeId:-1,
      list: [
        {
          name: '总览',
          path: '/home/overview',
          // disable: true,
        },
        {
          name: '销售',
          path: '/home/sales',
          disable: false,
        },
        {
          name: '运行',
          path: '/home/operation',
          // disable: true,
        },
        {
          name: '保障',
          // disable: true,
          path: '/home/guarantee',
        },
        {
          name: '收入',
          path: '/home/income',
        },
        {
          name: '成本',
          path: '/home/cost',
        },
      ],
      activeIndex: 0,
      count: 0,
      isLoading: false,
    };
  },
  methods: {
    // showLi(id){
    //     this.activeId = id
    //     if(this.activeId === lastOnlick){
    //       if(flag){
    //         this.activeId = -1
    //       }else {
    //         this.activeId = id
    //       }
    //       flag = !flag
    //     }else {
    //       this.activeId = id
    //       flag = true
    //     }
    //     lastOnlick = id
    // },
    handclick(index, item) {
      if (this.activeIndex != index) {
        this.activeIndex = index;
        this.$router.push(item.path);
      }
    },
    onRefresh(value) {
      this.isLoading = false;
      setTimeout(() => {
        Toast('刷新成功');
        this.count++;
      }, 1000);
    },
  },
  created() {
    // 跳转对应的页面
    this.list.forEach((item, index) => {
      // console.log(this.$route,item);
      if (item.path === this.$route.path) this.activeIndex = index;
    });
  },
  watch: {
    isLoading: {
      handler(value) {
        this.$store.dispatch('general/commitpullShow', value);
        console.log('-->', this.$store.state.general.pullShow);
      },
    },
  },
};
</script>
<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  padding: 0 6px;
  padding-top: 46px;
  padding-bottom: 6px;
  background: #f1f1f1;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  & > article {
    background-size: 100%;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
  }
  .homeSpan {
    position: fixed;
    width: 100vw;
    height: 40px;
    top: 0;
    left: 0;
    background: #fff;
    display: flex;
    justify-content: space-around;
    z-index: 999;
    & > span {
      // margin-left: 15px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      transition: border-bottom 0.2s;
      &.disable {
        color: #ccc;
      }

      &.active {
        border-bottom: 3px solid #1080ca;
        text-shadow: 0 0 1px #111;
        font-size: 16px;
      }
    }
  }
}
</style>
