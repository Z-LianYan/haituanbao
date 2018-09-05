<template>
  <div class="flex both-center back-box" :class="{ light : navLight}">
    <div class="flex both-center back-left" @click="onBackClick">
      <img v-if="!navLight" src="../../assets/images/icon/arrow-white@2x.png" alt="" width="26" height="24">
      <img v-if="navLight" src="../../assets/images/icon/arrow-black gray@2x.png" alt="" width="26" height="24">
      <div class="flex1 back-tips">{{backTips}}</div>
    </div>
    <div class="back-title">{{ backTitle }}</div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "",
        data() {
            return {
              backTips : '返回'
            }
        },
        props: ['backTitle','navLight'],
        watch: {},
        computed: {},
        methods: {
          onBackClick : function () {
            history.back();
          }
        },
        components: {},
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
