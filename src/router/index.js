// import Vue from 'vue'
// import VueRouter from 'vue-router'
import blog_router from './routes/blog'
import main_router from './routes/main'
import { is_login } from '../assets/js/login'

Vue.use(VueRouter);
const routes = [
  blog_router
].concat(main_router);

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === 'blog') {
    next({ name: 'Home' })
  }
  // 如果是old_demo
  else if (to.name === 'blog_writing' || to.name === 'blog_edit') {
    is_login(next)
  }
  else {
    window.document.title = to.meta.title;
    next();
  }
});
export default router
