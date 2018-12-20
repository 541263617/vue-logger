import Vue from 'vue'
import App from './App'
import router from './router'
import '../lib/index.css'
import './scss//index.scss'
import Toast from '../packages/toast'

Vue.prototype.$toast = Toast
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
