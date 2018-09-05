<template>

  <div class="page-trusteeshipPayment">

    <back :backTitle="backTitle" />

    <!--任务金额-->
    <div class="detail-list">

      <div class="detail-item flex">
        <div class="flex cross-center main-between flex1 item-info">
          <div class="item-name">任务押金</div>
          <div class="flex item-data"><span>￥</span>{{ price * works }}</div>
        </div>
      </div>

      <div class="task-payment flex-col">
        <div class="flex main-between">
          <div>任务佣金</div>
          <div> {{price}} <span>元/单</span> </div>
        </div>
        <div class="flex main-between">
          <div>任务数量</div>
          <div> {{works}}  <span>件</span> </div>
        </div>
        <div class="flex main-between">
          <div>任务押金</div>
          <div>{{ price * works }}<span>元</span> </div>
        </div>
      </div>

    </div>


    <!--任务保证金-->
    <div class="detail-list">

      <div class="detail-item flex">
        <div class="flex cross-center main-between flex1 item-info">
          <div class="item-name">任务保证金</div>
          <div class="flex item-data"><span>￥</span>{{1000 - security_balance}}</div>
        </div>
      </div>

      <div class="task-payment flex-col">
        <div class="flex main-between">
          <div>账户需留存1000元作为保证金，申请退出平台时可结算提取，首次发布任务支付</div>
        </div>
      </div>

    </div>

    <!-- 可用余额 -->
    <div class="detail-list">

      <div class="detail-item flex no-border">
        <div class="flex cross-center main-between flex1 item-info">
          <div class="item-name">账户余额</div>
          <div class="flex item-data"><span>￥</span>{{deposit_balance}}</div>
        </div>
      </div>

    </div>

    <!--合计费用-->
    <div class="detail-list">
      <div class="detail-item flex no-border">
        <div class="flex cross-center main-between flex1 item-info">
          <div class="item-name">合计费用</div>
          <div class="flex item-data obvious"><span>￥</span>{{total}}</div>
        </div>
      </div>
    </div>

    <div class="tips-text">付款方式</div>

    <div class="answerSheet-list">

      <div class="flex cross-center main-between answerSheet-item" @click="onPaymentToggle('WeChat')" v-if="is3thPay">
        <div class="flex both-center item-data">
          <div class="payment-icon">
            <img src="../../assets/images/icon/wepay@2x.png" alt="" width="24" height="24">
          </div>
          <div>微信</div>
        </div>
        <div v-if="payment[0].WeChat">
          <img src="../../assets/images/icon/selected@2x.png" alt="" width="20" height="20">
        </div>
        <div v-if="!payment[0].WeChat">
          <img src="../../assets/images/icon/unselected@2x.png" alt="" width="20" height="20">
        </div>
      </div>

<!--      <div class="flex cross-center main-between answerSheet-item" @click="onPaymentToggle('Alipay')" v-if="is3thPay">
        <div class="flex both-center item-data">
          <div class="payment-icon">
            <img src="../../assets/images/icon/alipay@2x.png" alt="" width="24" height="24">
          </div>
          <div>支付宝</div>
        </div>
        <div v-if="payment[1].Alipay">
          <img src="../../assets/images/icon/selected@2x.png" alt="" width="20" height="20">
        </div>
        <div v-if="!payment[1].Alipay">
          <img src="../../assets/images/icon/unselected@2x.png" alt="" width="20" height="20">
        </div>
      </div>-->

      <div class="flex cross-center main-between answerSheet-item" @click="onPaymentToggle('remaining')" v-if="!is3thPay">
        <div class="flex both-center item-data">
          <div class="flex both-center payment-icon">
            <img src="../../assets/images/icon/pay.png" alt="" width="24" height="24">
          </div>
          <div>余额支付</div>
        </div>
        <div v-if="payment[2].remaining">
          <img src="../../assets/images/icon/selected@2x.png" alt="" width="20" height="20">
        </div>
        <div v-if="!payment[2].remaining">
          <img src="../../assets/images/icon/unselected@2x.png" alt="" width="20" height="20">
        </div>
      </div>

    </div>

<!--    <form id="payform" method="post" action="../payment/pay-for-task.html">

      <label>task_id:</label><input type="text" name="task_id" value=""> <br>

      <label>paytype:</label><input type="text" name="paytype" value=""> <br>

      <label>client_type:</label><input type="text" name="client_type" value=""> <br>

      <div style="text-align:center">
        <input type="submit" name="submit" value="微信安全支付">
      </div>

    </form>-->

    <div class="btn-box payment">

      <button class="btn" :class="{ active : ( this.payment[0].WeChat ) }"
              :disabled="!(this.payment[0].WeChat )" @click="onBtnClick" v-if="is3thPay" data-tips="微信支付"> 微信支付 </button>

      <button class="btn" :class="{ active : (this.payment[2].remaining ) }"
              :disabled="!(this.payment[2].remaining )" @click="onBtnClick" v-if="!is3thPay" data-tips="余额支付"> 余额支付 </button>
<!--
      <button class="btn" :class="{ active : (this.payment[2].remaining ) }"
              :disabled="!(this.payment[2].remaining )" @click="onBtnClick" v-if="!is3thPay" data-tips="余额支付"> 余额支付 </button>


      <button class="btn" :class="{ active : ( ( this.payment[0].WeChat ) || ( this.payment[1].Alipay ) ) }"
              :disabled="!( ( this.payment[0].WeChat ) || ( this.payment[1].Alipay ) )" @click="doScanCode" v-if="is3thPay" data-tips="扫码支付"> 扫码支付 </button>
-->


    </div>


    <div class="flex both-center flex-col scanCode" v-if="sacnCodeShow">
      <div class="scanCode-tips" v-if="payment[0].WeChat === true">微信扫一扫</div>
      <div class="scanCode-tips" v-if="payment[1].Alipay === true">支付宝扫一扫</div>

      <div class="flex both-center qcode">
        <img :src="weChatPaytypeResult.qrcode_url" alt="">
      </div>
      <div class="btn-box">
        <button class="btn active" @click="doScanQrcodeDone"> 支付完成 </button>
        <button class="btn grey" @click="doScanQrcodeFailure"> 支付遇到问题 </button>
      </div>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">
  import back from '../common/back.vue'

  import axios from 'axios';
  import Qs from 'qs';

    export default {
        name: "",
        data() {
            return {
              backTitle : '托管支付',
              paymentAmount : '',
              deposit_balance : '',
              security_balance : '',
              payment : [
                {
                  WeChat : false
                },
                {
                  Alipay : false
                },
                {
                  remaining : false
                }
              ],
              price : '',
              works : '',
              total : '',

              task_id : '',
              weChatPaytype : '800201', // wxpay:微信支付, walletpay:钱包余额支付, 微信：800101
              alipayPaytype : '800101', // wxpay:微信支付, walletpay:钱包余额支付，支付宝：800101

              weChatPaytypeResult : {},
              alipayPaytypeResult : {},

              sacnCodeShow : false,

              paytype : 'wxpay',
              client_type : 'h5',
              is3thPay : true,

              productObj : '',

              isWxAuth : false

            }
        },
        props: [],
        watch: {},
        computed: {},
        methods: {
          //获取账户资产信息
          getAccountData : function () {
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
              if ( result.code > 0 ) {
                this.deposit_balance = parseFloat(result.data.deposit_balance);
                this.security_balance = parseFloat(result.data.security_balance);
                this.getTaskInfo();
              }
              else {
                EventHub.$emit('toastOpen', result.message);
              }

            }).catch( (error) => {
              console.log(error);
            });

          },
          getProductObj : function () {
            devConsole.log(JSON.parse(sessionStorage.getItem("product")));
            if( JSON.parse(sessionStorage.getItem("product")) ){
              this.productObj = JSON.parse(sessionStorage.getItem("product"));
            }
            this.task_id = this.productObj.task_id;
          },
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
                  devConsole.log(res);
                  alert(res.err_msg);
                  //EventHub.$emit('toastOpen', res.err_msg);
                  error && error();
                }
              }
            );
          },
          // 1.0 版本的微信支付
          onBtnClick : function () {
            //EventHub.$emit('toastOpen', '调用支付接口');

              axios({  // 发布
                method: 'post',
                url: PaymentPayForTask,
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                params : {
                  ssid: sessionStorage.getItem("ssid")
                },
                transformRequest: [data => Qs.stringify(data)],
                data : {
                  task_id: this.task_id,
                  paytype : this.paytype,
                  client_type : this.client_type
                }
              }).then( (response) => {

                let result = (typeof response.data === 'object') ? response.data : JSON.parse(response.data);

                if (result.code < 0) {
                  if (result.code === -100) {
                    setTimeout(()=>{
                      window.history.back();
                      EventHub.$emit('doRefreshRouter','doRefreshRouter');
                    },2000);
                    return;
                  }
                  EventHub.$emit('toastOpen', result.message);
                  return false;
                }
                else {
                  if( result.code === 1 ){
                    EventHub.$emit('toastOpen', result.message);
                    setTimeout( ()=>{
                      this.$router.push({ name : 'isDraft' });
                      EventHub.$emit('doRefreshRouter','doRefreshRouter');
                    },2000)
                  }
                  if( this.is3thPay === true ){
                    this.callPay(result.data);
                  }
                }

              }).catch( (error) => {
                devConsole.log(error);
                devConsole.log(response);
              });

          },
          // 1.1.0 版本的扫码支付
          doScanCode : function () {

            axios({  // 发布
              method: 'post',
              url: PaymentCreateQrcode,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
              params : {
                ssid: sessionStorage.getItem("ssid")
              },
              transformRequest: [data => Qs.stringify(data)],
              data : {
                task_id: this.task_id,
                pay_type : this.payment[0].WeChat === true ? this.weChatPaytype : this.alipayPaytype,
                client_type : this.client_type
              }
            }).then( (response) => {

              let result = response.data;

              if ( result.code > 0 ) {

                this.weChatPaytypeResult = result.data;

                this.sacnCodeShow = true;

              }
              else {
                EventHub.$emit('toastOpen', result.message);
              }

            }).catch( (error) => {
              devConsole.log(error);
              devConsole.log(response);
            });


          },
          // 扫码支付完成
          doScanQrcodeDone : function () {
            axios({
              method: 'post',
              url: PaymentQueryQian,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
              params : {
                ssid: sessionStorage.getItem("ssid")
              },
              transformRequest: [data => Qs.stringify(data)],
              data : {
                order_id: this.weChatPaytypeResult.order_id
              }
            }).then( ( response ) => {

              let result = response.data;
              if ( result.code > 0 ) {
                EventHub.$emit('toastOpen', "支付成功！");
                setTimeout(()=>{
                  this.$router.push({ name : 'isDraft' });
                },2000);
              }
              else {
                EventHub.$emit('toastOpen', result.message);
              }

            }).catch( (error) => {
              console.log(error);
            });

          },
          // 扫码支付失败
          doScanQrcodeFailure : function () {
            EventHub.$emit('toastOpen', "请重试");
            setTimeout(()=>{
              EventHub.$emit('doRefreshRouter', "doRefreshRouter");
            },1500);
          },
          onPaymentToggle : function (data) {
            if ( data === 'WeChat' ) {
              devConsole.log('WeChat');
              this.payment[0].WeChat = !this.payment[0].WeChat;
              this.payment[1].Alipay = false;
              this.payment[2].remaining = false;

              this.$set( this.payment, 0,  this.payment[0]); // 对象更新之后，手动触发视图更新
            }
            else if( data === 'Alipay' ) {
              devConsole.log('Alipay');
              this.payment[0].WeChat = false;
              this.payment[1].Alipay = !this.payment[1].Alipay;
              this.payment[2].remaining = false;

              this.$set( this.payment, 1,  this.payment[1]); // 对象更新之后，手动触发视图更新
            }
            else if( data === 'remaining' ) {
              devConsole.log('remaining');
              this.payment[0].WeChat = false;
              this.payment[1].Alipay = false;
              this.payment[2].remaining = !this.payment[2].remaining;

              this.$set( this.payment, 2,  this.payment[2]); // 对象更新之后，手动触发视图更新
            }
            else {}
          },
          getTaskInfo : function () {
            if ( sessionStorage.getItem("distributePayment-price") ){
              this.price = sessionStorage.getItem("distributePayment-price");
            }
            if ( sessionStorage.getItem("distributePayment-works") ) {
              this.works = sessionStorage.getItem("distributePayment-works");
            }

            if( parseFloat(this.security_balance) < 1000 ){

              this.total =  (parseFloat(this.price * this.works) + parseFloat(1000 - this.security_balance)).toFixed(2);

              if( this.total <= this.deposit_balance ){ //余额充足
                this.paytype = 'walletpay';
                this.is3thPay = false;
              }
              else { //余额不足
                this.paytype = 'wxpay';
                this.is3thPay = true;
                this.total = parseFloat(this.total - this.deposit_balance).toFixed(2);
              }

            }
            else {

              this.total =  parseFloat(this.price * this.works).toFixed(2);

              if( this.total <= this.deposit_balance ){ //余额充足
                this.paytype = 'walletpay';
                this.is3thPay = false;
              }
              else { //余额不足
                this.paytype = 'wxpay';
                this.is3thPay = true;
                this.total = parseFloat(this.total - this.deposit_balance).toFixed(2);
              }

              this.total = (parseFloat(this.total) + parseFloat(1000 - this.security_balance)).toFixed(2); //

            }

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
          this.getProductObj();
          this.getAccountData();
          this.checkWeiXinLogin();
          this.task_id = sessionStorage.getItem("distributePayment-task_id");
          this.sacnCodeShow = false;
          this.weChatPaytypeResult = {};
        },
        beforeMount() {
        },
        beforeUpdate() {
        },
        updated() {
        },
        activated() {
          this.getProductObj();
          this.getAccountData();
          this.checkWeiXinLogin();
          this.task_id = sessionStorage.getItem("distributePayment-task_id");
          this.sacnCodeShow = false;
          this.weChatPaytypeResult = {};
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

  .page-trusteeshipPayment {
    padding: 44px 0 60px;
    overflow-x: hidden;

    .answerSheet-list {
      background-color: #fff;
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

    .detail-list {
      margin-top: 12px;
      background-color: #fff;

      .detail-item {
        position: relative;
        height: 54px;
        padding: 12px 15px 11px;

        &:after {
          position: absolute;
          bottom: 0;
          left: 15px;
          content: '';
          width: 100%;
          height: 1px;
          background-color: #e5e5e5;
        }

        .item-icon {
          margin-right: 20px;
        }
        .item-info {

          .item-name, .item-data {
            font-size:16px;
            color:rgba(42,42,42,1);
            line-height:22px;
            &.obvious {
              color:rgba(255,62,62,1);
            }
          }
        }
      }

      .task-payment {
        padding: 12px 15px;
        font-size:14px;
        color:rgba(153,153,153,1);
        line-height:26px;
      }


    }

    .btn-box.payment {
      margin-top: 30px;
    }

    .scanCode {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 10;
      background-color: rgba(0,0,0,.7);

      .scanCode-tips {
        margin-bottom: 10px;
        font-size: 18px;
        color: #fff;
      }

      .qcode {
        width: 60%;
        height: auto;
      }

      .btn-box {
        margin-top: 20px;
        width: 80%;

        .btn.grey {
          margin-top: 20px;
        }
      }

    }

  }


</style>
