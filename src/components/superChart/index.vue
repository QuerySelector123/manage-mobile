<!--
 * @Description: 多用echarts图组件
-->

<!--
 * @example：
      template：
        <SuperChart
          ref="lineBar_dj" // ref 名称
          styles="width:100%;height:90%" // 外层样式
          :yAxisNameArr="['(亿元)', '(%)']" // y 轴的名字，根据下标取用
          :color="['#B71F20', '#4380C1']" // 图的颜色，根据下标取用
          :fontColor="['#B71F20', '#111']" // 字的颜色，根据下标取用
          :lineStyle="{ width: 3 }" // 线的粗细
          lineSymbolSize="0.1" // 线中圆点的大小
          :yAxisLabelShowArr="[true, true]" // y 轴的名字显示状态，根据下标取用
          xRotate="30" // x 轴的 label 文字旋转角度
          :data="this.data_dj" // data数据
        >
        </SuperChart>

      data：
        定义一个数据：
        data_dj:{
          xAxisData:[],
          series:[]
        }

      method：
        在每次将数据加载到组件中，调用该 superChart 的 drawChart 方法；
        this.$nextTick(()=>{
          this.$refs['lineBar_dj'].drawChart();
        })
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
  name: 'superChart',
  props: {
    // -----------------start---------------------
    // xAxisData2: {
    //   type: Array,
    //   default: () => {
    //     return [100, 200, 400, 500, 600];
    //   },
    // },
    // ------------------end------------------------------
    // 传来的渲染数据
    data: {
      type: Object,
      required: true,
      default: () => {},
    },

    // legend 离top的距离
    top: {
      default: 0,
    },

    // 绑定的dom元素名称
    bindRefs: {
      type: String,
      default: 'symbolicChart',
    },

    // 唯一id
    keyId: String,

    // 外层div样式
    styles: {
      type: String,
      default: 'width:100%;height:100%',
    },

    // chart 显示状态
    show: {
      type: Boolean,
      default: true,
    },

    // y 轴的名字
    yAxisNameArr: {
      type: Array,
      default: () => {
        return ['', ''];
      },
    },
    yAxisNameShowArr: {
      type: Array,
      default: () => {
        return [true, true];
      },
    },

    // 图例显示状态
    legendShow: {
      type: Boolean,
      default: true,
    },

    // 是否反转图例顺序
    legendReversePosition: {
      type: Boolean,
      default: false,
    },

    // 柱图宽度
    barWidth: {
      type: String,
      default: 'auto',
    },
    barMinWidth: String,
    barMaxWidth: {
      type: String,
      default: '35',
    },

    // 轴label旋转角度
    xRotate: {
      default: 0,
    },

    // y 轴网格线显示状态
    ySplitLineShow: {
      type: Boolean,
      default: false,
    },

    // y 轴刻度文字显示状态
    yAxisLabelShowArr: {
      type: Array,
      default: () => {
        return [true, true];
      },
    },
    yAxisLabelFormat: {
      type: Array,
      default: () => {
        return ['', ''];
      },
    },

    yAxisLine1: {
      type: Boolean,
      default: false,
    },

    // y 每个图选用 y 轴的索引值
    yAxisIndexArr: Array,

    yAxisMaxMinArr1: {
      default: () => [null, null],
    },
    yAxisMaxMinArr2: {
      default: () => [null, null],
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

    // 轴线显示状态
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

    // series 数据颜色
    color: {
      type: Array,
      default: () => ['rgba(255, 147, 68, 1)', 'rgba(80, 128, 189, 0.925490196078431)', '#C80404'],
    },
    // 根据正负区分柱体颜色
    polarity: {
      type: Boolean,
      default: false,
    },
    // series 文字颜色
    fontColor: {
      type: Array,
      default: () => ['rgba(255, 147, 68, 1)', 'rgba(80, 128, 189, 0.925490196078431)', '#C80404'],
    },

    dataZoom: {
      type: Object,
      default: () => {
        return {
          type: 'inside',
          filterMode: 'filter',
          show: true, //flase直接隐藏图形
          xAxisIndex: [0],
          // left: '15%', //滚动条靠左侧的百分比
          // right: '15%', //滚动条靠左侧的百分比
          bottom: -5,
          // start: 30, //滚动条的起始位置
          // end: 0, //滚动条的截止位置（按比例分割你的柱状图x轴长度）
          // realtime: false,
          startValue: 0,
          endValue: 5,
          throttle: 30,
          // throttle: 200,
          moveOnMouseMove: true,
          zoomLock: true,
          preventDefaultMouseMove: false,
          zoomOnMouseWheel: false,
        };
      },
    },
    grid: Object,
    barGap: String,

    // 自定义的 tooltips样式
    tooltipStyle: {
      type: String,
      default: '',
    },
    // tooltip显示状态
    tooltipShow: {
      type: Boolean,
      default: true,
    },

    // 文字位置 top inside bottom ...
    labelPosition: {
      type: String,
      default: 'top',
    },

    // 是否显示线图中间的点
    showLineSymbol: {
      default: true,
    },
    // 线图中间的点
    lineSymbol: {
      type: String,
      default: 'circle',
    },
    lineSymbolSize: {
      type: Number,
      default: 8,
    },
    tooltipdispatch: {
      type: Boolean,
      default: false,
    },
    // 拐点样式的修改
    symbolStyle: {
      type: Object,
      default: () => {
        return {
          normal: {
            color: 'red', //拐点颜色
            borderColor: '#000000', //拐点边框颜色
            borderWidth: 3, //拐点边框大小
          },
        };
      },
    },
    // 线图的样式
    lineStyle: Object,

    // chart 图点击事件
    clickEvent: {
      type: Boolean,
      default: false,
    },

    // 条件显示： x 轴最后两个显示 label 吗
    onlylLastLabelShow: {
      type: Boolean,
      default: false,
    },
    onlylLastLabelShowArr: Array,

    // 条件显示：x 轴显示最大最小值 label 吗
    onlyMaxMinLabelShowArr: Array,

    // X轴下沉(false就下沉)
    onZero: {
      type: Boolean,
      default: true,
    },

    // 宏观经济-pmi 特殊 markline 处理
    markLine: Object,
    legendWidth: {
      type: String,
      default: 'auto',
    },
    legendItemGap: {
      type: Number,
      default: 20,
    },

    // X轴字体颜色
    xColorStyle: {
      type: String,
      default: '#fff',
    },

    // X轴字体大小
    fontStyleX: {
      type: Number,
      default: 12,
    },

    chartDirection: {
      type: String,
      default: 'bottom',
    },

    borderRadius: {
      type: Array,
      default: () => null,
    },
    labelShow: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    yAxisTextAlign: {
      type: Array,
      default: () => {
        return ['right', 'left'];
      },
    },
    yAxispadding2: {
      type: Array,
      default: () => {
        return [0, 0, 0, 10];
      },
    },
    yAxispadding1: {
      type: Array,
      default: () => {
        return [0, 5, 0, 0];
      },
    },
    position: {
      type: String,
      default: () => {
        return 'top';
      },
    },
    labelColor: {
      type: String,
      default: () => {
        return '#666';
      },
    },
    itemLinearGradientConfig: {
      type: Array,
      default: () => [0, 0, 0, 1],
    },
    areaLinearGradientConfig: {
      type: Array,
      default: () => [0, 0, 0, 1],
    },
  },
  data() {
    return {
      myChart: null,
      // echarts图配置
      option: {},

      areaClickIndex: -1,

      legendSize: 20,
    };
  },
  methods: {
    /**
     * @name: 初始化 echarts
     * @author: xulujin
     * @msg: 初始化 echarts 相关配置项参数，如初始设置的 tooltip, dataZoom, legend, 坐标轴 样式等，可按需要初始化
     * @example: 在父页面调用必须遵循该规范
     *       if (this.$refs['chartDom'])
              this.$refs['chartDom'].drawChart
     *
     * @Date: 2021-08-17 11:25:14
     */
    drawChart() {
      this.loading = true;
      if (this.$refs[this.bindRefs]) {
        this.myChart = this.$echarts.init(this.$refs[this.bindRefs]);

        this.option = {
          tooltip: {
            //提示框浮层的移动动画过渡时间，单位是 s，设置为 0 的时候会紧跟着鼠标移动。
            // transitionDuration: 0,
            show: this.tooltipShow,
            triggerOn: 'none',
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
              snap: true,
            },
            confine: true,
            // position: {
            //   top: '40%',
            // },
            // position: function (pos, params, dom, rect, size) {
            //   // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
            //   var obj = { top: '40%' };
            //   obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = pos[0];
            //   // console.log(obj);
            //   return obj;
            // },
            // position: function (point, params, dom, rect, size) {
            //   // 固定在顶部
            //   return [point[0], '20%'];
            // },
            position: function (point, params, dom, rect, size) {
              // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
              // 提示框位置s
              var x = 0; // x坐标位置
              var y = 0; // y坐标位置 // 当前鼠标位置
              var pointX = point[0];
              var pointY = point[1]; // 外层div大小 // var viewWidth = size.viewSize[0]; // var viewHeight = size.viewSize[1]; // 提示框大小
              var boxWidth = size.contentSize[0];
              var boxHeight = size.contentSize[1]; // boxWidth > pointX 说明鼠标左边放不下提示框
              // console.log(boxWidth, pointX);
              if (boxWidth > pointX) {
                x = pointX + 20;
              } else {
                // 左边放的下
                x = pointX - boxWidth - 20;
              } // boxHeight > pointY 说明鼠标上边放不下提示框

              if (boxHeight > pointY) {
                y = 5;
              } else {
                // 上边放得下
                y = pointY - boxHeight;
              }

              return [x, '40%'];
            },
            // extraCssText:
            //   this.tooltipStyle + 'z-index:50;width:auto;font-size:14px;background:rgba(255,255,255,.85);color:#333;border:1px solid #ccc;text-align:left',
            // formatter: {},
            extraCssText: 'z-index:2',
          },
          dataZoom: Object.assign(
            {},
            {
              type: 'inside',
              show: true, //flase直接隐藏图形
              xAxisIndex: [0],
              throttle: 30,
              // throttle: 200,
              // left: '15%', //滚动条靠左侧的百分比
              // right: '15%',
              bottom: -5,
              filterMode: 'filter',
              // start: 30,
              // realtime: false,

              startValue: 0,
              endValue: 5,
              moveOnMouseMove: true,
              zoomLock: true,
              preventDefaultMouseMove: false,
              zoomOnMouseWheel: false,
            },
            this.dataZoom
          ),
          grid: this.assignGrid(),
          legend: {
            show: this.legendShow,
            data: [],
            itemWidth: this.legendSize - 4,
            itemHeight: this.legendSize,
            width: this.legendWidth,
            textStyle: {
              fontSize: this.legendSize + 4, // legend字体大小
              lineHeight: this.legendSize + 4,
              color: '#666',
              // padding: [12, 0, 0, 0],
              // height: 14,
            },
            lineStyle: {
              // width: 10,
            },
            top: this.top,
            selectedMode: true, //取消图例上的点击事件
            itemGap: this.legendItemGap,
          },
          xAxis: this.categoryConfig(),
          yAxis: this.valueConfig(),
          series: [],
        };
        this.reDraw();
        if (this.tooltipdispatch) {
          var isFirst = true;
          this.myChart.getZr().on('click', (arg) => {
            const pointInPixel = [arg.offsetX, arg.offsetY];
            // 使用 convertFromPixel方法 转换像素坐标值到逻辑坐标系上的点。获取点击位置对应的x轴数据的索引		 值，借助于索引值的获取到其它的信息
            let pointInGrid = this.myChart.convertFromPixel({ seriesIndex: 0 }, pointInPixel);

            // x轴数据的索引值
            let xIndex = pointInGrid[0];

            // console.log(isFirst);
            console.log(xIndex);
            if (isFirst) {
              for (var i = 0; i < this.data.xAxisData.length; i++) {
                this.myChart.dispatchAction({
                  type: 'hideTip',
                  seriesIndex: 0,
                  // 数据项的 index，如果不指定也可以通过 name 属性根据名称指定数据项
                  dataIndex: i,
                });
                // this.myChart.dispatchAction({
                //   type: 'updateAxisPointer',
                //   currTrigger: 'leave',
                // });
              }
              this.myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: xIndex,
              });
            } else {
              this.myChart.dispatchAction({
                type: 'hideTip',
                seriesIndex: 0,
                // 数据项的 index，如果不指定也可以通过 name 属性根据名称指定数据项
                dataIndex: xIndex,
              });
              this.myChart.dispatchAction({
                type: 'updateAxisPointer',
                currTrigger: 'leave',
              });
            }
            isFirst = !isFirst;
          });
          this.myChart.on('mousemove', (arg) => {
            this.myChart.dispatchAction({
              type: 'updateAxisPointer',
              currTrigger: 'leave',
            });
            for (var i = 0; i < this.data.xAxisData.length; i++) {
              this.myChart.dispatchAction({
                type: 'hideTip',
                seriesIndex: 0,
                // 数据项的 index，如果不指定也可以通过 name 属性根据名称指定数据项
                dataIndex: i,
              });
            }
          });
        }
      }
      // echarts图随着窗口的大小变化而变化
      // window.addEventListener('resize', () => {
      //   this.myChart.resize();
      // });
    },

    /**
     * @name: 重绘
     * @author: xulujin
     * @msg: 在 echarts 初始化后执行，将后台请求到的源数据加载到 echarts 图中再重新绘制一次
     * @Date: 2021-08-17 11:24:11
     */
    reDraw() {
      const that = this;
      let series = [];
      let legendData = [];
      if (this.data.series && Object.keys(this.data.series).length > 0) {
        let splitAreaColor = [];
        this.data.xAxisData.forEach(() => {
          splitAreaColor.push('transparent');
        });

        if (this.chartDirection == 'left') {
          // this.option.yAxis.splitArea.areaStyle.color = splitAreaColor;
        } else {
          this.option.xAxis[0].splitArea.areaStyle.color = splitAreaColor;
        }

        for (let i = 0; i < this.data.series.length; i++) {
          let minIndex = null;
          let maxIndex = null;

          legendData.push({
            name: this.data.series[i].name ? this.data.series[i].name : null,
            icon:
              this.data.series[i].type == 'line' || this.data.series[i].type == 'areaStyle'
                ? // ? 'path://M0 0 L50 0 L50 50 L50 10 L0 10 Z'
                  'rect'
                : this.data.series[i].type == 'bar'
                ? 'rect'
                : '',
          });

          if (this.data.series[i].type != 'null' && this.data.series[i].type != null) {
            series.push({
              name: this.data.series[i].name,
              label: {
                show: this.data.series[i].showlabel == undefined && this.data.series[i].data.length < 36 ? true : this.data.series[i].showlabel,
                position: this.data.series[i].type == 'bar' ? this.labelPosition : [-10, -20],
                color: this.fontColor[i],
                fontStyle: this.labelPosition == 'inside' ? 'normal' : '',
                fontWeight: 'normal',
                fontSize: 13,
                formatter: (params) => {
                  if (params.value === 0) {
                    return '';
                  }
                  // max 值 与 最小值
                  this.data.series[i].data.forEach((item, index) => {
                    if (Math.max(...this.data.series[i].data) == item) {
                      maxIndex = index;
                    }

                    if (Math.min(...this.data.series[i].data) == item) {
                      minIndex = index;
                    }
                  });

                  // 显示最后两个数
                  if (this.onlylLastLabelShowArr && !this.onlyMaxMinLabelShowArr) {
                    if (this.onlylLastLabelShowArr[i]) {
                      if (params.dataIndex > this.data.xAxisData.length - 3) {
                        return this.switchSeries(this.data.series[i], params.value).value + this.switchSeries(this.data.series[i], params.value).unit;
                      } else {
                        return '';
                      }
                    } else {
                      return this.switchSeries(this.data.series[i], params.value).value + this.switchSeries(this.data.series[i], params.value).unit;
                    }
                  } else if (this.onlyMaxMinLabelShowArr && !this.onlylLastLabelShowArr) {
                    if (this.onlyMaxMinLabelShowArr[i]) {
                      if (params.dataIndex == maxIndex || params.dataIndex == minIndex) {
                        return this.switchSeries(this.data.series[i], params.value).value + this.switchSeries(this.data.series[i], params.value).unit;
                      } else {
                        return '';
                      }
                    } else {
                      return this.switchSeries(this.data.series[i], params.value).value + this.switchSeries(this.data.series[i], params.value).unit;
                    }
                  } else if (this.onlyMaxMinLabelShowArr && this.onlylLastLabelShowArr) {
                    if (params.dataIndex == maxIndex || params.dataIndex == minIndex || params.dataIndex > this.data.xAxisData.length - 3) {
                      return this.switchSeries(this.data.series[i], params.value).value + this.switchSeries(this.data.series[i], params.value).unit;
                    } else {
                      return '';
                    }
                  } else {
                    return this.switchSeries(this.data.series[i], params.value).value + this.switchSeries(this.data.series[i], params.value).unit;
                  }
                },
                normal: {
                  show: this.data.series[i].labelShow ? true : false,
                  position: this.position,
                  textStyle: {
                    color: this.labelColor,
                  },
                },
              },
              type: this.data.series[i].type == 'areaStyle' ? 'line' : this.data.series[i].type,
              barWidth: this.barWidth,
              barMinWidth: this.barMinWidth,
              barMaxWidth: this.barMaxWidth,

              barGap: this.data.series[i].barGap ? this.data.series[i].barGap : null,
              // barCategoryGap: this.data.series[i].barCategoryGap ? this.data.series[i].barCategoryGap : '0',
              z: this.data.series[i].z ? this.data.series[i].z : 1,
              yAxisIndex: this.comYAxisIndex()[i],
              xAxisIndex: 0,
              itemStyle: {
                color:
                  this.data.series[i].gradientRamp && this.data.series[i].gradientRamp != ''
                    ? new graphic.LinearGradient(...this.itemLinearGradientConfig, [
                        {
                          offset: 0,
                          color: this.color[i], // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: this.data.series[i].gradientRamp[0], // 100% 处的颜色
                        },
                      ])
                    : this.color[i],
                borderRadius: this.data.series[i].borderRadius,
                shadowColor: this.data.series[i].shadowColor ? this.data.series[i].shadowColor : '',
                shadowBlur: this.data.series[i].shadowBlur ? this.data.series[i].shadowBlur : 0,
                borderWidth: this.data.series[i].borderWidth ? this.data.series[i].borderWidth : 0,
                borderType: this.data.series[i].borderType ? this.data.series[i].borderType : 'solid',
                borderColor: this.data.series[i].borderColor ? this.data.series[i].borderColor : this.color[i],
              },
              areaStyle: {
                color:
                  this.data.series[i].type == 'bar'
                    ? new graphic.LinearGradient(...this.areaLinearGradientConfig, [
                        {
                          offset: 0,
                          color: this.color[i], // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: 'transparent', // 10% 处的颜色
                        },
                      ])
                    : 'transparent',
              },
              lineStyle: Object.assign({}, { width: 2 }, this.data.series[i].lineStyle ? this.data.series[i].lineStyle : this.lineStyle),
              // 拐点样式的修改
              // itemStyle: this.symbolStyle,
              markLine: this.markLine,
              smooth: this.data.series[i].smooth ? this.data.series[i].smooth : false,
              showSymbol: this.showLineSymbol,
              symbolSize: this.lineSymbolSize,
              symbol: this.lineSymbol,
              data: this.data.series[i].data,
              stack: this.data.series[i].stack,
              // z: i,
            });
          }
        }
        this.option.tooltip.formatter = this.tooltipFormatter();

        this.option.legend.data = this.legendReversePosition ? legendData.reverse() : legendData;
        this.option.series = series;
      } else {
        this.option.yAxis[0].name = '';
        this.option.yAxis[1].name = '';
        this.option.xAxis.data = [];
        this.option.legend.data = {};
        this.option.series = [];
      }

      this.myChart.setOption(this.option);
    },

    categoryConfig() {
      return [
        {
          type: 'category',
          boundaryGap: true,
          data: this.data.xAxisData,
          axisTick: { show: false },
          handle: {
            show: false,
          },
          axisLine: {
            show: this.axisLineShow.xAxis,
            lineStyle: {
              color: '#999',
            },
            onZero: this.onZero,
          },

          axisLabel: {
            // show: false,
            rotate: this.xRotate,
            formatter: function (value) {
              let ret = ''; //拼接加\n返回的类目项
              let maxLength = 15; //每项显示文字个数    <卢俊修改-原:9  改:15>
              let valLength = value.length; //X轴类目项的文字个数
              let rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
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
          splitArea: {
            show: true,
            areaStyle: {
              color: [],
            },
          },
          z: 10,
        },
        // 总数
        // {
        //   type: 'category',

        //   axisLine: {
        //     show: false,
        //   },
        //   axisTick: {
        //     show: false,
        //   },
        //   axisLabel: {
        //     show: false,
        //     inside: false,
        //     textStyle: {
        //       fontSize: '12',
        //     },
        //     formatter: function (val) {
        //       return `${val}`;
        //     },
        //   },
        //   splitArea: {
        //     show: false,
        //   },
        //   splitLine: {
        //     show: false,
        //   },
        //   data: this.xAxisData2,
        // },
      ];
    },

    valueConfig() {
      return [
        {
          show: this.yAxisNameShowArr[0],
          name: this.yAxisNameArr[0],
          // min:this.dataMin,
          min: this.yAxisMaxMinArr1[0],
          max: this.yAxisMaxMinArr1[1],
          nameTextStyle: {
            align: this.yAxisTextAlign[0],
            padding: this.yAxispadding1,
            color: '#666',
          },
          type: 'value',
          splitLine: {
            show: this.ySplitLineShow,
            lineStyle: {
              type: 'dashed',
              color: '#f1f1f1',
            },
          },
          axisTick: { show: false },
          axisLine: { show: this.axisLineShow.yAxis1, lineStyle: { color: '#2E4478' } },
          axisLabel: {
            show: this.yAxisLabelShowArr[0],
            color: this.axisFontColor.yAxis1,
            formatter: (value) => {
              return this.yAxisLabelFormat[0] ? value.toFixed(this.yAxisLabelFormat[0]) : value;
            },
          },
        },
        {
          show: this.yAxisNameShowArr[1],
          name: this.yAxisNameArr[1],
          // min: this.dataMin,
          min: this.yAxisMaxMinArr2[0],
          max: this.yAxisMaxMinArr2[1],
          nameTextStyle: {
            align: this.yAxisTextAlign[1],
            // align: 'left',
            padding: this.yAxispadding2,

            color: '#666',
          },
          type: 'value',
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
     * @author: xulujin
     * @msg: 该函数主要是对 tooltips formatter 的单位，样式进行处理，单位换算不会更改源数据，只是改变展示数据
     * @return {Function} formatter 返回给 echarts tooltipsformatter 使用的函数
     * @Date: 2021-08-17 11:22:16
     */
    tooltipFormatter() {
      const _this = this;
      return (params) => {
        let str = params[0].name + '<br>';
        let value = '';
        let unit = '';
        params.forEach((item, index) => {
          switch (this.data.series[index].unit) {
            case '月':
              if (_this.data.series[index].toFixed != null) {
                value = params[index].value == undefined ? '--' : Number(params[index].value).toFixed(_this.data.series[index].toFixed);
              } else {
                value = params[index].value == undefined ? '--' : Number(params[index].value).toFixed(0);
              }
              unit = '月';
              break;
            case '客流':
              if (_this.data.series[index].unit) {
                value = params[index].value == undefined ? '--' : Number(params[index].value).toFixed(_this.data.series[index].toFixed);
              } else {
                value = params[index].value == undefined ? '--' : Number(params[index].value).toFixed(0);
              }
              unit = '人';
            case 'null':
              if (_this.data.series[index].toFixed != null) {
                value = params[index].value == undefined ? '--' : Number(params[index].value).toFixed(_this.data.series[index].toFixed);
              } else {
                value = params[index].value == undefined ? '--' : Number(params[index].value).toFixed(1);
              }
              unit = '';
              break;
            case null:
              if (_this.data.series[index].toFixed != null) {
                value = params[index].value == undefined ? '--' : Number(params[index].value).toFixed(_this.data.series[index].toFixed);
              } else {
                value = params[index].value == undefined ? '--' : Number(params[index].value).toFixed(1);
              }
              unit = '';
              break;
            case '平方米':
              if (_this.data.series[index].toFixed != null) {
                value = params[index].value == undefined ? '--' : Number(params[index].value).toFixed(_this.data.series[index].toFixed);
              } else {
                value = params[index].value == undefined ? '--' : Number(params[index].value).toFixed(0);
              }
              unit = '平方米';
              break;
            case '元':
              if (_this.data.series[index].toFixed != null) {
                value = params[index].value == undefined ? '--' : Number(params[index].value).toFixed(_this.data.series[index].toFixed);
              } else {
                value = params[index].value == undefined ? '--' : Number(params[index].value).toFixed(0);
              }
              unit = '元';
              break;

            default:
              unit = '请到组件中添加"' + this.data.series[index].unit + '"这个单位!';
              // console.error('"' + this.data.series[index].unit + '"单位还未注册,需到组件中进行添加!');
              return false;
          }

          str += params[index].marker + params[index].seriesName + ' : ' + value + ' ' + unit + '<br>';
        });

        return str;
      };
    },

    /**
     * @name: 对 label 数据进行单位换算
     * @author: xulujin
     * @msg: 该函数主要是对 echarts 图数据进行单位换算，但是不会更改源数据，只是改变展示数据
     * @param {Object} seriesData 每类 echarts 图数据
     * @param {String|Number} values 当前刻度 echarts 图值
     * @Date: 2021-08-17 11:19:51
     */
    switchSeries(seriesData, values) {
      let value = Number(values);
      switch (seriesData.unit) {
        case '元':
          if (seriesData.toFixed != null) return { value: value.toFixed(seriesData.toFixed), unit: '' };
          return { value: value.toFixed(0), unit: '' };
        case '元/m²':
          if (seriesData.toFixed != null) return { value: value.toFixed(seriesData.toFixed), unit: '' };
          return { value: value.toFixed(0), unit: '' };
        case '月':
          if (seriesData.toFixed != null) return { value: value.toFixed(seriesData.toFixed), unit: '' };
          return { value: value.toFixed(0), unit: '' };
        case null:
          if (seriesData.toFixed != null) return { value: value.toFixed(seriesData.toFixed), unit: '' };
          return { value: value.toFixed(0), unit: '' };
        case 'null':
          if (seriesData.toFixed != null) return { value: value.toFixed(seriesData.toFixed), unit: '' };
          return { value: value.toFixed(0), unit: '' };
        case '':
          if (seriesData.toFixed != null) return { value: value.toFixed(seriesData.toFixed), unit: '' };
          return { value: value.toFixed(0), unit: '' };

        default:
          console.error('"' + seriesData.unit + '"单位还未注册,需到组件中进行添加!');
          return '请到组件中添加"' + seriesData.unit + '"这个单位!';
      }
    },

    // 重置点击之后选中的索引值
    /* resetAreaClickIndex() {
      this.areaClickIndex = -1;
    }, */

    /**
     * @name: assign gird 属性处理
     * @author: xulujin
     * @Date: 2021-08-17 11:18:43
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
     * @author: xulujin
     * @msg: 但是如果设置了 this.yAxisIndexArr ,就用 this.yAxisIndexArr
     * @Date: 2021-08-17 11:18:26
     */
    comYAxisIndex() {
      let yAxisIndexArr = this.data.series.map((item) => {
        return item.type == 'bar' ? 0 : 1;
      });
      // console.log(yAxisIndexArr); // [0] [0,0] [0,1]
      return this.yAxisIndexArr ? this.yAxisIndexArr : yAxisIndexArr;
      //          Array                                         0
    },

    /**
     * @name: 字体大小根据屏幕宽度自适应函数
     * @author: xulujin
     * @Date: 2021-08-17 11:18:12
     */
    adaptive() {
      // document.body.clientWidth;
      if (document.body.clientWidth <= 414) {
        this.legendSize = 12;
      } else {
        this.legendSize = 13;
      }
      // this.drawChart();
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
  created() {},
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
