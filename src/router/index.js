import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import bilibili from '../views/bilibili'
import novel from '../views/novel'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/bilibili',
    name: 'bilibili',
    component: bilibili
  },
  {
    path:'/novel',
    name:'novel',
    component:novel
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
