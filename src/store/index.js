import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navigation_names: ["首页", "B站", "评论", "图片"],
    navigation_path: ["/", "/bilibili", "/replies", "/jpg"]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
