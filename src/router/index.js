import Vue from 'vue'
import VueRouter from 'vue-router'
import old_router from './routes/old_demo'
import blog_router from './routes/blog'
import main_router from './routes/main'
import { is_login } from '../assets/js/login'

Vue.use(VueRouter)
const routes = [
  old_router,
  blog_router
].concat(main_router)

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
