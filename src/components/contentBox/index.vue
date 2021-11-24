<!--
 * @Author: xulujin
 * @Date: 2021-08-24 10:32:19
 * @LastEditTime: 2021-10-28 15:58:20
 * @Description: contentBox 布局盒子
-->
<template>
  <div class="content-box">
    <!-- <i class="iconfont icon-right-top-l"></i>
    <i class="iconfont icon-left-top-l"></i>
    <i class="iconfont icon-right-bottom-l"></i>
    <i class="iconfont icon-left-bottom-l"></i> -->
    <div class="top-title-wrap">
      <span>{{ toplefttitle }}</span>
      <span>{{ toprighttitle }}</span>
    </div>
    <div class="content-box-slot-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'contentBox',
  props: {
    // topleft
    toplefttitle: {
      type: String,
    },
    toprighttitle: {
      type: String,
    },
  },
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {},
  watch: {},
};
</script>

<style lang="scss">
.content-box {
  width: 100%;
  height: 100%;
  // position: relative;
  // box-shadow: 0 0 50px 4px #26709b inset;
  background-color: #fff;
  border-radius: 4px;
  & > i {
    position: absolute;
    &.icon-right-top-l {
      top: 0;
      left: 0;
    }
    &.icon-left-top-l {
      top: 0;
      right: 0;
    }
    &.icon-right-bottom-l {
      bottom: 0;
      left: 0;
    }
    &.icon-left-bottom-l {
      bottom: 0;
      right: 0;
    }
    &::before {
      font-size: 30px;
      color: $input-theme-color;
      font-weight: bold;
    }
  }
  & > .content-box-slot-content {
    // padding: 0 8px;
    width: 100%;
    overflow: hidden;
    // & > div {
    //   height: 100%;
    // }
    .content-subtitle {
      margin-top: 14px;
      font-size: 22px;
      float: left;
      color: $input-theme-color;
    }
  }
  .top-title-wrap {
    text-indent: 12px;
    font-size: 16px;
    position: relative;
    padding: 6px 12px 0;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    // align-items: center;

    & > span:nth-child(1) {
      height: 22px;
      line-height: 22px;
      position: relative;
      &::before {
        content: '';
        width: 5px;
        height: 15px;
        border-radius: 2.5px;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        display: block;
        position: absolute;
        background: #ff8100;
      }
    }
    & > span:nth-child(2) {
      margin-top: 6px;
      color: #8b8b8b;
      font-size: 12px;
    }
  }
}
</style>
