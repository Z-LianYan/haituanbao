<template>

  <div class="is-going-page">

    <!--无数据-->
    <div class="flex-col task-box" style="padding-top: 0" v-if="total === 0">
      <div class="flex both-center no-data">暂无相关信息</div>
    </div>

    <!--有数据-->
    <div class="flex-col task-box" v-for="(item, index) of data" :key="index" v-if="total !== 0">

      <!--商品上部分-->
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
            <span class="task-status in-progress">进行中</span>
          </div>

          <div v-if="item.product" class="shop-price">宝贝价格<span> {{item.product.price}} </span></div>
          <div v-if="item.product === undefined" class="shop-price">宝贝价格<span> --/-- </span></div>

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

            <!-- 修改时间 -->
<!--            <div v-if="isInProgress" class="flex flex-col both-center time-edit-btn">
              <div>修改</div>
              <div>时间</div>
            </div>-->

            <!-- 修改时间 -->
            <div :data-no="index" class="flex both-center tag-edit-btn"
                 @click="doModifyTime(index)">时间</div>
            <div class="flex both-center tag-edit-btn" @click="toPageTaskList(item.task_id,item.product.price,item.price)">详情</div>

          </div>

        </div>

      </div>
      <!--商品下部分-->
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

    <!--【进行中】时间修改-->
    <transition name="fade">
      <div class="flex both-center isInProgress-time" v-show="isInProgressTimeShow">
        <div class="time-box">
          <div class="close" @click="doClose">
            <img src="../../assets/images/icon/close@2x.png" alt="" width="22" height="22">
          </div>

          <!--    任务时间-->
          <div class="tips-text">修改任务时间 </div>
          <div class="tips-text-sm">任务结束时间以买手提交订单号的时间为准</div>

          <div class="section">

            <div class="flex cross-center admin-item">
              <div class="flex cross-center item-info">
                <div class="item-name">开始时间</div>
                <div class="flex cross-center flex1 security-code-input">
                  <!-- <div class="flex cross-center item-input"> {{stime}} </div>-->
                  <!-- <input class="item-input hide" type="datetime-local" placeholder="请选择" v-model="stime">-->

                  <input id="datetimepicker1"   size="16" type="text" class="stime form_datetime" readonly>

                </div>
                <div class="flex main-end item-icon">
                  <img src="../../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
                </div>
              </div>
            </div>

            <div class="flex cross-center admin-item">
              <div class="flex cross-center item-info">
                <div class="item-name">截至时间</div>
                <div class="flex cross-center flex1 security-code-input">
                  <!--<div class="flex cross-center item-input"> {{etime}} </div>-->
                  <!--<input class="item-input hide" type="datetime-local" placeholder="请选择" v-model="etime">-->

                  <input id="datetimepicker2" size="16" type="text" class="etime form_datetime" readonly>

                </div>
                <div class="flex main-end item-icon">
                  <img src="../../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
                </div>
              </div>
            </div>

          </div>

          <div class="btn-box">
            <button class="btn active" @click="onBtnClick"> 修改并提交 </button>
          </div>

        </div>
      </div>
    </transition>

  </div>


</template>

<script type="text/ecmascript-6">

  import axios from 'axios';
  import Qs from 'qs';

   export default {
       name: "",
       data() {
           return {
             backTitle : '任务管理',
             nav2 : true,
             data : [],
             page : 1,
             psize : 5,
             total : 0,
             status : 2,
             product_photo : [],
             isInProgressTimeShow : false,

             editTaskObj : [],

             task_id : '',
             title : '', // 任务标题
             traffic_type : '', // 流量入口
             target : '',
             traffic_type_show : '',
             keyword : '', // 搜索关键词
             taokouling : '', // 淘口令
             tag_ids : '',
             tags : [], // 买号要求单选框
             tags2 : '', // 买号要求单选框（发送到服务端的数据）
             content : '', // 下单备注要求
             maihao_requires : [], // 买号要求、按需选择
             maihao_requires2 : '', // 买号要求、按需选择（发送到服务端的数据）
             stime : '', // 开始时间
             etime : '', // 结束时间
             stime2 : '', // 开始时间（发送到服务端的数据）
             etime2 : '', // 结束时间（发送到服务端的数据）

           }
       },
       props: [],
       watch: {},
       computed: {
       },
       methods: {
         doClose : function () {
           this.isInProgressTimeShow = false;
           //EventHub.$emit('doOpenModifyTimeClose', 'doOpenModifyTimeClose');

           $('#datetimepicker1').val('');
           $('#datetimepicker2').val('');

           this.stime2 = '';
           this.etime2 = '';

         },
         doModifyTime : function (index) {
           //EventHub.$emit('doOpenModifyTime','doOpenModifyTime');
           this.isInProgressTimeShow = true;
           sessionStorage.setItem("editTaskObj",JSON.stringify(this.data[index])); // 将需要编辑的任务数据，保存到sessionStorage
           this.editTaskObj = JSON.parse(sessionStorage.getItem("editTaskObj"));
           this.task_id = this.editTaskObj.task_id;
           console.log(index);
           this.getTaskDetail(this.task_id);
         },
         toPageTaskDetail : function (task_id) {
           this.$router.push({
             name : 'taskDetail',
             query : {
               task_id : task_id
             }
           })
         },
         toPageTaskList : function (task_id,productPrice,price) {
           this.$router.push({
             name : 'taskList',
             query : {
               task_id : task_id,
               productPrice : productPrice,
               price : price
             }
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
         // 获取
         getTask : function (status=this.status,page=this.page,psize=this.psize) {
           axios({
             method: 'get',
             url: Task_List,
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
             },
             params : {
               ssid: sessionStorage.getItem("ssid"),
               status: status,
               page : page,
               psize : psize
             },
           }).then( (response) => {

             let result = response.data;
             //console.log(result);
             this.data = result.data;
             this.total = result.total;

             //alert(parseFloat(this.data[0].price)); //返回的金额是字符串，需要注意

             this.data.forEach( ( currentVal, index, arr )=>{
               this.data[index].stime = this.getLocalTime(currentVal.stime);
               this.data[index].etime = this.getLocalTime(currentVal.etime);
             });

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
         doLoadMore : function () {
           this.psize += 5;
           this.getTask(this.status,this.page,this.psize);
         },
         dateFormat : function (x) {
           let tempDate = new Date(x);
           let year = tempDate.getFullYear().toString();
           let month = (tempDate.getMonth()+1).toString();
           let date = tempDate.getDate().toString();
           let hour = tempDate.getHours().toString();
           let minutes = tempDate.getMinutes().toString();
           let seconds = tempDate.getSeconds().toString();

           month.length === 1 ? month = '0' + month : month;
           date.length === 1 ? date = '0' + date : date;
           hour.length === 1 ? hour = '0' + hour : hour;
           minutes.length === 1 ? minutes = '0' + minutes : minutes;
           seconds.length === 1 ? seconds = '0' + seconds : seconds;

           let datetime1 = year + '-' + month + '-' + date + ' ' + hour + ":" + minutes + ":" + seconds;  // 形如 2017-12-21 10:30:00

           return datetime1;
         },
         // 获取任务详情
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
             //console.log(result);

             if ( result.code > 0 ) {

               this.result = result.data;

               this.productObj = this.result.product;
               this.product_photo = this.result.product_photo;
               this.content = this.result.content;
               if( this.result.keyword ){
                 this.keyword = this.result.keyword;
               }
               if( this.result.taokouling ){
                 this.taokouling = this.result.taokouling;
               }
               this.title = this.result.title;
               this.target = this.result.target;
               this.stime = this.dateFormat(this.result.stime*1000);
               this.stime2 = this.dateFormat(this.result.stime*1000);
               $('#datetimepicker1').val(this.stime2).datetimepicker('update');

               this.etime = this.dateFormat(this.result.etime*1000);
               this.etime2 = this.dateFormat(this.result.etime*1000);
               $('#datetimepicker2').val(this.etime2).datetimepicker('update');

               this.target = this.result.target;

               if ( this.target === 1 ){
                 this.traffic_type = 1;
                 this.traffic_type_show = "淘宝APP搜索";
                 this.orderEntrance = false;
                 this.searchKeyword = true;
               }
               else if ( this.target === 2 ){
                 this.traffic_type = 2;
                 this.traffic_type_show = "天猫APP";
                 this.orderEntrance = false;
                 this.searchKeyword = true;
               }
               else if( this.target === 3 ) {
                 this.traffic_type = 3;
                 this.traffic_type_show = "淘口令";
                 this.orderEntrance = true;
                 this.searchKeyword = false;
               }
               else {}

               this.tags2 = this.result.tag_ids;
               this.result.tag_ids.split(',').forEach(( currentVal, index, arr )=>{
                 let sub = parseInt(currentVal-1);
                 //console.log(currentVal-1);
                 this.tags[sub] = true;
               });

               this.maihao_requires2 = this.result.maihao_requires;
               this.maihao_requires2.split(';').forEach(( currentVal, index, arr )=>{
                 //console.log(currentVal.split(':')[1]);
                 if ( currentVal.split(':')[1].indexOf(',') > 0 ){
                   devConsole.log(currentVal.split(':')[1].split(',')[0] + '-' + currentVal.split(':')[1].split(',')[1]);
                   this.maihao_requires[index] = [currentVal.split(':')[1].split(',')[0],currentVal.split(':')[1].split(',')[1]]
                 }
                 else {
                   this.maihao_requires[index] = currentVal.split(':')[1];
                 }
               });

             }
             else if ( result.code === -1 ) {
               EventHub.$emit('toastOpen', result.message);
             }
             else if ( result.code === -100 ) {
               EventHub.$emit('toastOpen', result.message);
               sessionStorage.clear();
               this.$router.push({ name: 'loginRegister'});
             }
             else {
               EventHub.$emit('toastOpen', result.message);
             }

           }).catch( (error) => {
             console.log(error);
           });

         },
         // 提交数据
         onBtnClick : function () {
           if( this.traffic_type === '3' ){ // traffic_type === 3 的时候传淘口令

             axios({
               method: 'post',
               url: Task_Save,
               headers: {
                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
               },
               params : {
                 ssid: sessionStorage.getItem("ssid")
               },
               transformRequest: [data => Qs.stringify(data)],
               data : {
                 step: 3,
                 id : this.task_id,
                 title : this.title, // 任务标题
                 target : this.traffic_type, // 流量入口
                 taokouling : this.taokouling, //	淘口令
                 tag_ids : this.tags2, // 标签ID集合，以逗号（非全角）分隔自，如1,2,3,5,8
                 content : this.content, // 下单备注要求
                 maihao_requires : this.maihao_requires2, //买号要求，由规则项ID与值组成的字符串，格式如：1:450;2:2;3:7,20（其中，分号分隔各项，逗号分隔各项ID和值），参考“任务规则项接口”
                 stime : this.stime2, // 任务开始时间，日期时间格式，如2017-12-21 10:30:00
                 etime : this.etime2, // 任务结束时间，格式与任务开始时间相同
               }
             }).then( (response) => {

               let result = response.data;
               //console.log(result);

               if ( result.code > 0 ) {
                 EventHub.$emit('toastOpen', result.message);
                 this.$router.push({ name : 'taskEditPublish4' });
                 sessionStorage.setItem("product",JSON.stringify(result.data.product));
                 sessionStorage.setItem("product_photo",JSON.stringify(result.data.product_photo));
               }
               else if ( result.code === -1 ) {
                 EventHub.$emit('toastOpen', result.message);
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

           }
           else {  // traffic_type !== 3 的时候传 关键词

             axios({
               method: 'post',
               url: Task_Save,
               headers: {
                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
               },
               params : {
                 ssid: sessionStorage.getItem("ssid")
               },
               transformRequest: [data => Qs.stringify(data)],
               data : {
                 step: 3,
                 id : this.task_id,
                 title : this.title, // 任务标题
                 target : this.traffic_type, // 流量入口
                 keyword : this.keyword, // 搜索关键字
                 tag_ids : this.tags2, // 标签ID集合，以逗号（非全角）分隔自，如1,2,3,5,8
                 content : this.content, // 下单备注要求
                 maihao_requires : this.maihao_requires2, //买号要求，由规则项ID与值组成的字符串，格式如：1:450;2:2;3:7,20（其中，分号分隔各项，逗号分隔各项ID和值），参考“任务规则项接口”
                 stime : this.stime2, // 任务开始时间，日期时间格式，如2017-12-21 10:30:00
                 etime : this.etime2, // 任务结束时间，格式与任务开始时间相同
               }
             }).then( (response) => {

               let result = response.data;
               //console.log(result);

               if ( result.code > 0 ) {
                 EventHub.$emit('toastOpen', "修改成功");
                 EventHub.$emit('doRefreshRouter', "doRefreshRouter");
/*                 sessionStorage.setItem("edit-product",JSON.stringify(result.data.product));
                 sessionStorage.setItem("edit-product_photo",JSON.stringify(result.data.product_photo));*/
               }
               else if ( result.code === -1 ) {
                 EventHub.$emit('toastOpen', result.message);
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


           }


         },
       },
       components: {},
       beforeCreate() {
       },
       created() {
       },
       beforeMount() {
       },
       mounted() {

         this.$nextTick(()=>{

           this.getTask(this.status,this.page,5);

           let _this = this;

/*           this.getRuleItem();
           this.getTaskTags();*/

           let todayTimestamp = Date.parse(new Date());
           let dateControl = this.dateFormat(todayTimestamp);

           $('#datetimepicker1').datetimepicker({
             format: "yyyy-MM-dd hh:ii",
             autoclose: true,
             startDate: dateControl,
             pickerPosition: "top-right",
             forceParse : true,
             todayHighlight : true
           }).on('changeDate', function(ev){
             devConsole.log(ev.date.valueOf());
             _this.stime2 = _this.dateFormat(ev.date.valueOf());
             dateControl = _this.stime2;
           });


           $('#datetimepicker2').datetimepicker({
             format: "yyyy-MM-dd hh:ii",
             autoclose: true,
             startDate: dateControl,
             pickerPosition: "top-right",
             forceParse : true
           }).on('changeDate', function(ev){
             _this.etime2 = _this.dateFormat(ev.date.valueOf());
           });

         });

       },
       beforeUpdate() {
       },
       updated() {
       },
       activated() {

         this.$nextTick(()=>{

           this.getTask(this.status,this.page,5);

           let _this = this;

           /*           this.getRuleItem();
            this.getTaskTags();*/

           let todayTimestamp = Date.parse(new Date());
           let dateControl = this.dateFormat(todayTimestamp);

           $('#datetimepicker1').datetimepicker({
             format: "yyyy-MM-dd hh:ii",
             autoclose: true,
             startDate: dateControl,
             pickerPosition: "top-right",
             forceParse : true,
             todayHighlight : true
           }).on('changeDate', function(ev){
             devConsole.log(ev.date.valueOf());
             _this.stime2 = _this.dateFormat(ev.date.valueOf());
             dateControl = _this.stime2;
           });


           $('#datetimepicker2').datetimepicker({
             format: "yyyy-MM-dd hh:ii",
             autoclose: true,
             startDate: dateControl,
             pickerPosition: "top-right",
             forceParse : true
           }).on('changeDate', function(ev){
             _this.etime2 = _this.dateFormat(ev.date.valueOf());
           });

         });

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

  .is-going-page {
    padding: 0 0 100px;

    .tips-text {
      padding: 0;
    }

    .tips-text-sm {
      font-size: 12px;
      color: #bbb;
    }

    .section {
      margin-top: 10px;
/*      & .admin-item:last-child .item-info:after  {
        background-color: transparent;
      }*/

      .admin-item {
        height: 50px;
        background-color: #fff;
        overflow-x: hidden;

        .item-info {
          position: relative;
          width: 100%;
          height: 100%;

          &:after {
            position: absolute;
            bottom: 0;
            left: 0;
            content: '';
            width: 100%;
            height: 1px;
            background-color: rgb(229,229,229);
            transform: scaleY(.5);
          }


          .item-name {
            min-width: 80px;
            font-size:16px;
            color:rgba(42,42,42,1);
            line-height:22px;
            margin-right: 29px;
          }

          .item-unit {
            font-size:16px;
            color: #999;
            line-height:22px;
          }

          .security-code-input, .identifying-code-input {
            position: relative;
            height: 100%;
            input {
              width: 100%;
              height: 100%;
              border: none;
              font-size: 16px;
              color: #999;

              &:focus {
                outline: none;
              }
            }
            .hide {
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              width: 100%;
              height: 100%;
              z-index : 100;
              opacity: 1;
            }
          }

          .item-icon {
            position: relative;
            top: 0;
            right: 0;
            width: 22px;
            height: 22px;
            img {
              width: 100%;
              height: 100%;
            }
          }

          .selector {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 124px;
            right: 0;
            opacity: 1;
            border: none;
            font-size: 16px;
            color: #999;
            background-color: transparent;
            &:focus {
              outline: none;
            }
          }

          .identifying-code-line {
            width: 1px;
            height: 20px;
            background-color: #DDDCE1;
            margin-right: 22px;
          }

          .identifying-code {
            font-size:14px;
            color:rgba(29,138,231,1);
            line-height:20px;
          }


          .item-input {
            height: 100%;
            font-size:16px;
            color: #999;
            line-height:22px;
            border: none;
            background-color: transparent;


            &:focus {
              outline : none;
            }

            /* placeholder */
            &::-webkit-input-placeholder { /* WebKit browsers */
              color:rgba(204,204,204,1);
              font-size: 16px;
              line-height: 100%;
            }
            &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
              color:rgba(204,204,204,1);
              font-size: 16px;
              line-height: 100%;
            }
            &::-moz-placeholder { /* Mozilla Firefox 19+ */
              color:rgba(204,204,204,1);
              font-size: 16px;
              line-height: 100%;
            }
            &:-ms-input-placeholder { /* Internet Explorer 10+ */
              color:rgba(204,204,204,1);
              font-size: 16px;
              line-height: 100%;
            }

          }

          .security-code {
            width: 100px;
          }

        }

      }

    }

    .btn-box {
      margin-top: 20px;

      .btn {
        width: 100%;
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
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 100;
      .time-box {
        position: fixed;
        top: 30%;
        left: 0;
        right: 0;
        width: 90%;
        height: 260px;
        padding: 30px 16px;
        background-color: #fff;
        border-radius: 2px;
        margin: 0 auto;

        .close {
          position: absolute;
          top: 4px;
          right: 4px;
        }
      }
    }

  }


</style>
