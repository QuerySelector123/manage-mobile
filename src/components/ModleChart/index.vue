<!--
 * @Author: DuShuai
 * @Date: 2021-10-21 11:01:11
 * @LastEditors: [Dushuai]
 * @LastEditTime: 2021-10-21 14:26:48
 * @Description: 
-->
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
            show: false,
            extraCssText: 'z-index:2',
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: this.radius,
              center: this.center,
              /* fixed start */
              //   clickable: true, //是否开启点击
              minAngle: 5, //最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
              //   avoidLabelOverlap: false, //是否启用防止标签重叠策略
              //   hoverAnimation: true, //是否开启 hover 在扇区上的放大动画效果。
              //   silent: true, //图形是否不响应和触发鼠标事件
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
                borderWidth: 4,
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
    // 获取预计可签
    getKcYjkq(params) {
      this.$getData(API_LIST.kcYjkq, params).then((res) => {
        let { code, data } = res;
        if (code === 200 && data) {
          this.estimateList[0].value = data.yjSalesAmountM;
          this.estimateList[0].number = data.yjSalesCountM;
          this.estimateList[1].value = data.yjSalesAmountQ;
          this.estimateList[1].number = data.yjSalesCountQ;
          this.estimateList[2].value = data.yjSalesAmountY;
          this.estimateList[2].number = data.yjSalesCountY;
          this.estimateList[3].value = data.yjSalesAmountNY;
          this.estimateList[3].number = data.yjSalesCountNY;
          this.estimateList[4].value = data.yjSalesAmountNYL;
          this.estimateList[4].number = data.yjSalesCountNYL;
          this.estimateList[5].value = data.yjSalesAmountT;
          this.estimateList[5].number = data.yjSalesCountT;
          this.sumAmount = this.toFormat(data.sumAmount, true);
          this.sumAmount1 = data.sumAmount;
          this.sumCount = data.sumCount;
        } else {
          this.estimateList[0].value = 0;
          this.estimateList[0].number = 0;
          this.estimateList[1].value = 0;
          this.estimateList[1].number = 0;
          this.estimateList[2].value = 0;
          this.estimateList[2].number = 0;
          this.estimateList[3].value = 0;
          this.estimateList[3].number = 0;
          this.estimateList[4].value = 0;
          this.estimateList[4].number = 0;
          this.estimateList[5].value = 0;
          this.estimateList[5].number = 0;
          this.sumAmount = 0 + '万';
          this.sumAmount1 = 0;
          this.sumCount = 0;
        }
        this.setSingChart();
      });
    },
    setSingChart() {
      let option = {
        // color:['#FFCC81','#FFB000','#FF9800','#8681F9','#9EC9FF','#D9D9D9'],
        title: {
          text: '预计可签',
          left: '16%',
          bottom: '0%',
          textStyle: {
            fontSize: 16,
          },
          subtext: this.sumAmount + '/' + this.sumCount + '套',
          subtextStyle: {
            color: '#FE7400',
            fontWeight: 600,
            fontSize: 14,
          },
          textAlign: 'center',
        },
        animationDuration: 300,
        series: [
          {
            minAngle: 10,
            selectedMode: 'single',
            selectedOffset: 5,
            // left: '-60%',
            name: '访问来源',
            type: 'pie',
            radius: ['10%', '28%'],
            center: ['21%', '42%'],
            hoverAnimation: false,
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            itemStyle: {
              // borderColor: '#fff',
              // borderWidth: 2
            },

            labelLine: {
              show: false,
            },
            data: [
              { value: this.estimateList[2].value, name: '本年可签', itemStyle: { color: '#FF9800' }, emphasis: { itemStyle: { color: '#FF9800' } } },
              { value: this.estimateList[3].value, name: '22年可签', itemStyle: { color: '#8681F9' }, emphasis: { itemStyle: { color: '#8681F9' } } },
              { value: this.estimateList[4].value, name: '22年后可签', itemStyle: { color: '#9EC9FF' }, emphasis: { itemStyle: { color: '#9EC9FF' } } },
              { value: this.estimateList[5].value, name: '预计退挞定', itemStyle: { color: '#D9D9D9' }, emphasis: { itemStyle: { color: '#D9D9D9' } } },
            ],
          },
          {
            // selectedMode: 'single',
            // selectedOffset:0,
            name: '访问来源1',
            type: 'pie',
            radius: ['35%', '45%'],
            center: ['21%', '42%'],
            hoverAnimation: false,
            // avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            itemStyle: {
              // borderColor: '#fff',
              // borderWidth: 2
            },

            labelLine: {
              show: false,
            },
            data: [
              {
                value: this.estimateList[1].value,
                name: '本季可签',
                itemStyle: { color: '#FFB000' },
                emphasis: { itemStyle: { color: '#FFB000', borderType: '#000', shadowBlur: 10 } },
              },
              {
                value: this.sumAmount1 - this.estimateList[1].value,
                name: '总可签',
                itemStyle: { color: 'rgba(0, 0, 0, 0)' },
                emphasis: { itemStyle: { color: 'rgba(0, 0, 0, 0)', borderType: 'rgba(0, 0, 0, 0)', shadowBlur: 0 } },
              },
            ],
          },
          {
            selectedMode: 'single',
            selectedOffset: 5,
            name: '访问来源2',
            type: 'pie',
            radius: ['55%', '65%'],
            center: ['21%', '42%'],
            hoverAnimation: false,
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            itemStyle: {
              // borderColor: '#fff',
              // borderWidth: 2
            },

            labelLine: {
              show: false,
            },
            data: [
              { value: this.estimateList[0].value, name: '本月可签', itemStyle: { color: '#FFCC81' }, emphasis: { itemStyle: { color: '#FFCC81' } } },
              { value: this.sumAmount1 - this.estimateList[0].value, name: '总可签', itemStyle: { color: 'rgba(0, 0, 0, 0)' } },
            ],
          },
        ],
        /* #FFCC81  #FFB000  #FF9800 #8681F9  #9EC9FF #D9D9D9 */
      };
      this.singChart.setOption(option);
      this.singChart.on('click', (arg) => {
        for (let i = 0; i < 4; i++) {
          this.singChart.dispatchAction({
            type: 'pieUnSelect',
            seriesIndex: [0, 2],
            dataIndex: i,
          });
        }
        if (arg.name === '本季可签') {
          this.singChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 1,
            dataIndex: 0,
          });
        } else {
          this.singChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 1,
            dataIndex: 0,
          });
        }
        this.estimateList.forEach((item, index) => {
          if (arg.name === item.name) {
            this.select === index ? (this.select = '') : (this.select = index);
          }
        });
      });
      this.singChart.dispatchAction({
        type: 'pieSelect',
        seriesIndex: 2,
        dataIndex: 0,
      });
      this.select = 0;
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
