<!--
 * @Author:Dushuai
 * @Date: 2021-10-08 09:34:32
 * @LastEditTime: 2021-11-04 09:48:05
 * @LastEditors: [Dushuai]
 * @Description: In User Settings Edit
 * @FilePath: \manage-mobile\src\views\home\guarantee\index.vue
-->
<template>
  <div class="guarantee">
    <DateNavbar></DateNavbar>
    <!-- 航班次下拉框 -->
    <ShipDropdown></ShipDropdown>
    <!-- 设备 -->
    <div class="mb mt">
      <ContentBox toplefttitle="设备">
        <template #content>
          <div class="select-content">
            <div class="item">
              <div class="item-value">888 <span>单</span></div>
              <div class="item-title">维修工单数</div>
            </div>
            <div class="item">
              <div class="item-value">88.21 <span>%</span></div>
              <div class="item-title">维修完工率</div>
            </div>
            <div class="item">
              <div class="item-value">88 <span>%</span></div>
              <div class="item-title">船舶自修率</div>
            </div>
            <div class="item">
              <div class="item-value">80 <span>%</span></div>
              <div class="item-title">自修率</div>
            </div>
            <div class="item">
              <div class="item-value">88 <span>%</span></div>
              <div class="item-title">保修完工率</div>
            </div>
          </div>
        </template>
      </ContentBox>
    </div>
    <!-- 安全 -->
    <div class="mb">
      <ContentBox toplefttitle="安全">
        <template #content>
          <div class="safaty">
            <div class="title">停航 <span>(班)</span></div>
            <div class="row row1">
              <div class="item">
                <div class="item-left">天气原因</div>
                <div class="item-right">20</div>
              </div>
              <div class="item">
                <div class="item-left">其他原因</div>
                <div class="item-right">30</div>
              </div>
            </div>
            <div class="title">检查 <span>(个)</span></div>
            <div class="row row2">
              <div class="item">
                <div class="item-left">PSC缺陷率</div>
                <div class="item-right">10</div>
              </div>
              <div class="item">
                <div class="item-left">PSC缺陷率</div>
                <div class="item-right">30</div>
              </div>
            </div>
            <div class="row row2">
              <div class="item">
                <div class="item-left">内外审问题数</div>
                <div class="item-right">20</div>
              </div>
              <div class="item">
                <div class="item-left">外审问题数</div>
                <div class="item-right">40</div>
              </div>
            </div>
            <div class="row row2">
              <div class="item">
                <div class="item-left">内部安检次数</div>
                <div class="item-right">50</div>
              </div>
            </div>
            <div class="title row4">检查 <span>(个)</span></div>
            <div class="row row2">
              <div class="item">
                <div class="item-left">水上交通</div>
                <div class="item-right">10</div>
              </div>
              <div class="item">
                <div class="item-left">事故隐患</div>
                <div class="item-right">30</div>
              </div>
            </div>
            <div class="row row2">
              <div class="item-left">整改率</div>
              <div class="super-bar-box">
                <div class="checked-box" :style="{ width: width }">25&nbsp;&nbsp;</div>
                <span> 50&nbsp;</span>
              </div>
              <div class="item-right">50%</div>
            </div>
          </div>
        </template>
      </ContentBox>
    </div>
    <!-- 采购 -->
    <div class="mb">
      <ContentBox toplefttitle="采购" toprighttitle="万元">
        <template #content>
          <div class="purchase">
            <div class="purchase-row">
              <div class="purchase-item">
                <img src="../../../assets/img/guarante/guarantee-fixed.png" alt="" />
                <div class="img-right">
                  <div class="item-value">1000</div>
                  <div class="item-title">维修费</div>
                </div>
              </div>
              <div class="purchase-item">
                <img src="../../../assets/img/guarante/guarantee-fixed2.png" alt="" />
                <div class="img-right">
                  <div class="item-value">1000</div>
                  <div class="item-title">润料费</div>
                </div>
              </div>
            </div>
            <div class="purchase-row">
              <div class="purchase-item">
                <img src="../../../assets/img/guarante/guarantee-fixed3.png" alt="" />
                <div class="img-right">
                  <div class="item-value">1000</div>
                  <div class="item-title">物料费</div>
                </div>
              </div>
              <div class="purchase-item">
                <img src="../../../assets/img/guarante/guarantee-fixed4.png" alt="" />
                <div class="img-right">
                  <div class="item-value">1000</div>
                  <div class="item-title">备件修费</div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </ContentBox>
    </div>

    <!-- 旅客满意度 -->
    <div class="mb">
      <ContentBox toplefttitle="旅客满意度" toprighttitle="满分:10分">
        <template #content>
          <div class="passenger-box">
            <LiquidfillChart ref="passengerChart" :value="0.8" :toprenvent="false"></LiquidfillChart>
          </div>
        </template>
      </ContentBox>
    </div>
    <!-- 服务投诉 -->
    <div class="mb">
      <ContentBox toplefttitle="服务投诉">
        <template #content>
          <div class="passenger-box">
            <LiquidfillChart ref="complaintChart" title="服务投诉率" :value="0.602"></LiquidfillChart>
          </div>
        </template>
      </ContentBox>
    </div>
    <!-- 航班运营 -->
    <div class="mb mt">
      <ContentBox toplefttitle="投诉处理">
        <template #content>
          <div class="complaint-box">
            <div class="echart-box">
              <thedashBoard title="投诉处理率" :value="60" ref="complaintCharts"></thedashBoard>
            </div>
            <div class="complaint-bottom">
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
          </div>
        </template>
      </ContentBox>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => {
      this.$refs['passengerChart'].startChart();
      this.$refs['complaintChart'].startChart();
      this.$refs['complaintCharts'].StartChart();
    });
  },
  computed: {
    width() {
      return (25 / 50) * 100 + '%';
    },
  },
};
</script>

<style lang="scss">
.guarantee {
  .complaint-bottom {
    display: flex;
    // justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
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
  .complaint-box {
    height: 236px;
  }
  .echart-box {
    height: 160px;
  }
  .passenger-box {
    height: 235px;
  }
  .purchase-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 50px;
    padding-right: 50px;
    &:nth-of-type(1) {
      margin-top: 31px;
      margin-bottom: 46px;
    }
    .purchase-item {
      width: 100px;
      display: flex;
      align-items: center;
      img {
        width: 32px;
        margin-right: 10px;
      }
      .img-right {
        .item-title {
          text-indent: 5px;
        }
      }
    }
  }
  .purchase {
    height: 193px;
  }
  .super-bar-box {
    position: relative;
    text-align: right;
    color: #383838;
    font-size: 12px;
    width: 182px;
    border-radius: 7px;
    height: 14px;
    background: #e6e6e6;
    line-height: 14px;
    .checked-box {
      position: absolute;

      text-align: right;
      font-size: 12px;
      color: white;
      background: linear-gradient(to right, #91bdff, #5888ff);
      left: 0;

      top: 0;
      // right: 0;
      bottom: 0;
      height: 14px;
      border-radius: 7px;
    }
  }
  .select-content {
    // position: relative;
    padding-bottom: 0px;
    padding-top: 6px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    height: auto;
    .item {
      margin-bottom: 8px;
      width: 157px;
      height: 77px;
      background: #f7f8fb;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
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
  .safaty {
    height: 315px;
    position: relative;
    &::before {
      content: '';
      display: block;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 75px;
      height: 90px;
      background: #979797;
      width: 0.5px;
    }
    .title {
      color: #383838;
      margin-left: 12px;
      position: relative;
      padding-left: 10px;
      font-size: 14px;
      display: flex;
      align-items: center;
      span {
        margin-left: 6px;
        font-size: 12px;
      }
      &::before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 12px;
        border-radius: 2.5px;
        background: #357dca;
      }
      &:nth-child(1) {
        margin-top: 18px;
      }
    }
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 118px;
    }
    .item-left {
      font-size: 12px;
      color: #383838;
    }
    .item-right {
      font-size: 16px;
      color: #ff840a;
    }
    .row {
      padding-left: 24px;
      padding-right: 26px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .row1 {
      margin-top: 16px;
      margin-bottom: 22px;
    }
    .row2 {
      margin-top: 15px;
    }
    .row3 {
      margin-top: 10px;
    }
    .row4 {
      margin-top: 24px;
    }
  }
}
</style>
