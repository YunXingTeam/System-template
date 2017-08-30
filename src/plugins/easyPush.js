/**
 * Created by Administrator on 2017/6/22 0022.
 */
const pushPlugin = {
  install (Vue, key) {
    const goEasy = new GoEasy({appkey: key});
    const easyPush = {
      connectPush (topic){
        const sub = new Promise((resolve, reject) => {
          goEasy.subscribe({
            channel: topic,
            onMessage: function (message) {
              resolve(JSON.parse(message.content));
            }
          });
        }).catch(err => {
          console.error(err);
          return null;
        });
        return sub;
      }
    };
    Vue.easyPush = easyPush;
    Vue.prototype.$easyPush = easyPush;
  }
};

export default pushPlugin
