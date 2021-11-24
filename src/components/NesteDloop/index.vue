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
  name: 'nestedloop',
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
    inradius: {
      type: Array,
      default: () => {
        return ['0', '40%'];
      },
    },
    outradius: {
      type: Array,
      default: () => {
        return ['40%', '60%'];
      },
    },
    data1: {
      type: Array,
      default: () => {
        return [];
      },
    },
    data2: {
      type: Array,
      default: () => {
        return [];
      },
    },
    labeLpadding: {
      type: Array,
      default: () => {
        return [2, -10];
      },
    },
    color1: {
      type: Array,
      default: () => {
        return ['#5B8FF9', '#8C8CF1', '#FFAB45'];
      },
    },
    color2: {
      type: Array,
      default: () => {
        return ['#5B8FF9', '#5B8FF9', '#5B8FF9', '#8C8CF1', '#FFAB45', '#FFAB45', '#FFAB45'];
      },
    },
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
        var that = this;
        this.myChart = this.$echarts.init(this.$refs[this.bindRefs]);
        this.option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
          },
          legend: {
            data: [],
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              selectedMode: false,
              radius: this.inradius,
              label: {
                position: 'inner',
                fontSize: 10,
                color: '#fff',
                formatter: function (params) {
                  // console.log(params);
                  var percent = 0;
                  var total = 0;
                  for (var i = 0; i < that.data1.length; i++) {
                    total += Number(that.data1[i].value);
                  }

                  percent = (params.value / total) * 100;
                  if (params.name !== '') {
                    return params.name + '\n' + params.value + '\n' + params.percent + '%';
                  } else {
                    return '';
                  }
                },
              },
              labelLine: {
                show: false,
              },
              data: this.data1,
              itemStyle: {
                normal: {
                  color: (params) => {
                    return this.color1[params.dataIndex];
                  },
                  borderColor: '#fff',
                  borderWidth: 2,
                },
              },
            },
            {
              name: '',
              type: 'pie',
              radius: this.outradius,

              data: this.data2,

              label: {
                show: true,
                position: 'outside',

                padding: this.labeLpadding,

                fontSize: 12,
                formatter: function (params) {
                  var percent = 0;
                  var total = 0;
                  for (var i = 0; i < that.data2.length; i++) {
                    total += Number(that.data2[i].value);
                  }
                  percent = ((params.value / total) * 100).toFixed(0);
                  if (params.name !== '') {
                    return '{name|' + params.name + '}\n{hr|}\n{percent|' + Number(params.value) + ' ,' + percent + '%' + '}';
                  } else {
                    return '';
                  }
                },
                rich: {
                  // name 的样式
                  name: {
                    color: '#8C8C8C',
                    fontSize: 14,
                    padding: [2, 0, 2, -2],
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
                    padding: [2, 5, 2, 0],
                    align: 'center',
                  },
                },
              },
              labelLine: {
                length: 20,
                lineStyle: {
                  color: '#979797',
                  opacity: 0.6,
                },
              },
              itemStyle: {
                normal: {
                  color: (params) => {
                    return this.color2[params.dataIndex];
                  },
                  borderColor: '#fff',
                  borderWidth: 2,
                },
              },
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
