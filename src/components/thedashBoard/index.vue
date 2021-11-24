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
  name: 'thedashEchart',
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
    fontSize: {
      type: Object,
      default: () => {
        return {
          titlesize: 12,
          valuesize: 28,
        };
      },
    },
    // 渐变设置 默认不用添加
    itemLinearGradientConfig: {
      type: Array,
      default: () => [0, 0, 1, 0],
    },
    // 默认颜色
    color: {
      type: String,
      default: () => {
        return '#ffd049';
      },
    },
    // max 最大值得设置
    max: {
      type: Number,
      default: () => {
        return 150;
      },
    },
    // 渐变颜色
    gradientRamp: {
      type: String,
      default: () => {
        return '#ff8100';
      },
    },
    // value 值
    value: {
      type: Number,
      default: () => {
        return 120;
      },
    },
    // 刻度值显示
    axisLabelShow: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    // 刻度显示
    axisTickShow: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    // 分割线是否显示
    splitLineShow: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    // 标题是否显示
    titleShow: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    // 分割线与轴线的距离
    distance: {
      type: Number,
      default: () => {
        return -25;
      },
    },
    // 分割线的长度
    length: {
      type: Number,
      default: () => {
        return 5;
      },
    },
    // 分割线的数量
    splitNumber: {
      type: Number,
      default: () => {
        return 12;
      },
    },
    // 分割线的颜色
    splitColor: {
      type: String,
      default: () => {
        return '#e6ebf8';
      },
    },
    // 标题
    title: {
      type: String,
      default: () => {
        return '本年目标完成率';
      },
    },
    width: {
      type: Number,
      default: () => {
        return 16;
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
  },
  mounted() {
    this.StartChart();
    window.addEventListener('resize', () => {
      this.timer = setTimeout(() => {
        this.myChart.resize();
      }, 300);
    });
    // window.onresize = () => {
    //   this.timer = setTimeout(() => {
    //     this.myChart.resize();
    //   }, 300);
    // };
  },
  data() {
    return {
      timer: null,
      hhh: false,
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
      this.hhh = true;
      if (this.$refs[this.bindRefs]) {
        this.myChart = this.$echarts.init(this.$refs[this.bindRefs]);
        this.option = {
          series: [
            {
              type: 'gauge',
              // 内容区
              progress: {
                show: true,
                width: this.width,
                // 内容区 两端是否显示成圆形
                roundCap: true,
                itemStyle: {
                  color: new graphic.LinearGradient(...this.itemLinearGradientConfig, [
                    {
                      offset: 0,
                      color: this.color, // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: this.gradientRamp, // 100% 处的颜色
                    },
                  ]),
                },
              },
              radius: '90%',
              // 最大值
              max: this.max,
              splitNumber: this.splitNumber,
              axisLine: {
                //  是否两端显示成圆形
                roundCap: true,
                lineStyle: {
                  width: this.width,
                },
              },
              axisTick: {
                show: this.axisTickShow,
              },
              splitLine: {
                show: this.splitLineShow,
                distance: this.distance,
                length: this.length,
                lineStyle: {
                  color: this.splitColor,
                },
              },
              // 仪表盘指针
              pointer: {
                show: false,
              },
              // 表盘上的 刻度值
              axisLabel: {
                fontSize: 12,
                show: this.axisLabelShow,
              },
              anchor: {
                show: false,
              },
              title: {
                show: this.titleShow,
                offsetCenter: [0, '25%'],
                fontSize: this.fontSize.titlesize,
              },
              detail: {
                valueAnimation: false,
                fontSize: this.fontSize.valuesize,
                offsetCenter: [0, '-15%'],

                fontWeight: '600',
                formatter: function (value) {
                  return '{a|' + value.toFixed(2) + '}' + '{b|%}';
                },
                rich: {
                  a: {
                    color: this.gradientRamp,
                    fontSize: this.fontSize.valuesize,
                    // fontSize: this.fontSize.valuesize,
                    // padding: [20, 0, 0, 0],
                    padding: [20, 0, 0, 0],
                    fontWeight: 400,
                  },
                  b: {
                    color: this.gradientRamp,
                    padding: [24, 0, 0, 4],
                    fontSize: 12,
                  },
                },
              },
              data: [
                {
                  value: this.value,
                  name: this.title,
                },
              ],
            },
          ],
        };

        this.myChart.setOption(this.option);
        // echarts图随着窗口的大小变化而变化
        window.addEventListener('resize', () => {
          this.myChart.resize();
        });
      }
    },
    handsize() {
      // console.log('监听开始变化', this.myChart);
      // this.hhh = true;
      if (this.myChart) this.myChart.resize();
      // if (this.myChart) this.myChart.clear();
      // this.StartChart();
    },
    /**
     * @name: 销毁 echarts 图
     * @author: Dushuai
     * @Date: 2021-09-23 11:17:45
     */
    destroyChart() {
      if (this.myChart) this.myChart.dispose();
    },
  },
  destroyed() {
    clearTimeout(this.timer);
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
    // & > div {
    //   height: 100%;
    // }
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
