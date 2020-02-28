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
        name: '分类',
        path: { name: 'classification' }
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
    article_type: ['学习', '代码', '其他','工具']
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
