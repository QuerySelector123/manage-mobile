<template>
  <div style="heigth: 100%" class="selse">
    <div>
      <DateNavbar :selectShow="[true, true, true]" @income="handmonth"></DateNavbar>
      <ShipDropdown></ShipDropdown>
      <!-- 概況 -->
      <div class="salesBox profit-margin">
        <div class="general">
          <ContentBox toplefttitle="概況" :height="180">
            <template #content>
              <el-tooltip :content="message" placement="top-start" effect="dark" popper-class="atooltip">
                <div class="doubtImage">
                  <img :src="requImg" alt="" />
                </div>
              </el-tooltip>

              <div class="select-content">
                <div class="item">
                  <div class="item-value">88.88 <span>万/人</span></div>
                  <div class="item-title">单位人次销售额</div>
                </div>
                <div class="item">
                  <div class="item-value">8.21 <span>万/人</span></div>
                  <div class="item-title">船票客单价</div>
                </div>
                <div class="item">
                  <div class="item-value">288 <span>元/人</span></div>
                  <div class="item-title">二消客单价</div>
                </div>
                <div class="item">
                  <div class="item-value">80 <span>%</span></div>
                  <div class="item-title">船票销售率</div>
                </div>
              </div>
            </template>
          </ContentBox>
        </div>
      </div>
      <!-- 成本 -->
      <div class="costbox profit-margin">
        <ContentBox toplefttitle="收入" toprighttitle="单位:万元">
          <template #content>
            <div class="income">
              <SuperChart
                class="SuperChart"
                :show="ismonthShow"
                ref="lineBar_cost"
                styles="width:100%;height:100%"
                :color="['#5b8ef6', '#6bc3f4 ', '#ff9d39']"
                :fontColor="['#B71F20', '#111']"
                :lineStyle="{ width: 3 }"
                :yAxisLabelShowArr="[true, false]"
                :data="data_cost"
              ></SuperChart>
            </div>
          </template>
        </ContentBox>
      </div>

      <!-- 二消 -->
      <div class="costbox profit-margin">
        <ContentBox toplefttitle="二消" toprighttitle="单位:万元">
          <template #content>
            <div class="income">
              <div class="CirCleecharts">
                <CirclePieChart ref="ciclePieaway" styles="height:100%;width: 100%;" :data="circlePieData" roseType="radius" :radius="[22, 70]" />
              </div>
            </div>
          </template>
        </ContentBox>
      </div>
      <!-- 渠道 -->
      <div class="costbox profit-margin">
        <ContentBox toplefttitle="渠道" toprighttitle="单位:万元">
          <template #content>
            <div class="income">
              <div class="CirCleecharts">
                <div class="DloopBox">
                  <NetsDloop ref="Dloop" styles="height:100%;width: 100%;"></NetsDloop>
                </div>
                <!-- <CirclePieChart ref="ciclePie" styles="height:100%;width: 100%;" :data="circlePieData" roseType="radius" :radius="[22, 70]" /> -->
              </div>
            </div>
          </template>
        </ContentBox>
      </div>

      <!-- 票种 -->
      <div class="costbox profit-margin">
        <ContentBox toplefttitle="票种" toprighttitle="单位:张">
          <template #content>
            <div class="ticket">
              <div class="CirCleecharts">
                <CirclePieChart ref="ticket" styles="height:100%;width: 100%;" :data="ticketData" roseType="radius" :radius="[22, 70]" />
              </div>
              <div>
                <SuperChart
                  ref="tickettwo"
                  styles="width:100%;height:100%"
                  :color="['#5A8CF6 ', '#FF8100 ']"
                  :fontColor="['#B71F20', '#111']"
                  :lineStyle="{ width: 2 }"
                  :yAxisLabelShowArr="[true, false]"
                  :data="ticketTwo"
                ></SuperChart>
              </div>
            </div>
          </template>
        </ContentBox>
      </div>
      <!-- 主題产品 -->
      <div class="salesBox profit-margin">
        <div class="general">
          <ContentBox toplefttitle="主題产品" :height="180">
            <template #content>
              <div class="select-content">
                <div class="item">
                  <div class="item-value">88.88 <span>张</span></div>
                  <div class="item-title">净售票量</div>
                </div>
                <div class="item">
                  <div class="item-value">8.21 <span>元</span></div>
                  <div class="item-title">净销售额</div>
                </div>
                <div class="item">
                  <div class="item-value">288 <span>元</span></div>
                  <div class="item-title">溢价部分金额</div>
                </div>
                <div class="item">
                  <div class="item-value">80 <span>元</span></div>
                  <div class="item-title">船票部分金额</div>
                </div>
              </div>
            </template>
          </ContentBox>
        </div>
      </div>

      <!-- 性别 -->
      <div class="salesBox profit-margin">
        <div class="general">
          <ContentBox toplefttitle="性别" :height="180">
            <template #content>
              <div class="salesBox-gender">
                <div class="salesBox-item">
                  <div class="salesBox-item-left">
                    <img src="../../../assets/img/male.png" alt="" />
                  </div>
                  <div class="salesBox-item-right">
                    <div class="item-top">888 <span>人</span></div>
                    <div class="item-bottom">15%</div>
                  </div>
                </div>
                <div class="salesBox-item">
                  <div class="salesBox-item-left">
                    <img src="../../../assets/img/female.png" alt="" />
                  </div>
                  <div class="salesBox-item-right">
                    <div class="item-top">888 <span>人</span></div>
                    <div class="item-bottom">15%</div>
                  </div>
                </div>
                <div class="salesBox-item">
                  <div class="salesBox-item-left">
                    <img src="../../../assets/img/Theunknown.png" alt="" />
                  </div>
                  <div class="salesBox-item-right">
                    <div class="item-top">888 <span>人</span></div>
                    <div class="item-bottom">15%</div>
                  </div>
                </div>
              </div>
            </template>
          </ContentBox>
        </div>
      </div>

      <!-- 年龄 -->
      <div class="salesBox profit-margin">
        <div class="general">
          <ContentBox toplefttitle="年龄" :height="180">
            <template #content>
              <div class="income">
                <div class="CirCleecharts">
                  <CirclePieChart ref="ciclePie" styles="height:100%;width: 100%;" :data="circlePieData" roseType="radius" :radius="[22, 70]" />
                </div>
                <div>
                  <!-- <CopiesCHart ref="CHart " style="height:100%;width: 100%;"></CopiesCHart> -->
                </div>
              </div>
            </template>
          </ContentBox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   概況？圖片
      requImg: require('../../../assets/img/doubt.png'),
      //    概況？提示文
      message: '二消收入：湾区游的船上消费收入   单位人次收入：整体收入除以船票净售票数',
      ismonthShow: true,

      //   收入
      data_cost: {
        xAxisData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        series: [
          {
            name: '其他销售额',
            type: 'bar',
            unit: 'null',
            stack: 'cost',
            showlabel: false,
            gradientRamp: ['#7da8f7'],

            data: [10000, 12000, 10000, 13000, 14000, 15000, 16000, 17000, 18000, 13000, 14000, 12000],
          },
          {
            name: '二消销售额',
            type: 'bar',
            unit: 'null',
            stack: 'cost',
            showlabel: false,
            gradientRamp: ['#54cff4'],
            borderRadius: [2, 2, 0, 0],
            data: [10000, 12000, 10000, 13000, 14000, 15000, 16000, 17000, 18000, 13000, 14000, 12000],
          },
          {
            name: '船票销售额',
            type: 'bar',
            unit: 'null',
            stack: 'cost',
            showlabel: false,
            gradientRamp: ['#ffc059'],
            borderRadius: [2, 2, 0, 0],
            data: [10000, 12000, 10000, 13000, 14000, 15000, 16000, 17000, 18000, 13000, 14000, 12000],
          },
        ],
      },
      // 年龄饼图
      circlePieData: [
        { value: 1048, name: '搜索引擎' },
        { value: 735, name: '直接访问' },
        { value: 580, name: '邮件营销' },
        { value: 484, name: '联盟广告' },
        { value: 484, name: '联盟广告' },
        { value: 484, name: '联盟广告' },
        { value: 484, name: '联盟广告' },
      ],
      ticketData: [
        { value: 1048, name: '搜索引擎' },
        { value: 735, name: '直接访问' },
        { value: 580, name: '邮件营销' },
      ],
      ticketTwo: {
        xAxisData: ['领队', '贵宾票', '业务票', '免费儿票'],
        series: [
          {
            name: '',
            type: 'bar',
            unit: 'null',
            stack: 'cost',
            showlabel: false,
            gradientRamp: ['#5A8CF6'],
            data: [10000, 12000, 10000, 13000],
            barWidth: '9',
            label: {
              rotae: 60,
            },
          },
        ],
      },
      // xAxisData: [],
    };
  },
  mounted() {
    this.startChart();
  },
  methods: {
    handmonth(value) {
      console.log(value);
    },
    // 封装各个模块的图标调用函数
    startChart() {
      this.$nextTick(() => {
        this.$refs['lineBar_cost']?.drawChart();
        this.$refs['ciclePie']?.drawChart();
        this.$refs['ciclePieaway']?.drawChart();
        this.$refs['Dloop']?.StartChart();
        this.$refs['ticket']?.drawChart();
        this.$refs['tickettwo'].drawChart();
        // this.$refs['CHart'].copiesCHartAdd();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.profit-margin {
  margin-top: 8px;
}
.sales {
  .salesBox {
    height: 100%;
    & > .general {
      height: 208px;
      margin-top: 8px;
      position: relative;
      .content-box {
        margin-top: 8px;
      }
      .border {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 2px;
        height: 75px;
        opacity: 0.5;
        border-right: 1px solid #979797;
        transform: translate(-50%, -50%);
      }
    }
  }
}
.salesBox .salesBox-gender {
  height: 110px;
  display: flex;
  padding: 0 15px;
  justify-content: space-between;
  align-items: center;
  .salesBox-item {
    display: flex;
    .salesBox-item-left {
      img {
        width: 42px;
      }
    }
    .salesBox-item-right {
      .item-top {
        font-size: 20px;
        color: #ff952d;
        span {
          font-size: 12px;
        }
      }
      .item-bottom {
        margin: 8px 0 0 15px;
        font-size: 12px;
        color: #9f9f9f;
      }
    }
  }
}
.income {
  height: 235px;
  .SuperChart {
    margin-top: 12px;
  }
}
.ticket {
  // height: ;
}
.el-tooltip.doubtImage {
  position: absolute;
  top: 87px;
  left: 63px;
  img {
    width: 14px;
  }
}
</style>
