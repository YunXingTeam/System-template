import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import App from './modules/app';
import Account from './modules/account';

const store = new Vuex.Store({
  modules: {
    App,
    Account
  },
  strict: true
});

export default store;
