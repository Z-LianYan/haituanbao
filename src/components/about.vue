<template>

  <div class="about">

    <back :backTitle="backTitle" />

    <div class="flex flex-col both-center about-banner">
      <img src="../assets/images/icon/Artboard5Copy2@2x.png" alt="" width="80" height="80">
      <div class="version"> 版本号 1.0.0 </div>
      <!--<div class="version"> beta 20180204 0108 </div>-->
    </div>

    <div class="flex main-between license" @click="toPageLicense">
      <div>服务协议</div>
      <img src="../assets/images/icon/arrow@2x.png" alt="" width="20" height="22">
    </div>

    <div class="business">
      <div class="business-tittle">商务合作</div>
      <div class="business-item">
        <div>商家报名：(QQ)3119431931 曲曲 </div>
        <div>渠道合作：(QQ)3119431931 曲曲 </div>
      </div>
    </div>

  </div>


</template>

<script type="text/ecmascript-6">

  import back from './common/back.vue'

    export default {
        name: "",
        data() {
            return {
              backTitle : '关于我们'
            }
        },
        props: [],
        watch: {},
        computed: {},
        methods: {
          toPageLicense : function () {
            this.$router.push({ name : 'license' })
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

  .about {
    padding-top : 44px;

    .about-banner {
      width: 100%;
      height: 203px;

      .version {
        font-size:13px;
        color:rgba(145,151,163,1);
        line-height:18px;
        margin-top: 12px;
      }
    }

    .license {
      padding: 12px 15px 11px;
      background-color: #fff;
      font-size:16px;
      color:rgba(42,42,42,1);
      line-height:22px;
    }

    .business {
      margin-top: 12px;
      padding: 0 15px;
      background-color: #fff;

      .business-tittle {
        padding: 12px 0 11px;
        font-size:16px;
        color:rgba(42,42,42,1);
        line-height:22px;
        border-bottom: 1px solid #e5e5e5;
      }

      .business-item {
        padding: 18px 0;
        font-size:16px;
        color:rgba(96,100,110,1);
        line-height:29px;
      }
    }

  }

</style>
