<template>

  <div class="page-loginRegister">

    <!--登录模块-->
    <div v-if="loginShow" class="login-box">

      <div class="flex main-end login-close" @click="onCloseClick">
        <img src="../assets/images/icon/close@2x.png" alt="close" width="24" height="24">
      </div>

      <div class="flex main-center login-logo">
        <img src="../assets/images/icon/Artboard5Copy@2x.png" alt="logo" width="83" height="83">
      </div>

      <div class="flex cross-center login-input">
        <div class="flex cross-center input-icon">
          <img src="../assets/images/icon/phone@2x.png" alt="" width="20" height="20">
        </div>
        <div class="flex cross-center input-area">
          <input ref="l_input" type="tel" maxlength="11" placeholder="请输入帐号/手机号码" v-model="username" autofocus>
        </div>
      </div>

      <div class="flex cross-center login-input">
        <div class="flex cross-center input-icon">
          <img src="../assets/images/icon/password@2x.png" alt="" width="20" height="20">
        </div>
        <div class="flex cross-center input-area">
          <input type="password" v-model="password" placeholder="请输入密码">
        </div>
      </div>

      <div class="btn-box login">
        <button class="btn" :class="{ active : ( username.length === 11 && password.length >= 6 ) }"
                :disabled="!( username.length === 11 && password.length >= 6 )" @click="onLoginBtnClick"> 登录 </button>
      </div>

      <div class="flex main-between login-other">
        <div class="register" @click="onRegisterClick"> 手机注册 </div>
        <div class="forget-password" @click="onForgetPasswordClick"> 忘记密码？</div>
      </div>

    </div>

    <!--注册模块-->
    <div v-if="registerShow" class="register-box">

      <div class="flex cross-center register-item">
        <div class="flex cross-center item-info">
          <div class="item-name">手机号</div>
          <input ref="r_input" class="flex1 item-input" type="text" maxlength="11" placeholder="请输入手机号码" v-model="mobile" autofocus>
        </div>
      </div>

<!--      <div class="flex cross-center register-item">
        <div class="flex cross-center item-info">
          <div class="item-name">校验码</div>

          <div class="flex1 security-code-input">
            <input class="item-input" type="text" placeholder="请输入校验码" v-model="sSecurityCode">
          </div>

          <div class="flex1 both-center">
            <img src="../assets/images/SecurityCode.png" alt="验证码" width="90" height="46">
            <img src="../assets/images/icon/refresh@2x.png" alt="刷新" width="24" height="24">
          </div>

        </div>
      </div>-->

      <div class="flex cross-center register-item">
        <div class="flex cross-center item-info">
          <div class="item-name">验证码</div>

          <div class="flex1 identifying-code-input">
            <input class="item-input" type="text" placeholder="请输入验证码" v-model="code">
          </div>

          <div class="flex1 both-center">
            <div class="identifying-code-line"></div>

            <!--<button class="identifying-code"  @click="onIdentifyingCodeClick"  :disabled="!( mobile.length === 11 )"> 获取验证码 </button>-->


            <button class="identifying-code" @click="onIdentifyingCodeClick" v-if="captchaTextShow" :disabled="!( mobile.length === 11 )"> {{ captchaText }} </button>
            <button class="identifying-code" @click="onIdentifyingCodeClick" v-if="!captchaTextShow" disabled> {{ time }}s </button>


          </div>

        </div>
      </div>

      <div class="flex cross-center register-item">
        <div class="flex cross-center item-info no-border">
          <div class="item-name">密码</div>
          <input class="flex1 item-input" type="password" placeholder="请输入密码" v-model="sPassword">
        </div>
      </div>

      <div class="btn-box submit">
        <button class="btn" :class="{ active : ( mobile.length === 11 && code && sPassword.length >= 6 ) }"
                :disabled="!( mobile.length === 11 && code && sPassword.length >= 6)" @click="onSubmitBtnClick"> 提交 </button>
      </div>

    </div>

    <div v-if="registerShow"  class="flex both-center back-box light">
      <div class="flex both-center back-left" @click="onBackClick">
        <img src="../assets/images/icon/arrow-black gray@2x.png" alt="" width="26" height="24">
        <div class="flex1 back-tips">返回</div>
      </div>
      <div class="back-title">注册</div>
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
              backTitle : '注册', //页面信息
              loginShow : true,
              registerShow : false,

              time: CaptchaTime,
              captchaText : '获取验证码',
              captchaTextShow : true,

              username : '', //登录帐号
              password : '', //登录密码

              mobile : '', //注册帐号
              code : '', //手机验证码
              sIdentifyingCode : '',//注册验证码
              sPassword : ''//注册密码
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
          //登录页面
          onCloseClick : function () {
            this.$router.push({ name: 'login'});
          },
          //注册页面
          onRegisterClick : function () {
            this.loginShow = !this.loginShow;
            this.registerShow = !this.registerShow;
          },
          //忘记密码
          onForgetPasswordClick : function () {
            this.$router.push({ name: 'resetPassword'});
          },
          //后退按钮
          onBackClick : function () {
            this.loginShow = !this.loginShow;
            this.registerShow = !this.registerShow;
          },
          //登录
          onLoginBtnClick : function () {

            axios({
              method: 'post',
              url: Login,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
              transformRequest: [data => Qs.stringify(data)],
              data : {
                username: this.username,
                password : this.password,
                type : 2
              }
            }).then( (response) => {

              let result = response.data;
              //console.log(result);

              sessionStorage.setItem("dname", result.data.dname);
              sessionStorage.setItem("mobile", result.data.mobile);
              sessionStorage.setItem("ssid", result.data.ssid);
              sessionStorage.setItem("user_id", result.data.user_id);

              if ( result.code > 0 ) {
                EventHub.$emit('toastOpen', result.message);
                this.$router.replace({ name : 'main' }); // 去首页
                EventHub.$emit('doRefreshRouter','doRefreshRouter');
              }
              else if ( result.code === -1 ) {
                EventHub.$emit('toastOpen', result.message);
              }
              else {
                EventHub.$emit('toastOpen', result.message);
              }

            }).catch( (error) => {
              console.log(error);
            });

          },
          //注册
          onSubmitBtnClick : function () {

            axios({
              method: 'post',
              url: Register,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
              transformRequest: [data => Qs.stringify(data)],
              data : {
                mobile: this.mobile,
                code : this.code,
                password : this.sPassword,
                type : 2
              }
            }).then( (response) => {
              let result = response.data;
              //console.log(result);

              sessionStorage.setItem("ssid",result.ssid);

              if ( result.code > 0 ) {
                EventHub.$emit('toastOpen', result.message);
                this.$router.push({ name : 'main' }); // 去首页
                EventHub.$emit('doRefreshRouter','doRefreshRouter');
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
          //验证码
          onIdentifyingCodeClick : function () {

            axios({
              method: 'post',
              url: GetMobileRegcode,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
              transformRequest: [data => Qs.stringify(data)],
              data : {
                mobile : this.mobile,
                type : 2
              }
            }).then( ( response ) => {

              let result = response.data;
              //console.log(result);

              let interval = window.setInterval( () => {
                if ( (this.time--) <= 0) {
                  this.time = CaptchaTime;
                  window.clearInterval(interval);
                  this.captchaTextShow = !this.captchaTextShow ;
                }
              }, 1000);
              this.captchaTextShow = !this.captchaTextShow ;


              if ( result.code > 0 ) {
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

            this.$nextTick( ()=>{
              let l_input = this.$refs.l_input;
              l_input.focus()
            } );

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

  .page-loginRegister {

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

      .btn-box.login {
        margin : 30.5px auto 17px;
        text-align: center;

        .btn {
          width: 86.6%;
        }

      }



      .login-other {
        padding : 0 25px;

        .register, .forget-password {
          font-size:13px;
          color:rgba(153,153,153,1);
          line-height:18px;
        }

      }

    }

    .register-box {
      padding-top : 44px;

      & .register-item:first-child {
        margin-top: 15px;
      }

      .register-item {
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
