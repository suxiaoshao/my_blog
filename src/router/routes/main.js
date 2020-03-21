import Home from '../../views/main/Home'
import login from '../../views/main/login'
import classificaton from '../../views/main/classification'
import search from '../../views/main/search'
const main_router = [
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
    {
        path: '/classification/:tid',
        name: 'classification',
        component: classificaton,
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
export default main_router