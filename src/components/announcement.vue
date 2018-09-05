<template>
  <div class="page-announcement">

    <back :backTitle="backTitle" />

    <div class="announcement-list">
      <!--公告块-->
      <div class="announcement-item">
        <!--公告大组-->
        <div class="item-title"> 平台公告 </div>
        <!--公告小组-->

        <div v-for="(item, index) in announcementList"
             class="flex cross-center item-content" @click="toPageAnnouncementDetail(index)">
          <div class="flex both-center item-sequence"> {{index + 1}} </div>
          <div class="flex1 item-data"> {{item.title}} </div>
          <div class="flex both-center item-icon">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
        </div>


      </div>

      <!--公告块-->
      <div v-if="false" class="announcement-item">
        <!--公告大组-->
        <div class="item-title"> 问题说明 </div>
        <!--公告小组-->
        <div class="flex cross-center item-content" @click="toPageAnnouncementDetail">
          <div class="flex both-center item-sequence">1</div>
          <div class="flex1 item-data">物流不更新或不签收派送等说明</div>
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
      <div v-if="false" class="announcement-item">
        <!--公告大组-->
        <div class="item-title"> 活动通知 </div>
        <!--公告小组-->
        <div class="flex cross-center item-content" @click="toPageAnnouncementDetail">
          <div class="flex both-center item-sequence">1</div>
          <div class="flex1 item-data">物流不更新或不签收派送等说明</div>
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
      <div v-if="false" class="announcement-item">
        <!--公告大组-->
        <div class="item-title"> 其他 </div>
        <!--公告小组-->
        <div class="flex cross-center item-content" @click="toPageAnnouncementDetail">
          <div class="flex both-center item-sequence">2</div>
          <div class="flex1 item-data">关于平台要求买号选择性别说明</div>
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
              backTitle : '平台公告',
              announcementList : [
                {
                    title : '商家保证金及任务押金制度',
                    content : '买手做任务时需要垫付商品的货款，为了有效维护卖家和买手之间的权益，平台建立商家担保金以及任务押金机制。如同淘宝开店缴纳的保证金，进驻平台的卖家需缴纳1000元保证金以及任务单数相应的任务押金，由平台暂时保管。<br> ' +
                    '关于保证金：<br> ' +
                    '1、留存的1000元保证金不允许被卖家用于财务操作（包括发布任务、提现等）；<br> ' +
                    '2、对于工单违规等所产生的罚款，平台有权从担保金里扣减；<br> ' +
                    '3、当留存的保证金少于1000元时，卖家需要继续充值保证金至1000元，才能正常使用多于1000元的部分。<br> ' +
                    '4、当卖家决定离开平台时，可申请取回这1000元担保金。 <br>' +
                    '关于任务押金：<br> ' +
                    '1、任务押金根据任务的佣金及数量，按总价进行托管，如果任务未消耗完，则下次发布任务时可以继续使用：<br> ' +
                    '2、买手做任务时垫付的商品货款，由商家审核后按照约定自行通过银行转账方式返款给买手，佣金在商家审核通过后划付到买手平台账户。'
                },
                {
                  title : '完成新手任务可领取任务见面礼',
                  content : '尊敬的海豚宝用户：<br> ' +
                  '海豚宝卖家效果补充平台内测上线，内测期间，完成商家新手任务即可获得30元的任务积分。<br> ' +
                  '欢迎向客服联系，提出系统bug 及产品意见，提出的系统bug 或意见被受理的用户将奖励20元的积分发放到平台账户~'
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

  .page-announcement {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right:0;
    right:0;
    padding-top : 44px;

    .announcement-list {
      background-color: #eff0f4;
      padding-bottom: 60px;

      & .announcement-item:first-child {
        margin-top: 15px;
      }

      & .announcement-item:last-child {
        margin-bottom: 0;
      }

      .announcement-item {
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
            background-image: linear-gradient(90deg,#6ECAF5,#379EF5);
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
