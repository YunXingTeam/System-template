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
  // site: 'http://192.168.1.131:8080/',
  // site: 'http://couldserver.chinacloudapp.cn:1882/',
  site: 'http://couldserver.chinacloudapp.cn:1882/',
  // imgHost: 'http://couldserver.chinacloudapp.cn:1882/',
  imgHost: 'http://appjmzserver.chinacloudapp.cn:8080/',
  action: 'Jyz_Data_I/jyz_Action',
  signKey: 'zyt999',
  logintype: 0,
}

export const YWID = {
  /*微信配置*/
  weChat: '5003',
  /*登录*/
  signIn: '1003',
  /*静默登录*/
  autoSignIn: '1003',
  /*注册*/
  signUp: '1002',
  /*找回密码*/
  retrieve: '1032',
  /*注册获取验证码*/
  codeZC: '1001',
  /*找回密码获取验证码*/
  codePSW: '1031',
  /*修改信息*/
  edit: '1023',
  /*概况*/
  introduce: '3001',
  /*概况统计图*/
  introduceChart: '3002',
  /*各科室收入列表*/
  ksIncomeList: '4011',
  /*室收入统计图*/
  ksIncomeChart: '4041',
  /*科室内个医生收入列表*/
  docIncomeList: '4051',
  /*科室内个医生收入列表*/
  docIncomeChart: '4061',
  /*反馈*/
  feedback: '4098',
  /*签到*/
  QD: '9003',
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

