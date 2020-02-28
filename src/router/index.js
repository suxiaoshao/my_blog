import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import old_router from '../router/old_demo'
import blog_router from '../router/blog'
import login from '../views/login'
import { is_login } from '../assets/js/login'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '登录'
    }
  },
  old_router,
  blog_router
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.name === 'blog' || to.name === 'old_main') {
    next({ name: 'Home' })
  }
  // 如果是old_demo
  else if (to.matched.some(item => {
    return item.path === '/old'
  })) {
    is_login(next)
  }
  else if (to.name === 'blog_writting' || to.name === 'blog_exit') {
    is_login(next)
  }
  else {
    window.document.title = to.meta.title;
    next();
  }
})
export default router
