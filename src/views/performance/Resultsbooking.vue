<!--
 * @Author: DuShuai
 * @Date: 2021-10-14 11:38:36
 * @LastEditors: [Dushuai]
 * @LastEditTime: 2021-10-16 14:53:19
 * @Description: 
-->
<template>
  <div class="resuilsbookin">
    <div class="calendar">
      <img src="../../assets/img/rli.png" alt="" srcset="" @click="show = true" />
      <!-- <img src="" alt=""> -->
    </div>
    <!-- <van-cell title="选择日期区间" /> -->
    <van-calendar v-model="show" type="range" @confirm="onConfirm" />
    <div class="mb mt">
      <ContentBox toplefttitle="客户构成">
        <template #content>
          <div class="clientele-flex">
            <div class="clientele-item">
              <CirclePieChart
                ref="ciclePiefirst"
                :lengendShow="true"
                :center="center"
                styles="height:100%;width: 100%;"
                :twoEchartLabelShow="true"
                :data="circlePieData"
                :color="colorlist"
                :radius="[30, 45]"
                :labeLpadding="labelpadding"
              />
            </div>
            <div class="clientele-item">
              <CirclePieChart
                ref="ciclePiesecond"
                :twoEchartLabelShow="true"
                :lengendShow="true"
                :center="center"
                :color="colorlist"
                styles="height:100%;width: 100%;"
                :data="circlePieData"
                :radius="[30, 45]"
                :labeLpadding="labelpadding"
              />
            </div>
          </div>
        </template>
      </ContentBox>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      center: ['50%', '30%'],
      labelpadding: [0, -20, 24, -20],

      colorlist: ['#5888FF', '#FFA740', '#8E8EF1'],
      circlePieData: [
        { name: '未能识别', value: 40 },
        { name: '男性', value: 55 },
        { name: '女性', value: 5 },
      ],
    };
  },
  created() {
    // alert("1")
  },
  methods: {
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      const [start, end] = date;
      this.show = false;
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs['ciclePiefirst'].drawChart();
      this.$refs['ciclePiesecond'].drawChart();
    });
  },
};
</script>

<style lang="scss" scoped>
.resuilsbookin {
  .clientele-flex {
    height: 239px;
    display: flex;
    .clientele-item {
      flex: 1;
    }
  }
  padding: 0 10px;
  .calendar {
    height: 25px;
    background: #1080ca;
    text-align: right;
    img {
      width: 22px;
      margin-right: 10px;
    }
  }
}
</style>
