
import Vue from 'vue'
import Router from 'vue-router'
import Introduce from '../views/Introduce.vue'
import Develop from '../views/Develop.vue'


Vue.use(Router)

let routes = [
  {
    path: '/',
    redirect: {
      name: 'Home'
     }
  },
  {
    path: '/Introduce',
    name: 'Introduce',
    component: Introduce
  },
  {
    path: '/Develop',
    name: 'Develop',
    component: Develop
  },
  
]

export default new Router({
  routes
})
