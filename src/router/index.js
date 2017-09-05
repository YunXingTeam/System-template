/**
 * 整个app的路由设置
 */
import Vue from 'vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter);
// VueRouter.prototype.goBack = function (count) {
//   this.isBack = true;
//   window.history.go(count || -1);
// };
import Utils from '../utils'
import {keys} from '../api'
const router = new VueRouter({
  linkActiveClass: '',
  routes: [
    {
      path: '/index',
      component: resolve => {
        require(['../views/layout/main'], resolve)
      },
      children: [
        //数据统计
        {
          path: '/data-situation',  //tab1
          component: resolve => {
            require(['../views/pages/sjtj/data-situation'], resolve)
          }
        },
        {
          path: '/data-contrast',  //tab1
          component: resolve => {
            require(['../views/pages/sjtj/data-contrast'], resolve)
          }
        },
        {
          path: '/ref-amount',  //tab1
          component: resolve => {
            require(['../views/pages/sjtj/ref-amount'], resolve)
          }
        },
        {
          path: '/registration',  //tab1
          component: resolve => {
            require(['../views/pages/sjtj/registration'], resolve)
          }
        },
        {
          path: '/ref-details',  //tab1
          component: resolve => {
            require(['../views/pages/sjtj/ref-details'], resolve)
          }
        },
        {
          path: '/exchange',  //tab1
          component: resolve => {
            require(['../views/pages/sjtj/exchange'], resolve)
          }
        },
        {
          path: '/active-value',  //tab1
          component: resolve => {
            require(['../views/pages/sjtj/active-value'], resolve)
          }
        },
        //转诊筛查
        {
          path: '/ref-management',  //tab1
          component: resolve => {
            require(['../views/pages/zzsc/ref-management'], resolve)
          }
        },
        {
          path: '/ref-person-details',  //tab1
          component: resolve => {
            require(['../views/pages/zzsc/ref-person-details'], resolve)
          }
        },
        {
          path: '/screening-mine',  //tab1
          component: resolve => {
            require(['../views/pages/zzsc/screening-mine'], resolve)
          }
        },
        {
          path: '/screening-sending',  //tab1
          component: resolve => {
            require(['../views/pages/zzsc/screening-sending'], resolve)
          }
        },
        //app设置
        {
          path: '/audit-doctor',  //tab1
          component: resolve => {
            require(['../views/pages/app/audit-doctor'], resolve)
          }
        },
        {
          path: '/recommend',  //tab1
          component: resolve => {
            require(['../views/pages/app/recommend'], resolve)
          }
        },
        {
          path: '/tags-setting',  //tab1
          component: resolve => {
            require(['../views/pages/app/tags-setting'], resolve)
          }
        },
        //财务
        {
          path: '/percentage-setting',  //tab1
          component: resolve => {
            require(['../views/pages/cw/percentage-setting'], resolve)
          }
        },
        {
          path: '/ref-adjust',  //tab1
          component: resolve => {
            require(['../views/pages/cw/ref-adjust'], resolve)
          }
        },
        {
          path: '/score-appropriation',  //tab1
          component: resolve => {
            require(['../views/pages/cw/score-appropriation'], resolve)
          }
        },
        //人员管理
        {
          path: '/customer-management',  //tab1
          component: resolve => {
            require(['../views/pages/rygl/customer-management'], resolve)
          }
        },
        {
          path: '/group-management',  //tab1
          component: resolve => {
            require(['../views/pages/rygl/group-management'], resolve)
          }
        },
        {
          path: '/staff-management',  //tab1
          component: resolve => {
            require(['../views/pages/rygl/staff-management'], resolve)
          }
        },
      ]
    },
    {
      path: '/login',  //登录
      component: resolve => {
        require(['../views/pages/login'], resolve)
      }
    },
    {
      path: '*', redirect: Utils.loadLocal(keys.USERID) ? '/index' : '/login' //  初始化页面
    }
  ]
});
export default router;
