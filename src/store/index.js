import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import App from './modules/app';

const store = new Vuex.Store({
  modules: {
    App
  },
  strict: true
});

export default store;
