import article from '../views/blog/article'
import blog from '../views/blog/main'
import writting from '../views/blog/writting'
const blog_router = {
    path: '/blog',
    name: 'blog',
    component: blog,
    meta: {
        title: '博客'
    },
    children: [
        {
            path: '/blog/article/:aid',
            name: 'blog_article',
            component: article,
            meta: {
                title: '文章'
            }
        },
        {
            path: '/blog/writting',
            name: 'blog_writting',
            component: writting,
            meta: {
                title: '博客写作'
            }
        },
    ]
}
export default blog_router