<template>

  <div class="page-adminInfo">

    <back :backTitle="backTitle" />

    <div class="admin-tips">正确填写店铺管理员/运营操作人员基本信息</div>

<!--    <div class="section">
      <div class="flex cross-center admin-item ">
        <div class="flex cross-center item-info no-border">
          <div class="item-name">帐号/手机</div>
          <input class="flex1 item-input" type="tel" maxlength="11" placeholder="请输入手机号码" v-model="account">
        </div>
      </div>
    </div>-->

    <div class="section">
      <div class="flex cross-center admin-item">
        <div class="flex cross-center item-info">
          <div class="item-name">姓名</div>
          <input class="flex1 item-input" type="text" placeholder="请输入管理员姓名" v-model="realname">
        </div>
      </div>
      <div class="flex cross-center admin-item">
        <div class="flex cross-center item-info no-border">
          <div class="item-name">性别</div>

          <div class="flex1 security-code-input">
            <input class="item-input" type="text" placeholder="请选择" v-model="gender_show" readonly>
          </div>

          <div class="flex flex1 main-end item-icon">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>

          <select name="" class="sex-selector" v-model="gender">
            <option value="1"> 男 </option>
            <option value="2"> 女 </option>
          </select>

        </div>
      </div>

    </div>

    <div class="section">
<!--      <div class="flex cross-center admin-item">
        <div class="flex cross-center item-info">
          <div class="item-name">职务名称</div>
          <input class="flex1 item-input" type="text" placeholder="请输入管理员职务" v-model="position">
        </div>
      </div>-->
      <div class="flex cross-center admin-item">
        <div class="flex cross-center item-info">
          <div class="item-name">电子邮箱</div>
          <input class="flex1 item-input" type="text" placeholder="请输入联系邮箱" v-model="email">
        </div>
      </div>
      <div class="flex cross-center admin-item">
        <div class="flex cross-center item-info">
          <div class="item-name">QQ号</div>
          <input class="flex1 item-input" type="text" placeholder="请输入QQ号码" v-model="qq">
        </div>
      </div>
      <div class="flex cross-center admin-item">
        <div class="flex cross-center item-info no-border">
          <div class="item-name">微信号</div>
          <input class="flex1 item-input" type="text" placeholder="请输入微信号码" v-model="weixin">
        </div>
      </div>
    </div>

    <div class="btn-box admin">
      <button class="btn" :class="{ active : (realname && gender && email ) }"
              :disabled="!(realname && gender && email )" @click="onBtnClick"> 保存 </button>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">
  import back from './common/back.vue'

  import axios from 'axios';
  import Qs from 'qs';

   export default {
       name: "",
       data() {
           return {
             backTitle : '管理员信息',
             realname : '',
             gender : 1,
             gender_show : '',
             email : '',
             qq : '',
             weixin : ''
           }
       },
       props: [],
       watch: {
         gender : function () {
           let gender = parseInt(this.gender);
           if( gender === 1 ){
             this.gender = 1;
             this.gender_show = "男";
           }
           else if ( gender === 2 ) {
             this.gender = 2;
             this.gender_show = "女";
           }
           else {
             this.gender = 1;
             this.gender_show = "男";
           }
         }
       },
       computed: {},
       methods: {
         onBtnClick : function () {
             this.setAdminInfo();
         },
         // 完善我的信息（管理员）
         setAdminInfo : function () {
           axios({
             method: 'post',
             url: MemberSaveInfo,
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
             },
             transformRequest: [data => Qs.stringify(data)],
             params : {
               ssid: sessionStorage.getItem("ssid")
             },
             data : {
               realname : this.realname,
               gender : this.gender,
               email : this.email,
               qq : this.qq,
               weixin : this.weixin
             }
           }).then( ( response ) => {

             let result = response.data;
             //console.log(result);

             if ( result.code > 0 ) {
               EventHub.$emit('toastOpen', result.message);
               setTimeout(()=>{
                 window.history.back();
                 EventHub.$emit('doRefreshRouter','doRefreshRouter');
               },2000);
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
         // 获取我的信息（管理员）
         getMemberMyInfo : function () {
           axios({
             method: 'get',
             url: MemberMyInfo,
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
             },
             transformRequest: [data => Qs.stringify(data)],
             params : {
               ssid: sessionStorage.getItem("ssid")
             }
           }).then( ( response ) => {

             let result = response.data;
             //console.log(result);
             if ( result.code > 0 ) {
               this.realname = result.data.realname;
               this.gender  = result.data.gender;
               this.gender_show = result.data.gender_text;
               this.email = result.data.email;
               this.qq = result.data.qq;
               this.weixin = result.data.weixin;
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
           this.getMemberMyInfo();
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
       }
   }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less" scoped>

  .page-adminInfo {
    padding-top: 44px;
    overflow-x: hidden;

    .admin-tips {
      padding : 17px 15px 10px;
      font-size:14px;
      color:rgba(153,153,153,1);
      line-height:20px;
    }

    .section {
      margin-bottom: 12px;

      .admin-item {
        height: 50px;
        background-color: #fff;

        .item-info {
          width: 100%;
          height: 100%;
          position: relative;
          margin-left : 15px;

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

          .item-name {
            min-width: 72px;
            font-size:16px;
            color:rgba(42,42,42,1);
            line-height:22px;
            margin-right: 29px;
          }

          .security-code-input, .identifying-code-input {
            input {
              width: 100%;
              height: 100%;
            }
          }

          .item-icon {
            padding-right: 8px;
          }

          .sex-selector {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 100px;
            right: 0;
            opacity: 0;
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

            &:focus {
              outline : none;
            }

            /* placeholder */
            &::-webkit-input-placeholder { /* WebKit browsers */
              color:rgba(204,204,204,1);
              font-size: 16px;
            }
            &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
              color:rgba(204,204,204,1);
              font-size: 16px;
            }
            &::-moz-placeholder { /* Mozilla Firefox 19+ */
              color:rgba(204,204,204,1);
              font-size: 16px;
            }
            &:-ms-input-placeholder { /* Internet Explorer 10+ */
              color:rgba(204,204,204,1);
              font-size: 16px;
            }

          }

          .security-code {
            width: 100px;
          }

        }

      }

    }

    .btn-box.admin {
      margin-top: 30px;
    }




  }

</style>
