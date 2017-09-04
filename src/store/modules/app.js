/**
 * Created by Administrator on 2017/6/29 0029.
 * TODO 和账号相关
 */
import Vue from 'vue'
import * as Api from '../../api';
import MenuData from '../../../static/menu'

const state = {
  drawer: {
    drawback: false,
  },
  naveMenu: {},
  menu: {}
};

const getters = {
  drawer: state => state.drawer,
  naveMenu: state => {
    return MenuData[0]
  },
  menu: state => state.menu,
};

const mutations = {
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
