import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/normalize.css'
import './assets/css/common.css'
import axios from 'axios'
// import VueLazyLoad from 'vue-lazyload'

// Vue.use(VueLazyLoad)
Vue.config.productionTip = false
Vue.prototype.$https = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
