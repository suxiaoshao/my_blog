import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navigation_names: ["首页", "B站", "评论", "图片"],
    navigation_path: ["/", "/old/bilibili", "/old/replies", "/old/jpg"],
    article_type: ['学习', '代码', '其他']
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
