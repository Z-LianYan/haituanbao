<template>

  <div class="page-payment">

    <back :backTitle="backTitle" />

    <div class="tips-text">账户需留存1000元作为保证金，申请退出平台时可结算提取。发布任务时需要全额托管支付任务佣金，商家审核后由平台拨付</div>

    <div class="payment-amount-box">
      <div class="amount-text"> 充值金额 </div>
      <div class="flex both-center amount-box">
        <div class="amount-unit">￥</div>
        <div class="flex1 amount-input">
          <input type="number" placeholder="0.00" v-model="amount" />
        </div>
      </div>
    </div>

    <div class="answerSheet-list">

      <div class="flex cross-center main-between answerSheet-item" @click="onPaymentToggle('WeChat')">
        <div class="flex both-center item-data">
          <div class="payment-icon">
            <img src="../assets/images/icon/wepay@2x.png" alt="" width="24" height="24">
          </div>
          <div>微信</div>
        </div>
        <div v-if="payment[0].WeChat">
          <img src="../assets/images/icon/selected@2x.png" alt="" width="20" height="20">
        </div>
        <div v-if="!payment[0].WeChat">
          <img src="../assets/images/icon/unselected@2x.png" alt="" width="20" height="20">
        </div>
      </div>

<!--      <div class="flex cross-center main-between answerSheet-item" @click="onPaymentToggle('Alipay')">
        <div class="flex both-center item-data">
          <div class="payment-icon">
            <img src="../assets/images/icon/alipay@2x.png" alt="" width="24" height="24">
          </div>
          <div>支付宝</div>
        </div>
        <div v-if="payment[1].Alipay">
          <img src="../assets/images/icon/selected@2x.png" alt="" width="20" height="20">
        </div>
        <div v-if="!payment[1].Alipay">
          <img src="../assets/images/icon/unselected@2x.png" alt="" width="20" height="20">
        </div>
      </div>-->

    </div>


    <div class="btn-box payment">
      <button class="btn" :class="{ active : ( this.payment[0].WeChat && amount ) }" @click="onBtnClick" :disabled="!(this.payment[0].WeChat && amount)"> 下一步 </button>
    </div>


  </div>

</template>

<script type="text/ecmascript-6">
  import back from './common/back.vue'

  import axios from 'axios';
  import Qs from 'qs';

    export default {
        name: "",
        data() {
            return {
              backTitle : '充值',
              amount : '',
              paytype : 'wxpay',
              client_type : 'h5',
              payment : [
                {
                  WeChat : false
                },
                {
                  Alipay : false
                }
              ]
            }
        },
        props: [],
        watch: {},
        computed: {},
        methods: {
          checkWeiXinLogin : function () {
            sessionStorage.getItem('auth_flag') === null ? this.wxLogin() : this.isWxAuth === true ;
          },
          wxLogin : function () {
            sessionStorage.setItem('auth_flag',1); // 将标记设为1

            let is_local = $(location).prop('href').indexOf('.dev') !== -1;
            let server_base_url = is_local ? 'http://maishou.dev' : 'http://apitest.24681357.com'; //服务端基本URL
            let backurl = encodeURIComponent($(location).prop('href')); //返回的URL http://www.test.com:8088/#/trusteeshipPayment
            let bindurl = encodeURIComponent(server_base_url + '/test/login'); //须绑定手机号的URL
            let url = server_base_url + '/member/wx-login?backurl=' + backurl + '&bindurl=' + bindurl;
            $(location).prop('href', url);
          },
          callPay : function (data, success, error) {
            if (typeof WeixinJSBridge === "undefined"){
              if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', () => {
                  this.pay(data, success, error);
                }, false);
              } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', () => {
                  this.pay(data, success, error);
                });
                document.attachEvent('onWeixinJSBridgeReady', () => {
                  this.pay(data, success, error);
                });
              }
            } else {
              this.pay(data, success, error);
            }
          },
          pay : function (data, success, error) {
            WeixinJSBridge.invoke('getBrandWCPayRequest', data, function(res) {
                if (res.err_msg === 'get_brand_wcpay_request:ok') {
                  //Cookies.set('lasttime', (new Date()).getTime());
                  //alert('支付成功');
                  sessionStorage.setItem("lasttime",(new Date()).getTime());
                  EventHub.$emit('toastOpen', "支付成功");
                  setTimeout(()=>{
                    window.history.back();
                  },2000);
                  success && success();
                } else {
                  console.log(res);
                  alert(res.err_msg);
                  //EventHub.$emit('toastOpen', res.err_msg);
                  error && error();
                }
              }
            );
          },
          onPaymentToggle : function (data) {
              if ( data === 'WeChat' ) {
                devConsole.log('WeChat');
                  this.payment[0].WeChat = !this.payment[0].WeChat;
                  //this.payment[1].Alipay = false;
                  //this.$set( this.payment, 0,  this.payment[0]); // 对象更新之后，手动触发视图更新
              }
              else if( data === 'Alipay' ) {
                devConsole.log('Alipay');
                this.payment[1].Alipay = true;
                this.payment[0].WeChat = false;
                //this.$set( this.payment, 1,  this.payment[1]); // 对象更新之后，手动触发视图更新
              }
              else {}
          },
          onBtnClick : function () {

            axios({
              method: 'post',
              url: PaymentRecharge,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
              params : {
                ssid: sessionStorage.getItem("ssid")
              },
              transformRequest: [data => Qs.stringify(data)],
              data : {
                amount: this.amount,
                paytype : this.paytype,
                client_type : this.client_type
              }
            }).then( (response) => {

              let result = (typeof response.data === 'object') ? response.data : JSON.parse(response.data);

              if (result.code < 0) {
                if (result.code === -100) {
                  setTimeout(()=>{
                    window.history.back();
                  },2000);
                  return;
                }
                EventHub.$emit('toastOpen', result.message);
                return false;
              }
              this.callPay(result.data);

            }).catch( (error) => {
              console.log(error);
            });

          }
        },
        components: {
            back : back
        },
        beforeCreate() {
        },
        created() {
        },
        mounted() {
          this.checkWeiXinLogin();
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

  .page-payment {
    padding-top: 44px;

    .payment-amount-box {
      width: 100%;
      height: 110px;
      padding: 15px;
      background-color: #fff;

      .amount-text {
        width:64px;
        height:22px;
        margin-bottom : 15px;
        font-size:16px;
        color:rgba(42,42,42,1);
        line-height:22px;
      }

      .amount-box {
        height: 40px;

        .amount-unit {
          height: 40px;
          font-size:28px;
          line-height: 40px;
          color:rgba(42,42,42,1);
        }
        .amount-input {
          margin-left: 2px;
          input {
            width: 100%;
            height: 100%;
            font-size:34px;
            color: #2A2A2A;
            line-height:40px;
            border: none;

            &:focus {
              outline : none;
            }

            /* placeholder */
            &::-webkit-input-placeholder { /* WebKit browsers */
              font-size:34px;
              color: #CCCCCC;
            }
            &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
              font-size:34px;
              color: #CCCCCC;
            }
            &::-moz-placeholder { /* Mozilla Firefox 19+ */
              font-size:34px;
              color: #CCCCCC;
            }
            &:-ms-input-placeholder { /* Internet Explorer 10+ */
              font-size:34px;
              color: #CCCCCC;
            }


          }
        }
      }
    }

    .answerSheet-list {
      background-color: #fff;
      margin-top: 15px;
      padding-left: 15px;

      & .answerSheet-item:last-child:after {
        background-color: transparent;
      }

      .item-title {
        padding: 15px 0;
        position: relative;
        font-size:14px;
        color:rgba(96,100,110,1);
        line-height:20px;

        &:after {
          position: absolute;
          bottom: 0;
          left: 0;
          content: '';
          width: 100%;
          height: 1px;
          background-color: rgb(229,229,229);
          transform: scaleY(1);
        }
      }

      .answerSheet-item {
        position: relative;
        padding: 12px 15px 12px 0;

        &:after {
          position: absolute;
          bottom: 0;
          left: 0;
          content: '';
          width: 100%;
          height: 1px;
          background-color: rgb(229,229,229);
          transform: scaleY(1);
        }

        .item-data {
          font-size:16px;
          color:rgba(42,42,42,1);
          line-height:22px;
        }

        .payment-icon {
          margin-right: 16px;
        }

      }
    }

    .btn-box.payment {
      margin-top: 30px;
    }



  }


</style>
