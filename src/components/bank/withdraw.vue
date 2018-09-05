<template>

  <div class="page-withdraw">

    <back :backTitle="backTitle" />

    <div class="flex target-bankcard">

      <div class="target-name">到转账银行</div>

      <div class="bankcard-data">
        <div class="flex both-center bankcard-name">
          <img src="../../assets/images/icon/bank.png" alt="" width="20" height="20">
          <div>{{bank_name}}</div>
          <div class="flex cross-center">
            （***{{bank_account.slice(-4)}}）
          </div>
        </div>
        <div class="bankcard-tips">审核通过后2个工作日内到账</div>
      </div>

    </div>

    <div class="payment-amount-box">

        <div class="amount-text"> 提现金额 </div>

        <div class="flex both-center amount-box">
          <div class="amount-unit">￥</div>
          <div class="flex1 amount-input">
            <input type="number" placeholder="0.00" v-model="amount" />
          </div>
        </div>

        <div class="amount-tips">可提现 {{deposit_balance}} 元</div>

    </div>

    <div class="btn-box withdraw">
      <button class="btn" :class="{ active : amount }" :disabled="!amount" @click="doWithdrawals">提交</button>
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
             backTitle : '提现',

             bank_account_id : '',
             amount : '',

             deposit_balance : '', // 存款余额
             bank_account : '***', // 开户行帐号
             bank_name : '' // 开户行名称
           }
       },
       props: [],
       watch: {},
       computed: {},
       methods: {
         // 执行提现功能
         doWithdrawals : function (){

           axios({
             method: 'POST',
             url: WalletWithdrawal,
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
             },
             params : {
               ssid: sessionStorage.getItem("ssid")
             },
             transformRequest: [data => Qs.stringify(data)],
             data : {
               bank_account_id : this.bank_account_id,
               amount : this.amount
             }
           }).then( ( response ) => {

             let result = response.data;
             this.result = result;

             if ( result.code > 0 ) {
               EventHub.$emit('toastOpen', result.message);
               setTimeout(()=>{
                   window.history.back();
               },2000)
             }
             else {
               EventHub.$emit('toastOpen', "获取数据出错");
             }

           }).catch( (error) => {
             console.log(error);
           });

           },
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
             }
             else {
               EventHub.$emit('toastOpen', result.message);
             }

           }).catch( (error) => {
             console.log(error);
           });


         },
         //获取绑定银行卡信息
         getBankAccountDefault : function () {
           axios({
             method: 'get',
             url: BankAccountDefault,
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
             },
             transformRequest: [data => Qs.stringify(data)],
             params : {
               ssid: sessionStorage.getItem("ssid")
             }
           }).then( ( response ) => {
             let result = response.data;

             if ( result.code > 0 ) {
               this.bank_account = result.data.account;
               this.bank_name = result.data.bank;
               this.bank_account_id = result.data.id;
             }
             else {
               EventHub.$emit('toastOpen', result.message);
             }

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
       beforeMount() {
       },
       mounted() {
           this.getAccountData();
           this.getBankAccountDefault();
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
       }
   }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less" scoped>




  .page-withdraw {
    padding-top: 44px;

    .target-bankcard {
      margin-top: 15px;
      padding: 21px 15px;
      height:90px;
      background:rgba(255,255,255,1);

      .target-name {
        margin-right: 18px;
        font-size:16px;
        color:rgba(54,64,77,1);
        line-height:22px;
      }

      .bankcard-data {

        .bankcard-name {
          margin-bottom: 8px;
          font-size:16px;
          color:rgba(96,100,110,1);
          line-height:22px;

          img {
            margin-right: 6px;
          }
        }
        .bankcard-tips {
          font-size:13px;
          color:rgba(153,153,153,1);
          line-height:18px;
        }
      }

    }


    .payment-amount-box {
      width: 100%;
      min-height: 110px;
      padding: 15px 0 0 15px;
      margin-top: 12px;
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

      .amount-tips {
        margin-top: 18px;
        position: relative;
        padding-top: 12px;
        padding-bottom: 12px;
        font-size:13px;
        color:rgba(153,153,153,1);
        line-height:22px;

        &:after {
          position: absolute;
          top: 0;
          left: 0;
          content: '';
          width: 100%;
          height: 1px;
          background-color: rgb(229,229,229);
          transform: scaleY(1);
        }
      }


    }

    .btn-box.withdraw {
      margin-top: 30px;
    }

  }


</style>
