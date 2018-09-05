<template>

  <div class="faq">

    <back :backTitle="backTitle" />

<!--    <div class="flex task-nav">
      <div class="flex1 both-center transition" :class="{ active : nav1 }" @click="onNavClick(1)">提现到账</div>
      <div class="flex1 both-center transition" :class="{ active : nav2 }" @click="onNavClick(2)">任务得分</div>
      <div class="flex1 both-center transition" :class="{ active : nav3 }" @click="onNavClick(3)">审核申诉</div>
      <div class="flex1 both-center transition" :class="{ active : nav4 }" @click="onNavClick(4)">其他问题</div>
    </div>-->

    <!--提现到账-->
    <div v-if="nav1" class="faq-item">

      <div v-for="(item, index) in faqList[0]" :key="index" class="flex-col cross-center item-box" @click="onFaqToggle1(index)">
        <div class="flex cross-center item-content">
          <div class="flex both-center item-sequence">Q</div>
          <div class="flex1 item-data">{{item.title}}</div>
          <div class="flex both-center item-icon">
            <img :class="{ 'icon-rotate' : faq1[index]  }" src="../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
        </div>
        <div v-if="faq1[index]" class="faq-text">{{item.content}}</div>
      </div>

    </div>

    <!--任务得分-->
    <div v-if="nav2" class="faq-item">

      <div v-for="(item, index) in faqList[1]" class="flex-col cross-center item-box" @click="onFaqToggle2(index)">
        <div class="flex cross-center item-content">
          <div class="flex both-center item-sequence">Q</div>
          <div class="flex1 item-data">{{item.title}}</div>
          <div class="flex both-center item-icon">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
        </div>
        <div v-if="faq2[index]" class="faq-text">{{item.content}}</div>
      </div>

    </div>

    <!--审核申诉-->
    <div v-if="nav3" class="faq-item">

      <div v-for="(item, index) in faqList[2]" class="flex-col cross-center item-box" @click="onFaqToggle3(index)">
        <div class="flex cross-center item-content">
          <div class="flex both-center item-sequence">Q</div>
          <div class="flex1 item-data">{{item.title}}</div>
          <div class="flex both-center item-icon">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
        </div>
        <div v-if="faq3[index]" class="faq-text">{{item.content}}</div>
      </div>

    </div>

    <!--其他问题-->
    <div v-if="nav4" class="faq-item">

      <div v-for="(item, index) in faqList[3]" class="flex-col cross-center item-box" @click="onFaqToggle4(index)">
        <div class="flex cross-center item-content">
          <div class="flex both-center item-sequence">Q</div>
          <div class="flex1 item-data">{{item.title}}</div>
          <div class="flex both-center item-icon">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
        </div>
        <div v-if="faq4[index]" class="faq-text">{{item.content}}</div>
      </div>

    </div>

<!--

    &lt;!&ndash;提现到账&ndash;&gt;
    <div v-if="nav1" class="faq-item">

      <div class="flex-col cross-center item-box" @click="onFaqToggle(1)">
        <div class="flex cross-center item-content">
          <div class="flex both-center item-sequence">Q</div>
          <div class="flex1 item-data">任务本金佣金什么时候到账？</div>
          <div class="flex both-center item-icon">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
        </div>
        <div v-if="faq1[0]" class="faq-text">社保按物流流程，签收好评后，商家会按实际下单金额在次日（工作日，节假日顺延）18:00点前通过审核打款，任务本金由商家通过转账方式返款。</div>
      </div>

      <div class="flex-col cross-center item-box">
        <div class="flex cross-center item-content">
          <div class="flex both-center item-sequence">Q</div>
          <div class="flex1 item-data">要交会员费/担保金吗？</div>
          <div class="flex both-center item-icon">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
        </div>
        <div v-if="faq1[1]" class="faq-text">要交会员费/担保金吗？要交会员费/担保金吗？</div>
      </div>

      <div class="flex-col cross-center item-box">
        <div class="flex cross-center item-content">
          <div class="flex both-center item-sequence">Q</div>
          <div class="flex1 item-data">做任务需要垫付资金吗？</div>
          <div class="flex both-center item-icon">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
        </div>
        <div v-if="faq1[2]" class="faq-text">做任务需要垫付资金吗？</div>
      </div>

      <div class="flex-col cross-center item-box no-border">
        <div class="flex cross-center item-content">
          <div class="flex both-center item-sequence">Q</div>
          <div class="flex1 item-data">提现是否收取手续费？</div>
          <div class="flex both-center item-icon">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
        </div>
        <div v-if="faq1[3]" class="faq-text">提现是否收取手续费？</div>
      </div>

    </div>

    &lt;!&ndash;任务得分&ndash;&gt;
    <div v-if="nav2" class="faq-item">

      <div class="flex-col cross-center item-box">
        <div class="flex cross-center item-content">
          <div class="flex both-center item-sequence">Q</div>
          <div class="flex1 item-data">每个月可以做多少单？</div>
          <div class="flex both-center item-icon">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
        </div>
        <div v-if="faq2[0]" class="faq-text">社保按物流流程，签收好评后，商家会按实际下单金额在次日（工作日，节假日顺延）18:00点前通过审核打款，任务本金由商家通过转账方式返款。</div>
      </div>

      <div class="flex-col cross-center item-box">
        <div class="flex cross-center item-content">
          <div class="flex both-center item-sequence">Q</div>
          <div class="flex1 item-data">我的买号情况不符合商家备注要求？</div>
          <div class="flex both-center item-icon">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
        </div>
        <div v-if="faq2[1]" class="faq-text">我的买号情况不符合商家备注要求？</div>
      </div>

      <div class="flex-col cross-center item-box">
        <div class="flex cross-center item-content">
          <div class="flex both-center item-sequence">Q</div>
          <div class="flex1 item-data">做任务需要垫付资金吗？</div>
          <div class="flex both-center item-icon">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
        </div>
        <div v-if="faq2[2]" class="faq-text">做任务需要垫付资金吗？</div>
      </div>

      <div class="flex-col cross-center item-box no-border">
        <div class="flex cross-center item-content">
          <div class="flex both-center item-sequence">Q</div>
          <div class="flex1 item-data">提现是否收取手续费？</div>
          <div class="flex both-center item-icon">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
        </div>
        <div v-if="faq2[3]" class="faq-text">提现是否收取手续费？</div>
      </div>

    </div>

    &lt;!&ndash;审核申诉&ndash;&gt;
    <div v-if="nav3" class="faq-item">

      <div class="flex-col cross-center item-box">
        <div class="flex cross-center item-content">
          <div class="flex both-center item-sequence">Q</div>
          <div class="flex1 item-data">任务审核不通过怎么办？</div>
          <div class="flex both-center item-icon">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
        </div>
        <div v-if="faq3[0]" class="faq-text">社保按物流流程，签收好评后，商家会按实际下单金额在次日（工作日，节假日顺延）18:00点前通过审核打款，任务本金由商家通过转账方式返款。</div>
      </div>

      <div class="flex-col cross-center item-box">
        <div class="flex cross-center item-content">
          <div class="flex both-center item-sequence">Q</div>
          <div class="flex1 item-data">账号被冻结了可以解封吗？</div>
          <div class="flex both-center item-icon">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
        </div>
        <div v-if="faq3[1]" class="faq-text">账号被冻结了可以解封吗？</div>
      </div>

      <div class="flex-col cross-center item-box no-border">
        <div class="flex cross-center item-content">
          <div class="flex both-center item-sequence">Q</div>
          <div class="flex1 item-data">做任务需要垫付资金吗？</div>
          <div class="flex both-center item-icon">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
        </div>
        <div v-if="faq3[2]" class="faq-text">做任务需要垫付资金吗？</div>
      </div>

    </div>

    &lt;!&ndash;其他问题&ndash;&gt;
    <div v-if="nav4" class="faq-item">

      <div class="flex-col cross-center item-box">
        <div class="flex cross-center item-content">
          <div class="flex both-center item-sequence">Q</div>
          <div class="flex1 item-data">邀请好友做任务有奖励吗？</div>
          <div class="flex both-center item-icon">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
        </div>
        <div v-if="faq4[0]" class="faq-text">社保按物流流程，签收好评后，商家会按实际下单金额在次日（工作日，节假日顺延）18:00点前通过审核打款，任务本金由商家通过转账方式返款。</div>
      </div>

      <div class="flex-col cross-center item-box no-border">
        <div class="flex cross-center item-content">
          <div class="flex both-center item-sequence">Q</div>
          <div class="flex1 item-data">账号被冻结了可以解封吗？</div>
          <div class="flex both-center item-icon">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
        </div>
        <div v-if="faq4[1]" class="faq-text">账号被冻结了可以解封吗？</div>
      </div>

    </div>
-->


  </div>

</template>

<script type="text/ecmascript-6">
  import back from './common/back.vue'

    export default {
        name: "",
        data() {
            return {
              backTitle : '常见问题',
              nav1 : true,
              nav2 : false,
              nav3 : false,
              nav4 : false,

              faq1 : [false,false,false,false],
              faq2 : [true,false,false,false],
              faq3 : [true,false,false],
              faq4 : [true,false],

              faqList : [
                [
                  {
                    title : '发布任务怎么收费呢？',
                    content : '发布任务时需要标注每单任务的佣金，平台会收取20%-25%的佣金作为平台服务费。'
                  },
                  {
                    title : '买手完成的任务不符合要求怎么办？',
                    content : '商家发布任务时勾选相应的任务要求，如店铺收藏，货比三家等后，买手需要上传相应的截图方可提交任务。如上传截图不符，在审核任务时可以反馈给买手，买手有一次重新上传修改的机会。'
                  },
                  {
                    title : '可以使用支付宝给买家转账吗？',
                    content : '不可以，支付宝是阿里体系下的支付工具，容易被查出资金流向，平台严禁卖家使用支付宝进行转账。因此，请各位卖家朋友严格按照规定，使用银行卡对买家进行转账。'
                  },
                  {
                    title : '买手反馈未收到反馈怎么办？',
                    content : '商家标记为已转账后，买手核查后如未到账，可点击按钮向商家反馈未收到款项。在任务管理中，接手申诉列表中可查看，商家核验，如未转账请重新转账，如由于账号问题退回，请与客服联系。'
                  }
                ],
                [
                  {
                    title : 'XXXXXX',
                    content : 'XXXXXX'
                  }
                ],
                [
                  {
                    title : 'XXXXXX',
                    content : 'XXXXXX'
                  }
                ]
              ]
            }
        },
        props: [],
        watch: {},
        computed: {},
        methods: {
          onNavClick : function (index) {
            switch(index)
            {
              case 1: {
                this.nav1 = true;
                this.nav2 = false;
                this.nav3 = false;
                this.nav4 = false;
                break;
              }
              case 2:{
                this.nav1 = false;
                this.nav2 = true;
                this.nav3 = false;
                this.nav4 = false;
                break;
              }
              case 3:{
                this.nav1 = false;
                this.nav2 = false;
                this.nav3 = true;
                this.nav4 = false;
                break;
              }
              case 4:{
                this.nav1 = false;
                this.nav2 = false;
                this.nav3 = false;
                this.nav4 = true;
                break;
              }
              default:{

              }
            }
          },
          onFaqToggle1 : function (index) {

              this.faq1[index] = !this.faq1[index];
              this.$set( this.faq1, index,  this.faq1[index]); // 对象更新之后，手动触发视图更新

            devConsole.log(index);
            devConsole.log(this.faq1);
          },
          onFaqToggle2 : function (index) {

            this.faq2[index] = !this.faq2[index];
            this.$set( this.faq2, index,  this.faq2[index]); // 对象更新之后，手动触发视图更新

            devConsole.log(index);
            devConsole.log(this.faq2);
          },
          onFaqToggle3 : function (index) {

            this.faq3[index] = !this.faq3[index];
            this.$set( this.faq3, index,  this.faq3[index]); // 对象更新之后，手动触发视图更新

            devConsole.log(index);
            devConsole.log(this.faq3);
          },
          onFaqToggle4 : function (index) {

            this.faq4[index] = !this.faq4[index];
            this.$set( this.faq4, index,  this.faq4[index]); // 对象更新之后，手动触发视图更新

            devConsole.log(index);
            devConsole.log(this.faq4);
          }
        },
        components: {
          back : back
        },
        beforeCreate() {
        },
        created() {
          devConsole.log(this.faqList)
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

  .faq {
    padding-top: 44px;
  }

  .task-nav {
    width: 100%;
    height: 50px;
    background-color: #fff;
    color: rgb(96,100,110);
    font-size: 15px;

    div {
      border-bottom: 2px solid transparent;
    }

    div.active {
      color: rgb(29,138,231);
      border-bottom: 2px solid rgb(29,138,231);
    }
  }


    .faq-item {
      margin-top: 12px;
      margin-bottom : 12px;
      padding-left : 15px;
      background-color: #fff;

      & .item-box:last-child:after {
        background-color: transparent;
      }


      .item-box {
        position: relative;

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

        .item-content {
          height: 50px;
          padding: 15px 0 16px;

          .item-sequence {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            font-size:13px;
            color:rgba(255,255,255,1);
            line-height:18px;
            //background-image: linear-gradient(90deg,#6ECAF5,#379EF5);
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

            img {
              transition: transform .2s ease;
            }

            .icon-rotate {
              transform: rotate(90deg);
            }
          }

        }

        .faq-text {
          padding: 0 15px 16px 0 ;
          font-size:14px;
          color:rgba(96,100,110,1);
          line-height:22px;
          word-break: break-all;
        }

      }


    }



</style>
