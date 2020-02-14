import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
const CryptoJS = require('crypto-js')

Vue.config.productionTip = false
axios.defaults.withCredentials = true;

Vue.prototype.axios = axios;
Vue.prototype.CryptoJS = CryptoJS;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
