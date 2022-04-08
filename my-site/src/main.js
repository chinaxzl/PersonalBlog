import Vue from 'vue'
import App from './App.vue'
import "./styles/global.less"; //全局初始化样式
import router from "./router" //导入路由插件
import "./mock"; //导入mock模拟数据
import store from "./store";//导入仓库
import showMessage from "./utils/showMessage"; //消息提示
import "./eventBus";//导入事件总线处理
Vue.prototype.$showMessage = showMessage;
import vLoading from "./directives/loading" //加载自定义指令
Vue.directive('loading', vLoading); //注册全局指令
import vlazy from "./directives/lazy";
Vue.directive('lazy',vlazy);



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


