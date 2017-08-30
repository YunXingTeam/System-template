import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

export const request = (params, showLoding) => {
  let resp;
  /*是否提示加载*/
  if (showLoding && showLoding.show)
    // Utils.loading(true, showLoding.text);
  /*必须参数*/
  params = Utils.filterNull(params);
  if (!params.userid)
    params.userid = Vue.utils.loadLocal(config.signKey, key.USERID, '') || '';
  if (!params.YYBM)
    params.YYBM = Vue.utils.loadLocal(config.signKey, key.USER, {}).JGBH || '';
  if (!params.usertype)
    params.usertype = Vue.utils.loadLocal(config.signKey, key.USER, {}).Rylx || '';
  /*参数格式化*/
  let xmlstr = '';
  if (params) {
    xmlstr = '{';
    let f = true;
    for (let it in params) {
      if (f) {
        xmlstr += '"' + it + '":"' + params[it] + '"';
        f = false;
      } else {
        xmlstr += ',"' + it + '":"' + params[it] + '"';
      }
    }
    xmlstr += '}';
  }
  /* 开始请求*/
  const p = new Promise((resolve, reject) => {
    Vue.axios.post(API_RESOURCE.site + API_RESOURCE.action, {xmlstr: xmlstr}, {
      emulateJSON: true
      // , credentials: true
    }).then(res => {
      if (res.body.error == 0) {
        resolve(res.body);
      } else {
        // Vue.utils.toast(res.body.msg);
      }
      /*隐藏加载*/
      // Vue.utils.loading(false);
    }, function (err) {
      reject("访问失败");
    });
  }).catch(err => {
    if (err && err.msg) {
      // Vue.utils.toast(err.msg);
    } else {
      // Vue.utils.toast(err);
    }
    return null;
  });
  return p;
}
/*请求配置*/
export const config = {
  site: 'http://192.168.1.131:8080/',
  imgHost: 'http://192.168.1.131:8080/',
  action: 'Jyz_Data_I/jyz_Action',
  signKey: '',
  logintype: 0,
}

export const YWID = {
}

export const keys = {
  USER: 'u0',
  USERID: 'u1',
  LOCATION: 'l0',
  LAT: 'l1',
  LNG: 'l2',
  UNREADNUM: 'u3',
  CODE: 'c0',
}

