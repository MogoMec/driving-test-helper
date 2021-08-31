import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/normalize.css'
import axios from 'axios'

Vue.config.productionTip = false
axios.defaults.baseURL = 'https://way.jd.com/jisuapi/driverexamQuery'
Vue.prototype.$https = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
