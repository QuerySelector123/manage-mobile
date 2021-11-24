<template>
  <div class="theoverview">
    <div class="yearsItemConter" @click="yearsClick">
      {{ yearsItem }}
      <i class="el-icon-caret-bottom"></i>
    </div>
    <!-- 月 与 年 的下拉 -->
    <van-popup position="bottom" v-model="monthshow">
      <van-datetime-picker
        @confirm="confirm"
        @cancel="cancel"
        v-model="currentDate"
        type="year-month"
        title="选择年月"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
      />
    </van-popup>

    <!-- 客流模块 -->
    <div class="profit-margin">
      <ContentBox toplefttitle="客流">
        <template #content>
          <div class="costof">
            <div class="echart-box">
              <thedashBoard title="本年目标完成率" ref="shipecharts"></thedashBoard>
            </div>

            <div class="thedashCenter">
              <div class="item">
                <div class="item-title">本月客流量</div>
                <div class="trafficwas">1.8万人次</div>
                <div class="with">
                  同比
                  <img src="../../../assets/img/shangsheng.png" alt="" srcset="" />
                  <span>13%</span>
                </div>

                <div class="sequential">
                  环比
                  <img src="../../../assets/img/shangsheng.png" alt="" srcset="" />
                  <span>13%</span>
                </div>
              </div>
              <div class="item">
                <div class="item-title">本季客流量</div>
                <div class="trafficwas">1.8万人次</div>
                <div class="with">
                  同比
                  <img src="../../../assets/img/xiajiang.png" alt="" srcset="" />
                  <span>13%</span>
                </div>
                <div class="sequential">
                  环比
                  <img src="../../../assets/img/xiajiang.png" alt="" srcset="" />
                  <span>13%</span>
                </div>
              </div>
              <div class="item">
                <div class="item-title">本年客流量</div>
                <div class="trafficwas">1.8万人次</div>
                <div class="with">
                  同比
                  <img src="../../../assets/img/shangsheng.png" alt="" srcset="" />
                  <span>13%</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </ContentBox>
    </div>

    <!-- 销售额模块 -->
    <div class="profit-margin">
      <ContentBox toplefttitle="销售额">
        <template #content>
          <div class="costof">
            <div class="echart-box">
              <thedashBoard title="本年目标完成率" ref="shipechartsTwo"></thedashBoard>
            </div>
            <div class="thedashCenter">
              <!-- 本月客流量 -->
              <div class="item">
                <div class="item-title">本月客流量</div>
                <div class="trafficwas">1.8万人次</div>
                <div class="with">
                  同比
                  <img src="../../../assets/img/shangsheng.png" alt="" srcset="" />
                  <span>13%</span>
                </div>

                <div class="sequential">
                  环比
                  <img src="../../../assets/img/shangsheng.png" alt="" srcset="" />
                  <span>13%</span>
                </div>
              </div>
              <!-- 本季客流量 -->
              <div class="item">
                <div class="item-title">本季客流量</div>
                <div class="trafficwas">1.8万人次</div>
                <div class="with">
                  同比
                  <img src="../../../assets/img/xiajiang.png" alt="" srcset="" />
                  <span>13%</span>
                </div>
                <div class="sequential">
                  环比
                  <img src="../../../assets/img/xiajiang.png" alt="" srcset="" />
                  <span>13%</span>
                </div>
              </div>
              <!-- 本年客流量 -->
              <div class="item">
                <div class="item-title">本年客流量</div>
                <div class="trafficwas">1.8万人次</div>
                <div class="with">
                  同比
                  <img src="../../../assets/img/shangsheng.png" alt="" srcset="" />
                  <span>13%</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </ContentBox>
    </div>
    <!-- 成本模块 -->
    <div class="profit-margin">
      <ContentBox toplefttitle="成本">
        <template #content>
          <div class="costof">
            <div class="echart-box">
              <thedashBoard title="本年目标完成率" ref="shipechartsThree"></thedashBoard>
            </div>
            <div class="thedashCenter">
              <!-- 本月客流量 -->
              <div class="item">
                <div class="item-title">本月客流量</div>
                <div class="trafficwas">1.8万人次</div>
                <div class="with">
                  同比
                  <img src="../../../assets/img/shangsheng.png" alt="" srcset="" />
                  <span>13%</span>
                </div>

                <div class="sequential">
                  环比
                  <img src="../../../assets/img/shangsheng.png" alt="" srcset="" />
                  <span>13%</span>
                </div>
              </div>
              <!-- 本季客流量 -->
              <div class="item">
                <div class="item-title">本季客流量</div>
                <div class="trafficwas">1.8万人次</div>
                <div class="with">
                  同比
                  <img src="../../../assets/img/xiajiang.png" alt="" srcset="" />
                  <span>13%</span>
                </div>
                <div class="sequential">
                  环比
                  <img src="../../../assets/img/xiajiang.png" alt="" srcset="" />
                  <span>13%</span>
                </div>
              </div>
              <!-- 本年客流量 -->
              <div class="item">
                <div class="item-title">本年客流量</div>
                <div class="trafficwas">1.8万人次</div>
                <div class="with">
                  同比
                  <img src="../../../assets/img/shangsheng.png" alt="" srcset="" />
                  <span>13%</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </ContentBox>
    </div>
    <!-- 毛利模块 -->
    <div class="profit-margin">
      <ContentBox toplefttitle="毛利">
        <template #content>
          <!-- 本月毛利 -->
          <div class="top-titleBox">
            <div class="titleBox-titleTWO">
              <div class="top-title-this">
                <span class="top-titleThisSpan">本月毛利</span>
              </div>
              <div class="item">
                <div class="item-thousand-yuan">222万元</div>
                <div class="synchronous">
                  同步
                  <img src="../../../assets/img/shangsheng.png" alt="" srcset="" />
                  <span>13%</span>
                </div>
                <div class="sequential">
                  环比
                  <img src="../../../assets/img/xiajiang.png" alt="" srcset="" />
                  <span>13%</span>
                </div>
                <div class="item-Gross-profit">
                  <div class="item-Gross-h">毛利率</div>
                  <span class="item-Gross-color">22%</span>
                </div>
              </div>
            </div>
            <!-- 本季二消毛利 -->
            <div class="titleBox-titleTWO marginTWO">
              <div class="top-title-two">
                <span class="top-titleMAO"> 二消毛利 </span>
              </div>
              <div class="item" style="padding: 0">
                <div class="item-thousand-yuanTwo">222万元</div>
                <div class="synchronous">
                  同步
                  <img src="../../../assets/img/shangsheng.png" alt="" srcset="" />
                  <span>13%</span>
                </div>
                <div class="sequential">
                  环比
                  <img src="../../../assets/img/xiajiang.png" alt="" srcset="" />
                  <span>13%</span>
                </div>
                <div class="item-Gross-profit">
                  <div class="item-Gross-h">二消毛利率</div>
                  <span class="item-Gross-color">22%</span>
                </div>
                <div class="top-titleBox-border"></div>
              </div>
            </div>
          </div>

          <div class="top-titleBox">
            <div class="titleBox-titleTWO">
              <div class="top-title-this">
                <span class="top-titleThisSpan">本季毛利</span>
              </div>
              <div class="item">
                <div class="item-thousand-yuan">222万元</div>
                <div class="synchronous">
                  同步
                  <img src="../../../assets/img/xiajiang.png" alt="" srcset="" />
                  <span>13%</span>
                </div>
                <div class="sequential">
                  环比
                  <img src="../../../assets/img/xiajiang.png" alt="" srcset="" />
                  <span>13%</span>
                </div>
                <div class="item-Gross-profit">
                  <div class="item-Gross-h">毛利率</div>
                  <span class="item-Gross-color">22%</span>
                </div>
              </div>
            </div>
            <!-- 本季二消毛利 -->
            <div class="titleBox-titleTWO marginTWO">
              <div class="top-title-two">
                <span class="top-titleMAO"> 二消毛利 </span>
              </div>
              <div class="item" style="padding: 0">
                <div class="item-thousand-yuanTwo">222万元</div>
                <div class="synchronous">
                  同步
                  <img src="../../../assets/img/shangsheng.png" alt="" srcset="" />
                  <span>13%</span>
                </div>
                <div class="sequential">
                  环比
                  <img src="../../../assets/img/shangsheng.png" alt="" srcset="" />
                  <span>13%</span>
                </div>
                <div class="item-Gross-profit">
                  <div class="item-Gross-h">二消毛利率</div>
                  <span class="item-Gross-color">22%</span>
                </div>
                <div class="top-titleBox-border"></div>
              </div>
            </div>
          </div>
          <!-- 本年毛利 -->
          <div class="top-titleBox paddinTop">
            <div class="titleBox-titleTWO">
              <div class="top-title-this">
                <span class="top-titleThisSpan">本年毛利</span>
              </div>
              <div class="item">
                <div class="item-thousand-yuan">222万元</div>
                <div class="synchronous synchronousMargin">
                  同步
                  <img src="../../../assets/img/shangsheng.png" alt="" srcset="" />
                  <span>13%</span>
                </div>
                <!-- <div class="sequential">
                  环比
                  <img src="../../../assets/img/xiajiang.png" alt="" srcset="" />
                  <span>13%</span>
                </div> -->
                <div class="item-Gross-profit">
                  <div class="item-Gross-h">毛利率</div>
                  <span class="item-Gross-color">22%</span>
                </div>
              </div>
            </div>
            <!-- 本年二消毛利 -->
            <div class="titleBox-titleTWO marginTWO">
              <div class="top-title-two">
                <span class="top-titleMAO"> 二消毛利 </span>
              </div>
              <div class="item" style="padding: 0">
                <div class="item-thousand-yuanTwo">222万元</div>
                <div class="synchronous  synchronousMargin">
                  同步
                  <img src="../../../assets/img/shangsheng.png" alt="" srcset="" />
                  <span>13%</span>
                </div>
                <!-- <div class="sequential">
                  环比
                  <img src="../../../assets/img/xiajiang.png" alt="" srcset="" />
                  <span>13%</span>
                </div> -->
                <div class="item-Gross-profit">
                  <div class="item-Gross-h">二消毛利率</div>
                  <span class="item-Gross-color">22%</span>
                </div>
                <div class="top-titleBox-border"></div>
              </div>
            </div>
          </div>
        </template>
      </ContentBox>
    </div>

    <van-popup position="bottom" v-model="datePickerShow">
      <DateTimePickerRange
        show-toolbar
        v-model="currentDate"
        title="选择时间段"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="datePickerShow = false"
        @confirm="onConfirm"
        @change="onChange"
      >
      </DateTimePickerRange>
    </van-popup>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      datePickerShow: false,
      yearsItem: null,
      minDate: new Date(2016, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      startDate: '',
      endDate: '',
      monthshow: false,
    };
  },
  created () {
    var date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    console.log(month < 10);
    if (month < 10) this.yearsItem = year + '年' + '0' + month + '月';

    // 仪表盘组件
    this.startChart();
  },
  methods: {
    onConfirm (value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      this.startDate = value.slice(0, 3).join('-');
      this.endDate = value.slice(4, 7).join('-');
      this.value = this.startDate + '至' + this.endDate;
      this.showPicker = false;
    },

    onChange (picker, value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
    },

    startChart () {
      this.$nextTick(() => {
        this.$refs['shipecharts'].StartChart();
        this.$refs['shipechartsThree'].StartChart();
        this.$refs['shipechartsTwo'].StartChart();
      });
    },

    yearsClick () {
      this.monthshow = true;
    },
    // 月份 年份
    formatter (type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      }
      return val;
    },
    //   确认选中值
    confirm (value) {
      this.monthshow = false;
      this.currentDate = this.$format(value, 'yyyy-MM');
      //   默认的年月日期 分割之后重新赋值
      const year = this.currentDate.split('-')[0];
      const month = this.currentDate.split('-')[1];
      this.yearsItem = year + '年' + month + '月';
    },
    // 取消选中值
    cancel () {
      this.monthshow = false;
    },
  },
};
</script>

<style lang="scss">
.theoverview {
  .profit-margin {
    margin-top: 8px;
    .costof {
      height: 225px;
    }
  }
  .yearsItemConter {
    margin: 4px 0 6px;
    font-size: 16px;
    margin-right: 10px;
    text-align: right;
  }

  .thedashCenter {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    .item {
      text-align: center;
      .item-title {
        font-size: 14px;
      }
      .trafficwas {
        color: #ff8f1f;
        margin-top: 7px;
        font-size: 13px;
      }
      .with {
        font-size: 12px;
        margin-top: 7px;
        display: flex;
        align-items: center;
        margin-left: 6px;
        img {
          width: 12px;
        }
      }
      .sequential {
        font-size: 12px;
        margin-top: 7px;
        display: flex;
        align-items: center;
        margin-left: 6px;
        img {
          width: 12px;
        }
      }
    }
  }
  .top-titleBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 30px 5px 30px;
    .marginTWO {
      margin: 7px 0 0 0;
    }
    .titleBox-titleTWO {
      position: relative;
      .top-title-this {
        text-indent: 12px;
        font-size: 16px;
        position: relative;
        padding: 6px 12px 0;
        display: flex;
        box-sizing: border-box;
        justify-content: space-between;
        // align-items: center;

        & > span:nth-child(1) {
          height: 22px;
          line-height: 22px;
          position: relative;
          &::before {
            content: '';
            width: 5px;
            height: 13px;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            border-radius: 5px;
            display: block;
            position: absolute;
            background: #357dca;
          }
        }
        .top-titleThisSpan {
          font-size: 14px;
          font-weight: 500;
        }
      }
      .item {
        padding-left: 25px;
        .item-thousand-yuan {
          color: #ff9c3b;
          font-size: 14px;
          margin: 3px 0 5px;
        }
        .synchronousMargin {
          margin-bottom: 17px;
        }
        .synchronous {
          display: flex;
          align-items: center;
          font-size: 12px;
          color: #8b8b8b;

          img {
            width: 13px;
          }
        }
        .sequential {
          display: flex;
          align-items: center;
          font-size: 12px;
          color: #8b8b8b;
          margin: 3px 0 15px;
          img {
            width: 13px;
          }
        }
      }

      .top-titleBox-border {
        position: absolute;
        top: 20px;
        left: -85%;
        width: 2px;
        height: 90px;
        opacity: 0.5;
        border-right: 2px solid #e7e7e7;
      }
      .item-Gross-profit {
        .item-Gross-h {
          font-size: 14px;
          font-weight: 500;
          color: #383838;
          margin: 0 0 7px 0;
        }
        .item-Gross-color {
          margin-top: 15px;
          color: #ffa044;
          font-size: 14px;
          font-weight: 500;
        }
      }
    }
    .item-thousand-yuanTwo {
      color: #ffa044;
      font-size: 14px;
      margin: 7px 0 5px;
    }
    .top-title-two {
      margin-top: 4px;
      > .top-titleMAO {
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
  .paddinTop {
    padding: 10px 30px 20px 30px;
  }
  .echart-box {
    height: 135px;
  }
}
</style>
