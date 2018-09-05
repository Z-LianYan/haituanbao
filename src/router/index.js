import Vue from 'vue'
import Router from 'vue-router'
import list from '@/components/list.vue'
import main from '@/components/main.vue'

import navbar from '@/components/common/navbar.vue'

//任务详情
import task from '@/components/task/task.vue'
import isGoing from '@/components/task/isGoing.vue'
import isEnd from '@/components/task/isEnd.vue'
import isDraft from '@/components/task/isDraft.vue'

import taskList from '@/components/task/task-list.vue'
import taskDetail from '@/components/task/task-detail.vue'

import taskEditPublish1 from '@/components/task/task-edit-publish1.vue'
import taskEditPublish2 from '@/components/task/task-edit-publish2.vue'
import taskEditPublish3 from '@/components/task/task-edit-publish3.vue'
import taskEdit2Publish3 from '@/components/task/task-edit2-publish3.vue'
import taskEditPublish4 from '@/components/task/task-edit-publish4.vue'

import taskPublish1 from '@/components/task/task-publish1.vue'
import taskPublish2 from '@/components/task/task-publish2.vue'
import taskPublish3 from '@/components/task/task-publish3.vue'
import taskPublish4 from '@/components/task/task-publish4.vue'
import taskPublish5 from '@/components/task/task-publish5.vue'
import trusteeshipPayment from '@/components/task/trusteeship-payment.vue'
import trusteeshipEditPayment from '@/components/task/trusteeship-edit-payment.vue'
import distributePayment from '@/components/task/distribute-payment.vue'
import scanCode from '@/components/task/scanCode.vue'




// 登录注册
import login from '@/components/login.vue'
import loginRegister from '@/components/loginRegister.vue'
import resetPassword from '@/components/resetPassword.vue'

//店铺绑定
import store from '@/components/store.vue'
import storeBinding from '@/components/store-binding.vue'

//店铺列表
import ShopList from '@/components/pages/shoplist/shoplist'


//银行卡、余额
import remainingSum from '@/components/bank/remainingSum.vue'
import withdraw from '@/components/bank/withdraw.vue'
import fundDetail from '@/components/bank/fundDetail.vue'
import bankcard from '@/components/bank/bankcard.vue'

import payment from '@/components/payment.vue'

import adminInfo from '@/components/admin-info.vue'
import answerSheet from '@/components/answerSheet.vue'
import faq from '@/components/faq.vue'
import rules from '@/components/rules.vue'
import announcement from '@/components/announcement.vue'
import announcementDetail from '@/components/announcement-detail.vue'
import contact from '@/components/contact.vue'
import about from '@/components/about.vue'
import license from '@/components/license.vue'


import loading from '@/components/loading.vue'

Vue.use(Router);

export default new Router({
    /*  mode: 'history',
      scrollBehavior ( to, from, savedPosition ) {
        if (savedPosition) {
          return savedPosition
        } else {
          return { x: 0, y: 0 }
        }
        // return 期望滚动到哪个的位置
        /!*
         formatConsole.log("to %o", to);
         formatConsole.log("from %o", from);*!/

      },*/
    beforeRouteEnter: (to, from, next) => {
        console.log(from);
        next()
    },
    meta: { requiresAuth: true }, //　路由配置：是否需要登录的开关
    routes: [{
            path: '/',
            name: 'main',
            component: main
        },
        {
            path: '/loading',
            name: 'loading',
            component: loading
        },
        {
            path: '/list',
            name: 'list',
            component: list
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/loginRegister',
            name: 'loginRegister',
            component: loginRegister
        },
        {
            path: '/resetPassword',
            name: 'resetPassword',
            component: resetPassword
        },
        {
            path: '/navbar',
            name: 'navbar',
            component: navbar
        },
        {
            path: '/task',
            name: 'task',
            component: task,
            children: [{
                    path: 'isGoing',
                    name: 'isGoing',
                    component: isGoing
                },
                {
                    path: 'isEnd',
                    name: 'isEnd',
                    component: isEnd
                },
                {
                    path: 'isDraft',
                    name: 'isDraft',
                    component: isDraft
                }
            ]
        },
        {
            path: '/taskList',
            name: 'taskList',
            component: taskList
        },
        {
            path: '/contact',
            name: 'contact',
            component: contact
        },
        {
            path: '/about',
            name: 'about',
            component: about
        },
        {
            path: '/store',
            name: 'store',
            component: store
        },
        {
            path: '/license',
            name: 'license',
            component: license
        },
        {
            path: '/answerSheet',
            name: 'answerSheet',
            component: answerSheet
        },
        {
            path: '/faq',
            name: 'faq',
            component: faq
        },
        {
            path: '/rules',
            name: 'rules',
            component: rules
        },
        {
            path: '/announcement',
            name: 'announcement',
            component: announcement
        },
        {
            path: '/announcementDetail',
            name: 'announcementDetail',
            component: announcementDetail
        },
        {
            path: '/adminInfo',
            name: 'adminInfo',
            component: adminInfo
        },
        {
            path: '/bankcard',
            name: 'bankcard',
            component: bankcard
        },
        {
            path: '/payment',
            name: 'payment',
            component: payment
        },
        {
            path: '/withdraw',
            name: 'withdraw',
            component: withdraw
        },
        {
            path: '/fundDetail',
            name: 'fundDetail',
            component: fundDetail
        },
        {
            path: '/remainingSum',
            name: 'remainingSum',
            component: remainingSum
        },
        {
            path: '/taskDetail',
            name: 'taskDetail',
            component: taskDetail
        },
        {
            path: '/taskEditPublish1',
            name: 'taskEditPublish1',
            component: taskEditPublish1
        },
        {
            path: '/taskEditPublish2',
            name: 'taskEditPublish2',
            component: taskEditPublish2
        },
        {
            path: '/taskEditPublish3',
            name: 'taskEditPublish3',
            component: taskEditPublish3
        },
        {
            path: '/taskEdit2Publish3',
            name: 'taskEdit2Publish3',
            component: taskEdit2Publish3
        },
        {
            path: '/taskEditPublish4',
            name: 'taskEditPublish4',
            component: taskEditPublish4
        },
        {
            path: '/taskPublish1',
            name: 'taskPublish1',
            component: taskPublish1
        },
        {
            path: '/taskPublish2',
            name: 'taskPublish2',
            component: taskPublish2
        },
        {
            path: '/taskPublish3',
            name: 'taskPublish3',
            component: taskPublish3
        },
        {
            path: '/taskPublish4',
            name: 'taskPublish4',
            component: taskPublish4
        },
        {
            path: '/taskPublish5',
            name: 'taskPublish5',
            component: taskPublish5
        },
        {
            path: '/scanCode',
            name: 'scanCode',
            component: scanCode
        },
        {
            path: '/trusteeshipPayment',
            name: 'trusteeshipPayment',
            component: trusteeshipPayment
        },
        {
            path: '/trusteeshipEditPayment',
            name: 'trusteeshipEditPayment',
            component: trusteeshipEditPayment
        },
        {
            path: '/distributePayment',
            name: 'distributePayment',
            component: distributePayment
        },
        {
            path: '/storeBinding',
            name: 'storeBinding',
            component: storeBinding
        },
        {
            path: '/shoplist',
            name: 'shoplist',
            component: ShopList
        }

    ]
})