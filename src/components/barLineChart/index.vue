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
  /**
   * @ data中要传的数据
   * @xAxisData: x轴必须要舔
   * @author: dushuai
   * @msg: 在 echarts 初始化后执行，将后台请求到的源数据加载到 echarts 图中再重新绘制一次
   * @Date: 2021-09-18 11:24:11
   */
  // 接受的参数
  props: {
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
      default: true,
    },
    // tooltipShow 是否显示提示框组件
    tooltipShow: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    // 缩放组件 [type=inside] 可以拖拉柱状图左右滑动
    // 缩放组件 [type=slider] 在柱状图下面新增一个提示的组件 可以拖拉柱状图左右滑动

    dataZoom: {
      type: Object,
      default: () => {
        return {
          type: 'inside',
          disabled: false,
          //xAxisIndex: [0,  2],
          // 当有多个xAxis 选择 第一个 和 第三个
          left: '9%', //滚动条靠左侧的百分比
          bottom: -5,
          start: 100, //数据窗口范围百分比
          end: 0, // 数据窗口范围结束百分比
        };
      },
    },

    grid: {
      type: Object,
      default: () => {
        return {
          top: '15%',
          left: '2%',
          right: '2%',
          bottom: '15',
          // grid 区域是否包含坐标轴的刻度标签
          containLabel: true,
        };
      },
    },
    // legendShow 是否显示图例组件
    legendShow: {
      type: Boolean,
      default: false,
    },

    // 柱状图的 朝向 默认
    chartDirection: {
      type: String,
      default: 'bottom',
    },
    // y轴的名字
    yAxisNameArr: {
      type: Array,
      default: () => {
        return ['', ''];
      },
    },
    // y轴的name 是否显示
    yAxisNameShowArr: {
      type: Array,
      default: () => {
        return [true, true];
      },
    },
    // y轴第一个 最小值 最大值
    yAxisMaxMinArr1: {
      type: Array,
      default: () => {
        return [null, null];
      },
    },
    // y轴第二个 最小值 最大值
    yAxisMaxMinArr2: {
      type: Array,
      default: () => {
        return [null, null];
      },
    },
    // y轴的分隔线是否显示
    ySplitLineShow: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    //  坐标轴线 显示状态
    axisLineShow: {
      type: Object,
      default: () => {
        return {
          xAxis: true,
          yAxis1: false,
          yAxis2: false,
        };
      },
    },

    // y 轴刻度文字显示状态
    yAxisLabelShowArr: {
      type: Array,
      default: () => {
        return [true, true];
      },
    },
    // 坐标轴字体颜色
    axisFontColor: {
      type: Object,
      default: () => {
        return {
          xAxis: '#999',
          yAxis1: '#999',
          yAxis2: '#999',
        };
      },
    },

    // X 轴下沉 [false就下沉]
    onZero: {
      type: Boolean,
      default: true,
    },
    //  y 轴 labelformat的 显示
    yAxisLabelFormat: {
      type: Array,
      default: () => {
        return ['', ''];
      },
    },

    // 类目轴文字旋转角度
    xRotate: {
      type: Number,
      default: () => {
        return 0;
      },
    },
  },
  data() {
    return {
      myChart: null,
      //   echarts 图的配置
      option: {},
      //图例字体大小
      legendSize: 20,
    };
  },
  methods: {
    /**
     * @name: 初始化echarts
     * @author: DuShuai
     * @msg: 初始化 echarts 相关配置项参数
     * @example 在父页面调用必须遵循该规范
     *  if(this.$refs['chartDom'])
     *  this.$refs['chartDom'].startChart
     * @Date: 2021-09-16
     **/
    startChart() {
      this.loading = true;
      if (this.$refs[this.bindRefs]) {
        this.myChart = this.$echarts.init(this.$refs[this.bindRefs]);
        this.option = {
          // 提示框组件
          tooltip: {
            show: this.tooltipShow,
            // 触发方式
            // 【axis】点击柱状图触发
            // 【item】点击柱状图列表项触发
            trigger: 'axis',
            //坐标轴指示器 触发方式
            axisPointer: {
              // 【line】 触发提示以一条竖线
              // 【cross】 触发提示以一条交叉线
              // 【shadow】 触发提示以一条item的阴影
              type: 'shadow',
            },
            // 是否tooltip 框限制在图表的区域内 false时有overflow hidden
            confine: true,
            //  提示框组件的内容
            formatter: {},
          },
          // 缩放区域组件
          // 如果有多个源对象有相同属性 那么目标对象的属性会被最后一个源对象属性覆盖
          // 使用 Object.assign(target,source1,source2) 可以替换原来的属性
          dataZoom: Object.assign(
            {},
            {
              type: 'inside',
              disabled: false,
              //xAxisIndex: [0,  2],
              // 当有多个xAxis 选择 第一个 和 第三个
              left: '9%', //滚动条靠左侧的百分比
              bottom: -5,
              start: 100, //数据窗口范围百分比
              end: 0, // 数据窗口范围结束百分比
            },
            this.dataZoom
          ),
          //  对网格进行处理
          grid: this.assignGrid(),
          // 对图列组件进行处理
          legend: {
            show: this.legendShow,
            data: [
              // {
              //   name:'series的name属性',
              //   // 强制设置为圆形
              //   icon: 'cricle'
              // }
            ],
            // 图例的宽度
            itemWidth: 5.07,
            // 图例的高度
            itemHeight: 8.24,
            // 整个图例组件的宽度 当宽度不够会落在一起
            width: 'auto',
            // 图例的字体样式设置
            textStyle: {
              fontSize: this.legendSize + 1,
              lineHeight: this.legendSize + 1,
              color: '#666',
            },
            lineStyle: {},
            top: 10,
            // 图例上的点击事件 是否开启
            selectMode: true, //
            // 图例之间的 每项之间的间隔
            itemGap: 20,
          },
          xAxis: this.chartDirection == 'left' ? this.valueConfig() : this.categoryConfig(),
          yAxis: this.chartDirection == 'left' ? this.categoryConfig() : this.valueConfig(),
          series: this.data.series,
        };

        this.myChart.setOption(this.option);
      }

      // echarts 图 随着窗口的大小变化而变化
      window.addEventListener('resize', () => {});
    },

    /**
     * @name: 重绘
     * @author: DuShuai
     * @msg: 在 echarts 初始化后执行，将后台请求到的源数据加载到 echarts 图中再重新绘制一次
     * @Date: 2021-09-17
     */

    /**
     * @name: 类目轴
     * @author: DuShuai
     * @msg: 在 echarts 初始化后执行，将后台请求到的源数据加载到 echarts 图中再重新绘制一次
     * @Date: 2021-09-17
     */
    categoryConfig() {
      return {
        // 类目轴
        type: 'category',
        // 坐标轴两边的留白策略
        // 【true】 这时候以 每个item 作为分隔线
        // 【false】以刻度作为分割线
        boundaryGap: true,
        data: this.data.xAxisData,
        // 刻度是否要显示
        axisTick: { show: false },
        // 轴线的设置
        axisLine: {
          show: this.axisLineShow.xAxis,
          lineStyle: {
            color: '#999',
          },
          onZero: this.onZero,
          // [onZero]  当我们的y轴 有正值 和 有负值的情况下
          //  想实现 负值向下偏移 正值向上偏移
          // 而不是挤压着轴线
          // 可以通过 onZero 和 offset 实现
          // xAxis:{
          //   offset:5,
          //   axisLine:{
          //     onZero:false
          //   }
          // }
        },
        axisLabel: {
          rotate: this.xRotate,
          formatter: function (value) {
            let ret = ''; //拼接加\n 返回的类目项
            let maxLength = 15; // 每项显示文字个数
            let valLength = value.length; //x轴类目项的文字个数
            let rowN = Math.ceil(valLength / maxLength); // 类目项 需要换行的行数
            if (rowN > 1) {
              //如果类目项的文字大于7,
              for (let i = 0; i < rowN; i++) {
                let temp = ''; //每次截取的字符串
                let start = i * maxLength; //开始截取的位置
                let end = start + maxLength; //结束截取的位置
                //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                temp = value.substring(start, end) + '\n';
                ret += temp; //凭借最终的字符串
              }
              return ret;
            } else {
              return value;
            }
          },
          color: this.axisFontColor.xAxis,
        },
        // 给系列添加渐变背景
        splitArea: {
          show: true,
          // 分隔区域的样式设置
          areaStyle: {
            color: [],
          },
        },
        // X 轴组件的所有图形的z值。
        // 控制图形的前后顺序。
        // z值小的图形会被z值大的图形覆盖。
        z: 10,
      };
    },

    /**
     * @name: value
     * @author: DuShuai
     * @msg: 在 echarts 初始化后执行，将后台请求到的源数据加载到 echarts 图中再重新绘制一次
     * @Date: 2021-09-17
     */
    valueConfig() {
      return [
        // 第一个y轴
        {
          // 是否显示y轴
          show: this.yAxisNameShowArr[0],
          // y轴的名称
          name: this.yAxisNameArr[0],
          // y轴的最小值
          min: this.yAxisMaxMinArr1[0],
          // y轴的最大值
          max: this.yAxisMaxMinArr1[1],
          // y轴 名称的样式
          nameTextStyle: {
            color: '#666',
            // 与y轴的对齐方式
            align: 'center',
          },
          //【value】 数值轴
          //【cataegory】  类目轴
          type: 'value',
          // 在grid 区域的分割线
          splitLine: {
            show: this.ySplitLineShow,
            // 分割线样式
            lineStyle: {
              type: 'dashed',
              color: '#f1f1f1',
            },
          },
          // 坐标轴刻度
          axisTick: { show: false },
          // 坐标轴线 设置
          axisLine: {
            show: this.axisLineShow.yAxis1,
            lineStyle: { color: '#2E4478' },
          },
          // 坐标轴 内容区设置
          axisLabel: {
            show: this.yAxisLabelShowArr[0],
            color: this.axisFontColor.yAxis1,
            formatter: (value) => {
              return this.yAxisLabelFormat[0] ? value.toFixed(this.yAxisLabelFormat[0]) : value;
            },
          },
        },
        // 第二个y轴
        {
          show: this.yAxisNameShowArr[1],
          name: this.yAxisNameArr[1],
          // min: this.dataMin,
          min: this.yAxisMaxMinArr2[0],
          max: this.yAxisMaxMinArr2[1],
          nameTextStyle: {
            // align: 'left',
            // padding: [0, 0, 0, 30],
            color: '#666',
          },
          type: 'value',
          // 坐标轴两边的留白策略 类目轴和非类目轴 的设置和表现不一样
          boundaryGap: [0, 0.2],
          splitLine: { show: false },
          axisTick: { show: false },
          axisLine: { show: this.axisLineShow.yAxis2, lineStyle: { color: '#2E4478' } },
          axisLabel: {
            show: this.yAxisLabelShowArr[1],
            color: this.axisFontColor.yAxis2,
            formatter: (value) => {
              return this.yAxisLabelFormat[1] ? value.toFixed(this.yAxisLabelFormat[1]) : value;
            },
          },
        },
      ];
    },

    /**
     * @name: tooltips formatter处理
     * @author: DuShuai
     * @msg: 该函数主要是对 tooltips formatter 的单位，样式进行处理，单位换算不会更改源数据，只是改变展示数据
     * @return {Function} formatter 返回给 echarts tooltipsformatter 使用的函数
     * @Date: 2021-09-17
     */
    tooltipFormatter() {},

    /**
     * @name: chart 监听点击事件
     * @author: dushuai
     * @Date: 2021-09-17
     */
    chartClick() {},

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
     * @name: 对图表对应的 yAxisIndex 进行自适应匹配
     * @author: dushuai
     * @msg: 但是如果设置了 this.yAxisIndexArr ,就用 this.yAxisIndexArr
     * @Date: 2021-09-17
     */

    comYAxisIndex() {},

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
