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

const router = new VueRouter({
  linkActiveClass: '',
  routes: [
    {
      path: '/',
      component: resolve => {
        require(['../views/layout/main'], resolve)
      },
      children: [
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
      ]
    },
    {
      path: '*', redirect: '/' //  初始化页面
    }
  ]
});
export default router;
