<template>
  <div id="app" :class="{ 'app-overflow-hidden' : appOverflowHidden}">

    <transition name="fade" v-if="isRouterAlive">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>


    <div v-if="toastShow" class="flex both-center toast-box">
      <div class="flex both-center toast"> {{toastMsg}} </div>
    </div>

    <div v-if="processingShow" class="flex both-center processing">
      <div class="flex both-center toast">
         <img class="processing-img" src="./assets/images/icon/loading-2.png" width="30" height="30">
      </div>
    </div>

  </div>
</template>
<script>

  import axios from 'axios';

  export default {
    name: "app",
    data() {
      return {
        navbarShow : true,
        toastMsg : '网络错误',
        toastShow : false,
        processingShow : false,
        innerHeight : innerHeight,
        isRouterAlive : true, //路由刷新标记`
        appOverflowHidden : false
      }
    },
    props: [],
    watch: {},
    computed: {},
    methods: {
        reload () {
          this.isRouterAlive = false;
          this.$nextTick(() => (this.isRouterAlive = true));
        },
        toastOpen : function ( msg="", duration=2000) {
          this.toastShow = true;
          this.toastMsg = msg;
          let t = setTimeout( () => {
            this.toastShow = false;
            clearTimeout(t);
          }, duration);
        },
        processingOpen: function ( duration ) {
          this.processingShow = true;
          setTimeout( () => {
            this.processingShow = false;
          }, duration )
        },
        processingClose: function () {
          this.processingShow = false;
        }
    },
    components: {
    },
    beforeCreate() {
    },
    created() {
    },
    mounted() {

      EventHub.$on('doRefreshRouter',( data )=>{
        this.reload(); // 刷新路由
      });

      EventHub.$on('appOverflowHidden',()=>{
          this.appOverflowHidden = true;
      });

      EventHub.$on('appOverflowHiddenClose',()=>{
        this.appOverflowHidden = false;
      });


      EventHub.$on('hideNavbar',()=>{
          devConsole.log("app 组件收到 taaskList 的 emit");
          this.navbarShow = false;
      });

      EventHub.$on('toastOpen',( data )=>{
          this.toastOpen(data);
      });

      EventHub.$on('uploading',( data )=>{
        this.processingOpen(600000);
      });

      EventHub.$on('uploadingDone',( data )=>{
        this.processingClose();
      });
      EventHub.$on('uploadingFail',( data )=>{
        this.processingClose();
        this.toastOpen(data);
      });


      EventHub.$on('logout',( data )=>{
        sessionStorage.clear();
        setTimeout( ()=>{
          this.$router.push({ name : 'login' });
        },2000)
      });

      //任务页面打开弹窗
      EventHub.$on('doOpenModifyTime',( data )=>{
        this.appOverflowHidden = true;
      });

      EventHub.$on('doOpenModifyTimeClose',( data )=>{
        this.appOverflowHidden = false;
      });

      //任务页面打开弹窗
      EventHub.$on('doCloseModifyTime',( data )=>{
        this.appOverflowHidden = false;
      });




      //获取浏览器高度
      this.innerHeight = window.innerHeight;


      axios.interceptors.request.use( (config) => {     // 请求拦截器， 每当发送请求就显示动画
        //在发送请求之前做某事
        this.processingOpen(60000);
        return config;
      }, (error) => {
        //请求错误时做些事
        return Promise.reject(error);
      });

      axios.interceptors.response.use( (response) => { // 响应拦截器， 当有数据响应就关闭动画
        //对响应数据做些事
        this.processingClose();

        devConsole.log(response.data);

        if ( response.data.code === -100 ){
            this.$router.push({
              name : 'login'
            })
        }

        return response;
      }, (error) => {
        //请求错误时做些事
        return Promise.reject(error);
      });


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

<style lang="less" type="text/less">

  @import "assets/style/free-flex.css";

  *, *:before, *:after {
    box-sizing: border-box;
  }

  * {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  body {
    font-family: "Segoe UI", "Lucida Grande", Helvetica, Arial, "Microsoft YaHei", FreeSans, Arimo, "Droid Sans","wenquanyi micro hei","Hiragino Sans GB", "Hiragino Sans GB W3", Arial, sans-serif;
  }

  #app {
    position: relative;
    width: 100%;
    height: auto;
    min-height: 100%;
    background-color: rgb(239,240,244);

    &.app-overflow-hidden {
      height: 100%;
      overflow: hidden;
    }

    *.no-border:after {
      background-color: transparent;
    }

    .no-data {
      height: 80px;
      font-size: 13px;
      line-height: 18px;
      padding: 6px 15px;
      color: #1d8ae7;
      text-align: center;
      background: #fff;
    }

    .toast-box {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      z-index: 100;

      .toast {
        position: fixed;
        top: calc(40%);
        left: 0;
        right: 0;
        width: 160px;
        min-height: 50px;
        margin: 0 auto;
        padding: 10px 15px;
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.6);
        color: #fff;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        z-index: 100;
      }
    }

    .processing {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100;
      width: 100%;
      height: 100%;

      .toast {
        position: fixed;
        top: calc(40%);
        left: 0;
        right: 0;
        width: 80px;
        height: 80px;
        margin: 0 auto;
        background-color: rgba(255, 255, 255, .2);
        border-radius: 10px;
/*        &:after {
          content: "";
          display: block;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          border-radius: 50%;
          border: 2px solid #1d8ae7;
          opacity: 0;
          -webkit-animation: ripple 1.5s ease-out .1s infinite;
          animation: ripple 1.5s ease-out .1s infinite
        }*/


      }
      .processing-img {
        display: inline-block;
        animation: rotate 1s linear infinite;
        -webkit-animation: rotate 1s linear infinite;
      }
      @keyframes rotate {
        from {
          transform: rotate(0);
        }
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes ripple {
        0% {
          opacity: 0;
          -webkit-transform: scale(.1);
          transform: scale(.1)
        }

        5% {
          opacity: 1
        }

        to {
          opacity: 0;
          -webkit-transform: scale(1);
          transform: scale(1)
        }
      }

    }


  }

  .wrapper {
    width: 100%;
    height: 100%;
    padding: 0 15px;
  }
  .safe-padding {
    padding-bottom: 80px;
  }
  .primary-text {
    color: rgb(29,138,231);
  }
  .success-text {
    color: rgb(25,175,0);
  }
  *.transition {
    transition: all .1s ease;
  }
  button:focus {
    outline : none;
  }


  .primary-tips {
    min-height: 44px;
    font-size: 12px;
    line-height: 18px;
    padding: 6px 10px;
    color: #1d8ae7;
    background-color: #e9f5ff;
    text-align: center;
  }

  .tips-text {
    padding : 17px 15px 10px;
    font-size:14px;
    color:rgba(153,153,153,1);
    line-height:20px;
  }


  .btn-box {
    width: 100%;
    text-align: center;

    .btn {
      width: 92%;
      height:45px;
      background:rgba(29,138,231,0.5);
      border-radius: 5px ;
      font-size:17px;
      color:rgba(255,255,255,1);
      line-height:24px;
      border: none;
      transition: color .2s ease;

      &.active {
        background:rgba(29,138,231,1);
      }

      &.grey {
        background:rgba(202,202,202,1);
      }

      &.finished {
        color: #999;
        background-color: transparent;
      }
    }

  }

  @media screen and ( max-width : 320px ) {

    #app {
      .primary-tips {
        min-height: 44px;
        font-size: 10px;
        line-height: 18px;
        padding: 6px 20px;
        color: #1d8ae7;
        background-color: #e9f5ff;
        text-align: center;
      }
      .task-page {
        .task-box {
          .task-box-top {
            .box-right {
              .tag-edit-btn {
                width: 36px;
                height: 36px;
                color: #1d8ae7;
                font-size: 10px;
                line-height: 36px;
                border-radius: 50%;
                border: 1px solid #449ae2;
                text-align: center;
              }
            }
          }
        }
      }
      .large-image {
        width: auto;
        height: auto;
        max-height: 300px;
        box-shadow: 0 0 3px 1px #888888;
      }
    }


  }

  // fade
  .fade-enter-active {
    transition: opacity .05s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }

  // slideTop
  .slideTop-enter-active {
    transition: all .5s ease;
  }
  .slideTop-enter, .slideTop-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(-32px);
  }

  // slideTop_10px
  .slideTop_10px-enter-active {
    transition: all .4s
  }
  .slideTop_10px-enter, .slideTop_10px-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(-10px);
  }

  // slideRight
  .slideRight-enter-active {
    transition: all .4s
  }
  .slideRight-enter, .slideRight-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0;
    transform: translateX(100%);
  }


  // slideBottom
  .slideBottom-enter-active, .slideBottom-leave-active {
    transition: all .2s
  }
  .slideBottom-enter, .slideBottom-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
    transform: translateY(20px);
  }

  // leftSlide
  .leftSlide-enter-active, .leftSlide-leave-active {
    transition: all .4s ease
  }
  .leftSlide-enter, .leftSlide-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
    transform: translateX(-260px);
  }


  // scale
  .scale-enter-active, .scale-leave-active {
    transition: all .2s
  }
  .scale-enter, .scale-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
    transform: scale(1);
  }



</style>
