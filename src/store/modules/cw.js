/**
 * Created by Administrator on 2017/6/29 0029.
 * TODO 和账号相关
 */
import * as Api from '../../api';

const state = {
  percentageList: []
};

const getters = {
  percentageList: state => state.percentageList
};

const mutations = {
  setPercentageList(state, lst){
    if (lst) {
      state.percentageList = lst
    } else {
      state.percentageList = []
    }
  }
};

const actions = {
  getPercentageList({commit}, {page, pageSize, sflx, callback}){
    let p = {
      YWID: Api.YWID.cw.percentage
    }
    p.page = page != undefined ? page : 1;//页数
    p.pageSize = pageSize ? pageSize : 15;//每页数量
    p.sflx = sflx ? sflx : 2;//查询类型 1医生 2.医院
    Api.request(p).then(resp => {
      if (sflx == 2) {
        resp.data = resp.data.map((item, i) => {
          item.jgptmztcbl = (item.mztcbl * 100).toFixed(1);
          item.jgptzytcbl = (item.zytcbl * 100).toFixed(1);
          item.ptcymztcbl = (item.cymzzdtcbl * 100).toFixed(1);
          item.ptcyzytcbl = (item.cyzyzdtcbl * 100).toFixed(1);
          return item;
        })
      }
      if (callback) {
        callback(resp.data)
      }
    })
  },
  percentageSubmit({commit}, {item, sflx}){
    let obj;
    switch (sflx) {
      case '1':
        obj.YWID = Api.YWID.docPercentageSubmit;
        obj.aid = item.aid;
        obj.mztcbl = item.ysmztcbl / 100.0;
        obj.zytcbl = item.yszytcbl / 100.0;
        break;
      case '2':
        obj.YWID = Api.YWID.hosPercentageSubmit;
        obj.aid = item.aid;
        obj.mztcbl = item.jgptmztcbl / 100.0;
        obj.zytcbl = item.jgptzytcbl / 100.0;
        obj.cymzzdtcbl = item.ptcymztcbl / 100.0;
        obj.cyzyzdtcbl = item.ptcyzytcbl / 100.0;
        break;
    }
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
