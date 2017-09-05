import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import App from './modules/app';
import Account from './modules/account';
import CW from './modules/cw';

const store = new Vuex.Store({
  modules: {
    App,
    Account,
    CW
  },
  strict: true
});

export default store;
