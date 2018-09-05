<template>

  <div class="page-password">

    <!--找回密码模块-->
    <div v-if="findPasswordShow" class="password-box">

      <div class="flex cross-center password-item">
        <div class="flex cross-center item-info">
          <div class="item-name">手机号</div>
          <input class="flex1 item-input" type="tel" maxlength="11" placeholder="请输入手机号码" v-model="fAccount">
        </div>
      </div>

      <div class="flex cross-center password-item">
        <div class="flex cross-center item-info">
          <div class="item-name">验证码</div>

          <div class="flex1 identifying-code-input">
            <input class="item-input" type="text" placeholder="请输入验证码" v-model="fIdentifyingCode">
          </div>

          <div class="flex1 both-center" >
            <div class="identifying-code-line"></div>
<!--            <button class="identifying-code" :disabled=" !(fAccount.length === 11) " @click="onResetCodeClick"> 获取验证码
            </button>-->

            <button class="identifying-code" @click="onResetCodeClick" v-if="captchaTextShow" :disabled="!(fAccount.length === 11)"> {{ captchaText }} </button>
            <button class="identifying-code" @click="onResetCodeClick" v-if="!captchaTextShow" disabled> {{ time }}s </button>

          </div>

        </div>
      </div>

      <div class="btn-box submit">
        <button class="btn" :class="{ active : ( fAccount.length === 11 && fIdentifyingCode ) }"
                :disabled="!(fAccount.length === 11 && fIdentifyingCode)" @click="onNextStepClick"> 下一步 </button>
      </div>

    </div>

    <div v-if="findPasswordShow" class="flex both-center back-box light">
      <div class="flex both-center back-left" @click="onBackClick1">
        <img src="../assets/images/icon/arrow-black gray@2x.png" alt="" width="26" height="24">
        <div class="flex1 back-tips">返回</div>
      </div>
      <div v-if="findPasswordShow" class="back-title">找回密码</div>
    </div>

    <!--重置密码模块-->
    <div v-if="resetPasswordShow" class="password-box">

      <div class="flex cross-center password-item">
        <div class="flex cross-center item-info">
          <div class="item-name" style="min-width: 64px;">新密码</div>
          <input class="flex1 item-input" type="password" placeholder="请输入新密码" v-model="nPassword">
        </div>
      </div>

      <div class="flex cross-center password-item">
        <div class="flex cross-center item-info">
          <div class="item-name">确认密码</div>
          <input class="flex1 item-input" type="password" placeholder="再次输入密码" v-model="nPasswordConfirm">
        </div>
      </div>

      <div class="btn-box submit">
        <button class="btn" :class="{ active : ( nPassword.length >=6 && nPasswordConfirm.length >=6 ) }"
                :disabled="!( nPassword.length >=6 && nPasswordConfirm.length >=6 )" @click="onSubmitBtnClick"> 提交 </button>
      </div>

    </div>

    <div v-if="resetPasswordShow" class="flex both-center back-box light">
      <div class="flex both-center back-left" @click="onBackClick2">
        <img src="../assets/images/icon/arrow-black gray@2x.png" alt="" width="26" height="24">
        <div class="flex1 back-tips">返回</div>
      </div>
      <div v-if="resetPasswordShow" class="back-title">重置密码</div>
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
              findPasswordShow : true,
              resetPasswordShow : false,

              time: CaptchaTime,
              captchaText : '获取验证码',
              captchaTextShow : true,

              fAccount : '', //注册帐号
              fIdentifyingCode : '',//注册验证码

              nPassword : '',
              nPasswordConfirm : ''
            }
        },
        props: [],
        watch: {
          account : function (newVal, oldVal) {
              setTimeout( ()=>{
                if( newVal.length === 11 ){
                }
                else {}
              },50);
          }
        },
        computed: {},
        methods: {
          onBackClick : function () {
          },
          onNextStepClick : function () {
            this.findPasswordShow = !this.findPasswordShow;
            this.resetPasswordShow = !this.resetPasswordShow;
          },
          onBackClick1 : function () {
            history.back()
          },
          onBackClick2 : function () {
            this.findPasswordShow = !this.findPasswordShow;
            this.resetPasswordShow = !this.resetPasswordShow;
          },
          onResetCodeClick : function () {
            axios({
              method: 'POST',
              url: Resetcode,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
              transformRequest: [data => Qs.stringify(data)],
              params : {
                ssid: sessionStorage.getItem("ssid")
              },
              data : {
                mobile : this.fAccount,
                type : 2
              }
            }).then( ( response ) => {

              let result = response.data;
              //console.log(result);

              if ( result.code > 0 ) {
                EventHub.$emit('toastOpen', result.message);
                let interval = window.setInterval( () => {
                  if ( (this.time--) <= 0) {
                    this.time = CaptchaTime;
                    window.clearInterval(interval);
                    this.captchaTextShow = !this.captchaTextShow ;
                  }
                }, 1000);
                this.captchaTextShow = !this.captchaTextShow ;

              }
              else if ( result.code === -100 ) {
                EventHub.$emit('toastOpen', result.message);
              }
              else {
                EventHub.$emit('toastOpen', result.message);
              }

            }).catch( (error) => {
              console.log(error);
            });


          },
          onSubmitBtnClick : function () {
            axios({
              method: 'POST',
              url: ResetPassword,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
              transformRequest: [data => Qs.stringify(data)],
              params : {
                ssid: sessionStorage.getItem("ssid")
              },
              data : {
                mobile : this.fAccount,
                code :this.fIdentifyingCode,
                password : this.nPassword
              }
            }).then( ( response ) => {

              let result = response.data;
              //console.log(result);

              if ( result.code > 0 ) {
                EventHub.$emit('toastOpen', result.message);
                this.$router.push({ name : 'main' }); // 去首页
              }
              else if ( result.code === -1 ) {
                EventHub.$emit('toastOpen', result.message);
              }
              else if ( result.code === -100 ) {
                EventHub.$emit('toastOpen', result.message);
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
        mounted() {
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

  .page-password {

    .login-box {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #fff;

      .login-close {
        padding: 10px 10px 0 0;
      }
      .login-logo {
        padding: 34px 0 37px;
      }

      .login-input {
        width: 87%;
        height: 50px;
        margin: 0 auto;
        padding: 14px 0;
        border-bottom: 1px solid #e5e5e5;

        .input-area {
          input {
            height: 100%;
            margin-left: 22px;
            font-size:16px;
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
        }
      }

      .login-btn {
        width: 86.6%;
        height: 45px;
        background-color: rgb(141,196,242);
        color : #fff;
        font-size: 17px;
        line-height: 45px;
        margin : 30.5px auto 17px;
        border-radius: 5px ;
        text-align: center;
        transition: background .2s ease;

        &.active {
          background-color: #1D8AE7;
        }
      }

      .login-other {
        padding : 0 25px;

        .password, .forget-password {
          font-size:13px;
          color:rgba(153,153,153,1);
          line-height:18px;
        }

      }

    }

    .password-box {
      padding-top : 44px;

      & .password-item:first-child {
        margin-top: 15px;
      }

      .password-item {
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
            min-width: 48px;
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
            background-color: transparent;
            border: none;
          }



          .item-input {
            height: 100%;
            font-size:16px;
            color:rgba(96,100,110,1);
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

      .btn-box.submit {
        margin: 31px auto 0;
        text-align: center;

        .btn {
          width: 86.6%;
        }
      }


    }

  }


  .back-box {
    position: fixed;
    background-image: linear-gradient(90deg, #02AAF2, #4475F0);
    top: 0;
    left: 0;
    right: 0;
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

</style>
