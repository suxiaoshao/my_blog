import article from '../views/blog/article'
import blog from '../views/blog/main'
const blog_router={
    path:'/blog',
    name:'blog',
    component:blog,
    meta:{
        title:'博客'
    },
    children:[
        {
            path:'/blog/article',
            name:'blog_article',
            component:article,
            meta:{
                title:'文章'
            }
        }
    ]
}
export default blog_router