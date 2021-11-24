<template>
  <div class="performance">
    <div class="time-box">
      <div class="time-picker">
        <div v-show="selectShow[index]" :class="{ activetime: item.id === Id }" v-for="(item, index) in times" @click="handTime(item.id)" :key="item.id">
          <span> {{ item.value }} </span>
        </div>
      </div>
    </div>
    <!-- 预售 -->
    <Resultsbooking v-show="Id == 99"> </Resultsbooking>
    <Resultscalendar v-if="Id == 98"></Resultscalendar>
    <!-- 业绩 -->
  </div>
</template>

<script>
import Resultsbooking from './Resultsbooking';
import Resultscalendar from './Resultscalendar';
export default {
  components: {
    Resultscalendar,
    Resultsbooking,
  },
  name: 'DateNavber',
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
      Id: 99,

      date: '',
      show: false,

      times: [
        { id: 98, value: '业绩' },
        { id: 99, value: '预售' },
      ],
    };
  },
  methods: {
    //  formatDate(date) {
    //   return `${date.getMonth() + 1}/${date.getDate()}`;
    // },
    // onConfirm(date) {
    //   const [start, end] = date;
    //   this.show = false;
    //   this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
    // },
    handTime(id) {
      this.Id = id;
      if (this.Id === 99) {
        // this.monthshow = true;
        // this.$router.push('/home/overview')
        //   this.$emit('income', false);
        // } else if (this.Id === 100) {
        //   this.yearshow = true;
        //   this.$emit('income', true);
        // } else if (this.Id === 98) {
        //   this.dayshow = true;
      }
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
.performance {
  height: 100%;
  overflow: auto;
  background: #f7f6f6;

  .time-box {
    background: #fff;
    height: 42px;
    padding: 5px 10px;
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
      span {
        // margin-left: -110px;
        font-size: 16px;
      }
    }
  }
}
</style>
