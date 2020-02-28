import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navigation_item: [
      {
        name: "首页",
        path: { name: 'Home' }
      },
      {
        name: 'B站',
        path: { name: 'bilibili' }
      },
      {
        name: "评论",
        path: { name: 'replies' }
      },
      {
        name: '图片',
        path: { name: 'jpg' }
      }
    ],
    article_type: ['学习', '代码', '其他']
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
