import Vue from 'vue'
import VueRouter from "vue-router"
import routes from './router/router.js'
import App from './App.vue'
import '@/utils/rem'
import store from './store'
import './style/common.scss'
import myPlugin from "@/plugins/myPlugin";

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(myPlugin)
const router = new VueRouter({
  routes,
  mode: 'hash'
})
// window.store = store;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
