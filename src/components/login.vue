<template>

  <div class="page-login">

    <div class="flex flex-col both-center login-banner">
      <img src="../assets/images/icon/Artboard4@2x.png" alt="" width="150" height="150">
      <div class="slogan-1st"> 电商销量优化看得见 </div>
      <div class="slogan-2nd"> 打造爆款，安全可靠，海量人群标签 </div>
      <div class="login-register" @click="onLoginRegisterClick"> 登录/注册 </div>
    </div>

    <div class="flex main-between login-ad">
      <div class="flex-col">
        <div class="slogan-1st">新商家见面礼<span> 30元 </span> </div>
        <div class="slogan-2nd" @click="onLoginRegisterClick">登录马上领> </div>
      </div>
      <div class="flex both-center">
        <img src="../assets/images/icon/Artboard5@2x.png" alt="" width="100" height="100">
      </div>
    </div>

    <navbar :nav3="nav3" />

  </div>
</template>

<script type="text/ecmascript-6">
  import navbar from './common/navbar.vue'

    export default {
        name: "",
        data() {
            return {
              nav3 : true
            }
        },
        props: [],
        watch: {},
        computed: {},
        methods: {
          onLoginRegisterClick : function () {
            this.$router.push({ name: 'loginRegister'});
          }
        },
        components: {
          navbar : navbar
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

  .page-login {
    padding-bottom: 80px;

    .login-banner {
      height: 396px;
      padding: 38px 0 36px;
      background-color: #fff;
      margin-bottom: 12px;

      .slogan-1st {
        margin: 20px 0 6px;
        color:rgba(29,138,231,1);
        font-size:19px;
        line-height:26px;
        font-weight: bold;
      }
      .slogan-2nd {
        color:rgba(96,100,110,1);
        font-size:14px;
        line-height:20px;
        margin-bottom: 35px;
      }
      .login-register {
        font-size:16px;
        color:rgba(255,255,255,1);
        line-height:44px;
        width: 56%;
        height: 44px;
        background:rgba(29,138,231,1);
        border-radius: 23px;
        text-align: center;
        box-shadow: 0 5px 10px 0 #BAD9F4;
      }
    }

    .login-ad {
      height: 110px;
      padding: 26px;
      background-color: #fff;

      .slogan-1st {
        margin-bottom: 6px;
        font-size:22px;
        color:rgba(42,42,42,1);
        line-height:30px;

        span {
          color:#1370E4;
          font-size:22px;
        }
      }
      .slogan-2nd {
        font-size:16px;
        color:rgba(29,138,231,1);
        line-height:22px;
      }
    }

  }

</style>
