/**
 * Created by Administrator on 2017-08-07.
 */
import imgPreview from '../components/img-preview.vue'
import * as Api from '../api'
import empty from '../../static/img/icon_empty.png'

export default {
  install: function (Vue, options) {
    // 添加的内容写在这个函数里面
    const LOGIC_EVENT_BUS = new Vue({
      data(){
        return {
          LOGIC_PREVIEW: {
            isTitleEnable: true,
            isHorizontalNavEnable: true,
            show: false,
            loading: true,
            current: {
              title: '',
              src: ''
            },
            list: []
          }
        }
      }
    });

    window.LOGIC_EVENT_BUS = LOGIC_EVENT_BUS;

    Vue.component('img-preview', imgPreview);

    const updateIndex = (list) => {
      list.forEach((item, index) => {
        item.index = index + 1;
        item.title = (index + 1) + '/' + list.length;
      })
    };

    const urlJudge = (url) => {
      if (!url) {
        return empty;
      }
      if (url.indexOf('upload') == 0) {
        return Api.config.imgHost + url
      } else {
        return url
      }
    };

    function getImage(src, previewItem) {
      return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.src = src;
        img.onload = function () {
          previewItem['naturalHeight'] = img.naturalHeight;
          previewItem['naturalWidth'] = img.naturalWidth;
          previewItem.src = src;
          resolve(previewItem)
        };
        img.error = function (e) {
          reject(e)
        }
      })
    }

    Vue.directive('preview', {
      bind: function (el, binding) {
        let previewItem = {
          title: 'asdasd',
          el: el,
          index: 0,
          src: urlJudge(binding.value)
        };
        LOGIC_EVENT_BUS.LOGIC_PREVIEW.list.push(previewItem);
        updateIndex(LOGIC_EVENT_BUS.LOGIC_PREVIEW.list);
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          LOGIC_EVENT_BUS.LOGIC_PREVIEW.isTitleEnable = el.getAttribute('preview-title-enable') == "false" ? false : true;
          LOGIC_EVENT_BUS.LOGIC_PREVIEW.isHorizontalNavEnable = el.getAttribute('preview-nav-enable') == "false" ? false : true;
          LOGIC_EVENT_BUS.LOGIC_PREVIEW.show = true;
          LOGIC_EVENT_BUS.LOGIC_PREVIEW.loading = true;
          LOGIC_EVENT_BUS.LOGIC_PREVIEW.current = previewItem;
          getImage(e.currentTarget.src, previewItem).then(previewItem => {
            LOGIC_EVENT_BUS.LOGIC_PREVIEW.loading = false;
            LOGIC_EVENT_BUS.LOGIC_PREVIEW.current = previewItem;
          });
        })
      },
      update: function (el, oldValue) {
        let previewItem = LOGIC_EVENT_BUS.LOGIC_PREVIEW.list.find(item => {
          return item.el === el
        });
        if (!previewItem) return;
        previewItem.src = oldValue.value;
        previewItem.title = el.alt;
      },
      unbind: function (el) {
        if (el) {
          LOGIC_EVENT_BUS.LOGIC_PREVIEW.list.forEach((item, index) => {
            if (el === item.el) {
              LOGIC_EVENT_BUS.LOGIC_PREVIEW.list.splice(index, 1)
            }
          })
        }
        updateIndex(LOGIC_EVENT_BUS.LOGIC_PREVIEW.list)
      }
    })
  }
};
