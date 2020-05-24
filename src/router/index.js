// import Vue from 'vue'
// import VueRouter from 'vue-router'
import article from "../views/article";
import Home from "../views/Home";
import classification from "../views/classification";
import search from "../views/search";

Vue.use(VueRouter);
const routes = [
    {
        path: '/article/:aid',
        name: 'blog_article',
        component: article,
        meta: {
            title: '文章'
        }
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: "sushao'blog"
        }
    },
    {
        path: '/classification/:tid',
        name: 'classification',
        component: classification,
        meta: {
            title: '分类'
        }
    },
    {
        path: "/search/:search_name",
        name: "search",
        component: search,
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
