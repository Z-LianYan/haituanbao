<template>

  <div class="safe-padding">

    <div class="banner">
      <img src="../assets/images/main-banner-p.jpg" alt="" width="100%" height="150">
    </div>

    <div class="shop">

      <div class="flex box-top">

        <div class="flex shop-avatar">
          <img :src="storeData.logo_url" width="64" height="64">
        </div>

        <div class="flex-col flex1 shop-detail">
          <div class="shop-name"> {{storeData.name}} </div>
          <div class="flex cross-center shop-id">
            <div class="flex cross-center store-icon">
              <img v-if="storeData.cid === 1" src="../assets/images/icon/tmall.png" alt="" width="16" height="16">
              <img v-if="storeData.cid === 2" src="../assets/images/icon/taobao.png" alt="" width="18" height="18">
              <img v-if="storeData.cid === 3" src="../assets/images/icon/jd.png" alt="" width="15" height="15">
            </div>
            ID: {{storeData.store_id}}
          </div>

          <div class="flex shop-tag">

            <div class="flex both-center primary" v-if="storeData.audit_status === 0">未审核</div>
            <div class="flex both-center primary" v-if="storeData.audit_status === 1">已审核</div>
            <div class="flex both-center primary" v-if="storeData.audit_status === -1">未通过</div>

            <div class="minor" v-if="parseInt(storeData.security) > 0">保证金</div>
            <div class="minor" v-if="parseInt(storeData.trusts) > 0">任务押金</div>

          </div>
        </div>

      </div>

      <div class="flex flex-wrap box-bottom" style="height: auto">

        <div class="flex-col amount-details">
          <div class="amount-name">账户余额（元）</div>
          <div class="amount-data" data-source="account">{{accountData.deposit_balance}}</div>
        </div>

        <div class="flex-col amount-details">
          <div class="amount-name">保证金（元）</div>
          <div class="amount-data" data-source="store">{{accountData.security_balance}}</div>
        </div>

        <div class="flex-col amount-details no-border">
          <div class="amount-name">押金（元）</div>
          <div class="amount-data" data-source="store">{{accountData.trust_balance}}</div>
        </div>

        <div class="flex-col amount-details no-border">
          <div class="amount-name">累计支出（元）</div>
          <div class="amount-data" data-source="account">{{accountData.spend}}</div>
        </div>

      </div>

    </div>

    <div class="box">
      <div class="box-theme-name">新手任务</div>

      <div class="flex box-4">

        <div class="flex-col flex1 cross-center" @click="toPageStoreBinding">
          <div class="box-avatar">
            <img src="../assets/images/icon/bind-store@2x.png" width="40" height="40">
          </div>
          <div class="box-name">绑定店铺</div>
          <div class="flex cross-center box-commission">
            <span :class="{ completed : store_bind.is_completed }"> +5 </span>
            <img v-if="store_bind.is_completed" class="completed-icon" src="../assets/images/icon/completed.png" alt="" width="18" height="18">
          </div>
        </div>

        <div class="flex-col flex1 cross-center" @click="toPageAdminInfo">
          <div class="box-avatar">
            <img src="../assets/images/icon/input-information@2x.png" width="40" height="40">
          </div>
          <div class="box-name">完善资料</div>
          <div class="flex cross-center box-commission">
            <span :class="{ completed : complete_info.is_completed }"> +5 </span>
            <img v-if="complete_info.is_completed" class="completed-icon" src="../assets/images/icon/completed.png" alt="" width="18" height="18">
          </div>
        </div>

        <div class="flex-col flex1 cross-center" @click="toPageAnswerSheet">
          <div class="box-avatar">
            <img src="../assets/images/icon/newbie-test@2x.png" width="40" height="40">
          </div>
          <div class="box-name">新手答卷</div>
          <div class="flex cross-center box-commission">
            <span :class="{ completed : answer_question1.is_completed }"> +10 </span>
            <img v-if="answer_question1.is_completed" class="completed-icon" src="../assets/images/icon/completed.png" alt="" width="18" height="18">
          </div>
        </div>

        <div class="flex-col flex1 cross-center" @click="toPageTaskPublish1">
          <div class="box-avatar">
            <img src="../assets/images/icon/publish-task@2x.png" width="40" height="40">
          </div>
          <div class="box-name">发布任务</div>
          <div class="flex cross-center box-commission">
            <span :class="{ completed : task_publish.is_completed }"> +10 </span>
            <img v-if="task_publish.is_completed" class="completed-icon" src="../assets/images/icon/completed.png" alt="" width="18" height="18">
          </div>
        </div>

      </div>

    </div>

    <div class="box">
      <div class="box-theme-name">待处理事项</div>
      <div class="box-theme-describe"> 当前共有
        <span class="primary-text" @click="toPageIsGoing()"> {{storeData.going_tasks}} </span> 个任务进行中，其中有
        <span class="success-text"> {{storeData.finished_tasks}}  </span>个买手已完成任务，需要返款处理
        <!--<span class="success-text" @click="toPageTask(8)"> {{storeData.finished_tasks}}  </span>个买手已完成任务，需要返款处理-->
      </div>
    </div>

    <div class="box">
      <div class="flex main-between box-common-use">

        <div class="flex-col cross-center" @click="toPageRules">
          <div class="flex both-center box-avatar" :class="{ notice : notice_infraction }">
            <img src="../assets/images/icon/infraction@2x.png" width="26" height="26">
          </div>
          <div class="box-name">违规说明</div>
        </div>

        <div class="flex-col cross-center" @click="toPageAnnouncement">
          <div class="flex both-center box-avatar" :class="{ notice : notice_systemNotice }">
            <img src="../assets/images/icon/systemNotice@2x.png" width="26" height="26">
          </div>
          <div class="box-name">平台公告</div>
        </div>

        <div class="flex-col cross-center" @click="toPageFaq">
          <div class="flex both-center box-avatar" :class="{ notice : notice_faq }">
            <img src="../assets/images/icon/faq@2x.png" width="26" height="26">
          </div>
          <div class="box-name">常见问题</div>
        </div>

        <div class="flex-col cross-center" @click="toPageContact">
          <div class="flex both-center box-avatar" :class="{ notice : notice_contact }">
            <img src="../assets/images/icon/contact@2x.png" width="26" height="26">
          </div>
          <div class="box-name">联系客服</div>
        </div>

      </div>

    </div>


    <transition name="fade">
      <div class="flex modal-wrapper" v-if="newTaskModalShow">
        <div class="modal">
          <div class="modal-title">提示</div>
          <div class="modal-body">
            <div class="modal-content">新手任务已经完成，现在跳转至任务管理，并发布任务？</div>
            <div class="flex main-between modal-options">
              <div class="yes" @click="onYesClick">是，去发布任务</div>
              <div class="no" @click="onNoClick">取消</div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <navbar :nav1="nav1" />

  </div>


</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import Qs from 'qs';

  import navbar from './common/navbar.vue'
    export default {
        name: "",
        data() {
            return {
              accountData : '', //账户信息 （帐号和店铺一对多）
              storeData : '', // 店铺信息
              notice_infraction : false,
              notice_systemNotice : true,
              notice_faq : false,
              notice_contact : false,
              nav1 : true,
              store_bind : {},
              complete_info : {},
              answer_question1 : {},
              task_publish : {},
              newTaskModalShow : false
            }
        },
        props: [],
        watch: {},
        computed: {},
        methods: {
          toPageStoreBinding : function () {
            this.$router.push({ name : 'storeBinding' });
          },
          toPageAdminInfo : function () {
            this.$router.push({ name : 'adminInfo' });
          },
          toPageAnswerSheet : function () {
            this.$router.push({ name : 'answerSheet' });
          },
          toPageTaskPublish1 : function () {

              if( this.task_publish.is_completed === true ){
                  this.newTaskModalShow = true;
              }
              else {
                this.$router.push({ name : 'taskPublish1' });
              }

          },
          onNoClick : function () {
            this.newTaskModalShow = false;
          },
          onYesClick : function () {
            this.$router.push({ name : 'taskPublish1' });
            this.newTaskModalShow = false;
          },
          toPageRules : function () {
            this.$router.push({ name : 'rules' });
          },
          toPageAnnouncement : function () {
            this.$router.push({ name : 'announcement' });
            localStorage.setItem('notice_systemNotice','1');
          },
          toPageContact : function () {
            this.$router.push({ name : 'contact' });
          },
          toPageFaq : function () {
            this.$router.push({ name : 'faq' });
          },
          toPageIsGoing : function (data) {
            this.$router.push({ name : 'isGoing' });
          },
          //获取账户资产信息
          getAccountData : function () {

            // 获取账户信息
            axios({
              method: 'get',
              url: WalletStat,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
              transformRequest: [data => Qs.stringify(data)],
              params : {
                ssid: sessionStorage.getItem("ssid")
              },
            }).then( ( response ) => {

              let result = response.data;
              devConsole.log(result);
              this.accountData = result.data;
              sessionStorage.setItem("deposit_balance",result.data.deposit_balance); //将余额保存到 session
              sessionStorage.setItem("security_balance",result.data.security_balance); //将保证金保存到 session
              //console.log(result);

              if ( result.code > 0 ) {
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
          // 获取我的店铺信息
          getStoreData : function () {

            // 获取店铺信息
            axios({
              method: 'get',
              url: MyStoreDefault,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
              transformRequest: [data => Qs.stringify(data)],
              params : {
                ssid: sessionStorage.getItem("ssid")
              },
            }).then( ( response ) => {

              let result = response.data;
              //console.log(result);
              this.storeData = result.data;

              sessionStorage.setItem("store_id",this.storeData.store_id);
              sessionStorage.setItem("store_name",this.storeData.name);

              //console.log(result);

              if ( result.code > 0 ) {
                devConsole.log("this.storeData %o", this.storeData);
              }
              else if ( result.code === -1 ) {
                EventHub.$emit('toastOpen', result.message);
                setTimeout( ()=>{
                  this.$router.push({ name : 'storeBinding' });
                },2000)
              }
              else if ( result.code === -100 ) {
                EventHub.$emit('toastOpen', result.message);
                EventHub.$emit("logout",'logout');
              }
              else {
                EventHub.$emit('toastOpen', result.message);
              }
            }).catch( (error) => {
              console.log(error);
            });

          },
          //获取新手任务状态
          getMemberNoviceState : function () {
            // 获取新手任务状态
            axios({
              method: 'get',
              url: MemberNoviceState,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
              params : {
                ssid: sessionStorage.getItem("ssid")
              },
            }).then( ( response ) => {

              let result = response.data;
              //console.log(result);
              this.newbieTaskData = result.data;

              this.store_bind  = this.newbieTaskData.store_bind;
              this.complete_info  = this.newbieTaskData.complete_info;
              this.answer_question1  = this.newbieTaskData.answer_question1;
              this.task_publish  = this.newbieTaskData.task_publish;

              sessionStorage.setItem("is_answer_completed",this.newbieTaskData.answer_question1.is_completed);

              //console.log(result);

              if ( result.code > 0 ) {
                devConsole.log("this.storeData %o", this.storeData);
              }
              else if ( result.code === -1 ) {
                EventHub.$emit('toastOpen', result.message);
              }
              else if ( result.code === -100 ) {
                EventHub.$emit('toastOpen', result.message);
                EventHub.$emit("logout",'logout');
              }
              else {
                EventHub.$emit('toastOpen', result.message);
                EventHub.$emit("logout",'logout');
              }
            }).catch( (error) => {
              devConsole.log(error);
            });

          },
          checkNotice : function () {
            let flag = localStorage.getItem("notice_systemNotice");
            flag === null ? this.notice_systemNotice = true : this.notice_systemNotice = false ;
            //console.log(flag);
            //console.log(this.notice_systemNotice);
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
            this.getAccountData(); //获取账户资产信息
            this.getStoreData();// 获取我的店铺信息
            this.getMemberNoviceState(); //获取新手任务状态
            this.checkNotice(); // 利用 localStorage 来检查提示的小红点
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

.banner {
  width: 100%;
  height: 150px;
  //background: url("../assets/images/main-banner-p.jpg") no-repeat center center;
  background-size: cover;
  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
}

  .shop {
    width: 100%;
    height: 246px;
    padding: 0 15px;
    background-color: #fff;

    .box-top {
      position: relative;
      width: 100%;
      height: 104px;
      padding : 20px 0 0 0;

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

      .shop-avatar {
        width: 64px;
        height: 64px;
        margin-right: 15px;
        img{
          width: 100%;
          height: 100%;
          border-radius: 8px;
        }
      }

      .shop-detail {
        .shop-name {
          color: rgb(42,42,42);
          font-size: 17px;
          line-height: 16px;
        }
        .shop-id {
          width: auto;
          height: 20px;
          color: rgb(153,153,153);
          font-size: 14px;
          line-height: 20px;
          margin: 4px 0 6px;
          .store-icon {
            img {
              margin-right: 8px;
            }
          }
        }
        .shop-tag {
          div {
            width: auto;
            height: 18px;
            color: #fff;
            font-size: 12px;
            line-height: 18px;
            margin-right: 12px;
            padding: 0 4px;
            border-radius: 2px;
          }
          div:last-child {
            margin-right: 0;
          }
          .primary {
            background: linear-gradient(90deg,rgb(2,170,242),rgb(68,117,240));
          }
          .minor {
            background: linear-gradient(90deg,rgb(196,198,207),rgb(196,198,207));
          }
        }
      }

    }

    .box-bottom {

      & .amount-details:nth-child(even) {
        padding-left: 20px;
        &:before {
          background-color: transparent;
        }
      }
      .amount-details {
        position: relative;
        width: 50%;
        height: auto;
        padding: 13.5px 0;
        &:before {
          position: absolute;
          top: 8.5px;
          bottom: 0;
          right: 0;
          content: '';
          width: 1px;
          height: 40px;
          background-color: rgb(229,229,229);
        }
        &:after {
          position: absolute;
          bottom: 0;
          left: 0;
          content: '';
          width: 100%;
          height: 1px;
          background-color: rgb(229,229,229);
        }
      }

      .amount-name {
        height: 18px;
        color: rgb(153,153,153);
        font-size: 13px;
        line-height: 18px;
      }
      .amount-data {
        height: 24px;
        margin-top: 2px;
        color: rgb(42,42,42);
        font-size: 17px;
        line-height: 24px;
      }
    }


  }

  .box {
    width: 100%;
    height: auto;
    margin: 12px 0;
    padding: 14px 15px 17px;

    background-color: #fff;

    .box-theme-name {
      position: relative;
      width: auto;
      height: 22px;
      padding-left: 8px;
      color: rgb(42,42,42);
      font-size: 16px;
      line-height: 22px;

      &:before {
        position: absolute;
        top: 3px;
        left: 0;
        content: '';
        width: 2px;
        height: 15px;
        background-color: rgb(29,138,231);

      }
    }

    .box-4 {
      width: 100%;
      height: auto;
      padding: 14px 0 0;

      .box-name {
        width: auto;
        height: 20px;
        color: rgb(96,100,110);
        font-size: 14px;
        line-height: 20px;
        padding-bottom: 3px;
      }

      .box-commission {
        position: relative;
        width: auto;
        height: 20px;
        color: rgb(29,138,231);
        font-size: 14px;
        line-height: 20px;
        .completed {
          color: #44bf85;
        }
        .completed-icon {
          margin-left: 4px;
        }
      }

    }

    .box-common-use {
      .box-avatar {
        position: relative;
      }
      .box-avatar.notice:after {
        position: absolute;
        top: 0;
        right: 8px;
        content: '';
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: rgb(255,62,62);
      }
      .box-name {
        width: auto;
        height: 20px;
        margin-top: 6px;
        color: rgb(96,100,110);
        font-size: 13px;
        line-height: 20px;
      }
    }


    .box-theme-describe {
      width: 100%;
      height: 48px;
      margin: 12px 0 0;
      color: rgb(96,100,110);
      font-size: 14px;
      line-height: 24px;

      .a {

      }

    }


  }


  .modal-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);

    .modal {
      position: fixed;
      top: calc(40%);
      left: 0;
      right: 0;
      width: 80%;
      min-height: 120px;
      margin: 0 auto;
      padding: 10px 16px;
      border-radius: 10px;
      box-shadow: 0 0 4px 1px rgba(0,0,0,.2);
      background-color: #fff;


      .modal-title {
        font-size: 18px;
        color: #999;
        text-align: center;
      }

      .modal-body {
        .modal-content {
          font-size: 16px;
          color: #999;
          padding: 10px 0;
          word-break: break-all;
        }
        .modal-options {
          padding: 10px 20px;

          .yes {
            font-size: 14px;
            color: rgb(29,138,231);
          }
          .no {
            font-size: 14px;
            color: rgb(29,138,231);
          }
        }
      }


    }
  }



</style>
