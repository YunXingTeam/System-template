/**
 * Created by Administrator on 2017/6/29 0029.
 * TODO 和账号相关
 */
import Vue from 'vue'
import * as Api from '../../api';
import MenuData from '../../assets/menu'

const state = {
  userId: 0,
  user: {},
  drawer: {
    drawback: false,
  },
  naveMenu: {},
  menu: {}
};

const getters = {
  userId: state => state.userId,
  user: state => state.user,
  drawer: state => state.drawer,
  naveMenu: state => {
    return MenuData[0]
  },
  menu: state => state.menu,
};

const mutations = {
  setUserId(state, userID){
    state.userId = userID;
    Vue.utils.saveLocal(Api.YWID.signKey, Api.keys.USERID, userID ? userID : '')
  },
  setUser(state, user) {
    user = Vue.utils.filterNull(user);
    Vue.utils.saveLocal(Api.YWID.signKey, Api.keys.USER, user ? user : '');
    state.user = user;
  },
  toggleDrawer(state){
    state.drawer.drawback = !state.drawer.drawback;
  },
  updateMenu(state, {...par}){
    state.menu = MenuData[par.navRoute] || [];
  }

};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
}
