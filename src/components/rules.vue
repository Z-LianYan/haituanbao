<template>
  <div class="page-rules">

    <back :backTitle="backTitle" />

    <div class="rules-list">
      <!--公告块-->
      <div class="rules-item">
        <!--公告大组-->
        <div class="item-title"> 违规说明 </div>
        <!--公告小组-->
        <div v-for="(item, index) in announcementList" class="flex cross-center item-content" @click="toPageAnnouncementDetail(index)">
          <div class="flex both-center item-sequence">{{index + 1 }}</div>
          <div class="flex1 item-data"> {{item.title}} </div>
          <div class="flex both-center item-icon">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
        </div>
      </div>

      <!--公告块-->
      <div v-if="false" class="rules-item">
        <!--公告大组-->
        <div class="item-title"> 扣分规则 </div>
        <!--公告小组-->
        <div class="flex cross-center item-content" @click="toPageAnnouncementDetail">
          <div class="flex both-center item-sequence">1</div>
          <div class="flex1 item-data">要交会员费/担保金吗？</div>
          <div class="flex both-center item-icon">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
        </div>
        <!--公告小组-->
        <div class="flex cross-center item-content no-border" @click="toPageAnnouncementDetail">
          <div class="flex both-center item-sequence">2</div>
          <div class="flex1 item-data">做任务需要垫付资金吗？</div>
          <div class="flex both-center item-icon">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
        </div>
      </div>

      <!--公告块-->
      <div v-if="false" class="rules-item">
        <!--公告大组-->
        <div class="item-title"> 封号规则 </div>
        <!--公告小组-->
        <div class="flex cross-center item-content" @click="toPageAnnouncementDetail">
          <div class="flex both-center item-sequence">1</div>
          <div class="flex1 item-data">要交会员费/担保金吗？</div>
          <div class="flex both-center item-icon">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
        </div>
        <!--公告小组-->
        <div class="flex cross-center item-content no-border" @click="toPageAnnouncementDetail">
          <div class="flex both-center item-sequence">2</div>
          <div class="flex1 item-data">做任务需要垫付资金吗？</div>
          <div class="flex both-center item-icon">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
        </div>
      </div>

      <!--公告块-->
      <div v-if="false" class="rules-item">
        <!--公告大组-->
        <div class="item-title"> 其他 </div>
        <!--公告小组-->
        <div class="flex cross-center item-content" @click="toPageAnnouncementDetail">
          <div class="flex both-center item-sequence">2</div>
          <div class="flex1 item-data">要交会员费/担保金吗？</div>
          <div class="flex both-center item-icon">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
        </div>
        <!--公告小组-->
        <div class="flex cross-center item-content no-border" @click="toPageAnnouncementDetail">
          <div class="flex both-center item-sequence">2</div>
          <div class="flex1 item-data">做任务需要垫付资金吗？</div>
          <div class="flex both-center item-icon">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
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
              backTitle : '违规说明',
              announcementList : [
                {
                  title : '扣分规则',
                  content : '买手做完任务后，垫付订单款超过3个工作日内未审核返款，每个扣10分（10元）。<br>' +
                  '发布任务后宝贝下架或店铺原因导致任务取消，扣100分（100元）。'
                },
                {
                  title : '封号规则',
                  content : '超过5个工作日未审核返回买手垫付的订单款，扣除相应的保证金额度，封号1-3个月。<br>' +
                  '发布任务后店铺原因导致任务取消超过3次，封号一个月。'
                }
              ]
            }
        },
        props: [],
        watch: {},
        computed: {},
        methods: {
          toPageAnnouncementDetail : function (index) {

            sessionStorage.setItem("backTitle", this.backTitle);

            sessionStorage.setItem("announcementTitle", this.announcementList[index].title);

            sessionStorage.setItem("announcementContent", this.announcementList[index].content);

            this.$router.push({
              name : 'announcementDetail'
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

  .page-rules {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right:0;
    right:0;
    padding-top : 44px;

    .rules-list {
      background-color: #eff0f4;
      padding-bottom: 60px;

      & .rules-item:first-child {
        margin-top: 15px;
      }

      & .rules-item:last-child {
        margin-bottom: 0;
      }

      .rules-item {
        margin-bottom : 12px;
        padding-left : 15px;
        background-color: #fff;

        .item-title {
          position: relative;
          padding: 13px 0;
          height:50px;
          color:rgba(42,42,42,1);
          font-size: 17px;
          font-weight: bold;
          line-height:24px;

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
        }

        .item-content {
          position: relative;
          height: 50px;

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

          .item-sequence {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            font-size:13px;
            color:rgba(255,255,255,1);
            line-height:18px;
            //background-image: linear-gradient(90deg,#6ECAF5,#379EF5);
            background-image: linear-gradient(90deg,#F3989D,#FA6C88);
          }

          .item-data {
            margin-left: 8px;
            font-size:16px;
            color:rgba(42,42,42,1);
            line-height:22px;
          }

          .item-icon {
            padding-right: 15px;
          }

        }
      }
    }


  }


</style>
