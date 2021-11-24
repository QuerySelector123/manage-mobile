<!--
 * @Author: xulujin
 * @Date: 2021-08-26 09:04:18
 * @LastEditTime: 2021-10-25 18:25:54
 * @Description: 物料齐套
-->
<template>
  <div class="income">
    <DateNavbar :selectShow="[false, true, true]" @income="handmonth"></DateNavbar>

    <!-- 航班次下拉框 -->
    <ShipDropdown></ShipDropdown>
    <!-- 概览 -->
    <div class="mb mt">
      <ContentBox toplefttitle="概览">
        <template #content>
          <div class="select-content">
            <div class="item">
              <div class="item-value">88.88 <span>万元</span></div>
              <div class="item-title">船票收入</div>
            </div>
            <div class="item">
              <div class="item-value">8.21 <span>万元</span></div>
              <div class="item-title">二消收入</div>
            </div>
            <div class="item">
              <div class="item-value">288 <span>元/人</span></div>
              <div class="item-title">单位人次收入</div>
            </div>
            <div class="item">
              <div class="item-value">80 <span>%</span></div>
              <div class="item-title">收入目标完成率</div>
            </div>
          </div>
        </template>
      </ContentBox>
    </div>

    <!-- 明细 -->
    <div class="mb">
      <ContentBox toplefttitle="明细" toprighttitle="单位:万元">
        <template #content>
          <div class="select-wrap" v-if="false">
            <div class="select-item">
              <div class="index indet">序号</div>
              <div class="add">收入项</div>
              <div class="current currentcolor">本期</div>
              <div class="lastcurrent">去年同期</div>
            </div>
            <div class="select-item">
              <div class="index">1</div>
              <div class="add">船票收入</div>
              <div class="current">888</div>
              <div class="lastcurrent">888</div>
            </div>
            <div class="select-item">
              <div class="index">2</div>
              <div class="add">二消收入</div>
              <div class="current">888</div>
              <div class="lastcurrent">888</div>
            </div>
            <div class="select-item">
              <div class="index">2.1</div>
              <div class="add addIndet">餐饮收入</div>
              <div class="current">888</div>
              <div class="lastcurrent">888</div>
            </div>
            <div class="select-item">
              <div class="index">2.2</div>
              <div class="add addIndet">文化服务收入</div>
              <div class="current">888</div>
              <div class="lastcurrent">888</div>
            </div>
            <div class="select-item">
              <div class="index">3</div>
              <div class="add">场地运营收入</div>
              <div class="current">888</div>
              <div class="lastcurrent">888</div>
            </div>
            <div class="select-item">
              <div class="index">4</div>
              <div class="add">包船收入</div>
              <div class="current">888</div>
              <div class="lastcurrent">888</div>
            </div>
            <div class="select-item">
              <div class="index">5</div>
              <div class="add">旅游收入</div>
              <div class="current">888</div>
              <div class="lastcurrent">888</div>
            </div>
            <div class="select-item">
              <div class="index">6</div>
              <div class="add">退票手续费收入</div>
              <div class="current">888</div>
              <div class="lastcurrent">888</div>
            </div>
            <div class="select-item">
              <div class="index">7</div>
              <div class="add">其他收入</div>
              <div class="current">888</div>
              <div class="lastcurrent">888</div>
            </div>
          </div>
          <div class="table-box">
            <el-table
              size="mini"
              class="customer-no-border-table table-font-size"
              :header-cell-class-name="headerStyle"
              :header-cell-style="{ color: 'black', fontWeight: 'normal' }"
              :row-class-name="rowStyle"
              :cell-style="cellStyle"
              stripe
              :data="tableData"
              row-key="index"
              style="width: 100%"
              :tree-props="{ children: 'childList', hasChildren: 'hasChildren' }"
            >
              >
              <el-table-column align="center" prop="index" label="序号" min-width="40"> </el-table-column>
              <el-table-column prop="money" min-width="70" label="收入项"> </el-table-column>
              <el-table-column prop="base" min-width="50" align="center" label="本期"> </el-table-column>
              <el-table-column prop="last" min-width="60" align="center" label="去年同期"> </el-table-column>
            </el-table>
          </div>
        </template>
      </ContentBox>
    </div>

    <!-- 趋势 -->
    <ContentBox toplefttitle="趋势" toprighttitle="单位:万元">
      <template #content>
        <!-- fixed  start -->
        <div class="sign-type">
          <!-- 左侧start -->
          <div
            ref="singChart"
            class="type-chart"
            @touchend="
              (e) => {
                touchEnd(e, 'pieChart');
              }
            "
          ></div>
          <!-- 左侧 end 右侧 start -->
          <div class="estimate">
            <div
              v-for="(item, index) in estimateList"
              :key="index"
              :class="index === select ? 'selected' : ''"
              v-on:click="pieClick(index, item.name, estimateList.length)"
              class="estimate-item"
            >
              <div class="item-left">
                <div class="clo">
                  <span></span>
                </div>
                <div class="txt">{{ item.name }}</div>
              </div>
              <div class="item-right">
                <span class="right-number">{{ toFormat(item.value, true) }}</span>
                <span class="interval">/</span>
                <span class="unit">{{ item.number }}套</span>
              </div>
            </div>
          </div>
          <!-- 右侧 end -->
        </div>
        <!-- fixed  end -->
      </template>
    </ContentBox>
  </div>
</template>

<script>
// import echarts from 'echarts';
export default {
  name: 'materialSet',
  components: {},
  data() {
    return {
      singChart: null,
      select: '',
      selectList: [],
      dataIndex: 0,
      sumAmount: 0,
      sumAmount1: 0,
      sumCount: 0,
      estimateList: [
        { name: '本月可签', value: '', number: '' },
        { name: '本季可签', value: '', number: '' },
        { name: '本年可签', value: '', number: '' },
        { name: '年可签', value: '', number: '' },
        { name: '5年可签', value: '', number: '' },
        { name: '总可签', value: '', number: '' },
      ],
      colorlist: ['#ffaf00', '#ff9c00', '#8485ef', '#a8c9ff', '#d9d9d9', '#fed38f'],
      modledate: [
        {
          name: '视频广告',
          value: 23,
        },
        {
          name: '搜索引擎',
          value: 23,
        },
        {
          name: '招商邮轮',
          value: 23,
        },
        {
          name: '视频广告1',
          value: 23,
        },
        {
          name: '视频广告2',
          value: 23,
        },
      ],
      Id: 100,
      ismonthShow: true,
      tableData: [],
      data_dj: {
        xAxisData: ['8月1日', '8月2日', '8月2日', '8月2日', '8月2日', , '8月2日', '8月2日', '8月2日'],
        series: [
          {
            name: '二消收入',
            type: 'bar',
            unit: 'null',
            stack: 'bar',
            showlabel: false,
            data: [100, 220, 300, 440, 50, 60, 70],
            gradientRamp: ['#5E91FF'],
          },
          {
            name: '船票收入',
            type: 'bar',
            unit: 'null',
            stack: 'bar',
            showlabel: false,
            data: [10, 220, 300, 440, 50, 60, 70],
            borderRadius: [5, 5, 0, 0],
            gradientRamp: ['#FFC962'],
          },
          {
            //新的一个柱子 注意不设stack
            name: '',
            type: 'bar',
            stack: '',
            z: -1,
            barGap: '-100%', // 左移100%，stack不再与上面两个在一列
            labelShow: true,
            data: [22, 660, 600, 880, 100, 120, 140],
          },
        ],
      },
    };
  },
  created() {},
  mounted() {
    // this.pieChart = echarts.init(this.$refs.pieChart);
    this.singChart = this.$echarts.init(this.$refs.singChart);
    this.startChart();

    this.init();
  },
  methods: {
    /*
   mychart.dispatchAction({
    type:'' //可选值 highlight downplay
    seriesIndex:0 //值为当前实例中的图表index，可以接收一个数组
    dataIndex:0 //需要展示当前图表的第几个默认值
    name：string类型
    })
    // 默认展示当前的第一条数据
    mychart.dispathAction({
        type:'downplay',
        seriesIndex:[0,1],//两个图标同时展示
        dataIndex:0
   })
  开始鼠标的交互
  可以打印下 e 里面会有很多想要的东西
    mychart.on('mouseover',e=>{
        if(e.dataIndex != 0){
            mychart.dispathAction({
                type:'downplay',
                seriesIndex:e.componentIndex,
                dataIndex:0
          })
        }
    })
    mychart.on('mouseout',e=>{
            mychart.dispathAction({
                type:'highlight',
                seriesIndex:e.componentIndex,
                dataIndex:0
          })
    })







    */
    /* fixed start */
    init() {
      let params = {};
      this.getKcYjkq();
    },
    pieClick(index, name, length) {
      // 点击右侧 select 样式激活
      this.select = index;
      for (let i = 0; i < 4; i++) {
        this.singChart.dispatchAction({
          type: 'pieUnSelect',
          seriesIndex: [0],
          dataIndex: i,
        });
      }
      if (name === '本月可签') {
        this.singChart.dispatchAction({
          type: 'pieSelect',
          seriesIndex: 0,
          dataIndex: 0,
        });
      }
      if (name === '本季可签') {
        this.singChart.dispatchAction({
          type: 'pieSelect',
          seriesIndex: 0,
          dataIndex: 1,
        });
      }
      if (name === '本年可签') {
        this.singChart.dispatchAction({
          type: 'pieSelect',
          seriesIndex: 0,
          dataIndex: 2,
        });
      }

      if (name === '年可签') {
        this.singChart.dispatchAction({
          type: 'pieSelect',
          seriesIndex: 0,
          dataIndex: 3,
        });
      }
      if (name === '5年可签') {
        this.singChart.dispatchAction({
          type: 'pieSelect',
          seriesIndex: 0,
          dataIndex: 4,
        });
      }
      if (name === '总可签') {
        this.singChart.dispatchAction({
          type: 'pieSelect',
          seriesIndex: 0,
          dataIndex: 5,
        });
      }
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
    // 设置echarts
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
              { value: this.estimateList[0].value, name: '本月可签', itemStyle: { color: '#FF9800' }, emphasis: { itemStyle: { color: '#FF9800' } } },
              { value: this.estimateList[1].value, name: '本季可签', itemStyle: { color: '#8681F9' }, emphasis: { itemStyle: { color: '#8681F9' } } },
              { value: this.estimateList[2].value, name: '本年可签', itemStyle: { color: '#FF9800' }, emphasis: { itemStyle: { color: '#FF9800' } } },
              { value: this.estimateList[3].value, name: '年可签', itemStyle: { color: '#8681F9' }, emphasis: { itemStyle: { color: '#8681F9' } } },
              { value: this.estimateList[4].value, name: '5年可签', itemStyle: { color: '#8681F9' }, emphasis: { itemStyle: { color: '#8681F9' } } },
              { value: this.estimateList[5].value, name: '总可签', itemStyle: { color: '#8681F9' }, emphasis: { itemStyle: { color: '#8681F9' } } },
            ],
          },
          // {
          //   selectedMode: 'single',
          //   selectedOffset:0,
          //   name: '访问来源1',
          //   type: 'pie',
          //   radius: ['35%', '45%'],
          //   center: ['21%', '42%'],
          //   hoverAnimation: false,
          //   // avoidLabelOverlap: false,
          //   label: {
          //     show: false,
          //     position: 'center',
          //   },
          //   itemStyle: {
          //     // borderColor: '#fff',
          //     // borderWidth: 2
          //   },

          //   labelLine: {
          //     show: false,
          //   },
          //   data: [
          //     {
          //       value: this.estimateList[1].value,
          //       name: '本季可签',
          //       itemStyle: { color: '#FFB000' },
          //       emphasis: { itemStyle: { color: '#FFB000', borderType: '#000', shadowBlur: 10 } },
          //     },
          //     {
          //       value: this.sumAmount1 - this.estimateList[1].value,
          //       name: '总可签',
          //       itemStyle: { color: 'rgba(0, 0, 0, 0)' },
          //       emphasis: { itemStyle: { color: 'rgba(0, 0, 0, 0)', borderType: 'rgba(0, 0, 0, 0)', shadowBlur: 0 } },
          //     },
          //   ],
          // },
          // {
          //   selectedMode: 'single',
          //   selectedOffset: 5,
          //   name: '访问来源2',
          //   type: 'pie',
          //   radius: ['55%', '65%'],
          //   center: ['21%', '42%'],
          //   hoverAnimation: false,
          //   avoidLabelOverlap: false,
          //   label: {
          //     show: false,
          //     position: 'center',
          //   },
          //   itemStyle: {
          //     // borderColor: '#fff',
          //     // borderWidth: 2
          //   },

          //   labelLine: {
          //     show: false,
          //   },
          //   data: [
          //     { value: this.estimateList[0].value, name: '本月可签', itemStyle: { color: '#FFCC81' }, emphasis: { itemStyle: { color: '#FFCC81' } } },
          //     { value: this.sumAmount1 - this.estimateList[0].value, name: '总可签', itemStyle: { color: 'rgba(0, 0, 0, 0)' } },
          //   ],
          // },
        ],
        /* #FFCC81  #FFB000  #FF9800 #8681F9  #9EC9FF #D9D9D9 */
      };
      this.singChart.setOption(option);
      this.singChart.on('click', (arg) => {
        arg.event.event.cancleBubble = true;
        console.log(arg);
        for (let i = 0; i < 6; i++) {
          this.singChart.dispatchAction({
            type: 'pieUnSelect',
            seriesIndex: 0,
            dataIndex: i,
          });
          this.singChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: i,
          });
        }
        // window.event.cancelBubble = true;
        //  点击高亮
        this.singChart.dispatchAction({
          type: 'pieSelect',
          seriesIndex: 0,
          dataIndex: arg.dataIndex,
        });

        this.estimateList.forEach((item, index) => {
          this.select = '';
        });
        this.select = arg.dataIndex;
      });

      this.singChart.dispatchAction({
        type: 'pieSelect',
        seriesIndex: 0,
        dataIndex: 0,
      });
      this.select = 0;
    },
    // 单位处理
    toFormat(value, unit) {
      if (!value) return 0 + '万';
      if (isNaN(value)) return 0 + '万';
      let newVal = 0;

      if (value > 10000) {
        newVal = value / 10000;
        newVal = newVal.toFixed(1);
        unit === true ? (newVal = newVal + '亿') : '';
      } else {
        newVal = value.toFixed(1);
        unit === true ? (newVal = newVal + '万') : '';
      }
      return newVal;
    },
    // 获取预计可签
    getKcYjkq() {
      this.estimateList[0].value = 10;
      this.estimateList[0].number = 10;
      this.estimateList[1].value = 10;
      this.estimateList[1].number = 10;
      this.estimateList[2].value = 10;
      this.estimateList[2].number = 10;
      this.estimateList[3].value = 10;
      this.estimateList[3].number = 10;
      this.estimateList[4].value = 10;
      this.estimateList[4].number = 10;
      this.estimateList[5].value = 10;
      this.estimateList[5].number = 10;

      this.sumAmount = 1000;
      this.sumAmount1 = 1000;
      this.sumCount = 100;
      this.setSingChart();
    },
    /* fixed end */
    headerStyle({ row, column, rowIndex, columnIndex }) {
      return 'tableStyle';
    },
    rowStyle({ row, rowIndex }) {
      if (rowIndex % 2 != 0) {
        return 'tableStyle';
      } else {
        return 'tablebgStyle';
      }
    },
    handmonth(value) {
      this.ismonthShow = value;
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      // console.log(column, columnIndex);
      if (columnIndex == 2) {
        return 'color:#ff8710';
      } else if (columnIndex == 1) {
        return 'width:3.92857rem;';
      }
    },

    overlay() {
      this.startChart();
    },

    startChart() {
      this.$nextTick(() => {
        this.$refs['lineBar_dj']?.drawChart();
      });
    },
  },
  computed: {},
  watch: {
    ismonthShow: {
      immediate: true,
      handler(value) {
        if (value) {
          this.$nextTick(() => {
            this.$refs['lineBar_dj']?.drawChart();
          });
        }
      },
    },
  },
};
</script>

<style lang="scss">
.income {
  .sign-type {
    margin-top: 12px;
    // padding-top: 8px;
    position: relative;
    .type-chart {
      /*width: 60%;*/
      width: 100%;
      height: 210px;
    }
    .estimate {
      padding-top: 5px;
      box-sizing: border-box;
      position: absolute;
      right: 0;
      /*background: red;*/
      width: 58%;
      height: 100%;
      top: 0;
      .estimate-item {
        display: flex;
        height: 30px;
        line-height: 30px;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        padding: 0 5px 0 0;
        font-size: 12px;
        .item-left {
          // width: 50%;
          display: flex;
          .clo {
            width: 25px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
              width: 12px;
              height: 12px;
              display: inline-block;
              border-radius: 50%;
            }
          }
        }
        .item-right {
          width: 54%;
          font-weight: 600;
          text-align: right;
          white-space: nowrap;
          display: flex;
          justify-content: space-between;
          .right-number {
            display: inline-block;
            width: 55%;
            color: #fe7400;
            font-size: 14px;
            white-space: nowrap;
          }
          .interval {
            display: inline-block;
            width: 8%;
          }
          .unit {
            display: inline-block;
            width: 42%;
          }
        }
        // 选中的样式
        &.selected {
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
        }
        /*color:['#FFCC81','#FFB000','#FF9800','#8681F9','#9EC9FF','#D9D9D9'],*/

        &:nth-child(1) {
          .item-left {
            span {
              background: #ffcc81 !important;
            }
          }
        }
        &:nth-child(2) {
          .item-left {
            span {
              background: #ffb000 !important;
            }
          }
        }
        &:nth-child(3) {
          .item-left {
            span {
              background: #ff9800 !important;
            }
          }
        }
        &:nth-child(4) {
          .item-left {
            span {
              background: #8681f9 !important;
            }
          }
        }
        &:nth-child(5) {
          .item-left {
            span {
              background: #9ec9ff !important;
            }
          }
        }
        &:nth-child(6) {
          .item-left {
            span {
              background: #d9d9d9 !important;
            }
          }
        }
      }
    }
    .goRZQ {
      font-size: 12px;
      position: absolute;
      left: 8%;
      bottom: -5%;
      color: #000;
      font-weight: bold;
    }
    .tips {
    }
  }
  .modle-box {
    height: 256px;
    display: flex;
    .modle-right {
      width: 175px;
    }
    .modle-left {
      flex: 1;
      .tops {
        height: 160px;
      }
    }
  }

  .table-box {
    margin: 0 12px;
  }
  .el-table__empty-text {
    font-size: 12px !important;
    color: black !important;
  }
  .el-table__row--level-0 td:nth-child(1) {
    text-indent: 3px;
    text-align: left !important;
  }
  .money {
    width: 150px;
  }
  .tableindex {
    width: 50px;
  }
  .tableStyle {
    .cell {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }
  .table-font-size {
    font-size: 14px !important;
  }
  .el-table__row--level-1 .el-table__indent {
    padding-left: 0 !important;
  }
  .el-table .cell {
    padding-left: 0;
    padding-right: 0;
  }
}
.dj-echarts {
  height: 257px;
}
.select-wrap {
  height: 357px;
  box-sizing: border-box;
  padding: 20px 12px 0 12px;
}
.select-content {
  margin: 0 10px;
}
.select-item {
  color: #383838;
  display: flex;
  align-items: center;
  font-size: 14px;
  height: 32px;
  line-height: 32px;
  &:nth-of-type(2n) {
    background: white;
  }
  &:nth-of-type(2n + 1) {
    border-radius: 6px  6px  0px  0px;
    background: #f7f8fb;
  }
  .index {
    margin-left: 12px;
    width: 32px;
    text-indent: 11px;
  }
  .indet {
    text-indent: 0;
  }
  .add {
    padding-left: 20px;
    width: 140px;
  }
  .addIndet {
    padding-left: 42px;
  }
  .current {
    color: #ff8710;
    width: 32px;
    text-align: center;
  }
  .currentcolor {
    color: #383838;
  }
  .lastcurrent {
    flex: 1;
    text-align: center;
  }
}
.time-box {
  .time-picker {
    font-size: 14px;
    margin-bottom: 6px;
    display: flex;
    border: 1px solid #237cc4;
    border-radius: 4px;
    overflow: hidden;
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
.selection {
  padding: 6px 12px 0;
  margin-bottom: 8px;
  background: white;
  border-radius: 6px;
  .title {
    text-indent: 12px;
    font-size: 16px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &::before {
      content: '';
      width: 5px;
      height: 15px;
      border-radius: 2.5px;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      display: block;
      position: absolute;
      background: #ff8100;
    }
  }
}
.selection.first {
  margin-top: 8px;
  height: 208px;
}
.select-content {
  // position: relative;
  padding-bottom: 12px;
  padding-top: 6px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  height: 180px;
  .item {
    width: 157px;
    height: 77px;
    background: #f7f8fb;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .item-title {
    margin-top: 1px;
    color: #8b8b8b;
    font-size: 12px;
    height: 17px;
    line-height: 17px;
  }
  .item-value {
    height: 28px;
    line-height: 28px;
    color: #ff840a;
    font-size: 20px;
    span {
      font-size: 12px;
    }
  }
  // &::after {
  //   content: '';
  //   position: absolute;
  //   left: 50%;
  //   top: 44px;
  //   transform: translateX(-50%);
  //   display: block;
  //   width: 2px;
  //   height: 75px;
  //   opacity: 0.5;
  //   background: #fff;
  //   // border: 1px solid #979797;
  // }
  // .item {
  //   // position: absolute;
  //   &:nth-of-type(2n) {
  //     left: 205px;
  //   }
  //   // &:nth-child(2n) {
  //   //   left: 240px;
  //   // }
  //   &:nth-child(2n + 1) {
  //     left: 35px;
  //   }
  //   &:nth-child(1) {
  //     top: 20px;
  //   }
  //   &:nth-child(2) {
  //     top: 20px;
  //   }
  //   &:nth-child(3) {
  //     top: 97px;
  //   }
  //   &:nth-child(4) {
  //     top: 97px;
  //   }
  // }
}
</style>
