import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { VueAxios, axiosInstance } from './request'
import './plugins/element.js'
import BreadCrumb from './components/BreadCrumb.vue'

Vue.use(VueAxios, axiosInstance)
Vue.component('breadCrumb', BreadCrumb)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
