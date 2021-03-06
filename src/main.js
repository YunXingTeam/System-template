// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
import store from './store'
import router from './router'
import * as Api from './api'
import EazyPush from './plugins/easyPush'
import ImgPreview from './plugins/imgPreview'
import Utils from './utils'
window.Utils = Utils;
Vue.use(EazyPush, 'BC-eb034a9fd81e4abfb08be26a23aaaeaf')
Vue.use(ImgPreview)
/*三方库*/
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  error: require('../static/img/img_empty.png'),
  loading: require('../static/img/img_empty.png'),
  attempt: 1,
  adapter: {
    loading (listener, Init) {
      if (listener.src && listener.src.indexOf('upload') === 0) {
        listener.src = Api.config.imgHost + listener.src;
      }
    }
  }
})

import ECharts from 'vue-echarts'
Vue.component('chart', ECharts)

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)

Array.prototype.remove = function (val) {
  let index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
  return this
};
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
