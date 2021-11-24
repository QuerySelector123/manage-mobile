<!--
 * @Author: xulujin
 * @Date: 2021-08-26 14:26:02
 * @LastEditTime: 2021-10-16 14:51:05
 * @Description: 圆环饼图
-->

<template>
  <div class="circlePieChart" :style="styles">
    <div class="chart-wrap" v-if="show == true">
      <div :ref="bindRefs" style="width: 100%; height: 100%"></div>
    </div>
    <div class="no-data" v-else><a>暂无数据</a></div>
  </div>
</template>

<script>
import { graphic } from 'echarts';
export default {
  name: 'circlePieChart',
  components: {},
  props: {
    // 绑定的dom元素名称
    bindRefs: {
      type: String,
      default: 'circlePieChart',
    },

    data: {
      type: Array,
      required: true,
      default: () => [],
    },

    // 外层div样式
    styles: {
      type: String,
      default: 'width:100%;height:100%',
    },

    legendShow: {
      type: Boolean,
      default: () => false,
    },

    pieLabelShow: {
      type: Boolean,
      default: () => true,
    },

    // chart 显示状态
    show: {
      type: Boolean,
      default: true,
    },
    /* fixed start */
    lengendShow: {
      type: Boolean,
      default: false,
    },
    /* fixed end */

    color: {
      type: Array,
      default: () => ['#5581F0', '#B7D5FF', '#a5c3ff', '#c4d3f7', '#b995f9', '#a4a4f3', '#b9b9f4', '#ffa23c', '#ffc26e', '#ffd3a8', '#ffe270'],
    },
    graphicList: {
      type: Array,
      default: () => ['#78A4F6', '#80AAFD', '#bad2ff', '#cbd8f8', '#c1a2f7', '#b0b0f5', '#c3c3f6', '#ffbf6b', '#ffd692', '#ffdbb6', '#ffec9e'],
    },
    radius: {
      type: Array,
      default: () => {
        return ['50%', '68%'];
      },
    },

    center: {
      type: Array,
      default: () => {
        return ['50%', '50%'];
      },
    },
    labelWidth: {
      type: Number,
      default: () => {
        return 100;
      },
    },
    /* 修改  start */
    labelength: {
      type: Number,
      default: () => {
        return 8;
      },
    },
    fontPadding: {
      type: Array,
      default: () => {
        return [2, 5, 2, 0];
      },
    },
    labeLpadding: {
      type: Array,
      default: () => {
        return [5, -20];
      },
    },
    twoEchartLabelShow: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    grid: Object,
    /* 修改 end */
    roseType: {
      type: [Boolean, String],
      default: false,
    },
  },
  data() {
    return {
      myChart: null,
      // echarts图配置
      option: {},
    };
  },
  mounted() {},
  methods: {
    drawChart() {
      if (this.$refs[this.bindRefs]) {
        let that = this;
        this.myChart = this.$echarts.init(this.$refs[this.bindRefs]);

        this.option = {
          color: this.color,
          legend: {
            bottom: '15%',
            show: this.lengendShow,
            itemWidth: 6,
            itemHeight: 9,
          },

          tooltip: {
            extraCssText: 'z-index:2',
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: this.radius,
              center: this.center,
              /* fixed start */
              clickable: false, //是否开启点击
              minAngle: 5, //最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
              avoidLabelOverlap: false, //是否启用防止标签重叠策略
              hoverAnimation: false, //是否开启 hover 在扇区上的放大动画效果。
              silent: true, //图形是否不响应和触发鼠标事件
              /* fixed end */
              data: this.data,
              roseType: this.roseType,
              label: {
                align: 'left',
                show: this.pieLabelShow,
                position: 'outside',
                // width: 50,
                padding: this.labeLpadding,
                // bleedMargin: 5,
                fontSize: 12,
                /*   formatter(v) {
                  let text = v.name + ':' + v.value + '个';
                  if (text.length <= 8) {
                    return text;
                  } else if (text.length > 8 && text.length <= 16) {
                    return (text = `${text.slice(0, 8)}\n${text.slice(8)}`);
                  } else if (text.length > 16 && text.length <= 24) {
                    return (text = `${text.slice(0, 8)}\n${text.slice(8, 16)}\n${text.slice(16)}`);
                  } else if (text.length > 24 && text.length <= 30) {
                    return (text = `${text.slice(0, 8)}\n${text.slice(8, 16)}\n${text.slice(16, 24)}\n${text.slice(24)}`);
                  } else if (text.length > 30) {
                    return (text = `${text.slice(0, 8)}\n${text.slice(8, 16)}\n${text.slice(16, 24)}\n${text.slice(24, 30)}\n${text.slice(30)}`);
                  }
                }, */

                formatter: function (params) {
                  var percent = 0;
                  var total = 0;
                  for (var i = 0; i < that.data.length; i++) {
                    total += Number(that.data[i].value);
                  }
                  if (total == 0) {
                    percent = 0;
                  } else {
                    percent = parseInt((params.value / total) * 100);
                  }
                  if (params.name !== '') {
                    if (that.twoEchartLabelShow) {
                      return '{value|' + params.name + '}' + '{percentage|' + percent + '%' + '}' + '\n{he|}';
                    } else {
                      return '{name|' + params.name + '}\n{hr|}\n{percent|' + params.value + ' , ' + percent + '%' + '}';
                    }
                  } else {
                    return '';
                  }
                },
                rich: {
                  /* fixed start */
                  he: {
                    borderColor: '#979797',
                    width: '100%',
                    borderWidth: 2,
                    height: 0,
                    opacity: 0.6,
                  },
                  value: {
                    fontSize: 12,
                    padding: [7, 0, 4, 0],
                  },
                  percentage: {
                    fontSize: 12,
                    padding: [7, 0, 4, 0],
                  },
                  // name 的样式
                  name: {
                    color: '#8C8C8C',
                    fontSize: 14,
                    padding: this.fontPadding,
                    align: 'left',
                  },
                  // 第二条线的样式
                  hr: {
                    borderColor: '#979797',
                    width: '100%',
                    borderWidth: 1,
                    height: 0,
                    opacity: 0.6,
                  },
                  // 百分数的样式
                  percent: {
                    color: '#8C8C8C',
                    fontSize: 14,
                    padding: this.fontPadding,
                    align: 'center',
                  },
                  /* fixed end */
                },
              },
              labelLine: {
                length: this.labelength,
                lineStyle: {
                  color: '#979797',
                  opacity: 0.6,
                },
              },
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 1,
                // normal: {
                //   color: (params) => {
                //     return new graphic.LinearGradient(1, 0, 0.5, 0, [
                //       {
                //         offset: 0,
                //         color: this.color[params.dataIndex],
                //       },
                //       {
                //         offset: 1,
                //         color: this.graphicList[params.dataIndex],
                //       },
                //     ]);
                //   },
                // },
              },
            },
          ],
          grid: this.assignGrid(),
          // grid
        };

        this.myChart.setOption(this.option);
        // echarts图随着窗口的大小变化而变化
        window.addEventListener('resize', () => {
          this.myChart.resize();
        });
      }
    },
    // 新增grid
    assignGrid() {
      // console.log(this.grid);
      return {
        top: '0%',
        left: '20%',
        right: '20%',
        bottom: '0%',
        containLabel: true,
      };
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
  destroyed() {
    if (this.myChart) this.myChart.dispose();
  },
};
</script>

<style lang="scss">
.circlePieChart {
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
