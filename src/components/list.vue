<template>

  <div class="flex-col page-list">

    <div class="main-center" >页面清单</div>

    <div class="list-item">
      <router-link to="/">1-首页.png /  ✔  </router-link>


      <router-link to="/task">2- 任务管理-进行中.png /task ✔   </router-link>
      <router-link to="/task">3- 任务管理-已结束.png /task ✔ </router-link>
      <router-link to="/taskList">4- 任务参与列表.png /taskList ✔  </router-link>
      <router-link to="/taskList">5- 任务参与列表-已返款.png /taskList ✔ </router-link>
      <router-link to="/taskList">6- 任务参与列表-待评价.png /taskList ✔ </router-link>
      <router-link to="/">7- 搜索.png ****************略 ✔ </router-link>
      <router-link to="/taskDetail">8- 任务参与详情.png /taskDetail ✔ </router-link>


      <router-link to="/taskPublish1">9- 发布任务 1-1 类型／商品 /taskPublish1 </router-link>
      <router-link to="/taskPublish2">10- 发布任务 1-2 要求-未编辑.png /taskPublish2 </router-link>
      <router-link to="/taskPublish2">11- 发布任务 1-2 要求-已编辑-1.png /taskPublish2 </router-link>
      <router-link to="/taskPublish2">12- 发布任务 1-2 要求-已编辑-2.png /taskPublish2 </router-link>
      <router-link to="/taskPublish3">13- 发布任务 1-2 佣金-未编辑.png /taskPublish3 </router-link>
      <router-link to="/taskPublish3">14- 发布任务 1-2 佣金-已编辑.png /taskPublish3 </router-link>


      <router-link to="/trusteeshipPayment">15- 托管支付.png /trusteeshipPayment </router-link>

      <router-link to="/store">16- 店铺.png /store ✔ </router-link>
      <router-link to="/storeBinding">17- 店铺绑定-未编辑.png /storeBinding  ✔</router-link>
      <router-link to="/storeBinding">18- 店铺绑定-已编辑.png ✔ </router-link>
      <router-link to="/storeBinding">19- 店铺绑定-审核中.png /storeBinding ✔ </router-link>


      <router-link to="/remainingSum">20- 账户余额.png /remainingSum ✔ </router-link>
      <router-link to="/payment">21- 充值-未编辑.png /payment ✔ </router-link>
      <router-link to="/payment">22- 充值-已编辑 /payment ✔ </router-link>
      <router-link to="/withdraw">23- 提现-未编辑.png /withdraw ✔ </router-link>
      <router-link to="/withdraw">24- 提现-已编辑 /withdraw ✔ </router-link>
      <router-link to="/bankCard">25- 银行卡信息-未编辑 /bankCard ✔ </router-link>
      <router-link to="/bankCard">26- 银行卡信息-已编辑 /bankCard ✔ </router-link>
      <router-link to="/fundDetail">27- 资金明细 /fundDetail ✔ </router-link>


      <router-link to="/adminInfo">28- 管理员信息-未编辑 /adminInfo ✔ </router-link>
      <router-link to="/adminInfo">29- 管理员信息-已编辑 /adminInfo ✔ </router-link>


      <router-link to="/login">30- 注册登录页.png /login ✔ </router-link>
      <router-link to="/loginRegister">31- 登录-未编辑.png /loginRegister ✔ </router-link>
      <router-link to="/loginRegister">32- 登录-已编辑.png /loginRegister ✔ </router-link>
      <router-link to="/loginRegister">33- 用户注册-未编辑.png /loginRegister ✔ </router-link>
      <router-link to="/loginRegister">34- 用户注册-已编辑.png /loginRegister ✔ </router-link>


      <router-link to="/resetPassword">35- 找回密码.png /resetPassword ✔ </router-link>
      <router-link to="/resetPassword">36- 重置密码.png /resetPassword ✔ </router-link>

      <router-link to="/answerSheet">37- 新手答卷.png /answerSheet ✔ </router-link>
      <router-link to="/faq">38- 常见问题-其他问题.png /faq ✔ </router-link>
      <router-link to="/faq">38- 常见问题-任务得分.png /faq ✔ </router-link>
      <router-link to="/faq">38- 常见问题-审核申诉.png /faq ✔ </router-link>
      <router-link to="/faq">38- 常见问题-提现到账.png /faq ✔ </router-link>
      <router-link to="/rules">39- 违规说明.png /rules ✔ </router-link>
      <router-link to="/announcementDetail">40- 违规说明详情.png  /announcementDetail ✔ </router-link>
      <router-link to="/announcement"> 41- 系统公告.png  /announcement ✔ </router-link>
      <router-link to="/announcementDetail">42- 系统公告详情.png  /announcementDetail ✔ </router-link>


      <router-link to="/contact">43- 联系客服.png  /contact ✔ </router-link>
      <router-link to="/about">44- 关于我们.png /about ✔ </router-link>
      <router-link to="/license">45- 服务协议.png /license ✔ </router-link>


      <router-link to="/">45- 启动页.png index.html ✔  </router-link>


    </div>

  </div>


</template>

<script type="text/ecmascript-6">
    export default {};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less" >
  .page-list {
    padding: 10px;

  .list-item {
    font-size: 14px;
    font-weight: bold;
    line-height: 24px;
    color: #333;
    padding-left: 10px;
    margin-top: 20px;

    a {
      display: block;
      font-weight: normal;
      padding-left: 10px;
      color: #666;
      text-decoration: none;
    }
  }

  }
</style>
