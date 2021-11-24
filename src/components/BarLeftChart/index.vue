<!--
 * @Author: DuShuai
 * @Date: 2021-10-13 15:39:22
 * @LastEditTime: 2021-10-14 09:23:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \manage-mobile\src\components\BarLeftChart\index.vue
-->
<template>
  <div class="superChart" :style="styles">
    <div class="chart-wrap" v-if="show == true">
      <div :ref="bindRefs" style="width: 100%; height: 100%"></div>
    </div>
    <div class="no-data" v-else>暂无数据</div>
  </div>
</template>

<script>
import { graphic } from 'echarts';

export default {
  name: 'BarLeftChart',
  /**
   * @name: 只要修改的数据
   * @author: Dushuai
   * @Date: 2021-09-23 11:17:45
   * @title  标题
   * @value  输出的值
   * @max    仪表板 最大值
   */
  props: {
    show: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    // 外层div样式
    styles: {
      type: String,
      default: 'width:100%;height:100%',
    },
    bindRefs: {
      type: String,
      default: 'symbolicChart',
    },
    yAxisData: {
      type: Array,
    },
    date: {
      type: Array,
    },
    color: {
      type: Array,
      default: () => ['#7FC5FF'],
    },
    graphicList: {
      type: Array,
      default: () => ['#5A8CF6'],
    },
    distance: {
      type: Number,
      default: () => {
        return 0;
      },
    },
    barWidth: {
      type: Number,
      default: () => {
        return 14;
      },
    },
    barCategoryGap: {
      type: Number,
      default: () => {
        return 20;
      },
    },
    grid: Object,
  },
  mounted() {},
  data() {
    return {
      myChart: null,
      // echarts图配置
      option: {},
    };
  },
  methods: {
    /**
     * @name: 初始化 echarts
     * @author: Dushuai
     * @msg: 初始化 echarts 相关配置项参数，如初始设置的 tooltip, dataZoom, legend, 坐标轴 样式等，可按需要初始化
     * @example: 在父页面调用必须遵循该规范
     *       if (this.$refs['chartDom'])
              this.$refs['chartDom'].StartwChart
     *
     * @Date: 2021-08-17 11:25:14
     */
    //初始化echarts
    StartChart() {
      if (this.$refs[this.bindRefs]) {
        // var that = this;
        this.myChart = this.$echarts.init(this.$refs[this.bindRefs]);
        // console.log(this.$refs[this.bindRefs], this.myChart);
        (this.option = {
          tooltip: {
            trigger: 'axis',
            show: false,
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          legend: {
            show: false,
          },
          grid: this.assignGrid(),
          xAxis: [
            {
              splitLine: {
                show: false,
              },
              type: 'value',
              show: false,
            },
          ],
          yAxis: [
            {
              splitLine: {
                show: false,
              },
              axisLine: {
                //y轴
                show: false,
              },
              type: 'category',
              axisTick: {
                show: false,
              },
              inverse: true,
              data: this.yAxisData,
              axisLabel: {
                color: '#000000',
                fontSize: 14,
              },
            },
          ],
          series: [
            {
              name: '标准化',
              type: 'bar',
              // barCategoryGap: this.barCategoryGap,
              barWidth: this.barWidth, // 柱子宽度

              label: {
                show: true,
                position: 'right', // 位置
                color: '#383838',
                fontSize: 14,
                // distance: this.distance, // 距离
                // formatter: '{c}', // 这里是数据展示的时候显示的数据
              }, // 柱子上方的数值

              itemStyle: {
                barBorderRadius: [0, 20, 20, 0], // 圆角（左上、右上、右下、左下）
                // color: 'red',
                color: new graphic.LinearGradient(
                  1,
                  0,
                  0,
                  0,
                  [
                    {
                      offset: 0,
                      color: this.graphicList[0],
                    },
                    {
                      offset: 1,
                      color: this.color[0],
                    },
                  ],
                  false
                ),
              },
              data: this.date,
            },
          ],
        }),
          this.myChart.setOption(this.option);
        // echarts图随着窗口的大小变化而变化
        window.addEventListener('resize', () => {
          this.myChart.resize();
        });
      }
    },
    /**
     * @name: 销毁 echarts 图
     * @author: Dushuai
     * @Date: 2021-09-23 11:17:45
     */
    destroyChart() {
      if (this.myChart) this.myChart.dispose();
    },
    assignGrid() {
      return Object.assign(
        {},
        {
          top: '12%',
          right: '15%',
          bottom: '12%',
          left: '20%',
          // containLabel: true,
        },
        this.grid
      );
    },
  },
  destroyed() {
    if (this.myChart) this.myChart.dispose();
  },
};
</script>

<style lang="scss">
.superChart {
  float: left;
  position: relative;
  .chart-wrap {
    height: 100%;
    width: 100%;
    .title {
      width: 100%;
      height: 10%;
      padding: 0.5rem 0 1rem 0;
      text-align: center;
      font-weight: bold;
      color: #333;
      img {
        width: 1.5rem;
        padding-right: 0.4rem;
        transform: translateY(-0.1rem);
      }
      .name {
        /*padding: 0 0.4rem;*/
        font-size: 0.9rem;
        white-space: nowrap;
      }
    }
    .chart-wrap {
      & > div > div {
        height: 100% !important;
      }
    }
  }
  & > div {
    width: 100%;
    height: 100%;
    &.no-data {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
