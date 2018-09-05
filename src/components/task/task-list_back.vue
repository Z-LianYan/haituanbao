<template>

  <div class="task-page">

    <back :backTitle="backTitle" />

    <div class="flex task-nav">
      <div class="flex1 both-center transition" :class="{ active : nav[0] }" @click="onNavClick(2)">待返款</div>
      <div class="flex1 both-center transition" :class="{ active : nav[1] }" @click="onNavClick(4)">待审核</div>
      <div class="flex1 both-center transition" :class="{ active : nav[2] }" @click="onNavClick(999)">接手申诉</div>
      <div class="flex1 both-center transition" :class="{ active : nav[3] }" @click="onNavClick(6)">已完成</div>
    </div>

    <div class="primary-tips flex both-center">商家需在用户完成任务后，次日约定时间内完成审核并返款</div>

    <div class="flex both-center no-data" v-if="total === 0"> 无数据 </div>

    <div class="task-list-box" v-for="(item,index) in result" v-if="total !== 0">

      <div class="flex header-box">
<!--        <div class="list-avatar">
          <img src="../assets/images/avatar.jpg" width="64" height="64">
        </div>-->
        <div class="list-shop">
          <div class="flex shop-name">
            <div class="flex cross-center store-icon">
              <img v-if="0" src="../../assets/images/icon/tmall.png" alt="" width="16" height="16">
              <img v-if="0" src="../../assets/images/icon/taobao.png" alt="" width="18" height="18">
              <img v-if="0" src="../../assets/images/icon/jd.png" alt="" width="15" height="15">
            </div>
            ID：{{item.user_id}}
          </div>
          <div class="flex">
            <div class="shop-tag primary" v-if="item.store_name_verified">已实名</div>
            <div class="shop-tag orange">淘气值 {{item.level}}</div>
          </div>
        </div>
      </div>

      <div class="order-box"
           @click="toPageTaskDetail(item.task_id,item.shopping_account_id,item.status,item.level,item.bank_account.realname,item.bank_account.account,item.bank_account.bank,item.bank_account.id)">

        <div class="arrow">
          <img src="../../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
        </div>

        <div class="flex order-info">
          <div class="item-name">订单编号</div>
          <div class="item-data">{{item.order_no}}</div>
        </div>

        <div class="flex order-info">
          <div class="item-name">下单时间</div>
          <div class="item-data">{{item.order_timeShow}}</div>
        </div>

        <div class="flex order-info">
          <div class="item-name">完成时间</div>
          <div class="item-data">{{item.complete_timeShow}}</div>
        </div>

        <div class="flex order-info">
          <div class="item-name">账户名</div>
          <div class="item-data"> {{item.bank_account.realname}} </div>
        </div>

        <div class="flex order-info">
          <div class="item-name">银行帐号</div>
          <div class="item-data"> {{item.bank_account.account}} </div>
        </div>

        <div class="flex order-info">
          <div class="item-name">开户行</div>
          <div class="item-data"> {{item.bank_account.bank}} </div>
        </div>

      </div>

      <div class="flex action-box">

        <div class="flex flex1 flex-col cross-start">
          <div class="task-price">
            <span class="task-unit">￥</span> {{price}}
          </div>
          <div class="shop-price">宝贝价格 ￥{{productPrice}} </div>
        </div>

        <!-- 待返款（前 已完成） tab-->
        <div class="flex main-end cross-end" v-if="status === 3 && nav[0] === 1" >
          <!--接受状态 status ，0:待接受,-1:不接受,1:已接受,2:待好评,3:已完成,4:已超时,5:审核未通过,6:审核通过,8:已返款-->
          <!--申诉状态 appeal_status ，0:未申诉，1:已申诉，-1:拒绝处理申诉，6:已处理申诉-->
          <div v-if="item.status === 3" data-tips="待审核" class="refund ">待审核</div>

          <div v-if="item.status === 4" data-tips="已超时" class="refund ">任务超时</div>

<!--          <div v-if="item.status === 5 && item.appeal_status === 0" data-tips="审核未通过" class="refund ">审核未通过</div>
          <div v-if="item.status === 5 && item.appeal_status === 1" data-tips="审核未通过" class="refund ">审核未通过，申诉中</div>-->
          <!-- 这个按钮，是当审核通过的时候，商家先下打款之后，回来点击从而记录已经给用户返款的功能按钮 -->
          <div v-if="item.status === 5" data-tips="已返款" class="refund primary" @click="onConfirmReturn(item.task_id,item.shopping_account_id)">已经返款</div>

          <div v-if="item.status === 6" data-tips="审核通过" class="refund ">审核通过，未返款</div>
          <!-- 这个按钮，是当审核通过的时候，商家先下打款之后，回来点击从而记录已经给用户返款的功能按钮 -->
          <div v-if="item.status === 6" data-tips="已返款" class="refund primary" @click="onConfirmReturn(item.task_id,item.shopping_account_id)">已经返款</div>

          <div v-if="item.status === 8" data-tips="已返款" class="refund ">审核通过，已返款</div>

          <div v-if="item.status === 6 && item.appeal_status === 6" data-tips="已处理" class="refund ">申诉审核已处理</div>

        </div>

        <!-- 待审核（已返款） tab-->
        <div class="flex main-end cross-end" v-if="status === 8">
          <!--接受状态 status  0:待接受,-1:不接受,1:已接受,2:待好评,3:已完成,4:已超时,5:审核未通过,6:审核通过,8:已返款-->
          <!--申诉状态 appeal_status ，0:未申诉，1:已申诉，-1:拒绝处理申诉，6:已处理申诉-->
          <!--已完成-->
          <div v-if="item.status === 8 && item.appeal_status === 0" data-tips="已返款" class="refund ">审核</div>

          <div v-if="item.status === 8 && item.appeal_status === 1" data-tips="已返款" class="refund ">申诉中，已返款</div>
          <div v-if="item.status === 8 && item.appeal_status === 6" data-tips="已再次返款" class="refund ">已再次返款</div>

<!--
          &lt;!&ndash; 这个按钮，是当审核通过的时候，商家先下打款之后，回来点击从而记录已经给用户返款的功能按钮 &ndash;&gt;
          <div v-if="item.status === 8" data-tips="审核通过操作"
               class="refund primary" @click="doRefundPass(item.task_id,item.shopping_account_id)">通过</div>
          <div v-if="item.status === 8" data-tips="审核不通过操作"
               class="refund primary" @click="doRefundReject(item.task_id,item.shopping_account_id)">不通过</div>
-->

        </div>

        <!-- 接手申诉 tab-->
        <div class="flex main-end cross-end" v-if="status === 999">
          <!--接受状态 status 0:待接受,-1:不接受,1:已接受,2:待好评,3:已完成,4:已超时,5:审核未通过,6:审核通过,8:已返款-->
          <!--申诉状态 appeal_status ，0:未申诉，1:已申诉，-1:拒绝处理申诉，6:已处理申诉-->

          <div v-if="item.appeal_status === -1" data-tips="拒绝处理申诉" class="refund ">拒绝处理申诉</div>

          <div v-if="item.appeal_status === 0" data-tips="未申诉" class="refund ">未申诉</div>

          <!--审核申诉-->
          <div v-if="item.status === 5 && item.appeal_status === 1" data-tips="申诉中" class="refund ">申诉审核未通过</div>

          <!--两个操作按钮-->
          <div v-if="item.appeal_status === 1" data-tips="申诉通过操作"
               class="refund primary" @click="doAppealPass(item.task_id,item.shopping_account_id)">同意</div>
          <div v-if="item.appeal_status === 1" data-tips="申诉不通过操作"
               class="refund primary" @click="doAppealReject(item.task_id,item.shopping_account_id)">驳回</div>


          <div v-if="item.status === 8 && item.appeal_status === 1" data-tips="已返款+已申诉"
               class="refund primary" @click="onConfirmReturn(item.task_id,item.shopping_account_id)">已经返款</div>


          <!--已处理申诉-->
          <div v-if="item.appeal_status === 6" data-tips="已处理申诉" class="refund ">已处理申诉</div>

          <!--返款申诉-->
          <div v-if="item.status === 8 && item.appeal_status === 1" data-tips="申诉中" class="refund ">申诉未收到返款</div>
          <div v-if="item.status === 8 && item.appeal_status === 1" data-tips="已返款"
               class="refund primary" @click="onConfirmReturn(item.task_id,item.shopping_account_id)">已经返款</div>

        </div>

        <!-- 已完成 tab-->
        <div class="flex main-end cross-end" v-if="status === 3 && nav[4] === 1" >
          <!--接受状态 status ，0:待接受,-1:不接受,1:已接受,2:待好评,3:已完成,4:已超时,5:审核未通过,6:审核通过,8:已返款-->
          <!--申诉状态 appeal_status ，0:未申诉，1:已申诉，-1:拒绝处理申诉，6:已处理申诉-->
          <div v-if="item.status === 3" data-tips="待审核" class="refund ">待审核</div>

          <div v-if="item.status === 4" data-tips="已超时" class="refund ">任务超时</div>

          <div v-if="item.status === 5 && item.appeal_status === 0" data-tips="审核未通过" class="refund ">审核未通过</div>
          <div v-if="item.status === 5 && item.appeal_status === 1" data-tips="审核未通过，申诉中" class="refund ">审核未通过，申诉中</div>

          <div v-if="item.status === 6" data-tips="审核通过" class="refund ">审核通过，未返款</div>

          <div v-if="item.status === 8" data-tips="已返款" class="refund ">审核通过，已返款</div>

          <div v-if="item.status === 6 && item.appeal_status === 6" data-tips="已处理" class="refund ">申诉审核已处理</div>

        </div>

      </div>

    </div>

    <div class="btn-box" v-if="page*psize < total" >
      <button class="btn active" @click="doLoadMore"> 加载更多 </button>
    </div>

    <div class="btn-box logout" v-if="page*psize >= total && total > 0">
      <button class="btn finished"> 以上已是全部内容 </button>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">

  import navbar from '../common/navbar.vue'
  import back from '../common/back.vue'

  import axios from 'axios';
  import Qs from 'qs';

   export default {
       name: "",
       data() {
           return {
             backTitle : '任务参与列表',
             nav : [1,0,0,0,0],

             task_id : '',

             status : 2,
             page : 1,
             psize : 5,

             productPrice : '',
             price : '',
             result : [],
             total : ''
           }
       },
       props: [],
       watch: {},
       computed: {},
       methods: {
         doLoadMore : function () {
           this.psize += 5;
           this.getMyTaskJoinList(task_id,this.status,this.page,this.psize);
         },
         getLocalTime : function(data) {

           let tempDate = new Date(data*1000);

           let year = tempDate.getFullYear().toString();
           let mouth = (tempDate.getMonth()+1).toString();
           let date = tempDate.getDate().toString();
           let hours = tempDate.getHours().toString();
           let minutes = tempDate.getMinutes().toString();

           if( mouth.length === 1 ){
             mouth = '0' + mouth;
           }
           if( date.length === 1 ){
             date = '0' + date;
           }
           if( hours.length === 1 ){
             hours = '0' + hours;
           }
           if( minutes.length === 1 ){
             minutes = '0' + minutes;
           }

           return year + '-' + mouth + '-' + date + ' ' + hours + ':' + minutes;

         },

         //申诉通过
         doAppealPass : function (task_id, shopping_account_id) {

           axios({
             method: 'post',
             url: MyTaskAcceptAppeal,
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
             },
             params : {
               ssid: sessionStorage.getItem("ssid")
             },
             transformRequest: [data => Qs.stringify(data)],
             data : {
               task_id : task_id,
               shopping_account_id : shopping_account_id
             }
           }).then( (response) => {

             let result = response.data;
             //console.log(result);

             if ( result.code > 0 ) {
               EventHub.$emit('toastOpen', result.message);
             }
             else {
               EventHub.$emit('toastOpen', result.message);
             }

           }).catch( (error) => {
             console.log(error);
           });

         },
         //申诉不通过
         doAppealReject : function (task_id, shopping_account_id) {
           axios({
             method: 'post',
             url: MyTaskRejectAppeal,
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
             },
             params : {
               ssid: sessionStorage.getItem("ssid")
             },
             transformRequest: [data => Qs.stringify(data)],
             data : {
               task_id : task_id,
               shopping_account_id : shopping_account_id
             }
           }).then( (response) => {

             let result = response.data;
             //console.log(result);

             if ( result.code > 0 ) {
               EventHub.$emit('toastOpen', result.message);
             }
             else {
               EventHub.$emit('toastOpen', result.message);
             }

           }).catch( (error) => {
             console.log(error);
           });
         },
         onConfirmReturn : function (task_id, shopping_account_id) {

           axios({
             method: 'post',
             url: MyTaskConfirmRefund,
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
             },
             params : {
               ssid: sessionStorage.getItem("ssid")
             },
             transformRequest: [data => Qs.stringify(data)],
             data : {
               task_id : task_id,
               shopping_account_id : shopping_account_id
             }
           }).then( (response) => {

             let result = response.data;
             //console.log(result);

             if ( result.code > 0 ) {
               EventHub.$emit('toastOpen', result.message);
               setTimeout(()=>{
                 EventHub.$emit("doRefreshRouter","doRefreshRouter");
               },2000);
             }
             else {
               EventHub.$emit('toastOpen', result.message);
             }

           }).catch( (error) => {
             console.log(error);
           });

         },
         toPageTaskDetail : function (task_id,shopping_account_id,status,level,realname,account,bank,bank_id) {
             //alert(task_id + ' ' + shopping_account_id);
           this.$router.push({
             name : 'taskDetail',
             query : {
               task_id : task_id,
               shopping_account_id : shopping_account_id,
               status : status,
               level : level,
               realname : realname,
               account : account,
               bank : bank,
               bank_id : bank_id
             }
           })
         },
         getMyTaskJoinList : function (task_id,status,page,psize) {
           axios({
             method: 'get',
             url: MyTaskJoinList,
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
             },
             params : {
               ssid: sessionStorage.getItem("ssid"),
               task_id : task_id,
               status : status,
               page : page,
               psize : psize
             }
           }).then( (response) => {

             let result = response.data;
             //console.log(result);

             if ( result.code > 0 ) {
                 this.result = result.data;
                 this.total = result.total;
                 //格式化时间
                 this.result.forEach(( currentVal, index, arr )=>{
                   arr[index].order_timeShow = this.getLocalTime(currentVal.order_time);
                   arr[index].complete_timeShow = this.getLocalTime(currentVal.complete_time);
                 });
             }
             else {
               EventHub.$emit('toastOpen', result.message);
             }

           }).catch( (error) => {
             console.log(error);
           });
         },
         getTaskGetReceivedState : function () {
           axios({
             method: 'post',
             url: TaskGetReceivedState,
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
             },
             params : {
               ssid: sessionStorage.getItem("ssid")
             }
           }).then( (response) => {

             let result = response.data;
             //console.log(result);

             if ( result.code > 0 ) {
               EventHub.$emit('toastOpen', result.message);
             }
             else {
               EventHub.$emit('toastOpen', result.message);
             }

           }).catch( (error) => {
             console.log(error);
           });
         },
         onNavClick : function (index) {
           switch(index)
           {
             case 2: {
               this.nav = [1,0,0,0];
               this.status = 2; //待返款
               this.getMyTaskJoinList(this.task_id,this.status,this.page,this.psize);
               break;
             }
             case 4:{
               this.nav = [0,1,0,0];
               this.status = 5; //待审核
               this.getMyTaskJoinList(this.task_id,this.status,this.page,this.psize);
               break;
             }
             case 999:{
               this.nav = [0,0,1,0];
               this.status = 999; //接手申诉
               this.getMyTaskJoinList(this.task_id,this.status,this.page,this.psize);
               break;
             }
             case 6: {
               this.nav = [0,0,0,1];
               this.status = 6; //已完成
               this.getMyTaskJoinList(this.task_id,this.status,this.page,this.psize);
               break;
             }
             default:{
             }
           }
         },
         isNavShow : function () {
         }
       },
       components: {
         navbar : navbar,
         back : back
       },
       beforeCreate() {
       },
       created() {
       },
       beforeMount() {
       },
       mounted() {
         this.task_id = this.$route.query.task_id;
         this.productPrice = this.$route.query.productPrice;
         this.price = this.$route.query.price;
         this.getMyTaskJoinList(this.task_id,this.status,this.page,this.psize);
       },
       beforeUpdate() {
       },
       updated() {
       },
       activated() {
         this.task_id = this.$route.query.task_id;
         this.productPrice = this.$route.query.productPrice;
         this.price = this.$route.query.price;
         this.getMyTaskJoinList(this.task_id,this.status,this.page,this.psize);
       },
       deactivated() {
       },
       beforeDestroy() {
       },
       destroyed() {
       }
   }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less" scoped>

  .task-page {
    padding: 94px 0 60px;

    .task-nav {
      position: fixed;
      top: 44px;
      left: 0;
      z-index: 100;
      width: 100%;
      height: 50px;
      background-color: #fff;
      color: rgb(96,100,110);
      font-size: 15px;
      box-shadow: 0 -1px 0px 0px rgba(0, 0, 0, .1) inset;

      div {
        border-bottom: 2px solid transparent;
      }

      div.active {
        color: rgb(29,138,231);
        border-bottom: 2px solid rgb(29,138,231);
      }
    }

    .task-list-box {
      position: relative;
      margin-bottom: 12px;
      padding: 0 15px;
      background-color: #fff;

      .header-box {
        position: relative;
        padding: 14px 15px;

        &::after {
          position: absolute;
          bottom: 0;
          left: 0;
          content: '';
          width: 100%;
          height: 1px;
          background-color: #e5e5e5;
        }

        .list-avatar {
          margin-right: 15px;
          width: 64px;
          height: 64px;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }

        .list-shop {
          .shop-name {
            margin: 8px 0 8px;
            color: #2A2A2A;
            font-size: 16px;
            line-height: 18px;
            .store-icon {
              img {
                margin-right: 8px;
              }
            }
          }
          .shop-tag {
            width: auto;
            height: 18px;
            color: #fff;
            font-size: 12px;
            line-height: 18px;
            margin-right: 8px;
            padding: 0 6px;
            letter-spacing: -1px;
            border-radius: 2px;
            &.primary {
              background-image: linear-gradient(90deg,#02AAF2,#4475F0);
            }
            &.orange {
              background-image: linear-gradient(90deg, #fbc261, #ff8f4d);
            }
          }
        }
      }

      .order-box {
        position: relative;
        padding: 13px 15px;

        .arrow {
          position: absolute;
          top: 13px;
          right: -4px;
          width: 22px;
          height: 22px;

          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }

        &::after {
          position: absolute;
          bottom: 0;
          left: 0;
          content: '';
          width: 100%;
          height: 1px;
          background-color: #e5e5e5;
        }

        .order-info {
          .item-name {
            min-width: 56px;
            font-size:14px;
            color:rgba(153,153,153,1);
            line-height:26px;
            margin-right: 30px;
          }
          .item-data {
            font-size:14px;
            color:rgba(153,153,153,1);
            line-height:26px;
          }
        }
      }

      .action-box {
        min-height: 28px;
        padding: 11px 0;

        & div:first-child {
        }

        .task-price {
          color: #FF3E3E;
          font-size: 20px;
          span {
            font-size: 12px;
          }
        }
        .shop-price {
          width: auto;
          min-height:24px;
          /*margin-left: 6px;*/
          padding: 2px 5px 3px;
          font-size:12px;
          line-height: 17px;
          color:rgba(255,62,62,1);
          background:rgba(255,235,235,1);
          border-radius: 1px ;
          border: 1px dotted #FF3E3E;
        }
        .no-pass {
          min-width:68px;
          padding : 0 10px;
          height:28px;
          font-size: 12px;
          line-height: 28px;
          border-radius: 100px;
          text-align: center;
        }
        .refund {
          height: 28px;
          margin-left: 8px;
          padding: 0 6px;
          color: #999;
          /* border: 1px dotted #999; */
          border-radius: 1px;
          font-size: 12px;
          line-height: 28px;
          text-align: center;
          background-color: rgba(153, 153, 153, 0.1);
        }
        .primary {
          min-width: 40px;
          padding: 0 8px;
          color: #1D8AE7;
          border: 1px solid #1D8AE7;
          border-radius: 100px;
          margin-left: 8px;
          height:28px;
          font-size: 12px;
          line-height: 28px;
          text-align: center;
          background-color: #fff;
        }
        .grey {
          min-width: 0;
          padding: 0 6px;
          color: #60646E;
          border: 1px solid #CCCCCC;
        }
      }

    }

  }


</style>
