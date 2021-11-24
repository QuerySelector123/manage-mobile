<!--
 * @Author: xulujin
 * @Date: 2021-08-25 13:57:29
 * @LastEditTime: 2021-08-25 15:08:49
 * @Description: 水球图
-->

<template>
  <div class="waterPoloChart" :style="styles">
    <div class="chart-wrap" v-if="show == true">
      <div :ref="bindRefs" style="width: 100%; height: 100%"></div>
    </div>
    <div class="no-data" v-else>暂无数据</div>
  </div>
</template>

<script>
import 'echarts-liquidfill';
export default {
  name: 'waterPoloChart',
  props: {
    // 绑定的dom元素名称
    bindRefs: {
      type: String,
      default: 'waterPoloChart',
    },
    data: Number,
    // 外层div样式
    styles: {
      type: String,
      default: 'width:100%;height:100%',
    },

    isActive: {
      type: Boolean,
      default: false,
    },

    // chart 显示状态
    show: {
      type: Boolean,
      default: true,
    },

    colorArr: {
      type: Array,
      default: () => {
        return ['#CED8E5', '#8DA4C3', '#5B7CA9'];
      },
    },

    activeColorArr: {
      type: Array,
      default: () => {
        return ['#BBFCFE', '#60F7FE', '#1bf4fd'];
      },
    },
  },
  components: {},
  data() {
    return {
      myChart: null,

      option: {},
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      // this.drawChart();
    });
  },

  destroyed() {
    if (this.myChart) this.myChart.dispose();
  },
  methods: {
    drawChart() {
      if (this.$refs[this.bindRefs]) {
        this.myChart = this.$echarts.init(this.$refs[this.bindRefs]);
        this.option = {
          series: [
            {
              color: this.isActive ? this.activeColorArr : this.colorArr,
              type: 'liquidFill',
              radius: '95%',
              shape: 'circle',
              amplitude: '15%',
              data: [this.data / 100, this.data / 100, this.data / 100],
              outline: {
                show: true,
                borderDistance: 4,
                itemStyle: {
                  borderColor: this.isActive ? this.activeColorArr[2] : this.colorArr[2],
                  borderWidth: 4,
                },
              },
              backgroundStyle: {
                color: 'transparent', //背景颜色
              },

              itemStyle: {
                opacity: 1,
                shadowBlur: 50,
                shadowColor: 'rgba(0, 0, 0, 0.4)',
              },

              label: {
                show: true,
                fontSize: 24,
                color: this.isActive ? this.activeColorArr[2] : this.colorArr[2],
                position: ['50%', '30%'],
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
  },
  computed: {},
  watch: {},
};
</script>
<style lang='scss'>
.waterPoloChart {
  .chart-wrap {
    height: 100%;
    width: 100%;
  }
}
</style>

