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
import Utils from './plugins/utils'
Vue.use(EazyPush, '')
Vue.use(ImgPreview)
Vue.use(Utils)
/*三方库*/

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  error: require('./assets/img/img_empty.png'),
  loading: require('./assets/img/img_empty.png'),
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
