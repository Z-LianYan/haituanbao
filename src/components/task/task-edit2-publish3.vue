<template>

  <div class="pasg-taskPublish">

    <back :backTitle="backTitle" />

    <div class="flex detail-info-bottom">
      <div class="shop-img">
        <img :src="product_photo.url" alt="">
      </div>
      <div class="flex-col main-between flex1 shop-detail">
        <div class="shop-desc">{{ productObj.name }}</div>
        <div class="flex">
          <div class="flex-col item-box">
            <div class="item-name">宝贝价格</div>
            <div class="item-data obvious"> <span>￥</span>{{ productObj.price }}</div>
          </div>
          <div class="flex-col flex1 item-box">
            <div class="item-name">发货地</div>
            <div class="item-data">{{ productObj.send_city }}</div>
          </div>
        </div>
      </div>
    </div>

    <!--任务要求-->
    <div class="tips-text">任务要求</div>
    <div class="section">
      <div class="flex cross-center admin-item">
        <div class="flex cross-center item-info">
          <div class="item-name">任务标题</div>
          <input class="flex1 item-input" type="text" placeholder="请输入" v-model="title">
        </div>
      </div>
      <div class="flex cross-center admin-item">
        <div class="flex cross-center item-info">
          <div class="item-name">流量入口</div>
          <div class="flex cross-center flex1 security-code-input">
            <input v-if="!traffic_type" class="item-input" type="text" placeholder="请选择" v-model="traffic_type_show" readonly>
          </div>
          <div class="flex main-end item-icon">
            <img src="../../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
          <select name="" class="selector" v-model="traffic_type">
            <option value="1"> 淘宝APP搜索 </option>
            <option value="2"> 天猫APP </option>
            <option value="3"> 淘口令 </option>
          </select>
        </div>
      </div>
      <div v-if="searchKeyword" class="flex cross-center admin-item">
        <div class="flex cross-center item-info">
          <div class="item-name">搜索关键字</div>
          <input class="flex1 item-input" type="text" placeholder="请输入" v-model="keyword">
        </div>
      </div>
      <div v-if="orderEntrance" class="flex cross-center admin-item">
        <div class="flex cross-center item-info">
          <div class="item-name">淘口令</div>
          <input class="flex1 item-input" type="text" placeholder="请输入" v-model="taokouling">
        </div>
      </div>
    </div>

    <!--任务要求 (按需求选择)-->
    <div class="tips-text">任务要求 <span class="tips-text-sm"> (按需求选择)</span> </div>
    <div class="answerSheet-list">

      <div v-for="(item, index) in taskTags" :key="index" class="flex main-between answerSheet-item" >

        <div class="flex item-data">
          {{ item.name }}
          <span v-if="item.tips" class="flex both-center item-tips" @click="onTipsClick">
            <img src="../../assets/images/icon/info@2x.png" alt="" width="20" height="20">
          </span>
        </div>

        <div class="flex tags">
          <input type="checkbox" v-model="tags[index]" />
        </div>
        <!--手机下单这一项，固定不可选中-->
        <div class="flex tags" v-if="index === 7">
          <input type="checkbox" v-model="tags[index]" disabled />
        </div>

        <div v-if="tags[index]" :data-no="index">
          <img src="../../assets/images/icon/selected@2x.png" alt="" width="20" height="20">
        </div>

        <div v-if="!tags[index]" :data-no="index">
          <img src="../../assets/images/icon/unselected@2x.png" alt="" width="20" height="20">
        </div>

        <!--        <div v-if="tags[index] === true" class="flex item-data">
                  {{ item.name }}
                  <span v-if="item.tips" class="flex both-center item-tips">
                    <img src="../assets/images/icon/info@2x.png" alt="" width="20" height="20">
                  </span>
                </div>

                <div v-if="tags[index] === true">
                  <img src="../assets/images/icon/selected@2x.png" alt="" width="20" height="20">
                </div>-->

      </div>

    </div>

    <!--下单备注要求-->
    <div class="tips-text">下单备注要求<span class="tips-text-sm" style="color: #f57c7c;">（下面框的内容是让买家在您店铺下单时的留言，用来区别真实单，别写与SHUA有关的字眼）</span></div>
    <div class="textarea-input">
      <textarea name="" id="" cols="30" rows="10" placeholder="订单备注要求（方便发货识别处理）" v-model="content"></textarea>
    </div>

    <!--    买号要求-->
    <div class="tips-text">买号要求</div>
    <div class="section">

      <div v-for="(item, index) in rule_item" :key="index" class="flex cross-center admin-item">
        <div class="flex cross-center item-info">
          <div class="item-name">{{item.name}}</div>
          <div class="flex cross-center flex1 security-code-input">
            <input v-if="!maihao_requires[index] && maihao_requires[index] !== 0 " class="item-input" type="text" placeholder="请选择" readonly>
          </div>
          <div class="flex main-end item-icon">
            <img src="../../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
          <select name="" class="selector" v-model="maihao_requires[index]">
            <option v-for="(itemOp, index) in item.value" :value="itemOp.value"> {{itemOp.name}} </option>
          </select>
        </div>
      </div>

    </div>

    <!--    任务时间-->
    <div class="tips-text">任务时间 <span class="tips-text-sm">（任务结束时间以买手提交订单号的时间为准）</span> </div>
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

    <div class="btn-box task-publish">
      <button class="btn" :class="{ active : (1 && 1) }" @click="onBtnClick">下一步</button>
    </div>





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
        testDatatime : '',
        backTitle : '编辑任务',
        orderEntrance : false,
        searchKeyword : false,

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

        rule_item : [], // 买号要求规则项
        taskTags : [], // 任务要求标签

        productObj : {
            "name" : '商品名称',
            "send_city" : '发货地',
            "price" : '宝贝价格'
        },
        product_photo : {

        },
        productPhoto : {
            "linkurl" : '../src/assets/images/task-shop.png'
        },

        result : {},
        editTaskObj : {}

      }
    },
    props: [],
    watch: {
        // 处理流量入口
        traffic_type : function () {
        if ( this.traffic_type === '1' ){
          this.traffic_type_show = "淘宝APP搜索";
          this.orderEntrance = false;
          this.searchKeyword = true;
        }
        else if ( this.traffic_type === '2' ){
          this.traffic_type_show = "天猫APP";
          this.orderEntrance = false;
          this.searchKeyword = true;
        }
        else if( this.traffic_type === '3' ) {
          this.traffic_type_show = "淘口令";
          this.orderEntrance = true;
          this.searchKeyword = false;
        }
        else {}

      },
        // 处理买号要求
        maihao_requires : function () {
            this.maihao_requires2 = '';
            this.maihao_requires.forEach( (currentValue, index, arr) => {
              this.maihao_requires2 = this.maihao_requires2 + (index+1) +':'+ currentValue + ';';
            });
            this.maihao_requires2 = this.maihao_requires2.substring(0,this.maihao_requires2.length - 1);

        },
        tags : function () {
          let temp = '';
          this.tags.forEach( (currentValue, index, arr) => {
            if( currentValue === true ){
              temp = temp + (index+1) + ',';
            }
          });
          this.tags[7] = true;
          this.tags2 = temp.substring(0,temp.length - 1);

/*            for( let i=0;i<this.tags.length;i++ ){
                if( this.tags[i] === true ){
                    temp = temp + i + ',';
                  console.log(temp);
                }
            }*/
        },
/*        stime : function () {
          let checkStimeLength = this.stime.replace(/T/g,' ').split(':').length;
          if ( this.stime.indexOf('.') > 0 ){ // 处理掉 chrome 或者 苹果QQ浏览器 时间选择的值上面带毫秒 （2018-01-01 18:15:12.679）
            this.stime2 = this.stime.substring(0,this.stime.indexOf('.'));
          }
          if( checkStimeLength === 2 ){ // checkStimeLength === 2 说明时间不含秒，自动加上
            this.stime2 = this.stime.replace(/T/g,' ') + ':00';
          }
          else if ( checkStimeLength === 3 ) { // checkStimeLength === 3 说明时间含秒，不用处理
            this.stime2 = this.stime.replace(/T/g,' ');
          }
          else {}
        },
        etime : function () {
          let checkEtimeLength = this.etime.replace(/T/g,' ').split(':').length;
          if ( this.etime.indexOf('.') > 0 ){ // 处理掉 chrome 或者 苹果QQ浏览器 时间选择的值上面带毫秒 （2018-01-01 18:15:12.679）
            this.etime2 = this.etime.substring(0,this.etime.indexOf('.'));
          }
          if( checkEtimeLength === 2 ){ // checkEtimeLength === 2 说明时间不含秒，自动加上
            this.etime2 = this.etime.replace(/T/g,' ') + ':00';
          }
          else if ( checkEtimeLength === 3 ) { // checkEtimeLength === 3 说明时间含秒，不用处理
            this.etime2 = this.etime.replace(/T/g,' ');
          }
          else {}
        }*/
    },
    computed: {},
    methods: {
      initEditTaskData : function () {
        this.editTaskObj = JSON.parse(sessionStorage.getItem("editTaskObj"));
        this.task_id = this.editTaskObj.task_id;
      },
      //从 sessionStorage 获取商品信息
/*      getProductObj : function () {
        console.log(JSON.parse(sessionStorage.getItem("product")));
        if( JSON.parse(sessionStorage.getItem("product")) ){
          this.productObj = JSON.parse(sessionStorage.getItem("product"));
        }
        console.log(JSON.parse(sessionStorage.getItem("product_photo")));
        if( JSON.parse(sessionStorage.getItem("product_photo")) ){
          this.product_photo = JSON.parse(sessionStorage.getItem("product_photo"));
        }
      },*/
      // 提交数据
      onBtnClick : function () {

          let timestamp = (new Date()).valueOf();


          if( this.stime2 === '' ){
            EventHub.$emit('toastOpen', "请选择开始时间");
          }
          else if( this.etime2 === '' ){
            EventHub.$emit('toastOpen', "请选择结束时间");
          }
          else {
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
                  is_republish : 1
                }
              }).then( (response) => {

                let result = response.data;
                //console.log(result);

                if ( result.code > 0 ) {
                  EventHub.$emit('toastOpen', result.message);
                  this.$router.push({ name : 'taskEditPublish4' });
                  sessionStorage.setItem("edit-product",JSON.stringify(result.data.product));
                  sessionStorage.setItem("edit-product_photo",JSON.stringify(result.data.product_photo));
                  sessionStorage.setItem("is_republish",1);
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
                  is_republish : 1
                }
              }).then( (response) => {

                let result = response.data;
                //console.log(result);

                if ( result.code > 0 ) {
                  EventHub.$emit('toastOpen', result.message);
                  this.$router.push({ name : 'taskEditPublish4' });
                  sessionStorage.setItem("edit-product",JSON.stringify(result.data.product));
                  sessionStorage.setItem("edit-product_photo",JSON.stringify(result.data.product_photo));
                  sessionStorage.setItem("is_republish",1);
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
          }

      },
      // 获取任务规则项
      getRuleItem : function () {
        axios({
          method: 'get',
          url: Task_RuleItem,
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
              this.rule_item = result.data;

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
      // 获取任务标签
      getTaskTags : function () {
        axios({
          method: 'get',
          url: Task_Tags,
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
              this.taskTags = result.data;

              // 动态获取 taskTags 的长度，通过临时值中转，传给 this.tags 初始值 false
              let temp = [];
              temp.length = this.taskTags.length;
              for( let i=0;i<temp.length;i++ ){
                temp[i] = false;
              }
              this.tags = temp;
              this.tags[7] = true; // 固定第七个，手机下单为必选

              this.initEditTaskData(); // 等到数据加载完毕，再初始化数据（从 sessionStroage 读取）

              this.getTaskDetail();

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
      // 获取任务详情
      getTaskDetail : function () {

        axios({
          method: 'get',
          url: Task_Detail,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          params : {
            ssid: sessionStorage.getItem("ssid"),
            id : this.task_id
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
/*            this.stime = this.dateFormat(this.result.stime*1000);
            this.stime2 = this.dateFormat(this.result.stime*1000);*/
            $('#datetimepicker1').val(this.stime2).datetimepicker('update');

/*            this.etime = this.dateFormat(this.result.etime*1000);
            this.etime2 = this.dateFormat(this.result.etime*1000);*/
            $('#datetimepicker2').val(this.etime2).datetimepicker('update');

            this.target = this.result.target;

            if ( this.target === 1 ){
              this.traffic_type = "1";
              this.traffic_type_show = "淘宝APP搜索";
              this.orderEntrance = false;
              this.searchKeyword = true;
            }
            else if ( this.target === 2 ){
              this.traffic_type = "2";
              this.traffic_type_show = "天猫APP";
              this.orderEntrance = false;
              this.searchKeyword = true;
            }
            else if( this.target === 3 ) {
              this.traffic_type = "3";
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
     this.$nextTick(()=>{

       let _this = this;

       this.getRuleItem();
       this.getTaskTags();

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
         //devConsole.log("*********" + ev.date.valueOf());
         _this.etime2 = _this.dateFormat(ev.date.valueOf());
       });

/*
       $('#datetimepicker2').datetimepicker({
         format: "yyyy-MM-dd hh:ii",
         autoclose: true,
         startDate: dateControl,
         pickerPosition: "top-right",
         forceParse : true
       }).on('changeDate', function(ev){
         console.log(ev.date.valueOf());
         _this.etime2 = _this.dateFormat(ev.date.valueOf());
       });
*/

     });

//时间选择器
/*      laydate.render({
        elem: '#test1'
        ,type: 'datetime'
      });*/

    },
    beforeMount() {
    },
    beforeUpdate() {
    },
    updated() {
    },
    activated() {
      this.$nextTick(()=>{

        let _this = this;

        this.getRuleItem();
        this.getTaskTags();

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
          console.log(ev.date.valueOf());
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
          console.log(ev.date.valueOf());
          _this.etime2 = _this.dateFormat(ev.date.valueOf());
        });

        /*
         $('#datetimepicker2').datetimepicker({
         format: "yyyy-MM-dd hh:ii",
         autoclose: true,
         startDate: dateControl,
         pickerPosition: "top-right",
         forceParse : true
         }).on('changeDate', function(ev){
         console.log(ev.date.valueOf());
         _this.etime2 = _this.dateFormat(ev.date.valueOf());
         });
         */

      });
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

  .pasg-taskPublish {
    padding-top: 44px;
    padding-bottom: 100px;

    .tips-text {
      .tips-text-sm {
        font-size: 12px;
        color: #bbb;
      }
    }

    .section {
      & .admin-item:last-child .item-info:after  {
        background-color: transparent;
      }

      .admin-item {
        height: 50px;
        background-color: #fff;
        overflow-x: hidden;

        .item-info {
          position: relative;
          width: 100%;
          height: 100%;
          padding: 0 15px;

          &:after {
            position: absolute;
            bottom: 0;
            left: 15px;
            content: '';
            width: 100%;
            height: 1px;
            background-color: rgb(229,229,229);
            transform: scaleY(1);
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
            left: 10px;
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

    .detail-info-bottom {
      min-height: 200px;
      padding: 20px 15px 22px;
      background-color: #fff;

      .shop-img {
        width: 34.8%;
        margin-right: 15px;

        img {
          width: 100%;
          height: auto;
          max-height: 100%;
          border-radius: 4px;

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
            .item-tips {
              margin-left: 4px;
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

    .answerSheet-list {
      background-color: #fff;
      margin-top: 15px;
      padding-left: 15px;

      & .answerSheet-item:last-child:after {
        background-color: transparent;
      }

      .item-title {
        padding: 15px 0;
        position: relative;
        font-size:14px;
        color:rgba(96,100,110,1);
        line-height:20px;

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

      .answerSheet-item {
        position: relative;
        padding: 12px 15px 12px 0;

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

        .item-data {
          font-size:16px;
          color:rgba(42,42,42,1);
          line-height:22px;
        }

        .tags {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          input {
            width: 100%;
            height: 100%;
            opacity: 0;
          }
        }

      }
    }

    .textarea-input {

      textarea {
        width: 100%;
        height: 100px;
        padding: 13px 15px;
        border: none;
        resize : none;
        font-size:16px;
        color: #999999;
        line-height:22px;

        &:focus {
          outline: none;
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
    }


    .btn-box.task-publish {
      margin-top: 30px;
    }

  }



</style>
