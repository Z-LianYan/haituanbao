<template>

  <div class="task-page">

    <div class="flex both-center back-box">
      <div class="flex both-center back-left">
      </div>
      <div class="back-title">{{ backTitle }}</div>
      <div class="flex both-center back-right" @click="toPageTaskPublish1">发布任务</div>
      <div class="flex both-center back-left"  @click="toPageTaskPublish5 ">产品库</div>
    </div>

    <div class="flex task-nav">
      <div class="flex1 both-center transition" :class="{ active : tab[0] }" @click="onNavClick(2)">进行中</div>
<!--      <div class="flex1 both-center transition" :class="{ active : isDistribute }" @click="onNavClick(1)">已发布</div>-->
      <div class="flex1 both-center transition" :class="{ active : tab[1] }" @click="onNavClick(8)">已结束</div>
      <div class="flex1 both-center transition" :class="{ active : tab[2] }" @click="onNavClick(0)">草稿</div>
    </div>

    <div class="primary-tips flex both-center">商家需在用户完成任务后，次日约定时间内完成审核并返款</div>

    <keep-alive>
      <router-view />
    </keep-alive>


<!--

    &lt;!&ndash;无数据&ndash;&gt;
    <div class="flex-col task-box" style="padding-top: 0" v-if="total === 0">
      <div class="flex both-center no-data">暂无相关信息</div>
    </div>

    &lt;!&ndash;有数据&ndash;&gt;
    <div class="flex-col task-box" v-for="(item, index) of data" :key="index" v-if="total !== 0">

      &lt;!&ndash;商品上部分&ndash;&gt;
      <div class="flex task-box-top">

        <div class="box-left">

          <div v-if="item.product_photo" class="task-avatar">
            <img :src="item.product_photo.url" width="121" height="161">
          </div>

          <div v-if="item.product_photo === undefined" class="task-avatar" style="background-color: #e9f5ff">
          </div>


          <div class="flex both-center task-name"> {{item.category_name}} </div>
        </div>

        <div class="box-right">
          <div class="task-info">
            <span class="task-id">编号 {{item.task_id}} </span>
            <span v-if="item.status === 1" class="task-status in-progress">进行中</span>
            <span v-if="item.status === 8" class="task-status finished">已结束</span>
            <span v-if="item.status === 0" class="task-status in-progress">草稿</span>
          </div>

          <div v-if="item.product" class="shop-price">宝贝价格<span> {{item.product.price}} </span></div>
          <div v-if="item.product === undefined" class="shop-price">宝贝价格<span> &#45;&#45;/&#45;&#45; </span></div>

          <div class="price-per"> <span class="small">￥</span> {{item.price}} <span class="small">/单</span> </div>

          <div class="flex task-amount">
            <div class="flex-col flex1 amount-item">
              <div>任务预算</div>
              <div> ￥{{item.works*parseFloat(item.price)}} </div>
            </div>
            <div class="flex-col flex1 amount-item">
              <div>任务数量</div>
              <div> {{item.works}} </div>
            </div>
            <div class="flex-col flex1 amount-item no-border">
              <div>剩余任务</div>
              <div> {{item.works - item.completes}} </div>
            </div>
          </div>

          <div class="flex main-between cross-center">
            <div class="flex-col time-box">
              <div class="task-deadline">任务截至时间</div>
              <div class="flex tag-start"> <span class="flex both-center">始</span> {{item.stime}} </div>
              <div class="flex tag-end"> <span class="flex both-center">终</span> {{item.etime}}</div>
            </div>

            &lt;!&ndash; 修改时间 &ndash;&gt;
            <div v-if="isInProgress" :data-no="index" class="flex both-center tag-edit-btn"
                 @click="doModifyTime('doModifyTime')">时间</div>
            <div v-if="isInProgress" class="flex both-center tag-edit-btn" @click="toPageTaskList(item.task_id,item.product.price,item.price)">详情</div>

            &lt;!&ndash; 重新发布 &ndash;&gt;
            <div v-if="isEnd" :data-no="index" class="flex both-center tag-edit-btn" @click="onPageTaskEditPublish3(index,2)">重发</div>
            <div v-if="isEnd" class="flex both-center tag-edit-btn" @click="toPageTaskList(item.task_id,item.product.price,item.price)">详情</div>

            <div v-if="isDraft" :data-no="index" class="flex both-center tag-edit-btn" @click="onPageTaskEditPublish3(index,3)">编辑</div>
            <div v-if="isDraft" class="flex both-center tag-edit-btn" @click="toDistributePayment(item.task_id, item.price, item.works)">发布</div>

          </div>

        </div>

      </div>
      &lt;!&ndash;商品下部分&ndash;&gt;
      <div class="flex task-box-bottom main-between">

        <div class="flex-col both-center flex task-statistics">
          <div class="statistics-name">浏览任务</div>
          <div class="statistics-data">{{item.views}}</div>
        </div>

        <div class="flex-col both-center flex task-statistics">
          <div class="statistics-name">参加任务</div>
          <div class="statistics-data">{{item.accepts}}</div>
        </div>

        <div class="flex-col both-center flex task-statistics">
          <div class="statistics-name">已下单</div>
          <div class="statistics-data">{{item.orders}}</div>
        </div>

        <div class="flex-col both-center flex task-statistics">
          <div class="statistics-name">待评价</div>
          <div class="statistics-data">{{item.for_rates}}</div>
        </div>

        <div class="flex-col both-center flex task-statistics">
          <div class="statistics-name">完成任务</div>
          <div class="statistics-data">{{item.completes}}</div>
        </div>

      </div>

    </div>

    <div class="btn-box" v-if="page*psize < total && total > 0" >
      <button class="btn active" @click="doLoadMore"> 加载更多 </button>
    </div>

    <div class="btn-box logout" v-if="page*psize >= total && total > 0">
      <button class="btn finished"> 以上已是全部内容 </button>
    </div>

    &lt;!&ndash;【进行中】时间修改&ndash;&gt;
    <div class="flex both-center isInProgress-time" v-if="isInProgressTimeShow">
      <div class="time-box"></div>
    </div>

-->

    <navbar :nav2="nav2" />

  </div>


</template>

<script type="text/ecmascript-6">
  import navbar from '../common/navbar.vue'

  import axios from 'axios';
  import Qs from 'qs';

   export default {
       name: "",
       data() {
           return {
             backTitle : '任务管理',
             tab : [false,false,false],
             nav2 : true,
             data : [],
             page : 1,
             psize : 5,
             total : 0,
             status : 2,
             product_photo : [],

             isInProgressTimeShow : false
           }
       },
       props: [],
       watch: {},
       computed: {
       },
       methods: {
         doModifyTime : function (type) {
/*           if( type === 'isInProgress' ){
               EventHub.$emit('doOpenModifyTime','doOpenModifyTime');
               this.isInProgressTimeShow = true;
           }
           else {
             EventHub.$emit('doOpenModifyTime','doOpenModifyTime');
             this.isInProgressTimeShow = true;
           }*/
         },
         toPageTaskDetail : function (task_id) {
           this.$router.push({
             name : 'taskDetail',
             query : {
               task_id : task_id
             }
           })
         },
         onPageTaskEditPublish3 : function (index,tab) {
           sessionStorage.setItem("editTaskObj",JSON.stringify(this.data[index])); // 将需要编辑的任务数据，保存到sessionStorage
           this.$router.push({
             name : 'taskEditPublish3',
             params : {
                 tab : tab
             }
           })
         },
         toPageTaskPublish1 : function () {
           this.$router.push({
             name : 'taskPublish1'
           })
         },
        //  点击产品库跳转
        toPageTaskPublish5 : function () {
           this.$router.push({
             name : 'taskPublish5'
           })
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
         onDraftDistribute : function (task_id) {

           //alert("task_id：" + task_id);

           axios({
             method: 'post',
             url: Task_Distribute,
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
             },
             params : {
               ssid: sessionStorage.getItem("ssid")
             },
             transformRequest: [data => Qs.stringify(data)],
             data : {
               task_id : task_id
             }
           }).then( (response) => {

             let result = response.data;
             //console.log(result);

             if ( result.code > 0 ) {
               EventHub.$emit('toastOpen', result.message);
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
         toDistributePayment : function (task_id, price, works) {
           this.$router.push({
             name : 'distributePayment',
             query : {
               task_id : task_id
             }
           });
           sessionStorage.setItem('distributePayment-task_id',task_id);
           sessionStorage.setItem('distributePayment-price',price);
           sessionStorage.setItem('distributePayment-works',works);
         },
         onNavClick : function (index) {
           switch(index)
           {
             case 2: { //进行中
               this.$router.push({
                 name : 'isGoing'
               });
               this.initTabs();
               break;
             }
             case 8:{ //已结束
               this.$router.push({
                 name : 'isEnd'
               });
               this.initTabs();
               break;
             }
             case 0:{ //草稿
               this.$router.push({
                 name : 'isDraft'
               });
               this.initTabs();
               break;
             }
             default:{
             }
           }
         },
         initTabs : function () {
             if ( this.$route.name === 'isGoing' ){
               this.tab = [false,false,false];
               this.tab[0] = true;
             }
             else if( this.$route.name === 'isEnd' ){
               this.tab = [false,false,false];
               this.tab[1] = true;
             }
             else if( this.$route.name === 'isDraft' ) {
               this.tab = [false,false,false];
               this.tab[2] = true;
             }
             else {
             }
         }

       },
       components: {
         navbar : navbar
       },
       beforeCreate() {
       },
       created() {
       },
       beforeMount() {
       },
       mounted() {
           this.initTabs();
       },
       beforeUpdate() {
       },
       updated() {
       },
       activated() {
           this.initTabs();

/*         if ( this.$route.query.status ){
           this.status = this.$route.query.status;
           this.onNavClick(this.status);
         }
         else {
           this.getTask(2);
         }

         let bb = Math.round(new Date() / 1000);

         let date = new Date( 1514736000 *1000);

         let year = date.getFullYear().toString();
         let mouth = (date.getMonth()+1).toString();
         let data = date.getDate().toString();
         let hours = date.getHours().toString();
         let minutes = date.getMinutes().toString();

         if( mouth.length === 1 ){
           mouth = '0' + mouth;
         }
         if( data.length === 1 ){
           data = '0' + data;
         }
         if( hours.length === 1 ){
           hours = '0' + hours;
         }
         if( minutes.length === 1 ){
           minutes = '0' + minutes;
         }
         devConsole.log(year + '-' + mouth + '-' + data + '-' + hours + ':' + minutes);*/
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
    padding: 94px 0 100px;

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
      .back-right {
        position: absolute;
        top: 0;
        right: 0;
        width: auto;
        height: 100%;
        padding-right: 10px;
        color: #fff;
        font-size: 15px;
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

      div {
        border-bottom: 2px solid transparent;
      }

      div.active {
        color: rgb(29,138,231);
        border-bottom: 2px solid rgb(29,138,231);
      }
    }

    .task-box {
      margin-bottom: 15px;
      padding: 15px 15px 0;
      background-color: #fff;

      .task-box-top {
        position: relative;
        width: 100%;
        padding-bottom: 10px;

        &:after {
          position: absolute;
          bottom: 0;
          left: 0;
          content: '';
          width: 100%;
          height: 1px;
          transform: scaleY(1);
          background-color: #e5e5e5;
        }

        .box-left {
          width: 34.7%;
          margin: 0 15px 0 8px;
          .task-avatar {
            width: 100%;
            height: 161px;
            margin-bottom: 8px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 6px;
              -o-object-fit: contain;
              object-fit: contain;
            }
          }
          .task-name {
            min-height: 24px;
            font-size: 12px;
            color: #60646e;
            background-color: #e9f5ff;
            border-radius: 4px;
          }
        }

        .box-right {
          width: 65.3%;

          .task-info {
            font-size: 0;

            margin-bottom: 6px;
            .task-id {
              font-size: 14px;
              font-weight: bold;
            }
            .task-status {
              width: 41px;
              height: 16px;
              color: #fff;
              margin-left: 10px;
              padding : 2px 4px;
              font-size: 10px;
              border-radius: 8px;
              &.in-progress {
                background-image: linear-gradient(90deg,#fbc261,#ff8f4d);
              }
              &.finished {
                background-image: linear-gradient(90deg,#c4c6cf,#c4c6cf);
              }
            }
          }
          .shop-price {
            font-size: 12px;
            color: #626670;
            margin-bottom: 6px;
          }
          .price-per {
            color: #ff3e3e;
            .small {
              font-size: 10px;
            }
          }
          .task-amount {
            width: 100%;
            margin: 6px 0;
            padding: 10px 0;
            border-top: 1px solid #e5e5e5;
            border-bottom: 1px solid #e5e5e5;

            .amount-item {
              position: relative;
              font-size: 12px;

              &:after {
                position: absolute;
                top: 4px;
                right: 6px;
                content: '';
                width: 1px;
                height: 36px;
                background-color: #e5e5e5;
                transform: scaleX(1);
              }

              & div:first-child {
                margin-bottom: 8px;
                color: #999;
              }

              & div:last-child {
                color: #60646e;
              }
            }
          }

          .time-box {
            min-width: 120px;
          }

          .task-deadline {
            color: #999;
            font-size: 12px;
            margin-bottom: 6px;
          }
          .tag-start {
            margin-bottom: 4px;
            color: #60646e;
            font-size: 12px;
          }
          .tag-end {
            color: #60646e;
            font-size: 12px;
          }
          .tag-start, .tag-end {
            span {
              width: 16px;
              height: 16px;
              margin-right: 6px;
              padding: 2px;
              font-size: 12px;
              color: #1d8ae7;
              border-radius: 50%;
              background-color: #e9f5ff;
            }
          }
          .time-edit-btn {
            width: 58px;
            height: 58px;
            color: #449ae2;
            font-size: 14px;
            border-radius: 50%;
            border: 1px solid #449ae2;
          }
          .tag-edit-btn {
            width: 44px;
            height: 44px;
            color: #1d8ae7;
            font-size: 12px;
            line-height: 44px;
            border-radius: 50%;
            border: 1px solid #449ae2;
            text-align: center;
          }
          .tag-republish-btn {
            width: 58px;
            height: 58px;
            color: #fff;
            font-size: 14px;
            border-radius: 50%;
            background-color: #449ae2;
          }
        }
      }

      .task-box-bottom {
        min-height: 63px;

        .task-statistics {
          .statistics-name {
            color: #999;
            font-size: 12px;
            margin-bottom: 10px;
          }
          .statistics-data {
            font-size: 12px;
            color: #60646e;
          }
        }
      }


    }

    .isInProgress-time {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 100;
      .time-box {
        position: relative;
        width: 300px;
        height: 260px;
        background-color: #fff;
        border-radius: 2px;
      }
    }

  }


</style>
