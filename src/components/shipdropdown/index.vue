<template>
  <!-- 船线航班的选择 -->
  <!-- <van-sticky :offset-top="12" class="flight-sticky" @scroll="scroll"> -->
  <div class="flight-wrap">
    <div class="flight-item">
      <div class="button" @click="showship">
        <span>{{ ship }}</span>
        <i class="el-icon-caret-bottom"></i>
      </div>
    </div>

    <div class="flight-item">
      <div class="button" @click="showcollect">
        <span>{{ collect }}</span>
        <i class="el-icon-caret-bottom"></i>
      </div>
    </div>
    <div class="flight-item">
      <div class="button" @click="showcount">
        <span>{{ count }}</span>
        <i class="el-icon-caret-bottom"></i>
      </div>
    </div>

    <!-- 船舶汇总 -->
    <van-popup position="bottom" v-model="shipshow" @click-overlay="overship">
      <van-picker title="选择船舶" show-toolbar :columns="shiplist" @cancel="overship" @change="changeship" @confirm="configship" />
    </van-popup>
    <!-- 航线汇总 -->
    <van-popup position="bottom" v-model="collectshow" @click-overlay="overcollect">
      <van-picker title="选择航线" show-toolbar :columns="collectlist" @cancel="overcollect" @change="changecollect" @confirm="configcollect" />
    </van-popup>
    <!-- 航次汇总 -->
    <van-popup position="bottom" v-model="countshow" @click-overlay="overcount">
      <van-picker title="选择航次" show-toolbar :columns="countlist" @cancel="overcount" @change="changecount" @confirm="configcount" />
    </van-popup>
  </div>
  <!-- </van-sticky> -->
</template>

<script>
// import { Sticky as vanSticky } from 'vant';
export default {
  data() {
    return {
      ship: '船舶汇总',
      shipshow: false,
      shiplist: ['船舶汇总', '大湾区一号', '大湾区二号'],
      collect: '航线汇总',
      collectshow: false,
      collectlist: ['航线汇总', '港珠澳', '深圳湾', '前海湾'],

      count: '航次汇总',
      countshow: false,
      countlist: ['航次汇总', '港珠澳 07:30', '港珠澳 09:50', '港珠澳 11:00', '港珠澳 14:00'],
    };
  },
  components: {
    // vanSticky,
  },
  mounted() {},
  methods: {
    scroll(value) {
      // console.log(value);
    },
    showship() {
      this.shipshow = true;
    },

    showcollect() {
      this.collectshow = true;
    },

    showcount() {
      this.countshow = true;
    },
    overship() {
      this.shipshow = false;
    },
    overcollect() {
      this.collectshow = false;
    },
    overcount() {
      this.countshow = false;
    },

    changeship(index, value) {
      this.ship = value;
    },
    changecollect(index, value) {
      this.collect = value;
    },
    changecount(index, value) {
      this.count = value;
    },
    configship(value, index) {
      this.ship = value;
      this.shipshow = false;
    },
    configcollect(value, index) {
      this.collect = value;
      this.collectshow = false;
    },
    configcount(value, index) {
      this.count = value;
      this.countshow = false;
    },
  },
  computed: {},
};
</script>

<style lang="scss">
.flight-sticky {
  .van-sticky--fixed {
    width: 100%;
    top: 76px !important;
    background: #f1f1f1;
    padding: 4px 0;
    & > .flight-wrap {
      margin-left: 6px;
      width: calc(100% - 12px);
    }
    background: #f1f1f1;
  }
}
.flight-wrap {
  display: flex;
  overflow: hidden;
  .flight-item {
    border: 1px solid $theme-main-color;
    height: 30px;
    background: white;
    border-radius: 4px;
    font-size: 14px;
    line-height: 30px;
    text-indent: 5px;
    flex: 1;
    .button {
      display: flex;
      align-items: center;
      // justify-content: space-between;
      padding-right: 13px;

      width: 97px;
      span {
        // width: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
        font-size: 12px;
        padding-left: 5px;
      }
      i {
        text-align: right;
        width: 10px;
      }
    }
    &:nth-child(2) {
      margin: 0 10px;
    }
  }
}
.el-select-dropdown__item.selected {
  color: #237cc4 !important;
}
.el-select .el-input.is-focus .el-input__inner {
  border-color: #237cc4 !important;
}
.el-input__inner {
  padding-left: 3px;
}

.el-icon-arrow-up:before {
  content: '\e78f';
  color: #000;
}
.el-select {
  & > div {
    border-radius: 4px;
  }
}
li.el-select-dropdown__item {
  padding-left: 12px;
}
input.el-input__inner {
  padding: 13px;
}
</style>
