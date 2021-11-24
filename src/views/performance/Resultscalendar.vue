<!--
 * @Author: your name
 * @Date: 2021-10-14 11:38:36
 * @LastEditTime: 2021-10-15 11:27:05
 * @LastEditors: [Dushuai]
 * @Description: In User Settings Edit
 * @FilePath: \manage-mobile\src\views\performance\Resultscalendar.vue
-->
<template>
  <div class="resultalender">
    <div class="calendar">
      <img src="../../assets/img/rli.png" alt="" srcset="" @click="show = true" />
      <!-- <img src="" alt=""> -->
    </div>
    <!-- <van-cell title="选择日期区间" /> -->
    <van-calendar v-model="show" type="range" @confirm="onConfirm" />

    <!--  -->
    <div class="performance">
      <!-- <stickHeader></stickHeader> -->
      <!-- 经营总览 -->
      <!-- 概览 -->
      <div class="mb mt">
        <ContentBox toplefttitle="经营总览">
          <template #content>
            <div class="manage manageheight before">
              <div class="row">
                <div class="item">
                  <div class="manage-value">8888 <span>人</span></div>
                  <div class="manage-title">客流</div>
                </div>
                <div class="item">
                  <div class="manage-value">88.88 <span>万元</span></div>
                  <div class="manage-title">销售额</div>
                </div>
              </div>
              <div class="row">
                <div class="item">
                  <div class="manage-value">188 <span>元</span></div>
                  <div class="manage-title">单位人次销售额</div>
                </div>
                <div class="item">
                  <div class="manage-value">88.88 <span>%</span></div>
                  <div class="manage-title">船票销售率</div>
                </div>
              </div>
              <div class="row">
                <div class="item">
                  <div class="manage-value">988 <span>班次</span></div>
                  <div class="manage-title">计划航班数</div>
                </div>
                <div class="item">
                  <div class="manage-value">888 <span>班次</span></div>
                  <div class="manage-title">运营航班数</div>
                </div>
              </div>
              <div class="row">
                <div class="item">
                  <div class="manage-value">18 <span>%</span></div>
                  <div class="manage-title">计划航班完成率</div>
                </div>
                <div class="item">
                  <div class="manage-value">88 <span>%</span></div>
                  <div class="manage-title">准点率</div>
                </div>
              </div>
              <div class="row">
                <div class="item">
                  <div class="manage-value">188 <span>海里</span></div>
                  <div class="manage-title">运营里程</div>
                </div>
                <div class="item">
                  <div class="manage-value">888 <span>升</span></div>
                  <div class="manage-title">单位海里油耗</div>
                </div>
              </div>
            </div>
          </template>
        </ContentBox>
      </div>
      <!-- 上座率 -->
      <!-- 客流上座率 -->
      <div class="mb">
        <ContentBox toplefttitle="客流&上座率" toprighttitle="单位:人次">
          <template #content>
            <div class="university-echart">
              <SuperChart
                :show="true"
                ref="university-echarts"
                styles="width:100%;height:100%"
                :yAxisNameArr="['人次', '%']"
                :color="['#b9b9f4', '#FF9933']"
                :fontColor="['#B71F20', '#111']"
                :lineStyle="{ width: 3 }"
                barWidth="22"
                lineSymbol="circle"
                :yAxisLabelShowArr="[true, true]"
                :data="university_datas"
              ></SuperChart>
            </div>
          </template>
        </ContentBox>
      </div>
      <!-- 销售额 -->
      <div class="mb">
        <ContentBox toplefttitle="销售额" toprighttitle="单位:元">
          <template #content>
            <div class="sale-echart">
              <BarLeftChart ref="salechart" styles="height:100%;width: 100%;" :date="saledata" :yAxisData="saleyAxisdata"></BarLeftChart>
            </div>
          </template>
        </ContentBox>
      </div>
      <!-- 二消 -->
      <div class="mb">
        <ContentBox toplefttitle="二消" toprighttitle="单位:万元">
          <template #content>
            <div class="secoedaway">
              <CirclePieChart ref="secondPie" styles="height:100%;width: 100%;" :data="secondPieData" :radius="[40, 80]" />
            </div>
          </template>
        </ContentBox>
      </div>
      <!-- 渠道 -->
      <div class="mb">
        <ContentBox toplefttitle="渠道">
          <template #content>
            <div class="channel-box">
              <NetsDloop ref="channel" :data2="outdata" :data1="indata"></NetsDloop>
            </div>
          </template>
        </ContentBox>
      </div>

      <!-- 票种 -->
      <div class="mb">
        <ContentBox toplefttitle="票种" toprighttitle="单位:张">
          <template #content>
            <div class="ticket">
              <div class="ticket-pie">
                <CirclePieChart ref="ticketPie" :color="ticketColor" styles="height:100%;width: 100%;" :data="ticketPieData" :radius="[40, 60]" />
              </div>
              <div class="ticket-box">
                <BarLeftChart ref="ticketchart" styles="height:100%;width: 100%;" :date="ticketdata" :yAxisData="ticketyAxisdata"></BarLeftChart>
              </div>
            </div>
          </template>
        </ContentBox>
      </div>

      <!-- 主题产品 -->

      <div class="mb">
        <ContentBox toplefttitle="主题产品">
          <template #content>
            <div class="manage themeheight">
              <div class="row">
                <div class="item">
                  <div class="manage-value">8888 <span>张</span></div>
                  <div class="manage-title">净售票量</div>
                </div>
                <div class="item">
                  <div class="manage-value">888 <span>元</span></div>
                  <div class="manage-title">销售额</div>
                </div>
              </div>
              <div class="row">
                <div class="item">
                  <div class="manage-value">188 <span>元</span></div>
                  <div class="manage-title">溢价部分金额</div>
                </div>
                <div class="item">
                  <div class="manage-value">88 <span>元</span></div>
                  <div class="manage-title">船票部分金额</div>
                </div>
              </div>
            </div>
          </template>
        </ContentBox>
      </div>

      <!-- 性别 -->
      <div class="mb">
        <ContentBox toplefttitle="性别">
          <template #content>
            <div class="salesBox-gender">
              <div class="salesBox-item">
                <div class="salesBox-item-left">
                  <img src="../../assets/img/male.png" alt="" />
                </div>
                <div class="salesBox-item-right">
                  <div class="item-top">888 <span>人</span></div>
                  <div class="item-bottom">15%</div>
                </div>
              </div>
              <div class="salesBox-item">
                <div class="salesBox-item-left">
                  <img src="../../assets/img/female.png" alt="" />
                </div>
                <div class="salesBox-item-right">
                  <div class="item-top">888 <span>人</span></div>
                  <div class="item-bottom">15%</div>
                </div>
              </div>
              <div class="salesBox-item">
                <div class="salesBox-item-left">
                  <img src="../../assets/img/Theunknown.png" alt="" />
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
      <!-- 年龄 -->
      <div class="mb">
        <ContentBox toplefttitle="年龄" toprighttitle="单位:人">
          <template #content>
            <div class="age-box">
              <CirclePieChart :color="agecolor" ref="agePie" styles="height:100%;width: 100%;" :data="agePieData" :radius="[40, 80]" />
            </div>
          </template>
        </ContentBox>
      </div>
      <!-- 省市 -->
      <div class="mb">
        <ContentBox toplefttitle="省市">
          <template #content>
            <div class="province-box">
              <div class="provice-echarts">
                <CirclePieChart
                  :labeLpadding="[0, -20]"
                  ref="provicePie"
                  :grid="provicegrid"
                  styles="height:100%;width: 100%;"
                  :data="provicePieData"
                  :center="['50%', '40%']"
                  :radius="[40, 60]"
                />
              </div>
              <div class="provice-bar">
                <SuperChart
                  :show="ismonthShow"
                  ref="provice_bar"
                  styles="width:100%;height:100%"
                  :yAxisNameArr="['', '']"
                  :legendShow="false"
                  :color="['#7BBEFF']"
                  :fontColor="['#B71F20']"
                  :lineStyle="{ width: 3 }"
                  barWidth="14"
                  :labelShow="false"
                  :yAxisNameShowArr="[true, false]"
                  :yAxisLabelShowArr="[true, false]"
                  :data="data_dj"
                ></SuperChart>
              </div>
            </div>
          </template>
        </ContentBox>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data_dj: {
        xAxisData: ['深圳', '广州', '东莞', '惠州', '中山', '珠海', '其他'],
        series: [
          {
            name: '省市',
            type: 'bar',
            unit: 'null',
            showlabel: false,
            data: [100, 220, 330, 440, 100, 900, 880, 990],
            borderRadius: [14, 14, 0, 0],
            gradientRamp: ['#5E91FF'],
          },
        ],
      },
      ismonthShow: true,
      show: false,
      saledata: [200, 400, 600, 800],
      ticketdata: [200, 400, 600, 800],
      saleyAxisdata: ['船票', '包船', '二消', '场地运营'],
      ticketyAxisdata: ['领队', '贵宾票', '业务票', '免费儿童 '],
      indata: [
        { value: '60', name: '直销' },
        { value: '20', name: '未分类' },
        { value: '20', name: '分销' },
      ],
      outdata: [
        { value: '20', name: '线上自售' },
        { value: '20', name: '现场售票' },
        { value: '20', name: '线下团队' },
        { value: '20', name: '未分类' },
        { value: '20', name: '线下代理' },
      ],
      university_datas: {
        xAxisData: ['7:30', '9:50', '11:00', '14:00', '16:00', '18:30', '20:00'],
        series: [
          {
            name: '客流',
            type: 'bar',
            unit: '客流',

            showlabel: false,
            data: [400, 200, 300, 500, 180, 200, 180],
            borderRadius: [25, 25, 0, 0],
            gradientRamp: ['#8d8df1'],
          },
          {
            name: '上座率',
            type: 'line',
            unit: null,
            showlabel: false,
            data: [520, 220, 320, 520, 200, 220, 180],
            lineStyle: {
              color: '#ffc060',
            },

            borderWidth: 10,
            borderColor: 'rgba(255, 192, 96, 0.4)',
          },
        ],
      },
      secondPieData: [
        { value: '60', name: '文创' },
        { value: '20', name: '魔术' },
        { value: '20', name: '餐饮' },
        { value: '20', name: '摄影' },
      ],
      ticketPieData: [
        { value: '40', name: '买断票' },
        { value: '20', name: '特殊票种' },
        { value: '20', name: '常规票种1' },
        { value: '20', name: '常规票种' },
        { value: '20', name: '兑换券' },
      ],
      ticketColor: ['#58A3FB', '#8D8DF1', '#C4D3F7', '#FF9F39', '#7CA5FE', '#5581F0'],
      agePieData: [
        { value: '180', name: '18-30岁' },
        { value: '160', name: '12-18岁' },
        { value: '140', name: '30-45岁' },
        { value: '120', name: '45-60岁' },
        { value: '100', name: '60岁以上' },
        { value: '80', name: '6-12岁' },
        { value: '60', name: '6岁以下' },
      ],
      provicePieData: [
        { value: '20', name: '上海' },
        { value: '20', name: '广西' },
        { value: '20', name: '广东' },
      ],
      provicegrid: {
        left: '20%',
        top: '5%',
        bottom: '40%',
        right: '20%',
      },
      agecolor: ['#5581F0', '#7EA9FD', '#B6B6F4', '#C1D0F7', '#FF9933', '#FFCF9F', '#FEDC5D'],
    };
  },
  methods: {
    onConfirm(date) {
      const [start, end] = date;
      this.show = false;
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs['channel'].StartChart();
      this.$refs['university-echarts'].drawChart();
      this.$refs['secondPie'].drawChart();
      this.$refs['ticketPie'].drawChart();
      this.$refs['salechart'].StartChart();
      this.$refs['ticketchart'].StartChart();
      this.$refs['agePie'].drawChart();
      this.$refs['provicePie'].drawChart();
      this.$refs['provice_bar'].drawChart();
    });
  },
  created() {},
};
</script>

<style lang="scss">
.resultalender {
  padding: 0 10px;
  .calendar {
    height: 25px;
    background: #1080ca;
    text-align: right;
    img {
      width: 22px;
      margin-right: 10px;
    }
  }
}
.performance {
  .provice-bar {
    height: 158px;
    margin: 0 12px;
    border-radius: 6px;
    background: #f8fafe;
    box-shadow: 0px 2px 4px 0px #e6effc;
    border: 1px solid #e6effc;
  }
  .province-box {
    height: 330px;
  }
  .age-box {
    height: 257px;
  }
  .provice-echarts {
    height: 152px;
  }
  .salesBox-gender {
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
  .sale-echart {
    height: 203px;
  }
  .ticket-box {
    margin: 0 12px;
    border-radius: 6px;
    height: 116px;
    background: #f8fafe;
    box-shadow: 0px 2px 4px 0px #e6effc;
    border: 1px solid #e6effc;
  }
  .ticket {
    height: 314px;
    .ticket-pie {
      height: 183px;
    }
  }
  .secoedaway {
    height: 257px;
  }
  .before {
    &::before {
      position: absolute;
      content: '';
      display: block;
      height: 175px;
      top: 92px;
      width: 0.5px;
      background: #979797;
      left: 176px;
      // left: 50%;
      // transform: translateX(-50%);
    }
  }
  .manageheight {
    height: 364px;
  }
  .themeheight {
    height: 180px;
  }
  .manage {
    position: relative;

    .row {
      position: relative;
      .item {
        position: absolute;
        &:nth-child(1) {
          left: 53px;
        }
        &:nth-child(2) {
          left: 240px;
        }
      }
      &:nth-child(1) {
        .item {
          top: 20px;
        }
      }
      &:nth-child(2) {
        .item {
          top: 84px;
        }
      }
      &:nth-child(3) {
        .item {
          top: 153px;
        }
      }
      &:nth-child(4) {
        .item {
          top: 222px;
        }
      }
      &:nth-child(5) {
        .item {
          top: 291px;
        }
      }
    }
    .item {
      text-align: left;
      .manage-value {
        color: #ff840a;
        font-weight: Medium;
        height: 28px;
        font-size: 20px;
        span {
          font-size: 12px;
        }
      }
      .manage-title {
        font-size: 12px;
        color: #8b8b8b;
      }
    }
  }
  .channel-box {
    height: 257px;
  }
}
</style>
