<template>
  <div class="page-license">
    <back :backTitle="backTitle" />

    <div class="license-box">
      <div class="title">服务协议</div>
      <div class="content" v-html="content"></div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import back from './common/back.vue'

    export default {
        name: "",
        data() {
            return {
              backTitle : '服务协议',
              content : '尊敬爱的海豚宝商家用户: 在正式合作开始之前，请仔细阅读合作协议，如果继续注册使用即代表您同意以下条款: <br>' +
              '1. 违规处罚: 在开始发布任务之前，请仔细阅读平台规则和进行新手测试，如果在任务过程中出现违规操作，我们将按照平台规则进行处罚。 <br>' +
              '2. 资金安全: 为了在确认收货之前买家的资金安全保障，商家发布任务时须缴纳保证金和任务押金，买手垫付的货款须在约定时间内完成审核返款，否则平台有权从保证金中先行划扣。 <br>' +
              '3. 权利保留： 平台规则为根据运营情况，电商平台的规则调整，本平台保留调整规则的权利，并以平台公告规则更新为准。'
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

  .page-license {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right:0;
    padding-top : 44px;
    background-color: #fff;

    .license-box {
      padding : 0 15px 41px;

      .title {
        margin: 28px 0 14px;
        font-size:17px;
        color:rgba(96,100,110,1);
        line-height:24px;
        text-align: center;
      }

      .content {
        padding : 0 13px;
        font-size:16px;
        color:rgba(96,100,110,1);
        line-height:24px;
        word-break: break-all;
      }

    }
  }





</style>
