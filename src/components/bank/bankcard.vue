<template>

  <div class="page-adminInfo">

    <back :backTitle="backTitle" />

    <div class="tips-text">正确填写银行卡信息，否则无法正常提现</div>


    <div class="section">

      <div class="flex cross-center admin-item">
        <div class="flex cross-center item-info">
          <div class="item-name">开户姓名</div>
          <input class="flex1 item-input" type="text" placeholder="请输入" v-model="realname">
        </div>
      </div>

      <div class="flex cross-center admin-item">
        <div class="flex cross-center item-info">
          <div class="item-name">银行卡号</div>
          <input class="flex1 item-input" type="text" placeholder="请输入" v-model="account">
        </div>
      </div>

      <div class="flex cross-center admin-item">
        <div class="flex cross-center item-info">
          <div class="item-name">开户银行</div>
          <input class="flex1 item-input" type="text" placeholder="请输入" v-model="bank">
        </div>
      </div>


<!--      <div class="flex cross-center admin-item">
        <div class="flex cross-center item-info ">
          <div class="item-name">开户银行</div>

          <div class="flex1 security-code-input">
            <input class="item-input" type="text" placeholder="请选择" v-model="bank" readonly>
          </div>

          <div class="flex flex1 main-end item-icon">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>

          <select name="" class="sex-selector" v-model="bank">
            <option value="中国银行"> 中国银行 </option>
            <option value="建设银行"> 建设银行 </option>
            <option value="农业银行"> 农业银行 </option>
            <option value="工商银行"> 工商银行 </option>
          </select>

        </div>
      </div>-->




      <div class="flex cross-center admin-item">
        <div class="flex cross-center item-info no-border">
          <div class="item-name">开户支行</div>
          <input class="flex1 item-input" type="text" placeholder="请输入" v-model="bank_branch">
        </div>
      </div>

    </div>


    <div class="btn-box admin">
      <button class="btn" :class="{ active : ( realname && account && bank && bank_branch ) }"
              :disabled="!( realname && account && bank && bank_branch )"
              @click="onBtnClick"> 保存
      </button>
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
             fAccount : '',
             backTitle : '银行卡信息',
             account : '', //开户银行账号
             realname : '', //开户姓名
             bank : '', //开户银行
             bank_branch : '' //开户支行
           }
       },
       props: [],
       watch: {},
       computed: {},
       methods: {
         onBtnClick : function () {

           // 添加银行卡
           axios({
             method: 'post',
             url: BankAccountSave,
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
             },
             transformRequest: [data => Qs.stringify(data)],
             params : {
               ssid: sessionStorage.getItem("ssid")
             },
             data : {
               account : this.account,
               realname : this.realname,
               bank : this.bank,
               bank_branch : this.bank_branch,

             }
           }).then( ( response ) => {

             let result = response.data;
             //console.log(result);

             if ( result.code > 0 ) {
               EventHub.$emit('toastOpen', result.message);
               setTimeout(()=>{
                 window.history.back();
                 EventHub.$emit('doRefreshRouter','doRefreshRouter');
               },2000);
             }
             else if ( result.code === -100 ) {
               EventHub.$emit('toastOpen', result.message);
               sessionStorage.clear();
               this.$router.push({ name: 'loginRegister'});
             }
             else {
               EventHub.$emit('toastOpen', result.message);
             }

           }).catch( (error) => {
             console.log(error);
           });


         },
         getBankAccountDefault : function () {

           // 获取账户信息
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
             //console.log(result);

             if ( result.code > 0 ) {
               this.account = result.data.account;
               this.realname = result.data.realname;
               this.bank = result.data.bank;
               this.bank_branch = result.data.bank_branch;
             }
             else if ( result.code === -100 ) {
               EventHub.$emit('toastOpen', result.message);
               sessionStorage.clear();
               this.$router.push({ name: 'loginRegister'});
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

  .page-adminInfo {
    padding-top: 44px;

    .section {
      margin-bottom: 12px;

      .admin-item {
        height: 50px;
        background-color: #fff;

        .item-info {
          width: 100%;
          height: 100%;
          position: relative;
          margin-left : 15px;

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

          .item-name {
            min-width: 72px;
            font-size:16px;
            color:rgba(42,42,42,1);
            line-height:22px;
            margin-right: 29px;
          }

          .security-code-input, .identifying-code-input {
            input {
              width: 100%;
              height: 100%;
            }
          }

          .item-icon {
            padding-right: 8px;
          }

          .sex-selector {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 100px;
            right: 0;
            opacity: 0;
          }

          .identifying-code-line {
            width: 1px;
            height: 20px;
            background-color: #DDDCE1;
            margin-right: 22px;
          }

          .identifying-code {
            font-size:14px;
            color:rgba(29,138,231,1);
            line-height:20px;
          }


          .item-input {
            height: 100%;
            font-size:16px;
            color: #999;
            line-height:22px;
            border: none;

            &:focus {
              outline : none;
            }

            /* placeholder */
            &::-webkit-input-placeholder { /* WebKit browsers */
              color:rgba(204,204,204,1);
              font-size: 16px;
            }
            &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
              color:rgba(204,204,204,1);
              font-size: 16px;
            }
            &::-moz-placeholder { /* Mozilla Firefox 19+ */
              color:rgba(204,204,204,1);
              font-size: 16px;
            }
            &:-ms-input-placeholder { /* Internet Explorer 10+ */
              color:rgba(204,204,204,1);
              font-size: 16px;
            }

          }

          .security-code {
            width: 100px;
          }

        }

      }

    }

    .btn-box.admin {
      margin-top: 30px;
    }


  }

</style>
