<template>

  <div class="contact">

    <back :backTitle="backTitle" />

    <div class="contact-banner"></div>

    <div class="contact-list">

      <div class="contact-item flex">
        <div class="flex both-center item-icon">
          <img src="../assets/images/icon/QQ@2x.png" alt="QQ" width="20" height="20">
        </div>
        <div class="flex main-between flex1 item-info">
          <div class="item-name">客服QQ</div>
          <div class="item-data">3119431931</div>
        </div>
      </div>

      <div class="contact-item flex">
        <div class="flex both-center item-icon">
          <img src="../assets/images/icon/wechat@2x.png" alt="QQ" width="20" height="20">
        </div>
        <div class="flex main-between flex1 item-info">
          <div class="item-name">客服微信</div>
          <div class="item-data">JoE1276</div>
        </div>
      </div>

      <div class="contact-item flex">
        <div class="flex both-center item-icon">
          <img src="../assets/images/icon/email@2x.png" alt="QQ" width="20" height="20">
        </div>
        <div class="flex main-between flex1 item-info no-border">
          <div class="item-name">电子邮箱</div>
          <div class="item-data">3119431931@qq.com</div>
        </div>
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
              backTitle : '联系客服'
            }
        },
        props: [],
        watch: {},
        computed: {},
        methods: {},
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

  .contact {
    padding-top : 44px;

    .contact-banner {
      width: 100%;
      height: 160px;
      background: url("../assets/images/contact-banner.jpg") no-repeat center;
      background-size: cover;
      margin-bottom: 12px;
    }

    .contact-list {
      padding: 0 15px;
      background-color: #fff;

      .contact-item {
        height: 45px;
        padding: 12px 0 11px;

        .item-icon {
          margin-right: 20px;
        }
        .item-info {
          position: relative;

          &:after {
            position: absolute;
            bottom: -12px;
            left: 0;
            content: '';
            width: 100%;
            height: 1px;
            background-color: #e5e5e5;
          }

          .item-name {
            font-size:16px;
            color:rgba(42,42,42,1);
            line-height:22px;
          }
          .item-data {
            font-size:16px;
            color:rgba(153,153,153,1);
            line-height:22px;
          }
        }
      }

    }
  }

</style>
