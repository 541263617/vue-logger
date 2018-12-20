import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import { routes } from './router'
import './scss/index.scss'

Vue.config.productionTip = false
Vue.use(Router)

let router = new Router({
  routes
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
