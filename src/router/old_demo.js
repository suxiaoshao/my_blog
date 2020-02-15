import bilibili from '../views/old/bilibili'
import novel from '../views/old/novel'
import read from '../views/old/novel/read'
import novel_research from '../views/old/novel/novel_research'
import jpg from '../views/old/jpg'
import replies from '../views/old/replies'
import old_main from '../views/old/main'

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
            path: '/old/novel',
            name: 'novel',
            component: novel,
            meta: {
                title: '小说'
            },
            children: [
                {
                    path: '/old/novel/read',
                    name: 'read',
                    component: read,
                    meta: {
                        title: '阅读'
                    }
                },
                {
                    path: '/old/novel/research',
                    name: 'novel_research',
                    component: novel_research,
                    meta: {
                        title: '小说搜索'
                    }
                }
            ]
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
        }
    ]
}
export default old_router