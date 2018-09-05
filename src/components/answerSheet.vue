<template>

  <div class="page-answerSheet">

    <back :backTitle="backTitle" />

    <div class="answerSheet-list">

      <div class="item-title">以下哪项目描述是正确的（多选）</div>

      <div v-for="(item, index) in data" :key="index" class="flex main-between answerSheet-item"
           @click="onSelected(index)">

        <div class="item-data" :data-ids="item.id">{{ item.description }}</div>

        <div v-if="!item.flag">
          <img src="../assets/images/icon/unselected@2x.png" alt="" width="20" height="20">
        </div>

        <div v-if="item.flag">
          <img src="../assets/images/icon/selected@2x.png" alt="" width="20" height="20">
        </div>

      </div>

    </div>

    <div class="btn-box answerSheet" >
      <button v-if="!answer_question1.is_completed" class="btn" :class="{ active : 1 }" @click="onBtnClick"> 提交答卷 </button>
      <button v-if="answer_question1.is_completed" class="btn" :class="{ grey : 1 }">  已提交答卷 </button>
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
               backTitle : '新手答卷',
               data : {},
               answerSheet : {},
               answer_question1 : {}
           }
       },
       props: [],
       watch: {},
       computed: {},
       methods: {
         getQA_list : function () {
             axios({
               method: 'get',
               url: QA_Slist,
               headers: {
                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
               },
               params : {
                 ssid: sessionStorage.getItem("ssid")
               }
             }).then( (response) => {

               let result = response.data;
               //console.log(result);
               this.data = result.data;

               this.data.forEach( ( currentVal, index, arr )=>{
                 let ids = 'ids['+ currentVal.id +']';
                 this.answerSheet[ids] = 0;
               });

               if ( result.code > 0 ) {
                 //EventHub.$emit('toastOpen', result.message);
               }
               else if ( result.code === -1){
                 EventHub.$emit('toastOpen', result.message);
               }
               else {
                 EventHub.$emit('toastOpen', result.message);
               }

             }).catch( (error) => {
               console.log(error);
             });

           },
         onSelected : function (index) {
           console.log(index);
           if ( this.data[index].flag === 0 ){
             this.data[index].flag = 1;
           }
           else {
             this.data[index].flag = 0;
           }
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

             if ( result.code > 0 ) {
               this.answer_question1 = result.data.answer_question1;
             }
             else if ( result.code === -1 ) {
               EventHub.$emit('toastOpen', result.message);
             }
             else {
               EventHub.$emit('toastOpen', result.message);
               EventHub.$emit("logout",'logout');
             }
           }).catch( (error) => {
             console.log(error);
           });

         },
         onBtnClick : function () {

           this.data.forEach( ( currentVal, index, arr )=>{ // 拼装答案
             let ids = 'ids['+ currentVal.id +']';
             this.answerSheet[ids] = this.data[index].flag;
           });

           axios({
             method: 'post',
             url: QaSanswer,
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
             },
             params : {
               ssid: sessionStorage.getItem("ssid")
             },
             transformRequest: [data => Qs.stringify(data)],
             data : this.answerSheet
           }).then( (response) => {
             let result = response.data;
             //console.log(result);

             if ( result.code > 0 ) {
               EventHub.$emit('toastOpen', result.message);
               setTimeout(()=>{
                 window.history.back();
                 EventHub.$emit('doRefreshRouter','doRefreshRouter');
               },2000);
             }
             else if ( result.code === -1 ){
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
         this.getQA_list();
         this.getMemberNoviceState();
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

  .page-answerSheet {
    padding-top: 44px;

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

      }
    }

    .btn-box.answerSheet {
      margin-top: 30px;
    }


  }

</style>
