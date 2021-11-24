<!--
 * @Author: xulujin
 * @Date: 2021-08-26 09:04:18
 * @LastEditTime: 2021-11-04 17:23:33
 * @Description: 物料齐套
-->
<template>
  <div style="heigth: 100%">
    <div class="cost">
      <DateNavbar :selectShow="[false, true, true]" @income="handmonth"></DateNavbar>
    </div>

    <ShipDropdown></ShipDropdown>
    <!-- 概览模块 -->
    <div class="cost-content-wrap profit-margin">
      <div class="general">
        <!-- 概论 -->
        <ContentBox toplefttitle="概览" :height="180">
          <template #content>
            <div class="select-content">
              <div class="item">
                <div class="item-value">88.88 <span>万元</span></div>
                <div class="item-title">标品成本</div>
              </div>
              <div class="item">
                <div class="item-value">8.21 <span>万元</span></div>
                <div class="item-title">非标品成本</div>
              </div>
              <div class="item">
                <div class="item-value">288 <span>元/人</span></div>
                <div class="item-title">单航次变动成本费用</div>
              </div>
              <div class="item">
                <div class="item-value">80 <span>%</span></div>
                <div class="item-title">保本点</div>
              </div>
            </div>
          </template>
        </ContentBox>
      </div>
      <!-- 成本 -->
      <div class="costbox profit-margin">
        <ContentBox toplefttitle="成本" toprighttitle="单位:万元">
          <template #content>
            <div class="costof">
              <SuperChart
                :show="ismonthShow"
                :tooltipdispatch="true"
                ref="lineBar_cost"
                styles="width:100%;height:100%"
                :color="['#5A8CF6 ', '#FF8100 ']"
                :fontColor="['#B71F20', '#111']"
                :lineStyle="{ width: 3 }"
                barWidth="20"
                :yAxisIndexArr="[0, 0, 1]"
                :yAxisLabelShowArr="[true, false]"
                :data="data_cost"
              ></SuperChart>
            </div>
          </template>
        </ContentBox>
      </div>
      <!-- 占比 -->
      <div class="el-radioBox profit-margin" style="text-align: center">
        <ContentBox toplefttitle="占比" toprighttitle="单位:万元">
          <template #content>
            <!-- <div > -->
            <!-- <el-radio-group v-model="radio" @change="changestandard" style="padding-top: 7px">
              <el-radio :label="'standard'">成本标本</el-radio>
              <el-radio :label="'Nostandard'">非成本标本</el-radio>
            </el-radio-group>
            <div class="CirCleecharts" v-if="radio === 'standard'">
              <CirclePieChart ref="ciclePie" styles="height:100%;width: 100%;" :data="circlePieData" roseType="radius" :radius="[22, 70]" />
            </div>
            <div class="CirCleecharts" v-if="radio === 'Nostandard'">
              <CirclePieChart ref="circlePieDataToDo" styles="height:100%;width: 100%;" :data="circlePieDataTo" roseType="radius" :radius="[22, 70]" />
            </div> -->
            <!-- </div> -->
            <!-- fixed start -->
            <div class="sign-type-box">
              <div class="sign-radio">
                <el-radio-group v-model="radio" @change="changestandard" style="padding-top: 7px">
                  <el-radio :label="'standard'">成本标本</el-radio>
                  <el-radio :label="'Nostandard'">非成本标本</el-radio>
                </el-radio-group>
              </div>
              <div class="sign-type" v-if="preventShow">
                <div class="sign-left">
                  <div class="sign-echarts">
                    <span>{{ ((value / total) * 100).toFixed(2) }} <em>%</em></span>
                    <div
                      ref="singChart"
                      class="type-chart"
                      @touchend="
                        (e) => {
                          touchEnd(e, 'pieChart');
                        }
                      "
                    ></div>
                  </div>
                </div>
                <div class="sign-right">
                  <div
                    v-for="(item, index) in proportionDate"
                    v-on:click="pieClick(index, item.name, proportionDate.length)"
                    :key="index"
                    :class="index === select ? 'selected' : ''"
                  >
                    <span></span>
                    <span class="sign-right-name">{{ item.name }}</span>
                    <!-- <span class="sign-right-value">{{ item.value }}</span> -->
                    <span>{{ item.value }}</span>
                  </div>
                </div>
              </div>
              <div class="no-data sign-type" v-else>暂无数据</div>
            </div>
            <!-- fixed end -->
          </template>
        </ContentBox>
      </div>
      <!-- 人工模块 -->
      <div class="profit-margin">
        <ContentBox toplefttitle="人工" toprighttitle="单位:万元">
          <template #content>
            <div class="costof">
              <SuperChart
                :show="ismonthShow"
                ref="artificial"
                styles="width:100%;height:100%"
                :color="['#b9b9f5']"
                :fontColor="['#B71F20']"
                :lineStyle="{ width: 3 }"
                :yAxisLabelShowArr="[true, false]"
                :data="artificial"
              ></SuperChart>
            </div>
          </template>
        </ContentBox>
      </div>
      <!-- 燃油模块 -->
      <div class="profit-margin">
        <ContentBox toplefttitle="燃油" toprighttitle="单位:万元">
          <template #content>
            <div class="costof">
              <SuperChart
                :show="ismonthShow"
                ref="fuel"
                styles="width:100%;height:100%"
                :color="['#79baff']"
                :fontColor="['#B71F20', '#111']"
                :lineStyle="{ width: 3 }"
                :yAxisLabelShowArr="[true, false]"
                :data="fuel"
              ></SuperChart>
            </div>
          </template>
        </ContentBox>
      </div>

      <!-- 维修模块 -->
      <div class="profit-margin">
        <ContentBox toplefttitle="维修" toprighttitle="单位:万元">
          <template #content>
            <div class="costof">
              <SuperChart
                :show="ismonthShow"
                ref="maintenance"
                styles="width:100%;height:100%"
                :color="['#b9b9f5']"
                :fontColor="['#B71F20', '#111']"
                :lineStyle="{ width: 3 }"
                :yAxisLabelShowArr="[true, false]"
                :data="maintenance"
              ></SuperChart>
            </div>
          </template>
        </ContentBox>
      </div>

      <!-- 物料模块 -->
      <div class="profit-margin">
        <ContentBox toplefttitle="物料" toprighttitle="单位:万元">
          <template #content>
            <div class="costof">
              <SuperChart
                :show="ismonthShow"
                ref="material"
                styles="width:100%;height:100%"
                :color="['#79baff']"
                :fontColor="['#B71F20', '#111']"
                :lineStyle="{ width: 3 }"
                :yAxisLabelShowArr="[true, false]"
                :data="material"
                :xAxisData2="xAxisData2"
              ></SuperChart>
            </div>
          </template>
        </ContentBox>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'materialSet',
  components: {},
  data() {
    return {
      /*   fixed start*/
      preventShow: false,
      singChart: null,
      selectPrevent: '100.00',
      select: 0,
      total: 0,
      value: 0,
      selectList: [],
      dataIndex: 0,
      sumAmount: 0,
      sumAmount1: 0,
      sumCount: 0,
      /* fixed end */
      ismonthShow: true,
      yearlist: [2017, 2018, 2019, 2020, 2021],
      radio: 'standard',
      monthshow: false,
      yearshow: false,
      xAxisData2: [10, 30, 59],
      constList: [
        {
          name: '标品成本',
          index: 0,
          disable: true,
        },
        {
          name: '非标品成本',
          index: 1,
          disable: true,
        },
      ],
      colorlist: ['#ffaf00', '#ff9c00', '#8485ef', '#a8c9ff', '#d9d9d9', '#fed38f'],
      productIndex: 1,
      Id: 100,
      pickshow: false,
      minDate: new Date(2016, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),

      times: [
        { id: 99, value: '月' },
        { id: 100, value: '年' },
      ],
      data_dj: {
        xAxisData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        series: [
          {
            name: '',
            type: 'bar',
            unit: 'null',
            stack: '憨憨',
            labelShow: false,
            showlabel: false,
            data: [100, 220, 330, 440, 100, 100, 220, 330, 440, 100, 2000, 222],
          },
          // {
          //   name: '',
          //   type: 'bar',
          //   unit: '亿',
          //   stack: '憨憨',
          //   showlabel: false,

          //   data: [10, 220, 330, 440, 100, 100, 220, 330, 440, 100,111,111],
          // },
        ],
      },
      data_cost: {
        xAxisData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 45],
        series: [
          {
            name: '标本成本',
            type: 'bar',
            unit: 'null',
            stack: 'cost',
            showlabel: false,
            // barCategoryGap: '10',
            gradientRamp: ['#5A8CF6'],
            data: [10000, 12000, 10000, 13000, 14000, 15000, 16000, 17000, 1000, 3000, 100, null, 0, null],
          },
          {
            name: '非标本成本',
            type: 'bar',
            unit: 'null',
            stack: 'cost',
            showlabel: false,
            // barCategoryGap: '10',
            gradientRamp: ['#FFB54E'],
            borderRadius: [2, 2, 0, 0],
            data: [10000, 12000, 10000, 13000, 14000, 15000, 16000, 17000, 3783, 4850, 3485, null, null, 0],
          },
        ],
      },

      // 人工
      artificial: {
        xAxisData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        series: [
          {
            name: '',
            type: 'bar',
            unit: 'null',
            stack: 'cost',
            showlabel: false,
            gradientRamp: ['#8585F1'],
            borderRadius: [5, 5, 0, 0],
            data: [10000, 12000, 10000, 13000, 14000, 15000, 16000, 17000, 18000, 13000, 14000, 12000],
          },
        ],
      },
      // 燃油
      fuel: {
        xAxisData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        series: [
          {
            name: '',
            type: 'bar',
            unit: 'null',
            stack: 'cost',
            showlabel: false,
            gradientRamp: ['#5A8AFF'],
            borderRadius: [5, 5, 0, 0],
            data: [10000, 12000, 10000, 13000, 14000, 15000, 16000, 17000, 18000, 13000, 14000, 12000],
          },
        ],
      },
      // 维修
      maintenance: {
        xAxisData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        series: [
          {
            name: '',
            type: 'bar',
            unit: 'null',
            stack: 'cost',
            showlabel: false,
            gradientRamp: ['#8585F1'],
            borderRadius: [5, 5, 0, 0],
            data: [10000, 12000, 10000, 13000, 14000, 15000, 16000, 17000, 18000, 13000, 14000, 12000, 0, 0, 0],
          },
        ],
      },
      // 物料
      material: {
        xAxisData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        series: [
          {
            name: '',
            type: 'bar',
            unit: 'null',
            stack: 'cost',
            showlabel: false,
            gradientRamp: ['#5A8AFF'],
            borderRadius: [5, 5, 0, 0],
            data: [10000, 12000, 10000, 13000, 14000, 15000, 16000, 17000, 18000, 13000, 14000, 12000, 0, 0, 0],
          },
        ],
      },
      // 占比饼图
      circlePieData: [{ value: 0, name: '视频广告' }],
      // 占比饼图

      circlePieDataTo: [
        { value: 1048, name: '搜索引擎' },
        { value: 735, name: '直接访问' },
        { value: 580, name: '邮件营销' },
        { value: 484, name: '联盟广告' },
        { value: 300, name: '视频广告' },
        { value: 300, name: '视频广告' },
        { value: 3500, name: '视频广告' },
        { value: 3040, name: '视频广告' },
        { value: 3030, name: '视频广告' },
      ],
      /* fixed  start */
      proportionDate: [
        { value: 1048, name: '搜索引擎1' },
        { value: 735, name: '直接访问2' },
        { value: 580, name: '邮件营销3' },
        { value: 484, name: '联盟广告4' },
        { value: 300, name: '视频广告5' },
        { value: 300, name: '视频广告6' },
        { value: 3500, name: '视频广告7' },
        { value: 3040, name: '视频广告8' },
        { value: 3030, name: '视频广告9' },
        { value: 3040, name: '视频广告10' },
        { value: 3030, name: '视频广告11' },
      ],
      /* fixed  end */
    };
  },
  created() {},
  mounted() {
    this.startChart();
    /* fixed start */
    // 各个模块调用的函数模块
    this.singChart = this.$echarts.init(this.$refs.singChart);
    this.getproportionDate();

    /* fixed end */
  },
  methods: {
    /* fixed start */
    setSingChart(data) {
      let option = {
        // color:['#FFCC81','#FFB000','#FF9800','#8681F9','#9EC9FF','#D9D9D9'],
        // title: {
        //   text: '占比',
        //   left: '50%',
        //   bottom: '10%',
        //   textStyle: {
        //     fontSize: 16,
        //   },
        // subtext: this.selectPrevent,
        // subtextStyle: {
        //   color: '#FE7400',
        //   fontWeight: 600,
        //   fontSize: 14,
        // },
        //   textAlign: 'center',
        // },
        animationDuration: 300,
        series: [
          {
            minAngle: 10,
            selectedMode: 'single',
            selectedOffset: 5,
            // left: '-60%',
            minAngle: 15,
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '50%'],
            hoverAnimation: false,
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1,
            },

            labelLine: {
              show: false,
            },
            data: data,
          },
        ],
      };
      this.singChart.setOption(option);
      this.singChart.on('click', (arg) => {
        this.value = arg.data.value;
        for (let i = 0; i < data.length; i++) {
          this.singChart.dispatchAction({
            type: 'pieUnSelect',
            seriesIndex: [0, 2],
            dataIndex: i,
          });
        }
        this.singChart.dispatchAction({
          type: 'pieSelect',
          seriesIndex: 0,
          dataIndex: arg.dataIndex,
        });

        data.forEach((item, index) => {
          if (arg.name === item.name) {
            this.select === index ? (this.select = '') : (this.select = index);
          }
        });
      });
      this.singChart.dispatchAction({
        type: 'pieSelect',
        seriesIndex: 0,
        dataIndex: 0,
      });
      this.select = 0;
    },
    // 抬起手指，移除echarts的选中效果
    touchEnd(e, chartName) {
      let chart = this[chartName];
      if (chart) {
        // 取消高亮
        // chart.dispatchAction({ type: 'downplay' });
        // 关闭tooltip
        // chart.dispatchAction({ type: 'hideTip' });
        // chart.dispatchAction({ type: 'updateAxisPointer', currTrigger: 'leave' });
      }
    },
    getproportionDate() {
      // 这里做数据处理
      let total = 0;
      this.proportionDate.forEach((item) => {
        total += Number(item.value);
      });
      this.total = total;
      this.value = this.proportionDate[0].value;

      this.setSingChart(this.proportionDate);
    },
    pieClick(index, name, length) {
      // 点击右侧 select 样式激活
      this.select = index;

      for (let i = 0; i < length; i++) {
        this.singChart.dispatchAction({
          type: 'pieUnSelect',
          seriesIndex: [0, 2],
          dataIndex: i,
        });
      }
      this.value = this.proportionDate.filter((item) => item.name == name)[0].value;
      this.singChart.dispatchAction({
        type: 'pieSelect',
        seriesIndex: 0,
        dataIndex: index,
      });
    },
    /* fixed end */

    handmonth(value) {
      this.ismonthShow = value;
    },
    // 封装各个模块的图标调用函数
    startChart() {
      this.$nextTick(() => {
        this.$refs['lineBar_cost']?.drawChart();
        this.$refs['artificial']?.drawChart();
        this.$refs['fuel']?.drawChart();
        this.$refs['maintenance']?.drawChart();
        this.$refs['material']?.drawChart();
        this.$refs['ciclePie']?.drawChart();
        this.$refs['circlePieDataToDo']?.drawChart();
      });
    },

    // 年份
    yearConfirm(value, index) {
      this.yearshow = false;
      console.log('选择的年份是', value);
      this.startChart();
    },
    // 月份
    yearCancel(value, index) {
      this.yearshow = false;
      this.startChart();
    },

    handTime(id) {
      this.Id = id;
      if (this.Id === 99) {
        this.monthshow = true;
      } else if (this.Id === 100) {
        this.yearshow = true;
      }
    },
    // 月份 年份
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      }
      return val;
    },

    confirm(value) {
      console.log('选择的年份与月份', value);
      this.monthshow = false;
      this.currentDate = value;
    },

    yearChange(value, index) {
      console.log('选择的年份正在改变', value);
    },
    // 成本切换 &&  非成本切换
    changestandard(value) {
      this.$nextTick(() => {
        this.$refs['ciclePie']?.drawChart();
        this.$refs['circlePieDataToDo']?.drawChart();
      });
    },
    cancel() {
      this.monthshow = false;
    },
  },
  computed: {
    watch() {},
  },
  watch: {},
};
</script>

<style lang="scss">
/* fixed start */
.sign-type-box {
  overflow: hidden;
  .no-data {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .sign-radio {
    height: 30px;
  }
  .sign-type {
    margin-bottom: 20px;

    .sign-right {
      padding-left: 5px;
      overflow-y: scroll;
      padding-top: 5px;
      // position: relative;
      // top: 0;
      & > div {
        position: relative;
        margin-right: 10px;
        background-color: white;
        height: 24px;
        line-height: 24px;
        display: flex;
        align-items: center;
        border-radius: 4px;
        margin-bottom: 5px;
        & > span {
          &:nth-child(1) {
            margin: 0 8px;
            background: blueviolet;
            width: 8px;
            height: 11px;
            // border-radius: 50%;
          }
          &:nth-child(2) {
            flex: 1;
            text-align: left;
            margin-right: 8px;
          }
          &:nth-child(3) {
            width: 40px;
            margin-right: 8px;
          }
        }
      }
      transition: all 0.5 linear;

      .selected {
        // top: 100px;
        // position: absolute;
        // transform: scale(1.2);
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }
    }
    .sign-left {
      .sign-echarts {
        position: relative;
        span {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-size: 15px;
          em {
            font-style: normal;
            font-size: 8px;
          }
        }
        height: 100%;
        & > div {
          height: 100%;
        }
      }
    }
  }
  .sign-type {
    height: 200px;
    display: flex;
    & > div {
      flex: 1;
    }
  }
}
/* fixed end */
.CirCleecharts {
  height: 248px;
  padding-top: 10px;
}
.costof {
  height: 257px;
}
.profit-margin {
  margin-top: 8px;
}
.cost {
  height: 100%;
  & > .general {
    height: 208px;
    position: relative;
    margin-top: 8px;
    .border {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 75px;
      opacity: 0.5;
      border-right: 1px solid #979797;
      transform: translate(-50%, -50%);
    }
  }
  .time-box {
    // padding: 0px 10px;
    .time-picker {
      font-size: 14px;
      margin-bottom: 6px;
      display: flex;
      border: 1px solid #237cc4;
      border-radius: 4px;
      & > div {
        background: white;
        flex: 1;
        height: 30px;
        line-height: 30px;
        text-align: center;
      }
      .activetime {
        background: #237cc4;
        color: white;
      }
    }
  }
  .cost-content-wrap {
    height: 91%;
    overflow: auto;
  }
  :deep(.el-radio-group) {
    padding-top: 7px;
  }
}
</style>
