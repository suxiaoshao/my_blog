import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
const routes = [
    {
        path: '/article/:aid',
        name: 'blog_article',
        component: ()=>import("../views/article.vue"),
        meta: {
            title: '文章'
        }
    },
    {
        path: '/',
        name: 'Home',
        component: ()=>import("../views/Home.vue"),
        meta: {
            title: "sushao'blog"
        }
    },
    {
        path: '/classification/:tid',
        name: 'classification',
        component: ()=>import("../views/classification.vue"),
        meta: {
            title: '分类'
        }
    },
    {
        path: "/search/:search_name",
        name: "search",
        component: ()=>import("../views/search.vue"),
        meta: {
            title: '搜索'
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.name === 'blog') {
        next({name: 'Home'})
    } else {
        window.document.title = to.meta.title;
        next();
    }
});
export default router
