<template>

  <div class="page-remainingSum">

    <div class="box-top">
      <div class="flex both-center back-box">
        <div class="flex both-center back-left" @click="onBackClick">
          <img src="../../assets/images/icon/arrow-white@2x.png" alt="" width="26" height="24">
          <div class="flex1 back-tips">{{backTips}}</div>
        </div>
        <div class="back-title">{{ backTitle }}</div>
      </div>
      <div class="usable-text">可提现金额(元)</div>
      <div class="usable-amount" v-if="accountData.deposit_balance >= 1000">{{ accountData.deposit_balance || 0 }}</div>
      <div class="usable-amount" v-if="accountData.deposit_balance < 1000">0</div>
      <div class="unusable-amount">冻结金额1000.00元</div>
      <div class="flex both-center unusable-amount-text"> 冻结金额作为店铺保证金，申请退出本平台时可结算提取 </div>
    </div>

<!--    <div class="flex main-between page-item" @click="toPageFundDetail">
      <div>资金明细</div>
      <img src="../assets/images/icon/arrow@2x.png" alt="" width="20" height="22">
    </div>-->

    <div class="flex main-between page-item" @click="toPageBankcard">
      <div>银行卡信息</div>
      <img src="../../assets/images/icon/arrow@2x.png" alt="" width="20" height="22">
    </div>

    <div class="flex remainingSum-action">
      <!--<div class="flex flex1 both-center" @click="toPageChargePayment">充值</div>-->
      <div class="flex flex1 both-center" style="color: #999">充值(暂时不开放)</div>
      <div class="flex flex1 both-center" @click="toPageWithdraw">提现</div>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import Qs from 'qs';

    export default {
        name: "",
        data() {
            return {
              backTips : '返回',
              backTitle : '账户余额',
              accountData : {
              }
            }
        },
        props: [],
        watch: {},
        computed: {},
        methods: {
          onBackClick : function () {
            history.back();
          },
          toPageFundDetail : function () {
            this.$router.push({ name : 'fundDetail' });
          },
          toPageBankcard : function () {
            this.$router.push({ name : 'bankcard' });
          },
          toPageChargePayment : function () {
            this.$router.push({ name : 'payment' });
          },
          toPageWithdraw : function () {
            this.$router.push({ name : 'withdraw' });
          },
          getAccountData : function () {

            // 获取账户信息
            axios({
              method: 'get',
              url: WalletStat,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
              transformRequest: [data => Qs.stringify(data)],
              params : {
                ssid: sessionStorage.getItem("ssid")
              },
            }).then( ( response ) => {

              let result = response.data;
              devConsole.log(result);
              this.accountData = result.data;
              //console.log(result);

              if ( result.code > 0 ) {
              }
              else if ( result.code === -100 ) {
                EventHub.$emit('toastOpen', result.message);
                sessionStorage.clear();
                setTimeout( ()=>{
                  //this.$router.push({ name: 'login'});
                },2000)
              }
              else {
                EventHub.$emit('toastOpen', result.message);
              }

            }).catch( (error) => {
              console.log(error);
            });

          }
        },
        components: {},
        beforeCreate() {
        },
        created() {
        },
        mounted() {
            this.getAccountData();
        },
        beforeMount() {
        },
        beforeUpdate() {
        },
        updated() {
        },
        activated() {
        },
        deactivated() {
        },
        beforeDestroy() {
        },
        destroyed() {
        },
        errorCaptured() {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less" scoped>

  .page-remainingSum {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    & .page-item:last-child:after {
      background-color: transparent;
    }

    .box-top {
      margin-bottom: 12px;
      position: relative;
      height: 245px;
      background-image: linear-gradient(0deg, #02AAF2, #4475F0);

      .back-box {
        position: relative;
        width: 100%;
        height: 44px;
        z-index: 100;

        &.light {
          background-image: linear-gradient(90deg, #fff, #fff);
          .back-tips, .back-title {
            color: #2A2A2A;
          }
        }

        .back-left {
          position: absolute;
          top: 0;
          left: 0;
          width: auto;
          height: 100%;
          padding-right: 8px;
        }

        .back-tips {
          font-size:15px;
          color:rgba(255,255,255,1);
          line-height:21px;
        }

        .back-title {
          font-size:17px;
          color:rgba(255,255,255,1);
        }
      }

      .usable-text {
        padding-top: 33px;
        font-size:16px;
        color:rgba(255,255,255,1);
        line-height:22px;
        text-align: center;
      }

      .usable-amount {
        margin-bottom: 9px;
        font-size:40px;
        color:rgba(255,255,255,1);
        line-height:56px;
        text-align: center;
      }

      .unusable-amount {
        font-size:16px;
        color:rgba(255,255,255,1);
        line-height:22px;
        text-align: center;
      }

      .unusable-amount-text {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 44px;
        padding: 0 16px;
        font-size:13px;
        color:rgba(255,255,255,1);
        line-height:18px;
        background-color: rgba(59,181,243,.6);
      }

    }

    .page-item {
      position: relative;
      padding: 12px 15px 11px;
      background-color: #fff;
      font-size:16px;
      color:rgba(42,42,42,1);
      line-height:22px;

      &::after {
        position: absolute;
        bottom: 0;
        left: 0;
        content: '';
        width: 100%;
        height: 1px;
        background-color: #e5e5e5;
      }
    }

    .remainingSum-action {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50px;
      font-size:17px;
      color:rgba(29,138,231,1);
      line-height:24px;
      background-color: #fff;

      &:after {
        position: absolute;
        top: 15px;
        left: 50%;
        content: '';
        width: 1px;
        height: 20px;
        background-color: #e5e5e5;
        transform: scaleY(1);
      }

    }

  }


</style>
