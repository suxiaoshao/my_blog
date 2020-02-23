import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
import VueParticles from 'vue-particles'

Vue.config.productionTip = false
axios.defaults.withCredentials = true;

Vue.prototype.axios = axios;
Vue.use(VueParticles)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
