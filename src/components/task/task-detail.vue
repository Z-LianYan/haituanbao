<template>

  <div class="page-taskDetail">

    <back :backTitle="backTitle" />

    <div class="task-list-box">

      <div class="flex header-box">
        <div class="list-avatar">
          <img :src="store_Obj.logo" width="64" height="64">
        </div>
        <div class="list-shop">
          <div class="shop-name"> ID：{{result.store_id}} </div>
          <div class="flex">
<!--            <div class="shop-tag primary">男</div>-->
            <div class="shop-tag primary" v-if="receivedStateResult.is_store_name_verified">已实名</div>
            <div class="shop-tag orange">淘气值 {{level}}</div>
          </div>
          <div class="shop-createdTime">注册时间 {{receivedStateResult.store_name_verified_timeShow}} </div>
        </div>
      </div>

    </div>

    <div class="flex-col detail-info-top">

      <div class="info-h1">简单搜索，货比三家，浏览3-5分钟</div>

      <div class="info-h2" v-if="result.refund_time === 12">商家返款时间：好评后次日12时前</div>
      <div class="info-h2" v-if="result.refund_time === 17">商家返款时间：好评后次日17时前</div>


      <div class="flex cross-center amount-box">
        <div class="shop-commission">佣金</div>
        <div class="commission-amount">
          <span>￥</span>{{result.price}}/ <span>单</span>
        </div>
      </div>

    </div>

    <div class="flex detail-info-bottom">

      <div class="shop-img">
        <img :src="product_photo_Obj.url" alt="">
      </div>

      <div class="flex-col main-between flex1 shop-detail">
        <div class="shop-desc">{{product_Obj.name}}</div>
        <div class="flex">
          <div class="flex-col item-box">
            <div class="item-name">宝贝价格</div>
            <div class="item-data obvious"> <span>￥</span>{{product_Obj.price}}</div>
          </div>
          <div class="flex-col flex1 item-box">
            <div class="item-name">发货地</div>
            <div class="item-data">{{product_Obj.send_city}}</div>
          </div>
        </div>
      </div>

    </div>

    <!--验证店铺名称-->
    <div class="detail-list">
      <div class="detail-item flex no-border">
        <div class="flex main-between cross-center flex1 item-info">
          <div class="item-name">验证店铺名称</div>
          <div class="item-data">{{receivedStateResult.store_name}}</div>
        </div>
      </div>
    </div>

    <!--模拟购物流程-->
    <div class="detail-list">

      <div class="detail-item flex">
        <div class="flex main-between flex1 item-info">
          <div class="item-name">模拟购物流程</div>
          <!--<div class="item-data">{{receivedStateResult.shopping_time}}</div>-->
        </div>
      </div>

      <div class="shopping-step" v-if="receivedStateResult.shop_around_pic1 || receivedStateResult.shop_around_pic2">
        <div class="shop-list">
          <div class="step-tips">货比三家</div>
          <div class="flex  flex-wrap shop-box">
            <div class="flex-col shop-img"  v-if="receivedStateResult.shop_around_pic1">
              <img :src="receivedStateResult.shop_around_pic1" data-info="货比三家" alt="">
              <div class="view-lg" @click="doViewImg(receivedStateResult.shop_around_pic1)">查看大图</div>
            </div>
            <div class="flex-col shop-img" v-if="receivedStateResult.shop_around_pic2">
              <img :src="receivedStateResult.shop_around_pic2" data-info="货比三家"  alt="">
              <div class="view-lg" @click="doViewImg(receivedStateResult.shop_around_pic2)">查看大图</div>
            </div>
          </div>
        </div>
      </div>

      <div class="shopping-step" v-if="receivedStateResult.search_pic">
        <div class="shop-list">
          <div class="step-tips">搜索截图</div>
          <div class="flex  flex-wrap shop-box">
            <div class="flex-col shop-img" v-if="receivedStateResult.search_pic">
              <img :src="receivedStateResult.search_pic" data-info="搜索截图" alt="">
              <div class="view-lg" @click="doViewImg(receivedStateResult.search_pic)">查看大图</div>
            </div>
          </div>
        </div>
      </div>

      <div class="shopping-step" v-if="receivedStateResult.chat_pic">
        <div class="shop-list">
          <div class="step-tips">客服聊天</div>
          <div class="flex  flex-wrap shop-box">
            <div class="flex-col shop-img" v-if="receivedStateResult.chat_pic">
              <img :src="receivedStateResult.chat_pic" data-info="客服聊天" alt="">
              <div class="view-lg" @click="doViewImg(receivedStateResult.chat_pic)">查看大图</div>
            </div>
          </div>
        </div>
      </div>

      <div class="shopping-step" v-if="receivedStateResult.favorite_store_pic || receivedStateResult.follow_store_pic || receivedStateResult.favorite_product_pic">
        <div class="shop-list">
          <div class="step-tips">收藏关注</div>
          <div class="flex  flex-wrap shop-box">

            <div class="flex-col shop-img" v-if="receivedStateResult.favorite_store_pic">
              <img :src="receivedStateResult.favorite_store_pic" data-info="收藏店铺截图" alt="">
              <div class="view-lg" @click="doViewImg(receivedStateResult.favorite_store_pic)">查看大图</div>
            </div>

            <div class="flex-col shop-img" v-if="receivedStateResult.follow_store_pic">
              <img :src="receivedStateResult.follow_store_pic" data-info="关注店铺截图" alt="">
              <div class="view-lg" @click="doViewImg(receivedStateResult.follow_store_pic)">查看大图</div>
            </div>

            <div class="flex-col shop-img" v-if="receivedStateResult.favorite_product_pic">
              <img :src="receivedStateResult.favorite_product_pic" data-info="收藏宝贝截图"  alt="">
              <div class="view-lg" @click="doViewImg(receivedStateResult.favorite_product_pic)">查看大图</div>
            </div>

          </div>
        </div>
      </div>

    </div>
    <!-- 好评签收-->
    <div class="detail-list">

      <div class="detail-item flex">
        <div class="flex main-between flex1 item-info">
          <div class="item-name">好评签收</div>
          <!--<div class="item-data">2017-10-12 20:15</div>-->
        </div>
      </div>

      <div class="shopping-step" style="padding-top: 0">
        <div class="shop-list">
          <!--<div class="step-tips">货比三家</div>-->
          <div class="flex flex-wrap shop-box no-border">
            <div class="flex-col shop-img" v-if="receivedStateResult.good_rate_pic">
              <img :src="receivedStateResult.good_rate_pic" data-info="好评截图" alt="">
              <div class="view-lg" @click="doViewImg(receivedStateResult.good_rate_pic)">查看大图</div>
            </div>
            <div class="flex-col shop-img" v-if="receivedStateResult.sign_pic">
              <img :src="receivedStateResult.sign_pic" data-info="签收截图" alt="">
              <div class="view-lg" @click="doViewImg(receivedStateResult.sign_pic)">查看大图</div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!--下单支付-->
    <div class="detail-list">
      <div class="detail-item flex">
        <div class="flex main-between cross-center flex1 item-info">
          <div class="item-name">下单支付</div>
          <div class="item-data">{{receivedStateResult.order_timeShow}}</div>
        </div>
      </div>
      <div class="detail-item flex no-border">
        <div class="flex main-between cross-center flex1 item-info">
          <div class="item-name">订单编号</div>
          <div class="item-data">{{receivedStateResult.order_no}}</div>
        </div>
      </div>
    </div>

    <div class="flex action-btn" v-if="status === 5">
      <!-- 审核不通过 按钮-->
      <div class="btn-box">
        <button class="btn refuse" @click="doOpenNoPassShow"> 审核不通过 </button>
      </div>
      <!-- 审核通过 按钮-->
      <div class="btn-box">
        <button class="btn pass" @click="doOpenPassShow"> 审核通过 </button>
      </div>
    </div>

    <!-- 审核不通过 -->
    <transition name="fade">
      <div class="flex both-center audit-box" v-if="noPassShow">
        <div class="box">
          <div class="flex main-center title"> 审核不通过 </div>
          <div class="flex-col main-center text-box">
            <div class="textarea-tips"> 审核不通过原因 </div>
            <textarea class="reason" name="" ref="reason" cols="30" rows="10" placeholder="" v-model="noPassReason"></textarea>
          </div>
          <div class="flex flex-wrap tags">
            <div class="tags-item" :class="{ selected : selectedShow[index] }" v-for="(item, index) in reasonTags" :key="index" @click="tagSelect(index,item.id)">{{item.name}}</div>
          </div>
          <div class="btn-box">
            <button class="btn active" @click="doNoPassAction">提交</button>
            <button class="btn" @click="doCloseNoPassShow">取消</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- 审核通过 -->
    <transition name="fade">
      <div class="flex both-center audit-box" v-if="passShow">
        <div class="box">
          <div class="flex main-center title"> 审核通过 </div>
          <div class="list">
            <div class="flex item">
              <div>账户名：</div>
              <div>{{realname}}</div>
            </div>
            <div class="flex item">
              <div>账号：</div>
              <div>{{account}}</div>
            </div>
            <div class="flex item">
              <div>开户行：</div>
              <div>{{bank}}</div>
            </div>
          </div>
          <div class="btn-box">
            <button class="btn active" @click="doPassAction">提交</button>
            <button class="btn" @click="doClosePassShow">取消</button>
          </div>
        </div>
      </div>
    </transition>


    <transition name="fade">
      <div v-if="wrapperShow" class="img-wrapper">
        <div class="flex flex-col both-center img-box">
          <div class="flex both-center close" @click="doViewImgClose">
            <img src="../../assets/images/icon/close@2x.png" alt="close" width="24" height="24">
          </div>
          <div class="large-text"> {{largeImgText}} </div>
          <img class="large-image" :src="lgImgUrl" alt="查看大图">
        </div>
      </div>
    </transition>




  </div>

</template>

<script type="text/ecmascript-6">
  import back from '../common/back.vue'

  import axios from 'axios';
  import Qs from 'qs';

   export default {
       name: "",
       data() {
           return {
             backTitle : '任务参与详情',
             task_id : '', // 任务id
             shopping_account_id : '', //买号id
             status : '', //审核状态
             level : '', // 淘气值
             result : {},
             product_Obj : {},
             product_photo_Obj : {},
             store_Obj : {},

             receivedStateResult : {},
             reasonTags : [],
             selectedShow : [],
             selected : [], //要传到数据库的 tags id 标记

             noPassShow : false,
             passShow : false,
             noPassReason : '',

             realname : '',
             account : '',
             bank : '',
             bank_id : '',

             wrapperShow : false,
             lgImgUrl : '',
             largeImgText : '查看大图'
           }
       },
       props: [],
       watch: {},
       computed: {},
       methods: {

         doViewImgClose : function (data) {
           //EventHub.$emit("appOverflowHiddenClose",'appOverflowHiddenClose');
           this.wrapperShow = false;
         },
         doViewImg : function (url) {
             //EventHub.$emit("appOverflowHidden",'appOverflowHidden');
             this.wrapperShow = true;
             this.lgImgUrl = url;
         },
         tagSelect : function (index,id) {
           //alert(index + ' ' +id);
           this.selectedShow[index] = !this.selectedShow[index];
           this.$set( this.selectedShow, index,  this.selectedShow[index]); // 对象更新之后，手动触发视图更新
           this.selected = [];
           this.selectedShow.forEach( ( currentVal, index, arr )=>{
               if ( currentVal === true ){
                 this.selected.push(this.reasonTags[index].id);
               }
               else {
                 this.selected.splice(index);
               }
           });
           this.selected = this.selected.join();
         },
         // 审核通过按钮
         doPassAction : function () {
           this.doTask_ConfirmComplete(this.task_id,this.shopping_account_id,this.bank_id);
         },
         //审核通过
         doTask_ConfirmComplete : function (task_id,shopping_account_id,bank_account_id) {
           axios({
             method: 'post',
             url: Task_ConfirmComplete,
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
             },
             params : {
               ssid: sessionStorage.getItem("ssid")
             },
             transformRequest: [data => Qs.stringify(data)],
             data : {
               task_id : task_id,
               shopping_account_id : shopping_account_id,
               bank_account_id : bank_account_id
             }
           }).then( (response) => {
             let result = response.data;

             if ( result.code > 0 ) {
               EventHub.$emit('toastOpen', result.message);
               EventHub.$emit("appOverflowHiddenClose","appOverflowHiddenClose");
               setTimeout(()=>{
                 window.history.back();
               },2000);
             }
             else if ( result.code === -1 ) {
               EventHub.$emit('toastOpen', result.message);
             }
             else {
               EventHub.$emit('toastOpen', result.message);
             }

           }).catch( (error) => {
             console.log(error);
           });
         },
         // 审核不通过按钮
         doNoPassAction : function () {
           this.doDisapproveComplete(this.task_id,this.shopping_account_id,this.selected,this.noPassReason);
         },
         //审核不通过
         doDisapproveComplete : function (task_id,shopping_account_id,tag_id,reason) {
           axios({
             method: 'post',
             url: MyTaskDisapproveComplete,
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
             },
             params : {
               ssid: sessionStorage.getItem("ssid")
             },
             transformRequest: [data => Qs.stringify(data)],
             data : {
               task_id : task_id,
               shopping_account_id : shopping_account_id,
               tag_id : tag_id,
               reason : reason
             }
           }).then( (response) => {
             let result = response.data;

             devConsole.log(typeof result);

             if ( result.code > 0 ) {
               EventHub.$emit('toastOpen', result.message);
               EventHub.$emit("appOverflowHiddenClose","appOverflowHiddenClose");
               setTimeout(()=>{
                 window.history.back();
               },2000);
             }
             else if ( result.code === -1 ) {
               EventHub.$emit('toastOpen', result.message);
             }
             else {
               EventHub.$emit('toastOpen', result.message);
             }

           }).catch( (error) => {
             console.log(error);
           });


         },
         doOpenNoPassShow : function () {
           if ( this.result === undefined ){
             EventHub.$emit("appOverflowHiddenClose","appOverflowHiddenClose");
           }
           else {
             EventHub.$emit("appOverflowHidden","appOverflowHidden");
             this.noPassShow = true;
           }
         },
         doCloseNoPassShow : function () {
           EventHub.$emit("appOverflowHiddenClose","appOverflowHiddenClose");
           this.noPassShow = false;
         },
         doOpenPassShow : function () {
           if ( this.result === undefined ){
             EventHub.$emit("appOverflowHiddenClose","appOverflowHiddenClose");
           }
           else {
             EventHub.$emit("appOverflowHidden","appOverflowHidden");
             this.passShow = true;
           }
         },
         doClosePassShow : function () {
           EventHub.$emit("appOverflowHiddenClose","appOverflowHiddenClose");
           this.passShow = false;
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
         getTaskDetail : function (task_id) {

             axios({
               method: 'get',
               url: Task_Detail,
               headers: {
                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
               },
               params : {
                 ssid: sessionStorage.getItem("ssid"),
                 id : task_id
               }
             }).then( (response) => {

               let result = response.data;
               this.result = result.data;
               this.product_Obj = result.data.product;
               this.product_photo_Obj = result.data.product_photo;
               this.store_Obj = result.data.store;
               //console.log(result);

               if ( result.code > 0 ) {
                 //EventHub.$emit('toastOpen', result.message);
               }
               else if ( result.code === -1 ) {
                 EventHub.$emit('toastOpen', result.message);
               }
               else {
                 EventHub.$emit('toastOpen', result.message);
               }

             }).catch( (error) => {
               console.log(error);
             });
           },
         getTaskGetReceivedState : function (task_id,shopping_account_id) {
           axios({
             method: 'get',
             url: MyTaskGetReceivedState,
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
             },
             params : {
               ssid: sessionStorage.getItem("ssid"),
               task_id : task_id,
               shopping_account_id : shopping_account_id
             }
           }).then( (response) => {
             let result = response.data;

             if ( result.code > 0 ) {
               //EventHub.$emit('toastOpen', result.message);
               this.receivedStateResult = result.data;
               this.receivedStateResult.order_timeShow = this.getLocalTime(this.receivedStateResult.order_time);
               this.receivedStateResult.store_name_verified_timeShow = this.getLocalTime(this.receivedStateResult.store_name_verified_time);
             }
             else if ( result.code === -1 ) {
               EventHub.$emit('toastOpen', result.message);
             }
             else {
               EventHub.$emit('toastOpen', result.message);
             }

           }).catch( (error) => {
             console.log(error);
           });
         },
         //获取标签
         getTaskAuditTags : function () {
           axios({
             method: 'get',
             url: TaskAuditTags,
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
             },
             params : {
               ssid: sessionStorage.getItem("ssid")
             }
           }).then( (response) => {
             let result = response.data;

             if ( result.code > 0 ) {
                this.reasonTags = result.data;
               this.selectedShow.length = this.reasonTags.length;
               for(let i=0;i<this.selectedShow.length;i++) {
                 this.selectedShow[i] = false;
               }
             }
             else if ( result.code === -1 ) {
               EventHub.$emit('toastOpen', result.message);
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
           this.shopping_account_id = this.$route.query.shopping_account_id;
           this.level = this.$route.query.level;
           this.status = parseInt(this.$route.query.status);
           this.realname = this.$route.query.realname;
           this.account = this.$route.query.account;
           this.bank = this.$route.query.bank;
           this.bank_id = this.$route.query.bank_id;

           this.getTaskAuditTags(); // 获取原因标签
           this.getTaskDetail(this.task_id);
           this.getTaskGetReceivedState(this.task_id,this.shopping_account_id);
       },
       beforeUpdate() {
       },
       updated() {
       },
       activated() {
         this.task_id = this.$route.query.task_id;
         this.shopping_account_id = this.$route.query.shopping_account_id;
         this.level = this.$route.query.level;
         this.status = parseInt(this.$route.query.status);
         this.realname = this.$route.query.realname;
         this.account = this.$route.query.account;
         this.bank = this.$route.query.bank;
         this.bank_id = this.$route.query.bank_id;

         this.getTaskAuditTags(); // 获取原因标签
         this.getTaskDetail(this.task_id);
         this.getTaskGetReceivedState(this.task_id,this.shopping_account_id);
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

  .page-taskDetail {
    padding: 44px 0 60px;
    overflow-x: hidden;

    .task-list-box {
      margin-bottom: 12px;
      padding: 0 15px;
      background-color: #fff;

      & .header-box:first-child:after {
        background-color: transparent;
      }

      .header-box {
        height: 110px;
        position: relative;
        padding: 16px 0;

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
            margin-bottom: 8px;
            color: #2A2A2A;
            font-size: 16px;
            line-height: 18px;
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
          .shop-createdTime {
            margin-top: 6px;
            font-size:13px;
            color:rgba(153,153,153,1);
            line-height:25px;
          }
        }
      }

      .order-box {
        position: relative;
        padding: 13px 15px;

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
          min-height: 28px;
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
          height:22px;
          margin-left: 6px;
          padding: 2px 5px 3px;
          font-size:12px;
          line-height: 17px;
          color:rgba(255,62,62,1);
          background:rgba(255,235,235,1);
          border-radius: 1px ;
          border: 1px dotted #FF3E3E;
        }
        .no-pass, .refund {
          min-width:68px;
          height:28px;
          font-size: 12px;
          line-height: 28px;
          border-radius: 100px ;
          text-align: center;
        }
        .refund {
          margin-left: 8px;
        }
        .primary {
          color: #1D8AE7;
          border: 1px solid #1D8AE7;
        }
        .grey {
          color: #60646E;
          border: 1px solid #CCCCCC;
        }
      }



    }

    .detail-info-top {
      position: relative;
      padding: 17px 15px;
      background-color: #fff;

      &::after {
        position: absolute;
        bottom: 0;
        left: 15px;
        content: '';
        width: 100%;
        height: 1px;
        background-color: #e5e5e5;
      }

      .info-h1 {
        font-size:17px;
        color:rgba(42,42,42,1);
        line-height:24px;
      }
      .info-h2 {
        margin: 3px 0 6px;
        font-size:15px;
        color:rgba(153,153,153,1);
        line-height:26px;
      }

      .amount-box {
      }

      .shop-commission {
        width: auto;
        height:22px;
        padding: 2px 5px 3px;
        font-size:12px;
        line-height: 17px;
        color:rgba(255,62,62,1);
        background:rgba(255,235,235,1);
        border-radius: 1px ;
        border: 1px dotted #FF3E3E;
      }

      .commission-amount {
        margin-left: 10px;
        color: #FF3E3E;
        font-size: 20px;

        span {
          font-size: 12px;
        }
      }
    }

    .detail-info-bottom {
      height: 200px;
      padding: 20px 15px 22px;
      background-color: #fff;

      .shop-img {
        width: 34.8%;
        margin-right: 15px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 4px;
          object-fit: contain;
        }
      }

      .shop-detail {

        .shop-desc {
          font-size:16px;
          color:rgba(42,42,42,1);
          line-height:22px;
        }

        .item-box {
          .item-name {
            font-size:13px;
            color:rgba(153,153,153,1);
            line-height:18px;
          }
          .item-data {
            margin-top: 7px;
            font-size:14px;
            color:rgba(42,42,42,1);
            line-height:20px;
            &.obvious {
              color: #FF3E3E;
            }
            span {
              font-size: 12px;
            }
        }

        }

        .flex .item-box:first-child {
          position: relative;
          padding-right: 34px;

          &:after {
            position: absolute;
            top: 3px;
            right: 0;
            content: '';
            width: 1px;
            height: 40px;
            background-color: rgb(229,229,229);
          }
        }

        .flex .item-box:last-child {
          padding-left: 14px;
        }

      }

    }

    .detail-list {
      margin-top: 12px;
      padding: 0 15px;
      background-color: #fff;

      .detail-item {
        position: relative;
        height: 54px;
        padding: 12px 0 11px;

        &:after {
          position: absolute;
          bottom: 0;
          left: 0;
          content: '';
          width: 100%;
          height: 1px;
          background-color: #e5e5e5;
        }

        .item-icon {
          margin-right: 20px;
        }
        .item-info {

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

      .shopping-step {
        padding: 19px 0 0 0 ;

        .shop-list {
          position: relative;

          &:after {
            position: absolute;
            bottom: 0;
            left: 0;
            content: '';
            width: 100%;
            height: 1px;
            background-color: rgb(229,229,229);
          }

          .step-tips {
            position: relative;
            padding-left: 8px;
            font-size:16px;
            color:rgba(42,42,42,1);
            line-height:22px;

            &::before {
              position: absolute;
              top: 3px;
              left: 0;
              content: '';
              width: 2px;
              height: 15px;
              background-color: #1d8ae7;
            }
          }

          .shop-box {
            margin-top: 14px;

            & .shop-img:last-child {
              margin-right: 0;
            }

            .shop-img {
              width: 30.4%;
              margin-right: 4.3%;
              font-size: 0;

              .view-lg {
                margin-top: 9px;
                margin-bottom: 19px;
                font-size:13px;
                color:rgba(153,153,153,1);
                line-height:18px;
                text-align: center;
              }

            }

            div {
              img {
                width: 100%;
                height: auto;
              }
            }
          }

        }


      }

    }

    .img-wrapper {
      position: absolute;
      top : 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.6);
      z-index: 100;

      .img-box {
        position: fixed;
        top: 50px;
        left: 0;
        right: 0;
        width: 94%;
        height: auto;
        margin: 0 auto;
        padding: 14px 16px 20px;
        background-color: #fff;
        border-radius: 2px;

        .close {
          position: absolute;
          right: 0;
          top: 0;
          width: 30px;
          height: 30px;
        }

        .large-text {
          font-size: 14px;
          color: #666;
          line-height: 22px;
          margin-bottom: 28px;
          text-align: center;
        }

        .large-image {
          width: 100%;
          height: auto;
          max-height: 400px;
          box-shadow: 0 0 3px 1px #888888;
        }
      }


    }

    .action-btn {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 100;
      .btn.pass {
        width: 100%;
        border-radius: 0;
        //background-image: linear-gradient(90deg, #02AAF2, #4475F0);
        background-color: #1d8ae7;
      }
      .btn.refuse {
        width: 100%;
        border-radius: 0;
        //background-image: linear-gradient(270deg, #fbc261, #ff8f4d);
        //background-image: linear-gradient(90deg, #02AAF2, #4475F0);
        background-color: rgba(134, 189, 238, 1);
      }
    }

    .audit-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 100;
      .box {
        position: relative;
        width: 92%;
        min-height: 260px;
        padding: 10px 16px 20px;
        border-radius: 2px;
        background-color: #eff0f4;

        .list {
          padding: 10px 0 20px;
          .item {
            padding: 6px 0;
            font-size: 14px;
            color: #666;
          }
        }

        .title {
          padding: 10px 0;
          font-size: 16px;
          font-weight: bold;
          color: #333;
        }
        .tags {
          margin-bottom: 20px;
          .tags-item {
            margin: 6px 6px 0 0;
            padding: 2px 6px;
            font-size: 12px;
            color: #999;
            border: 1px solid #999;
            border-radius: 1px;
            &.selected {
              color: #1d8ae7;
              border: 1px solid #1d8ae7;
            }
          }
        }
        .text-box {
          .textarea-tips {
            font-size: 14px;
            color: #999;
            padding: 8px 0;
          }
          .reason {
            width: 100%;
            height: 120px;
            background-color: #fff;
            padding: 10px;
            border: none;
            color: #999;
            font-size: 16px;
            line-height: 22px;
            border-radius: 4px;
            resize: none;
            &:focus {
              outline: none;
            }

            /* placeholder */
            &::-webkit-input-placeholder { /* WebKit browsers */
              color:rgba(204,204,204,1);
              font-size: 14px;
              line-height: 100%;
            }
            &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
              color:rgba(204,204,204,1);
              font-size: 14px;
              line-height: 100%;
            }
            &::-moz-placeholder { /* Mozilla Firefox 19+ */
              color:rgba(204,204,204,1);
              font-size: 14px;
              line-height: 100%;
            }
            &:-ms-input-placeholder { /* Internet Explorer 10+ */
              color:rgba(204,204,204,1);
              font-size: 14px;
              line-height: 100%;
            }
          }
        }

        .btn-box {
          .btn {
            margin-top: 10px;
          }
        }
      }
    }



  }

</style>
