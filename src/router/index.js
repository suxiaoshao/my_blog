import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import old_router from '../router/old_demo'
import blog_router from '../router/blog'

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
  old_router,
  blog_router
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next();
})
export default router
