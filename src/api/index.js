import Vue from 'vue'
import vueResource from 'vue-resource';
Vue.use(vueResource);

export const request = (params, showLoding) => {
  let resp;
  /*是否提示加载*/
  if (showLoding && showLoding.show)
  // Utils.loading(true, showLoding.text);
  /*必须参数*/
    params = Utils.filterNull(params);
  if (!params.userid)
    params.userid = Utils.loadLocal(keys.USERID, '') || '';
  /* 开始请求*/
  const p = new Promise((resolve, reject) => {
    Vue.http.post(config.site + config.action, {csjson: JSON.stringify(params)}, {
      emulateJSON: true, credentials: true
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
  // site: 'http://192.168.1.131:8080/',
  // site: 'http://couldserver.chinacloudapp.cn:1882/',
  site: 'http://AppJmzSERVER.chinacloudapp.cn:8080/',
  // imgHost: 'http://couldserver.chinacloudapp.cn:1882/',
  imgHost: 'http://appjmzserver.chinacloudapp.cn:8080/',
  action: 'Zz_Admin_I/zzadmin_Action',
  excelAction: 'Zz_Admin_I/excel_Action',
  wxAcion: 'Zz_Data_I/zz_Action',
  signKey: 'zyysht999',
  logintype: 0,
}

export const YWID = {
  account: {
    /*登录*/
    signIn: '1001',
  },
  cw: {
    percentage: '1203',
    hosPercentageSubmit: '1204',
    docPercentageSubmit: '1219',
  }
}

export const keys = {
  USER: 'u0',
  USERID: 'u1',
  LOCATION: 'l0',
  LAT: 'l1',
  LNG: 'l2',
  UNREADNUM: 'u3',
  CODE: 'c0',
  PERMISSION: 'p0',
  PID: 'p1',
  GLY: 'g0',
  ZHQZ: 'z0'
}

