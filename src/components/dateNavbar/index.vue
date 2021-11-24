<template>
  <div class="datenavbar">
    <!-- <van-sticky :offset-top="40" class="flight-date"> -->
    <div class="time-box">
      <div class="time-picker">
        <div v-show="selectShow[index]" :class="{ activetime: item.id === Id }" v-for="(item, index) in times" @click="handTime(item.id)" :key="item.id">
          {{ item.value }}
        </div>
      </div>
    </div>
    <!-- </van-sticky> -->
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
// import { Sticky as vanSticky } from 'vant';

export default {
  name: 'DateNavber',
  components: {
    // vanSticky,
  },
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
  methods: {
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
    // console.log(this.selectShow);
    // if ((this.title == '收入') | (this.title == '成本')) {
    //   this.times.splice(0, 1);
    // }
  },
};
</script>

<style lang="scss">
// .datenavbar {
//   .flight-date {
//     .van-sticky--fixed {
//       width: 100%;
//       top: 40px !important;
//       background: #f1f1f1;
//       padding-top: 4px;
//       & > .time-box {
//         margin-left: 6px;
//         width: calc(100% - 12px);
//       }
//       background: #f1f1f1;
//     }
//   }
// }
.time-box {
  .time-picker {
    font-size: 14px;
    // margin-bottom: 6px;
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
</style>
