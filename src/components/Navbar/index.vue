<!--
 * @Author: DuShuai
 * @Date: 2021-10-28 09:55:28
 * @LastEditors: [Dushuai]
 * @LastEditTime: 2021-11-01 17:09:44
 * @Description: 
-->
<template>
  <div class="navbar" id="navbar" ref="navbar" :class="{ stickyActive: this.$store.state.general.pullShow }">
    <van-sticky class="flight-date" @scroll="scrolltop">
      <div class="nav-box">
        <!-- date -->
        <div class="time-box">
          <div class="time-picker">
            <div v-show="selectShow[index]" :class="{ activetime: item.id === Id }" v-for="(item, index) in times" @click="handTime(item.id)" :key="item.id">
              {{ item.value }}
            </div>
          </div>
        </div>
        <!-- filght -->
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
      </div>
      <!-- 弹窗 -->
    </van-sticky>

    <!-- 选择年份 -->
    <van-popup position="bottom" v-model="yearshow" @click-overlay="overlay">
      <van-picker title="选择年份" show-toolbar :columns="yearlist" @confirm="yearConfirm" @cancel="yearCancel" @change="yearChange" />
    </van-popup>
    <!-- 选择 年与 月 -->

    <van-popup position="bottom" v-model="monthshow" @click-overlay="overlay">
      <van-datetime-picker
        @confirm="monthConfirm"
        @cancel="monthCancel"
        v-model="currentDate"
        type="year-month"
        title="选择年月"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formattermonth"
      />
    </van-popup>

    <!-- 选择 月 与 日 -->
    <van-popup position="bottom" v-model="dayshow" @click-overlay="overlay">
      <van-datetime-picker
        @confirm="dayConfirm"
        @cancel="dayCancel"
        v-model="currentDate"
        type="month-day"
        title="选择月日"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatterday"
      />
    </van-popup>
  </div>
</template>

<script>
import { Sticky as vanSticky } from 'vant';
export default {
  name: 'navbar',
  props: {
    title: {
      type: String,
    },
    selectShow: {
      type: Array,
      default: () => {
        return [true, true, true];
      },
    },
  },
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
      Id: 100,
      yearlist: [2017, 2018, 2019, 2020, 2021],
      monthshow: false,
      yearshow: false,
      dayshow: false,

      //   时间段
      minDate: new Date(2016, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      times: [
        { id: 98, value: '日' },
        { id: 99, value: '月' },
        { id: 100, value: '年' },
      ],
    };
  },
  components: {
    vanSticky,
  },
  methods: {
    scrolltop(value) {
      console.log(value);
    },
    //监听滚动
    handleScroll() {
      // 得到页面滚动的距离
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      console.log('距离上方控件的位置', this.offsetTop);
      console.log('控件自身的高度', this.offsetHeight);
      console.log('页面卷入的高度', scrollTop);
      // 判断页面滚动的距离是否大于吸顶元素的位置
      this.headerFixed = scrollTop > this.offsetTop - this.offsetHeight;
    },

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
    handTime(id) {
      this.Id = id;
      if (this.Id === 99) {
        this.monthshow = true;
        this.$emit('income', false);
      } else if (this.Id === 100) {
        this.yearshow = true;
        this.$emit('income', true);
      } else if (this.Id === 98) {
        this.dayshow = true;
      }
    },
    // 遮罩层触发
    overlay() {},
    yearConfirm(value, index) {
      this.yearshow = false;
      console.log('选择的年份是', value);
    },

    monthConfirm(value) {
      this.monthshow = false;
      let month = this.$format(value, 'yyyy-MM');
    },

    dayConfirm(value) {
      this.dayshow = false;
      let day = this.$format(value, 'MM');

      console.log(value, day);
    },
    dayCancel() {
      this.dayshow = false;
    },
    yearCancel(value, index) {
      this.yearshow = false;
    },

    monthCancel(value, index) {
      this.monthshow = false;
    },

    yearChange(value, index) {
      console.log('选择的年份正在改变', value);
    },

    formattermonth(type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      }
      return val;
    },

    formatterday(type, val) {
      if (type === 'month') {
        return `${val}月`;
      } else if (type === 'day') {
        return `${val}日`;
      }
      return val;
    },
  },
  mounted() {
    window.addEventListener('touchmove', (e) => {
      // console.log('开始触发 下拉 ');
      // let header = document.getElementsByClassName('flight-date')[0];
      // // 这里要得到top的距离和元素自身的高度
      // this.offsetTop = header.offsetTop;
      // this.offsetHeight = header.offsetHeight;
      console.log(e.path);
      // this.scrollTop = tableScorll .scrollTop;
    });
    // window.addEventListener('touchend', () => {
    //   console.log('结束触发');
    //   // this.scrollTop = tableScorll .scrollTop;
    // });
    // window.addEventListener('scroll', this.handleScroll);
    // this.$nextTick(function () {
    //   // 这里fixedHeaderRoot是吸顶元素的ID
    //   let header = document.getElementById('navbar');
    //   // 这里要得到top的距离和元素自身的高度
    //   this.offsetTop = header.offsetTop;
    //   this.offsetHeight = header.offsetHeight;
    // });
    // window.addEventListener('scroll', this.getScroll);
    // console.log(this.selectShow);
    // if ((this.title == '收入') | (this.title == '成本')) {
    //   this.times.splice(0, 1);
    // }
  },
  destroyed() {
    //在destroyed钩子中移除监听
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style lang="scss">
.flight-date {
  background: hsl(0, 0%, 95%);
  padding-top: 66px;
  /deep/.van-sticky {
    position: fixed;
    top: 40px;
    right: 0;
    left: 0;
    z-index: 999;
    background: #f1f1f1;
    padding: 6px 0;
    & > .nav-box {
      margin-left: 6px;
      width: calc(100% - 12px);
      height: 68px;
    }
    .van-sticky--fixed {
      top: 0 !important;
    }
  }

  // .van-sticky--fixed {
  //   width: 100%;
  //   // top: 40px !important;
  //   background: #f1f1f1;
  //   padding: 6px 0;

  //   // & > .flight-wrap {
  //   //   margin-left: 6px;
  //   //   width: calc(100% - 12px);
  //   // }
  //   // background: #f1f1f1;
  // }
}
.stickyActive .van-sticky {
  top: 0px !important;
}
.nav-box {
  background: #f1f1f1;
}
.navbar {
  //   position: sticky;
  //   top: 0px;
  //   left: 0;
}
.time-box {
  .time-picker {
    font-size: 14px;
    margin-bottom: 6px;
    display: flex;
    border: 1px solid #237cc4;
    border-radius: 4px;
    overflow: hidden;
    & > div {
      background: white;
      flex: 1;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-right: 1px solid #237cc4;
    }
    & > div:last-of-type {
      border: none;
    }
    .activetime {
      background: #237cc4;
      color: white;
    }
  }
}
// .flight-sticky {
//   .van-sticky--fixed {
//     width: 100%;
//     top: 76px !important;
//     background: #f1f1f1;
//     padding: 4px 0;
//     & > .flight-wrap {
//       margin-left: 6px;
//       width: calc(100% - 12px);
//     }
//     background: #f1f1f1;
//   }
// }
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
