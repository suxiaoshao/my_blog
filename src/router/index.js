import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import bilibili from '../views/bilibili'
import novel from '../views/novel'
import read from '../views/novel/read'
import novel_research from '../views/novel/novel_research'

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
    path: '/bilibili',
    name: 'bilibili',
    component: bilibili,
    meta: {
      title: 'B站信息'
    }
  },
  {
    path: '/novel',
    name: 'novel',
    component: novel,
    meta: {
      title: '小说'
    },
    children: [
      {
        path: '/novel/read',
        name: 'read',
        component: read,
        meta: {
          title: '阅读'
        }
      },
      {
        path: '/novel/research',
        name: 'novel_research',
        component: novel_research,
        meta: {
          title: '小说搜索'
        }
      }
    ]
  }
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
