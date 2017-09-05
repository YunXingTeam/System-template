/**
 * Created by Administrator on 2017/6/22 0022.
 */
import {config} from '../api'
export default {
  /** 路由跳转
   *  @param {object} ctx 上下文
   *  @param {string} url 路由地址
   *  @param {object} ps 传递参数
   */
  toUrl(ctx, url, ps) {
    ctx.$router.push({path: url, query: ps})
  },
  /** 获取url中的参数
   *  @return {object} 返回对象
   */
  getUrlParams(){
    let search = window.location.search,
      rq = {};
    if (search.indexOf("?") != -1) {
      let str = decodeFromGb2312(search.substr(1));
      let strs = str.split("&");
      let arr = null;
      for (let i in strs) {
        arr = strs[i].split("=");
        rq[arr[0]] = decodeFromGb2312(arr[1])
      }
    }
    return rq;
  },
  /** 新增&&修改本地缓存
   *  @param {string} id 唯一id
   *  @param {string} key 标示
   *  @param {string} value 新增&修改的值
   */
  saveLocal (key, value){
    value = this.filterNull(value);
    window.localStorage[key] = encodeURIComponent(JSON.stringify(value));
  },
  /** 查询本地缓存
   *  @param {string} id 唯一id
   *  @param {string} key 标示
   *  @param {string} def 如果查询不到显示的值
   */
  loadLocal (key, def) {
    if (!window.localStorage[key]) {
      return def;
    }
    let ret = decodeURIComponent(window.localStorage[key]);
    return ret != 'undefined' ? JSON.parse(ret) : def;
  },
  /** 获取当前城市 **/
  getLocation() {
    return new Promise((resolve, reject) => {
      const geolocation = new BMap.Geolocation();
      const gc = new BMap.Geocoder();
      geolocation.getCurrentPosition(res => {
        if (geolocation.getStatus() == BMAP_STATUS_SUCCESS) {
          let pt = res.point;
          gc.getLocation(pt, (rs) => {
            let addComp = rs.addressComponents;
            resolve(addComp);
          });
        } else {
          reject('位置结果未知 获取位置失败.')
        }

      });
    });
  },
  /** 格式化时间
   *  @param {string} date 需要格式化的时间
   *  @param {string} fmt 想要格式化的格式
   */
  formatDate(date, fmt) {
    if (!date) {
      date = new Date();
    }
    function padLeftZero(str) {
      return ('00' + str).substr(str.length)
    }

    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }
    return fmt;
  },
  /** 格式化时间，返回年，月，日
   *  @param {string } date 需要格式化的时间
   */
  objectDate(date) {
    if (date && typeof date === 'string') {
      date = new Date(date);
      let o = {
        'Y': date.getFullYear(),
        'M': date.getMonth() + 1,
        'D': date.getDate()
      };
      return o;
    }
    return date;
  },
  /** 格式化时间，返回时间差，年，月，日
   * @param {string} date 需要格式化的时间
   * */
  timeDiff (date){
    // 开始时间
    let startTime = date;
    // 结束时间
    let endTime = new Date();
    // 时间差的毫秒数
    let timeDifferent = endTime.getTime() - new Date(startTime).getTime();

    function filter(value, index) {
      return compare(value, index) ? filter(compare(value, index), (index + 1)) : describe(value, index);
    }

    function compare(value, index) {
      switch (index) {
        case 0:
          return parseInt(value / 60);
        case 1:
          return parseInt(value / 60);
        case 2:
          return parseInt(value / 24);
        case 3:
          return parseInt(value / 30);
        case 4:
          return parseInt(value / 12);
      }
    }

    function describe(value, index) {
      switch (index) {
        case 0:
          return (value + '秒前');
        case 1:
          return (value + '分钟前');
        case 2:
          return (value + '小时前');
        case 3:
          return (value + '天前');
        case 4:
          return (value + '月前');
        case 5:
          return (value + '年前');
      }
    }

    return filter(timeDifferent / 1000, 0);
  },
  /** 检查(对象|数组)对应(键|下标)内容为空提示
   *  @param {object,Array} obj 对象|数组
   *  @param {object} key 键|下标
   *  @param {string} msg 提示内容
   */
  validateNull(obj, key, msg){
    if (key.indexOf(Object.keys(obj)) != -1) {
      this.toast(msg ? msg : key + '为空');
      return false;
    } else {
      if (!obj[key]) {
        this.toast(msg ? msg : key + '为空');
        return false;
      }
    }
    return true;
  },
  /** 去除(对象|数组)中为空(null、'null'、undefined，空字符串除外)的字段和下标
   *  @param {object,Array} value 对象|数组
   */
  filterNull(value){
    if (typeof value == 'object') {
      for (let k in value) {
        if (value[k] == null || value[k] == 'null' || value[k] == undefined) {
          if (value.length > 0) {
            value.splice(k, 1)
          } else {
            delete value[k]
          }
        }
      }
    }
    return value
  },
  /** 去除字符串的左右空格
   *  @param {string} value 字符串
   */
  trim(value){
    if (typeof(value) === 'string')
      return value.replace(/(^\s*)|(\s*$)/g, '');
    return value
  },
  /** 数组内容过滤
   *  @param {string} text 过滤包含内容
   *  @param {Array} array 待过滤数组
   *  @param {function} filter 过滤方法
   */
  nativeSearch(text, array, filter){
    let matches = {};
    let promise = new Promise((resolve) => {
      if (!filter) {
        matches = array.filter(function (datas) {
          if (datas.BRXM.indexOf(text) !== -1) return true;
        })
      } else {
        matches = array.filter(filter);
      }
      resolve(matches);
    }).catch((err) => {

    });

    return promise;
  },
  /** 获取年龄
   *  @param {string} dateStr 日期
   *  @param {boolean} isNum true?不带岁字:带岁字
   */
  getAge(dateStr, isNum){
    if (!dateStr) {
      return;
    }
    dateStr = this.formatDate(new Date(dateStr), "yyyy-MM-dd");
    let r = dateStr.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (r === null)return '';
    let d = new Date(r[1], r[3] - 1, r[4]);
    if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
      let Y = new Date().getFullYear();
      if (isNum) {
        return (Y - r[1]).toString();
      } else {
        return (Y - r[1]) + "岁";
      }
    }
    return '';
  },
  /** 提示
   *  @param {object} ctx 上下文
   *  @param {string} title 提示标题
   *  @param {string} msg 提示内容
   *  @param {Number} dur 提示时间,0为不自动关闭
   */
  toast(ctx, title, msg, dur){
    ctx.$notify.info({
      title: title ? title : '提示',
      message: msg,
      duration: dur ? dur : 0
    });
  },
  warningToast(ctx, title, msg, dur){
    ctx.$notify({
      title: title ? title : '警告',
      message: msg,
      duration: dur ? dur : 0,
      type: 'warning'
    });
  },
  successToast(ctx, title, msg, dur){
    ctx.$notify({
      title: title ? title : '成功',
      message: msg,
      duration: dur ? dur : 0,
      type: 'success'
    });
  },
  errorToast(ctx, title, msg, dur){
    ctx.$notify.error({
      title: title ? title : '错误',
      message: msg,
      duration: dur ? dur : 0
    });
  },
}
