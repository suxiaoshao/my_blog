import Home from '../../views/main/Home'
import login from '../../views/main/login'
import classificaton from '../../views/main/classification'
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
        path: '/classification',
        name: 'classification',
        component:classificaton,
        meta:{
            title:'分类'
        }
    }
]
export default main_router