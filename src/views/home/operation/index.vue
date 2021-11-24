<template>
  <div class="operation">
    <!-- <div id="Loading">
      <div class="loader-inner ball-beat">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div> -->

    <!-- <DateNavbar></DateNavbar> -->
    <!-- 航班次下拉框 -->
    <!-- <ShipDropdown></ShipDropdown> -->
    <Navbar></Navbar>
    <!-- 航班运营 -->
    <div class="mb mt">
      <ContentBox toplefttitle="航班运营">
        <template #content>
          <div class="shipbox">
            <div class="echart-box">
              <thedashBoard title="计划航班完成率" ref="shipecharts"></thedashBoard>
            </div>
            <div class="passeng-bottom">
              <div class="passeng-item">
                <div class="passeng-title">计划航班数</div>
                <div class="passeng-content">888班次</div>
              </div>
              <div class="passeng-item">
                <div class="passeng-title">运营理财</div>
                <div class="passeng-content">888海里</div>
              </div>
              <div class="passeng-item">
                <div class="passeng-title">营运率</div>
                <div class="passeng-content">888%</div>
              </div>
              <div class="passeng-item">
                <div class="passeng-title">运营航班数</div>
                <div class="passeng-content">888班次</div>
              </div>
              <div class="passeng-item">
                <div class="passeng-title">单位海里油耗</div>
                <div class="passeng-content">888升</div>
              </div>
              <div class="passeng-item">
                <div class="passeng-title">准时率</div>
                <div class="passeng-content">88%</div>
              </div>
            </div>
          </div>
        </template>
      </ContentBox>
    </div>
    {{ this.$store.state.general.pullShow }}
    <!-- <Loading></Loading> -->
    <!-- 客流上座率 -->
    <div class="mb">
      <ContentBox toplefttitle="客流&上座率" toprighttitle="单位:人次">
        <template #content>
          <div class="university-echart">
            <SuperChart
              :show="true"
              ref="university-echart"
              styles="width:100%;height:100%"
              :yAxisNameArr="['人次', '%']"
              :color="['#b9b9f4', '#FF9933']"
              :fontColor="['#B71F20', '#111']"
              barWidth="22"
              lineSymbol="circle"
              :yAxisLabelShowArr="[true, true]"
              :data="university_data"
            ></SuperChart>
          </div>
        </template>
      </ContentBox>
    </div>

    <!-- 贡献 -->
    <div class="mb">
      <ContentBox toplefttitle="客流贡献" toprighttitle="单位:人次">
        <template #content>
          <div class="table-box">
            <!-- flex start -->
            <div class="table-wrap">
              <div class="table-box1">
                <div class="table-header">
                  <div class="table-row">
                    <div class="left">航次</div>
                    <div class="center">人次</div>
                    <div class="right">占比</div>
                  </div>
                </div>
                <div class="table-content" @scroll="scroll" :class="{ scrolly: tableData.length > 6 }">
                  <div v-if="tableData.length > 0">
                    <div class="table-row" ref="table-row" v-for="(item, index) in tableData" :key="'key' + index">
                      <div class="left">{{ item.name }}</div>
                      <div class="center">{{ item.money }}</div>
                      <div class="right">{{ item.prent }}</div>
                    </div>
                  </div>
                  <div v-else class="table-notable flex">暂无数据</div>
                </div>
              </div>
              <div class="table-tips table-row" v-if="tableData.length > 6">
                <div class="flex">{{ tips }}</div>
              </div>
            </div>
            <!-- flex end -->
          </div>
        </template>
      </ContentBox>
    </div>
  </div>
</template>

<script>
export default {
  name: 'operation',
  data() {
    return {
      tips: '已经到底了',
      university_data: {
        xAxisData: ['7:30', '9:50', '11:00', '14:00', '16:00', '18:30', '20:00'],
        series: [
          {
            name: '客流',
            type: 'bar',
            unit: '客流',
            toFixed: 2,
            showlabel: false,
            data: [400, 200, 300, 500, 180, 200, 180],
            borderRadius: [25, 25, 0, 0],
            gradientRamp: ['#8d8df1'],
          },
          {
            name: '上座率',
            type: 'line',
            unit: null,
            toFixed: 2,
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
      passeng_date: [
        { value: 104, name: ' 16:00' },
        { value: 735, name: '港珠澳 14:00' },
        { value: 580, name: '港珠澳 18:00' },
        { value: 484, name: '港珠澳 09:00' },
        { value: 300, name: '港珠澳 11:00' },
        { value: 300, name: '港珠澳 12:00' },
        { value: 350, name: '港珠澳 20:00' },
        { value: 304, name: '港珠澳 22:00' },
        { value: 303, name: '港珠澳 23:00' },
        { value: 300, name: '港珠澳 11:00' },
        { value: 300, name: '港珠澳 12:00' },
        { value: 350, name: '港珠澳 20:00' },
        { value: 304, name: '港珠澳 22:00' },
        { value: 303, name: '港珠澳 23:00' },
      ],
      tableData: [
        {
          name: '珠港澳 港珠澳红红惚惚哈哈18:00',
          money: 1000,
          prent: '40%',
        },
        {
          name: '珠港澳 18:00',
          money: 1000,
          prent: '40%',
        },
        {
          name: '珠港澳 18:00',
          money: 1000,
          prent: '40%',
        },
        {
          name: '珠港澳 18:00',
          money: 1000,
          prent: '40%',
        },
        {
          name: '珠港澳 18:00',
          money: 1000,
          prent: '40%',
        },
        {
          name: '珠港澳 18:00',
          money: 1000,
          prent: '40%',
        },
        {
          name: '珠港澳 18:00',
          money: 1000,
          prent: '40%',
        },
        {
          name: '珠港澳 18:00',
          money: 1000,
          prent: '40%',
        },
        {
          name: '珠港澳 18:00',
          money: 1000,
          prent: '40%',
        },
      ],
    };
  },
  mounted() {
    this.startChart();

    window.addEventListener('scroll', this.scrollToTop);
  },
  methods: {
    // flex start
    scroll(event) {
      let scrolltop = event.target.scrollTop;
      let height = this.$refs['table-row'][0].offsetHeight;
      if (scrolltop > height * (this.tableData.length - 6) + 10) {
        this.tips = '已经到底了~';
      } else {
        this.tips = '还没有到底~';
      }
    },
    // flex end
    startChart() {
      this.$nextTick(() => {
        this.$refs['university-echart'].drawChart();
        // this.$refs['passengerChart'].drawChart();
        this.$refs['shipecharts'].StartChart();
      });
    },
  },
  created() {
    // document.body.removeChild(document.getElementById('Loading'));
  },
};
</script>

<style lang="scss">
// #Loading {
//   top: 50%;
//   left: 50%;
//   position: absolute;
//   -webkit-transform: translateY(-50%) translateX(-50%);
//   transform: translateY(-50%) translateX(-50%);
//   z-index: 100;
// }
// @-webkit-keyframes ball-beat {
//   50% {
//     opacity: 0.2;
//     -webkit-transform: scale(0.75);
//     transform: scale(0.75);
//   }

//   100% {
//     opacity: 1;
//     -webkit-transform: scale(1);
//     transform: scale(1);
//   }
// }

// @keyframes ball-beat {
//   50% {
//     opacity: 0.2;
//     -webkit-transform: scale(0.75);
//     transform: scale(0.75);
//   }

//   100% {
//     opacity: 1;
//     -webkit-transform: scale(1);
//     transform: scale(1);
//   }
// }

// .ball-beat > div {
//   background-color: #5d9bff;
//   width: 15px;
//   height: 15px;
//   border-radius: 100% !important;
//   margin: 2px;
//   -webkit-animation-fill-mode: both;
//   animation-fill-mode: both;
//   display: inline-block;
//   -webkit-animation: ball-beat 0.7s 0s infinite linear;
//   animation: ball-beat 0.7s 0s infinite linear;
// }
// .ball-beat > div:nth-child(2n-1) {
//   -webkit-animation-delay: 0.35s !important;
//   animation-delay: 0.35s !important;
// }

.passeng-box {
  height: 257px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.passeng-bottom {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  & > div {
    flex: 30%;
    text-align: center;
    &:nth-child(-n + 3) {
      // margin-bottom: 14px;
    }
    &:nth-child(2),
    &:nth-child(5) {
      // padding-bottom: 28px;
      margin: 0;
    }
  }
  .passeng-item {
    margin: 5px;
    background: #ebeef5;
  }
  .passeng-title {
    font-size: 14px;
    height: 20px;
    line-height: 20px;
  }
  .passeng-content {
    height: 20px;
    line-height: 20px;
    color: #ff840a;
    font-size: 14px;
  }
}
.echart-box {
  height: 160px;
}
.shipbox {
  // height: 257px;
}
.passeng-box {
  // height: 257px;
}
.university-echart {
  height: 236px;
}
.operation {
  // flex start
  .table-wrap {
    height: 253px;
  }
  .table-box1 {
    color: #383838;
    margin: 12px 12px 0 12px;
    font-size: 12px;
    border: 1px solid #f7f8fb;
  }
  .flex {
    width: 100%;
    text-align: center;
  }
  .table-header {
    background: #fafafa;
  }
  .table-row {
    min-height: 36px;
    display: flex;
    align-items: center;
    text-align: center;
    .left {
      width: 122px;
      word-break: break-all;
    }
    .center,
    .right {
      flex: 1;
    }
  }
  .table-content {
    overflow: hidden;

    .table-row:nth-child(2n) {
      background: #fafafa;
    }
    .table-notable {
      display: flex;
      height: 204px;
      justify-content: center;
      align-items: center;
    }
  }
  .scrolly {
    height: 180px;
    overflow-y: scroll;
  }
}
</style>
