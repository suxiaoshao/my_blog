import bilibili from '../views/old/bilibili'
import jpg from '../views/old/jpg'
import replies from '../views/old/replies'
import old_main from '../views/old/main'
import wallpaper from '../views/old/wallpaper'

const old_router = {
    path: '/old',
    name: 'old_main',
    component: old_main,
    meta: {
        title: '旧demo'
    },
    children: [
        {
            path: '/old/bilibili',
            name: 'bilibili',
            component: bilibili,
            meta: {
                title: 'B站信息'
            }
        },
        {
            path: '/old/jpg',
            name: 'jpg',
            component: jpg,
            meta: {
                title: '图片'
            }
        },
        {
            path: '/old/replies',
            name: 'replies',
            component: replies,
            meta: {
                title: '评论'
            }
        },
        {
            path: '/old/wallpaper',
            name: 'wallpaper',
            component: wallpaper,
            meta: {
                title: '壁纸'
            }
        }
    ]
}
export default old_router