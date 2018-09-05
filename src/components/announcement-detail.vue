<template>
  <div class="page-announcementDetail">
    <back :backTitle="backTitle" />

    <div class="announcement-box">

      <div class="flex box-title">
        <div class="flex both-center anno-icon">
          <img v-if="icon1" src="../assets/images/icon/systemNoticePrimary@2x.png" alt="" width="24" height="24">
          <img v-if="icon2" src="../assets/images/icon/warning@2x.png" alt="" width="24" height="24">
        </div>
        <div class="flex both-center anno-title"> {{articleTitle}} </div>
      </div>

      <div class="flex box-content">
        <div v-html="articleContent"></div>
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
              backTitle : '违规说明详情',

              icon1 : true,
              icon2 : false,

              articleTitle : '标题',
              articleContent : '内容'
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

            if( sessionStorage.getItem("backTitle") === "平台公告" ){

              this.icon1 = true;
              this.icon2 = false;

              this.backTitle = sessionStorage.getItem("backTitle");
              this.articleTitle = sessionStorage.getItem("announcementTitle");
              this.articleContent = sessionStorage.getItem("announcementContent");
            }
            else if( sessionStorage.getItem("backTitle") === "违规说明" ) {

              this.icon1 = false;
              this.icon2 = true;

              this.backTitle = sessionStorage.getItem("backTitle");
              this.articleTitle = sessionStorage.getItem("announcementTitle");
              this.articleContent = sessionStorage.getItem("announcementContent");
            }
            else {}

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

  .page-announcementDetail {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right:0;
    background-color: #fff;
    padding-top : 44px;

    .announcement-box {
      padding: 0 15px 44px;

      .box-title {
        position: relative;
        padding: 22px 0 21px;

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

        .anno-title {
          margin-left: 12px;
          font-size:19px;
          font-weight: bold;
          color:rgba(42,42,42,1);
        }
      }

      .box-content {
        padding: 14px 3px;
        font-size:17px;
        color:rgba(42,42,42,1);
        line-height:24px;
      }


    }

  }


</style>
