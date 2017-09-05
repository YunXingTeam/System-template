/**
 * Created by Administrator on 2017/6/29 0029.
 * TODO 和账号相关
 */
import * as Api from '../../api';

const state = {
  userId: 0,
  user: {},
  permission: null,
  pid: null,
  gly: null,
  zhqz: null,
};

const getters = {
  userId: state => state.userId,
  user: state => state.user,
  permission: state => {
    return state.permission ? state.permission : Utils.loadLocal(Api.keys.PERMISSION)
  },
  pid: state => {
    return state.pid ? state.pid : Utils.loadLocal(Api.keys.PID)
  },
  gly: state => {
    return state.gly ? state.gly : Utils.loadLocal(Api.keys.GLY)
  },
  zhqz: state => {
    return state.zhqz ? state.zhqz : Utils.loadLocal(Api.keys.ZHQZ)
  },
};

const mutations = {
  setUserId(state, userID){
    state.userId = userID;
    Utils.saveLocal(Api.keys.USERID, userID ? userID : '')
  },
  setUser(state, user) {
    user = Utils.filterNull(user);
    Utils.saveLocal(Api.keys.USER, user ? user : '');
    state.user = user;
  },
  setData(state, {key, name, value}) {
    Utils.saveLocal(key, value ? value : '');
    state[name] = value;
  },
};

const actions = {
  signIn({commit}, {jobNum, psw, callback}){
    let p = {
      YWID: Api.YWID.account.signIn,
      userid: jobNum,
      password: psw
    }
    Api.request(p).then(resp => {
      commit('setUser', resp.data);
      commit('setUserId', jobNum);
      commit('setData', {key: Api.keys.PERMISSION, name: 'permission', value: resp.data.cdlist});
      commit('setData', {key: Api.keys.PID, name: 'pid', value: resp.data.yylfwjgpid});
      commit('setData', {key: Api.keys.GLY, name: 'gly', value: resp.data.gly});
      commit('setData', {key: Api.keys.ZHQZ, name: 'zhqz', value: resp.data.zhqz});
      if (callback) {
        callback()
      }
    })
  },
  logout({commit}, callback){
    commit('setUser');
    commit('setUserId');
    if (callback) {
      callback()
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
