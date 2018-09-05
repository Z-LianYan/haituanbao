// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './api/common.js';
//import './assets/script/jquery-3.2.1.min';
import './assets/script/bootstrap-datetimepicker.js';
//import  "./assets/script/bootstrap-datetimepicker.zh-CN.js"
import "./assets/style/datetimepicker.css";


//import './assets/script/laydate/laydate.js';



//rem
import "./components/modules/rem.js"

//stylesheet
import './stylesheets/main.scss';

//处理axios，让组件通过this.$http来使用
import axios from 'axios';
Vue.prototype.$http = axios;


Vue.config.productionTip = false;


global.EventHub = new Vue();

router.beforeEach((to, from, next) => {

  //window.scrollTo(0,0);

  devConsole.log("当前页面：" + to.name);
  devConsole.log("父级页面：" + from.name);
  sessionStorage.setItem( 'currentPage', to.name );
  sessionStorage.setItem( 'fatherPage', from.name );

  function routerMsg() {
    devConsole.log( router ); // 打印本路由的所有信息
    devConsole.log( router.options ); // 打印路由的配置信息（options）
    devConsole.log( router.options.meta ); // 打印路由的元信息（meta）
    devConsole.log( router.options.meta.requiresAuth ); // 打印路由的元信息——自定义的requiresAuth字段（requiresAuth）
  }
/*

  function loginCheck() {
    if ( router.options.meta.requiresAuth ) { // 需要登录（requiresAuth 为 true）
      if ( to.fullPath === '/forgetLoginPassword') { // 用户忘记密码、跳转忘记密码页面
        console.log("用户忘记密码：to forgetLoginPassword Page");
        next();
      }
      else if ( to.fullPath === '/store') { // 测试专用
        next();
      }
      else { // 当跳转到非login页面，并且appUsrId没有值，1、跳转到login页面 2、跳转到忘记密码
        if ( to.fullPath !== '/login' && sessionStorage.getItem( 'appUserId') === null ) {
          console.log("需要登录：用户没登陆、跳到登录页面");
          next({
            path: '/login'
          });
        }
        else {
          console.log("需要登录：已经登录、正常next()");
          next(); // 如果通过校验，直接调用next()正常跳转到下个路由
        }
      }
    }
    else { // 不需要登录（requiresAuth 为 false）
      console.log("不需要登录");
      next();
    }
  }

*/

  if ( router.options.meta.requiresAuth ) { // 需要登录（requiresAuth 为 true） 不需要登录（requiresAuth 为 false）
    if ( to.fullPath !== '/login' && sessionStorage.getItem( 'ssid') === null ) {
      if ( to.fullPath === '/resetPassword' || to.fullPath === '/loginRegister' || to.fullPath === '/loading' ) {
        devConsole.log("用户忘记密码：to forgetLoginPassword Page");
        next();
      }
      else {
        devConsole.log("需要登录：用户没登陆、跳到登录页面");
        next({
          path: '/loading' // loading 3s 后会跳到login
        });
      }
    }
    else {
      devConsole.log("需要登录：已经登录、正常next()");
      next(); // 如果通过校验，直接调用next()正常跳转到下个路由
    }

  }
  else { // 不需要登录（requiresAuth 为 false）
    devConsole.log("不需要登录");
    next();
  }


});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
