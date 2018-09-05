<template>
    <form action="http://www.maishoutest.cn/my-task/upload-pic" method="post">
      <div class="pasg-taskPublish">
        <div class="box_backg"></div>
      <div class="flex both-center back-left" @click="onBackClick">
        <div class="positinon_left">
          <img src="../../assets/images/icon/arrow-white@2x.png" alt="" width="26" height="24">
          <span>{{backTips}}</span>
        </div>

        <div class="center">管理员仓库</div>
      </div>
      <div class="admin-tips">正确填产品相关信息</div>



      <div class="section">
        <div class="flex cross-center admin-item">
          <div class="flex cross-center item-info">
            <div class="item-name">店铺名</div>
            <div id="chart-shopname" class="chart-shopname">
              <select v-model="selected" @change="changeShop" class="down">
                <option value="">{{name}}</option>
                <!-- <option   v-for="(store,index) in secondSummary.t0RealtimeStoreList" :value="store.shopName">{{store.shopName}}</option> -->
              </select>
            </div>
          </div>
        </div>
        <div class="flex cross-center admin-item">
          <div class="flex cross-center item-info no-border">
            <div class="item-name">商品链接</div>
            <input class="flex1 item-input" type="text" placeholder="请输入真实商品链接" v-model="realname" v-on:change="change()">
          </div>
        </div>
        <div class="item-name_send">
          <div class="item-name_left">商品标题:<span class="font">{{title}}</span></div>
          <div class="item-name_left">发货地:<span class="font">{{city}}</span></div>
        </div>
        <!-- 测试 -->
      </div>
        <input type="file" name="file" class="upload_input"  accept="image/png,image/gif" @change="changeShop(this)">
        <div class="section">
          <button>浏览图片</button>
          <img :src="img" :style="img==''?'opacity:0;':'opacity:1'"/>
        </div>


      <div class="app_color" v-for="(emit,index) in lists" :key="index">
        <div class="flex cross-center admin-item">
          <div class="flex cross-center item-info no-border">
            <div class="item-name">商品关键字</div>
            <input class="flex1 item-input" type="text" v-model="emit.name" @keyup='focus(emit.name)'>
          </div>
        </div>

        <div class="flex cross-center admin-item">
          <div class="flex cross-center item-info no-border">
            <div class="item-name">商品价格</div>
            <input class="flex1 item-input" type="text" value="0" v-model="emit.price" @keyup='focus1(emit.price)'>
          </div>
        </div>
        </div>
      </div>
      <div class="bind">
        <input type="button" class="add" value="添加" @click="add()"/>
        <input type="button" class="del" value="移除" @click="del()"/>
      </div>
      <div class="btn">
        <input type="submit" value="确认提交" :disabled="unicode==false || password == false || url == false" :class="unicode==false || password == false || url == false?disabled:''"/>
      </div>
    </form>




</template>

<script>

import back from "../common/back.vue";
import Qs from 'qs';
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      oldNum:0,
      remnant:0,
      backTips : '返回',
      realname:'',
      selected: true,
      backTitle: "编辑产品",
      lists: [
        {
          name: "",
          price: 0
        }
      ],
      img:"",
      name:"",
      title:"",
      city:"",
      unicode:false,
      password:true,
      url : false,
      disabled:"disabled"
    };
  },

    computed:{
        inpNum:{
            get:function(){
                return this.oldNum;

            },
            set:function(newValue){
                this.oldNum=newValue.replace(/[^|\d]/g,'');
            }
        }
    },
    created(){
      axios.get("http://www.maishoutest.cn/my-task/get-store").then(res=>{
        this.name = res.data.data.store_name
      })
    },

  methods: {
     onBackClick : function () {
            history.back();
          },
    add: function() {
       if(this.lists.length >= 5)return false;
      this.lists.push(
        {
          name:"",
          price:0
        }
      );

      // 这里对数据进行操作
    },
    del: function(index) {
      if(this.lists.length <= 1)return false;
      this.lists.pop();
    },
    changeShop: function(e) {
      var filePath = this.$el[2].files[0];
      var reader = new FileReader();
      reader.readAsDataURL(filePath);
      reader.onload =(e)=> {
        var src = reader.result;
        this.img = src;
      }
    },
    change:function(){
       axios.get("http://www.maishoutest.cn/my-task/get-title-url").then(res=>{
         var url = res.data.data.linkurl;
         var val = this.realname;
         if(url == val){  //判断输入得链接与商家链接是否一样
           this.title = res.data.data.name;
           this.city = res.data.data.send_city
           this.url = true;
         }
       })
    },
    focus:function(name){
      var reg = /[|\u007e|\u0060|\u002d|\u003d|\u002f|\u002a|\u002e|\u002f|\u002c|\u0026|\u0023|\u0033|\u0039|\u003b|\u003b|\u005d|\u005b|\u005c|\u0021|\u0040|\u0023|\u0024|\u0025|\u005e|\u0026|\u002a|\u0028|\u0029|\u005f|\u002b|\u002e|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g;
        if(!reg.test(name)){
          this.unicode = true;
        }else{
          this.unicode = false;
        }
      },
    focus1:function(pass){
      var reg = /[\d][\.]{0,}$/g;
        if(!reg.test(pass)){
          this.password = false;
        }else{
          this.password = true; 
        }
      },
      mit:function(){
        return false;
      }
      },
  comments: {
    back: back
  }
};
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less" scoped>
  .back-left{
    background-color:#26F;
    height:30px;
    color:#FFF;
    position:relative;
    text-align:center;
  }
  .positinon_left{
    position:absolute;
    left:0;
    top:.1rem;
  }
  .positinon_left img{
    vertical-align: middle;
  }
  .positinon_left span{
    position:relative;
    top:0.2rem;
  }
  .admin-tips{
    font-size:12px;
    color:#666;
    padding:.5rem;
  }
  .section{
    width:100%;
    background-color:#FFF;
    position:relative;
    z-index:2;
  }
  .section .item-info,.section .chart-shopname, .section select{
    width:100%;
  }
  .section select{
    border:none;
    height:38px;
  }
  .item-name{
    width:4rem;
    color:#666;
    font-size:12px;
  }
  .admin-item{
    margin-left:10px;
    border-bottom:solid 1px #EEE;
    margin-bottom:.3rem;
  }
  .item-input{
    height:35px;
    border:none;
    font-size:12px;
  }
  .item-name_send{
    width:100%;
    height:35px;
    line-height:35px;
    overflow: hidden;
  }
  .item-name_left{
    width:10rem;
    float:left;
    font-size:14px;
    color:#666;
    padding-left:.55rem;
  }
  ul{
    list-style:none;
    margin:0;
    padding:0;
  }
  .upload_input{
    border:none;
    border-radius:3px;
    opacity:0;
    position:absolute;
    height:100px;
    width:100%;
    z-index:1111;
  }
  .section img{
    height:120px;
    width:80px;
    vertical-align: middle;
    max-width:80px;
    max-height:100px;
    padding:10px 0;
    position:relative;
    left:1.5rem;
  }
  .section button{
    background-color:#26F;
    color:#FFF;
    border-radius:3px;
    border:none;
    width:100px;
    height:30px;
    margin-left:.5rem;
  }
  .box_backg{
    background-color:#FFF;
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
    z-index:0;
  }
  .app_color{
    background-color:#FFF;
    width:100%;
    height:auto;
    min-height:100px;
    position:relative;
  }
  label{
    width:100px;
    text-align:right;
  }
  .btn{
    width:100%;
    height:30px;
    position:relative;
    z-index:100;
    text-align: center;
  }
  .btn input{
    background-color:#26F;
    color:#FFF;
    width:130px;
    height:40px;
    border:none;
    border-radius:3px;
  }
  .down,.add,.del{
    position:relative;
    z-index:1111111;
  }
  .font{
    font-size:10px;
    color:#666;
    margin-left:.2rem;
  }
  .add,.del{
    width:100px;
    height:30px;
    margin:0 auto;
    margin-bottom:30px;
    background-color:#26F;
    color:#FFF;
    border:none;
    border-radius:3px;
  }
  .bind{
    width:100%;
    text-align: center;
  }
  .btn .disabled{
    background-color:#EEE;
    color:#AAA;
    width:130px;
    height:40px;
    border:none;
    border-radius:3px;
  }
</style>
