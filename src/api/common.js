/**
 * Created by KidSirZ4i on 2017/7/6.
 */

'use strict';

import Vue from 'vue'
global.EventHub = new Vue();
import axios from 'axios';

// 接口地址 （外网）
global.BaseURL = 'http://www.maishoutest.cn';
// global.BaseURL = 'http://apitest.24681357.com';
//global.BaseURL = 'http://www.dur785.cn';

axios.defaults.baseURL = BaseURL;
axios.defaults.withCredentials = true;

//会员相关
global.Login = "/member/login?ajax=json"; //会员登录 POST
global.Logout = "/member/logout?ajax=json"; //会员退出 GET
global.Register = "/member/register?ajax=json"; //会员注册 POST
global.GetMobileRegcode = '/member/get-mobile-regcode?ajax=json'; //获取注册验证码
global.DistrictAll = '/district/all?ajax=json'; //获取注册验证码
global.ResetPassword = "/member/reset-password-by-mobile?ajax=json"; // 重置密码
global.Resetcode = "/member/get-mobile-resetcode?ajax=json"; // 获取重置密码时的验证码

//任务相关
global.Task_ConfirmComplete = '/my-task/confirm-completed?ajax=json'; // 确认完成任务（商家端）
global.Task_Complete = '/task/complete?ajax=json'; // 确认完成任务（买手端）
global.Task_Sign = '/task/sign?ajax=json'; // 确认签收
global.Task_GoodRate = '/task/good-rate?ajax=json?ajax=json'; // 确认好评
global.Task_FavoriteStore = '/task/favorite-store?ajax=json'; // 确认收藏商品
global.Task_FollowStore = '/task/follow-store?ajax=json'; // 确认收藏店铺
global.Task_Chat = '/task/chat?ajax=json'; // 确认旺旺聊天
global.Task_ShopAround = '/task/shop-around?ajax=json'; // 确认货比三家
global.Task_Accept = '/task/accept?ajax=json'; // 确认接受任务
global.Task_ReceivedList = '/task/received-list?ajax=json'; // 获取任务列表（买手端）
global.Task_Distribute = '/my-task/distribute?ajax=json'; // 派遣任务
global.Task_Detail = '/task/detail?ajax=json'; // 获取任务详情
global.Task_List = '/my-task/list?ajax=json'; // 获取我发布的任务列表
global.Task_Save = '/my-task/save?ajax=json'; //  发布任务
global.Task_RuleItem = '/task/rule-items?ajax=json'; // 任务规则项接口
global.Task_Tags = '/task/tags?ajax=json'; // 任务标签
global.MyTaskGetReceivedState = '/my-task/get-received-state?ajax=json'; // 获取接受任务状态
global.MyTaskJoinList = '/my-task/join-list?ajax=json'; // 获取任务参与列表
global.TaskAuditTags = '/task/audit-tags?ajax=json'; // 任务审核标签【商家端】
global.MyTaskDisapproveComplete = '/my-task/disapprove-complete?ajax=json'; // 任务审核不通过【商家端】
global.MyTaskConfirmRefund = '/my-task/confirm-refund?ajax=json'; // 确认任务已返款【商家端】

global.MyTaskAcceptAppeal = '/my-task/accept-appeal?ajax=json'; //同意通过用户申诉
global.MyTaskRejectAppeal = '/my-task/reject-appeal?ajax=json'; //拒绝任务申诉


//账户相关

global.MemberNoviceState = '/member/novice-state?ajax=json'; // 获取新手任务状态
global.ShoppingAccountDefault = '/shopping-account/default?ajax=json'; // 获取绑定买号信息
global.BankAccountDefault = '/bank-account/default?ajax=json'; // 获取绑定银行卡信息
global.ShoppingAccounttSave = '/shopping-account/save?ajax=json'; // 绑定买号
global.ShoppingAccountUploadPic = '/shopping-account/upload-pic?ajax=json'; // 上传买号相关图片
global.MemberMyInfo = '/member/my-info?ajax=json'; // 获取我的基本信息
global.BankAccountSave = '/bank-account/save?ajax=json'; // 绑定银行卡
global.AddressRemove = 'address/remove?ajax=json'; // 删除收货地址
global.AddressGet = '/address/get?ajax=json'; // 获取收货地址
global.AddressSetAsDefault = '/address/set-as-default?ajax=json'; // 设为默认地址
global.AddressDefault = '/address/default?ajax=json'; // 修改收货地址信息
global.AddressUpdate = '/address/update?ajax=json'; // 修改收货地址信息
global.AddressSave = '/address/save?ajax=json'; // 保存收货地址信息
global.MemberSaveInfo = '/member/save-info?ajax=json'; // 完善基本信息
global.WalletStat = '/wallet/stat?ajax=json'; // 获取账户资产信息
global.TmpRecharge = '/tmp/recharge?ajax=json'; // 充值接口（临时用）

global.PaymentCreateQrcode = '/payment/createqrcode?ajax=json'; // 微信扫码支付
global.PaymentQueryQian = '/payment/query-qian?ajax=json'; // 判断微信扫码支付是否成功




global.PaymentPayForTask = '/payment/pay-for-task?ajax=json'; // 充值接口

global.WalletRecords = '/wallet/records?ajax=json'; // 充值接口
global.WalletWithdrawal = '/wallet/withdrawals?ajax=json'; // 提现申请

// 店铺相关
global.MyStoreAdd = '/my-store/add?ajax=json'; // 添加（绑定）店铺
global.MyStoreUpdate = '/my-store/update?ajax=json'; // 修改店铺信息
global.MyStoreDefault = '/my-store/default?ajax=json'; // 获取我的店铺信息
global.MyStoreUploadPic = '/my-store/upload-pic?ajax=json'; // 店铺上传图片
global.StoreCategories = '/store/categories?ajax=json'; // 店铺类别

//其他
global.QA_Slist = '/qa/slist?ajax=json'; // 问答题目
global.QaSanswer = '/qa/sanswer?ajax=json'; //
global.PaymentRecharge = '/payment/recharge?ajax=json'; // 提交问题

// 开发时，全局的打印函数
global.devConsole = {
    log: function(data) {
        //console.log(data);
    }
};

// 开发时，全局的格式化打印函数
global.formatConsole = {
    log: function(data1, data2) {
        //console.log( data1, data2);
    }
};

global.CaptchaTime = 60;

const aa = 'aa';
const bb = 'bb';
const cc = 'cc';

export { aa, bb, cc };