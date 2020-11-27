// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入store仓库
import store from './store';

//引入重置样式。
import './assets/css/reset.css';
//引入rem的计算。
import './assets/js/remScale';
//全局引入过渡动画。
import 'animate.css';
//全局引入阿里图标
import './assets/font/iconfont.css';

import comComponents from './common';
for(let i in comComponents){
  Vue.component(i,comComponents[i]);
}
//全局引入过滤器
import filters from './filter/index';
for(let i in filters){
  Vue.filter(i,filters[i]);
}
//引入vantui框架
import VantUi from 'vant';
Vue.use(VantUi);
import 'vant/lib/index.css';

//在原型上挂载一个基础地址。
Vue.prototype.$imgUrl='http://localhost:3000';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
