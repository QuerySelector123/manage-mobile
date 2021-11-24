<!--
 * @Author: DuShuai
 * @Date: 2021-10-15 09:26:53
 * @LastEditors: [Dushuai]
 * @LastEditTime: 2021-10-27 16:24:31
 * @Description: 水滴图 echarts
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
// 引入渐变属性
import { graphic } from 'echarts';

export default {
  name: 'superChart',

  // 接受的参数
  props: {
    radius: {
      type: String,
      default: () => {
        return '60%';
      },
    },
    data: {
      type: Object,
      require: true,
      default: () => {},
    },
    show: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    // 绑定的dom元素名称
    bindRefs: {
      type: String,
      default: 'symbolChart',
    },
    styles: {
      type: String,
      default: () => {
        return 'width: 100%; height: 100%';
      },
    },
    title: {
      type: String,
      default: () => {
        return '旅客满意度评分';
      },
    },
    value: {
      type: Number,
      default: () => {
        return 0.601;
      },
    },
    // 标题是否显示
    titleShow: {
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
    toprenvent: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
  },
  data() {
    return {
      myChart: null,
      option: {},
    };
  },
  methods: {
    /**
     * @Author: DuShuai
     * @description: this.$refs['chartDom'].startChart
     * @param {*}
     * @return {*}
     */
    startChart() {
      //   this.loading = true;
      if (this.$refs[this.bindRefs]) {
        this.myChart = this.$echarts.init(this.$refs[this.bindRefs]);
        this.option = {
          //水球图
          series: [
            {
              type: 'liquidFill',
              radius: this.radius,
              //   位置
              center: ['50%', '50%'],
              //   三个颜色
              color: ['#ecf3fe', '#c8dcfe', '#5594fa'],
              //   对应的值
              data: [this.value, this.value, this.value], // data个数代表波浪数
              // 波的振幅
              amplitude: 6,
              // 图形样式
              itemStyle: {
                opacity: 1, // 波浪的透明度
                shadowBlur: 0, // 波浪的阴影范围
              },
              //   背景样式
              backgroundStyle: {
                borderWidth: 2,
                borderColor: '#5B8FF9',
                color: '#fff',
              },
              label: {
                show: true,
                textStyle: {
                  // 当 水滴的value值小于显示的label的颜色的时候
                  color: '#6A99F9',
                  //  当水滴的value值 大于 显示的label 颜色的时候
                  insideColor: 'white',
                },
                // 对显示数值的修改
                formatter: (params) => {
                  if (this.toprenvent) {
                    return '{a|' + (params.value * 100).toFixed(1) + '}' + '{b|%}' + '\n' + '{c|' + this.title + '}';
                  } else {
                    return '{a|' + (params.value * 10).toFixed(1) + '}' + '\n' + '{c|' + this.title + '}';
                  }
                },
                rich: {
                  a: {
                    fontSize: this.fontSize.valuesize,
                    padding: [20, 0, 0, 0],
                    fontWeight: 400,
                  },
                  b: {
                    padding: [24, 0, 0, 4],
                    fontSize: 12,
                  },
                  c: {
                    align: 'center',
                    padding: [6, 0, 0, 0],

                    fontSize: 12,
                  },
                },
              },
              outline: {
                show: true,
                // 图形与边框的距离
                borderDistance: 8,
                itemStyle: {
                  borderColor: '#6A99F9',
                  borderType: 'dotted',
                  borderWidth: 2,
                },
              },
            },
          ],
          //   原生图形元素组件 支持 image, text, circle, sector, ring, polygon, polyline, rect, line, bezierCurve, arc, group,
          //   graphic: [
          //     {
          //       type: 'group',
          //       left: 'center',
          //       top: '60%',
          //       children: [
          //         {
          //           type: 'text',
          //           z: 100,
          //           left: 'center',
          //           style: {
          //             fill: '#fff',
          //             text: 'hhhhhh',
          //             font: '20px Microsoft YaHei',
          //           },
          //         },
          //       ],
          //     },
          //   ],
        };
        this.myChart.setOption(this.option);
      }

      // echarts 图 随着窗口的大小变化而变化
      window.addEventListener('resize', () => {});
    },

    /**
     * @name: assign gird 属性处理
     * @author: dushuai
     * @Date: 2021-09-17 11:18:43
     */
    assignGrid() {
      return Object.assign(
        {},
        {
          top: '15%',
          left: '2%',
          right: '2%',
          bottom: '15',
          containLabel: true,
        },
        this.grid
      );
    },

    /**
     * @name: 字体大小根据屏幕宽度自适应函数
     * @author:dushuai
     * @Date: 2021-09-17
     */
    adaptive() {
      if (document.body.clientWidth <= 1376) {
        this.legendSize = 10;
      } else {
        this.legendSize = 13;
      }
    },

    /**
     * @name: 销毁 echarts 图
     * @author: xulujin
     * @Date: 2021-08-17 11:17:45
     */
    destroyChart() {
      if (this.myChart) this.myChart.dispose();
    },
  },
  mounted() {
    this.adaptive();
  },
  destroyed() {
    if (this.myChart) this.myChart.dispose();
  },
};
</script>

<style lang="scss">
.superChart {
  .small {
    font-size: 10px;
  }
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
