<template>

  <div class="safe-padding">

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

            <div class="primary" v-if="storeData.audit_status === 0">未审核</div>
            <div class="primary" v-if="storeData.audit_status === 1">已审核</div>
            <div class="primary" v-if="storeData.audit_status === -1">未通过</div>

            <div class="minor" v-if="parseInt(storeData.security) > 0">保证金</div>
            <div class="minor" v-if="parseInt(storeData.trusts) > 0">任务押金</div>

          </div>
        </div>

      </div>

      <div class="flex flex-wrap box-bottom">

        <div class="flex-col amount-details">
          <div class="amount-name">账户余额（元）</div>
          <div class="amount-data">{{accountData.deposit_balance}}</div>
        </div>

        <div class="flex-col amount-details">
          <div class="amount-name">保证金（元）</div>
          <div class="amount-data">{{accountData.security_balance}}</div>
        </div>

        <div class="flex-col amount-details no-border">
          <div class="amount-name">押金（元）</div>
          <div class="amount-data">{{accountData.trust_balance}}</div>
        </div>

        <div class="flex-col amount-details no-border">
          <div class="amount-name">累计支出（元）</div>
          <div class="amount-data">{{accountData.spend}}</div>
        </div>

      </div>

    </div>

    <div class="store-list">

      <div class="store-item flex" @click="toPageRemainingSum">
        <div class="flex both-center item-icon">
          <img src="../assets/images/icon/account-management@2x.png" alt="account-management" width="20" height="20">
        </div>
        <div class="flex main-between flex1 item-info">
          <div class="item-name">账户管理</div>
          <div class="flex both-center">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="20" height="22">
          </div>
        </div>
      </div>

      <div class="store-item flex margin-bottom" @click="toPageFundDetail">
        <div class="flex both-center item-icon">
          <img src="../assets/images/icon/rmb@2x.png" alt="rmb" width="20" height="20">
        </div>
        <div class="flex main-between flex1 item-info no-border">
          <div class="item-name">资金明细</div>
          <div class="flex both-center">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="20" height="22">
          </div>
        </div>
      </div>

      <div class="store-item flex" @click="toPageStoreBinding">
        <div class="flex both-center item-icon">
          <img src="../assets/images/icon/store-bind@2x.png" alt="store-bind" width="20" height="20">
        </div>
        <div class="flex main-between flex1 item-info">
          <div class="item-name">店铺绑定</div>
          <div class="flex both-center">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="20" height="22">
          </div>
        </div>
      </div>

      <div class="store-item flex margin-bottom" @click="toPageAdminInfo">
        <div class="flex both-center item-icon">
          <img src="../assets/images/icon/admin-info@2x.png" alt="admin-info" width="20" height="20">
        </div>
        <div class="flex main-between flex1 item-info no-border">
          <div class="item-name">管理员信息</div>
          <div class="flex both-center">
 <!--           <div class="item-extr">已认证</div>-->
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="20" height="22">
          </div>
        </div>
      </div>

<!--      <div class="store-item flex">
        <div class="flex both-center item-icon">
          <img src="../assets/images/icon/setting.png" alt="QQ" width="20" height="20">
        </div>
        <div class="flex main-between flex1 item-info">
          <div class="item-name">设置</div>
          <div class="flex both-center">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="20" height="22">
          </div>
        </div>
      </div>-->

      <div class="store-item flex" @click="toPageAbout">
        <div class="flex both-center item-icon">
          <img src="../assets/images/icon/about-us@2x.png" alt="QQ" width="20" height="20">
        </div>
        <div class="flex main-between flex1 item-info ">
          <div class="item-name">关于我们</div>
          <div class="flex both-center">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="20" height="22">
          </div>
        </div>
      </div>

      <div class="btn-box logout">
        <button class="btn" @click="onLogoutClick"> 退出登录 </button>
      </div>

    </div>

    <navbar :nav3="nav3" />

  </div>


</template>

<script type="text/ecmascript-6">
  import navbar from './common/navbar.vue'

  import axios from 'axios';
  import Qs from 'qs';

    export default {
        name: "",
        data() {
            return {
              accountData : '', //账户信息 （帐号和店铺一对多）
              storeData : '', // 店铺信息

              notice_infraction : false,
              notice_systemNotice : true,
              notice_faq : false,
              notice_store : true,
              nav3 : true,

              task_id : ''
            }
        },
        props: [],
        watch: {},
        computed: {},
        methods: {
          //账户管理
          toPageRemainingSum : function () {
            this.$router.push({ name: 'remainingSum'});
          },
          // 资金明细
          toPageFundDetail : function () {
            this.$router.push({ name : 'fundDetail' });
          },
          // 店铺绑定
          toPageStoreBinding : function () {
            this.$router.push({ name : 'shoplist' });
          },
          // 管理员信息
          toPageAdminInfo : function () {
            this.$router.push({ name : 'adminInfo' });
          },
          // 关于我们
          toPageAbout : function () {
            this.$router.push({ name: 'about'});
          },
          getDratTask : function () {
            axios({
              method: 'post',
              url: Task_List,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
              params : {
                ssid: sessionStorage.getItem("ssid")
              },
              transformRequest: [data => Qs.stringify(data)],
              data : {
                status : 0
              }
            }).then( (response) => {

              let result = response.data;
              //console.log(result);

              if ( result.code > 0 ) {
                //EventHub.$emit('toastOpen', result.message);
                this.task_id = result.data.task_id;
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
          onLogoutClick : function () {

            axios({
              method: 'post',
              url: Logout,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
              transformRequest: [data => Qs.stringify(data)],
              data : {}
            }).then( (response) => {

              let result = response.data;
              //console.log(result);

              if ( result.code > 0 ) {
                EventHub.$emit('toastOpen', result.message);
                this.$router.push({ name : 'login' });
                sessionStorage.clear();
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
              //console.log(result);

              if ( result.code > 0 ) {
              }
              else if ( result.code === -100 ) {
                EventHub.$emit('toastOpen', result.message);
                sessionStorage.clear();
                setTimeout( ()=>{
                  //this.$router.push({ name: 'login'});
                },2000)
              }
              else {
                EventHub.$emit('toastOpen', result.message);
              }

            }).catch( (error) => {
              console.log(error);
            });


          },
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
          this.getAccountData();
          this.getStoreData();
          this.getDratTask();
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
    background: url("../assets/images/main-banner.png") no-repeat center center;
    background-size: cover;
  }

  .shop {
    width: 100%;
    height: 246px;
    margin-bottom: 12px;
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
            letter-spacing: -1px;
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

  .store-list {

    .store-item {
      height: 45px;
      padding: 12px 15px 11px;
      background-color: #fff;

      &.margin-bottom {
        margin-bottom: 13px;
      }

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
        .item-extr {
          font-size:15px;
          color:rgba(153,153,153,1);
          line-height:21px;
        }
      }
    }

    .btn-box.logout {
      .btn {
        width: 93%;
        color: #333;
        font-size: 16px;
        margin-top: 40px;
        background-color: #fff;
        border: 1px solid #888888;
      }
    }

  }

</style>
