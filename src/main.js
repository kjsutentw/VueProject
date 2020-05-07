// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icons'



Vue.config.productionTip = false
Vue.use(ElementUI)
var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8080/api'
axios.defaults.headers.common['jwtheadername'] = window.localStorage.getItem('jwttoken').toString();
Vue.prototype.msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: "success" });
}
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据

// http request 拦截器
// axios.interceptors.request.use(
//   function(config){
//     console.log("token是否存在?")
//     if (window.localStorage.getItem('JwtToken')) { //判断token是否存在
//       config.headers.jwtheadername = window.localStorage.getItem('JwtToken');
//       console.log("进入设置"+window.localStorage.getItem('JwtToken'))
//     }
//     return config;
//   },function(error){
//     return Promise.reject(error);
//   }
// );

Vue.prototype.$axios = axios


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})







