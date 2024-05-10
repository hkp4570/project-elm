import Vue from 'vue'
import VueRouter from "vue-router"
import routes from './router/router.js'
import App from './App.vue'
import '@/utils/rem'
import store from './store'

Vue.config.productionTip = false

Vue.use(VueRouter)
const router = new VueRouter({
    routes,
    mode: 'hash'
})

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
